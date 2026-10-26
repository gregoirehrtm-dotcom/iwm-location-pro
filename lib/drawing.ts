// Dessins techniques des nacelles ciseaux, en SVG, à l'échelle (k = pixels par mètre).
// Les fonctions renvoient du balisage SVG construit uniquement à partir des données des modèles.
import { meters } from "./format";
import { platformHeight, type Model } from "./models";

const f1 = (v: number) => Math.round(v * 10) / 10;

type Frame = { cx: number; floorY: number; k: number };

/** Nacelle vue de côté, plancher à `platform` mètres du sol, avec un opérateur casqué */
export function liftLine(m: Model, platform: number, o: Frame): string {
  const { cx, floorY: fy, k } = o;
  const half = (m.drawing.length / 2) * k;
  const n = m.drawing.stages;
  const r = Math.max(3, 0.2 * k);
  const chTop = fy - 0.64 * k;
  const chH = 0.44 * k;
  const deckH = Math.max(3, 0.14 * k);
  const deckTop = fy - platform * k;
  const armTop = deckTop + deckH;
  const armBot = chTop;
  const xl = cx - half + 0.14 * k;
  const xr = cx + half - 0.14 * k;

  let s = '<g class="lf-arms">';
  let pins = "";
  for (let i = 0; i < n; i++) {
    const ya = armBot - ((armBot - armTop) * i) / n;
    const yb = armBot - ((armBot - armTop) * (i + 1)) / n;
    s += `<line x1="${f1(xl)}" y1="${f1(ya)}" x2="${f1(xr)}" y2="${f1(yb)}"/><line x1="${f1(xr)}" y1="${f1(ya)}" x2="${f1(xl)}" y2="${f1(yb)}"/>`;
    pins += `<circle class="lf-pin" cx="${f1(cx)}" cy="${f1((ya + yb) / 2)}" r="${f1(Math.max(1.4, 0.05 * k))}"/>`;
  }
  s += "</g>" + pins;

  // Châssis, compartiment batterie et roues
  s += `<rect class="lf-solid" x="${f1(cx - half)}" y="${f1(chTop)}" width="${f1(2 * half)}" height="${f1(chH)}" rx="1.5"/>`;
  s += `<rect class="lf-detail" x="${f1(cx - half * 0.42)}" y="${f1(chTop + chH * 0.24)}" width="${f1(half * 0.84)}" height="${f1(chH * 0.52)}" rx="1"/>`;
  for (const wx of [cx - half + 0.32 * k, cx + half - 0.32 * k]) {
    s += `<circle class="lf-solid" cx="${f1(wx)}" cy="${f1(fy - r)}" r="${f1(r)}"/><circle class="lf-detail" cx="${f1(wx)}" cy="${f1(fy - r)}" r="${f1(r * 0.4)}"/>`;
  }

  // Plancher
  s += `<rect class="lf-solid" x="${f1(cx - half - 0.08 * k)}" y="${f1(deckTop)}" width="${f1(2 * half + 0.16 * k)}" height="${f1(deckH)}" rx="1"/>`;

  // Opérateur
  const px = cx - half * 0.28;
  const ft = deckTop;
  s +=
    '<g class="lf-person">' +
    `<path d="M${f1(px - 0.11 * k)} ${f1(ft)}L${f1(px)} ${f1(ft - 0.82 * k)}L${f1(px + 0.11 * k)} ${f1(ft)}"/>` +
    `<path d="M${f1(px)} ${f1(ft - 0.82 * k)}L${f1(px)} ${f1(ft - 1.44 * k)}"/>` +
    `<path d="M${f1(px)} ${f1(ft - 1.36 * k)}L${f1(px + 0.17 * k)} ${f1(ft - 1.7 * k)}L${f1(px + 0.12 * k)} ${f1(ft - 2 * k)}"/>` +
    `<path d="M${f1(px)} ${f1(ft - 1.36 * k)}L${f1(px - 0.2 * k)} ${f1(ft - 0.98 * k)}"/></g>` +
    `<circle class="lf-head" cx="${f1(px)}" cy="${f1(ft - 1.6 * k)}" r="${f1(0.13 * k)}"/>` +
    `<path class="lf-helmet" d="M${f1(px - 0.15 * k)} ${f1(ft - 1.64 * k)}A${f1(0.15 * k)} ${f1(0.15 * k)} 0 0 1 ${f1(px + 0.15 * k)} ${f1(ft - 1.64 * k)}Z"/>`;

  // Garde-corps
  const x0 = cx - half - 0.04 * k;
  const x2 = cx + half + 0.04 * k;
  const top = deckTop - 1.1 * k;
  const mid = deckTop - 0.55 * k;
  s += `<path class="lf-rail" d="M${f1(x0)} ${f1(deckTop)}V${f1(top)}H${f1(x2)}V${f1(deckTop)}M${f1(x0)} ${f1(mid)}H${f1(x2)}M${f1(cx)} ${f1(deckTop)}V${f1(top)}"/>`;
  return s;
}

/** Sol hachuré */
export function ground(x1: number, x2: number, y: number): string {
  let s = `<line class="lf-ground" x1="${x1}" y1="${y}" x2="${x2}" y2="${y}"/>`;
  for (let x = x1 + 10; x <= x2; x += 12) s += `<line class="lf-hatch" x1="${x}" y1="${y + 1}" x2="${x - 7}" y2="${y + 8}"/>`;
  return s;
}

/** Cote verticale : ligne, traits d'extrémité et valeur */
export function cote(x: number, yBot: number, yTop: number, label: string, fontSize = 12, fromX: number | null = null): string {
  const t = 4;
  let s = '<g class="cote">';
  if (fromX != null) s += `<line class="ext" x1="${f1(fromX)}" y1="${f1(yTop)}" x2="${f1(x + 6)}" y2="${f1(yTop)}"/>`;
  s += `<line x1="${f1(x)}" y1="${f1(yBot)}" x2="${f1(x)}" y2="${f1(yTop)}"/>`;
  s += `<line x1="${f1(x - t)}" y1="${f1(yBot + t)}" x2="${f1(x + t)}" y2="${f1(yBot - t)}"/>`;
  s += `<line x1="${f1(x - t)}" y1="${f1(yTop + t)}" x2="${f1(x + t)}" y2="${f1(yTop - t)}"/>`;
  const my = (yBot + yTop) / 2;
  s += `<text class="cote-txt" text-anchor="middle" transform="translate(${f1(x - fontSize * 0.55)} ${f1(my)}) rotate(-90)">${label}</text>`;
  return s + "</g>";
}

/** Dessin des fiches (viewBox 220 × 300) : nacelle déployée, cote de la hauteur de travail */
export function cardDrawing(m: Model): string {
  const fy = 282;
  const k = 19;
  const cx = 96;
  const hand = fy - m.workingHeight * k;
  return (
    ground(12, 208, fy) +
    liftLine(m, platformHeight(m), { cx, floorY: fy, k }) +
    cote(186, fy, hand, meters(m.workingHeight), 12, cx - (m.drawing.length / 2) * k * 0.28 + 0.12 * k)
  );
}
