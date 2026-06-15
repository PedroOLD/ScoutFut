"use client";

import { useState, useCallback } from "react";
import { C } from "@/lib/colors";
import { poissonPmf, buildGrid, calcOutcomes, calcOver } from "@/lib/poisson";
import { Card } from "./Card";
import { SectionTitle } from "./SectionTitle";
import { MetricCard } from "./MetricCard";
import { ProbBar } from "./ProbBar";
import { Badge } from "./Badge";

interface PoissonWidgetProps {
  teamA?: string;
  teamB?: string;
  avgAttackA?: number;
  avgDefA?: number;
  avgAttackB?: number;
  avgDefB?: number;
}

interface CalcResult {
  lA: number; lB: number;
  pA: number; pB: number; pD: number;
  grid: number[][];
  placares: Array<{ a: number; b: number; p: number }>;
  over25: number; over15: number; btts: number;
  MAX: number;
}

export function PoissonWidget({ teamA, teamB, avgAttackA, avgDefA, avgAttackB, avgDefB }: PoissonWidgetProps) {
  const [nA, setNA] = useState(teamA ?? "Time A");
  const [nB, setNB] = useState(teamB ?? "Time B");
  const [atkA, setAtkA] = useState(String(avgAttackA ?? 1.5));
  const [defA, setDefA] = useState(String(avgDefA ?? 1.0));
  const [atkB, setAtkB] = useState(String(avgAttackB ?? 1.5));
  const [defB, setDefB] = useState(String(avgDefB ?? 1.0));
  const [result, setResult] = useState<CalcResult | null>(null);

  const calcular = useCallback(() => {
    const lA = (parseFloat(atkA) + parseFloat(defB)) / 2;
    const lB = (parseFloat(atkB) + parseFloat(defA)) / 2;
    const MAX = 6;
    const grid = buildGrid(lA, lB, MAX);
    const { pA, pB, pD } = calcOutcomes(grid, MAX);
    const over25 = calcOver(lA, lB, 2.5);
    const over15 = calcOver(lA, lB, 1.5);
    const btts = (1 - poissonPmf(lA, 0)) * (1 - poissonPmf(lB, 0)) * 100;

    const placares: Array<{ a: number; b: number; p: number }> = [];
    for (let i = 0; i <= MAX; i++)
      for (let j = 0; j <= MAX; j++)
        placares.push({ a: i, b: j, p: grid[i][j] });
    placares.sort((x, y) => y.p - x.p);

    setResult({ lA, lB, pA, pB, pD, grid, placares, over25, over15, btts, MAX });
  }, [atkA, defA, atkB, defB]);

  const inp = (val: string, set: (v: string) => void) => (
    <input
      type="number" min="0" max="10" step="0.1" value={val}
      onChange={e => set(e.target.value)}
      style={{
        width: 72, textAlign: "center", fontSize: 15,
        border: `0.5px solid ${C.border}`, borderRadius: 8,
        padding: "6px 4px", background: C.bg, color: C.text, outline: "none",
      }}
    />
  );

  return (
    <div>
      <Card style={{ marginBottom: 12 }}>
        <SectionTitle>Modelo de Poisson — insira as médias</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 12, color: C.textSec, marginBottom: 6 }}>Time A</div>
            <input value={nA} onChange={e => setNA(e.target.value)}
              style={{
                width: "100%", fontSize: 14, marginBottom: 8,
                border: `0.5px solid ${C.border}`, borderRadius: 8,
                padding: "6px 10px", background: C.bg, color: C.text, outline: "none",
              }} />
            <div style={{ display: "flex", gap: 10 }}>
              <div>
                <div style={{ fontSize: 11, color: C.textSec, marginBottom: 3 }}>Gols marcados/jogo</div>
                {inp(atkA, setAtkA)}
              </div>
              <div>
                <div style={{ fontSize: 11, color: C.textSec, marginBottom: 3 }}>Gols sofridos/jogo</div>
                {inp(defA, setDefA)}
              </div>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: C.textSec, marginBottom: 6 }}>Time B</div>
            <input value={nB} onChange={e => setNB(e.target.value)}
              style={{
                width: "100%", fontSize: 14, marginBottom: 8,
                border: `0.5px solid ${C.border}`, borderRadius: 8,
                padding: "6px 10px", background: C.bg, color: C.text, outline: "none",
              }} />
            <div style={{ display: "flex", gap: 10 }}>
              <div>
                <div style={{ fontSize: 11, color: C.textSec, marginBottom: 3 }}>Gols marcados/jogo</div>
                {inp(atkB, setAtkB)}
              </div>
              <div>
                <div style={{ fontSize: 11, color: C.textSec, marginBottom: 3 }}>Gols sofridos/jogo</div>
                {inp(defB, setDefB)}
              </div>
            </div>
          </div>
        </div>
        <button onClick={calcular} style={{
          padding: "8px 20px", fontSize: 13, borderRadius: 8, cursor: "pointer",
          border: `0.5px solid ${C.border}`, background: C.bg, color: C.text,
        }}>Calcular probabilidades</button>
      </Card>

      {result && (() => {
        const { lA, lB, pA, pB, pD, grid, placares, over25, over15, btts, MAX } = result;
        const maxP = placares[0].p;
        return (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 14 }}>
              <MetricCard label={`λ ${nA}`} value={lA.toFixed(2)} valueColor={C.blue600} sub="gols esperados" />
              <MetricCard label={`λ ${nB}`} value={lB.toFixed(2)} valueColor={C.purple600} sub="gols esperados" />
              <MetricCard label="Total esperado" value={(lA + lB).toFixed(2)} sub="gols na partida" />
              <MetricCard label="Over 2.5" value={`${over25.toFixed(1)}%`} valueColor={C.green800} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
              <Card>
                <SectionTitle>Probabilidade de resultado</SectionTitle>
                <ProbBar label={`${nA} vence`} pct={pA} color={C.blue400} />
                <ProbBar label="Empate" pct={pD} color={C.gray400} />
                <ProbBar label={`${nB} vence`} pct={pB} color={C.purple400} />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 12 }}>
                  <MetricCard label="Over 1.5" value={`${over15.toFixed(1)}%`} />
                  <MetricCard label="Ambos marcam" value={`${btts.toFixed(1)}%`} />
                </div>
              </Card>

              <Card>
                <SectionTitle>Top 8 placares mais prováveis</SectionTitle>
                {placares.slice(0, 8).map(({ a, b, p }, i) => {
                  const pct = (p * 100).toFixed(1);
                  const barW = (p / maxP) * 100;
                  const cor = a > b ? C.blue400 : b > a ? C.purple400 : C.gray400;
                  const winner = a > b ? nA : b > a ? nB : "Empate";
                  const bColor: "blue" | "purple" | "gray" = a > b ? "blue" : b > a ? "purple" : "gray";
                  return (
                    <div key={i} style={{
                      display: "flex", alignItems: "center", gap: 8,
                      padding: "5px 0", borderBottom: `0.5px solid ${C.border}`,
                    }}>
                      <span style={{ fontWeight: 500, fontSize: 13, minWidth: 48 }}>{a} – {b}</span>
                      <Badge color={bColor}>{winner}</Badge>
                      <div style={{ flex: 1, height: 5, background: C.bgSec, borderRadius: 99, overflow: "hidden" }}>
                        <div style={{ height: "100%", borderRadius: 99, background: cor, width: `${barW}%` }} />
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 500, color: cor, minWidth: 40, textAlign: "right" }}>{pct}%</span>
                    </div>
                  );
                })}
              </Card>
            </div>

            <Card>
              <SectionTitle>Matriz de probabilidade — {nA} (linhas) × {nB} (colunas)</SectionTitle>
              <div style={{ overflowX: "auto" }}>
                <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 12 }}>
                  <thead>
                    <tr>
                      <th style={{ background: C.bgSec, padding: "5px 10px", border: `0.5px solid ${C.border}`, color: C.textSec }}>A\B</th>
                      {Array.from({ length: MAX }, (_, j) => (
                        <th key={j} style={{ background: C.bgSec, padding: "5px 10px", border: `0.5px solid ${C.border}`, color: C.textSec }}>{j}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: MAX }, (_, i) => (
                      <tr key={i}>
                        <th style={{ background: C.bgSec, padding: "5px 10px", border: `0.5px solid ${C.border}`, color: C.textSec }}>{i}</th>
                        {Array.from({ length: MAX }, (_, j) => {
                          const p = grid[i][j];
                          const ratio = p / maxP;
                          let bg = "transparent";
                          if (i > j) bg = `rgba(55,138,221,${(ratio * 0.65).toFixed(2)})`;
                          else if (i < j) bg = `rgba(127,119,221,${(ratio * 0.65).toFixed(2)})`;
                          else bg = `rgba(136,135,128,${(ratio * 0.65).toFixed(2)})`;
                          return (
                            <td key={j} style={{
                              padding: "5px 10px", border: `0.5px solid ${C.border}`,
                              textAlign: "center", background: bg,
                              color: ratio > 0.5 ? "#fff" : C.text,
                              fontWeight: ratio > 0.7 ? 500 : 400,
                            }}>
                              {(p * 100).toFixed(1)}%
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p style={{ fontSize: 11, color: C.textTer, marginTop: 8, lineHeight: 1.5 }}>
                Lambda = (ataque do time + defesa adversária) / 2 · Modelo de Poisson independente · Azul = vitória Time A · Roxo = vitória Time B
              </p>
            </Card>
          </div>
        );
      })()}
    </div>
  );
}
