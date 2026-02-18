"use client";

import { Icons } from "@/components/ui/Icons";
import { FadeSection } from "@/components/ui/Animations";

export default function FinalCTA() {
  return (
    <section id="cta" style={{ padding: "100px 24px", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", width: 800, height: 400, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,255,163,0.06), transparent)", filter: "blur(80px)", transform: "translate(-50%,-50%)" }} />
      </div>
      <FadeSection>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative", padding: "64px 40px", borderRadius: 20, background: "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ position: "absolute", top: -1, left: "20%", right: "20%", height: 1, background: "linear-gradient(90deg, transparent, rgba(0,255,163,0.4), transparent)" }} />
          <Icons.Target s={40} c="#00ffa3" />
          <h2 style={{ fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 900, color: "#fff", letterSpacing: "-0.03em", margin: "20px 0 14px", lineHeight: 1.15 }}>
            Stop guessing.<br />Start <span style={{ color: "#00ffa3" }}>stat-tracking.</span>
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", maxWidth: 460, margin: "0 auto 32px", lineHeight: 1.6 }}>
            Join 12,000+ players using AI-powered analytics to find and fix the gaps in their game. Free to start.
          </p>
          <a href="/dashboard" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 36px", borderRadius: 12, background: "linear-gradient(135deg, #00ffa3, #00d4ff)", color: "#06080e", fontSize: 16, fontWeight: 800, textDecoration: "none", transition: "all 0.3s", boxShadow: "0 0 40px rgba(0,255,163,0.2), 0 4px 20px rgba(0,0,0,0.3)" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 0 60px rgba(0,255,163,0.35), 0 8px 30px rgba(0,0,0,0.4)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 0 40px rgba(0,255,163,0.2), 0 4px 20px rgba(0,0,0,0.3)"; }}>
            <Icons.Steam s={18} c="#06080e" /> Connect Steam -- It{"'"}s Free
          </a>
          <div style={{ marginTop: 16, fontSize: 12, color: "rgba(255,255,255,0.25)" }}>No credit card required. Setup in 30 seconds.</div>
        </div>
      </FadeSection>
    </section>
  );
}
