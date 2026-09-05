import Link from "next/link";
import Eticheta from "./Eticheta";

// Fisa unui domeniu, pe hub. Doua stari, si diferenta dintre ele e o decizie de
// onestitate, nu de stil:
//   - cu `href`: domeniul are pagina proprie, fisa intreaga e legatura;
//   - fara `href`: domeniul e pe lista, dar pagina nu exista inca, deci fisa NU e
//     legatura. O legatura catre o pagina care nu exista e o legatura moarta, si e
//     exact clasa pe care un cititor automat o plateste cel mai scump.
//
// Starea vine din date (`pagina` nenul in segmente.ts), nu dintr-un steag scris de
// mana pe hub: asa nu poate exista o fisa care promite o pagina inexistenta.

type Props = {
  titlu: string;
  href?: string;
  children: React.ReactNode;
};

const CUTIE =
  "flex h-full flex-col border border-linie bg-suprafata p-6 transition-colors duration-150";

export default function FisaDomeniu({ titlu, href, children }: Props) {
  const corp = (
    <>
      <h3 className="mb-2.5 text-[21px]">{titlu}</h3>
      <p className="mb-5 text-[16px] text-tus-2">{children}</p>
    </>
  );

  if (!href) {
    return (
      <div className={CUTIE + " border-dashed bg-hartie"}>
        {corp}
        <Eticheta className="mt-auto block text-tus-3!">În pregătire</Eticheta>
      </div>
    );
  }

  return (
    <Link href={href} className={CUTIE + " no-underline hover:border-verde hover:bg-verde-moale"}>
      {corp}
      <span className="mt-auto flex items-baseline gap-2 text-[15.5px] font-medium text-verde">
        Vedeți fișa domeniului
        <span aria-hidden className="font-mono text-[14px]">
          →
        </span>
      </span>
    </Link>
  );
}
