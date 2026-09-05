import { Fragment } from "react";
import type { ColoanaComparatie, RandComparatie } from "@/content/comparatie";

// Tabelul de comparație. RĂMÂNE tabel - e cel mai bun lucru de pe pagină și singura formă
// în care șase întrebări cu patru răspunsuri se citesc ca răspunsuri, nu ca proză - dar e
// scris ca o GRILĂ, nu ca `<table>`.
//
// De ce nu un tabel HTML. Patru coloane de proză nu încap la 390 px în niciun fel: ori
// tabelul depășește lățimea ferestrei și poarta de derapaj oprește lotul, ori se pune
// într-un recipient care se derulează lateral, și atunci pe telefon se citește o coloană
// pe rând, orbește, fără să se vadă cu ce compari. O grilă care se reașază rezolvă
// amândouă: pe telefon fiecare întrebare devine un bloc cu patru răspunsuri etichetate,
// pe ecran lat devine tabelul de care are nevoie cineva care compară.
//
// CE COSTĂ ALEGEREA ASTA, scris ca să nu pară gratuită: se pierde semantica de tabel,
// deci un cititor de ecran nu anunță „coloana 3 din 4". Prețul se plătește înapoi punând
// numele variantei ÎN FIECARE CELULĂ: pe telefon se vede, pe ecran lat rămâne în arborele
// de accesibilitate prin `lg:sr-only`, iar capul de tabel vizual e marcat `aria-hidden`,
// fiindcă ar repeta același lucru a doua oară.
//
// PE NOAPTE. Liniile sunt cele ale direcției (`border-linie-suprafata`, adică
// `linie-noapte` pe fundalul paginii), numele variantelor urcă pe litera de afiș
// condensată cu majuscule, iar rezumatul lor coboară în mono mic. Coloana noastră e
// marcată o singură dată, cu linia de aramă în stânga și cu numele în aramă: e singurul
// accent al tabelului, ca ochiul să găsească reperul fără să i se spună de două ori.
//
// Un rând incomplet OPREȘTE construcția, nu se desenează pe jumătate: o celulă lipsă
// într-un tabel de comparație se citește ca „varianta aia nu are răspuns", ceea ce e o
// afirmație, nu o omisiune.

type Props = {
  coloane: ColoanaComparatie[];
  randuri: RandComparatie[];
};

const GRILA =
  "grid grid-cols-1 gap-x-6 gap-y-0 lg:grid-cols-[minmax(150px,0.95fr)_repeat(4,minmax(0,1fr))] xl:gap-x-8";

export default function ComparatieTabel({ coloane, randuri }: Props) {
  for (const rand of randuri) {
    if (rand.celule.length !== coloane.length) {
      throw new Error(
        "ComparatieTabel: randul `" +
          rand.axa +
          "` are " +
          rand.celule.length +
          " celule pentru " +
          coloane.length +
          " coloane. Un rand incomplet nu se deseneaza.",
      );
    }
  }

  return (
    <div className={GRILA}>
      {/* Capul de tabel: numai pe ecran lat, și numai vizual. Numele variantei ajunge la
          cititorul de ecran din celulă, unde e legat de răspunsul lui. */}
      <div aria-hidden className="hidden lg:block" />
      {coloane.map((c) => (
        <div
          key={c.id}
          aria-hidden
          className={`hidden pb-5 lg:block ${
            c.aNoastra ? "border-l-2 border-cerneala-accent pl-5" : ""
          }`}
        >
          <span
            className={`font-afis block text-[19px] leading-[1.15] font-semibold tracking-[0.02em] uppercase ${
              c.aNoastra ? "text-cerneala-accent" : "text-cerneala"
            }`}
          >
            {c.nume}
          </span>
          <span className="mt-2 block font-mono text-[12px] leading-[1.45] text-cerneala-3">
            {c.rezumat}
          </span>
        </div>
      ))}

      {randuri.map((rand) => (
        // Fragment, nu un `div` cu `display: contents`: celulele trebuie să fie copii
        // direcți ai grilei, iar `display: contents` a fost ani buni scos din arborele
        // de accesibilitate de mai multe motoare. Fragmentul nu produce niciun nod.
        <Fragment key={rand.axa}>
          <div className="border-t border-linie-suprafata pt-8 pb-3 lg:pt-7 lg:pb-9">
            <h3 className="font-afis max-w-[22ch] text-[19px] leading-[1.2] font-semibold tracking-[0.02em] uppercase text-cerneala lg:text-[17.5px]">
              {rand.axa}
            </h3>
          </div>

          {rand.celule.map((celula, i) => {
            const c = coloane[i];
            return (
              <div
                key={c.id}
                className={`border-l-2 pb-6 pl-4 lg:pt-7 lg:pb-9 ${
                  c.aNoastra
                    ? "border-cerneala-accent lg:border-t lg:border-l-2 lg:pl-5"
                    : "border-linie-suprafata lg:border-t lg:border-l-0 lg:pl-0"
                }`}
              >
                <span className="mb-2 block font-mono text-[11px] tracking-[0.22em] uppercase text-cerneala-3 lg:sr-only">
                  {c.nume}
                </span>
                <p
                  className={`text-[15.5px] leading-[1.55] lg:text-[15px] ${
                    c.aNoastra ? "text-cerneala" : "text-cerneala-2"
                  }`}
                >
                  {celula}
                </p>
              </div>
            );
          })}
        </Fragment>
      ))}
    </div>
  );
}
