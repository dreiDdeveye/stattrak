"use client";

import { Icons } from "@/components/ui/Icons";
import { FadeSection } from "@/components/ui/Animations";
import { STEPS } from "@/data/constants";

export default function HowItWorks() {
  return (
    <section style={{ padding: "100px 24px", position: "relative" }}>
      <div style={{ position: "absolute", left: "50%", top: "30%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(168,85,247,0.03), transparent)", filter: "blur(60px)", transform: "translateX(-50%)" }} />
      <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative" }}>
        <FadeSection>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <h2 style={{ fontSize: "clamp(30px, 3.5vw, 44px)", fontWeight: 900, color: "#fff", letterSpacing: "-0.03em", margin: "0 0 12px" }}>
              Three steps to <span style={{ color: "#a855f7" }}>rank up</span>
            </h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.38)", maxWidth: 440, margin: "0 auto" }}>From connect to insight in under 30 seconds.</p>
          </div>
        </FadeSection>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, position: "relative" }}>
          <div style={{ position: "absolute", top: 48, left: "18%", right: "18%", height: 1, background: "linear-gradient(90deg, #00ffa3, #00d4ff, #a855f7)", opacity: 0.15, zIndex: 0 }} />
          {STEPS.map((step, i) => {
            const IconComp = Icons[step.iconKey];
            return (
              <FadeSection key={i} delay={i * 0.15}>
                <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
                  <div style={{ width: 72, height: 72, borderRadius: 20, margin: "0 auto 20px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                    {IconComp && <IconComp s={22} c={step.iconColor} />}
                    <div style={{ position: "absolute", top: -8, right: -8, width: 24, height: 24, borderRadius: 12, background: "#06080e", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: 10, fontWeight: 800, color: "rgba(255,255,255,0.4)", fontFamily: "'JetBrains Mono', monospace" }}>{step.num}</span>
                    </div>
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: "#fff", margin: "0 0 8px" }}>{step.title}</h3>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.38)", lineHeight: 1.6, margin: 0, maxWidth: 260, marginInline: "auto" }}>{step.desc}</p>
                </div>
              </FadeSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
