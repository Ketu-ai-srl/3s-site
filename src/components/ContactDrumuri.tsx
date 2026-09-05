import Eticheta from "./Eticheta";

// Registrul drumurilor de contact: fiecare drum pe un rând, cu valoarea lui sau cu motivul
// pentru care nu are încă una.
//
// DE CE UN RÂND CU VALOARE LIPSĂ, ȘI NU RÂNDUL ȘTERS. Un site care nu afișează telefonul
// lasă vizitatorul să creadă că l-a ratat el, și îl trimite să caute prin subsol. Un rând
// care spune „nu există încă, iată de ce” închide întrebarea din prima citire și rezervă
// locul în care numărul intră când firma îl are.
//
// De ce marcajul de lipsă nu este o liniuță: o liniuță se citește ca „necompletat din
// neatenție”. Cuvintele spun că absența este o stare cunoscută, nu o scăpare, iar nota de
// alături spune de ce.

export type Drum = {
  /** Numele drumului, așa cum îl caută cineva: „Telefon”, „Poștă electronică”. */
  eticheta: string;
  /** Valoarea, când există. `null` înseamnă că nu există încă, și atunci se scrie de ce. */
  valoare: string | null;
  /** Unde duce valoarea, dacă este o legătură. Fără el, valoarea se scrie ca text. */
  href?: string;
  /** Ce se întâmplă pe drumul acesta, sau de ce nu există încă. */
  nota: string;
};

export default function ContactDrumuri({ drumuri }: { drumuri: Drum[] }) {
  return (
    <div>
      {drumuri.map((d) => (
        <div
          key={d.eticheta}
          className="grid gap-2 border-t border-linie py-6 last:border-b lg:grid-cols-[270px_1fr] lg:gap-8"
        >
          <h3 className="text-[19px] text-tus">{d.eticheta}</h3>
          <div>
            {d.valoare === null ? (
              <Eticheta className="block text-tus-3!">Nu există încă</Eticheta>
            ) : d.href ? (
              <a
                href={d.href}
                className="font-mono text-[17px] text-verde underline underline-offset-[3px]"
              >
                {d.valoare}
              </a>
            ) : (
              <span className="font-mono text-[17px] text-tus">{d.valoare}</span>
            )}
            <p className="mt-2 max-w-[62ch] text-corp text-tus-2">{d.nota}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
