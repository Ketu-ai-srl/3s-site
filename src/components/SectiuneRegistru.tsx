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
// Cota romana nu e decor "01/02/03": e numarul de registru pe care paginile il dau si il
// citeaza intre ele. Sta mic, in mono, langa eticheta - nu mare, in serifa, cum era.

export type Ton = "hartie" | "fisier" | "inchis";

const FUNDAL: Record<Ton, string> = {
  hartie: "bg-noapte",
  fisier: "bg-noapte",
  inchis: "bg-noapte-2",
};

type Props = {
  id?: string;
  cota: string;
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
          <span className="text-cerneala-accent">{cota}</span>
          <span className="text-cerneala-3">{eticheta}</span>
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
