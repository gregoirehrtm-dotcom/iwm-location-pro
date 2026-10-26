"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { cote, ground, liftLine } from "@/lib/drawing";
import { openQuote, openSheet } from "@/lib/events";
import { chf, meters, meters1 } from "@/lib/format";
import { platformHeight, recommend } from "@/lib/models";

// Scène du dessin : sol à y = 600, 42 px par mètre
const STAGE = { floorY: 600, k: 42, cx: 280 };
const MIN = 2;
const MAX = 12;
const presets = [
  { h: 2.6, label: "Plafond de bureau" },
  { h: 4.5, label: "Magasin" },
  { h: 7.5, label: "Entrepôt" },
  { h: 11.8, label: "Halle industrielle" },
];

const f1 = (v: number) => Math.round(v * 10) / 10;

// Plancher à atteindre : la personne travaille 2 m au-dessus, sans dépasser la nacelle conseillée
function goalPlatform(target: number) {
  return Math.min(Math.max(target - 2, 1), platformHeight(recommend(target)));
}

// Sol et règle graduée tous les 50 cm, cotée tous les 2 m
const staticLayer = (() => {
  const { floorY, k } = STAGE;
  let s = ground(20, 548, floorY) + `<g class="ruler"><line x1="58" y1="${floorY}" x2="58" y2="${floorY - 13 * k}"/>`;
  for (let i = 0; i <= 26; i++) {
    const y = floorY - i * 0.5 * k;
    const major = i % 2 === 0;
    s += `<line${major ? "" : ' class="minor"'} x1="${major ? 48 : 53}" y1="${y}" x2="58" y2="${y}"/>`;
    if (major && (i / 2) % 2 === 0) s += `<text x="42" y="${y + 4}" text-anchor="end">${i / 2} m</text>`;
  }
  return s + "</g>";
})();

