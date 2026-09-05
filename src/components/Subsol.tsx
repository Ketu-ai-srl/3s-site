// Subsolul, randat din `src/app/layout.tsx`, deci prezent pe fiecare pagina.
//
// E UN RAND, nu o harta. Varianta dinaintea feliei 25 avea 979 px pe ecran lat si 1.625 px
// pe telefon - aproape doua ecrane - cu 29 de legaturi si 119 cuvinte: fiecare ruta din
// manifest, fiecare ancora a paginii de start, trei coloane cu titlu. Referinta data de
// owner are 74 px si sase legaturi. Un subsol care repeta tot site-ul nu ajuta pe nimeni
// sa gaseasca ceva; pentru asta exista `/harta-site`, care e chiar una dintre legaturi.
//
// Ce ramane: sigla, sase legaturi (domeniile, mecanismul, contactul, cele doua texte
// juridice de baza si harta), adresa de posta electronica - singurul canal direct, fiindca
// site-ul nu afiseaza telefon - linia de atribuire catre ADRIA, care e afirmatia de
// vechime scrisa corect, si blocul de identificare cerut de lege, cand e complet.
//
// Legaturile se iau din `RUTE`, dupa cale, nu se scriu de mana: o cale care ar disparea
// din manifest ar disparea si de aici, in loc sa ramana o legatura moarta. Ancorele
// paginii de start (`SECTIUNI_ACASA`) nu mai apar in subsol.
//
// Aici a stat "Pagină verificată la <data>", pe fiecare pagina a site-ului. S-a scos, si
// merita spus de ce, ca sa nu se intoarca: nimeni nu verificase nimic. Odata ce subsolul a
// trecut in layout, sigiliul a ajuns si pe pagini pe care nu le citise nimeni niciodata -
// o afirmatie despre propria noastra rigoare, nesustinuta, tiparita peste tot. O data fara
// verb e un sigiliu; o data cu verb e o informatie.

import Link from "next/link";
import {
  CAMPURI_IDENTITATE,
  ETICHETE,
  entitate,
  identitateCompleta,
} from "@/content/entitate";
import { RUTE } from "@/content/rute";

const CAI_IN_SUBSOL = [
  "/solutii",
  "/cum-functioneaza",
  "/contact",
  "/termeni",
  "/confidentialitate",
  "/harta-site",
];

const LEGATURI = CAI_IN_SUBSOL.flatMap((cale) => RUTE.filter((r) => r.cale === cale));

const LEGATURA =
  "font-afis text-[14px] font-semibold tracking-[0.12em] uppercase text-hartie-veche-2 no-underline transition-colors duration-200 hover:text-hartie-veche";

/**
 * Blocul de identificare a comerciantului, cerut de Legea 365/2002 art. 5 alin. (1).
 *
 * Se randeaza numai cand TOATE campurile au valoare. Cat timp unul e necompletat, blocul
 * lipseste cu totul: textul `de completat` ajuns pe un site public arata a santier si, mai
 * rau, pare o valoare. Absenta lui e vizibila si mecanic - poarta juridica o trateaza ca
 * avertisment pe mediul de proba si ca oprire la productie, deci site-ul nu poate fi
 * publicat cu identitatea pe jumatate.
 *
 * Telefonul apare aici fiindca il cere art. 5 alin. (1) lit. c). Nu contrazice decizia
 * comerciala de a nu folosi telefonul drept canal de contact: una e datul de identificare
 * al firmei, alta e canalul prin care se primesc cererile, care ramane formularul si posta
 * electronica.
 */
function Identificare() {
  if (!identitateCompleta()) {
    return null;
  }
  return (
    <dl className="mt-6 grid gap-x-8 gap-y-1.5 border-t border-linie-noapte pt-6 text-[14px] sm:grid-cols-2 lg:grid-cols-3">
      {CAMPURI_IDENTITATE.map((camp) => (
        <div key={camp} className="flex flex-wrap gap-x-2">
          <dt className="text-hartie-veche-3">{ETICHETE[camp]}:</dt>
          <dd className="m-0 text-hartie-veche">{entitate[camp]}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function Subsol() {
  return (
    <footer className="border-t border-linie-noapte bg-noapte">
      <div className="mx-auto w-full max-w-vitrina px-6 py-8 md:px-10">
        <div className="flex flex-wrap items-center gap-x-10 gap-y-5">
          <Link href="/" className="flex items-baseline gap-3 no-underline">
            <span className="font-afis text-[26px] leading-none font-bold tracking-[0.02em] text-hartie-veche">
              3S
            </span>
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-hartie-veche-3">
              Scan · Store · Solve
            </span>
          </Link>

          <nav aria-label="Subsol" className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {LEGATURI.map((r) => (
              <Link key={r.cale} href={r.cale} title={r.descriere} className={LEGATURA}>
                {r.scurt}
              </Link>
            ))}
            <a href="mailto:contact@3s.ro" className={LEGATURA}>
              contact@3s.ro
            </a>
          </nav>
        </div>

        <p className="mt-6 max-w-[80ch] text-[14px] leading-[1.55] text-hartie-veche-2">
          3S este proiectul ADRIA Servicii Arhivare SRL, Golești, județul Argeș, firma-mamă
          care arhivează documente din 2019. Contract în limba română, sub lege română.
        </p>

        <Identificare />
      </div>
    </footer>
  );
}
