import { C } from "@/lib/colors";
import type { MatchResult, Player, Alert } from "@/lib/types";
import { Card } from "./Card";
import { SectionTitle } from "./SectionTitle";
import { MatchRow } from "./MatchRow";
import { MetricCard } from "./MetricCard";
import { PosPill } from "./PosPill";
import { Badge } from "./Badge";

interface TeamColumnProps {
  name: string;
  flag: string;
  coach: string;
  matches: MatchResult[];
  goals_scored: number;
  goals_conceded: number;
  players: Player[];
  alerts?: Alert[];
}

export function TeamColumn({ name, flag, coach, matches, goals_scored, goals_conceded, players, alerts }: TeamColumnProps) {
  return (
    <Card>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <span style={{ fontSize: 24 }}>{flag}</span>
        <div>
          <div style={{ fontSize: 15, fontWeight: 500 }}>{name}</div>
          <div style={{ fontSize: 12, color: C.textSec }}>{coach}</div>
        </div>
      </div>

      <SectionTitle>Últimos 10 jogos</SectionTitle>
      <div style={{ marginBottom: 10 }}>
        {matches.map((m, i) => <MatchRow key={i} {...m} />)}
      </div>

      <div className="rg-3" style={{ gap: 8, marginTop: 10 }}>
        <MetricCard label="Méd. marcados" value={goals_scored.toFixed(1)} valueColor={C.green800} sub="por jogo" />
        <MetricCard label="Méd. sofridos" value={goals_conceded.toFixed(1)} valueColor={C.amber800} sub="por jogo" />
        <MetricCard
          label="Saldo"
          value={(goals_scored - goals_conceded).toFixed(1)}
          valueColor={goals_scored >= goals_conceded ? C.green800 : C.red800}
        />
      </div>

      <div style={{ marginTop: 14 }}>
        <SectionTitle>Escalação provável</SectionTitle>
        {players.map((p, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "6px 0", borderBottom: `0.5px solid ${C.border}`,
          }}>
            <PosPill pos={p.pos} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13 }}>{p.name}</div>
              <div style={{ fontSize: 11, color: C.textSec }}>{p.club}</div>
            </div>
            <span style={{
              fontSize: 13, fontWeight: 500,
              color: p.rating >= 7.5 ? C.green800 : p.rating >= 7.0 ? C.amber800 : C.red800,
            }}>{p.rating.toFixed(1)}</span>
          </div>
        ))}
      </div>

      {alerts && alerts.length > 0 && (
        <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 4 }}>
          {alerts.map((a, i) => <Badge key={i} color={a.type}>{a.text}</Badge>)}
        </div>
      )}
    </Card>
  );
}
