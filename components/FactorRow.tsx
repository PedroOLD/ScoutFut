import { C } from "@/lib/colors";
import type { WinnerType } from "@/lib/types";
import { Badge } from "./Badge";

interface FactorRowProps {
  label: string;
  scoreA: number;
  scoreB: number;
  winner: WinnerType;
  nameA: string;
  nameB: string;
}

export function FactorRow({ label, scoreA, scoreB, winner, nameA, nameB }: FactorRowProps) {
  const dotsA = Array.from({ length: 5 }, (_, i) => i < scoreA);
  const dotsB = Array.from({ length: 5 }, (_, i) => i < scoreB);
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10,
      padding: "6px 0", borderBottom: `0.5px solid ${C.border}`,
    }}>
      <span style={{ fontSize: 12, color: C.textSec, width: 150, flexShrink: 0 }}>{label}</span>
      <div style={{ display: "flex", gap: 4, flex: 1, alignItems: "center" }}>
        <span style={{ fontSize: 11, marginRight: 2 }}>A</span>
        {dotsA.map((f, i) => (
          <div key={i} style={{
            width: 10, height: 10, borderRadius: "50%",
            background: f ? C.blue400 : C.bgSec,
            border: f ? "none" : `0.5px solid ${C.border}`,
          }} />
        ))}
      </div>
      <div style={{ display: "flex", gap: 4, flex: 1, alignItems: "center" }}>
        <span style={{ fontSize: 11, marginRight: 2 }}>B</span>
        {dotsB.map((f, i) => (
          <div key={i} style={{
            width: 10, height: 10, borderRadius: "50%",
            background: f ? C.purple400 : C.bgSec,
            border: f ? "none" : `0.5px solid ${C.border}`,
          }} />
        ))}
      </div>
      <Badge color={winner === "A" ? "blue" : winner === "B" ? "purple" : "amber"}>
        {winner === "A" ? nameA : winner === "B" ? nameB : "Igual"} {winner === "A" ? scoreA : scoreB}/5
      </Badge>
    </div>
  );
}
