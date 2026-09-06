// Un element care determină costul, pe pagina de investiție.
//
// FORMA: listă tipografică mare, fără cifre. Pagina nu are voie să conțină prețuri, nici
// intervale, deci singurul lucru pe care îl poate da omului care citește e SCARA: în ce
// condiții urcă suma și în ce condiții coboară. De aceea titlul elementului urcă la
// litera de afiș, iar cele două direcții stau dedesubt, ca două rânduri egale, fiecare cu
// eticheta ei de mono.
//
// Numărul elementului a fost SCOS. Forma veche scria „Elementul 4" într-o coloană de
// margine, unde nu spunea nimic: elementele nu sunt o ordine, sunt o listă, iar un număr
// care nu se citește e ornament. Ordinea o dă `ol`-ul din pagină, pentru cine navighează
// cu cititor de ecran.
//
// Cele două direcții rămân o listă de definiții, nu două paragrafe: sunt perechi
// termen-explicație, și așa se anunță și într-un cititor de ecran. Linia de aramă stă pe
// „crește", singura din pereche care merită accentul - două linii de aramă alăturate ar
// fi spus că amândouă sunt la fel de importante.

type Props = {
  titlu: string;
  text: string;
  creste: string;
  scade: string;
};

export default function InvestitiaFactor({ titlu, text, creste, scade }: Props) {
  return (
    <li className="border-t border-linie-suprafata py-10 last:border-b md:py-14">
      <h3 className="font-afis max-w-[26ch] text-[clamp(1.5rem,2.8vw,2.25rem)] font-bold tracking-[-0.01em] uppercase text-cerneala">
        {titlu}
      </h3>
      <p className="mt-4 max-w-[60ch] text-[17px] leading-[1.6] text-cerneala-2">{text}</p>

      <dl className="mt-7 grid gap-6 sm:grid-cols-2 sm:gap-10">
        <div className="border-l-2 border-cerneala-accent pl-5">
          <dt className="m-0 font-mono text-[11px] tracking-[0.22em] uppercase text-cerneala-accent">
            Crește când
          </dt>
          <dd className="m-0 mt-2 max-w-[42ch] text-[15.5px] leading-[1.5] text-cerneala-2">
            {creste}
          </dd>
        </div>
        <div className="border-l-2 border-linie-suprafata pl-5">
          <dt className="m-0 font-mono text-[11px] tracking-[0.22em] uppercase text-cerneala-3">
            Scade când
          </dt>
          <dd className="m-0 mt-2 max-w-[42ch] text-[15.5px] leading-[1.5] text-cerneala-2">
            {scade}
          </dd>
        </div>
      </dl>
    </li>
  );
}
