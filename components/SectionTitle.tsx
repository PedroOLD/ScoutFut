import type { ReactNode } from "react";
import { C } from "@/lib/colors";

interface SectionTitleProps {
  children: ReactNode;
}

export function SectionTitle({ children }: SectionTitleProps) {
  return (
    <div style={{
      fontSize: 10, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase",
      color: C.textSec, marginBottom: 10, paddingBottom: 6,
      borderBottom: `0.5px solid ${C.border}`,
    }}>{children}</div>
  );
}
