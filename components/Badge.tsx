import type { ReactNode } from "react";
import { C } from "@/lib/colors";
import type { BadgeColor } from "@/lib/types";

interface BadgeProps {
  children: ReactNode;
  color?: BadgeColor;
}

export function Badge({ children, color = "blue" }: BadgeProps) {
  const map: Record<BadgeColor, { bg: string; text: string }> = {
    blue: { bg: C.blue50, text: C.blue800 },
    purple: { bg: C.purple50, text: C.purple800 },
    amber: { bg: C.amber50, text: C.amber800 },
    red: { bg: C.red50, text: C.red800 },
    green: { bg: C.green50, text: C.green800 },
    gray: { bg: C.gray50, text: C.gray600 },
  };
  const { bg, text } = map[color] ?? map.blue;
  return (
    <span style={{
      display: "inline-block", fontSize: 11, fontWeight: 500,
      padding: "2px 8px", borderRadius: 99, background: bg, color: text,
    }}>{children}</span>
  );
}
