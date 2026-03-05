"use client";

import type { CalculatorInputs, PresetConfig } from "@/lib/types";

interface CalculatorFormProps {
  inputs: CalculatorInputs;
  activePreset: string | null;
  presets: PresetConfig[];
  updateInput: (key: keyof CalculatorInputs, value: number) => void;
  applyPreset: (preset: PresetConfig) => void;
}

export function CalculatorForm({
  inputs,
  activePreset,
  presets,
  updateInput,
  applyPreset,
}: CalculatorFormProps) {
  return (
    <div
      className="bg-cream-5 border border-cream-8 rounded-2xl p-6 opacity-0 animate-fade-in-up"
      style={{ animationDelay: "0.32s" }}
    >

      <h2 className="font-display text-[11px] font-normal uppercase tracking-[0.12em] text-cream-40 mb-5">
        Validator Parameters
      </h2>

      {/* Presets */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {presets.map((p) => (
          <button
            key={p.id}
            className={`px-[14px] py-[7px] rounded-lg text-xs font-body font-medium cursor-pointer transition-all border ${
              activePreset === p.id
                ? "border-cream-40 bg-cream-12 text-cream"
                : "bg-cream-5 border-cream-8 text-cream-40 hover:border-cream-20 hover:text-cream hover:bg-cream-8"
            }`}
            onClick={() => applyPreset(p)}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Total Validator Stake */}
      <div className="mb-4">
        <label className="flex justify-between items-center text-[13px] text-cream-60 mb-[7px] font-normal">
          Total Validator Stake (MON)
          <span className="text-[11px] text-cream-20 font-light">
            Min 10M to activate
          </span>
        </label>
        <input
          type="number"
          className="w-full py-[11px] px-[14px] bg-cream-5 border border-cream-8 rounded-lg text-cream text-sm font-body font-normal outline-none transition-all focus:border-cream-20 focus:bg-cream-8"
          value={inputs.stake}
          min={10000000}
          step={1000000}
          onChange={(e) =>
            updateInput("stake", parseFloat(e.target.value) || 0)
          }
        />
      </div>

      {/* Self-Stake */}
      <div className="mb-4">
        <label className="flex justify-between items-center text-[13px] text-cream-60 mb-[7px] font-normal">
          Self-Stake (MON)
          <span className="text-[11px] text-cream-20 font-light">
            Min 100K required
          </span>
        </label>
        <input
          type="number"
          className="w-full py-[11px] px-[14px] bg-cream-5 border border-cream-8 rounded-lg text-cream text-sm font-body font-normal outline-none transition-all focus:border-cream-20 focus:bg-cream-8"
          value={inputs.selfStake}
          min={100000}
          step={100000}
          onChange={(e) =>
            updateInput("selfStake", parseFloat(e.target.value) || 0)
          }
        />
      </div>

      {/* Commission */}
      <div className="mb-4">
        <label className="flex justify-between items-center text-[13px] text-cream-60 mb-[7px] font-normal">
          Commission Rate
          <span className="text-[11px] text-cream-20 font-light">
            VDP cap: 20% (first 6mo) / 10%
          </span>
        </label>
        <div className="flex items-center gap-3">
          <input
            type="range"
            className="flex-1"
            min={0}
            max={100}
            value={inputs.commission}
            onChange={(e) =>
              updateInput("commission", parseFloat(e.target.value) || 0)
            }
          />
          <span className="min-w-[50px] text-right text-sm font-semibold text-cream">
            {inputs.commission}%
          </span>
        </div>
      </div>

      {/* MON Price */}
      <div className="mb-4">
        <label className="flex justify-between items-center text-[13px] text-cream-60 mb-[7px] font-normal">
          MON Price (USD)
        </label>
        <input
          type="number"
          className="w-full py-[11px] px-[14px] bg-cream-5 border border-cream-8 rounded-lg text-cream text-sm font-body font-normal outline-none transition-all focus:border-cream-20 focus:bg-cream-8"
          value={inputs.monPrice}
          min={0.001}
          step={0.001}
          onChange={(e) =>
            updateInput("monPrice", parseFloat(e.target.value) || 0)
          }
        />
      </div>

      {/* Section: Network Assumptions */}
      <div className="font-display text-[13px] font-normal uppercase tracking-[0.1em] text-cream-20 mt-6 mb-2 pt-[18px] border-t border-cream-5">
        Network Assumptions
      </div>

      {/* Total Network Staked */}
      <div className="mb-4">
        <label className="flex justify-between items-center text-[13px] text-cream-60 mb-[7px] font-normal">
          Total Network Staked (MON)
          <span className="text-[11px] text-cream-20 font-light">
            ~12.36B on-chain
          </span>
        </label>
        <input
          type="number"
          className="w-full py-[11px] px-[14px] bg-cream-5 border border-cream-8 rounded-lg text-cream text-sm font-body font-normal outline-none transition-all focus:border-cream-20 focus:bg-cream-8"
          value={inputs.networkStake}
          min={100000000}
          step={100000000}
          onChange={(e) =>
            updateInput("networkStake", parseFloat(e.target.value) || 1)
          }
        />
      </div>

      {/* Active Validators */}
      <div className="mb-4">
        <label className="flex justify-between items-center text-[13px] text-cream-60 mb-[7px] font-normal">
          Active Validators
        </label>
        <input
          type="number"
          className="w-full py-[11px] px-[14px] bg-cream-5 border border-cream-8 rounded-lg text-cream text-sm font-body font-normal outline-none transition-all focus:border-cream-20 focus:bg-cream-8"
          value={inputs.activeValidators}
          min={1}
          max={200}
          onChange={(e) =>
            updateInput("activeValidators", parseFloat(e.target.value) || 1)
          }
        />
      </div>

      {/* Priority Fees */}
      <div className="mb-4">
        <label className="flex justify-between items-center text-[13px] text-cream-60 mb-[7px] font-normal">
          Priority Fee Revenue (MON/day)
          <span className="text-[11px] text-cream-20 font-light">
            Highly variable
          </span>
        </label>
        <input
          type="number"
          className="w-full py-[11px] px-[14px] bg-cream-5 border border-cream-8 rounded-lg text-cream text-sm font-body font-normal outline-none transition-all focus:border-cream-20 focus:bg-cream-8"
          value={inputs.priorityFees}
          min={0}
          step={100}
          onChange={(e) =>
            updateInput("priorityFees", parseFloat(e.target.value) || 0)
          }
        />
      </div>

      {/* Section: Operating Costs */}
      <div className="font-display text-[13px] font-normal uppercase tracking-[0.1em] text-cream-20 mt-6 mb-2 pt-[18px] border-t border-cream-5">
        Operating Costs
      </div>

      {/* Server Cost */}
      <div className="mb-4">
        <label className="flex justify-between items-center text-[13px] text-cream-60 mb-[7px] font-normal">
          Monthly Server Cost (USD)
          <span className="text-[11px] text-cream-20 font-light">
            Bare metal $200-$350
          </span>
        </label>
        <input
          type="number"
          className="w-full py-[11px] px-[14px] bg-cream-5 border border-cream-8 rounded-lg text-cream text-sm font-body font-normal outline-none transition-all focus:border-cream-20 focus:bg-cream-8"
          value={inputs.serverCost}
          min={0}
          step={25}
          onChange={(e) =>
            updateInput("serverCost", parseFloat(e.target.value) || 0)
          }
        />
      </div>

      {/* Other Costs */}
      <div className="mb-4">
        <label className="flex justify-between items-center text-[13px] text-cream-60 mb-[7px] font-normal">
          Other Monthly Costs (USD)
          <span className="text-[11px] text-cream-20 font-light">
            Monitoring, bandwidth, etc.
          </span>
        </label>
        <input
          type="number"
          className="w-full py-[11px] px-[14px] bg-cream-5 border border-cream-8 rounded-lg text-cream text-sm font-body font-normal outline-none transition-all focus:border-cream-20 focus:bg-cream-8"
          value={inputs.otherCosts}
          min={0}
          step={10}
          onChange={(e) =>
            updateInput("otherCosts", parseFloat(e.target.value) || 0)
          }
        />
      </div>
    </div>
  );
}
