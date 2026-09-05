import Eticheta from "./Eticheta";

// Un element care determina costul, pe pagina de investitie.
//
// Forma e cea a randurilor de fisa din restul site-ului - termen pe coloana din stanga,
// raspuns pe dreapta - cu o singura adaugire: cele doua directii in care se misca
// elementul. Fara ele, pagina ar spune "costul depinde de metrii liniari", ceea ce e
// adevarat si inutil. Cu ele, cineva isi poate da singur seama in ce jumatate a
// intervalului cade fondul lui, fara sa ii dam o cifra pe care nu o putem sustine.
//
// Directiile sunt scrise ca lista de definitii, nu ca doua paragrafe: sunt perechi
// termen-explicatie, si asa se anunta si intr-un cititor de ecran.

type Props = {
  numar: number;
  titlu: string;
  text: string;
  creste: string;
  scade: string;
};

export default function InvestitiaFactor({ numar, titlu, text, creste, scade }: Props) {
  return (
    <li className="grid gap-3 border-t border-linie py-7 last:border-b lg:grid-cols-[290px_1fr] lg:gap-8">
      <div>
        <span className="font-mono text-fisa font-medium tracking-[0.04em] text-arama-inchis">
          Elementul {numar}
        </span>
        <h3 className="mt-1.5 text-[20px] text-tus">{titlu}</h3>
      </div>

      <div>
        <p className="max-w-[70ch] text-corp text-tus-2">{text}</p>

        <dl className="mt-5 grid gap-4 sm:grid-cols-2 sm:gap-8">
          <div className="border-l-2 border-arama pl-4">
            <dt className="m-0">
              <Eticheta className="text-arama-inchis!">Crește când</Eticheta>
            </dt>
            <dd className="m-0 mt-1 text-nota text-tus-2">{creste}</dd>
          </div>
          <div className="border-l-2 border-linie-fn pl-4">
            <dt className="m-0">
              <Eticheta>Scade când</Eticheta>
            </dt>
            <dd className="m-0 mt-1 text-nota text-tus-2">{scade}</dd>
          </div>
        </dl>
      </div>
    </li>
  );
}
