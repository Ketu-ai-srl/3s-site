import Link from "next/link";
import Ecran from "./Ecran";
import type { Fotografie } from "@/content/fotografii";

// Antetul unei pagini interioare: acelasi ecran plin ca pe pagina de start (`Ecran`, nivel
// `h1`), cu firul de navigare deasupra etichetei, singurul h1 al paginii, o linie, UN buton
// si, optional, o legatura de text pentru drumul al doilea. Cu fotografie daca pagina da
// una (`imagine`), altfel pe fundal de noapte-2.
//
// Firul de navigare nu e decor: e legatura inapoi, ceruta explicit in ambele sensuri.
// Ultimul element e pagina curenta si NU are legatura - o legatura catre pagina in care
// esti deja e zgomot pentru cititorul cu cititor de ecran, nu ajutor.
//
// Datele structurate BreadcrumbList se emit din aceeasi lista, ca sa nu existe doua
// surse pentru acelasi fir. Tipurile folosite - BreadcrumbList, ListItem - sunt in
// vocabularul pe care poarta S-09 il accepta.
//
// FOTOGRAFIA nu mai e optionala in practica, desi campul e opional in tipuri: pana pe
// 2026-09-06 o dadea numai pagina de start, iar cele 21 de pagini interioare se deschideau
// cu 800 px de negru plat - masurat, 91-92% fundal uniform in primul ecran la 1280 px, fata
// de 18% pe pagina de start. Fotografia se alege din registrul `src/content/fotografii.ts`,
// cheie cu cheie, ca textul alternativ sa aiba o singura sursa.
//
// FORMA. `ecran` e ecranul plin al vitrinei. `banda` e antetul scurt al paginilor care sunt
// DOCUMENTE sau UNELTE (/termeni, /confidentialitate, /cookies, /instrumente): acolo omul a
// venit dupa o clauza sau dupa un termen, si un afis de film de 800 px il tine departe de
// raspuns. Ecranul plin ramane un gest al vitrinei, nu implicitul tuturor.
//
// Semnatura veche (fir, eticheta, titlu, lead, actiune, secundar, adresa) e pastrata
// intreaga; `imagine` si `forma` sunt campurile noi si sunt optionale.

export type Veriga = {
  text: string;
  /** Lipsa inseamna pagina curenta: se scrie ca text, nu ca legatura. */
  href?: string;
};

type Props = {
  fir: Veriga[];
  eticheta: string;
  titlu: React.ReactNode;
  lead: React.ReactNode;
  actiune: { href: string; text: string };
  secundar?: { href: string; text: string };
  /** Adresa canonica a paginii, ca ultima veriga din datele structurate sa aiba adresa. */
  adresa: string;
  /** Fotografie ilustrativa, luata din registrul `src/content/fotografii.ts`. */
  imagine?: Fotografie;
  /** `banda` scurteaza antetul: paginile care sunt documente sau unelte. */
  forma?: "ecran" | "banda";
};

const GAZDA = "https://3s.ke2.in";

export default function AntetPagina({
  fir,
  eticheta,
  titlu,
  lead,
  actiune,
  secundar,
  adresa,
  imagine,
  forma = "ecran",
}: Props) {
  const firStructurat = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: fir.map((v, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: v.text,
      item: GAZDA + (v.href ?? adresa),
    })),
  };

  const firNavigare = (
    <nav aria-label="Firul de navigare" className="mb-8 md:mb-10">
      <ol className="m-0 flex flex-wrap items-baseline gap-x-2 gap-y-1 p-0 font-mono text-[12.5px] tracking-[0.06em] text-cerneala-2">
        {fir.map((v, i) => (
          <li key={v.text} className="flex items-baseline gap-2">
            {i > 0 ? (
              <span aria-hidden className="text-cerneala-3">
                /
              </span>
            ) : null}
            {v.href ? (
              <Link
                href={v.href}
                className="text-cerneala-2 underline decoration-cerneala-3 underline-offset-[3px] hover:text-cerneala"
              >
                {v.text}
              </Link>
            ) : (
              <span aria-current="page" className="text-cerneala">
                {v.text}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );

  return (
    <>
      <Ecran
        nivel="h1"
        forma={forma}
        ton={imagine ? "foto" : "plin"}
        imagine={imagine}
        inainte={firNavigare}
        eticheta={eticheta}
        titlu={titlu}
        text={lead}
        actiune={actiune}
        secundar={secundar}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(firStructurat) }}
      />
    </>
  );
}
