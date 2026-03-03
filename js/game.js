// =============================================
//  GAME ENGINE – RPG PORTFOLIO
//  BTS SIO SLAM
// =============================================

const TILE   = 40;          // taille d'une tile en px
const COLS   = 20;          // largeur de la map (en tiles)
const ROWS   = 12;          // hauteur de la map (en tiles)
const SPEED  = 3;           // pixels par frame

// ── COULEURS TILES ──────────────────────────
const C = {
  floor:      "#0d1525",
  floor2:     "#0f1a2e",
  wall:       "#1a2a4a",
  wall_top:   "#243660",
  path:       "#162240",
  grass:      "#0a1f10",
  grass2:     "#0c2512",
  water:      "#0a1a30",
  water2:     "#0d2040",
  door_about:   "#00ff9d",
  door_skills:  "#b44dff",
  door_proj:    "#ffe566",
  door_contact: "#00d4ff",
  portal_glow:  "rgba(0,255,157,0.15)",
};

// ── TILES ───────────────────────────────────
// 0=floor, 1=wall, 2=path, 3=grass, 4=water,
// 10=door_about, 11=door_skills, 12=door_proj, 13=door_contact
// 20=tree, 21=sign

const HUB_MAP = [
//  0   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16  17  18  19
  [ 1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1], // 0
  [ 1,  3,  3,  3,  3,  3,  1,  3,  3,  3,  3,  3,  3,  1,  3,  3,  3,  3,  3,  1], // 1
  [ 1,  3, 10,  3,  3,  3,  1,  3, 21,  3,  3,  3,  3,  1,  3,  3, 11,  3,  3,  1], // 2
  [ 1,  3,  3,  3,  3,  3,  1,  3,  3,  3,  3,  3,  3,  1,  3,  3,  3,  3,  3,  1], // 3
  [ 1,  3,  3,  3,  3,  3,  1,  3,  3,  3,  3,  3,  3,  1,  3,  3,  3,  3,  3,  1], // 4
  [ 1,  1,  1,  2,  1,  1,  1,  2,  2,  2,  2,  2,  2,  2,  1,  1,  2,  1,  1,  1], // 5
  [ 1,  4,  4,  2,  4,  4,  4,  2,  0,  0,  0,  0,  2,  4,  4,  4,  2,  4,  4,  1], // 6
  [ 1,  4,  4,  2,  4,  4,  4,  2,  0,  0,  0,  0,  2,  4,  4,  4,  2,  4,  4,  1], // 7
  [ 1,  1,  1,  2,  1,  1,  1,  2,  2,  2,  2,  2,  2,  2,  1,  1,  2,  1,  1,  1], // 8
  [ 1,  3,  3,  3,  3,  3,  1,  3,  3,  3,  3,  3,  3,  1,  3,  3,  3,  3,  3,  1], // 9
  [ 1,  3, 12,  3,  3,  3,  1,  3,  3,  3,  3,  3,  3,  1,  3,  3, 13,  3,  3,  1], // 10
  [ 1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1], // 11
];

// Positions des portails (tile coords)
const PORTALS = [
  { tx: 2,  ty: 2,  zone: "about",    npc: "about_door",    color: C.door_about   },
  { tx: 16, ty: 2,  zone: "skills",   npc: "skills_door",   color: C.door_skills  },
  { tx: 2,  ty: 10, zone: "projects", npc: "projects_door", color: C.door_proj    },
  { tx: 16, ty: 10, zone: "contact",  npc: "contact_door",  color: C.door_contact },
];

// PNJ guide (tile coords)
const GUIDE = { tx: 8, ty: 8 };

// ── ÉTAT ────────────────────────────────────
const state = {
  scene:  "title",   // title | game
  zone:   "hub",
  dialog: null,      // { lines, index, npc }
  panel:  null,      // nom de la section ouverte
};

// ── JOUEUR ──────────────────────────────────
const player = {
  x:    9 * TILE + TILE / 2,   // px (centre)
  y:    7 * TILE + TILE / 2,
  dir:  "down",
  moving: false,
  frame:  0,
  frameTimer: 0,
};

// ── INPUT ────────────────────────────────────
const keys = {};
document.addEventListener("keydown", e => {
  keys[e.key] = true;
  handleAction(e.key);
});
document.addEventListener("keyup", e => { keys[e.key] = false; });

