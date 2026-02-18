"use client";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { Icons } from "@/components/ui/Icons";
import { SectionHeader } from "../DashUI";
import { LoadingSpinner, ErrorState } from "../LoadingStates";
import { api } from "@/lib/api";
import { useAPI } from "@/hooks/useAPI";

export default function LiveProfile() {
  const { data, loading, error, refresh } = useAPI(() => api.stats.profile());
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorState message={error} onRetry={refresh} />;
  if (!data) return null;

  const radarData = data.traits?.map(t => ({ subject: t.name, value: t.value, fullMark: 100 })) || [];
  const getColor = (v) => v >= 75 ? "#00ffa3" : v >= 60 ? "#00d4ff" : v >= 40 ? "#ffaa00" : "#ff4466";

  return (
    <div style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 20 }}>
      <SectionHeader icon={<Icons.Flame s={18} c="#00ffa3" />} title="Risk Profile" subtitle="AI-classified playstyle" />
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20, padding: 16, background: "linear-gradient(135deg, rgba(0,255,163,0.06), rgba(0,212,255,0.04))", borderRadius: 10, border: "1px solid rgba(0,255,163,0.12)" }}>
        <div style={{ width: 56, height: 56, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #00ffa3, #00d4ff)", boxShadow: "0 0 24px rgba(0,255,163,0.3)" }}>
          <Icons.Zap s={28} c="#0a0c12" />
        </div>
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>{data.primary}</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Secondary: {data.secondary}</div>
        </div>
      </div>
      <div style={{ height: 260 }}>
        <ResponsiveContainer>
          <RadarChart data={radarData}>
            <PolarGrid stroke="rgba(255,255,255,0.08)" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }} />
            <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar dataKey="value" stroke="#00ffa3" fill="#00ffa3" fillOpacity={0.15} strokeWidth={2} dot={{ fill: "#00ffa3", r: 3 }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 8 }}>
        {(data.traits || []).map((t, i) => (
          <div key={i} style={{ padding: 10, background: "rgba(255,255,255,0.02)", borderRadius: 8, textAlign: "center" }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: getColor(t.value), fontFamily: "'JetBrains Mono', monospace" }}>{t.value?.toFixed(0)}</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{t.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
