/* GitTrend Tracker - Internationalization */

const SUPPORTED_LANGS = ['en', 'ko', 'ja', 'zh', 'es', 'fr', 'de', 'pt'];
let currentLang = 'en';
let translations = {};

async function initI18n() {
  // 1. URL ?lang= param takes highest priority
  const urlParams = new URLSearchParams(window.location.search);
  const urlLang = urlParams.get('lang');
  if (urlLang && SUPPORTED_LANGS.includes(urlLang)) {
    currentLang = urlLang;
  } else {
    // 2. LocalStorage saved preference
    const saved = localStorage.getItem('gtt_lang');
    // 3. Browser language auto-detection
    const userLang = navigator.language || (navigator.languages && navigator.languages[0]) || 'en';
    currentLang = saved || SUPPORTED_LANGS.find(l => userLang.startsWith(l)) || 'en';
  }

  try {
    const resp = await fetch('data/translations.json');
    translations = await resp.json();
  } catch (e) {
    translations = {};
  }

  applyTranslations();
  setupLangSelector();
}

function applyTranslations() {
  const t = translations[currentLang] || translations['en'] || {};

  // Update all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) {
      el.textContent = t[key];
    }
  });

  // Update filter labels
  if (window.Filters && t) {
    window.Filters.updateFilterLabels(t);
  }

  document.documentElement.lang = currentLang;
}

function setupLangSelector() {
  const selector = document.getElementById('lang-select');
  if (!selector) return;

  selector.value = currentLang;
  selector.addEventListener('change', (e) => {
    currentLang = e.target.value;
    localStorage.setItem('gtt_lang', currentLang);
    applyTranslations();
  });
}

function t(key) {
  const tr = translations[currentLang] || translations['en'] || {};
  return tr[key] || key;
}

function getCurrentLang() { return currentLang; }

window.I18n = { initI18n, t, getCurrentLang, applyTranslations, SUPPORTED_LANGS };
