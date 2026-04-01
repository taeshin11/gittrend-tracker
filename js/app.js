/* GitTrend Tracker - Main Application */

let currentPage = 1;
let isLoading = false;
let allRepos = [];

async function init() {
  // Initialize modules
  window.Filters.initFilters(onFilterChange);
  window.VisitorCounter.initVisitorCounter();
  window.Ads.initAds();
  window.SheetsWebhook.logPageVisit();

  // Initialize i18n
  await window.I18n.initI18n();

  // Load initial data
  loadRepos(true);
}

async function onFilterChange(language, timeRange) {
  currentPage = 1;
  allRepos = [];
  loadRepos(true);
}

async function loadRepos(fresh = false) {
  if (isLoading) return;
  isLoading = true;

  const grid = document.getElementById("repo-grid");
  const loadMoreBtn = document.getElementById("load-more");
  const errorDiv = document.getElementById("error-message");
  const rateWarning = document.getElementById("rate-warning");
  const lastUpdated = document.getElementById("last-updated");

  if (!grid) return;

  // Show skeletons on fresh load
  if (fresh) {
    grid.innerHTML = "";
    grid.appendChild(window.RepoCards.createSkeletonCards(6));
  }

  if (loadMoreBtn) loadMoreBtn.disabled = true;
  if (errorDiv) errorDiv.style.display = "none";
  if (rateWarning) rateWarning.style.display = "none";

  const { language, timeRange } = window.Filters.getCurrentFilters();

  try {
    const result = await window.GitHubAPI.fetchTrendingRepos(language, timeRange, currentPage);
    const repos = result.items;

    if (fresh) {
      grid.innerHTML = "";
      allRepos = [];
    }

    if (repos.length === 0 && allRepos.length === 0) {
      grid.innerHTML = `<div class="col-span-full text-center py-12 text-gray-400">
        <svg class="mx-auto mb-4" width="48" height="48" viewBox="0 0 16 16" fill="currentColor"><path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9z"/></svg>
        <p data-i18n="noResults">No trending repositories found for this filter.</p>
      </div>`;
    } else {
      repos.forEach((repo, idx) => {
        allRepos.push(repo);
        const card = window.RepoCards.createRepoCard(repo);
        grid.appendChild(card);

        // Render sparkline
        const sparkData = window.Sparkline.generateSparkData(repo);
        setTimeout(() => window.Sparkline.renderSparkline(`spark-${repo.id}`, sparkData), 50);

        // Insert ad between cards
        window.Ads.insertAdBetweenCards(grid, allRepos.length - 1);
      });
    }

    // Update last updated
    if (lastUpdated) {
      const now = new Date();
      lastUpdated.textContent = `Last updated: ${now.toLocaleTimeString()}`;
      if (result.fromCache) {
        lastUpdated.textContent += " (cached)";
      }
    }

    // Show rate limit warning
    const rateInfo = window.GitHubAPI.getRateLimitInfo();
    if (rateInfo.remaining < 5 && rateWarning) {
      rateWarning.style.display = "block";
      rateWarning.textContent = `API rate limit low (${rateInfo.remaining} remaining). Showing cached results.`;
    }

    // Show/hide load more
    if (loadMoreBtn) {
      loadMoreBtn.style.display = repos.length >= 30 ? "inline-block" : "none";
      loadMoreBtn.disabled = false;
    }

    currentPage++;
  } catch (err) {
    if (fresh) grid.innerHTML = "";
    if (err.message === "RATE_LIMITED") {
      if (rateWarning) {
        rateWarning.style.display = "block";
        rateWarning.textContent = "GitHub API rate limit reached. Please wait a moment and try again.";
      }
    } else if (errorDiv) {
      errorDiv.style.display = "block";
      errorDiv.textContent = "Failed to load repositories. Please try again later.";
    }
    if (loadMoreBtn) loadMoreBtn.disabled = false;
  } finally {
    isLoading = false;
  }
}

// Load more handler
document.addEventListener("DOMContentLoaded", () => {
  const loadMoreBtn = document.getElementById("load-more");
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => loadRepos(false));
  }

  init();
});
