import { C } from "@/lib/colors";

interface PosPillProps {
  pos: string;
}

export function PosPill({ pos }: PosPillProps) {
  const map: Record<string, { bg: string; text: string }> = {
    GK: { bg: C.amber50, text: C.amber800 },
    RB: { bg: C.blue50, text: C.blue800 },
    CB: { bg: C.blue50, text: C.blue800 },
    LB: { bg: C.blue50, text: C.blue800 },
    DM: { bg: C.green50, text: C.green800 },
    CM: { bg: C.green50, text: C.green800 },
    AM: { bg: C.green50, text: C.green800 },
    LW: { bg: C.red50, text: C.red800 },
    RW: { bg: C.red50, text: C.red800 },
    ST: { bg: C.red50, text: C.red800 },
    FW: { bg: C.red50, text: C.red800 },
  };
  const { bg, text } = map[pos] ?? { bg: C.gray50, text: C.gray600 };
  return (
    <span style={{
      fontSize: 10, fontWeight: 500, width: 28, textAlign: "center",
      padding: "2px 0", borderRadius: 4, background: bg, color: text, flexShrink: 0,
    }}>{pos}</span>
  );
}
