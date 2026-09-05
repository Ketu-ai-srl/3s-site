import Link from "next/link";
import AntetPagina from "./AntetPagina";
import Buton from "./Buton";
import Eticheta from "./Eticheta";
import Invelis from "./Invelis";
import JuridicBlocuri from "./JuridicBlocuri";
import { MASURA, MASURA_CASETA } from "./JuridicMasura";
import { FOTOGRAFII, type CheieFotografie } from "@/content/fotografii";
import { PAGINI_JURIDICE, type PaginaJuridica, type Sectiune } from "@/content/juridic";

// Forma unei pagini juridice, o singura data pentru toate trei.
//
// CE SE REFOLOSESTE DIN SISTEMUL DE DESIGN, si ce se schimba fata de o pagina de segment:
//   - antetul e acelasi `AntetPagina`: fir de navigare, eticheta, singurul h1, lead, si
//     aceleasi doua butoane. De acolo vin si datele structurate BreadcrumbList, deci nu
//     exista o a doua sursa pentru firul de navigare;
//   - sectiunile pastreaza gramatica de registru - banda cu linie sus, coloana de margine
//     cu cifra in serifa de arama, continutul pe corp - dar la o densitate mai mica:
//     `py-10` in loc de `py-24`. Motivul e ca un act cu noua sectiuni scris la ritmul
//     paginii de prezentare ar avea cinci ecrane numai de spatiu alb, iar cine cauta o
//     clauza ar derula prin ele;
//   - cifrele sunt ARABE, nu romane ca pe restul site-ului. Nu e o scapare: pe o pagina de
//     prezentare cota romana e ornament, pe un text juridic cifra e un mijloc de trimitere.
//     "Secțiunea 4" se citeaza intr-un e-mail; "Secțiunea IV" se citeaza mai greu.
//
// CUPRINSUL sta pe banda inchisa, imediat sub antet. Pe un text de noua sectiuni e singura
// piesa care transforma pagina din perete de text in document navigabil, iar fiecare intrare
// duce la o ancora scrisa citibil (`#temeiul`, nu `#s-3`), ca sa poata fi trimisa prin mesaj.

// Alternanta benzilor, pe noapte. Pana pe 2026-09-06 era ["bg-suprafata", "bg-hartie"],
// adica alb si aproape-alb: masurat, /termeni avea 80% suprafata deschisa la 1280 px si 84%
// la 390, /confidentialitate 83% / 86%, /cookies 74% / 79%, in timp ce celelalte 19 pagini
// aveau 0%. Nu era doar fundalul: pe pagina traiau 5 fundaluri si 7 culori de litera, contra
// 2 si 4 pe paginile trecute in directia noua. Mecanismul de cerneala e chiar motivul pentru
// care nimeni nu le-a semnalat - fiind corect intoarsa pe suprafata deschisa, litera trecea
// de 4,5:1 si nicio poarta de contrast nu se inrosea. O poarta de contrast masoara
// contrastul, nu coerenta; coerenta se masoara pe suprafata.
const FUNDAL_ALTERNANT = ["bg-noapte", "bg-noapte-2"];

// Fotografia de antet, per pagina: cele trei pagini juridice se leaga intre ele in blocul de
// incheiere, deci trebuie sa deschida cu trei cadre diferite.
const FOTO_JURIDIC: Record<string, CheieFotografie> = {
  "/termeni": "legatura",
  "/confidentialitate": "dosare",
  "/cookies": "rafturi",
};

function SectiuneJuridica({
  sectiune,
  numar,
  fundal,
}: {
  sectiune: Sectiune;
  numar: number;
  fundal: string;
}) {
  return (
    <section id={sectiune.id} className={`border-t border-linie-suprafata ${fundal}`}>
      <Invelis>
        {/* RITMUL. `py-14 md:py-24`, adica 56 px pe telefon si 96 px pe ecran lat, deci
            192 px de la ultimul rand al unei sectiuni la titlul urmatoarei. Nu e nici pasul
            paginilor de prezentare (`py-24 md:py-36`, care ar da 288 px si ar transforma un
            act de noua sectiuni in cinci ecrane numai de spatiu), nici cel de dinainte
            (`py-10 md:py-14`, 112 px, la care sectiunile se atingeau si cifra din margine
            ramanea singurul semn ca a inceput alta). E treapta documentelor, aceeasi
            alegere argumentata ca antetul-banda: mai stransa decat afisul, larga cat sa se
            vada unde se termina o clauza. */}
        <div className="grid gap-4 py-14 md:grid-cols-[148px_1fr] md:gap-8 md:py-24">
          <div className="flex items-baseline gap-3 border-b border-linie-suprafata pb-3 md:relative md:block md:border-b-0 md:pb-0">
            <span
              aria-hidden
              className="absolute top-1.5 -right-4 bottom-0 hidden w-px bg-linie-suprafata md:block"
            />
            {/* Marcajul de sectiune, ascuns de la cititoarele de ecran: intelesul e purtat
                de titlul h2, iar o cifra citita inaintea lui nu adauga nimic. Cuvantul
                "Secțiunea" apare doar sub 768 px, unde cifra singura, fara coloana de
                margine care sa o explice, ar parea un rest de formatare. Pe ecran lat
                ramane doar cifra, ca la cotele romane din restul site-ului. */}
            {/* Cifra e in MONO, ca toate cotele site-ului, nu in serifa: serifa era ultima
                urma a paletei vechi pe pagina asta si nu mai apare nicaieri altundeva. */}
            <span aria-hidden className="flex items-baseline gap-2 md:block">
              <span className="font-mono text-eticheta font-medium tracking-[0.1em] text-cerneala-3 uppercase md:hidden">
                Secțiunea
              </span>
              <span className="font-mono text-[15px] leading-none font-medium tracking-[0.18em] text-cerneala-accent md:text-[17px]">
                {numar}
              </span>
            </span>
          </div>

          <div>
            {/* MARIMEA TITLULUI DE SECTIUNE. Masurat inainte: 30 px la 1280, langa un corp
                de 16,5 px si sub un titlu de pagina de 64 px. Raportul titlu/corp iesea 1,8,
                cand pe restul site-ului e 3,3 (`text-titlu-2`, 53,8 px). Pe ecran nu se
                citea ca o treapta a scarii, ci ca un rand ingrosat: sectiunile pareau
                paragrafe cu antet, iar cifra din margine ramanea singurul reper.
                `clamp(1.65rem,3vw,2.375rem)` da 38,4 px la 1280 si 26,4 px la 390 - raport
                2,3 fata de corp, si o distanta limpede fata de cele 64 ale titlului de
                pagina. Nu urca la `text-titlu-2`: cu noua sectiuni, fiecare titlu ar deveni
                un afis si documentul s-ar citi ca noua pagini lipite. */}
            <h2 className="mb-6 max-w-[30ch] font-afis text-[clamp(1.65rem,3vw,2.375rem)] tracking-[-0.01em] uppercase text-cerneala">
              {sectiune.titlu}
            </h2>
            <JuridicBlocuri blocuri={sectiune.blocuri} />
          </div>
        </div>
      </Invelis>
    </section>
  );
}

