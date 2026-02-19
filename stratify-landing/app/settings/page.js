"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAPI";
import { api } from "@/lib/api";

export default function SettingsPage() {
  const { user, loading, isLoggedIn } = useAuth();
  const [authCode, setAuthCode] = useState("");
  const [saving, setSaving] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [message, setMessage] = useState(null);
  const [syncMessage, setSyncMessage] = useState(null);
  const [saved, setSaved] = useState(false);

  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#030305", color: "#fff", fontSize: 14 }}>Loading...</div>
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
      setMessage({ type: "success", text: "Auth code saved! Now click Sync Matches below." });
      setSaved(true);
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Failed to save" });
    } finally {
      setSaving(false);
    }
  };

  const handleSync = async () => {
    setSyncing(true);
    setSyncMessage(null);
    try {
      const res = await api.matches.sync();
      setSyncMessage({ type: res.synced > 0 ? "success" : "info", text: res.message });
    } catch (err) {
      setSyncMessage({ type: "error", text: "Sync failed: " + (err.message || "Unknown error") });
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#030305", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ maxWidth: 480, width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: 32 }}>
        
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "#fff", margin: "0 0 4px" }}>
            Settings
          </h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", margin: 0 }}>Welcome, {user?.username}</p>
        </div>

        {/* Auth Code Section */}
        <div style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 8 }}>
            Steam Match Auth Code
          </h2>
          <div style={{ padding: 14, background: "rgba(34,255,187,0.04)", border: "1px solid rgba(34,255,187,0.08)", borderRadius: 10, marginBottom: 14 }}>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>
              1. Open <strong style={{ color: "#fff" }}>CS2</strong><br />
              2. Go to <strong style={{ color: "#fff" }}>Settings → Game</strong><br />
              3. Find <strong style={{ color: "#22ffbb" }}>"Authentication Token for Third-Party Match History"</strong><br />
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
                flex: 1, padding: "11px 14px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.03)", color: "#fff", fontSize: 14,
                fontFamily: "'JetBrains Mono', monospace", outline: "none",
              }}
              onFocus={e => e.target.style.borderColor = "rgba(34,255,187,0.3)"}
              onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
            />
            <button
              onClick={handleSave}
              disabled={saving || !authCode.trim()}
              style={{
                padding: "11px 22px", borderRadius: 8, border: "none",
                background: authCode.trim() ? "#22ffbb" : "rgba(255,255,255,0.06)",
                color: authCode.trim() ? "#030305" : "rgba(255,255,255,0.3)",
                fontSize: 13, fontWeight: 700, cursor: authCode.trim() ? "pointer" : "default",
              }}
            >
              {saving ? "..." : "Save"}
            </button>
          </div>

          {message && (
            <div style={{
              marginTop: 10, padding: "9px 12px", borderRadius: 8, fontSize: 13,
              background: message.type === "success" ? "rgba(34,255,187,0.06)" : "rgba(255,68,102,0.06)",
              border: `1px solid ${message.type === "success" ? "rgba(34,255,187,0.12)" : "rgba(255,68,102,0.12)"}`,
              color: message.type === "success" ? "#22ffbb" : "#ff4466",
            }}>
              {message.text}
            </div>
          )}
        </div>

        {/* Sync Section */}
        <div style={{ marginBottom: 28 }}>
          <button
            onClick={handleSync}
            disabled={syncing}
            style={{
              width: "100%", padding: "13px 0", borderRadius: 10, border: "1px solid rgba(34,255,187,0.2)",
              background: syncing ? "rgba(34,255,187,0.04)" : "rgba(34,255,187,0.08)",
              color: "#22ffbb", fontSize: 14, fontWeight: 700, cursor: syncing ? "default" : "pointer",
              transition: "all 0.2s",
            }}
          >
            {syncing ? "Syncing matches..." : "⚡ Sync Matches Now"}
          </button>

          {syncMessage && (
            <div style={{
              marginTop: 10, padding: "9px 12px", borderRadius: 8, fontSize: 13,
              background: syncMessage.type === "success" ? "rgba(34,255,187,0.06)" : syncMessage.type === "error" ? "rgba(255,68,102,0.06)" : "rgba(0,170,255,0.06)",
              border: `1px solid ${syncMessage.type === "success" ? "rgba(34,255,187,0.12)" : syncMessage.type === "error" ? "rgba(255,68,102,0.12)" : "rgba(0,170,255,0.12)"}`,
              color: syncMessage.type === "success" ? "#22ffbb" : syncMessage.type === "error" ? "#ff4466" : "#0af",
            }}>
              {syncMessage.text}
            </div>
          )}
        </div>

        {/* Navigation */}
        <a href="/dashboard" style={{
          display: "block", width: "100%", padding: "13px 0", borderRadius: 10,
          background: "#22ffbb", color: "#030305",
          fontSize: 14, fontWeight: 700, textAlign: "center", textDecoration: "none",
        }}>
          Go to Dashboard
        </a>
      </div>
    </div>
  );
}