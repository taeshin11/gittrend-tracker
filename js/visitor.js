/* GitTrend Tracker - Visitor Counter */

const VISITOR_KEY = "gtt_visitor";
const TODAY_KEY = "gtt_visitors_today";
const TOTAL_KEY = "gtt_visitors_total";
const DATE_KEY = "gtt_visit_date";

function initVisitorCounter() {
  const today = new Date().toISOString().split("T")[0];
  const storedDate = localStorage.getItem(DATE_KEY);
  let todayCount = parseInt(localStorage.getItem(TODAY_KEY) || "0");
  let totalCount = parseInt(localStorage.getItem(TOTAL_KEY) || "0");

  if (storedDate !== today) {
    todayCount = 0;
    localStorage.setItem(DATE_KEY, today);
  }

  // Check if this session already counted
  const sessionCounted = sessionStorage.getItem("gtt_counted");
  if (!sessionCounted) {
    todayCount++;
    totalCount++;
    localStorage.setItem(TODAY_KEY, todayCount.toString());
    localStorage.setItem(TOTAL_KEY, totalCount.toString());
    sessionStorage.setItem("gtt_counted", "1");
  }

  updateDisplay(todayCount, totalCount);
}

function updateDisplay(todayCount, totalCount) {
  const todayEl = document.getElementById("visitors-today");
  const totalEl = document.getElementById("visitors-total");
  if (todayEl) todayEl.textContent = todayCount.toLocaleString();
  if (totalEl) totalEl.textContent = totalCount.toLocaleString();
}

window.VisitorCounter = { initVisitorCounter };
