"use client";

import type { ReactNode } from "react";
import { openQuote, openSheet } from "@/lib/events";

type Props = { model: string; className: string; children: ReactNode };

export function QuoteButton({ model, className, children }: Props) {
  return (
    <button className={className} type="button" onClick={() => openQuote({ model })}>
      {children}
    </button>
  );
}

export function SheetButton({ model, className, children }: Props) {
  return (
    <button className={className} type="button" onClick={() => openSheet(model)}>
      {children}
    </button>
  );
}
