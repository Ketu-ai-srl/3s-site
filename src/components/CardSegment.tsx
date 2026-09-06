// O fisa de segment: titlu si un paragraf, despartite de restul printr-o linie sus, nu
// printr-o cutie. Cutiile identice, una langa alta, sunt tiparul pe care directia il
// refuza; linia pastreaza ritmul fara sa faca "grila de carduri".
//
// `fundal` a ramas in semnatura pentru paginile care il dau inca; nu mai are efect,
// fisa sta pe fundalul sectiunii. Se scoate cand nu-l mai da nimeni.

type Props = {
  titlu: string;
  children: React.ReactNode;
  fundal?: "hartie" | "suprafata";
};

export default function CardSegment({ titlu, children }: Props) {
  return (
    <div className="border-t border-cerneala-3 pt-5">
      <h3 className="mb-3 font-afis text-[24px] font-semibold tracking-[0.03em] uppercase text-cerneala">
        {titlu}
      </h3>
      <p className="text-[16px] leading-[1.55] text-cerneala-2">{children}</p>
    </div>
  );
}
