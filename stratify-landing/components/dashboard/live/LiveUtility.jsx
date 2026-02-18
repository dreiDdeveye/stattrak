"use client";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Icons } from "@/components/ui/Icons";
import { SectionHeader, GlowBar, CustomTooltip } from "../DashUI";
import { LoadingSpinner, ErrorState } from "../LoadingStates";
import { api } from "@/lib/api";
import { useAPI } from "@/hooks/useAPI";

export default function LiveUtility() {
  const { data, loading, error, refresh } = useAPI(() => api.stats.utility());
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorState message={error} onRetry={refresh} />;
  if (!data) return null;

  const chartData = [
    { name: "Flash %", value: data.flashSuccess },
    { name: "Util DMG", value: data.utilityDamage },
    { name: "Score", value: data.utilityScore },
  ];

  return (
    <div style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 20 }}>
      <SectionHeader icon={<Icons.Bomb s={18} c="#00ffa3" />} title="Utility Intelligence" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
        {[
          { label: "Flash Success", val: data.flashSuccess, color: "#00d4ff" },
          { label: "Flash Assists", val: data.flashAssists, color: "#00ffa3" },
          { label: "Util Damage", val: data.utilityDamage, color: "#a855f7" },
          { label: "Util Score", val: data.utilityScore, color: "#ffaa00" },
        ].map((s, i) => (
          <div key={i} style={{ textAlign: "center", padding: 12, background: "rgba(255,255,255,0.02)", borderRadius: 8 }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: s.color, fontFamily: "'JetBrains Mono', monospace" }}>{typeof s.val === "number" ? s.val.toFixed(1) : s.val}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ height: 200 }}>
        <ResponsiveContainer>
          <BarChart data={chartData}><CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" /><XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} /><YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} /><Tooltip content={<CustomTooltip />} /><Bar dataKey="value" fill="#00d4ff" radius={[4, 4, 0, 0]} opacity={0.8} /></BarChart>
        </ResponsiveContainer>
      </div>
      <div style={{ marginTop: 16, padding: 14, background: "rgba(0,255,163,0.04)", borderRadius: 8, border: "1px solid rgba(0,255,163,0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 32, fontWeight: 800, color: "#00ffa3", fontFamily: "'JetBrains Mono', monospace" }}>{data.utilityScore?.toFixed(0)}</span>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>/ 100</span>
        </div>
        <GlowBar value={data.utilityScore} color="#00ffa3" height={4} />
      </div>
    </div>
  );
}
