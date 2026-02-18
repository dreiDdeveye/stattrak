"use client";

import { Icons } from "@/components/ui/Icons";
import { DashIcons } from "./DashIcons";

const AllIcons = { ...Icons, ...DashIcons };

export function GlowBar({ value, max = 100, color = "#00ffa3", height = 6 }) {
  return (
    <div style={{ width: "100%", height, background: "rgba(255,255,255,0.06)", borderRadius: height / 2, overflow: "hidden" }}>
      <div style={{ width: `${(value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}88, ${color})`, borderRadius: height / 2, boxShadow: `0 0 12px ${color}44`, transition: "width 1s ease-out" }} />
    </div>
  );
}

export function StatCard({ icon, label, value, subtitle, color = "#00ffa3", trend }) {
  return (
    <div style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "18px 20px", display: "flex", flexDirection: "column", gap: 10, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, right: 0, width: 80, height: 80, background: `radial-gradient(circle at top right, ${color}08, transparent)` }} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ color: color + "aa" }}>{icon}</div>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</span>
        </div>
        {trend !== undefined && (
          <div style={{ display: "flex", alignItems: "center", gap: 3, color: trend >= 0 ? "#00ffa3" : "#ff4466", fontSize: 11, fontWeight: 600 }}>
            {trend >= 0 ? <DashIcons.ArrowUp s={12} /> : <DashIcons.ArrowDown s={12} />}
            {Math.abs(trend).toFixed(1)}%
          </div>
        )}
      </div>
      <div style={{ fontSize: 28, fontWeight: 700, color, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "-0.02em" }}>{value}</div>
      {subtitle && <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>{subtitle}</div>}
    </div>
  );
}

export function SectionHeader({ icon, title, subtitle }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, marginTop: 8 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, borderRadius: 8, background: "rgba(0,255,163,0.08)", border: "1px solid rgba(0,255,163,0.15)" }}>{icon}</div>
      <div>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", margin: 0, letterSpacing: "-0.01em" }}>{title}</h2>
        {subtitle && <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", margin: "2px 0 0" }}>{subtitle}</p>}
      </div>
    </div>
  );
}

export function ComparisonStat({ label, value, avg, unit = "", lower = false, format }) {
  const displayVal = format ? format(value) : value;
  const displayAvg = format ? format(avg) : avg;
  const isGood = lower ? value <= avg : value >= avg;
  const color = isGood ? "#00ffa3" : "#ff4466";
  const pct = Math.min((value / (avg * 2)) * 100, 100);
  return (
    <div style={{ padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{label}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color, fontFamily: "'JetBrains Mono', monospace" }}>{displayVal}{unit}</span>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>avg {displayAvg}{unit}</span>
        </div>
      </div>
      <GlowBar value={pct} color={color} />
    </div>
  );
}

export function TabBar({ tabs, active, onChange }) {
  return (
    <div style={{ display: "flex", gap: 4, background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: 3, marginBottom: 16 }}>
      {tabs.map(t => (
        <button key={t.key} onClick={() => onChange(t.key)} style={{
          flex: 1, padding: "8px 12px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600,
          background: active === t.key ? "rgba(0,255,163,0.12)" : "transparent",
          color: active === t.key ? "#00ffa3" : "rgba(255,255,255,0.4)", transition: "all 0.2s",
        }}>{t.label}</button>
      ))}
    </div>
  );
}

export function SeverityBadge({ severity }) {
  const colors = { high: "#ff4466", medium: "#ffaa00", low: "#00d4ff" };
  const labels = { high: "HIGH PRIORITY", medium: "MEDIUM", low: "MINOR" };
  return (
    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", padding: "3px 8px", borderRadius: 4, background: colors[severity] + "18", color: colors[severity], border: `1px solid ${colors[severity]}33` }}>
      {labels[severity]}
    </span>
  );
}

export function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "rgba(12,14,20,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px 14px", backdropFilter: "blur(8px)", fontSize: 12 }}>
      <div style={{ color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color, fontWeight: 600, fontFamily: "'JetBrains Mono', monospace" }}>
          {p.name}: {typeof p.value === "number" ? p.value.toFixed(2) : p.value}
        </div>
      ))}
    </div>
  );
}
