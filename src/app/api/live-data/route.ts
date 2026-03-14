import { NextResponse } from "next/server";
import {
  DEFAULT_MON_PRICE,
  DEFAULT_TOTAL_STAKED,
  DEFAULT_ACTIVE_VALIDATORS,
} from "@/lib/constants";

export const revalidate = 300; // ISR: revalidate every 5 minutes

const MONAD_RPC = "https://rpc.monad.xyz";
const STAKING_PRECOMPILE = "0x0000000000000000000000000000000000001000";

// getConsensusValidatorSet(uint32 page) selector
const GET_CONSENSUS_SET_SELECTOR = "0xfb29b729";

function encodeUint32(value: number): string {
  return value.toString(16).padStart(64, "0");
}

function decodeUint256(hex: string): bigint {
  return BigInt("0x" + hex);
}

async function fetchConsensusValidators(): Promise<{
  totalStake: number;
  activeCount: number;
}> {
  let totalStake = BigInt(0);
  let totalValidators = 0;
  let page = 0;
  let totalPages = 1;

  while (page < totalPages) {
    const data =
      GET_CONSENSUS_SET_SELECTOR + encodeUint32(page);

    const res = await fetch(MONAD_RPC, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "eth_call",
        params: [{ to: STAKING_PRECOMPILE, data }, "latest"],
        id: 1,
      }),
      next: { revalidate: 300 },
    });

    const json = await res.json();
    if (json.error || !json.result || json.result === "0x") {
      break;
    }

    // Strip 0x prefix
    const result = json.result.slice(2);

    // ABI decode: the response is (ValidatorSetInfo[], uint32)
    // First 32 bytes: offset to the dynamic array
    // Second 32 bytes: totalPages (uint32, right-padded in 32 bytes)
    const totalPagesHex = result.slice(64, 128);
    totalPages = Number(decodeUint256(totalPagesHex));

    // At the array offset, first 32 bytes = array length
    const arrayOffset = Number(decodeUint256(result.slice(0, 64))) * 2;
    const arrayLength = Number(
      decodeUint256(result.slice(arrayOffset, arrayOffset + 64))
    );

    // Each validator entry in the array is referenced by an offset
    // The array contains offsets to each tuple element
    for (let i = 0; i < arrayLength; i++) {
      const entryOffsetPos = arrayOffset + 64 + i * 64;
      const entryOffset =
        arrayOffset +
        64 +
        Number(decodeUint256(result.slice(entryOffsetPos, entryOffsetPos + 64))) *
          2;

      // Each ValidatorSetInfo tuple:
      // [0] uint64 validatorId (32 bytes)
      // [1] address authAddress (32 bytes)
      // [2] uint256 stake (32 bytes)
      // [3] bytes blsPublicKey (dynamic, offset)
      const stakeHex = result.slice(entryOffset + 128, entryOffset + 192);
      const stake = decodeUint256(stakeHex);
      totalStake += stake;
    }

    totalValidators += arrayLength;
    page++;
  }

  // Convert from wei to MON (18 decimals)
  return {
    totalStake: Number(totalStake / BigInt(10 ** 18)),
    activeCount: totalValidators,
  };
}

export async function GET() {
  try {
    const [priceRes, networkData] = await Promise.all([
      fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=monad&vs_currencies=usd",
        { next: { revalidate: 300 } }
      ),
      fetchConsensusValidators().catch(() => null),
    ]);

    const priceData = await priceRes.json();
    const monPrice = priceData?.monad?.usd ?? DEFAULT_MON_PRICE;

    return NextResponse.json({
      monPrice,
      networkStake: networkData?.totalStake ?? DEFAULT_TOTAL_STAKED,
      activeValidators:
        networkData?.activeCount ?? DEFAULT_ACTIVE_VALIDATORS,
      updatedAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({
      monPrice: DEFAULT_MON_PRICE,
      networkStake: DEFAULT_TOTAL_STAKED,
      activeValidators: DEFAULT_ACTIVE_VALIDATORS,
      updatedAt: null,
    });
  }
}
