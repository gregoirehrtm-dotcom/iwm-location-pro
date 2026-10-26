// Événements entre sections : un bouton « Devis » ou « Fiche technique » d'une section
// préremplit le formulaire de devis ou ouvre la fiche technique, sans état partagé.
export const QUOTE_EVENT = "iwm:quote";
export const SHEET_EVENT = "iwm:sheet";

export type QuotePrefill = { model?: string; npa?: string };

export function openQuote(detail: QuotePrefill): void {
  window.dispatchEvent(new CustomEvent<QuotePrefill>(QUOTE_EVENT, { detail }));
}

export function openSheet(model: string): void {
  window.dispatchEvent(new CustomEvent<string>(SHEET_EVENT, { detail: model }));
}
