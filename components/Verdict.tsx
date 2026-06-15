import { C } from "@/lib/colors";
import type { Tag } from "@/lib/types";
import { Badge } from "./Badge";

interface VerdictProps {
  prediction: string;
  text: string;
  tags: Tag[];
}

export function Verdict({ prediction, text, tags }: VerdictProps) {
  return (
    <div style={{
      background: C.teal50, border: "0.5px solid #9FE1CB",
      borderRadius: 12, padding: "16px 20px",
    }}>
      <div style={{ fontSize: 13, fontWeight: 500, color: C.teal800, marginBottom: 8 }}>
        📋 Veredicto do scout — placar mais provável: {prediction}
      </div>
      <div style={{ fontSize: 13, color: C.teal600, lineHeight: 1.6, marginBottom: 12 }}>{text}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {tags.map((t, i) => <Badge key={i} color={t.color}>{t.text}</Badge>)}
      </div>
    </div>
  );
}
