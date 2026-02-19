"use client";
import { Icons } from "@/components/ui/Icons";
import { FadeSection } from "@/components/ui/Animations";

export default function FinalCTA() {
  return (
    <section style={{ padding: "60px 24px 100px", position: "relative" }}>
      <FadeSection>
        <div style={{
          maxWidth: 700, margin: "0 auto", textAlign: "center", padding: "72px 48px", borderRadius: 24, position: "relative", overflow: "hidden",
          background: "linear-gradient(145deg, rgba(34,255,187,0.04), rgba(0,170,255,0.02), rgba(167,139,250,0.02))",
          border: "1px solid rgba(34,255,187,0.08)",
        }}>
          {/* Glow orbs */}
          <div style={{ position: "absolute", top: -60, left: "30%", width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(34,255,187,0.08), transparent)", filter: "blur(40px)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: -40, right: "20%", width: 160, height: 160, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,170,255,0.06), transparent)", filter: "blur(40px)", pointerEvents: "none" }} />
          {/* Top accent line */}
          <div style={{ position: "absolute", top: -1, left: "15%", right: "15%", height: 1, background: "linear-gradient(90deg, transparent, rgba(34,255,187,0.4), rgba(0,170,255,0.3), transparent)" }} />

          <h2 style={{ fontSize: "clamp(30px, 3.5vw, 44px)", fontWeight: 800, letterSpacing: "-0.04em", margin: "0 0 14px", lineHeight: 1.15, fontFamily: "'Space Grotesk', sans-serif", position: "relative" }}>
            <span style={{ color: "var(--text)" }}>Ready to </span>
            <span className="gradient-text">rank up?</span>
          </h2>
          <p style={{ fontSize: 15, color: "var(--text-3)", maxWidth: 400, margin: "0 auto 32px", lineHeight: 1.6, position: "relative" }}>
            Connect Steam and unlock every metric, every insight, every edge. Completely free.
          </p>
          <a href="/api/auth/steam" style={{
            display: "inline-flex", alignItems: "center", gap: 10, padding: "15px 34px", borderRadius: 12,
            background: "var(--accent)", color: "#030305", fontSize: 15, fontWeight: 700, textDecoration: "none",
            transition: "all 0.3s", boxShadow: "0 0 40px rgba(34,255,187,0.2), 0 0 100px rgba(34,255,187,0.06)",
            position: "relative",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px) scale(1.02)"; e.currentTarget.style.boxShadow = "0 0 60px rgba(34,255,187,0.3), 0 0 140px rgba(34,255,187,0.08)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = "0 0 40px rgba(34,255,187,0.2), 0 0 100px rgba(34,255,187,0.06)"; }}>
            <Icons.Steam s={16} c="#030305" /> Get Started Free
          </a>
          <div style={{ marginTop: 16, fontSize: 12, color: "var(--text-3)", position: "relative" }}>No credit card · No limits · 30 second setup</div>
        </div>
      </FadeSection>
    </section>
  );
}