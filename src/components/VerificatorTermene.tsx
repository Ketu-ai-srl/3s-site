"use client";

import { useState } from "react";
import CadruScan from "./CadruScan";
import { STARI, TERMENE } from "@/content/termene";

// Verificatorul de termene. Starea aleasa traieste in React, nu in DOM: butonul apasat si
// continutul afisat citesc acelasi numar, deci nu pot ajunge sa spuna lucruri diferite.
//
// Eticheta de stare isi ia clasele din `src/content/termene.ts`, nu de aici: trei perechi
// de fundal deschis si cerneala din paleta veche, cate una pe stare. Sunt trei chipuri
// deschise la culoare, ca niste stampile puse peste fisa intunecata, si contractul de
// suprafata din `globals.css` le da cerneala inchisa inauntru. Sunt singurele suprafete
// deschise ramase in componenta, si sunt intentionate - o stampila se vede fiindca e din
// alt material decat pagina.
//
// Perechile NU se citeaza aici pe litere, si nici in alt comentariu: proba din
// `tests/directia.test.ts` cauta numele vechi de cerneala in sursa primitivelor, iar ea
// citeste fisierul intreg, nu doar codul. Un comentariu care scrie clasa devine chiar
// instanta pe care proba o vaneaza - prinsa asa, la prima rulare.
//
// Nu il importa nimeni azi (verificat cu grep la felia 25): a iesit de pe pagina de start
// odata cu vitrina si il asteapta pagina de instrumente. Semnatura si comportamentul raman
// neatinse, doar culorile trec in directia noua.

const DOC_BAZA =
  "cursor-pointer border border-linie-suprafata px-3.5 py-2.5 text-left font-afis text-[15px] leading-snug font-semibold tracking-[0.06em] uppercase transition-colors duration-150 lg:border-0 lg:border-b lg:border-linie-suprafata lg:px-3 lg:py-3.5";

export default function VerificatorTermene() {
  const [ales, setAles] = useState(0);
  const d = TERMENE[ales];
  const s = STARI[d.stare];

  return (
    <div className="grid gap-8 lg:grid-cols-[300px_1fr] lg:items-start">
      <div
        role="group"
        aria-label="Tipuri de documente"
        className="flex flex-wrap gap-2 lg:flex-col lg:gap-0 lg:border-t lg:border-linie-suprafata"
      >
        {TERMENE.map((t, i) => (
          <button
            key={t.scurt}
            type="button"
            aria-pressed={i === ales}
            onClick={() => setAles(i)}
            className={`${DOC_BAZA} ${
              i === ales
                ? "border-cerneala-accent bg-transparent text-cerneala lg:border-l-2 lg:border-l-cerneala-accent"
                : "bg-transparent text-cerneala-2 hover:text-cerneala"
            }`}
          >
            {t.scurt}
          </button>
        ))}
      </div>

      <CadruScan className="min-h-[340px]">
        <div className="px-4 py-6 sm:px-6 sm:py-8" aria-live="polite">
          <span
            className={`mb-4 inline-flex items-center gap-2 px-2.5 py-1 font-mono text-eticheta tracking-[0.08em] uppercase ${s.clase}`}
          >
            {s.text}
          </span>

          <p className="mb-2 text-[16px] text-cerneala-2">{d.tip}</p>

          {d.termen ? (
            <p className="mb-4 font-afis text-[34px] leading-[0.95] font-bold tracking-[0.01em] uppercase text-cerneala-accent sm:text-[42px] lg:text-[52px]">
              {d.termen}
            </p>
          ) : (
            <p className="mb-4 font-vitrina text-[22px] text-cerneala-3 italic">
              Rând lăsat gol, intenționat.
            </p>
          )}

          <dl className="m-0">
            {d.dela ? (
              <div className="grid gap-1 border-t border-linie-suprafata py-3 text-[16px] sm:grid-cols-[150px_1fr] sm:gap-4">
                <dt className="pt-[3px] font-mono text-eticheta tracking-[0.08em] uppercase text-cerneala-3">
                  Curge din
                </dt>
                <dd className="m-0 text-cerneala-2">{d.dela}</dd>
              </div>
            ) : null}

            {d.lege ? (
              <div className="grid gap-1 border-t border-linie-suprafata py-3 text-[16px] sm:grid-cols-[150px_1fr] sm:gap-4">
                <dt className="pt-[3px] font-mono text-eticheta tracking-[0.08em] uppercase text-cerneala-3">
                  Temei legal
                </dt>
                <dd className="m-0 text-cerneala-2">
                  <span className="mb-1.5 block font-mono text-[14.5px] text-cerneala">{d.lege}</span>
                  {d.legeNota}
                </dd>
              </div>
            ) : null}

            <div className="grid gap-1 border-t border-linie-suprafata py-3 text-[16px] sm:grid-cols-[150px_1fr] sm:gap-4">
              <dt className="pt-[3px] font-mono text-eticheta tracking-[0.08em] uppercase text-cerneala-3">
                {d.termen ? "Ce mai trebuie știut" : "De ce este gol"}
              </dt>
              <dd className="m-0 text-cerneala-2">{d.nota}</dd>
            </div>
          </dl>
        </div>
      </CadruScan>
    </div>
  );
}
