import { C } from "@/lib/colors";
import type { ResultType } from "@/lib/types";

interface MatchRowProps {
  opp: string;
  score: string;
  type: ResultType;
  date: string;
}

export function MatchRow({ opp, score, type, date }: MatchRowProps) {
  const c = type === "W" ? C.green800 : type === "L" ? C.red800 : C.amber800;
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "5px 0", fontSize: 12, borderBottom: `0.5px solid ${C.border}`,
    }}>
      <span style={{ color: C.textSec, flex: 1 }}>{opp}</span>
      <span style={{ fontWeight: 500, color: c, margin: "0 12px" }}>{score}</span>
      <span style={{ fontSize: 10, color: C.textTer }}>{date}</span>
    </div>
  );
}
