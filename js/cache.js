/* GitTrend Tracker - localStorage Cache */

const CACHE_PREFIX = "gtt_cache_";

const CACHE_TTL = {
  daily: 30 * 60 * 1000,    // 30 minutes
  weekly: 60 * 60 * 1000,   // 1 hour
  monthly: 2 * 60 * 60 * 1000 // 2 hours
};

function getCached(key) {
  try {
    const item = localStorage.getItem(CACHE_PREFIX + key);
    if (!item) return null;
    const { data, expiry } = JSON.parse(item);
    if (Date.now() > expiry) {
      localStorage.removeItem(CACHE_PREFIX + key);
      return null;
    }
    return data;
  } catch (e) {
    return null;
  }
}

function setCache(key, data, ttlMs) {
  try {
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify({
      data,
      expiry: Date.now() + ttlMs
    }));
  } catch (e) {
    // localStorage full - clear old entries
    clearOldCache();
    try {
      localStorage.setItem(CACHE_PREFIX + key, JSON.stringify({
        data,
        expiry: Date.now() + ttlMs
      }));
    } catch (e2) {
      // Silently fail
    }
  }
}

function clearOldCache() {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(CACHE_PREFIX)) {
      keys.push(key);
    }
  }
  keys.forEach(key => {
    try {
      const item = JSON.parse(localStorage.getItem(key));
      if (!item || Date.now() > item.expiry) {
        localStorage.removeItem(key);
      }
    } catch (e) {
      localStorage.removeItem(key);
    }
  });
}

function getCacheKey(language, timeRange, page) {
  return `${language}_${timeRange}_p${page}`;
}

window.AppCache = { getCached, setCache, CACHE_TTL, getCacheKey, clearOldCache };
