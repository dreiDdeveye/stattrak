"use client";

import { Icons } from "@/components/ui/Icons";
import { FadeSection } from "@/components/ui/Animations";
import { TESTIMONIALS } from "@/data/constants";

export default function Testimonials() {
  return (
    <section style={{ padding: "100px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeSection>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <h2 style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 900, color: "#fff", letterSpacing: "-0.03em", margin: "0 0 12px" }}>
              Trusted by <span style={{ color: "#ffaa00" }}>pros</span>
            </h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.35)" }}>From FPL to Tier 1 -- players at every level use StatTrak.</p>
          </div>
        </FadeSection>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
          {TESTIMONIALS.map((t, i) => (
            <FadeSection key={i} delay={i * 0.1}>
              <div style={{ padding: 28, borderRadius: 14, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", height: "100%" }}>
                <div style={{ display: "flex", gap: 2, marginBottom: 16 }}>
                  {Array.from({ length: t.stars }).map((_, j) => <Icons.Star key={j} s={14} c="#ffaa00" />)}
                </div>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, flex: 1, margin: "0 0 20px" }}>{"\u201C"}{t.text}{"\u201D"}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12, borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 16 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, rgba(0,255,163,0.15), rgba(0,212,255,0.15))", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icons.Crosshair s={16} c="rgba(255,255,255,0.5)" />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{t.tag}</div>
                  </div>
                </div>
              </div>
            </FadeSection>
          ))}
        </div>
      </div>
    </section>
  );
}
