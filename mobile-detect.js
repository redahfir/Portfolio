/* ════════════════════════════════════════════════════════════
   mobile-detect.js — Détection device + chargement iOS
   Chargé en premier dans index.html, injecte l'interface
   iOS dynamiquement si appareil mobile détecté.
   NE MODIFIE PAS le code macOS existant.
════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var isMobile =
    /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
    window.innerWidth < 768;

  if (!isMobile) return; /* Desktop → interface macOS inchangée */

  /* ── Helpers de chargement ────────────────── */
  function loadCSS(href) {
    return new Promise(function (resolve) {
      var link = document.createElement('link');
      link.rel  = 'stylesheet';
      link.href = href;
      link.onload  = resolve;
      link.onerror = resolve; /* fail silently */
      document.head.appendChild(link);
    });
  }

  function loadJS(src) {
    return new Promise(function (resolve) {
      var s = document.createElement('script');
      s.src     = src;
      s.onload  = resolve;
      s.onerror = resolve;
      document.head.appendChild(s);
    });
  }

  /* ── Boot séquentiel ──────────────────────── */
  function boot() {
    loadCSS('ios-styles.css')
      .then(function () { return loadJS('ios-lockscreen.js'); })
      .then(function () { return loadJS('ios-interface.js'); })
      .then(function () {
        if (typeof window.initIOSInterface === 'function') {
          window.initIOSInterface();
        }
      });
  }

  /* Attendre le DOM si nécessaire */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();