function Cuprins({ sectiuni }: { sectiuni: Sectiune[] }) {
  return (
    <section className="border-t border-linie-suprafata bg-noapte-2">
      <Invelis>
        <div className="py-12 md:py-16">
          <h2 className="mb-5 font-mono text-eticheta font-medium tracking-[0.18em] text-cerneala-3 uppercase">
            Cuprins
          </h2>
          <ol className="m-0 grid list-none gap-x-10 gap-y-2.5 p-0 md:grid-cols-2">
            {sectiuni.map((s, i) => (
              <li key={s.id} className="flex items-baseline gap-3 text-[15.5px]">
                <span
                  aria-hidden
                  className="w-5 shrink-0 font-mono text-fisa text-cerneala-accent"
                >
                  {i + 1}
                </span>
                <a
                  href={"#" + s.id}
                  className="text-cerneala-2 no-underline hover:text-cerneala hover:underline"
                >
                  {s.titlu}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </Invelis>
    </section>
  );
}

function Incheiere({ pagina }: { pagina: PaginaJuridica }) {
  const celelalte = PAGINI_JURIDICE.filter((p) => p.cale !== pagina.cale);

  return (
    <section className="border-t border-linie-suprafata bg-noapte">
      <Invelis>
        <div className="py-12 md:py-16">
          <div className={"mb-8 " + MASURA_CASETA + " border border-linie-suprafata bg-noapte-2 px-6 py-5"}>
            <Eticheta className="mb-1.5 block">Despre textul acesta</Eticheta>
            <p className={MASURA + " text-corp text-cerneala-2"}>{pagina.redactat}</p>
          </div>

          <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
            <Buton href="/#discutie" marime="mare" sageata className="max-sm:w-full">
              Programați o discuție de 30 de minute
            </Buton>
            {celelalte.map((p) => (
              <Buton
                key={p.cale}
                href={p.cale}
                fel="text"
                marime="mare"
              >
                {p.titluMeta}
              </Buton>
            ))}
          </div>

          <p className={"mt-6 " + MASURA + " text-[15.5px] text-cerneala-3"}>
            Dacă ceva din pagina aceasta este neclar sau vă pare greșit, scrieți-ne la{" "}
            <a
              href="mailto:contact@3s.ro"
              className="text-cerneala-accent underline underline-offset-[3px]"
            >
              contact@3s.ro
            </a>
            . Corectăm în text, nu în corespondență, ca să vadă și următorul cititor
            corectura. Serviciile sunt descrise pe{" "}
            <Link href="/solutii" className="text-cerneala-accent underline underline-offset-[3px]">
              pagina de domenii
            </Link>
            .
          </p>
        </div>
      </Invelis>
    </section>
  );
}

export default function JuridicPagina({ pagina }: { pagina: PaginaJuridica }) {
  return (
    <main id="continut">
      <AntetPagina
        adresa={pagina.cale}
        forma="banda"
        imagine={FOTOGRAFII[FOTO_JURIDIC[pagina.cale] ?? "legatura"]}
        fir={[{ text: "Pagina de start", href: "/" }, { text: pagina.titluMeta }]}
        eticheta={pagina.eticheta}
        titlu={pagina.h1}
        lead={pagina.lead}
        actiune={{ href: "/#discutie", text: "Programați o discuție de 30 de minute" }}
        secundar={pagina.secundar}
      />

      <Cuprins sectiuni={pagina.sectiuni} />

      {pagina.sectiuni.map((s, i) => (
        <SectiuneJuridica
          key={s.id}
          sectiune={s}
          numar={i + 1}
          fundal={FUNDAL_ALTERNANT[i % FUNDAL_ALTERNANT.length]}
        />
      ))}

      <Incheiere pagina={pagina} />
    </main>
  );
}
