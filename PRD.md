# PRD: GitTrend Tracker

## Daily Trending GitHub Repositories

---

## 1. Project Overview

### Service Name
GitTrend Tracker

### Short Title
Daily Trending GitHub Repositories

### Description
GitTrend Tracker is a free dashboard that displays daily trending GitHub repositories sorted by stars, filterable by programming language. Developers can quickly discover popular open-source projects across multiple languages with repo cards showing key metrics like stars, forks, descriptions, and star history sparklines. The dashboard supports daily, weekly, and monthly trending toggles.

### Target Audience
- Software developers looking for popular libraries and tools
- Open-source contributors seeking projects to contribute to
- Tech enthusiasts tracking developer trends
- Students discovering learning resources
- CTOs and tech leads evaluating emerging technologies

### Target Keywords (SEO)
- "github trending"
- "trending repositories"
- "popular github projects"
- "github trending today"
- "trending open source projects"
- "github stars ranking"
- "best github repos"

---

## 2. Harness Design Methodology

### Agent Workflow

```
Planner Agent
  -> Defines milestones, feature_list.json, file structure
  -> Outputs PRD.md (this document)

Initializer Agent
  -> Reads PRD.md
  -> Generates feature_list.json
  -> Generates claude-progress.txt
  -> Generates init.sh (project scaffold)
  -> Runs init.sh to bootstrap project

Fixed Session Routine
  -> Each session: read claude-progress.txt -> pick next incomplete feature -> build -> test -> mark done -> git push

Builder Agent
  -> Implements features one by one per feature_list.json
  -> Writes code, tests locally, commits

Reviewer Agent
  -> Reviews code quality, accessibility, SEO, responsiveness
  -> Suggests fixes before milestone push
```

### Session Routine (Per Coding Session)

1. Read `claude-progress.txt` to find current milestone and next incomplete feature.
2. Implement the feature.
3. Test locally (API responses, card rendering, language filter, mobile layout).
4. Mark feature as complete in `claude-progress.txt`.
5. Git commit with descriptive message.
6. At milestone completion: git push, verify deployment on Vercel.

---

## 3. Tech Stack

| Layer | Technology | Cost |
|-------|-----------|------|
| Frontend | Vanilla HTML/CSS/JS | $0 |
| Styling | Tailwind CSS via CDN | $0 |
| Charts | Chart.js or lightweight sparkline lib | $0 |
| API | GitHub REST API (no auth for basic, or use token for higher limits) | $0 |
| Hosting | Vercel (free tier) | $0 |
| Data Collection | Google Sheets + Apps Script Webhook | $0 |
| Ads | Adsterra (primary), Google AdSense (secondary) | Revenue |
| Version Control | GitHub (private repo) | $0 |
| **Total** | | **$0** |

---

## 4. API Details

### GitHub REST API

#### Search Repositories (Trending Simulation)
- Endpoint: `https://api.github.com/search/repositories`
- Parameters:
  - `q=created:>YYYY-MM-DD` (for daily/weekly/monthly)
  - `sort=stars`
  - `order=desc`
  - `per_page=30`
  - `language=python` (optional language filter)
- Rate limit: 10 requests/minute (unauthenticated), 30/minute (authenticated)

#### Example Queries

**Daily trending (repos created/pushed today):**
```
GET /search/repositories?q=pushed:>2026-03-31&sort=stars&order=desc&per_page=30
```

**Weekly trending (last 7 days):**
```
GET /search/repositories?q=created:>2026-03-25&sort=stars&order=desc&per_page=30
```

**Language filtered:**
```
GET /search/repositories?q=language:python+created:>2026-03-25&sort=stars&order=desc&per_page=30
```

### Alternative: GitHub Trending Scraping
- URL: `https://github.com/trending?since=daily&spoken_language_code=en`
- Can use a proxy or third-party API like `https://api.gitterapp.com/repositories/trending`
- Fallback if search API rate limits are hit

---

## 5. Features List

### Core Features

