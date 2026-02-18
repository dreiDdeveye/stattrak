"use client";

import { useState, useEffect, useCallback } from "react";
import { Icons } from "@/components/ui/Icons";
import { DashIcons } from "@/components/dashboard/DashIcons";
import { LoadingSpinner } from "@/components/dashboard/LoadingStates";
import { api } from "@/lib/api";
import { useAuth } from "@/hooks/useAPI";
import LiveOverview from "@/components/dashboard/live/LiveOverview";
import LiveContextual from "@/components/dashboard/live/LiveContextual";
import LiveAim from "@/components/dashboard/live/LiveAim";
import LiveDecisions from "@/components/dashboard/live/LiveDecisions";
import LiveUtility from "@/components/dashboard/live/LiveUtility";
import LiveWinProb from "@/components/dashboard/live/LiveWinProb";
import LiveGrowth from "@/components/dashboard/live/LiveGrowth";
import LiveProfile from "@/components/dashboard/live/LiveProfile";
import LiveCoach from "@/components/dashboard/live/LiveCoach";

const AllIcons = { ...Icons, ...DashIcons };
const NAV_ITEMS = [
  { key: "overview", label: "Overview", iconKey: "BarChart2" },
  { key: "context", label: "Contextual", iconKey: "Layers" },
  { key: "aim", label: "Aim Lab", iconKey: "Crosshair" },
  { key: "decisions", label: "Decisions", iconKey: "Brain" },
  { key: "utility", label: "Utility", iconKey: "Bomb" },
  { key: "winprob", label: "Win Prob", iconKey: "Activity" },
  { key: "growth", label: "Growth", iconKey: "TrendUp" },
  { key: "profile", label: "Profile", iconKey: "Flame" },
  { key: "coach", label: "AI Coach", iconKey: "Sparkles" },
];

