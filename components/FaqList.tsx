"use client";
import { useState } from "react";
import { FAQ, FAQ_CATEGORIES } from "@/lib/constants";

export default function FaqList() {
  const [q, setQ] = useState("");
  const term = q.toLowerCase();
  return (
    <>
      <label htmlFor="s">Rechercher</label>
      <input id="s" type="search" value={q} onChange={(e) => setQ(e.target.value)} />
      {FAQ_CATEGORIES.map((c) => {
        const items = FAQ.filter((f) => f.category === c && (f.q + f.a).toLowerCase().includes(term));
        return items.length ? (
          <section key={c}><h2>{c}</h2>{items.map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}</section>
        ) : null;
      })}
    </>
  );
}
