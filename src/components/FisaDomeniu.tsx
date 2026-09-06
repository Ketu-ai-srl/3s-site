import Link from "next/link";

// Un domeniu pe hub-ul /solutii: un RAND de lista, nu un cartonas.
//
// DE CE S-A SCHIMBAT FORMA. Pana pe 2026-09-06 aceleasi sapte domenii aratau in doua
// limbaje opuse, la un clic distanta: pe pagina de start, lista de legaturi cu majuscule
// condensate si sageata de arama, pe negru; pe /solutii, sapte cartonase ALBE de 384x227 px
// pe pagina neagra, cu litera din paleta veche. In plus era chiar forma pe care o cauti cand
// vanezi sabloane: sapte copii identice ale aceleiasi cutii, ultimul rand cu o celula din
// trei ocupata, si sapte repetari ale aceluiasi indemn. Pe 390 px iesea o scara
// alb-negru-alb-negru de sapte trepte.
//
// Randul de aici e forma paginii de start, cu o singura completare ceruta de continut:
// acolo lista poarta doar numele, deci incape pe trei coloane; aici poarta si rezumatul
// domeniului, care nu se pierde, deci randul tine toata latimea. Sageata a ramas - e marca
// legaturii, nu un indemn repetat de sapte ori.
//
// Doua stari, si diferenta e o decizie de onestitate, nu de stil:
//   - cu `href`: domeniul are pagina proprie, randul intreg e legatura;
//   - fara `href`: domeniul e pe lista, dar pagina nu exista inca, deci randul NU e
//     legatura. O legatura catre o pagina care nu exista e o legatura moarta, si e exact
//     clasa pe care un cititor automat o plateste cel mai scump.
//
// Starea vine din date (`pagina` nenul in segmente.ts), nu dintr-un steag scris de mana pe
// hub: asa nu poate exista un rand care promite o pagina inexistenta.

type Props = {
  titlu: string;
  href?: string;
  children: React.ReactNode;
};

const RAND = "grid gap-x-10 gap-y-2 py-6 md:grid-cols-[minmax(0,7fr)_minmax(0,9fr)_auto]";
const NUME =
  "font-afis text-[clamp(1.35rem,2.2vw,1.95rem)] font-semibold tracking-[0.04em] uppercase";
const REZUMAT = "text-[16px] leading-[1.55] text-cerneala-2";

export default function FisaDomeniu({ titlu, href, children }: Props) {
  if (!href) {
    return (
      <li className="list-none border-b border-linie-suprafata">
        <div className={RAND}>
          <h3 className={NUME + " text-cerneala-3"}>{titlu}</h3>
          <p className={REZUMAT}>{children}</p>
          <span className="font-mono text-[12px] tracking-[0.18em] uppercase text-cerneala-3 md:self-center">
            În pregătire
          </span>
        </div>
      </li>
    );
  }

  return (
    <li className="list-none border-b border-linie-suprafata">
      <Link href={href} className={"group block no-underline " + RAND}>
        <h3 className={NUME + " text-cerneala-2 transition-colors duration-200 group-hover:text-cerneala"}>
          {titlu}
        </h3>
        <p className={REZUMAT}>{children}</p>
        <span
          aria-hidden
          className="font-mono text-cerneala-accent transition-transform duration-200 group-hover:translate-x-1 md:self-center"
        >
          →
        </span>
      </Link>
    </li>
  );
}
