import type { Metadata } from "next";
import AntetPagina from "@/components/AntetPagina";
import BandaTitlu from "@/components/BandaTitlu";
import BlocDovada from "@/components/BlocDovada";
import Buton from "@/components/Buton";
import CardSegment from "@/components/CardSegment";
import FisaDomeniu from "@/components/FisaDomeniu";
import SectiuneRegistru from "@/components/SectiuneRegistru";
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

// Impartirea se face dupa DATE, nu dupa o lista scrisa aici: un domeniu are legatura
// exact atunci cand are pagina. Asa nu poate exista o fisa care promite o ruta
// inexistenta, si nici o pagina scrisa pe care hub-ul sa o tina ascunsa.
const CU_FISA = SEGMENTE.filter((s) => s.pagina !== null);
const PE_LISTA = SEGMENTE.filter((s) => s.pagina === null);

export default function Solutii() {
  return (
    <>


      <main id="continut">
        <AntetPagina
          adresa="/solutii"
          fir={[{ text: "Pagina de start", href: "/" }, { text: HUB.titluMeta }]}
          eticheta={HUB.eticheta}
          titlu={HUB.h1}
          lead={HUB.lead}
          actiune={{ href: "/#discutie", text: "Programați o discuție de 30 de minute" }}
          // Butonul asta a dus la `/` pana cand pagina cerută de el a existat: felia care a
          // scris hub-ul nu avea voie sa lege o ruta inexistenta, si poarta de legaturi ar
          // fi oprit lotul pe drept. Acum tinta reala exista.
          secundar={{ href: "/cum-functioneaza", text: "Vedeți cum funcționează" }}
        />

        <SectiuneRegistru
          id="domenii"
          ton="fisier"
          cota="I"
          eticheta="Domenii"
          titlu="Patru domenii, în ordinea în care le luăm."
          // Lead-ul NU mai vorbeste despre "domenii pe lista": odata ce felia 11 a adus fisele
          // pentru primarii, contabilitate si avocatura, multimea aceea e goala, iar banda
          // "Pe lista" nu se mai randeaza. O propozitie care descrie o multime goala nu e
          // gresita tehnic, dar e o promisiune despre ordine pe care pagina nu o mai arata.
          lead="Pașii sunt aceiași peste tot. Ce diferă este ce se cere des, cine controlează și cât se păstrează. Fișele de mai jos scriu diferența, domeniu cu domeniu, și spun pe față unde încă nu avem un răspuns."
        >
          {CU_FISA.length > 0 ? (
            <>
              <BandaTitlu eticheta="Scrise" titlu="Domeniile care au fișa lor" />
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {CU_FISA.map((s) => (
                  <FisaDomeniu key={s.slug} titlu={s.nume} href={"/solutii/" + s.slug}>
                    {s.rezumat}
                  </FisaDomeniu>
                ))}
              </div>
            </>
          ) : null}

          {PE_LISTA.length > 0 ? (
            <>
              <BandaTitlu eticheta="Pe listă" titlu="Urmează, în ordinea de mai jos" />
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {PE_LISTA.map((s) => (
                  <FisaDomeniu key={s.slug} titlu={s.nume}>
                    {s.rezumat}
                  </FisaDomeniu>
                ))}
              </div>
            </>
          ) : null}
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

    </>
  );
}
