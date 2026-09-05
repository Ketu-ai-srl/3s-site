// Eticheta mono, singura excepție sub 15px din design. `inchis` o mută pe
// paleta benzilor întunecate.

type Props = {
  children: React.ReactNode;
  inchis?: boolean;
  className?: string;
};

export default function Eticheta({ children, inchis = false, className = "" }: Props) {
  return (
    <span
      className={`font-mono text-eticheta font-medium tracking-[0.1em] uppercase ${
        inchis ? "text-pe-inchis-2" : "text-tus-2"
      } ${className}`}
    >
      {children}
    </span>
  );
}
