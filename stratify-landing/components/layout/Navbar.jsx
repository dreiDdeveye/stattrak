"use client";
import { useState, useEffect } from "react";
import { Icons } from "@/components/ui/Icons";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = ["Features", "How It Works", "FAQ"];

  return (
    <nav style={{
      position: "fixed", top: scrolled ? 0 : 12, left: "50%", transform: "translateX(-50%)",
      zIndex: 100, width: scrolled ? "100%" : "min(92%, 1100px)",
      background: scrolled ? "rgba(3,3,5,0.85)" : "rgba(255,255,255,0.04)",
      borderRadius: scrolled ? 0 : 14,
      border: scrolled ? "none" : "1px solid rgba(255,255,255,0.06)",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : undefined,
      backdropFilter: "blur(20px) saturate(1.5)",
      transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
      padding: "0 24px",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none" }}>
          <img src="/logo.png" alt="StatTrak" style={{ width: 28, height: 28, borderRadius: 6, objectFit: "contain" }} />
          <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.02em", color: "#fff" }}>
            stat<span style={{ color: "var(--accent)" }}>trak</span>
          </span>
        </a>

        <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: 2 }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(/ /g, "-")}`} style={{
              color: "var(--text-3)", fontSize: 13, fontWeight: 500, textDecoration: "none",
              padding: "6px 12px", borderRadius: 8, transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.target.style.color = "#fff"; e.target.style.background = "rgba(255,255,255,0.06)"; }}
              onMouseLeave={e => { e.target.style.color = "var(--text-3)"; e.target.style.background = "transparent"; }}>
              {l}
            </a>
          ))}
          <div style={{ width: 1, height: 16, background: "rgba(255,255,255,0.08)", margin: "0 8px" }} />
          <a href="/api/auth/steam" style={{
            display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 16px", borderRadius: 8,
            background: "var(--accent)", color: "#030305",
            fontSize: 12, fontWeight: 700, textDecoration: "none", transition: "all 0.2s",
            letterSpacing: "0.01em",
          }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 20px rgba(34,255,187,0.3)"; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; }}>
            <Icons.Steam s={12} c="#030305" /> Sign in
          </a>
        </div>

        <button className="mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)} style={{ display: "none", background: "none", border: "none", color: "#fff", cursor: "pointer" }}>
          {mobileOpen ? <Icons.X s={20} /> : <Icons.Menu s={20} />}
        </button>
      </div>
    </nav>
  );
}