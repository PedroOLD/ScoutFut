import { C } from "@/lib/colors";
import { poissonPmf, buildGrid, calcOutcomes, calcOver } from "@/lib/poisson";
import { Card } from "./Card";
import { SectionTitle } from "./SectionTitle";
import { MetricCard } from "./MetricCard";
import { Badge } from "./Badge";

interface PoissonInlineProps {
  teamA: string;
  teamB: string;
  avgAttackA: number;
  avgDefA: number;
  avgAttackB: number;
  avgDefB: number;
}

export function PoissonInline({ teamA, teamB, avgAttackA, avgDefA, avgAttackB, avgDefB }: PoissonInlineProps) {
  const lA = (avgAttackA + avgDefB) / 2;
  const lB = (avgAttackB + avgDefA) / 2;
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
  const maxP = placares[0].p;

  return (
    <Card style={{ marginBottom: 14 }}>
      <SectionTitle>Modelo de Poisson — placares prováveis pelas médias reais</SectionTitle>

      <div className="rg-5" style={{ gap: 8, marginBottom: 14 }}>
        <MetricCard label={`λ ${teamA}`} value={lA.toFixed(2)} valueColor={C.blue600} sub="gols esp." />
        <MetricCard label={`λ ${teamB}`} value={lB.toFixed(2)} valueColor={C.purple600} sub="gols esp." />
        <MetricCard label="Over 1.5" value={`${over15.toFixed(1)}%`} valueColor={C.green800} />
        <MetricCard label="Over 2.5" value={`${over25.toFixed(1)}%`} valueColor={C.teal600} />
        <MetricCard label="Ambos marcam" value={`${btts.toFixed(1)}%`} />
      </div>

      <div className="rg-2" style={{ gap: 14 }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 500, color: C.textSec, marginBottom: 8 }}>
            Top 8 placares mais prováveis
          </div>
          {placares.slice(0, 8).map(({ a, b, p }, i) => {
            const pct = (p * 100).toFixed(1);
            const barW = (p / maxP) * 100;
            const cor = a > b ? C.blue400 : b > a ? C.purple400 : C.gray400;
            const winner = a > b ? teamA : b > a ? teamB : "Empate";
            const bColor: "blue" | "purple" | "gray" = a > b ? "blue" : b > a ? "purple" : "gray";
            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "5px 0", borderBottom: `0.5px solid ${C.border}`,
              }}>
                <span style={{ fontWeight: 500, fontSize: 13, minWidth: 48, color: i === 0 ? cor : C.text }}>{a} – {b}</span>
                <Badge color={bColor}>{winner}</Badge>
                <div style={{ flex: 1, height: 5, background: C.bgSec, borderRadius: 99, overflow: "hidden" }}>
                  <div style={{ height: "100%", borderRadius: 99, background: cor, width: `${barW}%` }} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 500, color: cor, minWidth: 40, textAlign: "right" }}>{pct}%</span>
              </div>
            );
          })}
        </div>

        <div>
          <div style={{ fontSize: 12, fontWeight: 500, color: C.textSec, marginBottom: 8 }}>
            Matriz de probabilidade — {teamA} (linhas) × {teamB} (colunas)
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 11 }}>
              <thead>
                <tr>
                  <th style={{ background: C.bgSec, padding: "4px 8px", border: `0.5px solid ${C.border}`, color: C.textSec, fontWeight: 500 }}>A\B</th>
                  {[0, 1, 2, 3, 4, 5].map(j => (
                    <th key={j} style={{ background: C.bgSec, padding: "4px 8px", border: `0.5px solid ${C.border}`, color: C.textSec, fontWeight: 500 }}>{j}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[0, 1, 2, 3, 4, 5].map(i => (
                  <tr key={i}>
                    <th style={{ background: C.bgSec, padding: "4px 8px", border: `0.5px solid ${C.border}`, color: C.textSec, fontWeight: 500 }}>{i}</th>
                    {[0, 1, 2, 3, 4, 5].map(j => {
                      const p = grid[i][j];
                      const ratio = p / maxP;
                      let bg = "transparent";
                      if (i > j) bg = `rgba(55,138,221,${(ratio * 0.7).toFixed(2)})`;
                      else if (i < j) bg = `rgba(127,119,221,${(ratio * 0.7).toFixed(2)})`;
                      else bg = `rgba(136,135,128,${(ratio * 0.7).toFixed(2)})`;
                      return (
                        <td key={j} style={{
                          padding: "4px 8px", border: `0.5px solid ${C.border}`,
                          textAlign: "center", background: bg,
                          color: ratio > 0.55 ? "#fff" : C.text,
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
          <div style={{ fontSize: 10, color: C.textTer, marginTop: 6, lineHeight: 1.5 }}>
            λ = (ataque + defesa adversária) / 2 · Azul = vitória {teamA} · Roxo = vitória {teamB}
          </div>

          <div className="rg-3" style={{ gap: 8, marginTop: 12 }}>
            <MetricCard label={`${teamA} vence`} value={`${pA.toFixed(1)}%`} valueColor={C.blue600} />
            <MetricCard label="Empate" value={`${pD.toFixed(1)}%`} valueColor={C.gray600} />
            <MetricCard label={`${teamB} vence`} value={`${pB.toFixed(1)}%`} valueColor={C.purple600} />
          </div>
        </div>
      </div>
    </Card>
  );
}
