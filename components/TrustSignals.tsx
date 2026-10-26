import { Headset, ShieldCheck, Sparkles } from "lucide-react";
import { TRUST_BADGES } from "@/lib/constants";

const ICONS = { sparkles: Sparkles, headset: Headset, shield: ShieldCheck };

export default function TrustSignals() {
  return (
    <ul className="grid gap-4 md:grid-cols-3">
      {TRUST_BADGES.map((b) => {
        const Icon = ICONS[b.icon];
        return (
          <li key={b.title} className="flex items-start gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-success/15 text-success-dark">
              <Icon aria-hidden />
            </span>
            <span><strong className="block">{b.title}</strong><span className="text-muted">{b.text}</span></span>
          </li>
        );
      })}
    </ul>
  );
}
