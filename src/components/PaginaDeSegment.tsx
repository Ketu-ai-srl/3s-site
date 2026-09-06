import Link from "next/link";
import AntetPagina from "./AntetPagina";
import BlocDovada from "./BlocDovada";
import Buton from "./Buton";
import ListaBifa from "./ListaBifa";
import RandRaspundere from "./RandRaspundere";
import SectiuneRegistru, { LATIME_REGISTRU } from "./SectiuneRegistru";
import { FOTOGRAFII, type CheieFotografie } from "@/content/fotografii";
import { HUB, type PaginaSegment } from "@/content/segmente";

// Corpul unei pagini de segment, o singura data pentru toate cele sapte.
//
// De ce e componenta si nu cod copiat in fiecare page.tsx: cerinta feliei e ca urmatorul
// segment sa se adauge FARA sa rescrie cineva paginile. Cu sablonul aici, un segment nou
// inseamna o constanta in `segmente.ts` si un fisier de ruta de vreo douazeci de randuri.
// Fara el, ar insemna sase sectiuni copiate, adica sase locuri care se desincronizeaza la
// prima schimbare de ton.
//
// FORMA SECTIUNILOR, si de ce s-a schimbat. Sectiunile I si II erau acelasi component
// (`CardSegment`) in aceeasi grila de trei coloane, una sub alta: sase cutii identice, cu
// aceeasi latime si aceeasi marime de litera, pe primele doua ecrane de dupa antet. E
// exact tiparul pe care directia il numeste - "grila de fise identice", "sectiuni
// interschimbabile" - si se putea taia o sectiune si lipi in cealalta fara sa observe
// cineva. Acum fiecare sectiune are forma continutului ei:
//
//   I   durerea      blocuri late, unul sub altul, cu titlu mare - se citeste ca o poveste
//   II  schimbarea   randuri pe doua coloane: momentul din zi in stanga, ce se intampla
//                    in dreapta
//   III dovada       doua liste cu liniuta, fata in fata
//   IV  temeiul      registru de citari: numele actului in mono, ca o cota, nu ca un titlu
//   V   intrebarile  intrebare si raspuns (`RandRaspundere`)
//   VI  incheierea   un paragraf si UN buton
//
// Cota IV e in mono dinadins: e o CITARE, iar directia scrie citarile in mono. Inainte era
// un `h3` de 19 px in aceeasi familie cu titlurile de intrebare de dedesubt, deci doua
// sectiuni alaturate aratau la fel.
//
// FOTOGRAFIA de antet se alege dupa slug, aici si nu in `segmente.ts`, fiindca e o decizie
// de vitrina, nu un fapt despre domeniu: cele sapte fise sunt surori si se ajunge la ele
// din aceeasi lista, deci nu au voie sa deschida cu acelasi cadru.
//
// SI NICI CU CADRUL PAGINII DE START, iar asta a fost defectul. Regula veche compara cele
// sapte fise INTRE ELE si scotea din multime chiar pagina de referinta: `constructii` lua
// `rafturi`, adica exact fotografia si exact decupajul eroului de pe `/`. Masurat pe primul
// ecran, cu textul ascuns si miscarea oprita, diferenta medie absoluta intre cele doua
// capturi era ZERO - nu un cadru asemanator, acelasi cadru. La fel se atingeau hub-ul
// /solutii si fisa /solutii/imobiliare, amandoua pe `dulapuri`: omul apasa randul
// "AGENTII IMOBILIARE..." de pe hub si ateriza pe poza pe care tocmai o parasise.
// Argumentul vechi - "se repeta pe ULTIMA fisa din lista" - se sprijinea pe pozitia in
// lista, dar nimeni nu ajunge ultimul intr-o lista: ajunge apasand exact randul acela.
//
// DE CE DOUA PAGINI DESCHID FARA FOTOGRAFIE, si de ce nu e o lipsa. In `public/img/` sunt
// SAPTE cadre si nu se descarca altele (regula directiei: fotografii ilustrative de pe
// Pexels, cu licenta in `LICENTA.md`). Eroul paginii de start tine `rafturi` si nu are voie
// sa reapara, deci raman SASE cadre pentru OPT ecrane de deschidere: hub-ul si cele sapte
// fise. Doua trebuie sa se deschida tipografic, iar directia scrie asta ca varianta egala,
// nu ca exceptie: "fotografie sau `ton='plin'`". Aceeasi pagina aprobata face exact asa -
// din sase ecrane, doua sunt fara fotografie (Solve si Pasul urmator), adica unul din trei.
//
// Cele doua alese: hub-ul, fiindca e singura pagina a carei fotografie nu trebuie sa spuna
// un domeniu anume, si `constructii`, fisa al carei cadru se ciocnea cu pagina de start.
const FOTO_SEGMENT: Record<string, CheieFotografie | null> = {
  notari: "maini",
  primarii: "sertare",
  contabilitate: "cutii",
  avocatura: "dosare",
  constructii: null,
  logistica: "legatura",
  imobiliare: "dulapuri",
};

