"use client";

import { useState, useEffect } from "react";
import { Icons } from "@/components/ui/Icons";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = ["Features", "Stats", "Pricing", "FAQ"];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 24px",
      background: scrolled ? "rgba(6,8,14,0.92)" : "transparent",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none", transition: "all 0.4s ease",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #00ffa3, #00d4ff)" }}>
            <Icons.Target s={17} c="#06080e" />
          </div>
          <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.04em" }}>
            <span style={{ color: "#00ffa3" }}>StatTrak</span>
            
          </span>
        </div>

        <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, fontWeight: 500, textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "#fff"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.5)"}>
              {l}
            </a>
          ))}
          <a href="http://localhost:4000/api/auth/steam" style={{
            display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 20px", borderRadius: 8,
            background: "linear-gradient(135deg, #00ffa3, #00d4ff)", color: "#06080e",
            fontSize: 13, fontWeight: 700, textDecoration: "none", transition: "transform 0.2s, box-shadow 0.2s",
            boxShadow: "0 0 20px rgba(0,255,163,0.15)",
          }}
            onMouseEnter={e => { e.target.style.transform = "translateY(-1px)"; e.target.style.boxShadow = "0 0 30px rgba(0,255,163,0.3)"; }}
            onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 0 20px rgba(0,255,163,0.15)"; }}>
            <Icons.Steam s={14} c="#06080e" /> Sign in with Steam
          </a>
        </div>

        <button className="mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)} style={{ display: "none", background: "none", border: "none", color: "#fff", cursor: "pointer" }}>
          {mobileOpen ? <Icons.X s={24} /> : <Icons.Menu s={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div style={{ padding: "16px 0 24px", display: "flex", flexDirection: "column", gap: 12, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMobileOpen(false)}
              style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, fontWeight: 500, textDecoration: "none", padding: "8px 0" }}>{l}</a>
          ))}
        </div>
      )}
    </nav>
  );
}
