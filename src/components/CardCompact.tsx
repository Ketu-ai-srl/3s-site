// Fisa scurta dintr-o insiruire de domenii: un nume si o linie de context, despartite de
// restul printr-o linie sus, nu printr-o cutie. Aceeasi regula ca la `CardSegment`: cutiile
// identice, una langa alta, sunt tiparul pe care directia il refuza.
//
// Nu o importa nimeni azi (verificat cu grep pe `src` si `tests` la felia 25). Ramane cu
// semnatura neatinsa fiindca o cer feliile de pagini care urmeaza; daca trec fara ea, se
// sterge atunci, cu masuratoarea de atunci.

type Props = {
  titlu: string;
  children: React.ReactNode;
};

export default function CardCompact({ titlu, children }: Props) {
  return (
    <span className="block border-t border-linie-suprafata pt-3 text-[15.5px] leading-[1.5] text-cerneala-2">
      <b className="mb-1 block font-afis text-[19px] font-semibold tracking-[0.03em] uppercase text-cerneala">
        {titlu}
      </b>
      {children}
    </span>
  );
}
