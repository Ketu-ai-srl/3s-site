import Eticheta from "./Eticheta";

// Un rând de întrebare deschisă: întrebarea, miza ei și starea de azi.
//
// De ce este componentă proprie și nu încă un `MecanismRandFisa`: rândurile astea nu
// poartă un răspuns, ci lipsa lui. Diferența trebuie să se vadă dintr-o privire, altfel
// cititorul le citește ca pe niște afirmații și pleacă exact cu impresia pe care pagina
// încearcă să o evite. Starea stă pe coloana de margine, în același loc pe fiecare rând,
// ca să se poată număra fără să fie citite toate.
//
// Culoarea stării este `arama`, iar componenta se așază pe bandă deschisă. Perechea a
// fost aleasă pentru prag, nu pentru ton: aramă pe hârtie dă 4,75:1, peste pragul de
// 4,5:1 cerut textului de dimensiune normală, iar 13,5 px este text de dimensiune
// normală. Pe `arama-moale` aceeași pereche coboară la 4,47:1 și poarta de accesibilitate
// ar opri lotul, deci blocul nu se pune pe fundalul acela.

type Props = {
  intrebare: string;
  deCeConteaza: string;
  stare: string;
};

export default function SecuritateIntrebare({ intrebare, deCeConteaza, stare }: Props) {
  return (
    <div className="grid gap-2 border-t border-linie py-6 last:border-b lg:grid-cols-[210px_1fr] lg:gap-8">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 lg:block">
        <Eticheta className="lg:mb-1.5 lg:block">Întrebare deschisă</Eticheta>
        <span className="font-mono text-fisa text-arama">{stare}</span>
      </div>

      <div>
        <h3 className="mb-2 text-[19px] text-tus">{intrebare}</h3>
        <p className="max-w-[70ch] text-corp text-tus-2">{deCeConteaza}</p>
      </div>
    </div>
  );
}
