import type { MachineCategory } from "@/lib/machines";

// Illustration vectorielle simple par catégorie, en attendant de vraies photos.
export default function MachineIllustration({
  category,
  className = "",
}: {
  category: MachineCategory;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 200 140" className={className} aria-hidden="true">
      <rect width="200" height="140" fill="#fff7ed" />
      <line x1="0" y1="120" x2="200" y2="120" stroke="#cbd5e1" strokeWidth="2" />
      {category === "ciseaux" && (
        <g stroke="#ea580c" strokeWidth="5" fill="none">
          <path d="M70 100 L130 80 M70 80 L130 100 M70 80 L130 60 M70 60 L130 80 M70 60 L130 40 M70 40 L130 60" />
          <rect x="60" y="28" width="80" height="10" fill="#f97316" stroke="none" />
          <path d="M60 28 V16 H140 V28" strokeWidth="3" />
          <rect x="55" y="100" width="90" height="12" fill="#334155" stroke="none" />
        </g>
      )}
      {(category === "articulee" || category === "telescopique") && (
        <g>
          <rect x="40" y="96" width="70" height="16" rx="3" fill="#334155" />
          <rect x="60" y="84" width="30" height="14" fill="#f97316" />
          {category === "articulee" ? (
            <path d="M75 86 L110 50 L150 40" stroke="#ea580c" strokeWidth="7" fill="none" strokeLinecap="round" />
          ) : (
            <path d="M75 86 L160 30" stroke="#ea580c" strokeWidth="8" fill="none" strokeLinecap="round" />
          )}
          <rect x={category === "articulee" ? 146 : 156} y="22" width="26" height="16" fill="#f97316" />
        </g>
      )}
      {category === "araignee" && (
        <g>
          <rect x="78" y="94" width="44" height="16" rx="8" fill="#334155" />
          <path d="M80 100 L45 120 M120 100 L155 120 M85 96 L55 112 M115 96 L145 112" stroke="#ea580c" strokeWidth="4" />
          <path d="M100 94 L120 50 L150 34" stroke="#ea580c" strokeWidth="6" fill="none" strokeLinecap="round" />
          <rect x="146" y="20" width="24" height="16" fill="#f97316" />
        </g>
      )}
      {category === "camion" && (
        <g>
          <rect x="30" y="86" width="110" height="22" rx="3" fill="#334155" />
          <rect x="140" y="76" width="34" height="32" rx="4" fill="#f97316" />
          <circle cx="55" cy="112" r="8" fill="#0f172a" />
          <circle cx="155" cy="112" r="8" fill="#0f172a" />
          <path d="M60 86 L100 40 L130 34" stroke="#ea580c" strokeWidth="6" fill="none" strokeLinecap="round" />
          <rect x="126" y="22" width="24" height="16" fill="#f97316" />
        </g>
      )}
    </svg>
  );
}
