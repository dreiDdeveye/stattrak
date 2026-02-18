import { Icons } from "@/components/ui/Icons";

export default function Footer() {
  return (
    <footer style={{ padding: "48px 24px 32px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #00ffa3, #00d4ff)" }}>
            <Icons.Target s={14} c="#06080e" />
          </div>
          <span style={{ fontSize: 15, fontWeight: 800, letterSpacing: "-0.03em" }}>
            <span style={{ color: "#00ffa3" }}>StatTrak</span>
          </span>
        </div>
        <div style={{ display: "flex", gap: 28 }}>
          {["Privacy", "Terms", "Discord", "Twitter"].map(l => (
            <a key={l} href="#" style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "rgba(255,255,255,0.6)"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.3)"}>
              {l}
            </a>
          ))}
        </div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.18)" }}>
          Not affiliated with Valve Corporation. CS2 is a trademark of Valve.
        </div>
      </div>
    </footer>
  );
}
