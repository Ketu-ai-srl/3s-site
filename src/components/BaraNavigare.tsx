import Link from "next/link";
import Buton from "./Buton";
import Invelis from "./Invelis";

// Bara lipita de sus, pentru paginile INTERIOARE.
//
// De ce nu se refoloseste `Navigatie`: legaturile ei sunt ancore goale - `#mecanism`,
// `#termene`, `#domenii`, `#raspundere` - care exista numai in pagina de start. Pe
// /solutii, un `href="#mecanism"` se rezolva la /solutii#mecanism, adica o ancora fara
// tinta in chiar pagina care o poarta, si poarta de legaturi o raporteaza moarta pe drept.
// Bara de aici duce numai in locuri care exista de oriunde: pagina de start si discutia.
//
// Cand dispecerul leaga meniul global pe rute absolute, componenta asta se poate inlocui
// cu `Navigatie`. Pana atunci, ea e forma care nu produce legaturi moarte.

export default function BaraNavigare() {
  return (
    <header className="sticky top-0 z-40 border-b border-linie bg-hartie/90 backdrop-blur-[8px]">
      <Invelis className="flex items-center gap-6 py-3">
        <Link href="/" className="flex items-baseline gap-2.5 no-underline">
          <span className="font-serif text-[26px] leading-none font-semibold tracking-[-0.02em] text-verde">
            3S
          </span>
          <span className="hidden font-mono text-[11.5px] tracking-[0.14em] uppercase text-tus-3 sm:inline">
            Scan · Store · Solve
          </span>
        </Link>
        <nav className="ml-auto flex items-center gap-6" aria-label="Navigare principală">
          <Link
            href="/"
            className="hidden border-b border-transparent py-1.5 text-[15px] text-tus-2 no-underline hover:border-arama hover:text-tus md:inline-block"
          >
            Pagina de start
          </Link>
          <Buton href="/#discutie" marime="mic" className="shrink-0 whitespace-nowrap">
            Discuție de 30 de minute
          </Buton>
        </nav>
      </Invelis>
    </header>
  );
}