// ── CANVAS ───────────────────────────────────
const canvas = document.getElementById("game-canvas");
const ctx    = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

// ============================================
//  TITLE SCREEN
// ============================================
function showTitle() {
  document.getElementById("title-screen").classList.add("active");
  document.getElementById("game-screen").style.display = "none";
}

function startGame() {
  document.getElementById("title-screen").classList.remove("active");
  document.getElementById("title-screen").style.display = "none";
  document.getElementById("game-screen").style.display  = "flex";
  state.scene = "game";
  requestAnimationFrame(loop);
}

// ============================================
//  INPUT HANDLER
// ============================================
function handleAction(key) {
  if (state.scene === "title" && (key === "Enter" || key === " ")) {
    startGame();
    return;
  }

  if (state.scene !== "game") return;

  // Fermer le panel
  if (state.panel && (key === "Escape" || key === "e" || key === "E")) {
    closePanel();
    return;
  }

  // Avancer dans le dialogue
  if (state.dialog && (key === "e" || key === "E" || key === "Enter")) {
    advanceDialog();
    return;
  }

  // Fermer le dialogue
  if (state.dialog && key === "Escape") {
    closeDialog();
    return;
  }

  // Interagir
  if (!state.dialog && !state.panel && (key === "e" || key === "E")) {
    interact();
    return;
  }
}

// ============================================
//  DIALOG
// ============================================
function openDialog(npcKey, onFinish) {
  const npc = CONTENT.npcs[npcKey];
  if (!npc) return;
  state.dialog = { lines: npc.lines, index: 0, npcKey, onFinish };
  document.getElementById("dialog-portrait").textContent = npc.portrait;
  document.getElementById("dialog-title").textContent    = npc.title;
  document.getElementById("dialog-text").textContent     = npc.lines[0];
  document.getElementById("dialog").classList.remove("hidden");
}

function advanceDialog() {
  if (!state.dialog) return;
  state.dialog.index++;
  if (state.dialog.index >= state.dialog.lines.length) {
    const cb = state.dialog.onFinish;
    closeDialog();
    if (cb) cb();
  } else {
    document.getElementById("dialog-text").textContent =
      state.dialog.lines[state.dialog.index];
  }
}

function closeDialog() {
  state.dialog = null;
  document.getElementById("dialog").classList.add("hidden");
}

// ============================================
//  PANEL
// ============================================
function openPanel(zone) {
  state.panel = zone;
  const html = buildPanelHTML(zone);
  document.getElementById("panel-content").innerHTML = html;
  document.getElementById("panel").classList.remove("hidden");

  // Animer les barres de compétences
  if (zone === "skills") {
    requestAnimationFrame(() => {
      document.querySelectorAll(".skill-fill").forEach(el => {
        el.style.width = el.dataset.w + "%";
      });
    });
  }
}

function closePanel() {
  state.panel = null;
  document.getElementById("panel").classList.add("hidden");
}

document.getElementById("panel-close").addEventListener("click", closePanel);

// ============================================
//  INTERACT
// ============================================
function interact() {
  // Check guide
  const gx = GUIDE.tx * TILE + TILE / 2;
  const gy = GUIDE.ty * TILE + TILE / 2;
  if (dist(player.x, player.y, gx, gy) < TILE * 1.6) {
    openDialog("welcome");
    return;
  }

  // Check portails
  for (const p of PORTALS) {
    const px = p.tx * TILE + TILE / 2;
    const py = p.ty * TILE + TILE / 2;
    if (dist(player.x, player.y, px, py) < TILE * 1.8) {
      openDialog(p.npc, () => openPanel(p.zone));
      return;
    }
  }
}

function dist(x1, y1, x2, y2) {
  return Math.hypot(x2 - x1, y2 - y1);
}

// ============================================
//  BUILD PANEL HTML
// ============================================
function buildPanelHTML(zone) {
  switch (zone) {
    case "about":    return buildAbout();
    case "skills":   return buildSkills();
    case "projects": return buildProjects();
    case "contact":  return buildContact();
    default: return "<p>Zone inconnue.</p>";
  }
}

