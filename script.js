/* ============================================================
   PORTFOLIO BTS SIO SISR — Reda Bouali
   script.js — Navigation, animations, interactions
   ============================================================ */

/* ---- Sélection des éléments DOM ---- */
const navbar    = document.getElementById('navbar');
const navMenu   = document.getElementById('navMenu');
const navToggle = document.getElementById('navToggle');
const navLinks  = document.querySelectorAll('.nav-link');

/* ============================================================
   1. EFFET DE SCROLL SUR LA NAVBAR
   Ajoute la classe "scrolled" pour renforcer le fond flouté
   ============================================================ */
function handleNavbarScroll() {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNavLink();
}

window.addEventListener('scroll', handleNavbarScroll, { passive: true });

/* ============================================================
   2. MENU BURGER (MOBILE)
   Toggle du menu + animation hamburger → croix
   ============================================================ */
navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  const spans  = navToggle.querySelectorAll('span');

  // Anime le burger en croix
  spans[0].style.transform  = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
  spans[1].style.opacity    = isOpen ? '0' : '1';
  spans[2].style.transform  = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';

  // Accessibilité
  navToggle.setAttribute('aria-expanded', isOpen);
});

/* Ferme le menu mobile quand on clique sur un lien */
navLinks.forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

function closeMobileMenu() {
  navMenu.classList.remove('open');
  const spans = navToggle.querySelectorAll('span');
  spans[0].style.transform = '';
  spans[1].style.opacity   = '1';
  spans[2].style.transform = '';
  navToggle.setAttribute('aria-expanded', false);
}

/* ============================================================
   3. LIEN ACTIF DANS LA NAVIGATION
   Met en surbrillance la section actuellement visible
   ============================================================ */
function updateActiveNavLink() {
  const sections      = document.querySelectorAll('section[id]');
  const scrollPos     = window.scrollY + 100; // offset pour la navbar fixe

  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');

    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

/* ============================================================
   4. SCROLL FLUIDE POUR LES LIENS ANCRES
   Compense la hauteur de la navbar fixe
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetSelector = this.getAttribute('href');
    if (targetSelector === '#') return;

    const target = document.querySelector(targetSelector);
    if (!target) return;

    e.preventDefault();
    const offset = target.offsetTop - 80; // hauteur navbar + marge
    window.scrollTo({ top: offset, behavior: 'smooth' });
  });
});

/* ============================================================
   5. ANIMATIONS AU DÉFILEMENT — IntersectionObserver
   Applique la classe "reveal" + décalages aux éléments clés,
   puis les anime à "visible" lorsqu'ils entrent dans la vue.
   ============================================================ */

// Sélecteurs des éléments à animer
const ANIMATED_SELECTORS = [
  '.about-card',
  '.timeline-item',
  '.exp-card',
  '.skills-category',
  '.bts-card',
  '.pix-domain',
  '.section-title',
  '.section-subtitle',
  '.pix-cert-box',
  '.cv-download',
];

// Configuration de l'observateur
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // animation unique
      }
    });
  },
  {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px',
  }
);

/* Ajoute les classes reveal et observe les éléments au chargement */
function initRevealAnimations() {
  ANIMATED_SELECTORS.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, index) => {
      // Évite de ré-appliquer sur des éléments déjà observés
      if (el.classList.contains('reveal')) return;

      el.classList.add('reveal');

      // Décalage progressif dans les groupes (max 4)
      const delay = index % 4;
      if (delay > 0) {
        el.classList.add(`reveal-delay-${delay}`);
      }

      revealObserver.observe(el);
    });
  });
}

/* ============================================================
   6. HOVER COLORÉ SUR LES CARTES BTS SIO
   La bordure prend la couleur de la compétence au survol
   ============================================================ */
const BTS_COLORS = {
  'b1-1': '#58a6ff',
  'b1-2': '#f0883e',
  'b1-3': '#bc8cff',
  'b1-4': '#3fb950',
  'b1-5': '#39c5cf',
  'b1-6': '#f778ba',
};

function initBtsCardHover() {
  document.querySelectorAll('.bts-card').forEach(card => {
    const competence = card.dataset.competence;
    const color      = BTS_COLORS[competence];
    if (!color) return;

    card.addEventListener('mouseenter', () => {
      card.style.borderColor = color;
      card.style.boxShadow   = `0 8px 32px ${color}22`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.borderColor = '';
      card.style.boxShadow   = '';
    });
  });
}

/* ============================================================
   7. ANIMATION PROGRESSIVE DU HERO TECH-STACK
   Chaque badge apparaît avec un léger décalage
   ============================================================ */
function initHeroTechStack() {
  document.querySelectorAll('.tech-item').forEach((item, i) => {
    item.style.opacity         = '0';
    item.style.transform       = 'translateY(10px)';
    item.style.transition      = 'opacity 0.4s ease, transform 0.4s ease';
    item.style.transitionDelay = `${0.5 + i * 0.08}s`;

    // Force le reflow pour activer la transition
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        item.style.opacity   = '1';
        item.style.transform = 'translateY(0)';
      });
    });
  });
}

/* ============================================================
   8. FERMETURE DU MENU MOBILE AU CLIC EN DEHORS
   ============================================================ */
document.addEventListener('click', (e) => {
  if (
    navMenu.classList.contains('open') &&
    !navMenu.contains(e.target) &&
    !navToggle.contains(e.target)
  ) {
    closeMobileMenu();
  }
});

/* ============================================================
   INITIALISATION AU CHARGEMENT DE LA PAGE
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initRevealAnimations();
  initBtsCardHover();
  initHeroTechStack();
  updateActiveNavLink(); // état initial du lien actif
});
