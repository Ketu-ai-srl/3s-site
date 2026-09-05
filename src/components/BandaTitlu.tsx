import Eticheta from "./Eticheta";

// Separatorul de subsecțiune: etichetă, titlu, apoi o linie care umple restul
// rândului.

type Props = {
  eticheta: string;
  titlu: string;
};

export default function BandaTitlu({ eticheta, titlu }: Props) {
  return (
    <div className="mt-12 mb-4 flex items-baseline gap-4">
      <Eticheta className="text-arama!">{eticheta}</Eticheta>
      <h3 className="text-[20px]">{titlu}</h3>
      <span aria-hidden className="h-px flex-1 bg-linie" />
    </div>
  );
}
