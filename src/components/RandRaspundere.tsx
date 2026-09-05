// Un rând din secțiunea de răspundere: întrebarea unui serviciu juridic pe
// prima coloana pe ecran lat, raspunsul pe a doua; la 390 px se stivuiesc, si de aceea
// textul paginilor nu trimite niciodata la "stanga" sau "dreapta".

type Props = {
  intrebare: string;
  children: React.ReactNode;
};

export default function RandRaspundere({ intrebare, children }: Props) {
  return (
    <div className="grid gap-2 border-t border-linie-inchis py-6 last:border-b lg:grid-cols-[270px_1fr] lg:gap-8">
      <h3 className="text-[19px] text-white">{intrebare}</h3>
      <p className="text-corp text-pe-inchis-2">{children}</p>
    </div>
  );
}
