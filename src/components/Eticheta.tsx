// Eticheta mono: cota, categoria, numele mic de deasupra unui titlu. Aceeasi litera ca
// eticheta de pe ecranele vitrinei, doar ca in culoarea de text secundar, nu in arama -
// arama ramane pentru UN accent pe ecran.
//
// `inchis` a ramas in semnatura pentru paginile care il dau inca; pe fundal de noapte
// ambele valori dau aceeasi culoare. Se scoate cand nu-l mai da nimeni.

type Props = {
  children: React.ReactNode;
  inchis?: boolean;
  className?: string;
};

export default function Eticheta({ children, className = "" }: Props) {
  return (
    <span
      className={`font-mono text-[12px] font-medium tracking-[0.2em] uppercase text-cerneala-3 ${className}`}
    >
      {children}
    </span>
  );
}
