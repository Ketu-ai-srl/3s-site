// Fișa scurtă din secțiunea de domenii: un nume îngroșat și o linie de context.

type Props = {
  titlu: string;
  children: React.ReactNode;
};

export default function CardCompact({ titlu, children }: Props) {
  return (
    <span className="border border-linie bg-suprafata px-4 py-[11px] text-[15.5px] text-tus-2">
      <b className="block text-corp font-medium text-tus">{titlu}</b>
      {children}
    </span>
  );
}
