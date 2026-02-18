"use client";

import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, AreaChart, Area, ResponsiveContainer, CartesianGrid, XAxis, YAxis } from "recharts";
import { Icons } from "@/components/ui/Icons";
import { DashIcons } from "./DashIcons";
import { StatCard, SectionHeader } from "./DashUI";
import { PLAYER_DATA, CONTEXTUAL_STATS, AIM_ANALYTICS, MATCH_HISTORY, RISK_PROFILE, RADAR_DATA, GROWTH_DATA } from "@/data/dashboardData";

export default function OverviewPanel({ onNavigate }) {
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 24 }}>
        <StatCard icon={<Icons.Award s={16} />} label="Performance" value={PLAYER_DATA.performanceScore} subtitle="Top 14% for your rank" color="#00ffa3" trend={3.2} />
        <StatCard icon={<Icons.Target s={16} />} label="Win Rate" value={`${PLAYER_DATA.winRate}%`} subtitle={`${PLAYER_DATA.totalMatches} matches played`} color="#00d4ff" trend={1.8} />
        <StatCard icon={<Icons.Crosshair s={16} />} label="HS %" value={`${AIM_ANALYTICS.headshotPct}%`} subtitle="Last 30 matches" color="#a855f7" trend={-0.4} />
        <StatCard icon={<Icons.Activity s={16} />} label="ADR" value={CONTEXTUAL_STATS.fullBuy.adr} subtitle="Full buy rounds" color="#ffaa00" trend={2.1} />
        <StatCard icon={<Icons.Zap s={16} />} label="ELO" value={PLAYER_DATA.elo} subtitle={PLAYER_DATA.rank} color="#00ffa3" />
      </div>

      {/* Recent Matches */}
      <div style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ padding: "14px 18px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>Recent Matches</span>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>Last 6 matches</span>
        </div>
        {MATCH_HISTORY.map((m, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "60px 80px 1fr 80px 80px 80px", alignItems: "center", padding: "12px 18px", borderBottom: i < MATCH_HISTORY.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none", fontSize: 13, color: "rgba(255,255,255,0.6)" }}>
            <span style={{ fontWeight: 700, color: m.result === "W" ? "#00ffa3" : "#ff4466" }}>{m.result}</span>
            <span style={{ color: "rgba(255,255,255,0.8)" }}>{m.map}</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>{m.score}</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", color: m.rating >= 1.0 ? "#00ffa3" : "#ff4466" }}>{m.rating.toFixed(2)}</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>{m.kills}/{m.deaths}</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>{m.adr}</span>
          </div>
        ))}
      </div>

      {/* Quick Charts */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 20 }}>
        <div style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 20 }}>
          <SectionHeader icon={<Icons.Flame s={18} c="#00ffa3" />} title="Quick Risk Profile" />
          <div style={{ height: 220 }}>
            <ResponsiveContainer>
              <RadarChart data={RADAR_DATA}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar dataKey="value" stroke="#00ffa3" fill="#00ffa3" fillOpacity={0.12} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div style={{ textAlign: "center", marginTop: 4 }}><span style={{ fontSize: 14, fontWeight: 700, color: "#00ffa3" }}>{RISK_PROFILE.primary}</span></div>
        </div>
        <div style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 20 }}>
          <SectionHeader icon={<Icons.TrendUp s={18} c="#00ffa3" />} title="Quick Trend" />
          <div style={{ height: 220 }}>
            <ResponsiveContainer>
              <AreaChart data={GROWTH_DATA}>
                <defs><linearGradient id="qg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#00ffa3" stopOpacity={0.2} /><stop offset="100%" stopColor="#00ffa3" stopOpacity={0} /></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="match" tick={false} axisLine={false} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Area dataKey="rating" stroke="#00ffa3" strokeWidth={2} fill="url(#qg)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div style={{ textAlign: "center", marginTop: 4, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <Icons.TrendUp s={14} c="#00ffa3" />
            <span style={{ fontSize: 13, fontWeight: 600, color: "#00ffa3" }}>Improving</span>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>+3.2% over 30 matches</span>
          </div>
        </div>
      </div>

      {/* AI Insight */}
      <div style={{ marginTop: 20, padding: 18, borderRadius: 12, background: "linear-gradient(135deg, rgba(0,255,163,0.04), rgba(0,212,255,0.02))", border: "1px solid rgba(0,255,163,0.1)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <Icons.Sparkles s={16} c="#00ffa3" />
          <span style={{ fontSize: 13, fontWeight: 700, color: "#00ffa3" }}>AI Insight</span>
        </div>
        <p style={{ fontSize: 13, lineHeight: 1.6, color: "rgba(255,255,255,0.55)", margin: 0 }}>
          Your biggest improvement opportunity is reducing your Overpeek Rate (currently 28.4% vs 19.2% avg).
          This single adjustment could improve your survival rate by an estimated 12% and your win probability contribution by +4.8% per match.
          {onNavigate && <span style={{ color: "#00ffa3", cursor: "pointer" }} onClick={() => onNavigate("coach")}> Navigate to AI Coach for personalized drills.</span>}
        </p>
      </div>
    </div>
  );
}
