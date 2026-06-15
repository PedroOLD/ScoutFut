import { C } from "@/lib/colors";
import type { StyleData } from "@/lib/types";
import { Card } from "./Card";
import { SectionTitle } from "./SectionTitle";

interface StyleCardProps {
  nameA: string;
  nameB: string;
  A: StyleData;
  B: StyleData;
}

type NumericAttr = "pressing" | "transition" | "aerial" | "creativity" | "defensive";

const ATTRS: Array<{ key: NumericAttr; label: string }> = [
  { key: "pressing",   label: "Pressing" },
  { key: "transition", label: "Transição" },
  { key: "aerial",     label: "Jogo aéreo" },
  { key: "creativity", label: "Criatividade" },
  { key: "defensive",  label: "Disciplina def." },
];

function Dots({ value, color }: { value: number; color: string }) {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {Array.from({ length: 5 }, (_, i) => (
        <div key={i} style={{
          width: 8, height: 8, borderRadius: "50%",
          background: i < value ? color : C.bgSec,
          border: i < value ? "none" : `0.5px solid ${C.border}`,
        }} />
      ))}
    </div>
  );
}

function PossessionBar({ value, color }: { value: number; color: string }) {
  return (
    <div style={{ flex: 1, height: 5, background: C.bgSec, borderRadius: 99, overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${value}%`, background: color, borderRadius: 99 }} />
    </div>
  );
}

export function StyleCard({ nameA, nameB, A, B }: StyleCardProps) {
  return (
    <Card>
      <SectionTitle>Estilo de jogo</SectionTitle>

      {/* Formation + description */}
      <div className="rg-2" style={{ gap: 14, marginBottom: 14 }}>
        <div>
          <span style={{
            fontSize: 13, fontWeight: 500, background: C.blue50, color: C.blue800,
            padding: "2px 10px", borderRadius: 6, display: "inline-block", marginBottom: 6,
          }}>{A.formation}</span>
          <div style={{ fontSize: 12, color: C.textSec, lineHeight: 1.6 }}>{A.description}</div>
        </div>
        <div>
          <span style={{
            fontSize: 13, fontWeight: 500, background: C.purple50, color: C.purple800,
            padding: "2px 10px", borderRadius: 6, display: "inline-block", marginBottom: 6,
          }}>{B.formation}</span>
          <div style={{ fontSize: 12, color: C.textSec, lineHeight: 1.6 }}>{B.description}</div>
        </div>
      </div>

      {/* Possession */}
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "6px 0", borderBottom: `0.5px solid ${C.border}`,
      }}>
        <span style={{ fontSize: 12, color: C.textSec, width: 130, flexShrink: 0 }}>Posse de bola</span>
        <span style={{ fontSize: 12, fontWeight: 500, color: C.blue600, width: 32, textAlign: "right", flexShrink: 0 }}>{A.possession}%</span>
        <PossessionBar value={A.possession} color={C.blue400} />
        <PossessionBar value={B.possession} color={C.purple400} />
        <span style={{ fontSize: 12, fontWeight: 500, color: C.purple600, width: 32, flexShrink: 0 }}>{B.possession}%</span>
      </div>

      {/* Passes */}
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "6px 0", borderBottom: `0.5px solid ${C.border}`,
      }}>
        <span style={{ fontSize: 12, color: C.textSec, width: 130, flexShrink: 0 }}>Passes/jogo</span>
        <span style={{ fontSize: 12, fontWeight: 500, color: C.blue600, width: 32, textAlign: "right", flexShrink: 0 }}>{A.passes}</span>
        <div style={{ flex: 2 }} />
        <span style={{ fontSize: 12, fontWeight: 500, color: C.purple600, width: 32, flexShrink: 0 }}>{B.passes}</span>
      </div>

      {/* 1–5 attributes */}
      {ATTRS.map(({ key, label }) => (
        <div key={key} style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "6px 0", borderBottom: `0.5px solid ${C.border}`,
        }}>
          <span style={{ fontSize: 12, color: C.textSec, width: 130, flexShrink: 0 }}>{label}</span>
          <Dots value={A[key]} color={C.blue400} />
          <div style={{ flex: 1 }} />
          <Dots value={B[key]} color={C.purple400} />
        </div>
      ))}
    </Card>
  );
}
