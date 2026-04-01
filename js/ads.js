/* GitTrend Tracker - Ad Injection */

function initAds() {
  // Adsterra ad placeholders - inject when keys are configured
  const adSlots = document.querySelectorAll('.ad-slot[data-ad-key]');
  adSlots.forEach(slot => {
    const key = slot.getAttribute('data-ad-key');
    if (key && key !== 'ADSTERRA_KEY_HERE') {
      const ins = document.createElement('ins');
      ins.className = 'adsterra-ad';
      ins.setAttribute('data-key', key);
      slot.appendChild(ins);
    }
  });
}

// Insert ad card between repo cards (after every 9th card)
function insertAdBetweenCards(container, index) {
  if ((index + 1) % 9 === 0) {
    const adDiv = document.createElement('div');
    adDiv.className = 'ad-slot';
    adDiv.id = `ad-between-cards-${index}`;
    adDiv.setAttribute('data-ad-key', 'ADSTERRA_KEY_HERE');
    adDiv.innerHTML = '<span>Advertisement</span>';
    container.appendChild(adDiv);
  }
}

window.Ads = { initAds, insertAdBetweenCards };