function buildAbout() {
  const a = CONTENT.about;
  return `
    <div class="panel-title">👤 PROFIL</div>
    <div class="panel-section">
      <div class="about-grid">
        <div class="about-card">
          <div style="font-size:2.5rem;text-align:center;margin-bottom:12px">${a.portrait}</div>
          <div><span class="label">Nom :</span> ${a.name}</div>
          <div><span class="label">Âge :</span> ${a.age}</div>
          <div><span class="label">Ville :</span> ${a.city}</div>
          <div><span class="label">Loisirs :</span> ${a.hobbies}</div>
        </div>
        <div class="about-card">
          <div><span class="label">Formation :</span> ${a.title}</div>
          <div style="margin-top:8px"><span class="label">École :</span> ${a.school}</div>
          <div style="margin-top:8px"><span class="label">Période :</span> ${a.period}</div>
          <div style="margin-top:16px;color:#cde6ff;line-height:1.7">${a.bio}</div>
        </div>
      </div>
    </div>
    <div class="panel-section" style="text-align:center;margin-top:8px">
      <a href="${a.cv}" style="font-family:'Press Start 2P',monospace;font-size:0.5rem;
         color:#0a0e1a;background:#00ff9d;padding:10px 20px;text-decoration:none;
         display:inline-block;letter-spacing:1px;">
        ↓ TÉLÉCHARGER MON CV
      </a>
    </div>
  `;
}

function buildSkills() {
  let html = `<div class="panel-title">⚔️ COMPÉTENCES</div>`;
  for (const [cat, items] of Object.entries(CONTENT.skills)) {
    html += `<div class="panel-section">
      <div class="panel-section-title">${cat}</div>
      <div class="skills-grid">`;
    for (const s of items) {
      html += `
        <div class="skill-item">
          <div class="skill-name">${s.name}</div>
          <div class="skill-level">${s.label}</div>
          <div class="skill-bar">
            <div class="skill-fill" data-w="${s.level}" style="width:0%"></div>
          </div>
        </div>`;
    }
    html += `</div></div>`;
  }
  return html;
}

function buildProjects() {
  let html = `<div class="panel-title">🗂️ PROJETS</div>
    <div class="projects-grid">`;
  for (const p of CONTENT.projects) {
    const tags = p.tags.map(t => `<span class="tag">${t}</span>`).join("");
    html += `
      <div class="project-card">
        <div class="project-title">${p.emoji} ${p.title}</div>
        <div style="font-family:'Press Start 2P',monospace;font-size:0.38rem;
             color:#4a6080;margin-bottom:8px">${p.type}</div>
        <div class="project-desc">${p.long || p.desc}</div>
        <div class="project-tags">${tags}</div>
        <div style="margin-top:12px;display:flex;gap:10px">
          <a href="${p.github}" style="font-family:'Press Start 2P',monospace;font-size:0.38rem;
             color:#00ff9d;border:1px solid #1e2d50;padding:4px 8px;text-decoration:none">
            GitHub
          </a>
          <a href="${p.demo}" style="font-family:'Press Start 2P',monospace;font-size:0.38rem;
             color:#00d4ff;border:1px solid #1e2d50;padding:4px 8px;text-decoration:none">
            Démo
          </a>
        </div>
      </div>`;
  }
  html += `</div>`;
  return html;
}

function buildContact() {
  const c = CONTENT.contact;
  return `
    <div class="panel-title">📡 CONTACT</div>
    <div class="panel-section">
      <div class="panel-section-title">ME CONTACTER</div>
      <div class="contact-list">
        <div class="contact-item">
          <div class="contact-icon">✉️</div>
          <div class="contact-label">Email</div>
          <div class="contact-value"><a href="mailto:${c.email}">${c.email}</a></div>
        </div>
        <div class="contact-item">
          <div class="contact-icon">💼</div>
          <div class="contact-label">LinkedIn</div>
          <div class="contact-value"><a href="https://${c.linkedin}" target="_blank">${c.linkedin}</a></div>
        </div>
        <div class="contact-item">
          <div class="contact-icon">🐙</div>
          <div class="contact-label">GitHub</div>
          <div class="contact-value"><a href="https://${c.github}" target="_blank">${c.github}</a></div>
        </div>
        <div class="contact-item">
          <div class="contact-icon">💬</div>
          <div class="contact-label">Discord</div>
          <div class="contact-value">${c.discord}</div>
        </div>
        <div class="contact-item">
          <div class="contact-icon">📍</div>
          <div class="contact-label">Localisation</div>
          <div class="contact-value">${c.location}</div>
        </div>
      </div>
    </div>
    <div style="margin-top:24px;text-align:center">
      <a href="mailto:${c.email}"
         style="font-family:'Press Start 2P',monospace;font-size:0.5rem;
                color:#0a0e1a;background:#00ff9d;padding:10px 20px;
                text-decoration:none;display:inline-block;letter-spacing:1px;">
        ✉ M'ENVOYER UN MESSAGE
      </a>
    </div>
  `;
}

