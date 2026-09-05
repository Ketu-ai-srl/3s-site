import Eticheta from "./Eticheta";

// Separatorul de subsectiune: eticheta, titlu, apoi o linie care umple restul randului.

type Props = {
  eticheta: string;
  titlu: string;
};

export default function BandaTitlu({ eticheta, titlu }: Props) {
  return (
    <div className="mt-14 mb-6 flex items-baseline gap-4">
      <Eticheta className="text-cerneala-accent!">{eticheta}</Eticheta>
      <h3 className="font-afis text-[22px] font-semibold tracking-[0.03em] uppercase text-cerneala">
        {titlu}
      </h3>
      <span aria-hidden className="h-px flex-1 bg-linie-suprafata" />
    </div>
  );
}
