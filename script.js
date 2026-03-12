/* ============================================================
   Portfolio iOS/macOS — script.js
   Reda Bouali | BTS SIO SISR
   ============================================================ */

(function () {
  'use strict';

  /* ── 1. THEME / ACCENT / FONT PERSISTENCE ──────────────── */
  const root = document.documentElement;

  const defaults = {
    theme: 'light',
    accent: 'indigo',
    size: 'md',
    font: 'sf'
  };

  function loadPrefs() {
    const theme  = localStorage.getItem('theme')  || defaults.theme;
    const accent = localStorage.getItem('accent') || defaults.accent;
    const size   = localStorage.getItem('size')   || defaults.size;
    const font   = localStorage.getItem('font')   || defaults.font;

    root.setAttribute('data-theme',  theme);
    root.setAttribute('data-accent', accent);
    root.setAttribute('data-size',   size);
    root.setAttribute('data-font',   font);

    syncUI(theme, accent, size, font);
  }

  function syncUI(theme, accent, size, font) {
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';

    document.querySelectorAll('[data-set-accent]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.setAccent === accent);
    });
    document.querySelectorAll('[data-set-size]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.setSize === size);
    });
    document.querySelectorAll('[data-set-font]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.setFont === font);
    });
  }

  /* apply immediately to avoid flash */
  loadPrefs();

  /* ── 2. DOM READY ───────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {

    /* re-sync UI now that DOM elements exist */
    syncUI(
      root.getAttribute('data-theme'),
      root.getAttribute('data-accent'),
      root.getAttribute('data-size'),
      root.getAttribute('data-font')
    );

    /* ── 2.1 THEME TOGGLE ─────────────────────────────────── */
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        syncUI(next, root.getAttribute('data-accent'),
               root.getAttribute('data-size'), root.getAttribute('data-font'));
        springPop(themeBtn);
      });
    }

    /* ── 2.2 SETTINGS PANEL ───────────────────────────────── */
    const settingsBtn   = document.getElementById('settings-btn');
    const settingsPanel = document.getElementById('settings-panel');
    const settingsClose = document.getElementById('settings-close');

    function openSettings() {
      if (!settingsPanel) return;
      settingsPanel.classList.add('open');
      settingsPanel.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
    function closeSettings() {
      if (!settingsPanel) return;
      settingsPanel.classList.remove('open');
      settingsPanel.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    if (settingsBtn) settingsBtn.addEventListener('click', () => {
      springPop(settingsBtn);
      setTimeout(openSettings, 60);
    });
    if (settingsClose) settingsClose.addEventListener('click', closeSettings);

    document.addEventListener('click', e => {
      if (settingsPanel && settingsPanel.classList.contains('open') &&
          !settingsPanel.contains(e.target) && e.target !== settingsBtn) {
        closeSettings();
      }
    });

    /* Accent pickers */
    document.querySelectorAll('[data-set-accent]').forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.dataset.setAccent;
        root.setAttribute('data-accent', val);
        localStorage.setItem('accent', val);
        syncUI(root.getAttribute('data-theme'), val,
               root.getAttribute('data-size'), root.getAttribute('data-font'));
        springPop(btn);
      });
    });

    /* Size pickers */
    document.querySelectorAll('[data-set-size]').forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.dataset.setSize;
        root.setAttribute('data-size', val);
        localStorage.setItem('size', val);
        syncUI(root.getAttribute('data-theme'), root.getAttribute('data-accent'),
               val, root.getAttribute('data-font'));
        springPop(btn);
      });
    });

    /* Font pickers */
    document.querySelectorAll('[data-set-font]').forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.dataset.setFont;
        root.setAttribute('data-font', val);
        localStorage.setItem('font', val);
        syncUI(root.getAttribute('data-theme'), root.getAttribute('data-accent'),
               root.getAttribute('data-size'), val);
        springPop(btn);
      });
    });

    /* ── 2.3 MOBILE NAV BURGER ────────────────────────────── */
    const burger  = document.getElementById('nav-burger');
    const navMenu = document.getElementById('nav-menu');

    if (burger && navMenu) {
      burger.addEventListener('click', () => {
        const open = navMenu.classList.toggle('open');
        burger.classList.toggle('open', open);
        burger.setAttribute('aria-expanded', String(open));
        document.body.style.overflow = open ? 'hidden' : '';
      });

      navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('open');
          burger.classList.remove('open');
          burger.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        });
      });

      document.addEventListener('click', e => {
        if (navMenu.classList.contains('open') &&
            !navMenu.contains(e.target) && e.target !== burger) {
          navMenu.classList.remove('open');
          burger.classList.remove('open');
          burger.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });
    }

    /* ── 2.4 NAVBAR SCROLL CLASS ──────────────────────────── */
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 20);
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    /* ── 2.5 SCROLL-REVEAL ────────────────────────────────── */
    if ('IntersectionObserver' in window) {
      const revealObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

      document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));
    } else {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    }

    /* ── 2.6 LEVEL BARS ───────────────────────────────────── */
    if ('IntersectionObserver' in window) {
      const levelObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const bar = entry.target;
            bar.style.setProperty('--level', (bar.dataset.level || '0') + '%');
            bar.classList.add('animated');
            levelObs.unobserve(bar);
          }
        });
      }, { threshold: 0.4 });

      document.querySelectorAll('.level-bar').forEach(bar => {
        bar.style.setProperty('--level', '0%');
        levelObs.observe(bar);
      });
    }

    /* ── 2.7 BACK-TO-TOP ──────────────────────────────────── */
    const bttBtn = document.getElementById('back-to-top');
    if (bttBtn) {
      window.addEventListener('scroll', () => {
        bttBtn.classList.toggle('visible', window.scrollY > 400);
      }, { passive: true });

      bttBtn.addEventListener('click', () => {
        springPop(bttBtn);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    /* ── 2.8 ACTIVE NAV LINK ──────────────────────────────── */
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = (link.getAttribute('href') || '').split('/').pop();
      link.classList.toggle('active',
        href === currentPage || (currentPage === '' && href === 'index.html'));
    });

    /* ── 2.9 COUNTER ANIMATION ────────────────────────────── */
    if ('IntersectionObserver' in window) {
      const counterObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });

      document.querySelectorAll('[data-count]').forEach(el => counterObs.observe(el));
    }

    /* ── 2.10 TABS ────────────────────────────────────────── */
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const group = btn.closest('.tabs-container');
        if (!group) return;
        const target = btn.dataset.tab;

        group.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        group.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const panel = group.querySelector(`[data-panel="${target}"]`);
        if (panel) { panel.classList.add('active'); springPop(panel, 1.02); }
      });
    });

    /* ── 2.11 ACCORDION ───────────────────────────────────── */
    document.querySelectorAll('.accordion-trigger').forEach(trigger => {
      trigger.addEventListener('click', () => {
        const item   = trigger.closest('.accordion-item');
        const isOpen = item.classList.contains('open');
        const list   = trigger.closest('.accordion-list');

        list?.querySelectorAll('.accordion-item').forEach(i => {
          i.classList.remove('open');
          const b = i.querySelector('.accordion-body');
          if (b) b.style.maxHeight = '0';
        });

        if (!isOpen) {
          item.classList.add('open');
          const body = item.querySelector('.accordion-body');
          if (body) body.style.maxHeight = body.scrollHeight + 'px';
        }
      });
    });

    /* ── 2.12 SMOOTH ANCHOR SCROLL ────────────────────────── */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', e => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    /* ── 2.13 STAGGER GRIDS ───────────────────────────────── */
    document.querySelectorAll('.stagger-grid').forEach(grid => {
      Array.from(grid.children).forEach((child, i) => {
        child.style.transitionDelay = `${i * 55}ms`;
        child.classList.add('reveal');
      });
      if ('IntersectionObserver' in window) {
        const obs = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
              obs.unobserve(entry.target);
            }
          });
        }, { threshold: 0.05 });
        obs.observe(grid);
      }
    });

    /* ── 2.14 DYNAMIC ISLAND PILL ─────────────────────────── */
    const island = document.querySelector('.dynamic-island');
    if (island) {
      setTimeout(() => island.classList.add('expanded'), 700);
      setTimeout(() => island.classList.remove('expanded'), 2600);
    }

    /* ── 2.15 CARD HOVER SPRING ───────────────────────────── */
    document.querySelectorAll('.ios-card, .project-card, .bts-card, .e5-card').forEach(card => {
      card.addEventListener('mouseenter', () => applyLift(card, true));
      card.addEventListener('mouseleave', () => applyLift(card, false));
    });

  }); /* end DOMContentLoaded */

  /* ── 3. UTILITIES ───────────────────────────────────────── */

  function springPop(el, scale) {
    if (!el || prefersReducedMotion()) return;
    const s = scale !== undefined ? scale : 1.06;
    el.style.transition = 'transform 0.38s cubic-bezier(0.34,1.56,0.64,1)';
    el.style.transform  = `scale(${s})`;
    if (s !== 1) setTimeout(() => { el.style.transform = 'scale(1)'; }, 380);
  }

  function applyLift(el, active) {
    if (prefersReducedMotion()) return;
    el.style.transition = active
      ? 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease'
      : 'transform 0.25s ease, box-shadow 0.25s ease';
    el.style.transform  = active ? 'translateY(-4px) scale(1.015)' : '';
    el.style.boxShadow  = active ? '' : '';
  }

  function animateCounter(el) {
    const end      = parseFloat(el.dataset.count);
    const suffix   = el.dataset.suffix || '';
    const duration = 1100;
    const startTs  = performance.now();

    function step(now) {
      const t = Math.min((now - startTs) / duration, 1);
      const e = 1 - Math.pow(1 - t, 4); /* ease-out-quart */
      const v = end * e;
      el.textContent = (Number.isInteger(end) ? Math.round(v) : v.toFixed(1)) + suffix;
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  window.portfolioUtils = { springPop, animateCounter };

})();