| ID | Feature | Priority | Milestone |
|----|---------|----------|-----------|
| F01 | Repo cards grid (name, description, stars, forks, language badge) | P0 | M1 |
| F02 | Language filter tabs (All, Python, JavaScript, TypeScript, Rust, Go) | P0 | M1 |
| F03 | Daily/Weekly/Monthly toggle | P0 | M1 |
| F04 | Sort by stars (default) | P0 | M1 |
| F05 | Star count with formatted numbers (e.g., 12.3k) | P0 | M1 |
| F06 | Repository owner avatar | P1 | M2 |
| F07 | "Star History" sparkline per repo card | P1 | M2 |
| F08 | Topic/tag badges on cards | P1 | M2 |
| F09 | Load more / pagination | P0 | M2 |
| F10 | Responsive mobile-first layout | P0 | M1 |
| F11 | API rate limit handling (cache, retry, fallback) | P0 | M2 |
| F12 | Last updated timestamp | P0 | M2 |
| F13 | Additional languages (Java, C++, Ruby, PHP, Swift, Kotlin) | P1 | M3 |
| F14 | Repo link opens in new tab | P0 | M1 |

### SEO & Meta

| ID | Feature | Priority | Milestone |
|----|---------|----------|-----------|
| S01 | Meta tags (title, description, keywords) | P0 | M3 |
| S02 | Open Graph tags | P0 | M3 |
| S03 | Twitter Card tags | P0 | M3 |
| S04 | JSON-LD structured data (WebSite, WebApplication) | P0 | M3 |
| S05 | sitemap.xml | P0 | M3 |
| S06 | robots.txt | P0 | M3 |
| S07 | Semantic HTML throughout | P0 | M1 |
| S08 | Canonical URL | P1 | M3 |

### Monetization & Analytics

| ID | Feature | Priority | Milestone |
|----|---------|----------|-----------|
| A01 | Adsterra ad unit placeholders (header, between cards, sidebar, footer) | P0 | M3 |
| A02 | Adsterra ad key injection script | P0 | M3 |
| A03 | Google AdSense fallback slots | P1 | M4 |
| A04 | Visitor counter (Today + Total) in footer | P0 | M3 |
| A05 | Google Sheets webhook - log visits and searches | P0 | M3 |

### Internationalization & UX

| ID | Feature | Priority | Milestone |
|----|---------|----------|-----------|
| I01 | Auto i18n - browser language detection | P0 | M4 |
| I02 | Support 8+ languages (EN, KO, JA, ZH, ES, FR, DE, PT) | P0 | M4 |
| I03 | Language selector dropdown in header | P1 | M4 |
| I04 | Social sharing buttons (Twitter, Reddit, Hacker News, LinkedIn) | P0 | M4 |
| I05 | Feedback email link (taeshinkim11@gmail.com) | P0 | M4 |

### Static Pages

| ID | Feature | Priority | Milestone |
|----|---------|----------|-----------|
| P01 | About page | P0 | M4 |
| P02 | How to Use / FAQ page | P0 | M4 |
| P03 | Privacy Policy page | P0 | M4 |
| P04 | Terms of Service page | P0 | M4 |

---

## 6. File & Folder Structure

```
GitTrendTracker/
├── index.html                  # Main dashboard page
├── about.html                  # About page
├── faq.html                    # How to Use / FAQ
├── privacy.html                # Privacy Policy
├── terms.html                  # Terms of Service
├── sitemap.xml                 # SEO sitemap
├── robots.txt                  # SEO robots
├── css/
│   └── style.css               # Custom styles (soft backgrounds, card designs)
├── js/
│   ├── app.js                  # Main application logic
│   ├── api.js                  # GitHub API fetch functions
│   ├── cards.js                # Repo card rendering
│   ├── filters.js              # Language filter + time range toggle
│   ├── sparkline.js            # Star history sparkline rendering
│   ├── cache.js                # localStorage caching for API responses
│   ├── i18n.js                 # Internationalization
│   ├── visitor.js              # Visitor counter
│   ├── ads.js                  # Ad injection
│   └── sheets-webhook.js       # Google Sheets visit logging
├── data/
│   └── translations.json       # i18n strings
├── assets/
│   ├── og-image.png            # Open Graph image
│   ├── favicon.ico             # Favicon
│   └── icons/                  # Language icons, UI icons
├── feature_list.json           # Harness: feature tracking
├── claude-progress.txt         # Harness: session progress
├── init.sh                     # Harness: project initializer
├── vercel.json                 # Vercel config
├── .gitignore
└── README.md
```

