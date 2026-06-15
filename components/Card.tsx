import type { ReactNode, CSSProperties } from "react";
import { C } from "@/lib/colors";

interface CardProps {
  children: ReactNode;
  style?: CSSProperties;
}

export function Card({ children, style }: CardProps) {
  return (
    <div style={{
      background: C.bg, border: `0.5px solid ${C.border}`,
      borderRadius: 12, padding: "14px 16px", ...style,
    }}>{children}</div>
  );
}
