
/* ==========================================================================
   Stagertuning – Demo Website Scripts
   - Accessible mobile nav
   - IntersectionObserver reveal
   - FAQ accordion
   - (Konfigurator Code removed since kein Online‑Konfigurator) 
   ========================================================================== */

// Passwort-Schutz: Zeigt ein Overlay mit Passwortfeld an und schaltet die
// Seite erst frei, wenn das richtige Passwort eingegeben wurde. Das
// Passwort ist im Klartext hinterlegt, daher eignet sich dieser Schutz
// nur für eine einfache Vorschau und nicht für sicherheitskritische
// Bereiche. Die Freigabe wird in der Session gespeichert, sodass beim
// Navigieren zwischen Seiten das Overlay nicht erneut erscheint.
document.addEventListener('DOMContentLoaded', () => {
  const PASS = '9915';
  const STORAGE_KEY = 'stagerAuth';
  // Wenn bereits freigeschaltet, nichts tun
  if (sessionStorage.getItem(STORAGE_KEY) === 'true') return;
  // Overlay erstellen
  const overlay = document.createElement('div');
  overlay.className = 'pw-overlay is-visible';
  overlay.innerHTML = `
    <div class="pw-box">
      <h2>Passwort erforderlich</h2>
      <input type="password" id="pw-input" placeholder="Passwort" autocomplete="off" />
      <button id="pw-submit" type="button">Freischalten</button>
      <p class="error" id="pw-error">Falsches Passwort!</p>
    </div>
  `;
  document.body.appendChild(overlay);
  const input = overlay.querySelector('#pw-input');
  const btn = overlay.querySelector('#pw-submit');
  const err = overlay.querySelector('#pw-error');
  // Prüffunktion
  function checkPass() {
    if (input.value === PASS) {
      sessionStorage.setItem(STORAGE_KEY, 'true');
      overlay.remove();
    } else {
      err.style.display = 'block';
    }
  }
  btn.addEventListener('click', checkPass);
  input.addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter') {
      checkPass();
    }
  });
});

// Mobile navigation
const menuBtn = document.querySelector('.menu-toggle');
const navList = document.querySelector('.nav__list');
if (menuBtn && navList) {
  menuBtn.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('is-open');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
  });
}

// Reveal on scroll (reduced motion aware)
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReduced && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        obs.unobserve(e.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
  document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));
}

// Konfigurator Code entfernt: In dieser Demo-Version gibt es keinen Leistungsrechner.

// Accessible accordion for FAQ (if present)
document.querySelectorAll('.accordion__btn').forEach(btn => {
  const panel = btn.nextElementSibling;
  if (!panel) return;
  btn.setAttribute('aria-expanded', 'false');
  panel.hidden = true;
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    panel.hidden = expanded;
  });
});

// Cookie Consent Banner
document.addEventListener('DOMContentLoaded', () => {
  const banner = document.querySelector('.cookie-banner');
  if (!banner) return;
  // Show banner only if consent not yet given
  if (localStorage.getItem('cookieConsent') !== 'accepted') {
    banner.classList.add('is-visible');
  }
  const acceptBtn = banner.querySelector('.cookie-banner__btn');
  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'accepted');
      banner.remove();
    });
  }
});
