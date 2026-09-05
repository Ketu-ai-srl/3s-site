"use client";

import { useState } from "react";
import CadruScan from "./CadruScan";
import { STARI, TERMENE } from "@/content/termene";

// Verificatorul de termene. Starea aleasă trăiește în React, nu în DOM: butonul
// apăsat și conținutul afișat citesc același număr, deci nu pot ajunge să spună
// lucruri diferite.

const DOC_BAZA =
  "cursor-pointer border border-linie px-3.5 py-2.5 text-left text-[15px] leading-snug transition-colors duration-150 lg:border-0 lg:border-b lg:border-linie lg:px-3 lg:py-3.5 lg:text-[16px]";

export default function VerificatorTermene() {
  const [ales, setAles] = useState(0);
  const d = TERMENE[ales];
  const s = STARI[d.stare];

  return (
    <div className="grid gap-8 lg:grid-cols-[300px_1fr] lg:items-start">
      <div
        role="group"
        aria-label="Tipuri de documente"
        className="flex flex-wrap gap-2 lg:flex-col lg:gap-0 lg:border-t lg:border-linie"
      >
        {TERMENE.map((t, i) => (
          <button
            key={t.scurt}
            type="button"
            aria-pressed={i === ales}
            onClick={() => setAles(i)}
            className={`${DOC_BAZA} ${
              i === ales
                ? "border-verde bg-verde-moale font-medium text-verde lg:border-linie lg:shadow-[inset_2px_0_0_var(--color-verde)]"
                : "bg-transparent text-tus-2 hover:bg-hartie-2 hover:text-tus"
            }`}
          >
            {t.scurt}
          </button>
        ))}
      </div>

      <CadruScan className="min-h-[340px]">
        <div className="px-4 py-6 sm:px-6 sm:py-8" aria-live="polite">
          <span
            className={`mb-4 inline-flex items-center gap-2 rounded-[2px] px-2.5 py-1 font-mono text-eticheta tracking-[0.08em] uppercase ${s.clase}`}
          >
            {s.text}
          </span>

          <p className="mb-2 text-[16px] text-tus-2">{d.tip}</p>

          {d.termen ? (
            <p className="mb-4 font-serif text-[30px] leading-[1.08] font-semibold tracking-[-0.02em] text-verde sm:text-[38px] lg:text-[46px]">
              {d.termen}
            </p>
          ) : (
            <p className="mb-4 font-serif text-[26px] text-tus-3 italic">
              Rând lăsat gol, intenționat.
            </p>
          )}

          <dl className="m-0">
            {d.dela ? (
              <div className="grid gap-1 border-t border-linie py-3 text-[16px] sm:grid-cols-[150px_1fr] sm:gap-4">
                <dt className="pt-[3px] font-mono text-eticheta tracking-[0.08em] uppercase text-tus-3">
                  Curge din
                </dt>
                <dd className="m-0 text-tus-2">{d.dela}</dd>
              </div>
            ) : null}

            {d.lege ? (
              <div className="grid gap-1 border-t border-linie py-3 text-[16px] sm:grid-cols-[150px_1fr] sm:gap-4">
                <dt className="pt-[3px] font-mono text-eticheta tracking-[0.08em] uppercase text-tus-3">
                  Temei legal
                </dt>
                <dd className="m-0 text-tus-2">
                  <span className="mb-1.5 block font-mono text-[14.5px] text-tus">{d.lege}</span>
                  {d.legeNota}
                </dd>
              </div>
            ) : null}

            <div className="grid gap-1 border-t border-linie py-3 text-[16px] sm:grid-cols-[150px_1fr] sm:gap-4">
              <dt className="pt-[3px] font-mono text-eticheta tracking-[0.08em] uppercase text-tus-3">
                {d.termen ? "Ce mai trebuie știut" : "De ce este gol"}
              </dt>
              <dd className="m-0 text-tus-2">{d.nota}</dd>
            </div>
          </dl>
        </div>
      </CadruScan>
    </div>
  );
}
