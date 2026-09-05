// Un pas din mecanism. Numărul stă pe coloana lui, ca într-un opis.

type Props = {
  numar: number;
  titlu: string;
  children: React.ReactNode;
};

export default function Pas({ numar, titlu, children }: Props) {
  return (
    <li className="grid grid-cols-[44px_1fr] gap-3 border-t border-linie py-6 last:border-b sm:grid-cols-[64px_1fr] sm:gap-6">
      <span className="pt-[5px] font-mono text-[14px] font-medium tracking-[0.04em] text-arama">
        Pasul {numar}
      </span>
      <div>
        <h3 className="mb-1.5 text-[22px]">{titlu}</h3>
        <p className="text-corp text-tus-2">{children}</p>
      </div>
    </li>
  );
}
