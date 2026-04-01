/* GitTrend Tracker - GitHub API */

const API_BASE = "https://api.github.com/search/repositories";

let rateLimitRemaining = 10;
let rateLimitReset = 0;

function getDateRange(timeRange) {
  const now = new Date();
  let d;
  if (timeRange === "daily") {
    d = new Date(now);
    d.setDate(d.getDate() - 1);
  } else if (timeRange === "weekly") {
    d = new Date(now);
    d.setDate(d.getDate() - 7);
  } else {
    d = new Date(now);
    d.setMonth(d.getMonth() - 1);
  }
  return d.toISOString().split("T")[0];
}

async function fetchTrendingRepos(language = "all", timeRange = "daily", page = 1, perPage = 30) {
  const cacheKey = AppCache.getCacheKey(language, timeRange, page);
  const cached = AppCache.getCached(cacheKey);
  if (cached) {
    return { items: cached, fromCache: true };
  }

  // Check rate limit
  if (rateLimitRemaining <= 1 && Date.now() / 1000 < rateLimitReset) {
    throw new Error("RATE_LIMITED");
  }

  const dateStr = getDateRange(timeRange);
  let q = `pushed:>${dateStr}`;
  if (language && language !== "all") {
    q += `+language:${language}`;
  }
  // Require minimum stars to get quality results
  q += "+stars:>5";

  const url = `${API_BASE}?q=${encodeURIComponent(q)}&sort=stars&order=desc&per_page=${perPage}&page=${page}`;

  try {
    const response = await fetch(url);

    // Track rate limits
    rateLimitRemaining = parseInt(response.headers.get("X-RateLimit-Remaining") || "10");
    rateLimitReset = parseInt(response.headers.get("X-RateLimit-Reset") || "0");

    if (response.status === 403 || response.status === 429) {
      throw new Error("RATE_LIMITED");
    }

    if (!response.ok) {
      throw new Error(`API_ERROR_${response.status}`);
    }

    const data = await response.json();
    const items = data.items || [];

    // Cache the results
    const ttl = AppCache.CACHE_TTL[timeRange] || AppCache.CACHE_TTL.daily;
    // Extend TTL if rate limit is low
    const finalTtl = rateLimitRemaining < 5 ? ttl * 2 : ttl;
    AppCache.setCache(cacheKey, items, finalTtl);

    return { items, fromCache: false, totalCount: data.total_count };
  } catch (err) {
    if (err.message === "RATE_LIMITED") {
      // Try to return stale cache
      const staleKey = cacheKey;
      const stale = AppCache.getCached(staleKey);
      if (stale) return { items: stale, fromCache: true, stale: true };
    }
    throw err;
  }
}

function getRateLimitInfo() {
  return { remaining: rateLimitRemaining, reset: rateLimitReset };
}

window.GitHubAPI = { fetchTrendingRepos, getRateLimitInfo };
