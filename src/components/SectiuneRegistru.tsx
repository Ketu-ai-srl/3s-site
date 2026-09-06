// Sectiunea-registru a paginilor interioare: cota si eticheta pe un rand mic de mono,
// titlul condensat cu majuscule, o linie de deschidere, apoi continutul. Spatiu mare
// intre sectiuni (`py-24 md:py-36`), acelasi rand de margine ca la `Ecran`, ca titlul
// sectiunii sa stea exact sub titlul ecranului de deschidere.
//
// TONUL. Semnatura veche avea trei tonuri de banda - hartie, fisier, inchis - pentru
// alternanta de pe paginile in lumina. Pe noapte alternanta nu mai are ce sa alterneze:
// `inchis` da o treapta mai deschisa (noapte-2), celelalte doua raman pe noapte. Valorile
// se accepta in continuare ca paginile sa compileze si sa treaca singure in directia noua.
//
// COTA e OPTIONALA, si asta e o schimbare, nu o comoditate. Argumentul vechi era ca nu e
// decor "01/02/03" ci numarul de registru pe care paginile il dau si il citeaza intre ele.
// Citarea a fost cautata si nu exista: zero trimiteri la o cota in `src/content`, `src/app`
// si `src/components` (control pozitiv, ca sa nu masor o cautare stricata: cuvantul "cota"
// apare de patru ori in registrul de afirmatii, deci cautarea gaseste ce exista). Iar
// `JuridicPagina.tsx` scrie chiar contrariul, in aceleasi cuvinte: "pe o pagina de prezentare
// cota romana e ornament, pe un text juridic cifra e un mijloc de trimitere". Fisele de
// domeniu si hub-ul SUNT pagini de prezentare, iar pagina de start - directia aprobata - isi
// eticheteaza cele sase ecrane numai cu cuvinte, fara nicio cifra.
//
// Deci: paginile de vitrina nu mai dau cota si raman cu eticheta-cuvant, ca pagina de start.
// Paginile care sunt DOCUMENTE sau UNELTE o dau in continuare, si o pastreaza: acolo
// numaratoarea e chiar mijlocul de trimitere. Cand cota lipseste, eticheta trece pe arama -
// altfel randul de deasupra titlului si-ar pierde accentul, iar pe pagina de start eticheta
// de sectiune e chiar in arama.

export type Ton = "hartie" | "fisier" | "inchis";

/**
 * Latimea registrului: linia orizontala se opreste unde se opreste textul.
 *
 * Se pune pe LISTA, nu pe fiecare rand: capetele de linie raman aliniate intre ele. Masurat
 * la 1280 px inainte, pe fisele de domeniu si pe hub, linia mergea pana la 1240 iar ultimul
 * pixel cu litera cadea la 922-975 - intre 265 si 318 px de margine moarta la dreapta, de
 * trei ori pe fiecare fisa si o data pe hub. Dupa: intre 0 si 18 px.
 *
 * 900 = eticheta din stanga (320-340) + spatiul dintre coloane (40) + coloana de text
 * (aproximativ 62ch la 16 px). E scrisa o singura data fiindca deja s-a intamplat o data ca
 * reparatia sa se aplice unei singure sectiuni din trei care aveau aceeasi boala.
 */
export const LATIME_REGISTRU = "max-w-[900px]";

const FUNDAL: Record<Ton, string> = {
  hartie: "bg-noapte",
  fisier: "bg-noapte",
  inchis: "bg-noapte-2",
};

type Props = {
  id?: string;
  /** numarul de registru; se da numai pe paginile-document, nu pe cele de vitrina */
  cota?: string;
  eticheta: string;
  titlu: string;
  lead?: React.ReactNode;
  ton?: Ton;
  /**
   * Prima sectiune a unei pagini care e UNEALTA: spatiul de deasupra se injumatateste, ca
   * raspunsul sa incapa in primul ecran. Nu e o optiune de gust si nu se pune pe sectiunile
   * de vitrina - acolo spatiul mare e chiar ritmul directiei.
   */
  dens?: boolean;
  children: React.ReactNode;
};

export default function SectiuneRegistru({
  id,
  cota,
  eticheta,
  titlu,
  lead,
  ton = "hartie",
  dens = false,
  children,
}: Props) {
  return (
    <section id={id} className={`border-t border-linie-suprafata ${FUNDAL[ton]}`}>
      <div
        className={
          "mx-auto w-full max-w-vitrina px-6 md:px-10 " +
          (dens ? "pt-12 pb-24 md:pt-14 md:pb-36" : "py-24 md:py-36")
        }
      >
        {/* `div`, nu `p`, din acelasi motiv ca eticheta din `Ecran`: cota si eticheta nu
            sunt proza, si sunt scrise cu majuscule din CSS. Vezi nota lunga din
            `Ecran.tsx`. */}
        <div className="mb-5 flex items-baseline gap-3 font-mono text-[12px] tracking-[0.22em] uppercase">
          {cota ? <span className="text-cerneala-accent">{cota}</span> : null}
          <span className={cota ? "text-cerneala-3" : "text-cerneala-accent"}>{eticheta}</span>
        </div>
        {/* La `dens`, titlul si linia stau alaturi, ca la banda de antet: asezate una sub
            alta impingeau primul rand al tabelului sub margine chiar dupa ce antetul se
            scurtase. Masurat pe /instrumente la 1280 px: 1,12 ecrane cu ele stivuite, sub
            un ecran cu ele alaturi. */}
        <div
          className={
            dens
              ? "md:grid md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-start md:gap-x-12 lg:gap-x-20"
              : "contents"
          }
        >
          <h2 className="font-afis max-w-[22ch] text-titlu-2 font-bold tracking-[-0.01em] uppercase text-cerneala">
            {titlu}
          </h2>
          {lead ? (
            <p
              className={
                "mt-6 max-w-[52ch] text-[clamp(1.05rem,1.3vw,1.2rem)] leading-[1.5] text-cerneala-2" +
                (dens ? " md:mt-1" : "")
              }
            >
              {lead}
            </p>
          ) : null}
        </div>
        <div className={dens ? "mt-8 md:mt-10" : "mt-14 md:mt-16"}>{children}</div>
      </div>
    </section>
  );
}
