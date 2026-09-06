// Un rand din sectiunea de raspundere: intrebarea unui serviciu juridic pe prima coloana
// pe ecran lat, raspunsul pe a doua; la 390 px se stivuiesc, si de aceea textul paginilor
// nu trimite niciodata la "stanga" sau "dreapta".

type Props = {
  intrebare: string;
  children: React.ReactNode;
};

export default function RandRaspundere({ intrebare, children }: Props) {
  return (
    <div className="grid gap-3 border-t border-linie-suprafata py-7 last:border-b lg:grid-cols-[300px_1fr] lg:gap-10">
      <h3 className="font-afis text-[22px] font-semibold tracking-[0.03em] uppercase text-cerneala">
        {intrebare}
      </h3>
      <p className="max-w-[64ch] text-corp text-cerneala-2">{children}</p>
    </div>
  );
}
