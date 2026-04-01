/* GitTrend Tracker - Filters */

const LANGUAGES = [
  { key: "all", label: "All" },
  { key: "python", label: "Python" },
  { key: "javascript", label: "JavaScript" },
  { key: "typescript", label: "TypeScript" },
  { key: "rust", label: "Rust" },
  { key: "go", label: "Go" },
  { key: "java", label: "Java" },
  { key: "c++", label: "C++" },
  { key: "ruby", label: "Ruby" },
  { key: "php", label: "PHP" },
  { key: "swift", label: "Swift" },
  { key: "kotlin", label: "Kotlin" }
];

const TIME_RANGES = [
  { key: "daily", label: "Daily" },
  { key: "weekly", label: "Weekly" },
  { key: "monthly", label: "Monthly" }
];

let currentLanguage = "all";
let currentTimeRange = "daily";

function initFilters(onFilterChange) {
  renderLanguageTabs(onFilterChange);
  renderTimeRangeTabs(onFilterChange);
}

function renderLanguageTabs(onFilterChange) {
  const container = document.getElementById("language-filters");
  if (!container) return;
  container.innerHTML = "";
  LANGUAGES.forEach(lang => {
    const btn = document.createElement("button");
    btn.className = `filter-tab ${lang.key === currentLanguage ? "active" : ""}`;
    btn.textContent = lang.label;
    btn.setAttribute("data-lang", lang.key);
    btn.setAttribute("aria-pressed", lang.key === currentLanguage);
    btn.addEventListener("click", () => {
      currentLanguage = lang.key;
      updateActiveTab(container, btn);
      onFilterChange(currentLanguage, currentTimeRange);
      logEvent("filter_change", { language_filter: lang.key });
    });
    container.appendChild(btn);
  });
}

function renderTimeRangeTabs(onFilterChange) {
  const container = document.getElementById("time-range-filters");
  if (!container) return;
  container.innerHTML = "";
  TIME_RANGES.forEach(tr => {
    const btn = document.createElement("button");
    btn.className = `time-tab ${tr.key === currentTimeRange ? "active" : ""}`;
    btn.textContent = tr.label;
    btn.setAttribute("data-range", tr.key);
    btn.addEventListener("click", () => {
      currentTimeRange = tr.key;
      updateActiveTab(container, btn);
      onFilterChange(currentLanguage, currentTimeRange);
      logEvent("time_range_change", { time_range: tr.key });
    });
    container.appendChild(btn);
  });
}

function updateActiveTab(container, activeBtn) {
  container.querySelectorAll("button").forEach(b => {
    b.classList.remove("active");
    b.setAttribute("aria-pressed", "false");
  });
  activeBtn.classList.add("active");
  activeBtn.setAttribute("aria-pressed", "true");
}

function getCurrentFilters() {
  return { language: currentLanguage, timeRange: currentTimeRange };
}

function logEvent(event, data) {
  if (window.SheetsWebhook) {
    window.SheetsWebhook.log(event, data);
  }
}

// Update filter labels for i18n
function updateFilterLabels(translations) {
  if (!translations) return;
  const langContainer = document.getElementById("language-filters");
  const timeContainer = document.getElementById("time-range-filters");
  if (langContainer) {
    langContainer.querySelectorAll("button").forEach(btn => {
      const key = btn.getAttribute("data-lang");
      if (translations.languages && translations.languages[key]) {
        btn.textContent = translations.languages[key];
      }
    });
  }
  if (timeContainer) {
    timeContainer.querySelectorAll("button").forEach(btn => {
      const key = btn.getAttribute("data-range");
      if (translations.timeRanges && translations.timeRanges[key]) {
        btn.textContent = translations.timeRanges[key];
      }
    });
  }
}

window.Filters = { initFilters, getCurrentFilters, updateFilterLabels, LANGUAGES, TIME_RANGES };
