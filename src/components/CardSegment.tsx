// Cardul de segment: titlu și un paragraf. Fundalul se dă din afară, fiindcă
// pe banda albă cardul trebuie să fie hârtie, iar pe hârtie trebuie să fie alb.

type Props = {
  titlu: string;
  children: React.ReactNode;
  fundal?: "hartie" | "suprafata";
};

export default function CardSegment({ titlu, children, fundal = "suprafata" }: Props) {
  return (
    <div
      className={`border border-linie p-6 ${fundal === "hartie" ? "bg-hartie" : "bg-suprafata"}`}
    >
      <h3 className="mb-2.5 text-[21px]">{titlu}</h3>
      <p className="text-[16px] text-tus-2">{children}</p>
    </div>
  );
}
