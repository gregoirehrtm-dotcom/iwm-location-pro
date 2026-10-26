import type { Model } from "@/lib/types";

/** Schematic scissor lift drawn to scale (1 m = 20 px), with a 1.8 m person for reference. */
export default function ModelIllustration({ model, showPerson = true }: { model: Model; showPerson?: boolean }) {
  const u = 20;
  const floor = 260;
  const top = floor - model.platformHeight * u - 12;
  const base = floor - 22;
  const mid = (top + 12 + base) / 2;
  const w = model.widthM ? model.widthM * u * 1.6 : 24 * 1.6;
  const cx = 90;
  return (
    <svg
      viewBox="0 0 220 270"
      role="img"
      aria-label={`Schéma à l’échelle de la nacelle ${model.name}, hauteur de travail ${model.workingHeight} m`}
      className="h-full w-full"
    >
      <rect width="220" height="270" fill="#f3f4f6" />
      <line x1="0" x2="220" y1={floor} y2={floor} stroke="#1a1a1a" strokeWidth="2" />
      <rect x={cx - w / 2 - 6} y={floor - 22} width={w + 12} height="22" fill="#2b5a7b" />
      <path d={`M${cx - w / 2} ${base} L${cx + w / 2} ${mid} L${cx - w / 2} ${top + 12} M${cx + w / 2} ${base} L${cx - w / 2} ${mid} L${cx + w / 2} ${top + 12}`} stroke="#2b5a7b" strokeWidth="4" fill="none" />
      <rect x={cx - w / 2 - 14} y={top} width={w + 28} height="12" fill="#f97316" />
      <path d={`M${cx - w / 2 - 14} ${top} v-26 h${w + 28} v26`} stroke="#1a1a1a" strokeWidth="2" fill="none" />
      <line x1="196" x2="196" y1={floor} y2={top - 36 + 0} stroke="#666" strokeDasharray="3 3" />
      <text x="200" y={top - 40} fontSize="11" fill="#1a1a1a" textAnchor="end">{String(model.workingHeight).replace(".", ",")} m</text>
      {showPerson && (
        <g fill="#666" transform={`translate(150 ${floor - 1.8 * u})`}>
          <circle cx="8" cy="4" r="4" />
          <rect x="4" y="9" width="8" height={1.8 * u - 9} />
        </g>
      )}
    </svg>
  );
}
