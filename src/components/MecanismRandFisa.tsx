// Un rand de fisa: termenul sau intrebarea pe coloana din stanga, raspunsul pe dreapta.
//
// Aceeasi forma cu randurile de temei juridic din `PaginaDeSegment`, scoasa in componenta
// fiindca acum o folosesc trei sectiuni de pe doua pagini: glosarul de arhivistica,
// pasii selectionarii si actele normative. Copiata a patra oara, ar fi devenit patru
// locuri care se desincronizeaza la prima schimbare de latime a coloanei.
//
// `inchis` muta perechea de culori pe banda intunecata. Nu e o optiune de stil: pe verde
// adanc, `text-tus-2` da un contrast sub prag si poarta de accesibilitate opreste lotul.

type Props = {
  titlu: string;
  children: React.ReactNode;
  inchis?: boolean;
};

export default function MecanismRandFisa({ titlu, children, inchis = false }: Props) {
  return (
    <div
      className={`grid gap-2 border-t py-6 last:border-b lg:grid-cols-[290px_1fr] lg:gap-8 ${
        inchis ? "border-linie-inchis" : "border-linie"
      }`}
    >
      <h3 className={`text-[19px] ${inchis ? "text-white" : "text-tus"}`}>{titlu}</h3>
      <p className={`max-w-[70ch] text-corp ${inchis ? "text-pe-inchis-2" : "text-tus-2"}`}>
        {children}
      </p>
    </div>
  );
}
