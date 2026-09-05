// Un rând de întrebare deschisă: întrebarea, miza ei și starea de azi.
//
// De ce este componentă proprie și nu încă un `MecanismRandFisa`: rândurile astea nu
// poartă un răspuns, ci lipsa lui. Diferența trebuie să se vadă dintr-o privire, altfel
// cititorul le citește ca pe niște afirmații și pleacă exact cu impresia pe care pagina
// încearcă să o evite. Starea stă pe coloana de margine, în același loc pe fiecare rând,
// ca să se poată număra fără să fie citite toate.
//
// RÂNDURI DISTINCTE, nu un bloc. Cele șase întrebări sunt argumentul paginii de
// securitate, nu subsolul ei: strânse într-o listă cu bulină, s-ar fi citit ca o
// rezervă politicoasă la sfârșit. Fiecare are propriul rând, cu propria linie deasupra,
// și se numără de la distanță.
//
// Culoarea stării e arama direcției, luată din suprafață (`text-cerneala-accent`), deci
// se recalculează dacă rândul ajunge vreodată pe altă treaptă de fundal. Pe `noapte` dă
// 6,76:1 și pe `noapte-3` 5,72:1 - peste pragul de 4,5:1 cerut textului mic; cifrele
// măsurate sunt în `docs/design/DIRECTIA.md`.

type Props = {
  intrebare: string;
  deCeConteaza: string;
  stare: string;
};

export default function SecuritateIntrebare({ intrebare, deCeConteaza, stare }: Props) {
  return (
    <div className="grid gap-4 border-t border-linie-suprafata py-8 last:border-b lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-8 lg:py-10">
      <div>
        <span className="block font-mono text-[11px] tracking-[0.22em] uppercase text-cerneala-3">
          Întrebare deschisă
        </span>
        <span className="mt-1.5 block font-mono text-[13.5px] leading-[1.4] text-cerneala-accent">
          {stare}
        </span>
      </div>

      <div>
        <h3 className="font-afis max-w-[30ch] text-[clamp(1.15rem,1.9vw,1.5rem)] font-semibold tracking-[0.02em] uppercase text-cerneala">
          {intrebare}
        </h3>
        <p className="mt-3 max-w-[64ch] text-[17px] leading-[1.6] text-cerneala-2">{deCeConteaza}</p>
      </div>
    </div>
  );
}