// ============================================
//  COLLISION
// ============================================
function isWalkable(tx, ty) {
  if (tx < 0 || ty < 0 || tx >= COLS || ty >= ROWS) return false;
  const t = HUB_MAP[ty][tx];
  return t !== 1 && t !== 20; // murs et arbres bloquants
}

function tileAt(px, py) {
  return { tx: Math.floor(px / TILE), ty: Math.floor(py / TILE) };
}

// ============================================
//  UPDATE PLAYER
// ============================================
function update() {
  if (state.dialog || state.panel) return;

  let dx = 0, dy = 0;
  const up    = keys["ArrowUp"]    || keys["z"] || keys["Z"];
  const down  = keys["ArrowDown"]  || keys["s"] || keys["S"];
  const left  = keys["ArrowLeft"]  || keys["q"] || keys["Q"];
  const right = keys["ArrowRight"] || keys["d"] || keys["D"];

  if (up)    { dy = -SPEED; player.dir = "up";    }
  if (down)  { dy =  SPEED; player.dir = "down";  }
  if (left)  { dx = -SPEED; player.dir = "left";  }
  if (right) { dx =  SPEED; player.dir = "right"; }

  // Normaliser diagonale
  if (dx && dy) { dx *= 0.707; dy *= 0.707; }

  player.moving = (dx !== 0 || dy !== 0);

  // Collision axe X
  const margin = 10;
  if (dx !== 0) {
    const nx = player.x + dx;
    const topT    = tileAt(nx + (dx > 0 ? margin : -margin), player.y - margin);
    const bottomT = tileAt(nx + (dx > 0 ? margin : -margin), player.y + margin);
    if (isWalkable(topT.tx, topT.ty) && isWalkable(bottomT.tx, bottomT.ty)) {
      player.x = nx;
    }
  }

  // Collision axe Y
  if (dy !== 0) {
    const ny = player.y + dy;
    const leftT  = tileAt(player.x - margin, ny + (dy > 0 ? margin : -margin));
    const rightT = tileAt(player.x + margin, ny + (dy > 0 ? margin : -margin));
    if (isWalkable(leftT.tx, leftT.ty) && isWalkable(rightT.tx, rightT.ty)) {
      player.y = ny;
    }
  }

  // Animation frame
  if (player.moving) {
    player.frameTimer++;
    if (player.frameTimer > 10) { player.frame = (player.frame + 1) % 2; player.frameTimer = 0; }
  } else {
    player.frame = 0;
  }

  // Mettre à jour minimap
  updateMinimap();
}

function updateMinimap() {
  // Trouver la zone proche
  for (const p of PORTALS) {
    const px = p.tx * TILE + TILE / 2;
    const py = p.ty * TILE + TILE / 2;
    const el = document.querySelector(`.mz[data-zone="${p.zone}"]`);
    if (el) el.classList.toggle("active", dist(player.x, player.y, px, py) < TILE * 2);
  }
  const hubEl = document.querySelector('.mz[data-zone="hub"]');
  if (hubEl) hubEl.classList.toggle("active",
    player.x > 7*TILE && player.x < 13*TILE && player.y > 5*TILE && player.y < 9*TILE);
}

// ============================================
//  RENDER
// ============================================
let time = 0;

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  time++;

  drawMap();
  drawPortals();
  drawGuide();
  drawPlayer();
  drawInteractHint();
}

// ── DRAW MAP ─────────────────────────────────
function drawMap() {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const t = HUB_MAP[row][col];
      const x = col * TILE, y = row * TILE;
      drawTile(t, x, y, col, row);
    }
  }
}

