import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import BaraAnunt from "@/components/BaraAnunt";
import DateStructurate from "@/components/DateStructurate";
import Navigatie from "@/components/Navigatie";
import Subsol from "@/components/Subsol";
import { ADRESA_BAZA, indexareaEstePermisa } from "@/content/rute";

// Subsetul `latin-ext` e obligatoriu, nu decorativ: fara el, s si t cu virgula
// (U+0219 / U+021B) cad pe fontul de rezerva si diacriticele romanesti se vad
// dintr-o alta familie in mijlocul cuvantului.
const serifa = Source_Serif_4({
  variable: "--font-serifa",
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  display: "swap",
});

const corp = IBM_Plex_Sans({
  variable: "--font-corp",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const masina = IBM_Plex_Mono({
  variable: "--font-masina",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(ADRESA_BAZA),
  title: {
    default: "3S - Scan Store Solve | Arhiva care răspunde",
    template: "%s | 3S - Scan Store Solve",
  },
  // Descrierea sta sub 160 de caractere: peste prag, motoarele o taie si ultima
  // propozitie se pierde. Poarta S-01 masoara si opreste lotul.
  description:
    "Arhivare fizică, digitalizare și căutare în documente pentru primării, notari și firme. Întrebați în română, răspunsul vine cu pagina din care provine.",
  //
  // AICI NU SE DECLARA CANONICAL. Nu e o omisiune, e regula.
  //
  // Un `alternates: { canonical: "/" }` scris in layout se mosteneste de fiecare pagina,
  // deci pe un site cu mai multe pagini toate ar declara aceeasi adresa canonica si
  // motorul ar pastra una singura in index. Canonical-ul se scrie PE PAGINA, in
  // `metadata` din `page.tsx`, cu propria cale:
  //     export const metadata = { alternates: { canonical: "/solutii" } }
  // Fiind relativ, se rezolva absolut prin `metadataBase` de mai sus.
  //
  // O pagina care uita canonical-ul nu trece tacut: poarta S-02 din
  // `.claude/scripts/porti/poarta-seo.py` cere exact o eticheta `link[rel=canonical]`,
  // absoluta, pe https, fara parametri si auto-referentiala.
  //
  // Indexarea e oprita implicit si se deschide numai in productie. Valoarea se citeste la
  // construire; plasa de siguranta la rulare e antetul pus de `src/middleware.ts`.
  robots: indexareaEstePermisa()
    ? { index: true, follow: true }
    : { index: false, follow: false },
  openGraph: {
    type: "website",
    locale: "ro_RO",
    siteName: "3S - Scan Store Solve",
  },
};

// Bara de anunt, meniul si subsolul stau aici, nu in pagini: sunt aceleasi pe tot site-ul,
// iar o pagina noua trebuie sa le primeasca fara ca autorul ei sa faca ceva.
//
// Legatura de sarire tinteste `#zona-continut`, un invelis randat tot aici. Daca ar tinti
// un identificator din pagina, fiecare pagina noua ar fi obligata sa il puna, iar prima
// care ar uita ar produce o ancora fara tinta pe toata sectiunea de site. Asa, contractul
// e indeplinit de layout, nu cerut de la fiecare autor.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body
        className={`${serifa.variable} ${corp.variable} ${masina.variable} antialiased`}
      >
        <DateStructurate />
        <a
          className="absolute top-[-100px] left-4 z-[99] bg-verde px-4 py-3 font-mono text-fisa text-white no-underline focus:top-3"
          href="#zona-continut"
        >
          Săriți la conținut
        </a>
        <BaraAnunt />
        <Navigatie />
        <div id="zona-continut">{children}</div>
        <Subsol />
      </body>
    </html>
  );
}
