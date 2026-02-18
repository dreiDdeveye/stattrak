"use client";
import { Icons } from "@/components/ui/Icons";
import { SectionHeader, ComparisonStat } from "../DashUI";
import { LoadingSpinner, ErrorState } from "../LoadingStates";
import { api } from "@/lib/api";
import { useAPI } from "@/hooks/useAPI";

export default function LiveDecisions() {
  const { data, loading, error, refresh } = useAPI(() => api.stats.decisions());
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorState message={error} onRetry={refresh} />;
  if (!data) return null;

  return (
    <div style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 20 }}>
      <SectionHeader icon={<Icons.Brain s={18} c="#00ffa3" />} title="Decision Intelligence" subtitle="Game sense and positioning metrics" />
      <ComparisonStat label="Overpeek Rate" value={data.overpeekRate} avg={19.2} unit="%" lower />
      <ComparisonStat label="First Death %" value={data.firstDeathPct} avg={20.0} unit="%" lower />
      <ComparisonStat label="Trade Efficiency" value={data.tradeEfficiency} avg={65.0} unit="%" />
      <ComparisonStat label="Duel Favorability" value={data.duelFavorability} avg={1.0} format={v => v.toFixed(2)} />
    </div>
  );
}
