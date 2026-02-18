"use client";

import { useState } from "react";
import { ComposedChart, Bar, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Icons } from "@/components/ui/Icons";
import { DashIcons } from "./DashIcons";
import { SectionHeader, ComparisonStat, TabBar, CustomTooltip } from "./DashUI";
import { CONTEXTUAL_STATS } from "@/data/dashboardData";

export default function ContextualBreakdown() {
  const [tab, setTab] = useState("rounds");
  const roundData = [
    { name: "Pistol", kd: CONTEXTUAL_STATS.pistol.kd, adr: CONTEXTUAL_STATS.pistol.adr, wr: CONTEXTUAL_STATS.pistol.winRate },
    { name: "Eco", kd: CONTEXTUAL_STATS.eco.kd, adr: CONTEXTUAL_STATS.eco.adr, wr: CONTEXTUAL_STATS.eco.winRate },
    { name: "Force", kd: CONTEXTUAL_STATS.forceBuy.kd, adr: CONTEXTUAL_STATS.forceBuy.adr, wr: CONTEXTUAL_STATS.forceBuy.winRate },
    { name: "Full Buy", kd: CONTEXTUAL_STATS.fullBuy.kd, adr: CONTEXTUAL_STATS.fullBuy.adr, wr: CONTEXTUAL_STATS.fullBuy.winRate },
  ];

  return (
    <div style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 20 }}>
      <SectionHeader icon={<Icons.Layers s={18} c="#00ffa3" />} title="Contextual Performance" subtitle="Stats broken down by round economy" />
      <TabBar tabs={[{ key: "rounds", label: "Round Types" }, { key: "roles", label: "Entry vs Anchor" }, { key: "pressure", label: "Under Pressure" }]} active={tab} onChange={setTab} />

      {tab === "rounds" && (
        <div style={{ height: 280 }}>
          <ResponsiveContainer>
            <ComposedChart data={roundData} margin={{ top: 10, right: 10, bottom: 10, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="right" orientation="right" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar yAxisId="left" dataKey="adr" fill="#00d4ff" radius={[4, 4, 0, 0]} opacity={0.7} name="ADR" />
              <Line yAxisId="right" dataKey="kd" stroke="#00ffa3" strokeWidth={2} dot={{ fill: "#00ffa3", r: 4 }} name="K/D" />
              <Line yAxisId="right" dataKey="wr" stroke="#a855f7" strokeWidth={2} dot={{ fill: "#a855f7", r: 4 }} strokeDasharray="5 5" name="Win %" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      )}

      {tab === "roles" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div style={{ padding: 16, background: "rgba(0,212,255,0.04)", borderRadius: 10, border: "1px solid rgba(0,212,255,0.1)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <Icons.Zap s={16} c="#00d4ff" /><span style={{ fontSize: 14, fontWeight: 700, color: "#00d4ff" }}>Entry Fragger</span>
            </div>
            <ComparisonStat label="Success Rate" value={CONTEXTUAL_STATS.entry.successRate} avg={38.0} unit="%" />
            <ComparisonStat label="First Kill %" value={CONTEXTUAL_STATS.entry.firstKillRate} avg={20.0} unit="%" />
            <ComparisonStat label="Traded When Dead" value={CONTEXTUAL_STATS.entry.tradedRate} avg={60.0} unit="%" />
          </div>
          <div style={{ padding: 16, background: "rgba(168,85,247,0.04)", borderRadius: 10, border: "1px solid rgba(168,85,247,0.1)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <Icons.Shield s={16} c="#a855f7" /><span style={{ fontSize: 14, fontWeight: 700, color: "#a855f7" }}>Site Anchor</span>
            </div>
            <ComparisonStat label="Hold Rate" value={CONTEXTUAL_STATS.anchor.holdRate} avg={65.0} unit="%" />
            <ComparisonStat label="Retake Rate" value={CONTEXTUAL_STATS.anchor.retakeRate} avg={35.0} unit="%" />
            <ComparisonStat label="Util Usage" value={CONTEXTUAL_STATS.anchor.utilUsage} avg={75.0} unit="%" />
          </div>
        </div>
      )}

      {tab === "pressure" && (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <DashIcons.AlertTriangle s={16} c="#ffaa00" /><span style={{ fontSize: 14, fontWeight: 600, color: "#ffaa00" }}>When Team is Losing</span>
          </div>
          <ComparisonStat label="K/D Ratio" value={CONTEXTUAL_STATS.losing.kd} avg={1.0} />
          <ComparisonStat label="ADR" value={CONTEXTUAL_STATS.losing.adr} avg={70.0} />
          <ComparisonStat label="Win Rate" value={CONTEXTUAL_STATS.losing.winRate} avg={35.0} unit="%" />
          <ComparisonStat label="Clutch Rate" value={CONTEXTUAL_STATS.losing.clutchRate} avg={15.0} unit="%" />
        </div>
      )}
    </div>
  );
}
