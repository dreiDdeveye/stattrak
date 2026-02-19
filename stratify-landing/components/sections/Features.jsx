"use client";
import { Icons } from "@/components/ui/Icons";
import { FadeSection } from "@/components/ui/Animations";
import { FEATURES } from "@/data/constants";

export default function Features() {
  return (
    <section id="features" style={{ padding: "140px 24px 100px", position: "relative" }}>
      {/* Section BG glow */}
      <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)", width: "80vw", maxWidth: 1000, height: 600, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(34,255,187,0.03), transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
        <FadeSection>
          <div style={{ marginBottom: 72 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 100, background: "rgba(34,255,187,0.06)", border: "1px solid rgba(34,255,187,0.1)", marginBottom: 20 }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--accent)" }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: "var(--accent)", letterSpacing: "0.05em" }}>8 ENGINES</span>
            </div>
            <h2 style={{ fontSize: "clamp(32px, 3.5vw, 50px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.1, margin: "0 0 16px", fontFamily: "'Space Grotesk', sans-serif" }}>
              <span style={{ color: "var(--text)" }}>Stats that actually </span>
              <span className="gradient-text">matter.</span>
            </h2>
            <p style={{ fontSize: 16, color: "var(--text-3)", maxWidth: 460, lineHeight: 1.65 }}>
              Every metric is contextual, comparative, and actionable.
            </p>
          </div>
        </FadeSection>

        {/* Bento grid */}
        <div className="bento-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridAutoRows: "auto", gap: 12 }}>
          {FEATURES.map((f, i) => {
            const IC = Icons[f.iconKey];
            const isLarge = i === 0 || i === 5;
            return (
              <FadeSection key={i} delay={i * 0.04}>
                <div className="card-hover" style={{
                  padding: 28, borderRadius: 16,
                  background: `linear-gradient(145deg, rgba(255,255,255,0.03), rgba(255,255,255,0.008))`,
                  border: "1px solid rgba(255,255,255,0.06)",
                  gridColumn: isLarge ? "span 2" : "span 1",
                  height: "100%", cursor: "default", position: "relative", overflow: "hidden",
                }}>
                  {/* Corner glow */}
                  <div style={{ position: "absolute", top: -40, right: -40, width: 120, height: 120, borderRadius: "50%", background: `radial-gradient(circle, ${f.color}08, transparent)`, pointerEvents: "none" }} />
                  
                  <div style={{
                    width: 42, height: 42, borderRadius: 11,
                    background: `linear-gradient(135deg, ${f.color}12, ${f.color}06)`,
                    border: `1px solid ${f.color}18`,
                    display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18,
                  }}>
                    {IC && <IC s={20} c={f.iconColor} />}
                  </div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: "#fff", margin: "0 0 8px", letterSpacing: "-0.01em" }}>{f.title}</h3>
                  <p style={{ fontSize: 13, color: "var(--text-3)", lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
                </div>
              </FadeSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}