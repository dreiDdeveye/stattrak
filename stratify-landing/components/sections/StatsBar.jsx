"use client";

import { FadeSection, AnimNum } from "@/components/ui/Animations";
import { STATS } from "@/data/constants";

export default function StatsBar() {
  return (
    <section id="stats" style={{ padding: "0 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: "rgba(255,255,255,0.04)", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
        {STATS.map((s, i) => (
          <FadeSection key={i} delay={i * 0.1}>
            <div style={{ padding: "36px 24px", textAlign: "center", background: "rgba(6,8,14,0.6)" }}>
              <div style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 800, color: "#00ffa3", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "-0.03em" }}>
                <AnimNum target={s.num} suffix={s.suffix} decimals={s.num % 1 ? 1 : 0} />
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", marginTop: 4, fontWeight: 500 }}>{s.label}</div>
            </div>
          </FadeSection>
        ))}
      </div>
    </section>
  );
}