---

## 7. Design System

### Color Palette

| Role | Color | Hex |
|------|-------|-----|
| Background (primary) | Soft cool slate | #F8FAFC |
| Background (card) | Light warm white | #FFFFFE |
| Background (dark mode) | GitHub dark | #0D1117 |
| Text (primary) | Slate 800 | #1E293B |
| Text (secondary) | Slate 500 | #64748B |
| Accent (primary) | GitHub blue | #2563EB |
| Accent (stars) | Amber/Gold | #F59E0B |
| Accent (forks) | Slate blue | #6366F1 |
| Language: Python | Blue | #3572A5 |
| Language: JavaScript | Yellow | #F7DF1E |
| Language: TypeScript | Blue | #3178C6 |
| Language: Rust | Orange | #DEA584 |
| Language: Go | Cyan | #00ADD8 |
| Language: Java | Red | #B07219 |
| Language: C++ | Pink | #F34B7D |
| Language: Ruby | Red | #CC342D |
| Active tab | Primary blue | #2563EB |
| Inactive tab | Gray 200 | #E5E7EB |

### Typography

- Headings: `Inter` (700 weight)
- Body: `Inter` (400 weight)
- Code/repo names: `JetBrains Mono` or `monospace` (500 weight)

### Repo Card Design

```
+------------------------------------------+
| [Avatar] owner/repo-name         ★ 12.3k |
|                                           |
| Short description of the repository       |
| that may span two lines...                |
|                                           |
| [Python] [machine-learning] [ai]         |
|                                           |
| ★ 12,345  🍴 1,234  ▂▃▅▇█ (sparkline)  |
+------------------------------------------+
```

- Border radius: 12px
- Border: 1px solid #E5E7EB
- Hover: border-color transitions to primary blue, slight shadow
- Grid: 1 col (mobile), 2 col (tablet), 3 col (desktop)

### Breakpoints

| Name | Width |
|------|-------|
| Mobile | < 640px |
| Tablet | 640px - 1024px |
| Desktop | > 1024px |

---

## 8. Milestones & Git Strategy

### Milestone 1: Core Dashboard (MVP)
**Deliverables:**
- Project scaffold
- GitHub API integration (search repositories)
- Repo cards grid rendering
- Language filter tabs (All, Python, JS, TS, Rust, Go)
- Daily/Weekly/Monthly toggle
- Semantic HTML + responsive layout

**Git commits:**
- `feat: scaffold project structure`
- `feat: implement GitHub API integration`
- `feat: render repo cards grid`
- `feat: add language filter tabs`
- `feat: add time range toggle (daily/weekly/monthly)`
- `style: responsive mobile-first layout`
- `milestone: M1 complete - core dashboard`

**Push to GitHub at milestone completion.**

### Milestone 2: Enhanced Cards & Caching
**Deliverables:**
- Owner avatars on cards
- Star history sparklines
- Topic/tag badges
- Pagination / load more
- API rate limit handling with localStorage cache
- Last updated timestamp

**Git commits:**
- `feat: add owner avatars to cards`
- `feat: implement star history sparklines`
- `feat: add topic/tag badges`
- `feat: add pagination`
- `feat: implement API caching in localStorage`
- `feat: add last updated timestamp`
- `milestone: M2 complete - enhanced cards`

**Push to GitHub at milestone completion.**

### Milestone 3: SEO, Ads & Analytics
**Deliverables:**
- Full SEO (meta, OG, JSON-LD, sitemap, robots.txt)
- Adsterra ad placeholders and injection
- Visitor counter in footer
- Google Sheets visit webhook
- Additional language filters

