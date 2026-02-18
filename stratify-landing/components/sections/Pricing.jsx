"use client";

import { Icons } from "@/components/ui/Icons";
import { FadeSection } from "@/components/ui/Animations";
import { PRICING } from "@/data/constants";

export default function Pricing() {
  return (
    <section id="pricing" style={{ padding: "100px 24px", position: "relative" }}>
      <div style={{ position: "absolute", top: "20%", left: "50%", width: 800, height: 400, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,255,163,0.03), transparent)", filter: "blur(80px)", transform: "translateX(-50%)" }} />
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
        <FadeSection>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <h2 style={{ fontSize: "clamp(30px, 3.5vw, 44px)", fontWeight: 900, color: "#fff", letterSpacing: "-0.03em", margin: "0 0 12px" }}>
              Simple <span style={{ color: "#00ffa3" }}>pricing</span>
            </h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.38)" }}>Free forever tier. No credit card required. Upgrade when you{"'"}re ready.</p>
          </div>
        </FadeSection>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, alignItems: "start" }}>
          {PRICING.map((p, i) => (
            <FadeSection key={i} delay={i * 0.1}>
              <div style={{
                borderRadius: 16, padding: 32, position: "relative", overflow: "hidden",
                background: p.featured ? "linear-gradient(135deg, rgba(0,255,163,0.06), rgba(0,212,255,0.03))" : "rgba(255,255,255,0.02)",
                border: `1px solid ${p.featured ? "rgba(0,255,163,0.2)" : "rgba(255,255,255,0.06)"}`,
                boxShadow: p.featured ? "0 0 40px rgba(0,255,163,0.08)" : "none",
                transform: p.featured ? "scale(1.03)" : "scale(1)", transition: "transform 0.3s",
              }}>
                {p.featured && (
                  <div style={{ position: "absolute", top: 16, right: 16, padding: "4px 12px", borderRadius: 100, background: "rgba(0,255,163,0.12)", border: "1px solid rgba(0,255,163,0.2)" }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: "#00ffa3", letterSpacing: "0.06em" }}>MOST POPULAR</span>
                  </div>
                )}
                <div style={{ marginBottom: 24 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fff", margin: "0 0 8px" }}>{p.name}</h3>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>$</span>
                    <span style={{ fontSize: 42, fontWeight: 900, color: "#fff", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "-0.04em" }}>{p.price}</span>
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>{p.period}</span>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                  {p.features.map((f, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Icons.Check s={15} c={p.accent} />
                      <span style={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}>{f}</span>
                    </div>
                  ))}
                </div>
                <a href="/dashboard" style={{ textDecoration: "none" }}><button style={{
                  width: "100%", padding: "12px 0", borderRadius: 10,
                  border: p.featured ? "none" : `1px solid ${p.accent}33`,
                  background: p.featured ? "linear-gradient(135deg, #00ffa3, #00d4ff)" : "transparent",
                  color: p.featured ? "#06080e" : p.accent, fontSize: 14, fontWeight: 700, cursor: "pointer",
                  transition: "all 0.3s", boxShadow: p.featured ? "0 0 20px rgba(0,255,163,0.15)" : "none",
                }}
                  onMouseEnter={e => { if (p.featured) e.currentTarget.style.boxShadow = "0 0 30px rgba(0,255,163,0.3)"; else e.currentTarget.style.background = p.accent + "11"; }}
                  onMouseLeave={e => { if (p.featured) e.currentTarget.style.boxShadow = "0 0 20px rgba(0,255,163,0.15)"; else e.currentTarget.style.background = "transparent"; }}>
                  {p.cta}
                </button></a>
              </div>
            </FadeSection>
          ))}
        </div>
      </div>
    </section>
  );
}
