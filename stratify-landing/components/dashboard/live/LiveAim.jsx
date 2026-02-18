"use client";
import { Icons } from "@/components/ui/Icons";
import { SectionHeader, ComparisonStat } from "../DashUI";
import { LoadingSpinner, ErrorState } from "../LoadingStates";
import { api } from "@/lib/api";
import { useAPI } from "@/hooks/useAPI";

export default function LiveAim() {
  const { data, loading, error, refresh } = useAPI(() => api.stats.aim());
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorState message={error} onRetry={refresh} />;
  if (!data) return null;

  return (
    <div style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 20 }}>
      <SectionHeader icon={<Icons.Crosshair s={18} c="#00ffa3" />} title="Micro Aim Analytics" subtitle="Precision and mechanical skill breakdown" />
      <ComparisonStat label="Headshot %" value={data.headshotPct} avg={48.0} unit="%" />
      <ComparisonStat label="First Bullet Accuracy" value={data.firstBulletAccuracy} avg={45.0} unit="%" />
      <ComparisonStat label="Crosshair Placement" value={data.crosshairPlacement} avg={65.0} unit="%" />
      <ComparisonStat label="Avg Time to Kill" value={data.avgTimeToKill} avg={312} unit="ms" lower format={v => v.toFixed(0)} />
    </div>
  );
}
