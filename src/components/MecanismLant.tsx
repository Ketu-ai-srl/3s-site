// Lanțul de la întrebare la pagina citată.
//
// E o listă ORDONATĂ fiindcă ordinea e conținutul: fiecare verigă se sprijină pe cea
// dinainte, iar propoziția care contează - „fără sursă, răspunsul nu se afișează" - are
// sens numai dacă se vede unde se rupe lanțul. O grilă de fișe ar fi arătat cinci lucruri
// care se întâmplă, fără să spună că al patrulea depinde de al treilea.
//
// NUMĂRUL SE CITEȘTE, nu decorează. Forma veche scria `01`..`05` mare, cu `aria-hidden`,
// adică exact tiparul pe care direcția îl refuză: un număr de ornament care nu spune
// nimic. Acum scrie „Veriga 2", în mono mic, la vedere - iar fiindcă textul secțiunii
// promite „cinci verigi, în ordine", numărul e chiar conținut, nu podoabă. Elementul
// rămâne `li` într-un `ol`, deci cititorul de ecran anunță poziția singur; asta nu mai e
// o repetare, fiindcă acum eticheta numește veriga, nu doar o numără.

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
          className="border-t border-linie-suprafata py-8 last:border-b md:grid md:grid-cols-[7rem_minmax(0,1fr)] md:gap-x-12 md:py-10 lg:gap-x-20"
        >
          <span className="mb-4 block font-mono text-[12px] tracking-[0.22em] uppercase text-cerneala-accent md:mb-0 md:pt-2">
            Veriga {i + 1}
          </span>
          <div>
            <h3 className="font-afis max-w-[26ch] text-[clamp(1.15rem,2vw,1.6rem)] font-semibold tracking-[0.02em] uppercase text-cerneala">
              {v.titlu}
            </h3>
            <p className="mt-3 max-w-[62ch] text-[17px] leading-[1.6] text-cerneala-2">{v.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
