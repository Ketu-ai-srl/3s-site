import Link from "next/link";
import JuridicIdentificare from "./JuridicIdentificare";
import type { Bloc, Frag } from "@/content/juridic";

// Randarea blocurilor dintr-o sectiune juridica. Un singur loc care stie cum arata un
// paragraf, o enumerare si o caseta, ca sa nu se raspandeasca stilurile prin trei pagini.
//
// LEGATURILE. Regula e cea din subsol si e mecanica, nu de gust: `Link` pentru o ruta,
// `<a>` cand adresa contine un diez. `Link` trece intre pagini fara reincarcare, dar pe o
// ancora din pagina CURENTA sare peste derularea lina din `globals.css`. Conditia pe diez
// acopera ambele cazuri cu o singura regula, deci nu se poate aplica gresit.
//
// LATIMEA RANDULUI. Textul juridic sta pe `max-w-[74ch]`, nu pe toata coloana: peste
// aproximativ optzeci de caractere ochiul pierde inceputul randului urmator, iar aici se
// citesc fraze lungi, nu titluri.

function bucata(f: Frag, i: number) {
  if (typeof f === "string") {
    return <span key={i}>{f}</span>;
  }
  const stil = "text-verde underline underline-offset-[3px] hover:text-verde-apasat";
  if (f.href.includes("#")) {
    return (
      <a key={i} href={f.href} className={stil}>
        {f.text}
      </a>
    );
  }
  return (
    <Link key={i} href={f.href} className={stil}>
      {f.text}
    </Link>
  );
}

function Text({ parti }: { parti: Frag[] }) {
  return <>{parti.map(bucata)}</>;
}

function Caseta({
  fel,
  eticheta,
  parti,
}: {
  fel: "declaratie" | "limite";
  eticheta: string;
  parti: Frag[];
}) {
  // Aceleasi doua feluri ca in `BlocDovada`: `declaratie` spune ce am ales si de ce,
  // `limite` spune ce nu putem sustine. Nu se refoloseste componenta aceea fiindca ea
  // randeaza un singur `<p>` si aici casetele poarta legaturi si fraze lungi.
  const stil =
    fel === "declaratie"
      ? "border-l-[3px] border-arama bg-arama-moale px-6 py-5"
      : "border border-linie-fn bg-hartie px-6 py-5";
  // Eticheta casetei de declaratie e pe `arama-inchis`, nu pe `arama`. Nu e preferinta:
  // masurat cu axe-core pe pagina construita, `--color-arama` (#a4571c) pe fundalul
  // `--color-arama-moale` (#f4eadf) da 4,48:1, adica sub pragul de 4,5:1 din WCAG 1.4.3, si
  // poarta de accesibilitate a oprit lotul pe exact cele doua noduri. `--color-arama-inchis`
  // (#7e4315) pe acelasi fundal da 6,55:1. Perechea nu mai fusese randata nicaieri pe site,
  // fiindca `BlocDovada` primeste `eticheta` doar in varianta pe fundal de hartie.
  const stilEticheta = fel === "declaratie" ? "text-arama-inchis" : "text-tus-2";

  return (
    <div className={`my-6 ${stil}`}>
      <span
        className={`mb-1.5 block font-mono text-eticheta font-medium tracking-[0.1em] uppercase ${stilEticheta}`}
      >
        {eticheta}
      </span>
      <p className="max-w-[74ch] text-corp text-tus-2">
        <Text parti={parti} />
      </p>
    </div>
  );
}

export default function JuridicBlocuri({ blocuri }: { blocuri: Bloc[] }) {
  return (
    <>
      {blocuri.map((b, i) => {
        switch (b.fel) {
          case "paragraf":
            return (
              <p key={i} className="mb-4 max-w-[74ch] text-corp text-tus-2 last:mb-0">
                <Text parti={b.text} />
              </p>
            );

          case "lista":
            return (
              <ul key={i} className="m-0 mb-4 max-w-[74ch] list-none p-0 last:mb-0">
                {b.elemente.map((e, j) => (
                  <li key={j} className="mb-3 flex gap-4 text-corp text-tus-2 last:mb-0">
                    {/* Cratima de arama e un element real, nu un marcator de lista: se
                        aliniaza pe prima linie oricat de lung ar fi randul. */}
                    <span aria-hidden className="mt-[11px] h-px w-[9px] shrink-0 bg-arama" />
                    <span>
                      <Text parti={e} />
                    </span>
                  </li>
                ))}
              </ul>
            );

          case "randuri":
            return (
              <div key={i} className="mb-4 last:mb-0">
                {b.randuri.map((r) => (
                  <div
                    key={r.titlu}
                    className="grid gap-1.5 border-t border-linie py-4 last:border-b lg:grid-cols-[260px_1fr] lg:gap-8"
                  >
                    <h3 className="text-[17.5px] text-tus">{r.titlu}</h3>
                    <p className="max-w-[64ch] text-corp text-tus-2">
                      <Text parti={r.text} />
                    </p>
                  </div>
                ))}
              </div>
            );

          case "declaratie":
          case "limite":
            return <Caseta key={i} fel={b.fel} eticheta={b.eticheta} parti={b.text} />;

          case "identificare":
            return (
              <div key={i} className="my-6">
                <JuridicIdentificare />
              </div>
            );
        }
      })}
    </>
  );
}
