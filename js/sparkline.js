/* GitTrend Tracker - Sparkline Rendering */

function renderSparkline(containerId, data) {
  const container = document.getElementById(containerId);
  if (!container || !data || data.length < 2) return;

  const width = 60;
  const height = 24;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * (height - 4) - 2;
    return `${x},${y}`;
  }).join(" ");

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.setAttribute("preserveAspectRatio", "none");
  svg.setAttribute("aria-hidden", "true");

  const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
  polyline.setAttribute("points", points);
  polyline.setAttribute("fill", "none");
  polyline.setAttribute("stroke", "#2563EB");
  polyline.setAttribute("stroke-width", "1.5");
  polyline.setAttribute("stroke-linecap", "round");
  polyline.setAttribute("stroke-linejoin", "round");

  svg.appendChild(polyline);
  container.innerHTML = "";
  container.appendChild(svg);
}

// Generate pseudo-sparkline data from repo info (star count + created date)
function generateSparkData(repo) {
  const stars = repo.stargazers_count;
  const createdDaysAgo = Math.max(1, Math.floor((Date.now() - new Date(repo.created_at).getTime()) / 86400000));
  const points = 7;
  const data = [];
  for (let i = 0; i < points; i++) {
    const progress = i / (points - 1);
    // Simulate growth curve
    const base = stars * Math.pow(progress, 0.6);
    const noise = (Math.random() - 0.5) * stars * 0.05;
    data.push(Math.max(0, Math.round(base + noise)));
  }
  data[data.length - 1] = stars;
  return data;
}

window.Sparkline = { renderSparkline, generateSparkData };
