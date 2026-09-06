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
// LATIMEA RANDULUI nu se mai scrie aici. O da coloana grilei, adica cadrul actului
// (`--container-act`, 720 px), si de-asta nu mai exista niciun `max-w-[..ch]` pe elemente:
// doua plafoane pentru aceeasi masura se pot abate unul de la altul, iar exact asta se si
// intampla - h2 statea la 516 px, paragraful la 485, caseta la 547 si blocul de randuri la
// 712, in aceeasi coloana declarata de 952.
//
// Ce ramane din masuratoarea veche, fiindca e capcana care a produs-o: plafonul dinainte
// era scris `max-w-[74ch]` si suna a „74 de caractere pe rand". Nu era. `ch` e latimea
// glifei ZERO, printre cele mai late ale fontului, deci unitatea raspunde la alta intrebare
// decat cea pusa: masurat cu un `Range` peste fiecare rand vizual, dadea 661 px si 98 de
// caractere in medie, cu varf la 103. Nicio poarta nu se inrosea, fiindca niciuna nu numara
// caractere. Cifrele de azi se masoara la fel, pe pagina randata, nu din aritmetica lui
// `ch`, si sunt scrise langa `--container-act` in `globals.css`.

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
      <p className="text-corp text-cerneala-2">
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
              <p key={i} className="mb-4 text-corp text-cerneala-2 last:mb-0">
                <Text parti={b.text} />
              </p>
            );

          case "lista":
            return (
              <ul key={i} className="m-0 mb-4 list-none p-0 last:mb-0">
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
                    className="grid gap-1.5 border-t border-linie-suprafata py-4 last:border-b md:grid-cols-[170px_1fr] md:gap-6"
                  >
                    {/* Coloana titlului s-a stramtat de la 260 la 170 px odata cu cadrul,
                        si tot atunci `lg` a devenit `md`, ca sa se schimbe odata cu grila
                        sectiunii. In 492 px, un titlu de 260 ar fi lasat textului 208 -
                        mai putin decat titlului, care e o eticheta scurta. Asa, masurat,
                        textul sta pe 298 px si 41 de caractere pe rand. Titlurile lungi
                        („Verificarea intr-un browser real") trec pe doua randuri, ceea ce
                        la o lista de definitii e firesc. */}
                    <h3 className="font-afis text-[19px] tracking-[0.02em] uppercase text-cerneala">{r.titlu}</h3>
                    <p className="text-corp text-cerneala-2">
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
