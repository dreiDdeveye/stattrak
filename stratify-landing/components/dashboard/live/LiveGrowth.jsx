"use client";
import { useState, useMemo } from "react";
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Icons } from "@/components/ui/Icons";
import { DashIcons } from "../DashIcons";
import { SectionHeader, TabBar, CustomTooltip } from "../DashUI";
import { LoadingSpinner, ErrorState } from "../LoadingStates";
import { api } from "@/lib/api";
import { useAPI } from "@/hooks/useAPI";

export default function LiveGrowth() {
  const { data, loading, error, refresh } = useAPI(() => api.stats.growth());
  const [metric, setMetric] = useState("rating");
  const colors = { rating: "#00ffa3", adr: "#00d4ff", headshotPct: "#a855f7", kills: "#ffaa00" };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorState message={error} onRetry={refresh} />;
  if (!data?.matches?.length) return null;

  return (
    <div style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 20 }}>
      <SectionHeader icon={<Icons.TrendUp s={18} c="#00ffa3" />} title="Growth Trends" subtitle={`${data.matches.length}-match analysis`} />
      <TabBar tabs={[{ key: "rating", label: "Rating" }, { key: "adr", label: "ADR" }, { key: "headshotPct", label: "HS%" }, { key: "kills", label: "Kills" }]} active={metric} onChange={setMetric} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
        <div style={{ textAlign: "center", padding: 10, background: "rgba(255,255,255,0.02)", borderRadius: 8 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: data.improvementSlope >= 0 ? "#00ffa3" : "#ff4466", fontFamily: "'JetBrains Mono', monospace", display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
            {data.improvementSlope >= 0 ? <Icons.TrendUp s={14} c="#00ffa3" /> : <DashIcons.TrendDown s={14} c="#ff4466" />}
            {(data.improvementSlope * 100).toFixed(2)}
          </div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>Slope</div>
        </div>
        <div style={{ textAlign: "center", padding: 10, background: "rgba(255,255,255,0.02)", borderRadius: 8 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#00d4ff", fontFamily: "'JetBrains Mono', monospace" }}>{data.volatility?.toFixed(3)}</div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>Volatility</div>
        </div>
        <div style={{ textAlign: "center", padding: 10, background: "rgba(255,255,255,0.02)", borderRadius: 8 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: data.stabilityScore > 60 ? "#00ffa3" : "#ffaa00", fontFamily: "'JetBrains Mono', monospace" }}>{data.stabilityScore?.toFixed(0)}</div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>Stability</div>
        </div>
      </div>
      <div style={{ height: 280 }}>
        <ResponsiveContainer>
          <AreaChart data={data.matches}>
            <defs><linearGradient id="gg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={colors[metric]} stopOpacity={0.25} /><stop offset="100%" stopColor={colors[metric]} stopOpacity={0} /></linearGradient></defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="index" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} />
            <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area dataKey={metric} stroke={colors[metric]} strokeWidth={2} fill="url(#gg)" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
