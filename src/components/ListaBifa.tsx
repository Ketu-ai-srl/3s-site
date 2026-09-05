// Lista cu semn de bifă: cratima de aramă e un element real, nu un marcator de
// listă, ca să se alinieze pe prima linie oricât de lung ar fi rândul.

type Props = {
  titlu: string;
  elemente: string[];
  inchis?: boolean;
};

export default function ListaBifa({ titlu, elemente, inchis = false }: Props) {
  return (
    <div>
      <h3 className={`mb-4 text-[19px] ${inchis ? "text-white" : "text-tus"}`}>{titlu}</h3>
      <ul className="m-0 list-none p-0">
        {elemente.map((e) => (
          <li
            key={e}
            className={`mb-3 flex gap-4 text-corp ${inchis ? "text-pe-inchis" : "text-tus-2"}`}
          >
            <span
              aria-hidden
              className={`mt-[11px] h-px w-[9px] shrink-0 ${
                inchis ? "bg-arama-clar" : "bg-arama"
              }`}
            />
            <span>{e}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