function drawTile(t, x, y, col, row) {
  switch (t) {
    case 0: // floor intérieur
      ctx.fillStyle = (col + row) % 2 === 0 ? C.floor : C.floor2;
      ctx.fillRect(x, y, TILE, TILE);
      break;

    case 1: // mur
      ctx.fillStyle = C.wall;
      ctx.fillRect(x, y, TILE, TILE);
      ctx.fillStyle = C.wall_top;
      ctx.fillRect(x, y, TILE, 4);
      // Petits détails
      ctx.fillStyle = "rgba(255,255,255,0.03)";
      if ((col + row) % 3 === 0) ctx.fillRect(x+4, y+4, 12, 12);
      break;

    case 2: // chemin
      ctx.fillStyle = C.path;
      ctx.fillRect(x, y, TILE, TILE);
      // Lignes de pavés
      ctx.strokeStyle = "rgba(255,255,255,0.04)";
      ctx.lineWidth = 1;
      ctx.strokeRect(x+4, y+4, TILE-8, TILE-8);
      break;

    case 3: // herbe
      ctx.fillStyle = (col * 3 + row * 7) % 2 === 0 ? C.grass : C.grass2;
      ctx.fillRect(x, y, TILE, TILE);
      // Petits brins
      ctx.fillStyle = "#0e2a14";
      if ((col * 5 + row * 3) % 4 === 0) {
        ctx.fillRect(x+8,  y+12, 2, 6);
        ctx.fillRect(x+20, y+8,  2, 8);
        ctx.fillRect(x+30, y+14, 2, 6);
      }
      break;

    case 4: // eau
      const wave = Math.sin(time * 0.03 + col * 0.5 + row * 0.8) * 0.5 + 0.5;
      ctx.fillStyle = wave > 0.5 ? C.water : C.water2;
      ctx.fillRect(x, y, TILE, TILE);
      // Reflet
      ctx.fillStyle = "rgba(0,180,255,0.08)";
      ctx.fillRect(x + 4, y + 10, TILE - 8, 4);
      break;

    case 10: case 11: case 12: case 13: // portails (dessinés séparément)
      ctx.fillStyle = (col + row) % 2 === 0 ? C.grass : C.grass2;
      ctx.fillRect(x, y, TILE, TILE);
      break;

    case 20: // arbre
      ctx.fillStyle = C.wall;
      ctx.fillRect(x, y, TILE, TILE);
      ctx.fillStyle = "#0d3a0d";
      ctx.fillRect(x+4, y+4, TILE-8, TILE-8);
      break;

    case 21: // panneau (dessiné séparément)
      ctx.fillStyle = (col + row) % 2 === 0 ? C.floor : C.floor2;
      ctx.fillRect(x, y, TILE, TILE);
      break;
  }
}

