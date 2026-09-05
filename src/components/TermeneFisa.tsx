import { STARI } from "@/content/termene";
import type { TermenCuAncora } from "@/content/termene-extins";

// Un rand de termen, randat INTREG si STATIC, pe pagina de instrument.
//
// De ce nu refolosesc aici widgetul de pe pagina de start, desi arata la fel. Widgetul
// tine sapte randuri din opt ascunse in spatele unui clic: e forma potrivita pentru o
// sectiune de prezentare, unde omul cauta un singur raspuns. Pagina de instrument are
// alta sarcina - sa fie citita ca document, tiparita, trimisa prin mesaj si citita de un
// crawler care nu executa JavaScript. Deci fiecare rand e in HTML de la inceput, cu
// ancora lui, iar poarta care cere continut in HTML brut il vede pe tot.
//
// Perechea eticheta - valoare din lista de definitii repeta gramatica vizuala a
// verificatorului dinadins: cine a vazut widgetul recunoaste forma si nu invata nimic nou.

const RAND =
  "grid gap-1 border-t border-linie py-3 text-[16px] sm:grid-cols-[160px_1fr] sm:gap-4";
const ETICHETA_RAND =
  "pt-[3px] font-mono text-eticheta tracking-[0.08em] uppercase text-tus-3";

export default function TermeneFisa({ termen }: { termen: TermenCuAncora }) {
  const stare = STARI[termen.stare];

  return (
    <article
      id={termen.ancora}
      className="border-t border-linie py-8 first:border-t-0 first:pt-0"
    >
      <div className="mb-3 flex flex-wrap items-baseline gap-x-4 gap-y-2">
        <h3 className="max-w-[34ch] text-[20px] text-tus sm:text-[22px]">{termen.tip}</h3>
        <span
          className={`inline-flex items-center rounded-[2px] px-2.5 py-1 font-mono text-eticheta tracking-[0.08em] uppercase ${stare.clase}`}
        >
          {stare.text}
        </span>
      </div>

      {termen.termen ? (
        <p className="mb-4 font-serif text-[28px] leading-[1.1] font-semibold tracking-[-0.02em] text-verde sm:text-[34px]">
          {termen.termen}
        </p>
      ) : (
        <p className="mb-4 font-serif text-[24px] text-tus-3 italic">
          Rând lăsat gol, intenționat.
        </p>
      )}

      <dl className="m-0">
        {termen.dela ? (
          <div className={RAND}>
            <dt className={ETICHETA_RAND}>Curge din</dt>
            <dd className="m-0 max-w-[70ch] text-tus-2">{termen.dela}</dd>
          </div>
        ) : null}

        {termen.lege ? (
          <div className={RAND}>
            <dt className={ETICHETA_RAND}>Temei legal</dt>
            <dd className="m-0 max-w-[70ch] text-tus-2">
              <span className="mb-1.5 block font-mono text-[14.5px] break-words text-tus">
                {termen.lege}
              </span>
              {termen.legeNota}
            </dd>
          </div>
        ) : null}

        <div className={RAND}>
          <dt className={ETICHETA_RAND}>
            {termen.termen ? "Ce mai trebuie știut" : "De ce este gol"}
          </dt>
          <dd className="m-0 max-w-[70ch] text-tus-2">{termen.nota}</dd>
        </div>
      </dl>
    </article>
  );
}
