import { C } from "@/lib/colors";
import type { Factor } from "@/lib/types";
import { Card } from "./Card";
import { SectionTitle } from "./SectionTitle";
import { FactorRow } from "./FactorRow";

interface ScoutFactorsProps {
  factors: Factor[];
  nameA: string;
  nameB: string;
}

export function ScoutFactors({ factors, nameA, nameB }: ScoutFactorsProps) {
  return (
    <Card>
      <SectionTitle>Comparativo ABDE — fatores de scout</SectionTitle>
      <div style={{ display: "flex", gap: 16, fontSize: 11, color: C.textSec, marginBottom: 10 }}>
        <span>
          <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: C.blue400, marginRight: 4 }} />
          {nameA}
        </span>
        <span>
          <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: C.purple400, marginRight: 4 }} />
          {nameB}
        </span>
        <span style={{ color: C.textTer }}>● = 1 ponto (máx 5)</span>
      </div>
      {factors.map((f, i) => (
        <FactorRow key={i} {...f} nameA={nameA} nameB={nameB} />
      ))}
    </Card>
  );
}
