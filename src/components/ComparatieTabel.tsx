import { Fragment } from "react";
import type { ColoanaComparatie, RandComparatie } from "@/content/comparatie";

// Tabelul de comparatie, scris ca o GRILA, nu ca `<table>`.
//
// De ce nu un tabel HTML. Patru coloane de proza nu incap la 390 px in niciun fel: ori
// tabelul depaseste latimea ferestrei si poarta de derapaj opreste lotul, ori se pune
// intr-un recipient care se deruleaza lateral, si atunci pe telefon se citeste o coloana
// pe rand, orbeste, fara sa se vada cu ce compari. O grila care se reaseaza rezolva
// amandoua: pe telefon fiecare intrebare devine un bloc cu patru raspunsuri etichetate,
// pe ecran lat devine tabelul de care are nevoie cineva care compara.
//
// CE COSTA ALEGEREA ASTA, scris ca sa nu para gratuita: se pierde semantica de tabel,
// deci un cititor de ecran nu anunta "coloana 3 din 4". Pretul se plateste inapoi punand
// numele variantei IN FIECARE CELULA: pe telefon se vede, pe ecran lat ramane in arborele
// de accesibilitate prin `lg:sr-only`, iar capul de tabel vizual e marcat `aria-hidden`,
// fiindca ar repeta acelasi lucru a doua oara.
//
// Un rand incomplet OPRESTE constructia, nu se deseneaza pe jumatate: o celula lipsa
// intr-un tabel de comparatie se citeste ca "varianta aia nu are raspuns", ceea ce e o
// afirmatie, nu o omisiune.

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
      {/* Capul de tabel: numai pe ecran lat, si numai vizual. Numele variantei ajunge la
          cititorul de ecran din celula, unde e legat de raspunsul lui. */}
      <div aria-hidden className="hidden lg:block" />
      {coloane.map((c) => (
        <div
          key={c.id}
          aria-hidden
          className={`hidden pb-4 lg:block ${
            c.aNoastra ? "border-l-2 border-arama pl-5" : ""
          }`}
        >
          <span
            className={`block text-[17px] leading-[1.25] font-medium ${
              c.aNoastra ? "text-verde" : "text-tus"
            }`}
          >
            {c.nume}
          </span>
          <span className="mt-1.5 block text-fisa text-tus-3">{c.rezumat}</span>
        </div>
      ))}

      {randuri.map((rand) => (
        // Fragment, nu un `div` cu `display: contents`: celulele trebuie sa fie copii
        // directi ai grilei, iar `display: contents` a fost ani buni scos din arborele
        // de accesibilitate de mai multe motoare. Fragmentul nu produce niciun nod.
        <Fragment key={rand.axa}>
          <div className="border-t border-linie pt-8 pb-3 lg:pt-6 lg:pb-8">
            <h3 className="text-[19px] text-tus lg:text-[17.5px] lg:leading-[1.3]">
              {rand.axa}
            </h3>
          </div>

          {rand.celule.map((celula, i) => {
            const c = coloane[i];
            return (
              <div
                key={c.id}
                className={`border-l-2 pb-5 pl-4 lg:pt-6 lg:pb-8 ${
                  c.aNoastra
                    ? "border-arama lg:border-t lg:border-l-2 lg:pl-5"
                    : "border-linie lg:border-t lg:border-l-0 lg:pl-0"
                }`}
              >
                <span className="mb-1.5 block font-mono text-fisa tracking-[0.04em] text-tus-3 lg:sr-only">
                  {c.nume}
                </span>
                <p
                  className={`text-[15.5px] leading-[1.55] lg:text-nota ${
                    c.aNoastra ? "text-tus" : "text-tus-2"
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
