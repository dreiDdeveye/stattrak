"use client";
import { FadeSection, AnimNum } from "@/components/ui/Animations";
import { STATS } from "@/data/constants";

export default function StatsBar() {
  return (
    <section style={{ padding: "0 24px", marginTop: -20, position: "relative", zIndex: 2 }}>
      <div className="stats-grid" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        {STATS.map((s, i) => (
          <FadeSection key={i} delay={i * 0.08}>
            <div className="glass" style={{ padding: "28px 20px", textAlign: "center", borderRadius: 14 }}>
              <div style={{ fontSize: "clamp(26px, 2.5vw, 36px)", fontWeight: 800, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "-0.04em", background: "linear-gradient(135deg, #22ffbb, #0af)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                <AnimNum target={s.num} suffix={s.suffix} decimals={s.num % 1 ? 1 : 0} />
              </div>
              <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 6, fontWeight: 500, letterSpacing: "0.02em" }}>{s.label}</div>
            </div>
          </FadeSection>
        ))}
      </div>
    </section>
  );
}