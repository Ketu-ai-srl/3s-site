// Subsolul, randat din `src/app/layout.tsx`, deci prezent pe fiecare pagina.
//
// Legaturile de aici sunt scrise cu calea in fata (`/#mecanism`), nu ca ancore simple:
// subsolul apare si pe pagini care nu au sectiunile paginii de start, iar o ancora fara
// tinta ar fi o legatura moarta. Cu calea in fata, de pe alta pagina duce la pagina de
// start si de acolo la sectiune.

import Link from "next/link";
import Invelis from "./Invelis";
import {
  CAMPURI_IDENTITATE,
  ETICHETE,
  entitate,
  identitateCompleta,
} from "@/content/entitate";
import { CALE_DISCUTIE, RUTE, SECTIUNI_ACASA } from "@/content/rute";

// Aici a stat "Pagină verificată la <data>", pe fiecare pagina a site-ului. S-a scos, si
// merita spus de ce, ca sa nu se intoarca: nimeni nu verificase nimic. Odata ce subsolul a
// trecut in layout, sigiliul a ajuns si pe pagini pe care nu le citise nimeni niciodata -
// o afirmatie despre propria noastra rigoare, nesustinuta, tiparita peste tot.
//
// Data calificata si adevarata a ramas unde are inteles: in `src/app/page.tsx`, langa
// tabelul de termene, unde spune EXACT ce s-a facut la acea data (preluarea termenelor din
// actele citate) si EXACT ce nu s-a facut inca (confirmarea de catre un arhivist autorizat).
// O data fara verb e un sigiliu; o data cu verb e o informatie.

// De ce subsolul are alte coloane decat inainte, si de ce e o reparatie, nu o pierdere.
//
// Varianta veche avea trei coloane scrise de mana, cu 14 legaturi. Masurat in ele:
//   - coloana "Servicii" avea CINCI etichete diferite - arhivare, scanare, nomenclator,
//     selectionare, cautare - din care PATRU duceau la aceeasi ancora, `#mecanism`;
//   - coloana "Documente" avea patru documente juridice - termeni, confidentialitate,
//     prelucrarea datelor, accesibilitate - si toate patru duceau la `#discutie`,
//     adica la formularul de contact. Niciunul nu exista.
// Un subsol care promite paisprezece destinatii si livreaza cinci nu e o harta a site-ului,
// e decor. Cel mai rau, e decor CREDIBIL: omul care cauta politica de confidentialitate o
// vede scrisa si ajunge la un formular.
//
// Varianta de acum se genereaza din `RUTE` si `SECTIUNI_ACASA`, deci nu poate arata o
// destinatie care nu exista, iar `poarta-rute.py` verifica in ambele directii ca manifestul
// si paginile coincid. Serviciile se intorc in subsol cand au pagini proprii - ca legaturi,
// nu ca etichete. Pana atunci, absenta lor e adevarul: nu au pagina.
//
// Documentele juridice raman semnalate de poarta juridica (AVERT L-15) pana cand exista.

const TITLU_COLOANA =
  "mb-3 font-mono text-eticheta font-medium tracking-[0.1em] uppercase text-pe-inchis-3";
const LEGATURA = "text-pe-inchis no-underline hover:text-white hover:underline";

type Legatura = { href: string; text: string };

const PAGINI: Legatura[] = RUTE.map((r) => ({ href: r.cale, text: r.scurt }));

const PE_ACASA: Legatura[] = [
  ...SECTIUNI_ACASA.map((s) => ({ href: "/#" + s.ancora, text: s.scurt })),
  { href: CALE_DISCUTIE, text: "Discuție de 30 de minute" },
];

// Rutele se navigheaza cu `Link`, ancorele cu `a`. Nu e chestiune de stil: `Link` face
// trecerea fara reincarcarea paginii, iar pe o ancora din pagina curenta ar sari peste
// derularea lina din `globals.css`.
function LegaturaSubsol({ href, children }: { href: string; children: React.ReactNode }) {
  if (href.includes("#")) {
    return (
      <a href={href} className={LEGATURA}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={LEGATURA}>
      {children}
    </Link>
  );
}

function Coloana({ titlu, legaturi }: { titlu: string; legaturi: Legatura[] }) {
  return (
    <div>
      <h2 className={TITLU_COLOANA}>{titlu}</h2>
      <ul className="m-0 list-none p-0">
        {legaturi.map((l) => (
          <li key={l.href + l.text} className="mb-2.5 text-[15.5px]">
            <LegaturaSubsol href={l.href}>{l.text}</LegaturaSubsol>
          </li>
        ))}
      </ul>
    </div>
  );
}

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
    <dl className="mt-6 grid gap-x-8 gap-y-1.5 border-t border-linie-inchis pt-6 text-[14px] sm:grid-cols-2 lg:grid-cols-3">
      {CAMPURI_IDENTITATE.map((camp) => (
        <div key={camp} className="flex flex-wrap gap-x-2">
          <dt className="text-pe-inchis-3">{ETICHETE[camp]}:</dt>
          <dd className="m-0 text-pe-inchis">{entitate[camp]}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function Subsol() {
  return (
    <footer className="bg-verde-adanc pt-16 pb-8 text-pe-inchis-2">
      <Invelis>
        <div className="grid gap-8 border-b border-linie-inchis pb-8 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <span className="mb-4 flex items-baseline gap-2.5">
              <span className="font-serif text-[26px] leading-none font-semibold tracking-[-0.02em] text-white">
                3S
              </span>
              <span className="font-mono text-[11.5px] tracking-[0.14em] uppercase text-pe-inchis-3">
                Scan · Store · Solve
              </span>
            </span>
            <p className="max-w-[42ch] text-nota leading-relaxed">
              Arhivare fizică autorizată, digitizare și căutare care citează sursa. 3S este
              proiectul ADRIA Servicii Arhivare SRL, Golești, județul Argeș, firma-mamă care
              arhivează documente din 2019.
            </p>
          </div>

          <Coloana titlu="Pagini" legaturi={PAGINI} />
          <Coloana titlu="Pe pagina de start" legaturi={PE_ACASA} />

          <div>
            <h2 className={TITLU_COLOANA}>Scrieți-ne</h2>
            <p className="m-0 mb-2.5 text-[15.5px]">
              <a href="mailto:contact@3s.ro" className={LEGATURA}>
                contact@3s.ro
              </a>
            </p>
            <p className="m-0 max-w-[32ch] text-nota leading-relaxed">
              Cererile intră prin formular sau prin poștă electronică, ca să rămână o urmă
              scrisă a cererii dumneavoastră și a răspunsului nostru.
            </p>
          </div>
        </div>

        <Identificare />

        <div className="flex flex-wrap gap-x-6 gap-y-2 pt-6 text-[14px]">
          <span>Contract în limba română, sub lege română</span>
        </div>
      </Invelis>
    </footer>
  );
}
