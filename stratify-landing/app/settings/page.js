"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAPI";
import { api } from "@/lib/api";
import { Icons } from "@/components/ui/Icons";
import { LoadingSpinner } from "@/components/dashboard/LoadingStates";

export default function SettingsPage() {
  const { user, loading, isLoggedIn } = useAuth();
  const [authCode, setAuthCode] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#06080e" }}>
      <LoadingSpinner />
    </div>
  );

  if (!isLoggedIn) {
    if (typeof window !== "undefined") window.location.href = "/api/auth/steam";
    return null;
  }

  const handleSave = async () => {
    if (!authCode.trim()) return;
    setSaving(true);
    setMessage(null);
    try {
      const res = await api.user.setAuthCode(authCode.trim());
      setMessage({ type: "success", text: res.message || "Auth code saved! You can now sync matches." });
      setAuthCode("");
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Failed to save" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#06080e", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ maxWidth: 500, width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #00ffa3, #00d4ff)" }}>
            <Icons.Target s={20} c="#0a0c12" />
          </div>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 800, color: "#fff", margin: 0, fontFamily: "'Outfit', sans-serif" }}>
              <span style={{ color: "#00ffa3" }}>StatTrak</span> Settings
            </h1>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", margin: 0 }}>Welcome, {user?.username}</p>
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 8, fontFamily: "'Outfit', sans-serif" }}>
            Steam Match Sharing Auth Code
          </h2>
          <p style={{ fontSize: 13, lineHeight: 1.6, color: "rgba(255,255,255,0.5)", marginBottom: 16 }}>
            This code lets StatTrak access your CS2 match history. To get it:
          </p>
          <div style={{ padding: 16, background: "rgba(0,255,163,0.04)", border: "1px solid rgba(0,255,163,0.1)", borderRadius: 10, marginBottom: 16 }}>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.8 }}>
              1. Open <strong style={{ color: "#fff" }}>CS2</strong><br />
              2. Go to <strong style={{ color: "#fff" }}>Settings → Game</strong><br />
              3. Find <strong style={{ color: "#00ffa3" }}>"Authentication Token for Third-Party Match History"</strong><br />
              4. Click <strong style={{ color: "#fff" }}>Generate</strong> and copy the code
            </div>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <input
              type="text"
              value={authCode}
              onChange={(e) => setAuthCode(e.target.value)}
              placeholder="XXXX-XXXXX-XXXX"
              style={{
                flex: 1, padding: "12px 16px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.04)", color: "#fff", fontSize: 14,
                fontFamily: "'JetBrains Mono', monospace", outline: "none",
              }}
            />
            <button
              onClick={handleSave}
              disabled={saving || !authCode.trim()}
              style={{
                padding: "12px 24px", borderRadius: 8, border: "none",
                background: authCode.trim() ? "linear-gradient(135deg, #00ffa3, #00d4ff)" : "rgba(255,255,255,0.06)",
                color: authCode.trim() ? "#0a0c12" : "rgba(255,255,255,0.3)",
                fontSize: 14, fontWeight: 700, cursor: authCode.trim() ? "pointer" : "default",
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>

          {message && (
            <div style={{
              marginTop: 12, padding: "10px 14px", borderRadius: 8,
              background: message.type === "success" ? "rgba(0,255,163,0.06)" : "rgba(255,68,102,0.06)",
              border: `1px solid ${message.type === "success" ? "rgba(0,255,163,0.15)" : "rgba(255,68,102,0.15)"}`,
              fontSize: 13, color: message.type === "success" ? "#00ffa3" : "#ff4466",
            }}>
              {message.text}
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <a href="/dashboard" style={{
            flex: 1, padding: "12px 0", borderRadius: 8, border: "1px solid rgba(0,255,163,0.2)",
            background: "rgba(0,255,163,0.06)", color: "#00ffa3",
            fontSize: 14, fontWeight: 600, textAlign: "center", textDecoration: "none",
            fontFamily: "'Outfit', sans-serif",
          }}>
            Go to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}