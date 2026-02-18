// ============================================================
// All static data for the landing page.
// Icon keys reference Icons component -- resolved in each section.
// ============================================================

export const STATS = [
  { num: 47, suffix: "+", label: "Statistical Metrics" },
  { num: 12, suffix: "K+", label: "Active Players" },
  { num: 98.7, suffix: "%", label: "Uptime SLA" },
  { num: 0.3, suffix: "s", label: "Avg Parse Time" },
];

export const FEATURES = [
  { iconKey: "Crosshair", iconColor: "#00ffa3", title: "Micro Aim Analytics", desc: "Time-to-Damage, crosshair placement efficiency, spray transfer rates, and pre-aim scoring that dissect your mechanical skill frame by frame.", color: "#00ffa3" },
  { iconKey: "Brain", iconColor: "#00d4ff", title: "Decision Intelligence", desc: "Overpeek detection, trade efficiency tracking, duel favorability scores, and disadvantage death analysis reveal your game sense blind spots.", color: "#00d4ff" },
  { iconKey: "Layers", iconColor: "#a855f7", title: "Contextual Breakdown", desc: "Performance split by pistol, eco, force buy, and full buy rounds. See exactly where your economy game falls apart or dominates.", color: "#a855f7" },
  { iconKey: "Bomb", iconColor: "#ffaa00", title: "Utility Intelligence", desc: "Flash success rates, smoke plant-delay impact, grenade damage scoring, and utility waste tracking with per-round efficiency grades.", color: "#ffaa00" },
  { iconKey: "Activity", iconColor: "#ff4466", title: "Win Probability Impact", desc: "Every kill, death, and utility usage tagged with its win probability shift. See which of your actions actually win or lose rounds.", color: "#ff4466" },
  { iconKey: "Sparkles", iconColor: "#00ffa3", title: "AI Coach Engine", desc: "Personalized training recommendations that analyze your weakest metrics and generate specific drills -- not generic advice.", color: "#00ffa3" },
  { iconKey: "Flame", iconColor: "#ff6b35", title: "Risk Profile Classification", desc: "Automatically classified as Hyper Aggressive, Passive Lurker, Support Anchor, or Clutch Specialist based on behavioral patterns.", color: "#ff6b35" },
  { iconKey: "TrendUp", iconColor: "#00d4ff", title: "Growth Trend Engine", desc: "30-match moving averages, performance volatility, improvement slope calculations, and skill stability scoring track your trajectory.", color: "#00d4ff" },
];

export const STEPS = [
  { num: "01", title: "Connect Steam", desc: "One-click Steam OAuth login. We never access your credentials, only your public match data.", iconKey: "Steam", iconColor: "#00ffa3" },
  { num: "02", title: "Auto-Parse Demos", desc: "Our engine ingests your matches automatically. Manual demo upload also supported for scrims.", iconKey: "Zap", iconColor: "#00d4ff" },
  { num: "03", title: "Get AI Insights", desc: "47+ metrics calculated, contextualized, and turned into personalized recommendations instantly.", iconKey: "Sparkles", iconColor: "#a855f7" },
];

export const TESTIMONIALS = [
  { name: "ropz", tag: "FaZe Clan", text: "The contextual breakdown completely changed how I approach eco rounds. My force buy win rate jumped 8% in two weeks.", stars: 5 },
  { name: "stavn", tag: "Heroic", text: "The AI coach flagged my overpeek habit before my IGL did. The drills it suggested were specific and actually helped.", stars: 5 },
  { name: "jL", tag: "Natus Vincere", text: "Win probability impact model is insane. Seeing exactly which plays win or lose you rounds is next level for review.", stars: 5 },
];

export const PRICING = [
  {
    name: "Free", price: "0", period: "",
    features: ["Basic match stats", "5 matches / month", "K/D and ADR tracking", "Match history"],
    cta: "Get Started", accent: "rgba(255,255,255,0.2)", featured: false,
  },
  {
    name: "Pro", price: "9.99", period: "/mo",
    features: ["All 47+ advanced metrics", "Unlimited matches", "AI Coach recommendations", "Win probability model", "Growth trend analytics", "Risk profile classification", "Priority demo parsing"],
    cta: "Start Free Trial", accent: "#00ffa3", featured: true,
  },
  {
    name: "Team", price: "29.99", period: "/mo",
    features: ["Everything in Pro", "Up to 7 players", "Team-wide analytics", "Shared dashboards", "Strat effectiveness scoring", "Custom data exports", "Dedicated support"],
    cta: "Contact Sales", accent: "#00d4ff", featured: false,
  },
];

export const FAQ_ITEMS = [
  { q: "How does StatTrak get my match data?", a: "We use the Steam Game Coordinator API and Valve's official CS2 demo system. After connecting your Steam account, we automatically pull your recent competitive and Premier matches. You can also manually upload demo files from scrims or third-party platforms." },
  { q: "What makes this different from Leetify or HLTV?", a: "StatTrak focuses on contextual and predictive analytics. Instead of showing you a flat K/D, we break it down by round economy, team state, and role. Our AI coach generates specific, actionable drills -- not generic advice. The win probability model tags every action with its actual impact." },
  { q: "Is my Steam account safe?", a: "Absolutely. We use Steam's official OAuth protocol. We never see or store your password. We only access publicly available match data and your Steam profile information. You can revoke access at any time from your Steam settings." },
  { q: "How accurate are the AI recommendations?", a: "Our recommendation engine cross-references your metrics against rank-specific baselines from over 2 million parsed matches. Recommendations are generated only when your metrics deviate significantly from your rank's average, ensuring relevance and specificity." },
  { q: "Can I use StatTrak for team practice?", a: "Yes. The Team plan supports up to 7 players with shared dashboards, team-wide analytics, and strat effectiveness scoring. Upload scrim demos and get coordinated feedback for your entire roster." },
];

export const RADAR_DATA = [
  { s: "AIM", v: 82, f: 100 }, { s: "UTIL", v: 68, f: 100 }, { s: "POS", v: 74, f: 100 },
  { s: "CLUTCH", v: 88, f: 100 }, { s: "ENTRY", v: 64, f: 100 }, { s: "ECON", v: 71, f: 100 },
];

export const TREND_DATA = Array.from({ length: 20 }, (_, i) => ({
  x: i,
  y: +(0.92 + Math.sin(i * 0.4) * 0.12 + i * 0.012).toFixed(3),
}));
