/* ============================================================
   Portfolio Reda Bouali - Main Script
   Theme, navigation, settings, animations
   ============================================================ */

const root = document.documentElement;
const navbar = document.getElementById("navbar");
const navToggle = document.getElementById("navToggle");
const navPanel = document.getElementById("navPanel");
const navLinks = [...document.querySelectorAll(".nav-link")];
const settingsTrigger = document.getElementById("settingsTrigger");
const settingsPanel = document.getElementById("settingsPanel");
const settingsOverlay = document.getElementById("settingsOverlay");
const settingsClose = document.getElementById("settingsClose");
const settingsReset = document.getElementById("settingsReset");
const quickThemeToggle = document.getElementById("quickThemeToggle");
const backToTop = document.getElementById("backToTop");

const currentPage = window.location.pathname.split("/").pop() || "index.html";
const currentPageKey = currentPage.replace(".html", "");

const STORAGE_KEYS = {
  theme: "rb-theme",
  accent: "rb-accent",
  font: "rb-font",
  size: "rb-size"
};

/* --- Preferences --- */
function setPreference(attribute, value, storageKey) {
  root.setAttribute(attribute, value);
  localStorage.setItem(storageKey, value);
  syncControls();
}

function syncControls() {
  const theme = root.getAttribute("data-theme");
  const accent = root.getAttribute("data-accent");
  const font = root.getAttribute("data-font");
  const size = root.getAttribute("data-size");

  document.querySelectorAll(".choice-button[data-theme]").forEach(function (btn) {
    btn.classList.toggle("is-active", btn.dataset.theme === theme);
  });
  document.querySelectorAll(".accent-button[data-accent]").forEach(function (btn) {
    btn.classList.toggle("is-active", btn.dataset.accent === accent);
  });
  document.querySelectorAll(".font-button[data-font]").forEach(function (btn) {
    btn.classList.toggle("is-active", btn.dataset.font === font);
  });
  document.querySelectorAll(".choice-button[data-size]").forEach(function (btn) {
    btn.classList.toggle("is-active", btn.dataset.size === size);
  });

  if (quickThemeToggle) {
    quickThemeToggle.setAttribute("aria-pressed", String(theme === "light"));
  }
}

function resetPreferences() {
  setPreference("data-theme", "dark", STORAGE_KEYS.theme);
  setPreference("data-accent", "indigo", STORAGE_KEYS.accent);
  setPreference("data-font", "inter", STORAGE_KEYS.font);
  setPreference("data-size", "medium", STORAGE_KEYS.size);
}

function toggleThemeQuickly() {
  var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  setPreference("data-theme", next, STORAGE_KEYS.theme);
}

/* --- Mobile Menu --- */
function openMenu() {
  navPanel.classList.add("open");
  navToggle.classList.add("open");
  navToggle.setAttribute("aria-expanded", "true");
}

function closeMenu() {
  navPanel.classList.remove("open");
  navToggle.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
}

function toggleMenu() {
  navPanel.classList.contains("open") ? closeMenu() : openMenu();
}

/* --- Settings Panel --- */
function openSettings() {
  settingsPanel.classList.add("open");
  settingsPanel.setAttribute("aria-hidden", "false");
  settingsOverlay.hidden = false;
  requestAnimationFrame(function () {
    settingsOverlay.classList.add("visible");
  });
  settingsTrigger.setAttribute("aria-expanded", "true");
}

function closeSettings() {
  settingsPanel.classList.remove("open");
  settingsPanel.setAttribute("aria-hidden", "true");
  settingsOverlay.classList.remove("visible");
  settingsTrigger.setAttribute("aria-expanded", "false");
  setTimeout(function () {
    if (!settingsPanel.classList.contains("open")) {
      settingsOverlay.hidden = true;
    }
  }, 400);
}

/* --- Scroll State --- */
function handleScrollState() {
  if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 16);
  if (backToTop) backToTop.classList.toggle("visible", window.scrollY > 400);
}

/* --- Active Link --- */
function updateActiveLink() {
  navLinks.forEach(function (link) {
    link.classList.toggle("active", link.dataset.page === currentPageKey);
  });
}

/* --- Smooth Anchor Navigation --- */
function smoothAnchorNavigation(event) {
  var href = event.currentTarget.getAttribute("href");
  if (!href || !href.startsWith("#")) return;
  var target = document.querySelector(href);
  if (!target) return;
  event.preventDefault();
  var y = target.getBoundingClientRect().top + window.scrollY - 88;
  window.scrollTo({ top: y, behavior: "smooth" });
  closeMenu();
}

/* --- Reveal on Scroll --- */
var revealObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
);

function initReveal() {
  document.querySelectorAll(".reveal").forEach(function (el) {
    revealObserver.observe(el);
  });
}

/* --- Animated Skill Bars --- */
var barObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated");
        barObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

function initBars() {
  document.querySelectorAll(".level-bar").forEach(function (bar) {
    var span = bar.querySelector("span");
    if (span && span.style.width) {
      bar.style.setProperty("--bar-width", span.style.width);
      span.style.width = "";
    }
    barObserver.observe(bar);
  });
}

/* --- Bind Events --- */
if (navToggle) navToggle.addEventListener("click", toggleMenu);
if (settingsTrigger) settingsTrigger.addEventListener("click", openSettings);
if (settingsClose) settingsClose.addEventListener("click", closeSettings);
if (settingsOverlay) settingsOverlay.addEventListener("click", closeSettings);
if (settingsReset) settingsReset.addEventListener("click", resetPreferences);
if (quickThemeToggle) quickThemeToggle.addEventListener("click", toggleThemeQuickly);
if (backToTop) backToTop.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

navLinks.forEach(function (link) {
  link.addEventListener("click", smoothAnchorNavigation);
});
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
  if (!link.classList.contains("nav-link")) {
    link.addEventListener("click", smoothAnchorNavigation);
  }
});

document.querySelectorAll(".choice-button[data-theme]").forEach(function (btn) {
  btn.addEventListener("click", function () { setPreference("data-theme", btn.dataset.theme, STORAGE_KEYS.theme); });
});
document.querySelectorAll(".accent-button[data-accent]").forEach(function (btn) {
  btn.addEventListener("click", function () { setPreference("data-accent", btn.dataset.accent, STORAGE_KEYS.accent); });
});
document.querySelectorAll(".font-button[data-font]").forEach(function (btn) {
  btn.addEventListener("click", function () { setPreference("data-font", btn.dataset.font, STORAGE_KEYS.font); });
});
document.querySelectorAll(".choice-button[data-size]").forEach(function (btn) {
  btn.addEventListener("click", function () { setPreference("data-size", btn.dataset.size, STORAGE_KEYS.size); });
});

document.addEventListener("click", function (event) {
  if (
    navPanel && navPanel.classList.contains("open") &&
    !navPanel.contains(event.target) &&
    !navToggle.contains(event.target)
  ) {
    closeMenu();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeMenu();
    closeSettings();
  }
});

window.addEventListener("scroll", handleScrollState, { passive: true });
window.addEventListener("resize", function () {
  if (window.innerWidth > 860) closeMenu();
});

/* --- Init on DOM Ready --- */
document.addEventListener("DOMContentLoaded", function () {
  root.classList.remove("preload");
  syncControls();
  handleScrollState();
  updateActiveLink();
  initReveal();
  initBars();
});
