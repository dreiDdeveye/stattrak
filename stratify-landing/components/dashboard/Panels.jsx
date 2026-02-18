"use client";

import { useState, useMemo } from "react";
import { AreaChart, Area, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { Icons } from "@/components/ui/Icons";
import { DashIcons } from "./DashIcons";
import { SectionHeader, ComparisonStat, TabBar, SeverityBadge, GlowBar, CustomTooltip } from "./DashUI";
import { AIM_ANALYTICS, DECISION_METRICS, UTILITY_SCORES, WIN_PROB_EVENTS, GROWTH_DATA, RISK_PROFILE, RADAR_DATA, AI_RECOMMENDATIONS } from "@/data/dashboardData";

// ---- AIM ANALYTICS ----
export function AimAnalyticsPanel() {
  return (
    <div style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 20 }}>
      <SectionHeader icon={<Icons.Crosshair s={18} c="#00ffa3" />} title="Micro Aim Analytics" subtitle="Precision tracking and mechanical skill breakdown" />
      <ComparisonStat label="Time to Damage" value={AIM_ANALYTICS.ttd} avg={AIM_ANALYTICS.ttdAvg} unit="s" lower format={v => v.toFixed(3)} />
      <ComparisonStat label="Crosshair Placement" value={AIM_ANALYTICS.crosshairPlacement} avg={AIM_ANALYTICS.crosshairAvg} unit="%" />
      <ComparisonStat label="Spray Transfer Rate" value={AIM_ANALYTICS.sprayTransfer} avg={AIM_ANALYTICS.sprayAvg} unit="%" />
      <ComparisonStat label="Pre-aim Accuracy" value={AIM_ANALYTICS.preAim} avg={AIM_ANALYTICS.preAimAvg} unit="%" />
      <ComparisonStat label="1st Bullet Accuracy" value={AIM_ANALYTICS.firstBulletAccuracy} avg={45.0} unit="%" />
      <ComparisonStat label="Headshot %" value={AIM_ANALYTICS.headshotPct} avg={48.0} unit="%" />
    </div>
  );
}

// ---- DECISION INTELLIGENCE ----
export function DecisionIntelligence() {
  return (
    <div style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 20 }}>
      <SectionHeader icon={<Icons.Brain s={18} c="#00ffa3" />} title="Decision Intelligence" subtitle="Game sense and positioning metrics" />
      <ComparisonStat label="Overpeek Rate" value={DECISION_METRICS.overpeekRate} avg={DECISION_METRICS.overpeekAvg} unit="%" lower />
      <ComparisonStat label="First Death %" value={DECISION_METRICS.firstDeathPct} avg={DECISION_METRICS.firstDeathAvg} unit="%" lower />
      <ComparisonStat label="Trade Efficiency" value={DECISION_METRICS.tradeEfficiency} avg={DECISION_METRICS.tradeAvg} unit="%" />
      <ComparisonStat label="Duel Favorability" value={DECISION_METRICS.duelFavorability} avg={DECISION_METRICS.duelAvg} format={v => v.toFixed(2)} />
      <ComparisonStat label="Disadvantage Deaths" value={DECISION_METRICS.disadvantageDeaths} avg={DECISION_METRICS.disadvantageAvg} unit="%" lower />
    </div>
  );
}

// ---- UTILITY PANEL ----
export function UtilityPanel() {
  const utilData = [
    { name: "Flash", success: UTILITY_SCORES.flashSuccess },
    { name: "Smoke", success: UTILITY_SCORES.smokeEffectiveness },
    { name: "Grenade", success: UTILITY_SCORES.grenadeImpact },
    { name: "Overall", success: UTILITY_SCORES.overallScore },
  ];
  return (
    <div style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 20 }}>
      <SectionHeader icon={<Icons.Bomb s={18} c="#00ffa3" />} title="Utility Intelligence" subtitle="Grenade effectiveness and usage patterns" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
        {[{ label: "Flash Success", val: UTILITY_SCORES.flashSuccess, color: "#00d4ff" }, { label: "Flash > Kill", val: UTILITY_SCORES.flashKill, color: "#00ffa3" }, { label: "Smoke Eff.", val: UTILITY_SCORES.smokeEffectiveness, color: "#a855f7" }, { label: "Waste %", val: UTILITY_SCORES.utilityWaste, color: "#ff4466" }].map((s, i) => (
          <div key={i} style={{ textAlign: "center", padding: 12, background: "rgba(255,255,255,0.02)", borderRadius: 8 }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: s.color, fontFamily: "'JetBrains Mono', monospace" }}>{s.val}%</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ height: 200 }}>
        <ResponsiveContainer>
          <BarChart data={utilData}><CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" /><XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} /><YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} /><Tooltip content={<CustomTooltip />} /><Bar dataKey="success" fill="#00d4ff" radius={[4, 4, 0, 0]} opacity={0.8} name="Success %" /></BarChart>
        </ResponsiveContainer>
      </div>
      <div style={{ marginTop: 16, padding: 14, background: "rgba(0,255,163,0.04)", borderRadius: 8, border: "1px solid rgba(0,255,163,0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}><Icons.Award s={14} c="#00ffa3" /><span style={{ fontSize: 13, fontWeight: 600, color: "#00ffa3" }}>Utility Score</span></div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 32, fontWeight: 800, color: "#00ffa3", fontFamily: "'JetBrains Mono', monospace" }}>{UTILITY_SCORES.overallScore}</span>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>/ 100</span>
        </div>
        <GlowBar value={UTILITY_SCORES.overallScore} color="#00ffa3" height={4} />
      </div>
    </div>
  );
}