**Git commits:**
- `feat: add SEO meta, OG, JSON-LD tags`
- `feat: create sitemap.xml and robots.txt`
- `feat: integrate Adsterra ad units`
- `feat: add visitor counter`
- `feat: integrate visit logging webhook`
- `feat: add more language filters`
- `milestone: M3 complete - SEO, ads, analytics`

**Push to GitHub at milestone completion.**

### Milestone 4: i18n, Pages & Polish
**Deliverables:**
- Auto i18n with 8+ languages
- Social sharing buttons
- Feedback mechanism
- About, FAQ, Privacy, Terms pages
- AdSense fallback
- Final QA

**Git commits:**
- `feat: implement i18n (8 languages)`
- `feat: add social sharing buttons`
- `feat: add feedback email link`
- `feat: create static pages`
- `feat: add AdSense fallback`
- `chore: final QA and optimization`
- `milestone: M4 complete - full release`

**Push to GitHub at milestone completion.**

---

## 9. API Rate Limit Strategy

### Problem
GitHub API unauthenticated: 10 requests/minute, 60/hour.
Authenticated: 30 requests/minute, 5000/hour.

### Solution: Multi-Layer Caching

1. **localStorage Cache**: Store API responses with TTL.
   - Daily trending: cache for 30 minutes.
   - Weekly trending: cache for 1 hour.
   - Monthly trending: cache for 2 hours.

2. **Request Deduplication**: If same query is in cache and not expired, skip API call.

3. **Fallback Data**: Pre-baked static JSON as emergency fallback if API is unreachable.

4. **Rate Limit Detection**: Check `X-RateLimit-Remaining` header; if low, extend cache TTL.

```javascript
// js/cache.js
const CACHE_PREFIX = "gtt_cache_";

function getCached(key) {
  const item = localStorage.getItem(CACHE_PREFIX + key);
  if (!item) return null;
  const { data, expiry } = JSON.parse(item);
  if (Date.now() > expiry) {
    localStorage.removeItem(CACHE_PREFIX + key);
    return null;
  }
  return data;
}

function setCache(key, data, ttlMs) {
  localStorage.setItem(CACHE_PREFIX + key, JSON.stringify({
    data,
    expiry: Date.now() + ttlMs
  }));
}
```

---

## 10. Google Sheets Webhook (Apps Script)

### Visit & Search Logging

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Visits");
  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    new Date(),
    data.event || "page_visit",
    data.page || "/",
    data.language_filter || "",
    data.time_range || "",
    data.userAgent || "",
    data.browserLang || "",
    data.timezone || ""
  ]);
  return ContentService.createTextOutput(
    JSON.stringify({ status: "ok" })
  ).setMimeType(ContentService.MimeType.JSON);
}
```

### Logging Events
- `page_visit`: User loads the page
- `filter_change`: User changes language filter
- `time_range_change`: User toggles daily/weekly/monthly
- `repo_click`: User clicks to visit a repository

---

## 11. Ad Monetization Strategy

### Adsterra (Primary)

| Slot | Position | Type | Size |
|------|----------|------|------|
| ad-header-banner | Top of page, below nav | Banner | 728x90 / 320x50 |
| ad-between-cards | After every 9th repo card | Native | 300x250 |
| ad-sidebar | Right sidebar (desktop) | Sticky | 300x600 |
| ad-footer | Above footer | Banner | 728x90 |

### Injection Pattern

```html
<div class="ad-slot" id="ad-header-banner" data-ad-key="ADSTERRA_KEY_HERE">
  <ins class="adsterra-ad" data-key="ADSTERRA_KEY_HERE"></ins>
  <script>(adsterra = window.adsterra || []).push({});</script>
</div>
```

---

## 12. Visitor Counter

```html
<footer>
  <div class="visitor-counter">
    <span>Today: <strong id="visitors-today">--</strong></span>
    <span>Total: <strong id="visitors-total">--</strong></span>
  </div>
