"use client";

const ASSUMPTIONS = [
  { label: "Block time", value: "0.4 seconds" },
  { label: "Blocks per day", value: "216,000" },
  { label: "Block reward", value: "25 MON" },
  { label: "Daily emission", value: "5,400,000 MON" },
  { label: "Annual inflation", value: "~1.97B MON (~2%)" },
  { label: "Max validator set", value: "200" },
  { label: "Min self-stake", value: "100,000 MON" },
  { label: "Min total stake", value: "10,000,000 MON" },
  { label: "Unbonding period", value: "~5.5 hours (1 epoch)" },
  { label: "Slashing", value: "Not active (protocol level)" },
];

export function KeyAssumptions() {
  return (
    <div
      className="bg-cream-5 border border-cream-8 rounded-2xl p-6 opacity-0 animate-fade-in-up"
      style={{ animationDelay: "0.40s" }}
    >

      <h2 className="font-display text-[11px] font-normal uppercase tracking-[0.12em] text-cream-40 mb-5">
        Key Assumptions
      </h2>

      <table className="w-full border-collapse mt-2">
        <caption className="sr-only">Key network assumptions</caption>
        <thead className="sr-only">
          <tr>
            <th scope="col">Parameter</th>
            <th scope="col">Value</th>
          </tr>
        </thead>
        <tbody>
          {ASSUMPTIONS.map((row) => (
            <tr key={row.label} className="border-b border-cream-5 last:border-0">
              <th scope="row" className="py-[9px] text-[13px] font-normal text-cream-40 text-left">
                {row.label}
              </th>
              <td className="py-[9px] text-[13px] font-semibold text-cream-60 text-right">
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
