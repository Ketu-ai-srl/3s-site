// Rama cu colțuri de scanare: semnătura vizuală a designului. Cele patru
// colțuri sunt elemente reale, nu pseudo-elemente, ca să rămână o singură sursă
// de adevăr pentru culoare.

type Props = {
  children: React.ReactNode;
  className?: string;
};

const COLT = "pointer-events-none absolute h-[15px] w-[15px] border-arama";

export default function CadruScan({ children, className = "" }: Props) {
  return (
    <div className={`relative border border-linie bg-suprafata ${className}`}>
      <span aria-hidden className={`${COLT} -top-px -left-px border-t-2 border-l-2`} />
      <span aria-hidden className={`${COLT} -top-px -right-px border-t-2 border-r-2`} />
      <span aria-hidden className={`${COLT} -bottom-px -left-px border-b-2 border-l-2`} />
      <span aria-hidden className={`${COLT} -bottom-px -right-px border-b-2 border-r-2`} />
      {children}
    </div>
  );
}
