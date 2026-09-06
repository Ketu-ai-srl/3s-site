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
// JavaScript vede toate legaturile. Deschis, acopera tot ecranul de sub bara: un panou de
// 434 px cu pagina vizibila dedesubt arata a lista cazuta peste text, nu a meniu.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CALE_DISCUTIE, RUTE, rutePentruMeniu } from "@/content/rute";

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

  // Panoul acopera tot ecranul, deci pagina de sub el nu are voie sa se mai deruleze:
  // altfel degetul care cauta un rand din meniu muta pagina, nu meniul.
  useEffect(() => {
    if (!deschis) return;
    const inainte = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = inainte;
    };
  }, [deschis]);

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

  // Transparenta peste primul ecran al ORICAREI pagini cunoscute, nu doar pe pagina de
  // start: de la felia 25 fiecare pagina se deschide cu un `Ecran` de noapte sau cu
  // fotografie, iar `Ecran` pune un voal de 0,85 -> 0 pe primii 140 px, exact sub bara.
  // Singura exceptie e o cale care nu e in manifest - pagina de 404 - care e inca deschisa
  // la culoare sus; acolo bara e opaca de la primul pixel. Regula veche (opaca pe orice
  // pagina interioara) venea din vremea cand interioarele erau deschise la culoare si axe
  // picase color-contrast pe 21 de pagini deodata.
  const paginaCunoscuta = RUTE.some((r) => r.cale === cale);
  const opac = derulat || deschis || !paginaCunoscuta;
  const fundal = opac ? "bg-noapte/92 backdrop-blur-[10px]" : "bg-transparent";

  return (
    <header className={"fixed inset-x-0 top-0 z-40 transition-colors duration-300 " + fundal}>
      {/* Voalul barei, si e o reparatie masurata, nu o umbra de gust. Cat timp bara e
          transparenta, randurile ei stau peste fotografia primului ecran, iar acolo unde
          fotografia are o banda luminoasa contrastul cade sub 4,5:1: masurat la 1280x800, pe
          pixelii acoperiti de litera, "Contact" 4,26, "Termene de pastrare" 4,35,
          "Investitia" 4,39 peste `cutii`, si "Arhivare fizica" 3,92 peste `rafturi`, adica si
          pe pagina de start. Voalul din `Ecran` incepe de la marginea de sus a SECTIUNII si
          se stinge in 140 px, deci la y=24 mai lasa aproape 30% din fotografie.
          Se randeaza doar in starea transparenta: derulata, bara are deja fundal opac, si un
          strat in plus peste el n-ar schimba nimic in afara de a strica neclaritatea. */}
      {opac ? null : (
        <div
          aria-hidden="true"
          className="voal-bara pointer-events-none absolute inset-x-0 top-0 -z-10 h-24"
        />
      )}
      <div className="mx-auto flex h-[68px] max-w-vitrina items-center gap-6 px-6 md:px-10">
        <Link href="/" className="flex items-baseline gap-3 no-underline">
          <span className="font-afis text-[30px] leading-none font-bold tracking-[0.02em] text-hartie-veche">
            3S
          </span>
          <span className="hidden font-mono text-[11px] tracking-[0.2em] uppercase text-hartie-veche-2 sm:inline">
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

      {/* Inaltimea panoului e calculata, nu `bottom-0`: `backdrop-blur` de pe bara face din
          ea blocul de referinta al copiilor fixati, si `bottom-0` ar fi insemnat marginea
          de jos a barei, nu a ecranului. */}
      <div
        id="meniu-pliabil"
        hidden={!deschis}
        className="fixed inset-x-0 top-[68px] h-[calc(100dvh-68px)] overflow-y-auto border-t border-linie-noapte bg-noapte md:hidden"
      >
        <div className="mx-auto flex min-h-full max-w-vitrina flex-col px-6 pt-4 pb-10">
          {pagini.map((r) => (
            <Link
              key={r.cale}
              href={r.cale}
              aria-current={cale === r.cale ? "page" : undefined}
              className="border-b border-linie-noapte py-4 font-afis text-[26px] leading-none font-bold tracking-[0.06em] uppercase text-hartie-veche no-underline"
            >
              {r.scurt}
            </Link>
          ))}
          <Link
            href={CALE_DISCUTIE}
            className="mt-auto inline-flex items-center gap-3 self-start border border-hartie-veche px-6 py-3.5 font-afis text-[15px] font-semibold tracking-[0.14em] uppercase text-hartie-veche no-underline"
          >
            Discuție de 30 de minute
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