export default function HeightFinder() {
  const [target, setTarget] = useState(7.5);
  // Plancher dessiné, animé vers le plancher visé ; replié tant que le dessin n'a pas été vu
  const [platform, setPlatform] = useState(1);
  const stageRef = useRef<SVGSVGElement>(null);
  const drawn = useRef(1);
  const raf = useRef(0);
  const started = useRef(false);
  const reduceMotion = useRef(false);
  const dragging = useRef(false);

  const animateTo = (goal: number) => {
    cancelAnimationFrame(raf.current);
    if (reduceMotion.current) {
      drawn.current = goal;
      setPlatform(goal);
      return;
    }
    const tick = () => {
      const d = goal - drawn.current;
      drawn.current = Math.abs(d) < 0.004 ? goal : drawn.current + d * 0.16;
      setPlatform(drawn.current);
      if (drawn.current !== goal) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  };

  // La nacelle se déploie quand le dessin entre à l'écran (ou au bout de 4 s)
  useEffect(() => {
    try {
      reduceMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      // matchMedia indisponible : animation conservée
    }
    const start = () => {
      if (started.current) return;
      started.current = true;
      animateTo(goalPlatform(7.5));
    };
    const el = stageRef.current;
    if (!el || reduceMotion.current || !("IntersectionObserver" in window)) {
      start();
      return;
    }
    const io = new IntersectionObserver((entries) => entries[0].isIntersecting && start(), { threshold: 0.35 });
    io.observe(el);
    const fallback = setTimeout(start, 4000);
    return () => {
      io.disconnect();
      clearTimeout(fallback);
      cancelAnimationFrame(raf.current);
    };
    // Effet de montage uniquement
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const choose = (t: number) => {
    const next = Math.min(MAX, Math.max(MIN, Math.round(t * 10) / 10));
    started.current = true;
    setTarget(next);
    animateTo(goalPlatform(next));
  };

  const fromPointer = (e: PointerEvent<SVGSVGElement>) => {
    const svg = stageRef.current;
    const ctm = svg?.getScreenCTM();
    if (!svg || !ctm) return;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    choose((STAGE.floorY - pt.matrixTransform(ctm.inverse()).y) / STAGE.k);
  };

  const m = recommend(target);
  const deckTop = STAGE.floorY - platform * STAGE.k;
  const half = (m.drawing.length / 2) * STAGE.k;
  const lift =
    liftLine(m, platform, STAGE) +
    `<text class="deck-txt" x="${f1(STAGE.cx + half + 14)}" y="${f1(deckTop + 5)}">Plancher ${meters1(platform)}</text>`;
  const ty = STAGE.floorY - target * STAGE.k;
  const targetLine =
    `<line class="target" x1="58" y1="${f1(ty)}" x2="500" y2="${f1(ty)}"/><circle class="knob" cx="58" cy="${f1(ty)}" r="5"/>` +
    cote(522, STAGE.floorY, ty, meters1(target), 15, null);

  return (
    <section className="section alt" id="hauteur" aria-labelledby="t-hauteur">
      <div className="wrap">
        <div className="head">
          <h2 className="h2" id="t-hauteur">Quelle hauteur devez-vous atteindre&nbsp;?</h2>
          <p className="lead">Réglez la hauteur. Le dessin vous montre, à l’échelle, la nacelle qui convient.</p>
        </div>
        <div className="finder-grid">
          <div className="sheet stage-box">
            <svg
              ref={stageRef}
              className="stage lf"
              viewBox="0 0 560 640"
              role="img"
              aria-labelledby="hf-title"
              onPointerDown={(e) => {
                dragging.current = true;
                try {
                  e.currentTarget.setPointerCapture(e.pointerId);
                } catch {
                  // Capture refusée : le glisser reste possible tant que le pointeur est sur le dessin
                }
                fromPointer(e);
              }}
              onPointerMove={(e) => dragging.current && fromPointer(e)}
              onPointerUp={() => (dragging.current = false)}
              onPointerCancel={() => (dragging.current = false)}
              onLostPointerCapture={() => (dragging.current = false)}
            >
              <title id="hf-title">Dessin à l’échelle : une nacelle se déploie jusqu’à la hauteur choisie</title>
              <g dangerouslySetInnerHTML={{ __html: staticLayer }} />
              <g dangerouslySetInnerHTML={{ __html: lift }} />
              <g dangerouslySetInnerHTML={{ __html: targetLine }} />
            </svg>
          </div>
          <div className="panel">
            <div>
              <p className="label" id="hf-label">Hauteur à atteindre</p>
              <output className="readout" htmlFor="hf-range">{meters1(target)}</output>
            </div>
            <input
              className="range"
              type="range"
              id="hf-range"
              min={MIN}
              max={MAX}
              step={0.1}
              value={target}
              aria-labelledby="hf-label"
              aria-valuetext={`${target.toFixed(1).replace(".", ",")} mètres`}
              onChange={(e) => choose(parseFloat(e.target.value))}
            />
            <div className="scale" aria-hidden="true">
              <span>2 m</span>
              <span>12 m</span>
            </div>
            <div className="presets" role="group" aria-label="Exemples">
              {presets.map((p) => (
                <button
                  key={p.h}
                  type="button"
                  className="chip"
                  aria-pressed={Math.abs(p.h - target) < 0.05}
                  onClick={() => choose(p.h)}
                >
                  {p.label}
                </button>
              ))}
            </div>
            <div className="rec" aria-live="polite">
              <p className="label">Nacelle conseillée</p>
              <h3 className="rec-name">
                <small>IWM</small>
                {m.short}
              </h3>
              <dl className="facts">
                <div>
                  <dt>Hauteur de travail</dt>
                  <dd>{meters(m.workingHeight)}</dd>
                </div>
                <div>
                  <dt>Plancher</dt>
                  <dd>{meters(platformHeight(m))}</dd>
                </div>
                <div>
                  <dt>Capacité</dt>
                  <dd>{m.capacity ? `${m.capacity}\u00a0kg` : <span className="tbc">à confirmer</span>}</dd>
                </div>
              </dl>
              <p className="from">
                Dès <strong>{chf(m.pricePerDay)}</strong> par jour
              </p>
              <div className="row">
                <button className="btn btn-primary" type="button" onClick={() => openQuote({ model: m.slug })}>
                  Demander un devis
                </button>
                <button className="link" type="button" onClick={() => openSheet(m.slug)}>
                  Fiche technique
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
