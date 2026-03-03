// =============================================
//  PORTFOLIO CONTENT – BTS SIO SLAM
//  Personnalise ce fichier avec tes vraies infos
// =============================================

const CONTENT = {

  // ── INFOS PERSONNELLES ──────────────────────
  about: {
    name:      "Alex Dupont",
    title:     "Étudiant BTS SIO SLAM",
    school:    "Lycée Pierre de Fermat, Toulouse",
    period:    "2024 – 2026",
    age:       "20 ans",
    city:      "Toulouse, France",
    bio:       "Passionné de développement web et mobile, je suis en 2ème année de BTS SIO option SLAM. J'aime créer des applications utiles, apprendre de nouvelles technos et relever des défis techniques.",
    hobbies:   "Gaming · Musique · Open Source",
    portrait:  "🧑‍💻",
    cv:        "#"  // lien vers ton CV PDF
  },

  // ── COMPÉTENCES ────────────────────────────
  skills: {
    "Langages Web": [
      { name: "HTML / CSS",   level: 90, label: "Confirmé" },
      { name: "JavaScript",   level: 80, label: "Avancé"   },
      { name: "PHP",          level: 75, label: "Avancé"   },
      { name: "Python",       level: 65, label: "Intermédiaire" },
      { name: "Java",         level: 55, label: "Intermédiaire" },
    ],
    "Frameworks & Libs": [
      { name: "Symfony",      level: 70, label: "Avancé"   },
      { name: "React",        level: 60, label: "Intermédiaire" },
      { name: "Node.js",      level: 55, label: "Intermédiaire" },
      { name: "Bootstrap",    level: 85, label: "Confirmé" },
    ],
    "Bases de données": [
      { name: "MySQL",        level: 80, label: "Avancé"   },
      { name: "PostgreSQL",   level: 60, label: "Intermédiaire" },
      { name: "MongoDB",      level: 45, label: "Débutant"  },
    ],
    "Outils & DevOps": [
      { name: "Git / GitHub", level: 80, label: "Avancé"   },
      { name: "Docker",       level: 50, label: "Intermédiaire" },
      { name: "VS Code",      level: 90, label: "Expert"   },
      { name: "Linux / CLI",  level: 65, label: "Avancé"   },
    ]
  },

  // ── PROJETS ────────────────────────────────
  projects: [
    {
      id: "p1",
      title:   "GestStock",
      emoji:   "📦",
      type:    "Application Web (E4)",
      desc:    "Application de gestion de stock pour une PME. Interface admin avec tableau de bord, gestion des produits, alertes de réapprovisionnement et export CSV/PDF.",
      tags:    ["PHP", "Symfony", "MySQL", "Bootstrap", "Twig"],
      github:  "#",
      demo:    "#",
      long:    "Développé dans le cadre d'un stage, GestStock permet à une PME de gérer son inventaire en temps réel. L'application inclut un système d'authentification avec rôles, un CRUD complet sur les produits et fournisseurs, des graphiques de tendance et un module d'export.",
    },
    {
      id: "p2",
      title:   "TaskFlow",
      emoji:   "✅",
      type:    "Application Web (Projet Personnel)",
      desc:    "Gestionnaire de tâches collaboratif en temps réel avec drag & drop, étiquettes, assignation de membres et notifications.",
      tags:    ["React", "Node.js", "Socket.io", "MongoDB"],
      github:  "#",
      demo:    "#",
      long:    "TaskFlow est inspiré de Trello. Il utilise Socket.io pour synchroniser l'état des tableaux en temps réel entre utilisateurs. Le back-end expose une API REST documentée avec Swagger.",
    },
    {
      id: "p3",
      title:   "QuizMaster",
      emoji:   "🧠",
      type:    "Application Mobile (E5)",
      desc:    "Application mobile de quiz personnalisables. Création de quiz, système de score, classements et partage via QR code.",
      tags:    ["React Native", "Expo", "SQLite", "REST API"],
      github:  "#",
      demo:    "#",
      long:    "Développé en duo, QuizMaster cible les enseignants et formateurs. L'app fonctionne offline grâce à SQLite et synchronise les données quand la connexion est rétablie.",
    },
    {
      id: "p4",
      title:   "Portfolio RPG",
      emoji:   "🎮",
      type:    "Site Portfolio (Perso)",
      desc:    "Ce portfolio sous forme de jeu RPG rétro ! Navigation interactive, tilemap personnalisée, système de dialogues.",
      tags:    ["HTML", "CSS", "JavaScript", "Canvas API"],
      github:  "#",
      demo:    "#",
      long:    "Projet de portfolio original réalisé entièrement en Vanilla JS. Utilise la Canvas API pour le rendu du tilemap et du sprite, avec un système de scènes, de collisions et de dialogues.",
    },
  ],

  // ── CONTACT ────────────────────────────────
  contact: {
    email:    "alex.dupont@email.com",
    linkedin: "linkedin.com/in/alex-dupont",
    github:   "github.com/alex-dupont",
    discord:  "alexdev#0042",
    location: "Toulouse, France",
  },

  // ── DIALOGUES DES PNJ (carte) ───────────────
  npcs: {
    welcome: {
      portrait: "👾",
      title: "GUIDE",
      lines: [
        "Bienvenue dans mon portfolio interactif !",
        "Déplace-toi avec les flèches ou ZQSD.",
        "Approche-toi d'un portail et appuie sur E pour l'ouvrir.",
        "Bonne exploration ! 🎮"
      ]
    },
    about_door: {
      portrait: "🚪",
      title: "PORTAIL · PROFIL",
      lines: ["Entrer dans la zone Profil ?"]
    },
    skills_door: {
      portrait: "🚪",
      title: "PORTAIL · COMPÉTENCES",
      lines: ["Entrer dans la zone Compétences ?"]
    },
    projects_door: {
      portrait: "🚪",
      title: "PORTAIL · PROJETS",
      lines: ["Entrer dans la zone Projets ?"]
    },
    contact_door: {
      portrait: "🚪",
      title: "PORTAIL · CONTACT",
      lines: ["Entrer dans la zone Contact ?"]
    },
  }
};
