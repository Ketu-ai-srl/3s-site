import type { Metadata } from "next";
import AntetPagina from "@/components/AntetPagina";
import BandaTitlu from "@/components/BandaTitlu";
import BlocDovada from "@/components/BlocDovada";
import Buton from "@/components/Buton";
import FisaDomeniu from "@/components/FisaDomeniu";
import SectiuneRegistru, { LATIME_REGISTRU } from "@/components/SectiuneRegistru";
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

// Benzile de subsectiune au sens NUMAI cand exista amandoua grupurile: ele raspund la
// intrebarea "de ce sunt randurile astea altfel decat celelalte". Cu un singur grup nu e
// nimic de deosebit, iar un titlu peste toata lista o eticheteaza degeaba.
const DOUA_GRUPURI = CU_FISA.length > 0 && PE_LISTA.length > 0;

// Titlul ecranului, rupt unde l-a rupt autorul in `segmente.ts`. Se citeste dintr-un singur
// loc: sirul poarta ruperea, pagina doar o randeaza.
const TITLU_RUPT = HUB.h1.split("\n").flatMap((rand, i) =>
  i === 0 ? [rand] : [<br key={"rand-" + i} />, rand],
);

export default function Solutii() {
  return (
    <main id="continut">
      {/* Hub-ul se deschide TIPOGRAFIC, fara fotografie, si nu din lipsa. Deschidea cu
          `dulapuri`, exact cadrul fisei /solutii/imobiliare: masurat pe primul ecran, cu
          textul ascuns si miscarea oprita, diferenta medie absoluta intre cele doua capturi
          era zero. Randul "AGENTII IMOBILIARE SI ADMINISTRARE DE IMOBILE" de pe lista de mai
          jos ducea deci pe poza pe care omul tocmai o parasise. Sunt sapte fotografii pentru
          opt ecrane de deschidere (hub plus sapte fise), fara cea a paginii de start, care nu
          are voie sa se repete; din cele doua care raman fara cadru, hub-ul e alegerea
          evidenta - e singura pagina a carei fotografie nu trebuie sa spuna un domeniu anume.
          Directia da ecranul tipografic ca varianta egala, iar pagina de start face la fel pe
          doua din sase ecrane. */}
      <AntetPagina
        adresa="/solutii"
        fir={[{ text: "Pagina de start", href: "/" }, { text: HUB.titluMeta }]}
        eticheta={HUB.eticheta}
        titlu={TITLU_RUPT}
        lead={HUB.lead}
        actiune={{ href: "/#discutie", text: "Programați o discuție de 30 de minute" }}
        secundar={{ href: "/cum-functioneaza", text: "Vedeți cum funcționează" }}
      />

      <SectiuneRegistru
        id="domenii"
        ton="fisier"
        eticheta="Domenii"
        // Titlul NU numara domeniile, si asta e o reparatie, nu o preferinta de stil. Pana
        // acum scria "Patru domenii, in ordinea in care le luam" deasupra unei liste
        // generate din SEGMENTE, care ajunsese la sapte intrari: cifra scrisa de mana a
        // ramas in urma listei si nimeni nu a masurat-o, fiindca nicio poarta nu compara
        // un numar din proza cu lungimea unui tablou. Un titlu fara numar nu poate
        // imbatrani.
        titlu="Fiecare rând, o fișă."
        lead={HUB.listaLead}
      >
        {CU_FISA.length > 0 ? (
          <>
            {DOUA_GRUPURI ? (
              <BandaTitlu eticheta="Scrise" titlu="Domeniile care au fișa lor" />
            ) : null}
            <ul className="m-0 list-none border-t border-linie-suprafata p-0">
              {CU_FISA.map((s) => (
                <FisaDomeniu key={s.slug} titlu={s.nume} href={"/solutii/" + s.slug}>
                  {s.rezumat}
                </FisaDomeniu>
              ))}
            </ul>
          </>
        ) : null}

        {PE_LISTA.length > 0 ? (
          <>
            {DOUA_GRUPURI ? (
              <BandaTitlu eticheta="Pe listă" titlu="Urmează, în ordinea de mai jos" />
            ) : null}
            <ul className="m-0 list-none border-t border-linie-suprafata p-0">
              {PE_LISTA.map((s) => (
                <FisaDomeniu key={s.slug} titlu={s.nume}>
                  {s.rezumat}
                </FisaDomeniu>
              ))}
            </ul>
          </>
        ) : null}
      </SectiuneRegistru>

      <SectiuneRegistru
        ton="inchis"
        eticheta="Ce nu se schimbă"
        // Si aici a plecat numarul, din acelasi motiv: lista vine din
        // INDIFERENT_DE_DOMENIU, iar "Trei lucruri" ar fi fost fals in ziua in care se
        // adauga al patrulea.
        titlu="Aceleași reguli, în orice domeniu."
        lead="Restul paginii vorbește despre diferențe. Astea nu se negociază pe segment, fiindcă țin de felul în care e construit serviciul."
      >
        {/* Rand de registru, nu cartonas. Trei cutii identice una langa alta erau exact
            forma pe care directia o refuza, si aparea la un clic distanta de lista
            tipografica de deasupra - acelasi continut in doua limbaje vizuale. Randul
            asta e larg si citibil pana la capat, iar titlul din stanga tine coloana. */}
        <dl className={"m-0 border-t border-linie-suprafata p-0 " + LATIME_REGISTRU}>
          {INDIFERENT_DE_DOMENIU.map((f) => (
            <div
              key={f.titlu}
              className="grid gap-x-10 gap-y-2 border-b border-linie-suprafata py-7 md:grid-cols-[minmax(0,340px)_minmax(0,1fr)]"
            >
              <dt className="font-afis text-[clamp(1.2rem,1.7vw,1.5rem)] font-semibold tracking-[0.03em] uppercase text-cerneala">
                {f.titlu}
              </dt>
              <dd className="m-0 max-w-[62ch] text-[16px] leading-[1.55] text-cerneala-2">
                {f.text}
              </dd>
            </div>
          ))}
        </dl>

        <BlocDovada className="mt-12">
          <strong className="font-semibold text-cerneala">Ce nu scriem pe nicio fișă:</strong> nu
          deținem certificare ISO 27001, nu afișăm sigle de clienți, nu publicăm un număr de
          firme deservite și nu punem preț pe pagină. 3S este o firmă nouă, crescută din ADRIA
          Servicii Arhivare SRL, care arhivează documente din 2019. Vechimea și autorizarea
          sunt ale firmei-mamă și se citesc așa.
        </BlocDovada>
      </SectiuneRegistru>

      <SectiuneRegistru
        ton="fisier"
        eticheta="Pasul următor"
        titlu="Discuția începe de la arhiva dumneavoastră."
      >
        <p className="mb-10 max-w-[62ch] text-[clamp(1.05rem,1.3vw,1.2rem)] leading-[1.5] text-cerneala-2">
          Treizeci de minute în care ne uităm peste umăr la ce aveți azi: câți metri liniari,
          ce se cere cel mai des și ce vă cere controlul. Plecați cu o estimare a volumului și
          cu un calendar de preluare scris, nu cu o ofertă trimisă a doua zi pe email.
        </p>

        {/* Butonul NU repeta cererea din antet. Acolo scrie "Programati o discutie de 30 de
            minute"; aici, dupa lista de domenii si dupa ce nu se schimba, omul are ce cere, si
            butonul spune anume ce - din chiar paragraful de deasupra lui. */}
        <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
          <Buton href="/contact" marime="mare" sageata className="max-sm:w-full">
            Cereți estimarea de volum
          </Buton>
          {/* Tinta era `/#termene`, o ancora care nu mai exista: verificatorul a plecat de
              pe pagina de start pe pagina lui, iar legatura ateriza tacut in capul paginii
              de start. Nicio poarta nu o vedea - cea de legaturi nu evalueaza ancore. */}
          <Buton href="/instrumente/termene-de-pastrare" fel="text" marime="mare">
            Verificați un termen legal
          </Buton>
        </div>

        <p className="mt-8 max-w-[60ch] text-[15.5px] leading-[1.55] text-cerneala-3">
          Scrieți-ne și direct, dacă preferați:{" "}
          <a
            href="mailto:contact@3s.ro"
            className="text-cerneala-accent underline underline-offset-[3px]"
          >
            contact@3s.ro
          </a>
          . Nu afișăm număr de telefon: solicitările intră prin formular sau email, ca să
          rămână o urmă scrisă a cererii dumneavoastră și a răspunsului nostru.
        </p>
      </SectiuneRegistru>
    </main>
  );
}
