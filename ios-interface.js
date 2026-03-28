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
    id: 'pix', label: 'Certifications', url: 'pix.html',
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
  },
  {
    id: 'imagix', label: 'Imagix', url: 'imagix.html',
    noShine: true,
    svg: ``,
    style: `background:#111 url('imagix-icon-clean.png') center/cover no-repeat;`
  },
  {
    id: 'missions', label: 'Missions', url: 'missions.html',
    svg: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ig-missions" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#00C7BE"/>
          <stop offset="100%" stop-color="#007AFF"/>
        </linearGradient>
      </defs>
      <rect width="60" height="60" rx="13" fill="url(#ig-missions)"/>
      <rect x="16" y="11" width="28" height="38" rx="4" fill="white" fill-opacity=".9"/>
      <line x1="22" y1="22" x2="38" y2="22" stroke="rgba(0,100,200,.5)" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="22" y1="30" x2="38" y2="30" stroke="rgba(0,100,200,.5)" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="22" y1="38" x2="32" y2="38" stroke="rgba(0,100,200,.4)" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="19.5" cy="22" r="2" fill="#007AFF" fill-opacity=".8"/>
      <circle cx="19.5" cy="30" r="2" fill="#007AFF" fill-opacity=".8"/>
      <circle cx="19.5" cy="38" r="2" fill="#007AFF" fill-opacity=".6"/>
    </svg>`
  },
  {
    id: 'admin', label: 'Admin', url: '',
    svg: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ig-admin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#1c1c2e"/>
          <stop offset="100%" stop-color="#0d0d1a"/>
        </linearGradient>
      </defs>
      <rect width="60" height="60" rx="13" fill="url(#ig-admin)"/>
      <path d="M30 7 L47 14.5 L47 30 C47 41.5 39 49 30 53 C21 49 13 41.5 13 30 L13 14.5 Z" fill="none" stroke="rgba(255,59,48,.5)" stroke-width="1.5"/>
      <path d="M30 10 L44 16.8 L44 30 C44 40 37.5 46.8 30 50.2 C22.5 46.8 16 40 16 30 L16 16.8 Z" fill="rgba(255,59,48,.82)"/>
      <path d="M22 30 L27.5 35.5 L38 25" stroke="white" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    </svg>`
  }
];

