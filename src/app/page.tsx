"use client";

import { useCallback, useRef } from "react";
import { useCalculator } from "@/hooks/use-calculator";
import { useValidatorTable } from "@/hooks/use-validator-table";
import { calculateValidatorProfit } from "@/lib/calculations";
import { Header } from "@/components/header";
import { StatsBar } from "@/components/stats-bar";
import { ValidatorTable } from "@/components/validator-table";
import { CalculatorForm } from "@/components/calculator-form";
import { ResultsPanel } from "@/components/results-panel";
import { VerdictCard } from "@/components/verdict-card";
import { RevenueBreakdown } from "@/components/revenue-breakdown";
import { KeyAssumptions } from "@/components/key-assumptions";
import { Footer } from "@/components/footer";

export default function Home() {
  const {
    inputs,
    results,
    verdict,
    activePreset,
    presets,
    updateInput,
    applyPreset,
    loadValidator,
  } = useCalculator();

  const calcGridRef = useRef<HTMLDivElement>(null);

  const calcProfit = useCallback(
    (totalStake: number, selfStake: number, commission: number) =>
      calculateValidatorProfit(
        totalStake,
        selfStake,
        commission,
        inputs.networkStake,
        inputs.monPrice,
        inputs.serverCost,
        inputs.otherCosts,
        inputs.priorityFees
      ),
    [
      inputs.networkStake,
      inputs.monPrice,
      inputs.serverCost,
      inputs.otherCosts,
      inputs.priorityFees,
    ]
  );

  const {
    sorted,
    sortCol,
    sortDir,
    searchTerm,
    selectedName,
    setSearchTerm,
    setSelectedName,
    toggleSort,
  } = useValidatorTable(calcProfit);

  const handleRowClick = useCallback(
    (
      name: string,
      totalStake: number,
      selfStake: number,
      commission: number
    ) => {
      setSelectedName(name);
      loadValidator(totalStake, selfStake, commission);
      calcGridRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    },
    [setSelectedName, loadValidator]
  );

  return (
    <div className="relative z-[1] px-6 pt-8 pb-6">
      <div className="max-w-[1340px] mx-auto">
        <Header inputs={inputs} />
        <StatsBar inputs={inputs} />
        <ValidatorTable
          sorted={sorted}
          sortCol={sortCol}
          sortDir={sortDir}
          searchTerm={searchTerm}
          selectedName={selectedName}
          setSearchTerm={setSearchTerm}
          onRowClick={handleRowClick}
          toggleSort={toggleSort}
        />

        {/* Calculator Grid */}
        <div
          ref={calcGridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10"
        >
          <CalculatorForm
            inputs={inputs}
            activePreset={activePreset}
            presets={presets}
            updateInput={updateInput}
            applyPreset={applyPreset}
          />
          <div className="flex flex-col gap-5">
            <ResultsPanel results={results} />
            <VerdictCard verdict={verdict} results={results} />
            <RevenueBreakdown results={results} monPrice={inputs.monPrice} />
            <KeyAssumptions />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
