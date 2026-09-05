// Lista cu semn de bifa: liniuta de arama e un element real, nu un marcator de lista, ca
// sa se alinieze pe prima linie oricat de lung ar fi randul.
//
// `inchis` a ramas in semnatura pentru paginile care il dau inca; pe fundal de noapte
// culorile sunt aceleasi. Se scoate cand nu-l mai da nimeni.

type Props = {
  titlu: string;
  elemente: string[];
  inchis?: boolean;
};

export default function ListaBifa({ titlu, elemente }: Props) {
  return (
    <div>
      <h3 className="mb-5 font-afis text-[24px] font-semibold tracking-[0.03em] uppercase text-cerneala">
        {titlu}
      </h3>
      <ul className="m-0 list-none p-0">
        {elemente.map((e) => (
          <li key={e} className="mb-3 flex gap-4 text-corp text-cerneala-2">
            <span aria-hidden className="mt-[11px] h-px w-[10px] shrink-0 bg-cerneala-accent" />
            <span>{e}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
