"use client";
import { useState } from "react";
import { Icons } from "@/components/ui/Icons";
import { FadeSection } from "@/components/ui/Animations";
import { FAQ_ITEMS } from "@/data/constants";

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" style={{ padding: "100px 24px" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <FadeSection>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 800, letterSpacing: "-0.03em", margin: 0, fontFamily: "'Space Grotesk', sans-serif" }}>
              <span style={{ color: "var(--text)" }}>Common </span>
              <span className="gradient-text">questions</span>
            </h2>
          </div>
        </FadeSection>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {FAQ_ITEMS.map((item, i) => (
            <FadeSection key={i} delay={i * 0.05}>
              <div style={{
                borderRadius: 14, overflow: "hidden", transition: "all 0.3s",
                background: open === i ? "rgba(255,255,255,0.035)" : "rgba(255,255,255,0.015)",
                border: open === i ? "1px solid rgba(34,255,187,0.1)" : "1px solid rgba(255,255,255,0.05)",
              }}>
                <button onClick={() => setOpen(open === i ? null : i)} style={{
                  width: "100%", padding: "18px 22px", display: "flex", alignItems: "center", justifyContent: "space-between",
                  background: "none", border: "none", cursor: "pointer", textAlign: "left",
                }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: open === i ? "#fff" : "var(--text-2)", transition: "color 0.2s" }}>{item.q}</span>
                  <span style={{
                    width: 28, height: 28, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
                    background: open === i ? "rgba(34,255,187,0.1)" : "rgba(255,255,255,0.04)",
                    transform: open === i ? "rotate(180deg)" : "rotate(0)", transition: "all 0.3s",
                    flexShrink: 0, marginLeft: 16,
                  }}>
                    <Icons.ChevDown s={14} c={open === i ? "var(--accent)" : "var(--text-3)"} />
                  </span>
                </button>
                <div style={{ maxHeight: open === i ? 200 : 0, overflow: "hidden", transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1)" }}>
                  <p style={{ padding: "0 22px 18px", fontSize: 13, color: "var(--text-3)", lineHeight: 1.7, margin: 0 }}>{item.a}</p>
                </div>
              </div>
            </FadeSection>
          ))}
        </div>
      </div>
    </section>
  );
}