export default function DashboardPage() {
  const { user, loading: authLoading, isLoggedIn } = useAuth();
  const [activeSection, setActiveSection] = useState("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState(null);

  useEffect(() => {
    if (!authLoading && !isLoggedIn) {
      window.location.href = api.auth.loginUrl;
    }
  }, [authLoading, isLoggedIn]);

  const handleSync = useCallback(async () => {
    setSyncing(true);
    setSyncMessage(null);
    try {
      const result = await api.matches.sync();
      setSyncMessage(result.message);
      setTimeout(() => setSyncMessage(null), 5000);
    } catch (err) {
      setSyncMessage("Sync failed");
    } finally {
      setSyncing(false);
    }
  }, []);

  if (authLoading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#06080e" }}>
        <LoadingSpinner message="Authenticating..." />
      </div>
    );
  }
  if (!isLoggedIn) return null;

  const renderSection = () => {
    switch (activeSection) {
      case "overview": return <LiveOverview onNavigate={setActiveSection} />;
      case "context": return <LiveContextual />;
      case "aim": return <LiveAim />;
      case "decisions": return <LiveDecisions />;
      case "utility": return <LiveUtility />;
      case "winprob": return <LiveWinProb />;
      case "growth": return <LiveGrowth />;
      case "profile": return <LiveProfile />;
      case "coach": return <LiveCoach />;
      default: return <LiveOverview onNavigate={setActiveSection} />;
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside style={{ width: sidebarCollapsed ? 64 : 220, minHeight: "100vh", background: "rgba(255,255,255,0.02)", borderRight: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", transition: "width 0.3s ease", flexShrink: 0, position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
        <div style={{ padding: sidebarCollapsed ? "20px 12px" : "20px 18px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
          <div style={{ width: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #00ffa3, #00d4ff)", flexShrink: 0 }}><Icons.Target s={18} c="#0a0c12" /></div>
          {!sidebarCollapsed && <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-0.03em" }}><span style={{ color: "#00ffa3" }}>StatTrak</span></div>}
        </div>
        {!sidebarCollapsed && user && (
          <div style={{ padding: "16px 18px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {user.avatar ? <img src={user.avatar} alt="" style={{ width: 36, height: 36, borderRadius: 8 }} /> : <div style={{ width: 36, height: 36, borderRadius: 8, background: "linear-gradient(135deg, rgba(0,255,163,0.2), rgba(0,212,255,0.2))", display: "flex", alignItems: "center", justifyContent: "center" }}><DashIcons.User s={18} c="#00ffa3" /></div>}
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{user.username}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{user.stats?.totalMatches || 0} matches</div>
              </div>
            </div>
          </div>
        )}
        <nav style={{ flex: 1, padding: "12px 8px", display: "flex", flexDirection: "column", gap: 2 }}>
          {NAV_ITEMS.map(item => { const IC = AllIcons[item.iconKey]; return (
            <button key={item.key} onClick={() => setActiveSection(item.key)} style={{ display: "flex", alignItems: "center", gap: 10, padding: sidebarCollapsed ? "10px 14px" : "10px 12px", borderRadius: 8, border: "none", cursor: "pointer", width: "100%", textAlign: "left", background: activeSection === item.key ? "rgba(0,255,163,0.08)" : "transparent", color: activeSection === item.key ? "#00ffa3" : "rgba(255,255,255,0.4)", fontSize: 13, fontWeight: activeSection === item.key ? 600 : 500, fontFamily: "'Outfit', sans-serif", position: "relative", transition: "all 0.2s" }}>
              {activeSection === item.key && <div style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", width: 3, height: 20, borderRadius: 2, background: "#00ffa3" }} />}
              <span style={{ flexShrink: 0, display: "flex" }}>{IC && <IC s={18} />}</span>
              {!sidebarCollapsed && <span>{item.label}</span>}
            </button>
          ); })}
        </nav>
        <div style={{ padding: "12px 8px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", gap: 4 }}>
          <button onClick={handleSync} disabled={syncing} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, border: "none", cursor: syncing ? "wait" : "pointer", width: "100%", background: syncing ? "rgba(0,255,163,0.08)" : "transparent", color: syncing ? "#00ffa3" : "rgba(255,255,255,0.4)", fontSize: 13, fontFamily: "'Outfit', sans-serif" }}>
            <Icons.Zap s={18} />{!sidebarCollapsed && <span>{syncing ? "Syncing..." : "Sync Matches"}</span>}
          </button>
          <a href={api.auth.logoutUrl} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, textDecoration: "none", color: "rgba(255,255,255,0.3)", fontSize: 13, fontFamily: "'Outfit', sans-serif" }}>
            <DashIcons.Settings s={18} />{!sidebarCollapsed && <span>Logout</span>}
          </a>
        </div>
      </aside>
      <main style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <header style={{ padding: "14px 28px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.01)", backdropFilter: "blur(8px)", position: "sticky", top: 0, zIndex: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <h1 style={{ fontSize: 18, fontWeight: 700, color: "#fff", fontFamily: "'Outfit', sans-serif" }}>{NAV_ITEMS.find(n => n.key === activeSection)?.label || "Dashboard"}</h1>
            <div style={{ padding: "3px 10px", borderRadius: 20, background: "rgba(0,255,163,0.08)", border: "1px solid rgba(0,255,163,0.15)" }}><span style={{ fontSize: 10, fontWeight: 600, color: "#00ffa3", letterSpacing: "0.05em" }}>LIVE</span></div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {syncMessage && <span style={{ fontSize: 12, color: "rgba(0,255,163,0.7)", padding: "4px 12px", borderRadius: 6, background: "rgba(0,255,163,0.06)" }}>{syncMessage}</span>}
            <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <DashIcons.Clock s={14} c="rgba(255,255,255,0.4)" />
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{user?.lastSync ? `Synced ${new Date(user.lastSync).toLocaleTimeString()}` : "Not synced"}</span>
            </div>
          </div>
        </header>
        <div key={activeSection} style={{ padding: 28, flex: 1, animation: "fadeUp 0.4s ease-out" }}>{renderSection()}</div>
      </main>
    </div>
  );
}
