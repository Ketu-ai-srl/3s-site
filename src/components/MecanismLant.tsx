// Lantul de la intrebare la pagina citata, pe banda inchisa.
//
// E o lista ORDONATA fiindca ordinea e continutul: fiecare veriga se sprijina pe cea
// dinainte, iar propozitia care conteaza - "fara sursa, raspunsul nu se afiseaza" - are
// sens numai daca se vede unde se rupe lantul. Un grid de carduri ar fi aratat cinci
// lucruri care se intampla, fara sa spuna ca al patrulea depinde de al treilea.
//
// Numarul e `aria-hidden`: elementul e deja `ol`, deci cititorul de ecran anunta pozitia
// singur, iar un "01" citit cu voce tare ar fi al doilea numar pentru acelasi lucru.

import type { Veriga } from "@/content/mecanism";

type Props = {
  verigi: Veriga[];
};

export default function MecanismLant({ verigi }: Props) {
  return (
    <ol className="m-0 grid list-none gap-0 p-0">
      {verigi.map((v, i) => (
        <li
          key={v.titlu}
          className="grid gap-2 border-t border-linie-inchis py-6 last:border-b sm:grid-cols-[52px_1fr] sm:gap-6"
        >
          <span
            aria-hidden
            className="font-mono text-[15px] font-medium tracking-[0.06em] text-arama-clar sm:pt-1"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="mb-1.5 text-[20px] text-white">{v.titlu}</h3>
            <p className="max-w-[66ch] text-corp text-pe-inchis-2">{v.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
