import { C } from "@/lib/colors";
import type { SetPieces } from "@/lib/types";
import { Card } from "./Card";
import { SectionTitle } from "./SectionTitle";

interface SetPiecesCardProps {
  nameA: string;
  nameB: string;
  A: SetPieces;
  B: SetPieces;
}

const rows: Array<{
  label: string;
  getA: (s: SetPieces) => string;
  getB: (s: SetPieces) => string;
  numA: (s: SetPieces) => number;
  numB: (s: SetPieces) => number;
  higherIsBetter: boolean;
}> = [
  {
    label: "% gols marcados de BP",
    getA: s => `${s.goalsPct}%`, getB: s => `${s.goalsPct}%`,
    numA: s => s.goalsPct, numB: s => s.goalsPct,
    higherIsBetter: true,
  },
  {
    label: "% gols sofridos de BP",
    getA: s => `${s.concededPct}%`, getB: s => `${s.concededPct}%`,
    numA: s => s.concededPct, numB: s => s.concededPct,
    higherIsBetter: false,
  },
  {
    label: "Escanteios a favor/jogo",
    getA: s => s.cornersFor.toFixed(1), getB: s => s.cornersFor.toFixed(1),
    numA: s => s.cornersFor, numB: s => s.cornersFor,
    higherIsBetter: true,
  },
  {
    label: "Faltas sofridas/jogo",
    getA: s => s.foulsSuffered.toFixed(1), getB: s => s.foulsSuffered.toFixed(1),
    numA: s => s.foulsSuffered, numB: s => s.foulsSuffered,
    higherIsBetter: true,
  },
  {
    label: "Pênaltis (10 jogos)",
    getA: s => String(s.penalties), getB: s => String(s.penalties),
    numA: s => s.penalties, numB: s => s.penalties,
    higherIsBetter: true,
  },
];

export function SetPiecesCard({ nameA, nameB, A, B }: SetPiecesCardProps) {
  return (
    <Card>
      <SectionTitle>Bola parada</SectionTitle>
      <div style={{ display: "flex", gap: 16, fontSize: 11, color: C.textSec, marginBottom: 10 }}>
        <span>
          <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: C.blue400, marginRight: 4 }} />
          {nameA}
        </span>
        <span>
          <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: C.purple400, marginRight: 4 }} />
          {nameB}
        </span>
      </div>

      {rows.map(({ label, getA, getB, numA, numB, higherIsBetter }, i) => {
        const vA = numA(A), vB = numB(B);
        const aWins = higherIsBetter ? vA > vB : vA < vB;
        const bWins = higherIsBetter ? vB > vA : vB < vA;
        return (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "7px 0", borderBottom: `0.5px solid ${C.border}`,
          }}>
            <span style={{ fontSize: 12, color: C.textSec, flex: 1 }}>{label}</span>
            <span style={{
              fontSize: 13, fontWeight: aWins ? 600 : 400, minWidth: 44, textAlign: "right",
              color: aWins ? C.blue600 : C.text,
            }}>{getA(A)}</span>
            <span style={{ fontSize: 10, color: C.border, minWidth: 6, textAlign: "center" }}>|</span>
            <span style={{
              fontSize: 13, fontWeight: bWins ? 600 : 400, minWidth: 44,
              color: bWins ? C.purple600 : C.text,
            }}>{getB(B)}</span>
          </div>
        );
      })}

      {(A.note || B.note) && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 10 }}>
          <div style={{ fontSize: 11, color: C.blue600, lineHeight: 1.5, fontStyle: "italic" }}>{A.note ?? ""}</div>
          <div style={{ fontSize: 11, color: C.purple600, lineHeight: 1.5, fontStyle: "italic" }}>{B.note ?? ""}</div>
        </div>
      )}
    </Card>
  );
}
