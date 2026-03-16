import { NextResponse } from "next/server";
import {
  DEFAULT_MON_PRICE,
  DEFAULT_TOTAL_STAKED,
  DEFAULT_ACTIVE_VALIDATORS,
} from "@/lib/constants";

export const revalidate = 300; // ISR: revalidate every 5 minutes

export async function GET() {
  try {
    const priceRes = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=monad&vs_currencies=usd",
      { next: { revalidate: 300 } }
    );

    if (!priceRes.ok) {
      // Rate-limited or API error — return defaults with null updatedAt
      return NextResponse.json({
        monPrice: DEFAULT_MON_PRICE,
        networkStake: DEFAULT_TOTAL_STAKED,
        activeValidators: DEFAULT_ACTIVE_VALIDATORS,
        updatedAt: null,
      });
    }

    const priceData = await priceRes.json();
    const rawPrice = priceData?.monad?.usd;
    const monPrice = typeof rawPrice === 'number' && isFinite(rawPrice) && rawPrice > 0
      ? rawPrice
      : DEFAULT_MON_PRICE;

    return NextResponse.json({
      monPrice,
      networkStake: DEFAULT_TOTAL_STAKED,
      activeValidators: DEFAULT_ACTIVE_VALIDATORS,
      updatedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Live data fetch error:", err instanceof Error ? err.message : String(err));
    return NextResponse.json({
      monPrice: DEFAULT_MON_PRICE,
      networkStake: DEFAULT_TOTAL_STAKED,
      activeValidators: DEFAULT_ACTIVE_VALIDATORS,
      updatedAt: null,
    });
  }
}
