"use client";
// LiveContextual
import { useState } from "react";
import { ComposedChart, Bar, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Icons } from "@/components/ui/Icons";
import { SectionHeader, ComparisonStat, TabBar, CustomTooltip } from "../DashUI";
import { LoadingSpinner, ErrorState } from "../LoadingStates";
import { api } from "@/lib/api";
import { useAPI } from "@/hooks/useAPI";

export default function LiveContextual() {
  const { data, loading, error, refresh } = useAPI(() => api.stats.contextual());
  const [tab, setTab] = useState("rounds");

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorState message={error} onRetry={refresh} />;
  if (!data) return null;

  const roundData = [
    { name: "Pistol", winRate: data.pistol?.winRate || 0, avgKills: data.pistol?.avgKills || 0 },
    { name: "Eco", winRate: data.eco?.winRate || 0, avgKills: data.eco?.avgKills || 0 },
    { name: "Force", winRate: data.forceBuy?.winRate || 0, avgKills: data.forceBuy?.avgKills || 0 },
    { name: "Full Buy", winRate: data.fullBuy?.winRate || 0, avgKills: data.fullBuy?.avgKills || 0 },
  ];

  return (
    <div style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 20 }}>
      <SectionHeader icon={<Icons.Layers s={18} c="#00ffa3" />} title="Contextual Performance" subtitle="Stats by round economy" />
      <TabBar tabs={[{ key: "rounds", label: "Round Types" }, { key: "entry", label: "Entry Stats" }, { key: "clutch", label: "Clutch" }]} active={tab} onChange={setTab} />
      {tab === "rounds" && (
        <div style={{ height: 280 }}>
          <ResponsiveContainer>
            <ComposedChart data={roundData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }} axisLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="winRate" fill="#00d4ff" radius={[4, 4, 0, 0]} opacity={0.7} name="Win %" />
              <Line dataKey="avgKills" stroke="#00ffa3" strokeWidth={2} dot={{ fill: "#00ffa3", r: 4 }} name="Avg Kills" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      )}
      {tab === "entry" && (
        <div style={{ padding: 16 }}>
          <ComparisonStat label="Entry Success Rate" value={data.entry?.successRate || 0} avg={38.0} unit="%" />
          <ComparisonStat label="Entry Attempts" value={data.entry?.attempts || 0} avg={50} />
          <ComparisonStat label="Entry Wins" value={data.entry?.wins || 0} avg={20} />
        </div>
      )}
      {tab === "clutch" && (
        <div style={{ padding: 16 }}>
          <ComparisonStat label="Clutch Win Rate" value={data.clutch?.rate || 0} avg={15.0} unit="%" />
          <ComparisonStat label="Clutch Attempts" value={data.clutch?.attempts || 0} avg={30} />
          <ComparisonStat label="Clutch Wins" value={data.clutch?.wins || 0} avg={5} />
        </div>
      )}
    </div>
  );
}
