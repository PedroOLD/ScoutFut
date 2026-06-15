"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { C } from "@/lib/colors";
import { MATCHES, MATCH_OPTIONS } from "@/lib/matchData";
import { MetricCard } from "./MetricCard";
import { TeamColumn } from "./TeamColumn";
import { ScoutFactors } from "./ScoutFactors";
import { SetPiecesCard } from "./SetPiecesCard";
import { StyleCard } from "./StyleCard";
import { GoalTimingCard } from "./GoalTimingCard";
import { PoissonInline } from "./PoissonInline";
import { PoissonWidget } from "./PoissonWidget";
import { ProbBar } from "./ProbBar";
import { Verdict } from "./Verdict";

export function ScoutApp() {
  const [selected, setSelected] = useState("iran-nz");
  const [tab, setTab] = useState("scout");

  const match = MATCHES[selected];
  const { teamA, teamB, factors, probA, probD, probB, prediction, verdict, observation, tags, group, date, venue, note } = match;

  const tabStyle = (t: string): CSSProperties => ({
    padding: "8px 16px", fontSize: 13,
    fontWeight: tab === t ? 500 : 400,
    color: tab === t ? C.blue600 : C.textSec,
    cursor: "pointer", background: "none", border: "none",
    borderBottom: tab === t ? `2px solid ${C.blue600}` : "2px solid transparent",
  });

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", color: C.text, background: C.bgSec, minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ background: C.bg, borderBottom: `0.5px solid ${C.border}`, padding: "12px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 500 }}>🔍 Scout Report — Copa do Mundo 2026</div>
              <div style={{ fontSize: 12, color: C.textSec, marginTop: 2 }}>Metodologia ABDE + Modelo de Poisson</div>
            </div>
            <select
              value={selected}
              onChange={e => { setSelected(e.target.value); setTab("scout"); }}
              style={{
                fontSize: 13, padding: "8px 12px", borderRadius: 8,
                border: `0.5px solid ${C.border}`, background: C.bg, color: C.text, cursor: "pointer",
              }}
            >
              {MATCH_OPTIONS.map(o => <option key={o.key} value={o.key}>{o.label}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "20px 24px" }}>

        {/* Match header */}
        <div style={{
          background: C.bg, border: `0.5px solid ${C.border}`, borderRadius: 12,
          padding: "16px 20px", marginBottom: 16,
          display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28 }}>{teamA.flag}</div>
              <div style={{ fontSize: 14, fontWeight: 500 }}>{teamA.name}</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 11, color: C.textSec }}>{group}</div>
              <div style={{ fontSize: 18, fontWeight: 500, color: C.textSec }}>vs</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28 }}>{teamB.flag}</div>
              <div style={{ fontSize: 14, fontWeight: 500 }}>{teamB.name}</div>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 13, fontWeight: 500 }}>{date}</div>
            <div style={{ fontSize: 12, color: C.textSec }}>{venue}</div>
          </div>
        </div>

        {note && (
          <div style={{
            background: C.amber50, border: "0.5px solid #FAC775", borderRadius: 8,
            padding: "8px 14px", fontSize: 12, color: C.amber800, marginBottom: 14,
          }}>{note}</div>
        )}

        {/* Tabs */}
        <div style={{
          display: "flex", borderBottom: `0.5px solid ${C.border}`, marginBottom: 16,
          background: C.bg, borderRadius: "12px 12px 0 0", padding: "0 4px",
        }}>
          <button style={tabStyle("scout")} onClick={() => setTab("scout")}>Relatório de scout</button>
          <button style={tabStyle("poisson")} onClick={() => setTab("poisson")}>Modelo de Poisson</button>
        </div>

        {tab === "scout" && (
          <>
            {/* Summary metrics */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 16 }}>
              <MetricCard label={`${teamA.name} — vitória`} value={`${probA.toFixed(1)}%`} valueColor={C.blue600} />
              <MetricCard label="Empate" value={`${probD.toFixed(1)}%`} valueColor={C.gray600} />
              <MetricCard label={`${teamB.name} — vitória`} value={`${probB.toFixed(1)}%`} valueColor={C.purple600} />
              <MetricCard label="xG projetado" value={`${(teamA.avgAttack * 0.7).toFixed(1)} – ${(teamB.avgAttack * 0.7).toFixed(1)}`} sub="aprox." />
            </div>

            {/* Team columns */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
              <TeamColumn
                name={teamA.name} flag={teamA.flag} coach={teamA.coach}
                matches={teamA.matches} players={teamA.players} alerts={teamA.alerts}
                goals_scored={teamA.avgAttack} goals_conceded={teamA.avgDef}
              />
              <TeamColumn
                name={teamB.name} flag={teamB.flag} coach={teamB.coach}
                matches={teamB.matches} players={teamB.players} alerts={teamB.alerts}
                goals_scored={teamB.avgAttack} goals_conceded={teamB.avgDef}
              />
            </div>

            {/* Scout factors */}
            <div style={{ marginBottom: 14 }}>
              <ScoutFactors factors={factors} nameA={teamA.name} nameB={teamB.name} />
            </div>

            {/* Set pieces + Style side by side */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
              <SetPiecesCard nameA={teamA.name} nameB={teamB.name} A={teamA.setpieces} B={teamB.setpieces} />
              <StyleCard nameA={teamA.name} nameB={teamB.name} A={teamA.style} B={teamB.style} />
            </div>

            {/* Goal timing */}
            <GoalTimingCard nameA={teamA.name} nameB={teamB.name} A={teamA.timing} B={teamB.timing} />

            {/* Poisson inline */}
            <PoissonInline
              teamA={teamA.name} teamB={teamB.name}
              avgAttackA={teamA.avgAttack} avgDefA={teamA.avgDef}
              avgAttackB={teamB.avgAttack} avgDefB={teamB.avgDef}
            />

            {/* Probability bars + Verdict */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
              <div style={{ background: C.bg, border: `0.5px solid ${C.border}`, borderRadius: 12, padding: "14px 16px" }}>
                <div style={{
                  fontSize: 10, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase",
                  color: C.textSec, marginBottom: 10, paddingBottom: 6, borderBottom: `0.5px solid ${C.border}`,
                }}>Probabilidades de resultado</div>
                <ProbBar label={`${teamA.name} vence`} pct={probA} color={C.blue400} />
                <ProbBar label="Empate" pct={probD} color={C.gray400} />
                <ProbBar label={`${teamB.name} vence`} pct={probB} color={C.purple400} />
              </div>
              <Verdict prediction={prediction} text={verdict} tags={tags} />
            </div>

            {/* Observation */}
            {observation && (
              <div style={{
                background: C.blue50, border: `0.5px solid ${C.blue200}`,
                borderRadius: 12, padding: "14px 18px",
              }}>
                <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: C.blue600, marginBottom: 6 }}>
                  Observação final do scout
                </div>
                <div style={{ fontSize: 13, color: C.blue800, lineHeight: 1.7 }}>{observation}</div>
              </div>
            )}
          </>
        )}

        {tab === "poisson" && (
          <PoissonWidget
            teamA={teamA.name} teamB={teamB.name}
            avgAttackA={teamA.avgAttack} avgDefA={teamA.avgDef}
            avgAttackB={teamB.avgAttack} avgDefB={teamB.avgDef}
          />
        )}
      </div>
    </div>
  );
}
