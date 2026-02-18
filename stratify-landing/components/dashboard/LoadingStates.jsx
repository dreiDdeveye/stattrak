"use client";

export function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 60, gap: 16 }}>
      <div style={{
        width: 36, height: 36, border: "3px solid rgba(255,255,255,0.08)",
        borderTopColor: "#00ffa3", borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }} />
      <span style={{ fontSize: 13, color: "rgba(255,255,255,0.35)" }}>{message}</span>
      <style jsx>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export function ErrorState({ message = "Failed to load data", onRetry }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 60, gap: 16 }}>
      <div style={{ fontSize: 32, color: "#ff4466" }}>⚠</div>
      <span style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>{message}</span>
      {onRetry && (
        <button onClick={onRetry} style={{
          padding: "8px 20px", borderRadius: 8, border: "1px solid rgba(0,255,163,0.3)",
          background: "rgba(0,255,163,0.08)", color: "#00ffa3", fontSize: 13,
          fontWeight: 600, cursor: "pointer", fontFamily: "'Outfit', sans-serif",
        }}>
          Retry
        </button>
      )}
    </div>
  );
}

export function EmptyState({ title = "No data yet", subtitle, actionLabel, onAction }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 60, gap: 12 }}>
      <div style={{ fontSize: 40, opacity: 0.3 }}>📊</div>
      <span style={{ fontSize: 16, fontWeight: 600, color: "rgba(255,255,255,0.5)" }}>{title}</span>
      {subtitle && <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>{subtitle}</span>}
      {actionLabel && onAction && (
        <button onClick={onAction} style={{
          marginTop: 8, padding: "10px 24px", borderRadius: 8,
          background: "linear-gradient(135deg, #00ffa3, #00d4ff)", color: "#06080e",
          fontSize: 13, fontWeight: 700, border: "none", cursor: "pointer",
          fontFamily: "'Outfit', sans-serif",
        }}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
