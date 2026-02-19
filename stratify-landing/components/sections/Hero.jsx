"use client";
import { AreaChart, Area, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis } from "recharts";
import { Icons } from "@/components/ui/Icons";
import { RADAR_DATA, TREND_DATA } from "@/data/constants";

export default function Hero() {
  return (
    <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", padding: "120px 24px 100px" }}>
      {/* Dramatic BG */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <div style={{ position: "absolute", top: "-20%", left: "-10%", width: "70vw", height: "70vw", maxWidth: 900, maxHeight: 900, borderRadius: "50%", background: "radial-gradient(circle, rgba(34,255,187,0.07) 0%, transparent 60%)", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", bottom: "-10%", right: "-5%", width: "50vw", height: "50vw", maxWidth: 700, maxHeight: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,170,255,0.05) 0%, transparent 60%)", filter: "blur(100px)" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "40vw", height: "40vw", maxWidth: 500, maxHeight: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(167,139,250,0.03) 0%, transparent 60%)", filter: "blur(60px)" }} />
        {/* Grid lines */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.025, backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
        {/* Horizon line */}
        <div style={{ position: "absolute", bottom: "15%", left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent 5%, rgba(34,255,187,0.08) 30%, rgba(0,170,255,0.06) 70%, transparent 95%)" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, width: "100%", margin: "0 auto", display: "flex", alignItems: "center", gap: 72 }}>
        <div style={{ flex: 1.15 }}>
          {/* Badge */}
          <div className="anim-fadeDown" style={{ display: "inline-flex", alignItems: "center", gap: 0, borderRadius: 100, overflow: "hidden", border: "1px solid rgba(34,255,187,0.12)", marginBottom: 36 }}>
            <div style={{ padding: "6px 12px", background: "var(--accent)", fontSize: 10, fontWeight: 800, color: "#030305", letterSpacing: "0.06em" }}>FREE</div>
            <div style={{ padding: "6px 14px", fontSize: 12, fontWeight: 500, color: "var(--accent)", background: "rgba(34,255,187,0.06)" }}>All features, no limits</div>
          </div>

          <h1 className="anim-fadeUp" style={{ fontSize: "clamp(44px, 5.5vw, 72px)", fontWeight: 800, lineHeight: 1.0, letterSpacing: "-0.045em", margin: "0 0 24px", fontFamily: "'Space Grotesk', sans-serif" }}>
            Your CS2<br />
            <span className="gradient-text">performance,</span><br />
            <span style={{ color: "var(--text)" }}>decoded.</span>
          </h1>

          <p className="anim-fadeUp-1" style={{ fontSize: 17, lineHeight: 1.7, color: "var(--text-3)", maxWidth: 440, margin: "0 0 40px" }}>
            47+ advanced metrics. AI coaching. Win probability modeling. Everything you need to rank up, in one dashboard.
          </p>

          <div className="anim-fadeUp-2" style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <a href="/api/auth/steam" style={{
              display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 28px", borderRadius: 10,
              background: "var(--accent)", color: "#030305",
              fontSize: 14, fontWeight: 700, textDecoration: "none", transition: "all 0.3s",
              boxShadow: "0 0 30px rgba(34,255,187,0.15), 0 0 80px rgba(34,255,187,0.05)",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px) scale(1.02)"; e.currentTarget.style.boxShadow = "0 0 50px rgba(34,255,187,0.25), 0 0 120px rgba(34,255,187,0.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = "0 0 30px rgba(34,255,187,0.15), 0 0 80px rgba(34,255,187,0.05)"; }}>
              <Icons.Steam s={16} c="#030305" /> Connect Steam
            </a>
            <a href="#features" style={{
              display: "inline-flex", alignItems: "center", gap: 6, padding: "14px 24px", borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.08)", color: "var(--text-2)",
              fontSize: 14, fontWeight: 500, textDecoration: "none", transition: "all 0.3s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "var(--text-2)"; e.currentTarget.style.background = "transparent"; }}>
              Explore features ↓
            </a>
          </div>

          <div className="anim-fadeUp-3" style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 48 }}>
            {["Secured via Steam OAuth", "47+ deep metrics", "Sub-second parsing"].map((t, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <Icons.Check s={12} c="var(--accent)" />
                <span style={{ fontSize: 11, color: "var(--text-3)", fontWeight: 500, letterSpacing: "0.01em" }}>{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard preview card */}
        <div className="hero-chart" style={{ flex: 0.85, position: "relative" }}>
          <div className="anim-fadeLeft" style={{ background: "rgba(8,10,16,0.7)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 24, position: "relative", boxShadow: "0 40px 100px rgba(0,0,0,0.5)" }}>
            {/* Top glow line */}
            <div style={{ position: "absolute", top: -1, left: 30, right: 30, height: 1, background: "linear-gradient(90deg, transparent, rgba(34,255,187,0.3), rgba(0,170,255,0.2), transparent)" }} />
            
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 10, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, marginBottom: 6 }}>Performance Score</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                  <span style={{ fontSize: 40, fontWeight: 800, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "-0.04em", background: "linear-gradient(180deg, #22ffbb, #0af)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>78.4</span>
                  <span style={{ fontSize: 12, color: "var(--text-3)" }}>/100</span>
                </div>
              </div>
              <div style={{ padding: "5px 10px", borderRadius: 6, background: "rgba(34,255,187,0.08)", border: "1px solid rgba(34,255,187,0.12)" }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--accent)", display: "flex", alignItems: "center", gap: 3 }}>
                  <Icons.TrendUp s={11} c="var(--accent)" /> +3.2
                </span>
              </div>
            </div>

            <div style={{ height: 120, marginBottom: 18, borderRadius: 8, overflow: "hidden", background: "rgba(255,255,255,0.01)" }}>
              <ResponsiveContainer>
                <AreaChart data={TREND_DATA} margin={{ top: 8, right: 0, bottom: 0, left: 0 }}>
                  <defs>
                    <linearGradient id="hg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22ffbb" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="#22ffbb" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area dataKey="y" stroke="#22ffbb" strokeWidth={2} fill="url(#hg)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
              {[
                { l: "ADR", v: "82.6", c: "#0af" },
                { l: "HS%", v: "52.3%", c: "#a78bfa" },
                { l: "Win Rate", v: "54.7%", c: "#22ffbb" },
              ].map((s, i) => (
                <div key={i} style={{ padding: "10px", borderRadius: 10, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.04)", textAlign: "center" }}>
                  <div style={{ fontSize: 10, color: "var(--text-3)", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 500 }}>{s.l}</div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: s.c, fontFamily: "'JetBrains Mono', monospace" }}>{s.v}</div>
                </div>
              ))}
            </div>

            {/* Floating radar */}
            <div className="anim-float" style={{ position: "absolute", bottom: -28, right: -28, width: 150, height: 150, background: "rgba(3,3,5,0.9)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 6, boxShadow: "0 16px 48px rgba(0,0,0,0.6)" }}>
              <div style={{ fontSize: 8, fontWeight: 700, color: "var(--text-3)", textAlign: "center", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 2 }}>Risk Profile</div>
              <ResponsiveContainer width="100%" height={115}>
                <RadarChart data={RADAR_DATA} margin={{ top: 2, right: 12, bottom: 2, left: 12 }}>
                  <PolarGrid stroke="rgba(255,255,255,0.04)" />
                  <PolarAngleAxis dataKey="s" tick={{ fill: "rgba(255,255,255,0.2)", fontSize: 7 }} />
                  <Radar dataKey="v" stroke="#22ffbb" fill="#22ffbb" fillOpacity={0.08} strokeWidth={1.5} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}