"use client";

import { useState } from "react";
import CadruScan from "./CadruScan";
import Eticheta from "./Eticheta";
import { EXEMPLE } from "@/content/exemple";

// Cartonașul de răspuns din erou. Întrebările se pot apăsa (împrumut din
// direcția contemporană), iar peste card stă ștampila de ILUSTRARE (împrumut
// din direcția editorială): cine se uită la exemplu trebuie să vadă din prima
// că nu e o conversație reală.

const CHIP_BAZA =
  "cursor-pointer rounded-[2px] border px-3.5 py-2.5 text-left text-[15px] leading-snug transition-colors duration-150";

export default function CardExemplu() {
  const [ales, setAles] = useState(0);
  const e = EXEMPLE[ales];

  return (
    <CadruScan>
      <div className="p-4 pb-11 sm:p-6 sm:pb-12">
        <div className="mb-4 flex items-baseline justify-between gap-3 border-b border-linie pb-3">
          <Eticheta>Exemplu de răspuns</Eticheta>
          <Eticheta>WhatsApp · {e.ora}</Eticheta>
        </div>

        <div
          role="group"
          aria-label="Alegeți o întrebare de exemplu"
          className="mb-5 flex flex-wrap gap-2"
        >
          {EXEMPLE.map((ex, i) => (
            <button
              key={ex.intrebare}
              type="button"
              aria-pressed={i === ales}
              onClick={() => setAles(i)}
              className={`${CHIP_BAZA} ${
                i === ales
                  ? "border-verde bg-verde-moale font-medium text-verde"
                  : "border-linie-fn bg-transparent text-tus-2 hover:border-tus hover:text-tus"
              }`}
            >
              {ex.intrebare}
            </button>
          ))}
        </div>

        <div aria-live="polite">
          <p className="mb-4 min-h-[7.5rem] font-serif text-lead text-tus sm:min-h-[6rem]">
            {e.raspuns}
          </p>

          {e.refuz ? (
            <div className="flex flex-wrap items-center gap-3 border-t border-dashed border-linie-fn pt-4 text-nota text-tus-3">
              Refuzul face parte din răspuns. Nu inventăm o cifră ca să nu vă lăsăm fără
              răspuns.
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-3 border-t border-dashed border-linie-fn pt-4">
              <span className="rounded-[2px] bg-verde-moale px-2.5 py-1.5 font-mono text-fisa text-verde">
                {e.sursa}
              </span>
              <a href="#termene" className="text-[14.5px] text-verde underline underline-offset-[3px]">
                {e.legatura}
              </a>
            </div>
          )}
        </div>

        <p className="mt-4 text-fisa text-tus-2">
          Exemplu construit pe documente-model. Când răspunsul nu se află în documentele
          dumneavoastră, primiți „nu am găsit asta în documente”, nu o presupunere.
        </p>
      </div>

      <span className="absolute right-5 -bottom-3.5 rotate-[-7deg] border-2 border-arama bg-hartie/90 px-3 py-1.5 font-mono text-[12px] tracking-[0.24em] text-arama uppercase">
        Ilustrare
      </span>
    </CadruScan>
  );
}