const DOCK_IDS = ['about', 'missions', 'imagix', 'contact'];

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
      if (!doc || doc.getElementById('ios-injected-css')) return;

      /* ── Styles ── */
      const s = doc.createElement('style');
      s.id = 'ios-injected-css';
      s.textContent = `
        .navbar { display: none !important; }
        #back-to-top { display: none !important; }
        .settings-panel { z-index: 10000 !important; }
        body { padding-top: 0 !important; padding-bottom: 60px !important; }
        ::-webkit-scrollbar { display: none !important; }
        * { scrollbar-width: none !important; -ms-overflow-style: none !important; }

        /* ── Tab bar ── */
        #ios-tabbar {
          position: fixed; bottom: 0; left: 0; right: 0; z-index: 9999;
          height: 56px;
          display: flex; align-items: stretch;
          background: rgba(249,249,249,.94);
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          border-top: .5px solid rgba(60,60,67,.2);
        }
        #ios-tabbar a, #ios-tabbar button {
          flex: 1; display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 2px; text-decoration: none; background: none; border: none; cursor: pointer;
          color: #8E8E93; font-size: 9px; font-weight: 500;
          font-family: -apple-system, 'SF Pro Text', Inter, sans-serif;
          letter-spacing: .2px; transition: color .15s;
          -webkit-tap-highlight-color: transparent; padding: 0;
        }
        #ios-tabbar a:active, #ios-tabbar button:active { opacity: .6; }
        #ios-tabbar a.active { color: #007AFF; }
        #ios-tabbar a svg, #ios-tabbar button svg { width: 22px; height: 22px; }
        [data-theme="dark"] #ios-tabbar { background: rgba(28,28,30,.92); border-top-color: rgba(255,255,255,.1); }
      `;
      doc.head.appendChild(s);

      /* ── Tab bar HTML ── */
      const page = (doc.location || {}).pathname || '';
      const active = (href) => page.endsWith(href) ? ' class="active"' : '';
      const bar = doc.createElement('div');
      bar.id = 'ios-tabbar';
      bar.innerHTML = `
        <a href="about.html"${active('about.html')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
          Profil
        </a>
        <a href="missions.html"${active('missions.html')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M8 2v4M16 2v4M3 10h18"/></svg>
          Missions
        </a>
        <a href="projects.html"${active('projects.html')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
          Projets
        </a>
        <a href="cv.html"${active('cv.html')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          CV
        </a>
        <a href="contact.html"${active('contact.html')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.55 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.69A16 16 0 0 0 15.31 16.1l1.88-1.88a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          Contact
        </a>
        <button id="ios-tabbar-settings" type="button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/>
            <circle cx="8" cy="6" r="2"/><circle cx="16" cy="12" r="2"/><circle cx="8" cy="18" r="2"/>
          </svg>
          Réglages
        </button>
      `;
      doc.body.appendChild(bar);

      /* Ouvrir le settings panel via JS exposé par script.js */
      const settingsTabBtn = doc.getElementById('ios-tabbar-settings');
      if (settingsTabBtn) {
        settingsTabBtn.addEventListener('click', () => {
          try {
            const cw = this.iframe.contentWindow;
            if (cw && cw._portfolioOpenSettings) {
              cw._portfolioOpenSettings();
            } else {
              const panel = doc.getElementById('settings-panel');
              if (panel) {
                panel.classList.add('open');
                panel.setAttribute('aria-hidden', 'false');
                doc.body.style.overflow = 'hidden';
              }
            }
          } catch (_) {}
        });
      }

      /* Mettre à jour l'onglet actif lors de la navigation dans l'iframe */
      this.iframe.contentWindow.addEventListener('popstate', () => this._injectFrameStyles());
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
    this.wrapper       = wrapper;
    this.el            = null;
    this.isWiggling    = false;
    this.isAdmin       = false;
    this.editModeOn    = false;
    this._dragEl       = null;
    this._dragGhost    = null;
    this._dragOffX     = 0;
    this._dragOffY     = 0;
    this._lpTimer      = null;
    this._adminModal   = null;
    this._adminToolbar = null;
    this._toast        = null;
    this.appWindow     = new AppWindow(wrapper);
    this.cc            = new ControlCenter(wrapper);
    this._build();
    this._buildAdminModal();
    this._buildAdminToolbar();
    this._buildToast();
    this._bindEvents();
    this._startClock();
    this._initTouchDrag();
  }

  /* ── Build ──────────────────────────────────── */
  _iconHTML(icon, dock) {
    return `<div class="${dock ? 'ios-icon ios-dock-icon' : 'ios-icon'}"
                 data-url="${icon.url}" data-title="${icon.label}" data-id="${icon.id}"
                 role="button" tabindex="0" aria-label="Ouvrir ${icon.label}">
      <div class="ios-icon__img${icon.noShine ? ' no-shine' : ''}"${icon.style ? ` style="${icon.style}"` : ''}>${icon.svg}</div>
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

  /* ── Admin modal ────────────────────────────── */
  _buildAdminModal() {
    const m = document.createElement('div');
    m.className = 'ios-admin-overlay';
    m.id = 'ios-admin-overlay';
    m.innerHTML = `
      <div class="ios-admin-modal">
        <svg class="ios-adm-shield" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30 4 L52 13 L52 30 C52 44 41 53 30 57 C19 53 8 44 8 30 L8 13 Z" fill="rgba(255,59,48,.15)" stroke="rgba(255,59,48,.6)" stroke-width="2"/>
          <path d="M20 30 L27 37 L40 24" stroke="#FF3B30" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <h2>Administration</h2>
        <p class="ios-adm-subtitle">Accès réservé</p>
        <input type="text"     id="ios-adm-user" placeholder="Identifiant" autocomplete="off" autocorrect="off" spellcheck="false"/>
        <input type="password" id="ios-adm-pass" placeholder="Mot de passe"/>
        <button class="ios-adm-login-btn"  id="ios-adm-login">Se connecter</button>
        <p class="ios-adm-error" id="ios-adm-error"></p>
        <button class="ios-adm-cancel-btn" id="ios-adm-cancel">Annuler</button>
      </div>`;
    this.wrapper.appendChild(m);
    this._adminModal = m;

    const ADMIN_USER = 'reda';
    const ADMIN_PASS = 'reda2026';

    const loginBtn = m.querySelector('#ios-adm-login');
    const errEl    = m.querySelector('#ios-adm-error');

    const tryLogin = async () => {
      const user = (m.querySelector('#ios-adm-user').value || '').trim();
      const pass = (m.querySelector('#ios-adm-pass').value || '');
      const hash = async s => {
        const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
        return [...new Uint8Array(buf)].map(x => x.toString(16).padStart(2,'0')).join('');
      };
      const hIn  = await hash(pass);
      const hExp = await hash(ADMIN_PASS);
      if (user === ADMIN_USER && hIn === hExp) {
        errEl.style.display = 'none';
        m.classList.remove('ios-adm-show');
        this._enterAdmin();
      } else {
        errEl.textContent = 'Identifiants incorrects';
        errEl.style.display = 'block';
        m.querySelector('#ios-adm-pass').value = '';
      }
    };

    loginBtn.addEventListener('click', tryLogin);
    m.querySelector('#ios-adm-pass').addEventListener('keydown', e => { if (e.key === 'Enter') tryLogin(); });
    m.querySelector('#ios-adm-cancel').addEventListener('click', () => m.classList.remove('ios-adm-show'));
    m.addEventListener('click', e => { if (e.target === m) m.classList.remove('ios-adm-show'); });
  }

  /* ── Admin toolbar ──────────────────────────── */
  _buildAdminToolbar() {
    const tb = document.createElement('div');
    tb.className = 'ios-admin-toolbar';
    tb.id = 'ios-admin-toolbar';
    tb.innerHTML = `
      <span class="ios-adm-badge">ADMIN</span>
      <button class="ios-adm-tb-btn" id="ios-adm-edit">✏️ Éditer</button>
      <button class="ios-adm-tb-btn" id="ios-adm-save">💾</button>
      <button class="ios-adm-tb-btn ios-adm-tb-danger" id="ios-adm-logout">✕ Déco</button>`;
    this.wrapper.appendChild(tb);
    this._adminToolbar = tb;

    tb.querySelector('#ios-adm-logout').addEventListener('click', () => this._exitAdmin());
    tb.querySelector('#ios-adm-save').addEventListener('click',   () => this._saveState());
    tb.querySelector('#ios-adm-edit').addEventListener('click',   () => {
      this.editModeOn = !this.editModeOn;
      tb.querySelector('#ios-adm-edit').classList.toggle('ios-adm-tb-active', this.editModeOn);
      if (this.editModeOn) { this._enableIframeEdit(); this._showToast('✏️ Cliquez dans la fenêtre pour modifier'); }
      else                 { this._disableIframeEdit(); }
    });
  }

  /* ── Toast ──────────────────────────────────── */
  _buildToast() {
    const t = document.createElement('div');
    t.className = 'ios-admin-toast';
    t.id = 'ios-admin-toast';
    this.wrapper.appendChild(t);
    this._toast = t;
  }
  _showToast(msg, ms) {
    if (!this._toast) return;
    this._toast.textContent = msg;
    this._toast.classList.add('ios-adm-toast-show');
    clearTimeout(this._toast._tid);
    this._toast._tid = setTimeout(() => this._toast.classList.remove('ios-adm-toast-show'), ms || 2500);
  }

  /* ── Enter / exit admin ─────────────────────── */
  _enterAdmin() {
    this.isAdmin = true;
    this.el.classList.add('ios-admin-mode');
    this._adminToolbar.classList.add('ios-adm-tb-show');
    this.el.querySelectorAll('.ios-icon').forEach(ic => this._addDelBadge(ic));
    this._initTouchDrag();
    this._showToast('🔑 Super Admin activé — maintenez pour déplacer', 3000);
  }
  _exitAdmin() {
    this.isAdmin    = false;
    this.editModeOn = false;
    this.el.classList.remove('ios-admin-mode');
    this._adminToolbar.classList.remove('ios-adm-tb-show');
    this._adminToolbar.querySelector('#ios-adm-edit').classList.remove('ios-adm-tb-active');
    this._disableIframeEdit();
    this.el.querySelectorAll('.ios-adm-del').forEach(d => d.remove());
    this._showToast('Déconnecté du mode Admin', 1500);
  }

  /* ── Delete badge ───────────────────────────── */
  _addDelBadge(ic) {
    if (ic.querySelector('.ios-adm-del')) return;
    const del = document.createElement('span');
    del.className = 'ios-adm-del';
    del.textContent = '×';
    del.addEventListener('click', e => {
      e.stopPropagation();
      const label = ic.dataset.title || ic.querySelector('.ios-icon__label')?.textContent || 'cette icône';
      if (confirm(`Supprimer "${label}" ?`)) {
        ic.remove();
        this._saveState();
        this._showToast('Icône supprimée', 1500);
      }
    });
    ic.appendChild(del);
  }

  /* ── Iframe edit ────────────────────────────── */
  _enableIframeEdit() {
    try {
      const doc = this.appWindow.iframe.contentDocument || this.appWindow.iframe.contentWindow.document;
      if (doc && doc.body) doc.body.contentEditable = 'true';
    } catch(_) {}
  }
  _disableIframeEdit() {
    try {
      const doc = this.appWindow.iframe.contentDocument || this.appWindow.iframe.contentWindow.document;
      if (doc && doc.body) doc.body.contentEditable = 'false';
    } catch(_) {}
  }

  /* ── Save icon order (silent) ───────────────── */
  _saveIconOrder() {
    const order = [];
    this.el.querySelectorAll('.ios-icon[data-url]').forEach(ic => {
      order.push({ url: ic.dataset.url, title: ic.dataset.title || ic.querySelector('.ios-icon__label')?.textContent });
    });
    localStorage.setItem('ios_admin_icon_order', JSON.stringify(order));
  }

  /* ── Save state ─────────────────────────────── */
  _saveState() {
    // Save icon order
    const order = [];
    this.el.querySelectorAll('.ios-icon[data-url]').forEach(ic => {
      order.push({ url: ic.dataset.url, title: ic.dataset.title || ic.querySelector('.ios-icon__label')?.textContent });
    });
    localStorage.setItem('ios_admin_icon_order', JSON.stringify(order));
    // Save edited page
    try {
      const iframe = this.appWindow.iframe;
      if (iframe && iframe.src && iframe.src !== 'about:blank') {
        const doc = iframe.contentDocument || iframe.contentWindow.document;
        if (doc) {
          const page = iframe.src.split('/').pop().split('?')[0];
          localStorage.setItem('admin_page_' + page, doc.documentElement.outerHTML);
        }
      }
    } catch(_) {}
    this._showToast('✅ Disposition sauvegardée', 2000);
  }

  /* ── Touch drag-to-reorder ──────────────────── */
  _initTouchDrag() {
    const page = this.el.querySelector('#ios-page-0');
    if (!page || page._hasTouchDrag) return;
    page._hasTouchDrag = true;

    let dragEl    = null;
    let ghost     = null;
    let offX = 0, offY = 0;
    let lpTimer   = null;
    let dragging  = false;
    let lpStartX  = 0, lpStartY = 0;

    const startDrag = (icon, touch) => {
      dragging = true;
      dragEl = icon;
      if (!this.isWiggling) this._startWiggle();
      const rect = icon.getBoundingClientRect();
      offX = touch.clientX - rect.left;
      offY = touch.clientY - rect.top;

      ghost = icon.cloneNode(true);
      ghost.className = 'ios-drag-ghost';
      ghost.querySelector('.ios-adm-del')?.remove();
      ghost.style.cssText = `
        position:fixed; z-index:9999; pointer-events:none;
        width:${rect.width}px; height:${rect.height}px;
        left:${rect.left}px; top:${rect.top}px;
        opacity:.88; transform:scale(1.14);
        border-radius:16px;
      `;
      document.body.appendChild(ghost);
      icon.style.opacity = '.25';
    };

    const moveGhost = touch => {
      if (!ghost) return;
      ghost.style.left = (touch.clientX - offX) + 'px';
      ghost.style.top  = (touch.clientY - offY) + 'px';

      // Highlight target
      ghost.style.display = 'none';
      const el = document.elementFromPoint(touch.clientX, touch.clientY);
      ghost.style.display = '';
      const target = el?.closest('.ios-icon');
      page.querySelectorAll('.ios-icon').forEach(ic => ic.classList.remove('ios-drag-target'));
      if (target && target !== dragEl) target.classList.add('ios-drag-target');
    };

    const endDrag = touch => {
      if (!dragging || !dragEl) return;
      dragging = false;

      ghost.style.display = 'none';
      const el = document.elementFromPoint(touch.clientX, touch.clientY);
      ghost.style.display = '';
      const target = el?.closest('.ios-icon');

      if (target && target !== dragEl && target.parentNode === page) {
        const all = Array.from(page.querySelectorAll('.ios-icon'));
        const si  = all.indexOf(dragEl);
        const ti  = all.indexOf(target);
        if (si > -1 && ti > -1) {
          if (si < ti) page.insertBefore(dragEl, target.nextSibling);
          else         page.insertBefore(dragEl, target);
        }
      }

      page.querySelectorAll('.ios-icon').forEach(ic => ic.classList.remove('ios-drag-target'));
      dragEl.style.opacity = '';
      ghost.remove(); ghost = null; dragEl = null;
      this._justDragged = true;
      setTimeout(() => { this._justDragged = false; }, 300);
      this._saveIconOrder();
    };

    page.addEventListener('touchstart', e => {
      const icon = e.target.closest('.ios-icon');
      if (!icon || e.target.closest('.ios-adm-del')) return;
      const touch = e.changedTouches[0];
      clearTimeout(lpTimer);
      lpStartX = touch.clientX; lpStartY = touch.clientY;
      // Shorter delay when already wiggling/admin, normal delay otherwise
      const delay = (this.isWiggling || this.isAdmin) ? 180 : 500;
      lpTimer = setTimeout(() => startDrag(icon, touch), delay);
    }, { passive: true });

    page.addEventListener('touchmove', e => {
      if (dragging) {
        e.preventDefault();
        moveGhost(e.changedTouches[0]);
      } else {
        // Only cancel long-press timer if finger moved significantly (>10px)
        const t = e.changedTouches[0];
        if (Math.abs(t.clientX - lpStartX) > 10 || Math.abs(t.clientY - lpStartY) > 10) {
          clearTimeout(lpTimer);
        }
      }
    }, { passive: false });

    page.addEventListener('touchend', e => {
      clearTimeout(lpTimer);
      if (dragging) endDrag(e.changedTouches[0]);
    }, { passive: true });

    page.addEventListener('touchcancel', () => {
      clearTimeout(lpTimer);
      if (ghost) { ghost.remove(); ghost = null; }
      if (dragEl) { dragEl.style.opacity = ''; dragEl = null; }
      dragging = false;
      page.querySelectorAll('.ios-icon').forEach(ic => ic.classList.remove('ios-drag-target'));
    }, { passive: true });
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
      /* ignore click right after a drag ended */
      if (this._justDragged) { this._justDragged = false; return; }
      /* stop wiggle first */
      if (this.isWiggling) { this._stopWiggle(); return; }

      const icon = e.target.closest('.ios-icon');
      if (!icon) return;

      // Admin icon → show login (or toast if already logged in)
      if (icon.dataset.id === 'admin') {
        if (this.isAdmin) {
          this._showToast('🔑 Déjà connecté en mode Admin', 1500);
        } else {
          const m = this._adminModal;
          m.querySelector('#ios-adm-user').value = '';
          m.querySelector('#ios-adm-pass').value = '';
          m.querySelector('#ios-adm-error').style.display = 'none';
          m.classList.add('ios-adm-show');
          setTimeout(() => m.querySelector('#ios-adm-user').focus(), 100);
        }
        return;
      }

      const url   = icon.dataset.url;
      const title = icon.dataset.title;
      if (!url) return;

      const imgEl = icon.querySelector('.ios-icon__img');
      const rect  = imgEl ? imgEl.getBoundingClientRect() : null;
      this.appWindow.open(url, title, rect);
      // Re-enable edit mode if active
      if (this.editModeOn) setTimeout(() => this._enableIframeEdit(), 500);
    });

    /* Long press → wiggle (500ms) — works always, drag takes over at 500ms */
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
