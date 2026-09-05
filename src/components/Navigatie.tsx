"use client";

// Bara de sus, randata din `src/app/layout.tsx`, deci prezenta pe fiecare pagina.
//
// DE CE E COMPONENTA DE CLIENT, desi nu tine nicio stare: ca sa stie pe ce pagina e.
// Ancorele paginii de start (`#mecanism`, `#termene`, ...) sunt sectiuni ale rutei `/`,
// nu pagini. Afisate pe alta ruta ar fi legaturi care nu duc nicaieri, iar rescrise ca
// `/#mecanism` ar aseza in meniul global randuri care nu sunt pagini. Deci se arata
// NUMAI cand `usePathname()` intoarce `/`. Alternativa - un sub-meniu randat de pagina
// de start - ar fi pus doua bare una sub alta, una lipita si una nu, adica doua limbaje
// vizuale pentru acelasi gest.
//
// Nimic din ce se afiseaza nu depinde de starea browserului, deci HTML-ul livrat de
// server e complet: poarta care citeste pagina cu JavaScript oprit nu are de ce sa se
// inroseasca.

import Link from "next/link";
import { usePathname } from "next/navigation";
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

  return (
    <header className="sticky top-0 z-40 border-b border-linie bg-hartie/90 backdrop-blur-[8px]">
      <Invelis className="flex items-center gap-6 py-3">
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
          {/* Paginile raman vizibile si pe telefon: sunt structura site-ului, iar azi sunt
              putine. Cand lista creste, poarta de derapaj de la 390 px se inroseste prima,
              si atunci se pune aici un meniu pliabil. Pana atunci ar fi cod scris pentru
              un caz pe care nu il pot masura. */}
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

          {/* Sectiunile paginii de start: numai pe `/`, si ascunse sub 768 px, ca pana acum. */}
          {sectiuni.map((s) => (
            <a
              key={s.ancora}
              href={"#" + s.ancora}
              className={"hidden md:inline-block " + LEGATURA}
            >
              {s.scurt}
            </a>
          ))}

          <Buton href={CALE_DISCUTIE} marime="mic" className="shrink-0 whitespace-nowrap">
            Discuție de 30 de minute
          </Buton>
        </nav>
      </Invelis>
    </header>
  );
}
