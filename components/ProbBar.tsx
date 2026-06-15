import { C } from "@/lib/colors";

interface ProbBarProps {
  label: string;
  pct: number;
  color: string;
}

export function ProbBar({ label, pct, color }: ProbBarProps) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: C.textSec, marginBottom: 3 }}>
        <span>{label}</span>
        <span style={{ fontWeight: 500, color }}>{pct.toFixed(1)}%</span>
      </div>
      <div style={{ height: 6, background: C.bgSec, borderRadius: 99, overflow: "hidden" }}>
        <div style={{ height: "100%", borderRadius: 99, background: color, width: `${pct}%`, transition: "width 0.4s" }} />
      </div>
    </div>
  );
}