// ── DRAW PORTALS ─────────────────────────────
function drawPortals() {
  for (const p of PORTALS) {
    const x = p.tx * TILE, y = p.ty * TILE;
    const pulse = Math.sin(time * 0.05) * 0.4 + 0.6;

    // Fond lumineux
    ctx.fillStyle = p.color + "33";
    ctx.fillRect(x-2, y-2, TILE+4, TILE+4);

    // Cadre animé
    ctx.strokeStyle = p.color;
    ctx.lineWidth = 2;
    ctx.globalAlpha = pulse;
    ctx.strokeRect(x+2, y+2, TILE-4, TILE-4);
    ctx.globalAlpha = 1;

    // Symbole central
    ctx.font = `${TILE * 0.55}px serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const icons = { about: "👤", skills: "⚔️", projects: "🗂️", contact: "📡" };
    ctx.fillText(icons[p.zone] || "🚪", x + TILE/2, y + TILE/2);

    // Label
    ctx.fillStyle = p.color;
    ctx.font = "bold 7px 'Press Start 2P'";
    ctx.textAlign = "center";
    ctx.fillText(p.zone.toUpperCase(), x + TILE/2, y + TILE + 10);

    ctx.textAlign = "left";
  }
}

// ── DRAW GUIDE (PNJ) ─────────────────────────
function drawGuide() {
  const x = GUIDE.tx * TILE;
  const y = GUIDE.ty * TILE;
  const bob = Math.sin(time * 0.06) * 3;

  // Ombre
  ctx.fillStyle = "rgba(0,0,0,0.3)";
  ctx.beginPath();
  ctx.ellipse(x + TILE/2, y + TILE - 4, 10, 4, 0, 0, Math.PI*2);
  ctx.fill();

  // Corps du PNJ
  ctx.font = `${TILE * 0.75}px serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  ctx.fillText("👾", x + TILE/2, y + TILE - 4 + bob);

  // Bulle
  ctx.fillStyle = "rgba(0,255,157,0.9)";
  ctx.font = "bold 7px 'Press Start 2P'";
  ctx.textAlign = "center";
  const bubblePulse = Math.abs(Math.sin(time * 0.08));
  ctx.globalAlpha = bubblePulse;
  ctx.fillText("!", x + TILE/2 + 12, y - 2 + bob);
  ctx.globalAlpha = 1;
  ctx.textAlign = "left";
}

// ── DRAW PLAYER ──────────────────────────────
function drawPlayer() {
  const x = Math.round(player.x - TILE/2);
  const y = Math.round(player.y - TILE/2);
  const bob = player.moving && player.frame === 1 ? -2 : 0;

  // Ombre
  ctx.fillStyle = "rgba(0,0,0,0.4)";
  ctx.beginPath();
  ctx.ellipse(player.x, player.y + TILE/2 - 4, 10, 4, 0, 0, Math.PI*2);
  ctx.fill();

  // Sprite simple (rectangle coloré + visage pixel)
  const bodyColor = "#3a7fff";
  const hairColor = "#1a1a2e";

  // Corps
  ctx.fillStyle = bodyColor;
  ctx.fillRect(x + 8, y + 18 + bob, 24, 20);

  // Jambes (animées)
  ctx.fillStyle = "#1e3a6e";
  if (player.moving && player.frame === 1) {
    ctx.fillRect(x + 10, y + 36 + bob, 8, 8);
    ctx.fillRect(x + 22, y + 34 + bob, 8, 8);
  } else {
    ctx.fillRect(x + 10, y + 36 + bob, 8, 6);
    ctx.fillRect(x + 22, y + 36 + bob, 8, 6);
  }

  // Tête
  ctx.fillStyle = "#f0c89a";
  ctx.fillRect(x + 10, y + 4 + bob, 20, 18);

  // Cheveux
  ctx.fillStyle = hairColor;
  ctx.fillRect(x + 10, y + 4 + bob, 20, 6);

  // Yeux selon direction
  ctx.fillStyle = "#1a1a2e";
  if (player.dir === "down" || player.dir === "left" || player.dir === "right") {
    ctx.fillRect(x + 13, y + 14 + bob, 4, 4);
    ctx.fillRect(x + 23, y + 14 + bob, 4, 4);
  } else {
    // Up : dos
    ctx.fillStyle = hairColor;
    ctx.fillRect(x + 10, y + 4 + bob, 20, 10);
  }

  // Lueur du joueur
  const grad = ctx.createRadialGradient(player.x, player.y, 0, player.x, player.y, TILE);
  grad.addColorStop(0, "rgba(58,127,255,0.12)");
  grad.addColorStop(1, "transparent");
  ctx.fillStyle = grad;
  ctx.fillRect(x - TILE/2, y - TILE/2, TILE*2, TILE*2);
}

// ── INTERACT HINT ────────────────────────────
function drawInteractHint() {
  if (state.dialog || state.panel) return;

  let nearSomething = false;
  const gx = GUIDE.tx * TILE + TILE/2, gy = GUIDE.ty * TILE + TILE/2;
  if (dist(player.x, player.y, gx, gy) < TILE * 1.6) nearSomething = true;

  if (!nearSomething) {
    for (const p of PORTALS) {
      if (dist(player.x, player.y, p.tx*TILE+TILE/2, p.ty*TILE+TILE/2) < TILE * 1.8) {
        nearSomething = true; break;
      }
    }
  }

  if (nearSomething) {
    const pulse = Math.abs(Math.sin(time * 0.08));
    ctx.globalAlpha = 0.7 + pulse * 0.3;
    ctx.fillStyle = "#ffe566";
    ctx.font = "bold 8px 'Press Start 2P'";
    ctx.textAlign = "center";
    ctx.fillText("[E] Interagir", player.x, player.y - TILE);
    ctx.globalAlpha = 1;
    ctx.textAlign = "left";
  }
}

// ============================================
//  GAME LOOP
// ============================================
function loop() {
  if (state.scene !== "game") return;
  update();
  render();
  requestAnimationFrame(loop);
}

// ============================================
//  INIT
// ============================================
showTitle();
