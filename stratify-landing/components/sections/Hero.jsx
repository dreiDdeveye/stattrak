"use client";

import { RadarChart, Radar, PolarGrid, PolarAngleAxis, AreaChart, Area, ResponsiveContainer } from "recharts";
import { Icons } from "@/components/ui/Icons";
import { RADAR_DATA, TREND_DATA } from "@/data/constants";

export default function Hero() {
  return (
    <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", padding: "120px 24px 80px" }}>
      {/* BG */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "15%", left: "10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,255,163,0.06) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "5%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", top: "40%", left: "50%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(168,85,247,0.04) 0%, transparent 70%)", filter: "blur(50px)" }} />
        <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="anim-scan" style={{ position: "absolute", left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(0,255,163,0.15), transparent)" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, width: "100%", display: "flex", alignItems: "center", gap: 60 }}>
        {/* Left */}
        <div style={{ flex: 1.1 }}>
          <div className="anim-fadeDown" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 100, background: "rgba(0,255,163,0.06)", border: "1px solid rgba(0,255,163,0.12)", marginBottom: 28 }}>
            <div className="anim-pulse" style={{ width: 6, height: 6, borderRadius: 3, background: "#00ffa3" }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: "#00ffa3", letterSpacing: "0.04em" }}>NOW IN PUBLIC BETA</span>
          </div>

          <h1 className="anim-fadeUp" style={{ fontSize: "clamp(40px, 5.5vw, 72px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.04em", margin: "0 0 24px" }}>
            <span style={{ color: "#fff" }}>Your CS2 stats</span><br />
            <span style={{ background: "linear-gradient(135deg, #00ffa3, #00d4ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>decoded.</span>
          </h1>

          <p className="anim-fadeUp-1" style={{ fontSize: "clamp(16px, 1.4vw, 19px)", lineHeight: 1.7, color: "rgba(255,255,255,0.45)", maxWidth: 520, margin: "0 0 40px" }}>
            StatTrak goes beyond K/D and ADR. Contextual round breakdowns, micro aim analytics, AI-powered coaching, and win probability modeling that shows you exactly what{"'"}s holding you back.
          </p>

          <div className="anim-fadeUp-2" style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <a href="/dashboard" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 28px", borderRadius: 10, background: "linear-gradient(135deg, #00ffa3, #00d4ff)", color: "#06080e", fontSize: 15, fontWeight: 700, textDecoration: "none", transition: "all 0.3s", boxShadow: "0 0 30px rgba(0,255,163,0.2), 0 4px 20px rgba(0,0,0,0.3)" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 0 50px rgba(0,255,163,0.35), 0 8px 30px rgba(0,0,0,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 0 30px rgba(0,255,163,0.2), 0 4px 20px rgba(0,0,0,0.3)"; }}>
              <Icons.Steam s={16} c="#06080e" /> Connect Steam -- It{"'"}s Free
            </a>
            <a href="#features" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 24px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)", fontSize: 14, fontWeight: 600, textDecoration: "none", transition: "all 0.3s", background: "rgba(255,255,255,0.02)" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,255,163,0.3)"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}>
              <Icons.Play s={14} c="currentColor" /> See How It Works
            </a>
          </div>

          <div className="anim-fadeUp-3" style={{ display: "flex", alignItems: "center", gap: 24, marginTop: 40 }}>
            <div style={{ display: "flex" }}>
              {[0,1,2,3].map(i => (
                <div key={i} style={{ width: 32, height: 32, borderRadius: 16, border: "2px solid #06080e", marginLeft: i ? -10 : 0, background: `hsl(${150+i*30}, 60%, ${40+i*5}%)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icons.Crosshair s={14} c="rgba(255,255,255,0.7)" />
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.8)" }}>12,400+ players</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>already leveling up</div>
            </div>
          </div>
        </div>

        {/* Right: Chart Preview */}
        <div className="hero-chart" style={{ flex: 0.9, position: "relative" }}>
          <div className="anim-fadeLeft" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 24, position: "relative", boxShadow: "0 20px 60px rgba(0,0,0,0.4)" }}>
            <div style={{ position: "absolute", top: -1, left: 40, right: 40, height: 1, background: "linear-gradient(90deg, transparent, rgba(0,255,163,0.3), transparent)" }} />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>Performance Score</div>
                <div style={{ fontSize: 36, fontWeight: 800, color: "#00ffa3", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "-0.03em" }}>78.4</div>
              </div>
              <div style={{ padding: "4px 12px", borderRadius: 6, background: "rgba(0,255,163,0.08)", border: "1px solid rgba(0,255,163,0.15)" }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#00ffa3", display: "flex", alignItems: "center", gap: 4 }}>
                  <Icons.TrendUp s={12} c="#00ffa3" /> +3.2%
                </span>
              </div>
            </div>
            <div style={{ height: 140, marginBottom: 20 }}>
              <ResponsiveContainer>
                <AreaChart data={TREND_DATA} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                  <defs><linearGradient id="hg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#00ffa3" stopOpacity={0.25} /><stop offset="100%" stopColor="#00ffa3" stopOpacity={0} /></linearGradient></defs>
                  <Area dataKey="y" stroke="#00ffa3" strokeWidth={2} fill="url(#hg)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
              {[{ l: "ADR", v: "82.6", c: "#00d4ff" }, { l: "HS%", v: "52.3%", c: "#a855f7" }, { l: "Win%", v: "54.7%", c: "#00ffa3" }].map((s, i) => (
                <div key={i} style={{ padding: "10px 12px", borderRadius: 8, background: "rgba(255,255,255,0.03)", textAlign: "center" }}>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginBottom: 4 }}>{s.l}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: s.c, fontFamily: "'JetBrains Mono', monospace" }}>{s.v}</div>
                </div>
              ))}
            </div>
            <div className="anim-float" style={{ position: "absolute", bottom: -30, right: -30, width: 160, height: 160, background: "rgba(6,8,14,0.9)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: 8, boxShadow: "0 10px 40px rgba(0,0,0,0.5)" }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.3)", textAlign: "center", textTransform: "uppercase", letterSpacing: "0.1em" }}>Risk Profile</div>
              <ResponsiveContainer width="100%" height={120}>
                <RadarChart data={RADAR_DATA} margin={{ top: 5, right: 15, bottom: 5, left: 15 }}>
                  <PolarGrid stroke="rgba(255,255,255,0.06)" />
                  <PolarAngleAxis dataKey="s" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 8 }} />
                  <Radar dataKey="v" stroke="#00ffa3" fill="#00ffa3" fillOpacity={0.12} strokeWidth={1.5} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="anim-bounce" style={{ position: "absolute", bottom: 30, left: "50%", transform: "translateX(-50%)", opacity: 0.3 }}>
        <Icons.ChevDown s={24} c="rgba(255,255,255,0.5)" />
      </div>
    </section>
  );
}