// ---- WIN PROBABILITY ----
export function WinProbPanel() {
  const chartData = useMemo(() => {
    let cum = 50;
    return WIN_PROB_EVENTS.map(e => { cum = Math.max(5, Math.min(95, cum + e.shift)); return { ...e, winProb: cum }; });
  }, []);
  return (
    <div style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 20 }}>
      <SectionHeader icon={<Icons.Activity s={18} c="#00ffa3" />} title="Win Probability Impact" subtitle="How your actions shift round win chance" />
      <div style={{ height: 280 }}>
        <ResponsiveContainer>
          <AreaChart data={chartData} margin={{ top: 10, right: 10, bottom: 10, left: 0 }}>
            <defs><linearGradient id="wpg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#00ffa3" stopOpacity={0.3} /><stop offset="100%" stopColor="#00ffa3" stopOpacity={0} /></linearGradient></defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="round" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} />
            <Tooltip content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              const d = payload[0].payload;
              return (<div style={{ background: "rgba(12,14,20,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px 14px", fontSize: 12 }}>
                <div style={{ fontWeight: 700, color: "#fff", marginBottom: 4 }}>Round {d.round}: {d.event}</div>
                <div style={{ color: d.type === "positive" ? "#00ffa3" : d.type === "negative" ? "#ff4466" : "#ffaa00" }}>{d.shift > 0 ? "+" : ""}{d.shift}% win probability</div>
              </div>);
            }} />
            <ReferenceLine y={50} stroke="rgba(255,255,255,0.1)" strokeDasharray="3 3" />
            <Area dataKey="winProb" stroke="#00ffa3" strokeWidth={2} fill="url(#wpg)" name="Win %" dot={{ fill: "#0a0c12", stroke: "#00ffa3", strokeWidth: 2, r: 4 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div style={{ marginTop: 12 }}>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>Key Impact Events</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {WIN_PROB_EVENTS.filter(e => Math.abs(e.shift) > 8).map((e, i) => (
            <span key={i} style={{ fontSize: 11, padding: "4px 10px", borderRadius: 20, fontWeight: 600, background: e.type === "positive" ? "rgba(0,255,163,0.1)" : "rgba(255,68,102,0.1)", color: e.type === "positive" ? "#00ffa3" : "#ff4466", border: `1px solid ${e.type === "positive" ? "rgba(0,255,163,0.2)" : "rgba(255,68,102,0.2)"}` }}>
              {e.event}: {e.shift > 0 ? "+" : ""}{e.shift}%
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---- GROWTH TRENDS ----
export function GrowthTrends() {
  const [metric, setMetric] = useState("rating");
  const colors = { rating: "#00ffa3", adr: "#00d4ff", impact: "#a855f7", kd: "#ffaa00" };
  const trendSlope = useMemo(() => {
    const n = GROWTH_DATA.length; const xM = (n - 1) / 2; const yM = GROWTH_DATA.reduce((s, d) => s + d[metric], 0) / n;
    return GROWTH_DATA.reduce((s, d, i) => s + (i - xM) * (d[metric] - yM), 0) / GROWTH_DATA.reduce((s, _, i) => s + (i - xM) ** 2, 0);
  }, [metric]);
  const volatility = useMemo(() => {
    const vals = GROWTH_DATA.map(d => d[metric]); const mean = vals.reduce((a, b) => a + b, 0) / vals.length;
    return Math.sqrt(vals.reduce((s, v) => s + (v - mean) ** 2, 0) / vals.length);
  }, [metric]);

  return (
    <div style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 20 }}>
      <SectionHeader icon={<Icons.TrendUp s={18} c="#00ffa3" />} title="Growth Trends" subtitle="30-match moving performance analysis" />
      <TabBar tabs={[{ key: "rating", label: "Rating" }, { key: "adr", label: "ADR" }, { key: "impact", label: "Impact" }, { key: "kd", label: "K/D" }]} active={metric} onChange={setMetric} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
        <div style={{ textAlign: "center", padding: 10, background: "rgba(255,255,255,0.02)", borderRadius: 8 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: trendSlope >= 0 ? "#00ffa3" : "#ff4466", fontFamily: "'JetBrains Mono', monospace", display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
            {trendSlope >= 0 ? <Icons.TrendUp s={14} c="#00ffa3" /> : <DashIcons.TrendDown s={14} c="#ff4466" />}{(trendSlope * 100).toFixed(2)}
          </div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>Improvement Slope</div>
        </div>
        <div style={{ textAlign: "center", padding: 10, background: "rgba(255,255,255,0.02)", borderRadius: 8 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#00d4ff", fontFamily: "'JetBrains Mono', monospace" }}>{volatility.toFixed(3)}</div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>Volatility</div>
        </div>
        <div style={{ textAlign: "center", padding: 10, background: "rgba(255,255,255,0.02)", borderRadius: 8 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: volatility < 0.1 ? "#00ffa3" : "#ffaa00", fontFamily: "'JetBrains Mono', monospace" }}>{volatility < 0.1 ? "High" : volatility < 0.2 ? "Med" : "Low"}</div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>Stability</div>
        </div>
      </div>
      <div style={{ height: 280 }}>
        <ResponsiveContainer>
          <AreaChart data={GROWTH_DATA} margin={{ top: 10, right: 10, bottom: 10, left: 0 }}>
            <defs><linearGradient id="gg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={colors[metric]} stopOpacity={0.25} /><stop offset="100%" stopColor={colors[metric]} stopOpacity={0} /></linearGradient></defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="match" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area dataKey={metric} stroke={colors[metric]} strokeWidth={2} fill="url(#gg)" name={metric.toUpperCase()} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ---- RISK PROFILE ----
export function RiskProfilePanel() {
  const getColor = (v) => v >= 75 ? "#00ffa3" : v >= 60 ? "#00d4ff" : v >= 40 ? "#ffaa00" : "#ff4466";
  return (
    <div style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 20 }}>
      <SectionHeader icon={<Icons.Flame s={18} c="#00ffa3" />} title="Risk Profile" subtitle="AI-classified playstyle analysis" />
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20, padding: 16, background: "linear-gradient(135deg, rgba(0,255,163,0.06), rgba(0,212,255,0.04))", borderRadius: 10, border: "1px solid rgba(0,255,163,0.12)" }}>
        <div style={{ width: 56, height: 56, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #00ffa3, #00d4ff)", boxShadow: "0 0 24px rgba(0,255,163,0.3)" }}>
          <Icons.Zap s={28} c="#0a0c12" />
        </div>
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>{RISK_PROFILE.primary}</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Secondary: {RISK_PROFILE.secondary}</div>
        </div>
      </div>
      <div style={{ height: 260 }}>
        <ResponsiveContainer>
          <RadarChart data={RADAR_DATA} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
            <PolarGrid stroke="rgba(255,255,255,0.08)" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }} />
            <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar name="Stats" dataKey="value" stroke="#00ffa3" fill="#00ffa3" fillOpacity={0.15} strokeWidth={2} dot={{ fill: "#00ffa3", r: 3 }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 8 }}>
        {RISK_PROFILE.traits.map((t, i) => (
          <div key={i} style={{ padding: 10, background: "rgba(255,255,255,0.02)", borderRadius: 8, textAlign: "center" }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: getColor(t.value), fontFamily: "'JetBrains Mono', monospace" }}>{t.value}</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{t.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- AI RECOMMENDATIONS ----
export function AIRecommendations() {
  return (
    <div style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 20 }}>
      <SectionHeader icon={<Icons.Sparkles s={18} c="#00ffa3" />} title="AI Coach" subtitle="Personalized training recommendations" />
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {AI_RECOMMENDATIONS.map((rec, i) => (
          <div key={i} style={{ padding: 18, borderRadius: 10, background: rec.severity === "high" ? "rgba(255,68,102,0.04)" : rec.severity === "medium" ? "rgba(255,170,0,0.04)" : "rgba(0,212,255,0.04)", border: `1px solid ${rec.severity === "high" ? "rgba(255,68,102,0.12)" : rec.severity === "medium" ? "rgba(255,170,0,0.12)" : "rgba(0,212,255,0.12)"}` }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {rec.severity === "high" ? <DashIcons.AlertTriangle s={16} c="#ff4466" /> : rec.severity === "medium" ? <DashIcons.Eye s={16} c="#ffaa00" /> : <DashIcons.CheckCircle s={16} c="#00d4ff" />}
                <span style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{rec.area}</span>
              </div>
              <SeverityBadge severity={rec.severity} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
              <div style={{ padding: "6px 12px", background: "rgba(255,255,255,0.04)", borderRadius: 6 }}>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{rec.metric}: </span>
                <span style={{ fontSize: 13, fontWeight: 700, color: rec.severity === "high" ? "#ff4466" : rec.severity === "medium" ? "#ffaa00" : "#00d4ff", fontFamily: "'JetBrains Mono', monospace" }}>{rec.value}</span>
              </div>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>avg: {rec.avg}</span>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.6, color: "rgba(255,255,255,0.6)", margin: "0 0 14px" }}>{rec.insight}</p>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.4)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Training Drills</div>
              {rec.drills.map((d, j) => (
                <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 6 }}>
                  <div style={{ marginTop: 4 }}><DashIcons.ChevronRight s={12} c="rgba(0,255,163,0.5)" /></div>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>{d}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
