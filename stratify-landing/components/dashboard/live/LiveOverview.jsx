"use client";

import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, AreaChart, Area, ResponsiveContainer, CartesianGrid, XAxis, YAxis } from "recharts";
import { Icons } from "@/components/ui/Icons";
import { StatCard, SectionHeader } from "../DashUI";
import { LoadingSpinner, ErrorState, EmptyState } from "../LoadingStates";
import { api } from "@/lib/api";
import { useAPI } from "@/hooks/useAPI";

export default function LiveOverview({ onNavigate }) {
  const { data: overview, loading: oLoading, error: oError } = useAPI(() => api.stats.overview());
  const { data: matches, loading: mLoading } = useAPI(() => api.matches.list(1, 6));
  const { data: profile } = useAPI(() => api.stats.profile());
  const { data: growth } = useAPI(() => api.stats.growth());

  if (oLoading) return <LoadingSpinner message="Loading overview..." />;
  if (oError) return <ErrorState message={oError} />;
  if (!overview || overview.totalMatches === 0) {
    return <EmptyState title="No matches yet" subtitle="Sync your Steam account to get started" actionLabel="Sync Now" onAction={() => api.matches.sync()} />;
  }

  const radarData = profile?.traits?.map(t => ({ subject: t.name, value: t.value, fullMark: 100 })) || [];
  const growthData = growth?.matches?.map((m, i) => ({ match: i + 1, rating: m.rating })) || [];

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 24 }}>
        <StatCard icon={<Icons.Award s={16} />} label="Performance" value={overview.performanceScore} color="#00ffa3" />
        <StatCard icon={<Icons.Target s={16} />} label="Win Rate" value={`${overview.winRate}%`} subtitle={`${overview.totalMatches} matches`} color="#00d4ff" />
        <StatCard icon={<Icons.Crosshair s={16} />} label="HS %" value={`${overview.avgHeadshotPct}%`} color="#a855f7" />
        <StatCard icon={<Icons.Activity s={16} />} label="ADR" value={overview.avgAdr} color="#ffaa00" />
        <StatCard icon={<Icons.Zap s={16} />} label="Rating" value={overview.avgRating} color="#00ffa3" />
      </div>

      {/* Recent Matches */}
      {matches?.matches?.length > 0 && (
        <div style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, overflow: "hidden", marginBottom: 20 }}>
          <div style={{ padding: "14px 18px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>Recent Matches</span>
          </div>
          {matches.matches.map((m, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "60px 80px 1fr 80px 80px", alignItems: "center", padding: "12px 18px", borderBottom: i < matches.matches.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none", fontSize: 13, color: "rgba(255,255,255,0.6)" }}>
              <span style={{ fontWeight: 700, color: m.result === "W" ? "#00ffa3" : "#ff4466" }}>{m.result}</span>
              <span style={{ color: "rgba(255,255,255,0.8)" }}>{m.map}</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>{m.score}</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", color: m.rating >= 1.0 ? "#00ffa3" : "#ff4466" }}>{m.rating?.toFixed(2)}</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>{m.kills}/{m.deaths}</span>
            </div>
          ))}
        </div>
      )}

      {/* Charts Row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {radarData.length > 0 && (
          <div style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 20 }}>
            <SectionHeader icon={<Icons.Flame s={18} c="#00ffa3" />} title="Risk Profile" />
            <div style={{ height: 220 }}>
              <ResponsiveContainer>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.08)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar dataKey="value" stroke="#00ffa3" fill="#00ffa3" fillOpacity={0.12} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            {profile && <div style={{ textAlign: "center" }}><span style={{ fontSize: 14, fontWeight: 700, color: "#00ffa3" }}>{profile.primary}</span></div>}
          </div>
        )}
        {growthData.length > 0 && (
          <div style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 20 }}>
            <SectionHeader icon={<Icons.TrendUp s={18} c="#00ffa3" />} title="Rating Trend" />
            <div style={{ height: 220 }}>
              <ResponsiveContainer>
                <AreaChart data={growthData}>
                  <defs><linearGradient id="og" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#00ffa3" stopOpacity={0.2} /><stop offset="100%" stopColor="#00ffa3" stopOpacity={0} /></linearGradient></defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="match" tick={false} axisLine={false} />
                  <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Area dataKey="rating" stroke="#00ffa3" strokeWidth={2} fill="url(#og)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      {/* AI Insight */}
      <div style={{ marginTop: 20, padding: 18, borderRadius: 12, background: "linear-gradient(135deg, rgba(0,255,163,0.04), rgba(0,212,255,0.02))", border: "1px solid rgba(0,255,163,0.1)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <Icons.Sparkles s={16} c="#00ffa3" />
          <span style={{ fontSize: 13, fontWeight: 700, color: "#00ffa3" }}>AI Insight</span>
        </div>
        <p style={{ fontSize: 13, lineHeight: 1.6, color: "rgba(255,255,255,0.55)", margin: 0 }}>
          Performance score: {overview.performanceScore}/100 with {overview.winRate}% win rate across {overview.totalMatches} matches.
          {overview.improvementSlope > 0 ? " You're on an upward trend." : " Focus on consistency."}
          {onNavigate && <span style={{ color: "#00ffa3", cursor: "pointer" }} onClick={() => onNavigate("coach")}> View AI Coach for drills →</span>}
        </p>
      </div>
    </div>
  );
}
