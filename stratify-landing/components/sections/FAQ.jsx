"use client";

import { useState } from "react";
import { Icons } from "@/components/ui/Icons";
import { FadeSection } from "@/components/ui/Animations";
import { FAQ_ITEMS } from "@/data/constants";

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" style={{ padding: "100px 24px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <FadeSection>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 900, color: "#fff", letterSpacing: "-0.03em", margin: "0 0 12px" }}>
              Questions<span style={{ color: "rgba(255,255,255,0.25)" }}>?</span>
            </h2>
          </div>
        </FadeSection>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {FAQ_ITEMS.map((item, i) => (
            <FadeSection key={i} delay={i * 0.06}>
              <div style={{ borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)", background: open === i ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.01)", overflow: "hidden", transition: "all 0.3s" }}>
                <button onClick={() => setOpen(open === i ? null : i)} style={{ width: "100%", padding: "18px 22px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: open === i ? "#fff" : "rgba(255,255,255,0.6)" }}>{item.q}</span>
                  <span style={{ transform: open === i ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s", flexShrink: 0, marginLeft: 16 }}>
                    <Icons.ChevDown s={16} c="rgba(255,255,255,0.3)" />
                  </span>
                </button>
                <div style={{ maxHeight: open === i ? 200 : 0, overflow: "hidden", transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1)" }}>
                  <p style={{ padding: "0 22px 18px", fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.7, margin: 0 }}>{item.a}</p>
                </div>
              </div>
            </FadeSection>
          ))}
        </div>
      </div>
    </section>
  );
}
