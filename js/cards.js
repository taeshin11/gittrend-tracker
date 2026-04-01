/* GitTrend Tracker - Repo Card Rendering */

const LANGUAGE_COLORS = {
  "Python": "#3572A5",
  "JavaScript": "#F7DF1E",
  "TypeScript": "#3178C6",
  "Rust": "#DEA584",
  "Go": "#00ADD8",
  "Java": "#B07219",
  "C++": "#F34B7D",
  "C": "#555555",
  "Ruby": "#CC342D",
  "PHP": "#4F5D95",
  "Swift": "#F05138",
  "Kotlin": "#A97BFF",
  "Dart": "#00B4AB",
  "Scala": "#C22D40",
  "Shell": "#89E051",
  "Lua": "#000080",
  "R": "#198CE7",
  "Haskell": "#5e5086",
  "Elixir": "#6E4A7E",
  "Zig": "#EC915C",
  "Vue": "#41B883",
  "Svelte": "#FF3E00",
  "Jupyter Notebook": "#DA5B0B"
};

function formatNumber(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "k";
  return num.toString();
}

function timeAgo(dateStr) {
  const now = new Date();
  const d = new Date(dateStr);
  const diffMs = now - d;
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMs / 3600000);
  const diffDay = Math.floor(diffMs / 86400000);
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDay < 30) return `${diffDay}d ago`;
  return d.toLocaleDateString();
}

function createRepoCard(repo) {
  const card = document.createElement("article");
  card.className = "repo-card";
  card.setAttribute("role", "listitem");

  const langColor = LANGUAGE_COLORS[repo.language] || "#94A3B8";

  const topicsHtml = (repo.topics || []).slice(0, 4).map(t =>
    `<span class="topic-badge">${escapeHtml(t)}</span>`
  ).join("");

  card.innerHTML = `
    <div class="flex items-start justify-between gap-2">
      <div class="flex items-center gap-2 min-w-0">
        <img src="${repo.owner.avatar_url}&s=48" alt="${escapeHtml(repo.owner.login)}" class="owner-avatar" width="24" height="24" loading="lazy">
        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="repo-name truncate" title="${escapeHtml(repo.full_name)}">${escapeHtml(repo.full_name)}</a>
      </div>
      <span class="star-count flex items-center gap-1 whitespace-nowrap" title="${repo.stargazers_count.toLocaleString()} stars">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"/></svg>
        ${formatNumber(repo.stargazers_count)}
      </span>
    </div>
    <p class="repo-desc">${repo.description ? escapeHtml(repo.description) : '<em class="text-gray-400">No description</em>'}</p>
    ${topicsHtml ? `<div class="flex flex-wrap gap-1">${topicsHtml}</div>` : ''}
    <div class="repo-stats mt-auto">
      ${repo.language ? `<span class="lang-badge"><span class="lang-dot" style="background:${langColor}"></span>${escapeHtml(repo.language)}</span>` : ''}
      <span class="flex items-center gap-1" title="${repo.stargazers_count.toLocaleString()} stars">
        <svg width="12" height="12" viewBox="0 0 16 16" fill="#F59E0B"><path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"/></svg>
        ${repo.stargazers_count.toLocaleString()}
      </span>
      <span class="fork-count flex items-center gap-1" title="${repo.forks_count.toLocaleString()} forks">
        <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-.878a2.25 2.25 0 111.5 0v.878a2.25 2.25 0 01-2.25 2.25h-1.5v2.128a2.251 2.251 0 11-1.5 0V8.5h-1.5A2.25 2.25 0 013.5 6.25v-.878a2.25 2.25 0 111.5 0zM5 3.25a.75.75 0 10-1.5 0 .75.75 0 001.5 0zm6.75.75a.75.75 0 10 0-1.5.75.75 0 000 1.5zM8 12.75a.75.75 0 10 0-1.5.75.75 0 000 1.5z"/></svg>
        ${formatNumber(repo.forks_count)}
      </span>
      <span class="text-xs text-gray-400 ml-auto" title="Last pushed ${new Date(repo.pushed_at).toLocaleString()}">${timeAgo(repo.pushed_at)}</span>
      <div class="sparkline-container" id="spark-${repo.id}"></div>
    </div>
  `;

  return card;
}

function createSkeletonCards(count = 6) {
  const frag = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    const div = document.createElement("div");
    div.className = "skeleton skeleton-card";
    frag.appendChild(div);
  }
  return frag;
}

function escapeHtml(str) {
  const d = document.createElement("div");
  d.textContent = str;
  return d.innerHTML;
}

window.RepoCards = { createRepoCard, createSkeletonCards, formatNumber, LANGUAGE_COLORS };
