import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Source_Serif_4 } from "next/font/google";
import "./globals.css";

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
  description:
    "Arhivare fizica, digitalizare si cautare in documente pentru primarii, notari, cabinete de avocatura si firme. Intrebi in limba romana, primesti raspunsul cu pagina din care vine.",
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
        {children}
      </body>
    </html>
  );
}
