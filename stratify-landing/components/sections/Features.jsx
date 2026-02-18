"use client";

import { Icons } from "@/components/ui/Icons";
import { FadeSection } from "@/components/ui/Animations";
import { FEATURES } from "@/data/constants";

export default function Features() {
  return (
    <section id="features" style={{ padding: "120px 24px", position: "relative" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeSection>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 100, background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.12)", marginBottom: 20 }}>
              <Icons.Layers s={13} c="#00d4ff" />
              <span style={{ fontSize: 11, fontWeight: 600, color: "#00d4ff", letterSpacing: "0.05em" }}>8 ANALYTICAL ENGINES</span>
            </div>
            <h2 style={{ fontSize: "clamp(30px, 3.5vw, 48px)", fontWeight: 900, color: "#fff", letterSpacing: "-0.03em", margin: "0 0 16px", lineHeight: 1.1 }}>
              Stats that actually<br /><span style={{ color: "#00d4ff" }}>mean something</span>
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.4)", maxWidth: 560, margin: "0 auto", lineHeight: 1.6 }}>
              Every metric is contextual, comparative, and actionable. No vanity stats. No noise. Just the numbers that make you better.
            </p>
          </div>
        </FadeSection>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {FEATURES.map((f, i) => {
            const IconComp = Icons[f.iconKey];
            return (
              <FadeSection key={i} delay={i * 0.06}>
                <div style={{ padding: 28, borderRadius: 14, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)", cursor: "default", position: "relative", overflow: "hidden", height: "100%" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = f.color + "33"; e.currentTarget.style.background = f.color + "06"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)"; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                  <div style={{ position: "absolute", top: 0, right: 0, width: 120, height: 120, background: `radial-gradient(circle at top right, ${f.color}08, transparent)` }} />
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: f.color + "0d", border: `1px solid ${f.color}1a`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                    {IconComp && <IconComp s={24} c={f.iconColor} />}
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "#fff", margin: "0 0 10px", letterSpacing: "-0.01em" }}>{f.title}</h3>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
                </div>
              </FadeSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
