import { C } from "@/lib/colors";
import type { GoalTiming } from "@/lib/types";
import { Card } from "./Card";
import { SectionTitle } from "./SectionTitle";

const LABELS = ["1-15", "16-30", "31-45", "46-60", "61-75", "76-90", "90+"];
const BAR_MAX_H = 52;

interface GoalTimingCardProps {
  nameA: string;
  nameB: string;
  A: GoalTiming;
  B: GoalTiming;
}

function MiniChart({
  dataA,
  dataB,
  colorA,
  colorB,
}: {
  dataA: readonly number[];
  dataB: readonly number[];
  colorA: string;
  colorB: string;
}) {
  const peak = Math.max(...dataA, ...dataB, 1);
  return (
    <div style={{ display: "flex", gap: 6, alignItems: "flex-end" }}>
      {LABELS.map((label, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, flex: 1 }}>
          <div style={{ display: "flex", gap: 2, alignItems: "flex-end", height: BAR_MAX_H }}>
            <div style={{
              width: 10, borderRadius: "3px 3px 0 0", transition: "height 0.3s",
              height: dataA[i] > 0 ? Math.max((dataA[i] / peak) * BAR_MAX_H, 4) : 0,
              background: colorA,
            }} />
            <div style={{
              width: 10, borderRadius: "3px 3px 0 0", transition: "height 0.3s",
              height: dataB[i] > 0 ? Math.max((dataB[i] / peak) * BAR_MAX_H, 4) : 0,
              background: colorB,
            }} />
          </div>
          <div style={{ fontSize: 9, color: C.textTer, whiteSpace: "nowrap" }}>{label}</div>
        </div>
      ))}
    </div>
  );
}

export function GoalTimingCard({ nameA, nameB, A, B }: GoalTimingCardProps) {
  return (
    <Card style={{ marginBottom: 14 }}>
      <SectionTitle>Timing de gols (últimos 10 jogos)</SectionTitle>

      <div style={{ display: "flex", gap: 16, fontSize: 11, color: C.textSec, marginBottom: 14 }}>
        <span>
          <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 2, background: C.blue400, marginRight: 4 }} />
          {nameA}
        </span>
        <span>
          <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 2, background: C.purple400, marginRight: 4 }} />
          {nameB}
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 500, color: C.green800, marginBottom: 10 }}>Gols marcados</div>
          <MiniChart dataA={A.scored} dataB={B.scored} colorA={C.blue400} colorB={C.purple400} />
          {A.note && (
            <div style={{ fontSize: 10, color: C.blue600, lineHeight: 1.5, marginTop: 8, fontStyle: "italic" }}>
              {nameA}: {A.note}
            </div>
          )}
          {B.note && (
            <div style={{ fontSize: 10, color: C.purple600, lineHeight: 1.5, marginTop: 4, fontStyle: "italic" }}>
              {nameB}: {B.note}
            </div>
          )}
        </div>

        <div>
          <div style={{ fontSize: 11, fontWeight: 500, color: C.red800, marginBottom: 10 }}>Gols sofridos</div>
          <MiniChart dataA={A.conceded} dataB={B.conceded} colorA={C.amber600} colorB={C.red600} />
          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            <span style={{ fontSize: 10, color: C.amber800 }}>
              <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 2, background: C.amber600, marginRight: 4 }} />
              {nameA}
            </span>
            <span style={{ fontSize: 10, color: C.red800 }}>
              <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 2, background: C.red600, marginRight: 4 }} />
              {nameB}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
