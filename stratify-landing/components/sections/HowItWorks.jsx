"use client";
import { Icons } from "@/components/ui/Icons";
import { FadeSection } from "@/components/ui/Animations";
import { STEPS } from "@/data/constants";

export default function HowItWorks() {
  return (
    <section id="how-it-works" style={{ padding: "100px 24px", position: "relative" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <FadeSection>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <h2 style={{ fontSize: "clamp(30px, 3.5vw, 46px)", fontWeight: 800, letterSpacing: "-0.04em", margin: "0 0 14px", fontFamily: "'Space Grotesk', sans-serif" }}>
              <span style={{ color: "var(--text)" }}>Three steps to </span>
              <span className="gradient-text">rank up</span>
            </h2>
            <p style={{ fontSize: 15, color: "var(--text-3)" }}>From connect to insight in under 30 seconds.</p>
          </div>
        </FadeSection>

        <div className="steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, position: "relative" }}>
          {/* Connector line */}
          <div style={{ position: "absolute", top: 52, left: "18%", right: "18%", height: 2, background: "linear-gradient(90deg, var(--accent), var(--accent-2), #a78bfa)", opacity: 0.12, borderRadius: 1 }} />
          
          {STEPS.map((step, i) => {
            const IC = Icons[step.iconKey];
            return (
              <FadeSection key={i} delay={i * 0.12}>
                <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
                  <div style={{
                    width: 80, height: 80, borderRadius: 20, margin: "0 auto 20px",
                    background: "linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
                    border: "1px solid rgba(255,255,255,0.07)",
                    display: "flex", alignItems: "center", justifyContent: "center", position: "relative",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                  }}>
                    {IC && <IC s={24} c={step.iconColor} />}
                    <div style={{
                      position: "absolute", top: -8, right: -8, width: 26, height: 26, borderRadius: 8,
                      background: "var(--bg)", border: "1px solid rgba(255,255,255,0.08)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <span style={{ fontSize: 10, fontWeight: 800, color: "var(--accent)", fontFamily: "'JetBrains Mono', monospace" }}>{step.num}</span>
                    </div>
                    {/* Glow behind icon */}
                    <div style={{ position: "absolute", inset: -20, borderRadius: "50%", background: `radial-gradient(circle, ${step.iconColor}08, transparent)`, pointerEvents: "none" }} />
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "#fff", margin: "0 0 8px" }}>{step.title}</h3>
                  <p style={{ fontSize: 13, color: "var(--text-3)", lineHeight: 1.6, margin: 0, maxWidth: 260, marginInline: "auto" }}>{step.desc}</p>
                </div>
              </FadeSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}