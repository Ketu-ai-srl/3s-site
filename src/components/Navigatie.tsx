"use client";

// Bara de sus, randata din `src/app/layout.tsx`, deci prezenta pe fiecare pagina.
//
// Directia noua (sep 2026): negru, un singur rand, majuscule condensate, subtire. Sta FIXA
// peste imaginea din primul ecran si se inchide la culoare cand pagina se deruleaza.
//
// Ce s-a scos, si de ce: ancorele paginii de start NU mai apar in bara. Cand am urcat sase
// pagini in bara, ancorele au ramas langa ele si bara arata "Cum functioneaza" de doua ori,
// "Domenii" de doua ori, pe doua-trei randuri. Nicio poarta nu prindea asta - derapajul
// masoara latimea, nu randurile, nici dublurile. Acum exista o proba care refuza ambele.
//
// Panoul de sub 768 px e HTML servit de la inceput, doar ascuns: cine citeste pagina fara
// JavaScript vede toate legaturile.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CALE_DISCUTIE, rutePentruMeniu } from "@/content/rute";

const LEGATURA =
  "font-afis text-[15px] font-semibold tracking-[0.12em] uppercase text-hartie-veche-2 no-underline transition-colors duration-200 hover:text-hartie-veche whitespace-nowrap";

export default function Navigatie() {
  const cale = usePathname();
  const pagini = rutePentruMeniu();
  const [deschis, setDeschis] = useState(false);
  const [derulat, setDerulat] = useState(false);
  const butonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setDeschis(false);
  }, [cale]);

  // Bara devine opaca dupa primii pixeli de derulare. Peste imaginea din primul ecran e
  // transparenta; peste text ar fi ilizibila.
  useEffect(() => {
    const laDerulare = () => setDerulat(window.scrollY > 24);
    laDerulare();
    window.addEventListener("scroll", laDerulare, { passive: true });
    return () => window.removeEventListener("scroll", laDerulare);
  }, []);

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

  // Transparenta DOAR pe pagina de start, peste fotografia din primul ecran, unde voalul
  // e deja negru. Pe orice alta pagina bara e opaca de la primul pixel: paginile interioare
  // sunt inca deschise la culoare, iar text alb de hartie pe fundal deschis a picat axe pe
  // 21 de pagini dintr-o data (color-contrast, serious, x9 pe fiecare).
  const peAcasa = cale === "/";
  const fundal = derulat || deschis || !peAcasa ? "bg-noapte/92 backdrop-blur-[10px]" : "bg-transparent";

  return (
    <header className={"fixed inset-x-0 top-0 z-40 transition-colors duration-300 " + fundal}>
      <div className="mx-auto flex h-[68px] max-w-[1400px] items-center gap-6 px-6 md:px-10">
        <Link href="/" className="flex items-baseline gap-3 no-underline">
          <span className="font-afis text-[30px] leading-none font-bold tracking-[0.02em] text-hartie-veche">
            3S
          </span>
          <span className="hidden font-mono text-[11px] tracking-[0.2em] uppercase text-hartie-veche-3 sm:inline">
            Scan · Store · Solve
          </span>
        </Link>

        <nav className="ml-auto flex items-center gap-7" aria-label="Meniu principal">
          <div className="hidden items-center gap-7 md:flex">
            {pagini.map((r) => (
              <Link
                key={r.cale}
                href={r.cale}
                title={r.descriere}
                aria-current={cale === r.cale ? "page" : undefined}
                className={LEGATURA + (cale === r.cale ? " text-hartie-veche" : "")}
              >
                {r.scurt}
              </Link>
            ))}
          </div>

          <Link
            href={CALE_DISCUTIE}
            className="hidden shrink-0 border border-hartie-veche-2 px-4 py-2 font-afis text-[14px] font-semibold tracking-[0.12em] uppercase text-hartie-veche no-underline transition-colors duration-200 hover:border-arama-clar hover:text-arama-clar sm:inline-block"
          >
            Discuție
          </Link>

          <button
            ref={butonRef}
            type="button"
            onClick={() => setDeschis((d) => !d)}
            aria-expanded={deschis}
            aria-controls="meniu-pliabil"
            className="-mr-1 shrink-0 cursor-pointer border-0 bg-transparent p-1.5 text-hartie-veche md:hidden"
          >
            <span className="sr-only">{deschis ? "Închideți meniul" : "Deschideți meniul"}</span>
            <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true" focusable="false">
              {deschis ? (
                <path d="M5 5 L17 17 M17 5 L5 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
              ) : (
                <path d="M3 6 H19 M3 11 H19 M3 16 H19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
              )}
            </svg>
          </button>
        </nav>
      </div>

      <div id="meniu-pliabil" hidden={!deschis} className="border-t border-linie-noapte bg-noapte md:hidden">
        <div className="mx-auto flex max-w-[1400px] flex-col px-6 py-2">
          {pagini.map((r) => (
            <Link
              key={r.cale}
              href={r.cale}
              aria-current={cale === r.cale ? "page" : undefined}
              className="border-b border-linie-noapte py-3.5 font-afis text-[19px] font-semibold tracking-[0.1em] uppercase text-hartie-veche no-underline last:border-b-0"
            >
              {r.scurt}
            </Link>
          ))}
          <Link
            href={CALE_DISCUTIE}
            className="py-3.5 font-afis text-[19px] font-semibold tracking-[0.1em] uppercase text-arama-clar no-underline"
          >
            Discuție de 30 de minute
          </Link>
        </div>
      </div>
    </header>
  );
}
