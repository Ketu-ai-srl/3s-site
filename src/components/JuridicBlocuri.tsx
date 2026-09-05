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
  const stil = "text-cerneala-accent underline underline-offset-[3px] hover:text-cerneala";
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
  // Aceleasi doua suprafete ca in `BlocDovada`, ca cele doua casete de onestitate ale
  // site-ului sa nu arate diferit: `declaratie` pe noapte-3 cu linia de arama in stanga,
  // `limite` pe noapte-2 cu chenar. Pana pe 2026-09-06 erau bej (#f4eadf) si aproape-alb,
  // ultimele doua suprafete deschise de pe paginile juridice.
  const stil =
    fel === "declaratie"
      ? "border-l-2 border-cerneala-accent bg-noapte-3 px-6 py-5"
      : "border border-linie-suprafata bg-noapte-2 px-6 py-5";
  // Eticheta: arama pe noapte-3 da 5,72:1, deci trece si ca text mic. Nota veche descria
  // perechea de pe fundalul bej (4,48:1, sub prag), care nu mai exista pe pagina.
  const stilEticheta = fel === "declaratie" ? "text-cerneala-accent" : "text-cerneala-3";

  return (
    <div className={`my-6 ${stil}`}>
      <span
        className={`mb-1.5 block font-mono text-eticheta font-medium tracking-[0.1em] uppercase ${stilEticheta}`}
      >
        {eticheta}
      </span>
      <p className="max-w-[74ch] text-corp text-cerneala-2">
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
              <p key={i} className="mb-4 max-w-[74ch] text-corp text-cerneala-2 last:mb-0">
                <Text parti={b.text} />
              </p>
            );

          case "lista":
            return (
              <ul key={i} className="m-0 mb-4 max-w-[74ch] list-none p-0 last:mb-0">
                {b.elemente.map((e, j) => (
                  <li key={j} className="mb-3 flex gap-4 text-corp text-cerneala-2 last:mb-0">
                    {/* Cratima de arama e un element real, nu un marcator de lista: se
                        aliniaza pe prima linie oricat de lung ar fi randul. */}
                    <span aria-hidden className="mt-[11px] h-px w-[9px] shrink-0 bg-cerneala-accent" />
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
                    className="grid gap-1.5 border-t border-linie-suprafata py-4 last:border-b lg:grid-cols-[260px_1fr] lg:gap-8"
                  >
                    <h3 className="font-afis text-[19px] tracking-[0.02em] uppercase text-cerneala">{r.titlu}</h3>
                    <p className="max-w-[64ch] text-corp text-cerneala-2">
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
