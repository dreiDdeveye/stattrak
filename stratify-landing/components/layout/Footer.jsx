export default function Footer() {
  return (
    <footer style={{ padding: "40px 24px 28px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <img src="/logo.png" alt="StatTrak" style={{ width: 22, height: 22, borderRadius: 5, objectFit: "contain" }} />
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text-3)" }}>
            stat<span style={{ color: "var(--accent)" }}>trak</span>
          </span>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {["Privacy", "Terms", "Discord"].map(l => (
            <a key={l} href="#" style={{ fontSize: 12, color: "var(--text-3)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "var(--text-2)"} onMouseLeave={e => e.target.style.color = "var(--text-3)"}>
              {l}
            </a>
          ))}
        </div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.1)" }}>Not affiliated with Valve Corporation.</div>
      </div>
    </footer>
  );
}