// Sectiunile II, IV si V isi iau latimea din `LATIME_REGISTRU`: linia se opreste unde se
// opreste textul. Defectul era reparat pentru sectiunea I si numai pentru ea, desi trei
// sectiuni aveau aceeasi boala. Cifrele si motivul, in `SectiuneRegistru.tsx`.

type Props = {
  segment: PaginaSegment;
  /** Numele domeniului, asa cum apare pe hub. Ultima veriga din firul de navigare. */
  nume: string;
  slug: string;
};

export default function PaginaDeSegment({ segment, nume, slug }: Props) {
  const adresa = "/solutii/" + slug;
  const cheieFoto = FOTO_SEGMENT[slug] ?? null;

  return (
    <main id="continut">
      <AntetPagina
        adresa={adresa}
        imagine={cheieFoto ? FOTOGRAFII[cheieFoto] : undefined}
        fir={[
          { text: "Pagina de start", href: "/" },
          { text: HUB.titluMeta, href: "/solutii" },
          { text: nume },
        ]}
        eticheta={segment.eticheta}
        titlu={segment.h1}
        lead={segment.lead}
        actiune={{ href: "/#discutie", text: "Programați o discuție de 30 de minute" }}
        secundar={{ href: "/solutii", text: "Vedeți toate domeniile" }}
      />

      <SectiuneRegistru
        id="situatia"
        ton="fisier"
        eticheta="Situația de azi"
        titlu="Ce se întâmplă acum, înainte să schimbăm ceva."
        // Linia asta e restul deschiderii, mutat de pe ecran (vezi `continuare` in
        // `segmente.ts`). Nu e text nou si nu s-a pierdut niciun rand: ecranul pastreaza
        // prima propozitie, aici vine ce nu incapea in cele 40 de cuvinte ale directiei.
        lead={segment.continuare}
      >
        {/* Greutatea e in STANGA aici si in DREAPTA la sectiunea II: aia e diferenta care se
            vede de la doi metri. Prima varianta punea titlul deasupra textului, pe toata
            latimea, si masurat la 1280 px blocul ocupa 620 din 1200 - jumatatea dreapta
            ramanea goala sub o linie care mergea pana la capat, adica arata neterminat, nu
            aerisit. Titlul de 41,6 px tine acum coloana lui. */}
        <div className="border-t border-linie-suprafata">
          {segment.durere.map((f) => (
            <div
              key={f.titlu}
              className="grid items-start gap-x-14 gap-y-4 border-b border-linie-suprafata py-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:py-14 lg:gap-x-20"
            >
              <h3 className="font-afis text-[clamp(1.6rem,3.2vw,2.6rem)] font-semibold tracking-[0.02em] uppercase text-cerneala">
                {f.titlu}
              </h3>
              <p className="max-w-[58ch] text-[17px] leading-[1.6] text-cerneala-2">{f.text}</p>
            </div>
          ))}
        </div>

        {/* Invitatia la corectie ramane pe pagina, dar sub blocuri, nu inaintea lor: e o
            reactie la ce tocmai s-a citit. Statea in linia de deschidere a sectiunii, iar
            acolo o impingea peste 60 de cuvinte odata cu textul mutat de pe ecran. */}
        <p className="mt-10 max-w-[62ch] text-[15.5px] leading-[1.55] text-cerneala-3">
          Scriem problema așa cum arată ea dintr-un birou. Dacă nu vă recunoașteți în
          rândurile de mai sus, spuneți-ne: înseamnă că am înțeles greșit domeniul.
        </p>
      </SectiuneRegistru>

      <SectiuneRegistru
        id="schimbare"
        ton="inchis"
        eticheta="Ce se schimbă"
        titlu="Aceleași documente, alt mod de a ajunge la ele."
        lead="Pașii serviciului sunt aceiași peste tot. Aici scriem numai ce arată altfel în ziua de lucru a acestui domeniu."
      >
        <dl className={"m-0 border-t border-linie-suprafata p-0 " + LATIME_REGISTRU}>
          {segment.schimbare.map((f) => (
            <div
              key={f.titlu}
              className="grid gap-x-10 gap-y-2 border-b border-linie-suprafata py-7 md:grid-cols-[minmax(0,320px)_minmax(0,1fr)]"
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

        {/* Trimiterea ducea la "cei patru pasi ... pe pagina de start". Pagina de start nu
            mai are pasii de cand a trecut in directia noua, iar mecanismul sta pe
            /cum-functioneaza si are SASE etape, nu patru. Doua afirmatii false intr-o
            singura propozitie, si niciuna dintre ele nu era masurata de vreo poarta. */}
        <p className="mt-10 max-w-[62ch] text-[16px] leading-[1.55] text-cerneala-2">
          Etapele serviciului, fiecare cu documentul ei semnat, sunt scrise pe{" "}
          <Link
            href="/cum-functioneaza"
            className="text-cerneala-accent underline underline-offset-[3px]"
          >
            pagina despre mecanism
          </Link>
          , împreună cu ce trece în grija noastră și ce rămâne la dumneavoastră.
        </p>
      </SectiuneRegistru>

      <SectiuneRegistru
        id="dovada"
        ton="fisier"
        eticheta="Dovada"
        titlu={segment.titluDovada}
        lead="Într-o relație care începe cu predarea unei arhive, afirmația nesusținută costă mai mult decât tăcerea. Punem pe masă prima listă; pe a doua o scriem tot noi, primii."
      >
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <ListaBifa titlu="Ce vă arătăm înainte de semnătură" elemente={segment.aratam} />
          <ListaBifa titlu="Ce nu putem susține încă" elemente={segment.deschise} />
        </div>
      </SectiuneRegistru>

      <SectiuneRegistru
        id="temei"
        ton="inchis"
        eticheta="Temeiul legal"
        titlu="Actele din care vine obligația, numite ca să le puteți citi."
        lead="Nu scriem un termen fără să spunem din ce act vine. Unde nu putem cita articolul, rândul rămâne gol și scriem de ce, în loc să punem o cifră care sună bine."
      >
        <div className={"border-t border-linie-suprafata " + LATIME_REGISTRU}>
          {segment.temeiuri.map((t) => (
            <div
              key={t.act}
              className="grid gap-x-10 gap-y-3 border-b border-linie-suprafata py-7 md:grid-cols-[minmax(0,320px)_minmax(0,1fr)]"
            >
              {/* Numele actului e o CITARE, deci mono, ca in verificatorul de termene si
                  ca in stampila de citare de pe pagina de start. Mono, dar NU arama:
                  sectiunea are deja cota si eticheta blocului de limite in arama, iar
                  regula directiei e un singur accent odata. Forma monospatiata singura
                  spune ca e o citare. */}
              <h3 className="font-mono text-[13.5px] leading-[1.5] tracking-[0.04em] text-cerneala">
                {t.act}
              </h3>
              <p className="max-w-[62ch] text-[16px] leading-[1.55] text-cerneala-2">{t.ce}</p>
            </div>
          ))}
        </div>

        {/* Doua blocuri, nu unul. Masurat pe cele sapte fise, nota asta era SINGURUL bloc
            care trecea de cele 60 de cuvinte ale directiei - intre 70 si 115, in timp ce cel
            mai lung alt bloc de pe orice fisa are 55 - si e chiar blocul pe care pagina isi
            sprijina onestitatea, deci cel mai pagubos de sarit. Nota avea de la inceput doua
            miscari: de ce randul ramane gol, si ce se aplica in locul lui. Taietura e la
            granita lor, cuvant cu cuvant: niciun cuvant scos, niciunul adaugat. */}
        <BlocDovada
          fel="limite"
          eticheta="Termenul pe care nu îl scriem"
          className={"mt-10 " + LATIME_REGISTRU}
        >
          {segment.notaTermene}
        </BlocDovada>

        <BlocDovada
          fel="limite"
          eticheta="Ce se aplică în locul lui"
          className={"mt-5 " + LATIME_REGISTRU}
        >
          {segment.notaCerere}
        </BlocDovada>

        <p className="mt-8 max-w-[62ch] text-[16px] leading-[1.55] text-cerneala-2">
          Termenele pe care le putem cita pe articol stau în{" "}
          <Link
            href="/instrumente/termene-de-pastrare"
            className="text-cerneala-accent underline underline-offset-[3px]"
          >
            verificatorul de termene
          </Link>
          , fiecare cu actul normativ și cu data la care a fost citit.
        </p>
      </SectiuneRegistru>

      <SectiuneRegistru
        id="intrebari"
        ton="fisier"
        eticheta="Întrebări"
        titlu={segment.titluIntrebari}
        lead="Apar în prima discuție sau în chestionarul de securitate. Le punem noi primii, ca să nu pierdeți o săptămână pe corespondență."
      >
        <div className={LATIME_REGISTRU}>
          {segment.intrebari.map((i) => (
            <RandRaspundere key={i.intrebare} intrebare={i.intrebare}>
              {i.raspuns}
            </RandRaspundere>
          ))}
        </div>
      </SectiuneRegistru>

      <SectiuneRegistru
        id="discutie"
        ton="inchis"
        eticheta="Pasul următor"
        titlu={segment.incheiere.titlu}
      >
        <p className="mb-10 max-w-[62ch] text-[clamp(1.05rem,1.3vw,1.2rem)] leading-[1.5] text-cerneala-2">
          {segment.incheiere.text}
        </p>

        {/* UN buton, si spune ce se cere AICI. Masurat pe butoanele cu chenar din `main`:
            pagina de start are sase butoane cu sase texte distincte, fiecare ecran cu pasul
            lui; fisele aveau doua butoane si UN singur text - "Programati o discutie de 30
            de minute" in antet si iar in incheiere - plus inca o cerere in bara fixa, adica
            trei cereri pentru acelasi lucru pe aceeasi pagina. Dupa sase sectiuni de temeiuri
            si intrebari omul are ce cere, si fiecare fisa scrie ce anume, din propriul ei
            paragraf de incheiere.
            Legatura de text de langa el a plecat din acelasi motiv: era al doilea
            "Vedeti toate domeniile" de pe pagina, dupa cel din antet, iar drumul inapoi la
            hub e deja in firul de navigare si in bara de sus. */}
        <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
          <Buton href="/contact" marime="mare" sageata className="max-sm:w-full">
            {segment.incheiere.buton}
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
