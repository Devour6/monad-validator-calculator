"use client";

import { useState, useMemo, useCallback } from "react";
import type { CalculatorInputs, CalculatorResults, Verdict, PresetConfig } from "@/lib/types";
import { DEFAULT_INPUTS, PRESETS } from "@/lib/constants";
import { calculateProfit, getVerdict } from "@/lib/calculations";

export function useCalculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);
  const [activePreset, setActivePreset] = useState<string | null>(null);

  const results: CalculatorResults = useMemo(
    () => calculateProfit(inputs),
    [inputs]
  );

  const verdict: Verdict = useMemo(
    () => getVerdict(results.netProfitUsd),
    [results.netProfitUsd]
  );

  const updateInput = useCallback(
    (key: keyof CalculatorInputs, value: number) => {
      setInputs((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const applyPreset = useCallback((preset: PresetConfig) => {
    setActivePreset(preset.id);
    setInputs((prev) => ({
      ...prev,
      stake: preset.stake,
      selfStake: preset.selfStake,
      commission: preset.commission,
    }));
  }, []);

  const loadValidator = useCallback(
    (totalStake: number, selfStake: number, commission: number) => {
      setActivePreset(null);
      setInputs((prev) => ({
        ...prev,
        stake: Math.round(totalStake),
        selfStake: Math.round(selfStake),
        commission,
      }));
    },
    []
  );

  return {
    inputs,
    results,
    verdict,
    activePreset,
    presets: PRESETS,
    updateInput,
    applyPreset,
    loadValidator,
  };
}
