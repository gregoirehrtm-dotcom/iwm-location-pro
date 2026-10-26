"use client";
import Image from "next/image";
import { useState } from "react";
import type { Model } from "@/lib/types";
import ModelIllustration from "./ModelIllustration";

/**
 * Shows photos from /public/images/products/<slug>-<n>.webp when listed in `photos`;
 * falls back to the scale drawing so the page works before photos are added.
 */
export default function ProductGallery({ model, photos = [] }: { model: Model; photos?: string[] }) {
  const slides = [...photos.map((src) => ({ src })), { src: null as string | null }];
  const [i, setI] = useState(0);
  const cur = slides[i];
  return (
    <div>
      <div className="aspect-[4/3] overflow-hidden rounded-sm border border-line">
        {cur.src ? (
          <Image src={cur.src} alt={`${model.name}, vue ${i + 1}`} width={800} height={600} loading={i === 0 ? "eager" : "lazy"} className="h-full w-full object-cover" />
        ) : (
          <ModelIllustration model={model} />
        )}
      </div>
      {slides.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {slides.map((s, idx) => (
            <button key={idx} aria-label={`Vue ${idx + 1}`} aria-current={idx === i} onClick={() => setI(idx)}
              className={`h-16 w-20 shrink-0 overflow-hidden rounded-sm border-2 ${idx === i ? "border-primary" : "border-line"}`}>
              {s.src ? <Image src={s.src} alt="" width={80} height={64} loading="lazy" className="h-full w-full object-cover" /> : <ModelIllustration model={model} showPerson={false} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