</footer>
```

- Small, muted footer text.
- Backed by Google Sheets count.

---

## 13. i18n Strategy

### Languages Supported
1. English (en)
2. Korean (ko)
3. Japanese (ja)
4. Chinese Simplified (zh)
5. Spanish (es)
6. French (fr)
7. German (de)
8. Portuguese (pt)

### Translation Scope
- UI labels, headings, buttons, footer text
- Filter labels (language names, time ranges)
- Static page content
- Repo names and descriptions remain in original language

### Auto-Detection

```javascript
const userLang = navigator.language || navigator.languages[0];
const supportedLangs = ['en', 'ko', 'ja', 'zh', 'es', 'fr', 'de', 'pt'];
const lang = supportedLangs.find(l => userLang.startsWith(l)) || 'en';
```

---

## 14. SEO Implementation

### Meta Tags

```html
<meta name="description" content="Discover daily trending GitHub repositories sorted by stars. Filter by language - Python, JavaScript, TypeScript, Rust, Go, and more. Updated in real time.">
<meta name="keywords" content="github trending, trending repositories, popular github projects, github trending today, open source trending">
```

### Open Graph

```html
<meta property="og:title" content="GitTrend Tracker - Daily Trending GitHub Repositories">
<meta property="og:description" content="Discover today's most popular GitHub repositories. Filter by language, view star history, and track open source trends.">
<meta property="og:image" content="https://gittrend-tracker.vercel.app/assets/og-image.png">
<meta property="og:url" content="https://gittrend-tracker.vercel.app/">
<meta property="og:type" content="website">
```

### JSON-LD

```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "GitTrend Tracker",
  "description": "Daily trending GitHub repositories dashboard with language filters and star history.",
  "url": "https://gittrend-tracker.vercel.app/",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
```

---

## 15. Deployment Checklist

### Pre-Deployment
- [ ] All features in feature_list.json marked complete
- [ ] GitHub API integration working with caching
- [ ] Language filters and time range toggle functional
- [ ] Repo cards rendering with all data
- [ ] Sparklines rendering
- [ ] Mobile responsive at all breakpoints
- [ ] SEO validated
- [ ] Ad placeholders in place
- [ ] Visitor counter functional
- [ ] Google Sheets webhook receiving data
- [ ] i18n working for 8+ languages
- [ ] All static pages complete
- [ ] Lighthouse Performance > 90, SEO > 95

### Deployment Steps
1. Create GitHub repo: `gh repo create GitTrendTracker --private --source=. --push`
2. Deploy to Vercel: `vercel --prod`
3. Verify deployment at Vercel URL.
4. Submit sitemap to Google Search Console.
5. Test all features on production.

### Post-Deployment
- [ ] Google Search Console configured
- [ ] Adsterra ads configured
- [ ] Share on Reddit (r/programming, r/opensource, r/webdev)
- [ ] Share on Hacker News
- [ ] Share on Dev.to

---

## 16. Risk & Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| GitHub API rate limiting | No data displayed | localStorage cache, static fallback JSON, rate limit detection |
| API response format changes | Broken rendering | Version-pin API calls, error handling, fallback UI |
| Similar competing sites | Lower traffic | Unique UX, sparklines, better mobile experience |
| Slow API responses | Poor UX | Loading skeletons, cached data shown while refreshing |

---

## 17. Success Metrics

| Metric | Target (30 days) |
|--------|-----------------|
| Daily visitors | 300+ |
| Google indexed pages | All pages |
| Lighthouse Performance | > 90 |
| Lighthouse SEO | > 95 |
| Ad impressions | 1000+/day |
| Social shares | 100+ |
| Repeat visitors | 30%+ |

---

## 18. Privacy & Data

- No user accounts required.
- Visit data collected: timestamp, page, filter selections, user agent, language, timezone.
- No personally identifiable information stored.
- All practices disclosed in Privacy Policy.
- GDPR-compliant.

---

## 19. Future Enhancements (Post-Launch)

- Developer profile pages (top contributors)
- Repo comparison tool
- Star growth prediction
- Email digest (weekly trending repos)
- Browser extension
- RSS feed for trending repos
- "Awesome List" aggregator
- Bookmarks / favorites (localStorage)
- Dark mode toggle
- Integration with GitHub authentication for personalized recommendations

---

*Document Version: 1.0*
*Created: 2026-04-01*
*Methodology: Harness Design*
