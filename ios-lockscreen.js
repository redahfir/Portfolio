'use strict';

/* ════════════════════════════════════════════════
   Lock Screen — iOS faithful reproduction
════════════════════════════════════════════════ */
class LockScreen {
  constructor(wrapper, onUnlock) {
    this.wrapper   = wrapper;
    this.onUnlock  = onUnlock;
    this.el        = null;
    this.clockInt  = null;
    this.touchStartY = 0;
    this._build();
    this._bindEvents();
    this._tick();
    this.clockInt = setInterval(() => this._tick(), 1000);
  }

  /* ── DOM ─────────────────────────────────────── */
  _build() {
    const el = document.createElement('div');
    el.className = 'ios-lockscreen';
    el.innerHTML = `
      <div class="ios-ls-top">
        <div class="ios-ls-time" id="ios-ls-time">00:00</div>
        <div class="ios-ls-date" id="ios-ls-date">Vendredi 13 mars</div>
      </div>
      <div class="ios-ls-lock">🔒</div>
      <div class="ios-ls-bottom">
        <div class="ios-ls-hint">Balayer vers le haut pour déverrouiller</div>
        <div class="ios-ls-chevron">↑</div>
      </div>
    `;
    this.wrapper.appendChild(el);
    this.el = el;
  }

  /* ── Clock ───────────────────────────────────── */
  _tick() {
    const now    = new Date();
    const h      = String(now.getHours()).padStart(2, '0');
    const m      = String(now.getMinutes()).padStart(2, '0');
    const DAYS   = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
    const MONTHS = ['janvier','février','mars','avril','mai','juin',
                    'juillet','août','septembre','octobre','novembre','décembre'];
    const tEl = document.getElementById('ios-ls-time');
    const dEl = document.getElementById('ios-ls-date');
    if (tEl) tEl.textContent = h + ':' + m;
    if (dEl) dEl.textContent = DAYS[now.getDay()] + ' ' + now.getDate() + ' ' + MONTHS[now.getMonth()];
  }

  /* ── Events ──────────────────────────────────── */
  _bindEvents() {
    // Touch : swipe up >50px
    this.el.addEventListener('touchstart', (e) => {
      this.touchStartY = e.changedTouches[0].clientY;
    }, { passive: true });

    this.el.addEventListener('touchend', (e) => {
      const dy = this.touchStartY - e.changedTouches[0].clientY;
      if (dy > 50) this.unlock();
    }, { passive: true });

    // Click / tap anywhere
    this.el.addEventListener('click', () => this.unlock());
  }

  /* ── Public ──────────────────────────────────── */
  show() {
    this.el.style.display = 'flex';
  }

  unlock() {
    if (this._unlocking) return;
    this._unlocking = true;
    clearInterval(this.clockInt);
    this.el.classList.add('ios-unlocking');
    setTimeout(() => {
      this.el.style.display = 'none';
      if (this.onUnlock) this.onUnlock();
    }, 400);
  }

  destroy() {
    clearInterval(this.clockInt);
    if (this.el && this.el.parentNode) this.el.parentNode.removeChild(this.el);
  }
}

window.LockScreen = LockScreen;
