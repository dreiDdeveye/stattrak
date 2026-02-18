async function fetchAPI(endpoint, options = {}) {
  const res = await fetch(`/api${endpoint}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });

  if (res.status === 401) {
    if (typeof window !== "undefined") {
      window.location.href = "/api/auth/steam";
    }
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message || `HTTP ${res.status}`);
  }

  return res.json();
}

export const api = {
  auth: {
    me: () => fetchAPI("/auth/me"),
    loginUrl: "/api/auth/steam",
    logoutUrl: "/api/auth/logout",
  },
  user: {
    profile: () => fetchAPI("/user/profile"),
    setAuthCode: (authCode) =>
      fetchAPI("/user/authcode", { method: "PUT", body: JSON.stringify({ authCode }) }),
  },
  matches: {
    list: (page = 1, limit = 20) => fetchAPI(`/matches?page=${page}&limit=${limit}`),
    detail: (matchId) => fetchAPI(`/matches/${matchId}`),
    sync: () => fetchAPI("/matches/sync", { method: "POST" }),
  },
  stats: {
    overview: () => fetchAPI("/stats/overview"),
    contextual: () => fetchAPI("/stats/contextual"),
    aim: () => fetchAPI("/stats/aim"),
    decisions: () => fetchAPI("/stats/decisions"),
    utility: () => fetchAPI("/stats/utility"),
    growth: () => fetchAPI("/stats/growth"),
    profile: () => fetchAPI("/stats/profile"),
    aiRecommendations: () => fetchAPI("/stats/ai-recommendations"),
  },
};
