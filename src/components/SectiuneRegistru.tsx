import Eticheta from "./Eticheta";
import Invelis from "./Invelis";

// Secțiunea-registru: cota romană și eticheta stau pe coloana de margine,
// conținutul pe corp. Tonul benzii se dă explicit, nu prin cascadă, ca să nu
// existe două locuri care decid aceeași culoare.

export type Ton = "hartie" | "fisier" | "inchis";

const FUNDAL: Record<Ton, string> = {
  hartie: "border-linie bg-hartie",
  fisier: "border-linie bg-suprafata",
  inchis: "border-linie-inchis bg-verde-adanc",
};

type Props = {
  id?: string;
  cota: string;
  eticheta: string;
  titlu: string;
  lead?: React.ReactNode;
  ton?: Ton;
  children: React.ReactNode;
};

export default function SectiuneRegistru({
  id,
  cota,
  eticheta,
  titlu,
  lead,
  ton = "hartie",
  children,
}: Props) {
  const inchis = ton === "inchis";

  return (
    <section id={id} className={`border-t ${FUNDAL[ton]}`}>
      <Invelis>
        <div className="grid gap-4 py-16 md:grid-cols-[148px_1fr] md:gap-8 md:py-24">
          <div
            className={`flex items-baseline gap-3 border-b pb-3 md:relative md:block md:border-b-0 md:pb-0 ${
              inchis ? "border-linie-inchis" : "border-linie"
            }`}
          >
            <span
              aria-hidden
              className={`absolute top-1.5 -right-4 bottom-0 hidden w-px md:block ${
                inchis ? "bg-linie-inchis" : "bg-linie"
              }`}
            />
            <span
              aria-hidden
              className={`font-serif text-2xl leading-none font-normal md:mb-2.5 md:block md:text-[34px] ${
                inchis ? "text-arama-clar" : "text-arama"
              }`}
            >
              {cota}
            </span>
            <Eticheta inchis={inchis} className="md:block md:max-w-[120px]">
              {eticheta}
            </Eticheta>
          </div>

          <div>
            <h2
              className={`mb-4 max-w-[19ch] text-[27px] md:text-[33px] lg:text-[38px] ${
                inchis ? "text-white" : "text-tus"
              }`}
            >
              {titlu}
            </h2>
            {lead ? (
              <p
                className={`mb-8 max-w-[60ch] text-lead ${
                  inchis ? "text-pe-inchis-2" : "text-tus-2"
                }`}
              >
                {lead}
              </p>
            ) : null}
            {children}
          </div>
        </div>
      </Invelis>
    </section>
  );
}
