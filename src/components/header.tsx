"use client";

export function Header() {
  return (
    <>
      <header
        className="text-center mb-10 pb-7 border-b border-cream-8 opacity-0 animate-fade-in-up"
        style={{ animationDelay: "0.08s" }}
      >
        <h1 className="font-display text-[32px] font-normal mb-2 text-cream tracking-[0.03em]">
          Monad Validator Calculator
        </h1>
        <p className="font-body text-cream-40 text-[15px] font-light">
          Estimate returns from running a Monad validator
        </p>
      </header>

      <div
        className="bg-cream-5 border border-cream-8 rounded-[10px] px-[18px] py-[14px] text-xs text-cream-40 mb-7 leading-[1.7] font-light opacity-0 animate-fade-in-up"
        style={{ animationDelay: "0.16s" }}
      >
        <strong className="text-cream-60 font-semibold">Monad Network:</strong>{" "}
        Mainnet launched Nov 24, 2025. 200 max validators. 0.4s blocks. 25 MON
        block reward (~2% annual inflation). No automated slashing currently
        active.{" "}
        <strong className="text-cream-60 font-semibold">
          Bare metal required
        </strong>{" "}
        &mdash; cloud hosting not supported.
      </div>
    </>
  );
}
