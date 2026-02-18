"use client";
import { Icons } from "@/components/ui/Icons";
import { DashIcons } from "../DashIcons";
import { SectionHeader, SeverityBadge } from "../DashUI";
import { LoadingSpinner, ErrorState, EmptyState } from "../LoadingStates";
import { api } from "@/lib/api";
import { useAPI } from "@/hooks/useAPI";

export default function LiveCoach() {
  const { data, loading, error, refresh } = useAPI(() => api.stats.aiRecommendations());
  if (loading) return <LoadingSpinner message="Analyzing your gameplay..." />;
  if (error) return <ErrorState message={error} onRetry={refresh} />;
  if (!data || data.length === 0) return <EmptyState title="No recommendations yet" subtitle="Play some matches and sync to get AI coaching" />;

  return (
    <div style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 20 }}>
      <SectionHeader icon={<Icons.Sparkles s={18} c="#00ffa3" />} title="AI Coach" subtitle="Personalized training recommendations" />
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {data.map((rec, i) => (
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
              {rec.drills?.map((d, j) => (
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
