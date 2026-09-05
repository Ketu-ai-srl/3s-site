import type { Metadata } from "next";
import AntetPagina from "@/components/AntetPagina";
import BaraAnunt from "@/components/BaraAnunt";
import BaraNavigare from "@/components/BaraNavigare";
import BlocDovada from "@/components/BlocDovada";
import Buton from "@/components/Buton";
import CardSegment from "@/components/CardSegment";
import FisaDomeniu from "@/components/FisaDomeniu";
import SectiuneRegistru from "@/components/SectiuneRegistru";
import SubsolPagina from "@/components/SubsolPagina";
import { HUB, INDIFERENT_DE_DOMENIU, SEGMENTE } from "@/content/segmente";

// Hub-ul de domenii. Nu contine continut scris de mana despre vreun segment: lista se
// genereaza din SEGMENTE, deci un domeniu nou apare aici in clipa in care primeste o
// intrare, fara sa atinga nimeni fisierul asta.
//
// Canonical auto-referential, ca la pagina de start: fara el, mediul de proba indexat
// ar concura cu productia pe aceleasi cuvinte.
export const metadata: Metadata = {
  title: HUB.titluMeta,
  description: HUB.descriereMeta,
  alternates: { canonical: "/solutii" },
};

export default function Solutii() {
  return (
    <>
      <a
        className="absolute top-[-100px] left-4 z-[99] bg-verde px-4 py-3 font-mono text-fisa text-white no-underline focus:top-3"
        href="#continut"
      >
        Săriți la conținut
      </a>

      <BaraAnunt />
      <BaraNavigare />

      <main id="continut">
        <AntetPagina
          adresa="/solutii"
          fir={[{ text: "Pagina de start", href: "/" }, { text: HUB.titluMeta }]}
          eticheta={HUB.eticheta}
          titlu={HUB.h1}
          lead={HUB.lead}
          actiune={{ href: "/#discutie", text: "Programați o discuție de 30 de minute" }}
          secundar={{ href: "/", text: "Vedeți cum funcționează" }}
        />

        <SectiuneRegistru
          id="domenii"
          ton="fisier"
          cota="I"
          eticheta="Domenii"
          titlu="Patru domenii, în ordinea în care le luăm."
          lead="Ordinea este a noastră, nu a dumneavoastră. O scriem ca să știți dacă intrați în prima serie sau vă punem pe listă onest. Domeniile fără fișă sunt pe listă, nu în lucru."
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SEGMENTE.map((s) => (
              <FisaDomeniu
                key={s.slug}
                titlu={s.nume}
                href={s.pagina ? "/solutii/" + s.slug : undefined}
              >
                {s.rezumat}
              </FisaDomeniu>
            ))}
          </div>
        </SectiuneRegistru>

        <SectiuneRegistru
          ton="hartie"
          cota="II"
          eticheta="Ce nu se schimbă"
          titlu="Trei lucruri sunt la fel, indiferent de domeniu."
          lead="Restul paginii vorbește despre diferențe. Astea trei nu se negociază pe segment, fiindcă țin de felul în care e construit serviciul."
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {INDIFERENT_DE_DOMENIU.map((f) => (
              <CardSegment key={f.titlu} titlu={f.titlu}>
                {f.text}
              </CardSegment>
            ))}
          </div>

          <BlocDovada className="mt-8">
            <strong className="font-semibold text-tus">Ce nu scriem pe nicio fișă:</strong> nu
            deținem certificare ISO 27001, nu afișăm sigle de clienți, nu publicăm un număr de
            firme deservite și nu punem preț pe pagină. 3S este o firmă nouă, crescută din ADRIA
            Servicii Arhivare SRL, care arhivează documente din 2019. Vechimea și autorizarea
            sunt ale firmei-mamă și se citesc așa.
          </BlocDovada>
        </SectiuneRegistru>

        <SectiuneRegistru
          ton="fisier"
          cota="III"
          eticheta="Pasul următor"
          titlu="Discuția începe de la arhiva dumneavoastră, nu de la o prezentare."
        >
          <p className="mb-8 max-w-[62ch] text-lead text-tus-2">
            Treizeci de minute în care ne uităm peste umăr la ce aveți azi: câți metri liniari,
            ce se cere cel mai des și ce vă cere controlul. Plecați cu o estimare a volumului și
            cu un calendar de preluare scris, nu cu o ofertă trimisă a doua zi pe email.
          </p>

          <div className="flex flex-wrap gap-3">
            <Buton href="/#discutie" marime="mare" sageata className="max-sm:w-full">
              Programați o discuție de 30 de minute
            </Buton>
            <Buton href="/#termene" fel="contur" marime="mare" className="max-sm:w-full">
              Verificați un termen legal
            </Buton>
          </div>

          <p className="mt-6 max-w-[60ch] text-[15.5px] text-tus-3">
            Scrieți-ne și direct, dacă preferați:{" "}
            <a
              href="mailto:contact@3s.ro"
              className="text-verde underline underline-offset-[3px]"
            >
              contact@3s.ro
            </a>
            . Nu afișăm număr de telefon: solicitările intră prin formular sau email, ca să
            rămână o urmă scrisă a cererii dumneavoastră și a răspunsului nostru.
          </p>
        </SectiuneRegistru>
      </main>

      <SubsolPagina />
    </>
  );
}
