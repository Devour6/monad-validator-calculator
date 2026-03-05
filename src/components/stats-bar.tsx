"use client";

import { useMemo } from "react";
import { VALIDATORS } from "@/data/validators";
import { BLOCKS_PER_DAY, BLOCK_REWARD, MAX_VALIDATORS } from "@/lib/constants";
import { fmtCompact } from "@/lib/formatters";
import type { CalculatorInputs } from "@/lib/types";

interface StatsBarProps {
  inputs: CalculatorInputs;
}

export function StatsBar({ inputs }: StatsBarProps) {
  const stats = useMemo(() => {
    const count = VALIDATORS.length;
    let totalStaked = 0;
    let totalComm = 0;
    let totalApy = 0;

    for (const v of VALIDATORS) {
      totalStaked += v.totalStake;
      totalComm += v.commission;
      const ns = v.totalStake / inputs.networkStake;
      const bpd = BLOCKS_PER_DAY * ns;
      const dbr = bpd * BLOCK_REWARD;
      const apy = v.totalStake > 0 ? ((dbr * 365) / v.totalStake) * 100 : 0;
      totalApy += apy;
    }

    return {
      count,
      totalStaked: fmtCompact(totalStaked),
      avgCommission: (totalComm / count).toFixed(1) + "%",
      avgApy: (totalApy / count).toFixed(2) + "%",
    };
  }, [inputs.networkStake]);

  const items = [
    {
      label: "Active Validators",
      value: stats.count.toString(),
      sub: `of ${MAX_VALIDATORS} max`,
    },
    { label: "Total Staked", value: stats.totalStaked, sub: "MON" },
    {
      label: "Avg Commission",
      value: stats.avgCommission,
      sub: "across active set",
    },
    { label: "Avg Gross APY", value: stats.avgApy, sub: "before costs" },
  ];

  return (
    <div
      className="grid grid-cols-4 gap-4 mb-6 max-sm:grid-cols-2 opacity-0 animate-fade-in-up"
      style={{ animationDelay: "0.16s" }}
    >
      {items.map((item) => (
        <div
          key={item.label}
          className="bg-cream-5 border border-cream-8 rounded-xl px-[18px] py-4"
        >
          <div className="font-display text-[9px] uppercase tracking-[0.1em] text-cream-40 mb-[6px] font-normal">
            {item.label}
          </div>
          <div className="font-body text-[22px] font-bold text-cream leading-[1.1]">
            {item.value}
          </div>
          <div className="text-[11px] text-cream-20 mt-[3px] font-light">
            {item.sub}
          </div>
        </div>
      ))}
    </div>
  );
}
