"use client";

// Bara de sus, randata din `src/app/layout.tsx`, deci prezenta pe fiecare pagina.
//
// DE CE E COMPONENTA DE CLIENT: ca sa stie pe ce pagina e, si ca sa tina deschiderea
// meniului de pe telefon. Ancorele paginii de start (`#mecanism`, `#termene`, ...) sunt
// sectiuni ale rutei `/`, nu pagini. Afisate pe alta ruta ar fi legaturi care nu duc
// nicaieri, iar rescrise ca `/#mecanism` ar aseza in meniul global randuri care nu sunt
// pagini. Deci se arata NUMAI cand `usePathname()` intoarce `/`.
//
// MENIUL PLIABIL, si de ce exista acum si nu inainte. Cat timp meniul avea o intrare,
// comentariul de aici spunea ca un meniu pliabil ar fi "cod scris pentru un caz pe care
// nu il pot masura". Cazul s-a masurat: adaugand doua pagini in bara, poarta de derapaj a
// dat `scrollWidth` 529 peste `innerWidth` 390 **pe toate cele cinci pagini**, fiindca bara
// sta in layout. Deci nu e o problema a paginii care creste, e o problema a intregului site,
// si raspunsul de atunci - `inMeniu: false` - ar fi insemnat un site de zece pagini cu doua
// intrari in meniu.
//
// Sub 768 px paginile trec intr-un panou care se deschide dintr-un buton; peste, raman in
// linie. Panoul e HTML servit de la inceput, doar ascuns: cine citeste pagina cu JavaScript
// oprit vede toate legaturile, deci poarta de HTML brut nu are de ce sa se inroseasca, iar
// un agent care nu executa JS gaseste structura site-ului.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Buton from "./Buton";
import Invelis from "./Invelis";
import { CALE_DISCUTIE, SECTIUNI_ACASA, rutePentruMeniu } from "@/content/rute";

const LEGATURA =
  "border-b border-transparent py-1.5 text-[15px] text-tus-2 no-underline hover:border-arama hover:text-tus";

export default function Navigatie() {
  const cale = usePathname();
  const peAcasa = cale === "/";
  const pagini = rutePentruMeniu();
  const sectiuni = peAcasa ? SECTIUNI_ACASA.filter((s) => s.inMeniu) : [];
  const [deschis, setDeschis] = useState(false);
  const butonRef = useRef<HTMLButtonElement>(null);

  // Panoul se inchide la schimbarea rutei. Fara asta, cine apasa o legatura din panou
  // ajunge pe pagina noua cu meniul inca deschis peste continut.
  useEffect(() => {
    setDeschis(false);
  }, [cale]);

  // Escape inchide si duce focalizarea inapoi pe buton. Un panou care se inchide fara sa
  // spuna unde a plecat focalizarea trimite urmatorul Tab la inceputul paginii.
  useEffect(() => {
    if (!deschis) return;
    const laTasta = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDeschis(false);
        butonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", laTasta);
    return () => document.removeEventListener("keydown", laTasta);
  }, [deschis]);

  return (
    <header className="sticky top-0 z-40 border-b border-linie bg-hartie/90 backdrop-blur-[8px]">
      <Invelis className="flex items-center gap-4 py-3 sm:gap-6">
        {/* Rutele se navigheaza cu `Link`, ancorele cu `a`. Nu e chestiune de stil: `Link`
            face trecerea fara reincarcare, iar pe o ancora din aceeasi pagina ar sari peste
            derularea lina din `globals.css`. */}
        <Link href="/" className="flex items-baseline gap-2.5 no-underline">
          <span className="font-serif text-[26px] leading-none font-semibold tracking-[-0.02em] text-verde">
            3S
          </span>
          <span className="hidden font-mono text-[11.5px] tracking-[0.14em] uppercase text-tus-3 sm:inline">
            Scan · Store · Solve
          </span>
        </Link>

        <nav className="ml-auto flex items-center gap-6" aria-label="Meniu principal">
          {/* Peste 768 px: paginile si sectiunile stau in linie, ca pana acum. */}
          <div className="hidden items-center gap-6 md:flex">
            {pagini.map((r) => (
              <Link
                key={r.cale}
                href={r.cale}
                title={r.descriere}
                aria-current={cale === r.cale ? "page" : undefined}
                className={LEGATURA}
              >
                {r.scurt}
              </Link>
            ))}
            {sectiuni.map((s) => (
              <a key={s.ancora} href={"#" + s.ancora} className={LEGATURA}>
                {s.scurt}
              </a>
            ))}
          </div>

          <Buton href={CALE_DISCUTIE} marime="mic" className="shrink-0 whitespace-nowrap">
            <span className="sm:hidden">Discuție</span>
            <span className="hidden sm:inline">Discuție de 30 de minute</span>
          </Buton>

          {/* Sub 768 px: butonul care deschide panoul. `aria-expanded` si `aria-controls`
              nu sunt decor - fara ele, un cititor de ecran anunta un buton fara sa spuna
              ce face si daca e deschis. */}
          <button
            ref={butonRef}
            type="button"
            onClick={() => setDeschis((d) => !d)}
            aria-expanded={deschis}
            aria-controls="meniu-pliabil"
            className="-mr-1 shrink-0 cursor-pointer border-0 bg-transparent p-1.5 text-tus-2 hover:text-tus md:hidden"
          >
            <span className="sr-only">
              {deschis ? "Închideți meniul" : "Deschideți meniul"}
            </span>
            <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true" focusable="false">
              {deschis ? (
                <path
                  d="M5 5 L17 17 M17 5 L5 17"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="square"
                />
              ) : (
                <path
                  d="M3 6 H19 M3 11 H19 M3 16 H19"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="square"
                />
              )}
            </svg>
          </button>
        </nav>
      </Invelis>

      {/* Panoul e in HTML de la prima livrare, doar ascuns cu `hidden`, nu construit din
          JavaScript la deschidere. Asa, o pagina citita fara JS pastreaza toate legaturile. */}
      <div
        id="meniu-pliabil"
        hidden={!deschis}
        className="border-t border-linie bg-hartie md:hidden"
      >
        <Invelis className="flex flex-col py-2">
          {pagini.map((r) => (
            <Link
              key={r.cale}
              href={r.cale}
              aria-current={cale === r.cale ? "page" : undefined}
              className="border-b border-linie py-3 text-[16px] text-tus-2 no-underline last:border-b-0 hover:text-tus"
            >
              {r.scurt}
            </Link>
          ))}
          {sectiuni.map((s) => (
            <a
              key={s.ancora}
              href={"#" + s.ancora}
              onClick={() => setDeschis(false)}
              className="border-b border-linie py-3 text-[16px] text-tus-2 no-underline last:border-b-0 hover:text-tus"
            >
              {s.scurt}
            </a>
          ))}
        </Invelis>
      </div>
    </header>
  );
}
