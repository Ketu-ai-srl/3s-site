import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import DateStructurate from "@/components/DateStructurate";

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
  metadataBase: new URL("https://3s.ke2.in"),
  title: {
    default: "3S - Scan Store Solve | Arhiva care raspunde",
    template: "%s | 3S - Scan Store Solve",
  },
  // Descrierea sta sub 160 de caractere: peste prag, motoarele o taie si ultima
  // propozitie se pierde. Poarta S-01 masoara si opreste lotul.
  description:
    "Arhivare fizica, digitalizare si cautare in documente pentru primarii, notari si firme. Intrebati in romana, raspunsul vine cu pagina din care provine.",
  // Canonical auto-referential: fara el, un mediu de proba indexat concureaza cu
  // productia pe aceleasi cuvinte, iar motorul alege singur care adresa castiga.
  alternates: { canonical: "/" },
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    locale: "ro_RO",
    siteName: "3S - Scan Store Solve",
  },
};

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
        {children}
      </body>
    </html>
  );
}
