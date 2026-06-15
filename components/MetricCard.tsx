import { C } from "@/lib/colors";

interface MetricCardProps {
  label: string;
  value: string | number;
  valueColor?: string;
  sub?: string;
}

export function MetricCard({ label, value, valueColor, sub }: MetricCardProps) {
  return (
    <div style={{
      background: C.bgSec, borderRadius: 8, padding: "10px 12px", textAlign: "center",
    }}>
      <div style={{ fontSize: 11, color: C.textSec, marginBottom: 3 }}>{label}</div>
      <div style={{ fontSize: 20, fontWeight: 500, color: valueColor ?? C.text }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: C.textTer, marginTop: 2 }}>{sub}</div>}
    </div>
  );
}
