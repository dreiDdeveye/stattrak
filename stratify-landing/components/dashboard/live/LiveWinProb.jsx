"use client";
import { useState } from "react";
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { Icons } from "@/components/ui/Icons";
import { SectionHeader } from "../DashUI";
import { LoadingSpinner, ErrorState, EmptyState } from "../LoadingStates";
import { api } from "@/lib/api";
import { useAPI } from "@/hooks/useAPI";

export default function LiveWinProb() {
  const { data: matches } = useAPI(() => api.matches.list(1, 10));
  const [selectedMatch, setSelectedMatch] = useState(null);
  const { data: wpData, loading, error } = useAPI(
    () => selectedMatch ? api.stats.winProb(selectedMatch) : Promise.resolve(null),
    [selectedMatch],
  );

  return (
    <div style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 20 }}>
      <SectionHeader icon={<Icons.Activity s={18} c="#00ffa3" />} title="Win Probability Impact" subtitle="Select a match to view round-by-round impact" />
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
        {matches?.matches?.map((m, i) => (
          <button key={i} onClick={() => setSelectedMatch(m.matchId)} style={{
            padding: "6px 14px", borderRadius: 6, border: "1px solid",
            borderColor: selectedMatch === m.matchId ? "rgba(0,255,163,0.3)" : "rgba(255,255,255,0.06)",
            background: selectedMatch === m.matchId ? "rgba(0,255,163,0.08)" : "transparent",
            color: selectedMatch === m.matchId ? "#00ffa3" : "rgba(255,255,255,0.4)",
            fontSize: 12, cursor: "pointer", fontFamily: "'Outfit', sans-serif",
          }}>
            {m.map} ({m.result})
          </button>
        ))}
      </div>
      {!selectedMatch && <EmptyState title="Select a match above" subtitle="View how your actions shifted win probability" />}
      {selectedMatch && loading && <LoadingSpinner />}
      {selectedMatch && error && <ErrorState message={error} />}
      {selectedMatch && wpData?.rounds?.length > 0 && (
        <div style={{ height: 300 }}>
          <ResponsiveContainer>
            <AreaChart data={wpData.rounds} margin={{ top: 10, right: 10, bottom: 10, left: 0 }}>
              <defs><linearGradient id="wpg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#00ffa3" stopOpacity={0.3} /><stop offset="100%" stopColor="#00ffa3" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="roundNum" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <ReferenceLine y={50} stroke="rgba(255,255,255,0.1)" strokeDasharray="3 3" />
              <Tooltip content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const d = payload[0].payload;
                return (<div style={{ background: "rgba(12,14,20,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px 14px", fontSize: 12 }}>
                  <div style={{ fontWeight: 700, color: "#fff" }}>Round {d.roundNum}</div>
                  <div style={{ color: "#00ffa3" }}>Win Prob: {d.wpEnd?.toFixed(1)}%</div>
                  <div style={{ color: "rgba(255,255,255,0.4)" }}>{d.roundType} — won by {d.winner}</div>
                </div>);
              }} />
              <Area dataKey="wpEnd" stroke="#00ffa3" strokeWidth={2} fill="url(#wpg)" dot={{ fill: "#0a0c12", stroke: "#00ffa3", strokeWidth: 2, r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
