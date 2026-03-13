'use strict';

/* ════════════════════════════════════════════════════════════
   iOS INTERFACE — HomeScreen, AppWindow, ControlCenter
   Vanilla JS, zéro dépendance externe
════════════════════════════════════════════════════════════ */

/* ── SVG Icons inline ──────────────────────────────────── */
const IOS_ICONS = [
  {
    id: 'about', label: 'À propos', url: 'about.html',
    svg: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ig-about" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#4A90E2"/>
          <stop offset="100%" stop-color="#007AFF"/>
        </linearGradient>
      </defs>
      <rect width="60" height="60" fill="url(#ig-about)"/>
      <circle cx="30" cy="20" r="9" fill="white"/>
      <path d="M12 52 C12 36 48 36 48 52" fill="white"/>
    </svg>`
  },
  {
    id: 'experiences', label: 'Expériences', url: 'experiences.html',
    svg: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ig-exp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#8E44AD"/>
          <stop offset="100%" stop-color="#6C3483"/>
        </linearGradient>
      </defs>
      <rect width="60" height="60" fill="url(#ig-exp)"/>
      <rect x="10" y="24" width="40" height="26" rx="4" fill="white"/>
      <path d="M22 24 L22 18 Q22 14 26 14 L34 14 Q38 14 38 18 L38 24" fill="none" stroke="white" stroke-width="3.5"/>
      <rect x="10" y="34" width="40" height="3" fill="rgba(108,52,131,.35)"/>
    </svg>`
  },
  {
    id: 'skills', label: 'Compétences', url: 'skills.html',
    svg: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ig-skills" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#F39C12"/>
          <stop offset="100%" stop-color="#E67E22"/>
        </linearGradient>
      </defs>
      <rect width="60" height="60" fill="url(#ig-skills)"/>
      <path d="M35 8 L20 32 L30 32 L25 52 L42 28 L32 28 Z" fill="white"/>
    </svg>`
  },
  {
    id: 'projects', label: 'Projets', url: 'projects.html',
    svg: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ig-proj" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#27AE60"/>
          <stop offset="100%" stop-color="#1E8449"/>
        </linearGradient>
      </defs>
      <rect width="60" height="60" fill="url(#ig-proj)"/>
      <path d="M30 7 C30 7 44 17 44 32 L39 37 L33 31 L27 37 L16 37 C16 22 30 7 30 7 Z" fill="white"/>
      <circle cx="30" cy="23" r="4" fill="rgba(30,132,73,.45)"/>
      <path d="M26 40 L30 54 L34 40" fill="white"/>
    </svg>`
  },
  {
    id: 'e4', label: 'E4 BTS SIO', url: 'bts-competences.html',
    svg: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ig-e4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#E74C3C"/>
          <stop offset="100%" stop-color="#C0392B"/>
        </linearGradient>
      </defs>
      <rect width="60" height="60" fill="url(#ig-e4)"/>
      <polygon points="30,11 8,22 30,33 52,22" fill="white"/>
      <path d="M42 26 L42 40 Q30 47 18 40 L18 26" fill="rgba(255,255,255,.88)"/>
      <rect x="41" y="23" width="3" height="17" rx="1.5" fill="white"/>
      <circle cx="42.5" cy="42" r="3.5" fill="white"/>
    </svg>`
  },
  {
    id: 'e5', label: 'E5 SISR', url: 'e5.html',
    svg: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ig-e5" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#1ABC9C"/>
          <stop offset="100%" stop-color="#16A085"/>
        </linearGradient>
      </defs>
      <rect width="60" height="60" fill="url(#ig-e5)"/>
      <circle cx="30" cy="14" r="5.5" fill="white"/>
      <circle cx="12" cy="40" r="5.5" fill="white"/>
      <circle cx="48" cy="40" r="5.5" fill="white"/>
      <circle cx="30" cy="48" r="4.5" fill="white"/>
      <line x1="30" y1="20" x2="12" y2="34" stroke="white" stroke-width="2.5"/>
      <line x1="30" y1="20" x2="48" y2="34" stroke="white" stroke-width="2.5"/>
      <line x1="12" y1="46" x2="30" y2="44" stroke="white" stroke-width="2.5"/>
      <line x1="48" y1="46" x2="30" y2="44" stroke="white" stroke-width="2.5"/>
    </svg>`
  },
  {
    id: 'cv', label: 'CV', url: 'cv.html',
    svg: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ig-cv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#3498DB"/>
          <stop offset="100%" stop-color="#2980B9"/>
        </linearGradient>
      </defs>
      <rect width="60" height="60" fill="url(#ig-cv)"/>
      <rect x="13" y="8" width="34" height="44" rx="4" fill="white"/>
      <rect x="19" y="17" width="22" height="3" rx="1.5" fill="rgba(41,128,185,.5)"/>
      <rect x="19" y="24" width="18" height="2.5" rx="1.25" fill="rgba(41,128,185,.35)"/>
      <rect x="19" y="31" width="20" height="2.5" rx="1.25" fill="rgba(41,128,185,.35)"/>
      <rect x="19" y="38" width="14" height="2.5" rx="1.25" fill="rgba(41,128,185,.25)"/>
    </svg>`
  },
  {
    id: 'pix', label: 'Pix', url: 'pix.html',
    svg: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ig-pix" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#F1C40F"/>
          <stop offset="100%" stop-color="#F39C12"/>
        </linearGradient>
      </defs>
      <rect width="60" height="60" fill="url(#ig-pix)"/>
      <circle cx="30" cy="25" r="13" fill="white"/>
      <polygon points="30,14 32.9,22.2 41.5,22.2 34.8,27.4 37.2,35.6 30,30.5 22.8,35.6 25.2,27.4 18.5,22.2 27.1,22.2" fill="rgba(243,156,18,.6)"/>
      <rect x="27" y="38" width="6" height="9" fill="white"/>
      <rect x="22" y="45" width="16" height="3.5" rx="1.75" fill="white"/>
    </svg>`
  },
  {
    id: 'contact', label: 'Contact', url: 'contact.html',
    svg: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ig-contact" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#E91E63"/>
          <stop offset="100%" stop-color="#C2185B"/>
        </linearGradient>
      </defs>
      <rect width="60" height="60" fill="url(#ig-contact)"/>
      <rect x="9" y="17" width="42" height="29" rx="5" fill="white"/>
      <path d="M9 21 L30 36 L51 21" fill="none" stroke="rgba(194,24,91,.45)" stroke-width="2.5"/>
    </svg>`
  }
];

const DOCK_IDS = ['about', 'projects', 'cv', 'contact'];

/* ── Status bar SVGs ────────────────────────────────────── */
function _svgSignal() {
  return `<svg width="17" height="12" viewBox="0 0 17 12"><rect x="0" y="7" width="3" height="5" rx="1"/><rect x="4.5" y="4.5" width="3" height="7.5" rx="1"/><rect x="9" y="2" width="3" height="10" rx="1"/><rect x="13.5" y="0" width="3" height="12" rx="1"/></svg>`;
}
function _svgWifi() {
  return `<svg width="16" height="12" viewBox="0 0 16 12"><path d="M8 9.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"/><path d="M8 5.5a5 5 0 014.33 2.5l-1.5 1.06A3 3 0 005.17 9.06L3.67 8A5 5 0 018 5.5z"/><path d="M8 1a9 9 0 017.8 4.5l-1.5 1.06A7 7 0 001.7 6.56L.2 5.5A9 9 0 018 1z"/></svg>`;
}
function _svgBattery() {
  return `<svg width="25" height="12" viewBox="0 0 25 12"><rect x="0" y="1" width="21" height="10" rx="3" stroke="currentColor" stroke-width="1.2" fill="none"/><rect x="22" y="3.5" width="2" height="5" rx="1" fill="currentColor" opacity=".4"/><rect x="1.5" y="2.5" width="17" height="7" rx="2" fill="currentColor"/></svg>`;
}

function _statusBarHTML(id) {
  return `<div class="ios-statusbar" id="${id}">
    <span class="ios-statusbar__time" id="${id}-time">00:00</span>
    <div class="ios-statusbar__icons">${_svgSignal()}${_svgWifi()}${_svgBattery()}</div>
  </div>`;
}

/* ════════════════════════════════════════════════════════════
   ControlCenter
════════════════════════════════════════════════════════════ */
class ControlCenter {
  constructor(wrapper) {
    this.wrapper = wrapper;
    this.el = null;
    this.overlay = null;
    this._build();
    this._bindEvents();
  }

  _build() {
    /* Panel */
    this.el = document.createElement('div');
    this.el.className = 'ios-cc';
    this.el.innerHTML = `
      <div class="ios-cc__buttons">
        <button class="ios-cc__btn ios-cc--on" id="ios-cc-wifi" aria-label="Wi-Fi">
          <span class="ios-cc__btn-icon">📶</span>
          <span class="ios-cc__btn-label">Wi‑Fi</span>
        </button>
        <button class="ios-cc__btn ios-cc--on" id="ios-cc-bt" aria-label="Bluetooth">
          <span class="ios-cc__btn-icon" style="font-size:18px;font-weight:700;">⌘</span>
          <span class="ios-cc__btn-label">Bluetooth</span>
        </button>
        <button class="ios-cc__btn" id="ios-cc-plane" aria-label="Mode avion">
          <span class="ios-cc__btn-icon">✈️</span>
          <span class="ios-cc__btn-label">Avion</span>
        </button>
        <button class="ios-cc__btn" id="ios-cc-dark" aria-label="Mode sombre">
          <span class="ios-cc__btn-icon" id="ios-cc-dark-icon">🌙</span>
          <span class="ios-cc__btn-label">Sombre</span>
        </button>
      </div>
      <div class="ios-cc__slider-row">
        <div class="ios-cc__slider-label">☀️ Luminosité</div>
        <input type="range" class="ios-cc__slider" value="80" min="0" max="100">
      </div>
      <div class="ios-cc__slider-row">
        <div class="ios-cc__slider-label">🔊 Volume</div>
        <input type="range" class="ios-cc__slider" value="65" min="0" max="100">
      </div>
    `;

    /* Overlay (tap to dismiss) */
    this.overlay = document.createElement('div');
    this.overlay.className = 'ios-cc-overlay';

    this.wrapper.appendChild(this.el);
    this.wrapper.appendChild(this.overlay);
  }

  _bindEvents() {
    this.overlay.addEventListener('click', () => this.hide());

    /* Toggle buttons */
    ['ios-cc-wifi', 'ios-cc-bt', 'ios-cc-plane'].forEach(id => {
      const btn = document.getElementById(id);
      if (btn) btn.addEventListener('click', () => btn.classList.toggle('ios-cc--on'));
    });

    /* Dark mode toggle */
    const darkBtn = document.getElementById('ios-cc-dark');
    if (darkBtn) {
      darkBtn.addEventListener('click', () => {
        const root = document.documentElement;
        const isDark = root.getAttribute('data-theme') === 'dark';
        const next   = isDark ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        const icon = document.getElementById('ios-cc-dark-icon');
        if (icon) icon.textContent = next === 'dark' ? '☀️' : '🌙';
        darkBtn.classList.toggle('ios-cc--on', next === 'dark');
      });
      /* Sync initial state */
      const theme = localStorage.getItem('theme') || 'light';
      if (theme === 'dark') darkBtn.classList.add('ios-cc--on');
      const icon = document.getElementById('ios-cc-dark-icon');
      if (icon) icon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }

    /* Swipe up to close */
    let sy = 0;
    this.el.addEventListener('touchstart', e => { sy = e.changedTouches[0].clientY; }, { passive: true });
    this.el.addEventListener('touchend',   e => {
      if (e.changedTouches[0].clientY - sy < -40) this.hide();
    }, { passive: true });
  }

  show() {
    this.el.classList.add('ios-cc--open');
    this.overlay.classList.add('ios-cc-overlay--open');
  }
  hide() {
    this.el.classList.remove('ios-cc--open');
    this.overlay.classList.remove('ios-cc-overlay--open');
  }
}

/* ════════════════════════════════════════════════════════════
   AppWindow
════════════════════════════════════════════════════════════ */
class AppWindow {
  constructor(wrapper) {
    this.wrapper     = wrapper;
    this.el          = null;
    this.iframe      = null;
    this.titleEl     = null;
    this.touchStartX = 0;
    this.touchStartY = 0;
    this._build();
    this._bindEvents();
    this._startClock();
  }

  _build() {
    this.el = document.createElement('div');
    this.el.className = 'ios-appwindow';
    this.el.id = 'ios-appwindow';
    this.el.innerHTML = `
      <div class="ios-statusbar-inapp" id="ios-app-statusbar">
        <span class="ios-statusbar-inapp__time" id="ios-app-sb-time">00:00</span>
        <div class="ios-statusbar-inapp__icons">${_svgSignal()}${_svgWifi()}${_svgBattery()}</div>
      </div>
      <div class="ios-navbar">
        <div class="ios-navbar__back" id="ios-nb-back" role="button" tabindex="0" aria-label="Retour">‹ Accueil</div>
        <div class="ios-navbar__title" id="ios-nb-title">Portfolio</div>
        <div class="ios-navbar__spacer"></div>
      </div>
      <div class="ios-appwindow__content">
        <iframe class="ios-appwindow__iframe" id="ios-app-iframe"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-downloads"
          title="Contenu application"></iframe>
      </div>
    `;
    this.wrapper.appendChild(this.el);
    this.iframe  = this.el.querySelector('#ios-app-iframe');
    this.titleEl = this.el.querySelector('#ios-nb-title');
  }

  _bindEvents() {
    const back = this.el.querySelector('#ios-nb-back');
    back.addEventListener('click',   () => this.close());
    back.addEventListener('keydown', e  => { if (e.key === 'Enter') this.close(); });

    /* Swipe right from left edge → close */
    this.el.addEventListener('touchstart', e => {
      this.touchStartX = e.changedTouches[0].clientX;
      this.touchStartY = e.changedTouches[0].clientY;
    }, { passive: true });

    this.el.addEventListener('touchend', e => {
      const dx  = e.changedTouches[0].clientX - this.touchStartX;
      const dy  = Math.abs(e.changedTouches[0].clientY - this.touchStartY);
      const dyU = this.touchStartY - e.changedTouches[0].clientY;

      /* Left edge swipe right */
      if (this.touchStartX < 30 && dx > 50 && dy < 80) { this.close(); return; }
      /* Swipe up from bottom 20% */
      if (this.touchStartY > window.innerHeight * 0.8 && dyU > 50 && Math.abs(dx) < 60) this.close();
    }, { passive: true });
  }

  _startClock() {
    setInterval(() => {
      const now = new Date();
      const t   = String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0');
      const el  = document.getElementById('ios-app-sb-time');
      if (el) el.textContent = t;
    }, 1000);
  }

  open(url, title, iconRect) {
    /* animation origin = centre de l'icône */
    if (iconRect) {
      const cx = iconRect.left + iconRect.width  / 2;
      const cy = iconRect.top  + iconRect.height / 2;
      this.el.style.transformOrigin = cx + 'px ' + cy + 'px';
    } else {
      this.el.style.transformOrigin = '50% 50%';
    }

    this.titleEl.textContent = title;
    this.iframe.src = url;
    this.el.style.opacity        = '1';
    this.el.style.pointerEvents  = 'all';
    this.el.classList.remove('ios-closing');
    this.el.classList.add('ios-opening');

    /* Inject styles into iframe after load */
    this.iframe.onload = () => this._injectFrameStyles();

    setTimeout(() => this.el.classList.remove('ios-opening'), 420);
  }

  _injectFrameStyles() {
    try {
      const doc = this.iframe.contentDocument || this.iframe.contentWindow.document;
      if (!doc || document.getElementById('ios-injected-css')) return;
      const s = doc.createElement('style');
      s.id = 'ios-injected-css';
      s.textContent = `
        .navbar { display: none !important; }
        #back-to-top { display: none !important; }
        .settings-panel { display: none !important; }
        body { padding-top: 0 !important; }
        ::-webkit-scrollbar { display: none !important; }
        * { scrollbar-width: none !important; -ms-overflow-style: none !important; }
      `;
      doc.head.appendChild(s);
    } catch (_) { /* cross-origin : silent */ }
  }

  close() {
    this.el.classList.remove('ios-opening');
    this.el.classList.add('ios-closing');
    setTimeout(() => {
      this.el.classList.remove('ios-closing');
      this.el.style.opacity       = '0';
      this.el.style.pointerEvents = 'none';
      this.iframe.src = 'about:blank';
    }, 320);
  }
}

/* ════════════════════════════════════════════════════════════
   HomeScreen
════════════════════════════════════════════════════════════ */
class HomeScreen {
  constructor(wrapper) {
    this.wrapper    = wrapper;
    this.el         = null;
    this.isWiggling = false;
    this.appWindow  = new AppWindow(wrapper);
    this.cc         = new ControlCenter(wrapper);
    this._build();
    this._bindEvents();
    this._startClock();
  }

  /* ── Build ──────────────────────────────────── */
  _iconHTML(icon, dock) {
    return `<div class="${dock ? 'ios-icon ios-dock-icon' : 'ios-icon'}"
                 data-url="${icon.url}" data-title="${icon.label}" data-id="${icon.id}"
                 role="button" tabindex="0" aria-label="Ouvrir ${icon.label}">
      <div class="ios-icon__img">${icon.svg}</div>
      ${!dock ? `<div class="ios-icon__label">${icon.label}</div>` : ''}
    </div>`;
  }

  _build() {
    const gridIcons = IOS_ICONS.filter(ic => !DOCK_IDS.includes(ic.id));
    const dockIcons = IOS_ICONS.filter(ic =>  DOCK_IDS.includes(ic.id));

    this.el = document.createElement('div');
    this.el.className = 'ios-homescreen';
    this.el.id = 'ios-homescreen';
    this.el.innerHTML = `
      ${_statusBarHTML('ios-hs-sb')}

      <div class="ios-appgrid">
        <div class="ios-appgrid__page" id="ios-page-0">
          ${gridIcons.map(ic => this._iconHTML(ic, false)).join('')}
        </div>
      </div>

      <div class="ios-pagedots">
        <div class="ios-pagedot ios-active"></div>
      </div>

      <div class="ios-dock">
        <div class="ios-dock__inner">
          ${dockIcons.map(ic => this._iconHTML(ic, true)).join('')}
        </div>
      </div>

      <div class="ios-home-indicator"></div>
    `;
    this.wrapper.appendChild(this.el);
  }

  /* ── Clock ──────────────────────────────────── */
  _startClock() {
    const update = () => {
      const now = new Date();
      const t   = String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0');
      this.el.querySelectorAll('.ios-statusbar__time').forEach(el => el.textContent = t);
    };
    update();
    setInterval(update, 1000);
  }

  /* ── Events ─────────────────────────────────── */
  _bindEvents() {
    /* Tap on icon */
    this.el.addEventListener('click', e => {
      /* stop wiggle first */
      if (this.isWiggling) { this._stopWiggle(); return; }

      const icon = e.target.closest('.ios-icon');
      if (!icon) return;
      const url   = icon.dataset.url;
      const title = icon.dataset.title;
      if (!url) return;

      const imgEl = icon.querySelector('.ios-icon__img');
      const rect  = imgEl ? imgEl.getBoundingClientRect() : null;
      this.appWindow.open(url, title, rect);
    });

    /* Long press → wiggle (500ms) */
    let lpTimer = null;
    this.el.addEventListener('touchstart', e => {
      const icon = e.target.closest('.ios-icon');
      if (!icon) return;
      lpTimer = setTimeout(() => this._startWiggle(), 500);
    }, { passive: true });
    this.el.addEventListener('touchend',  () => clearTimeout(lpTimer), { passive: true });
    this.el.addEventListener('touchmove', () => clearTimeout(lpTimer), { passive: true });

    /* Control Center : swipe down depuis coin droit (x > 60%) */
    let ccSX = 0, ccSY = 0, ccTriggered = false;
    this.el.addEventListener('touchstart', e => {
      ccSX = e.changedTouches[0].clientX;
      ccSY = e.changedTouches[0].clientY;
      ccTriggered = false;
    }, { passive: true });
    this.el.addEventListener('touchmove', e => {
      if (ccTriggered) return;
      const dx = e.changedTouches[0].clientX - ccSX;
      const dy = e.changedTouches[0].clientY - ccSY;
      if (ccSX > window.innerWidth * 0.6 && dy > 50 && Math.abs(dx) < 60) {
        ccTriggered = true;
        this.cc.show();
      }
    }, { passive: true });

    /* Tap outside icons → stop wiggle */
    this.el.addEventListener('click', e => {
      if (this.isWiggling && !e.target.closest('.ios-icon')) this._stopWiggle();
    });
  }

  _startWiggle() {
    this.isWiggling = true;
    this.el.querySelectorAll('.ios-icon').forEach(ic => ic.classList.add('ios-wiggling'));
  }
  _stopWiggle() {
    this.isWiggling = false;
    this.el.querySelectorAll('.ios-icon').forEach(ic => ic.classList.remove('ios-wiggling'));
  }

  /* ── Public ─────────────────────────────────── */
  show() { this.el.classList.add('ios-visible'); }
  hide() { this.el.classList.remove('ios-visible'); }
}

/* ════════════════════════════════════════════════════════════
   Entry point — appelé par mobile-detect.js
════════════════════════════════════════════════════════════ */
function initIOSInterface() {
  /* Créer le wrapper principal */
  const wrapper = document.createElement('div');
  wrapper.className = 'ios-wrapper';
  wrapper.id        = 'ios-wrapper';
  document.body.appendChild(wrapper);
  document.body.classList.add('ios-active');

  /* Construire HomeScreen (construit aussi AppWindow + ControlCenter) */
  const homeScreen = new HomeScreen(wrapper);

  /* Construire Lock Screen → au déverouillage, afficher HomeScreen */
  const lockScreen = new LockScreen(wrapper, () => homeScreen.show());
  lockScreen.show();
}

window.initIOSInterface = initIOSInterface;
