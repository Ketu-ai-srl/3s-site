// Butoanele paginii. `plin` e acțiunea principală (verde institutional),
// `contur` e cea secundară. Butonul principal duce mereu la discuția de 30 de
// minute, deci componenta nu are variantă de accent care să concureze cu el.

type Fel = "plin" | "contur";
type Marime = "mic" | "normal" | "mare";

const FEL: Record<Fel, string> = {
  plin: "border-verde bg-verde text-white hover:bg-verde-apasat",
  contur: "border-linie-fn bg-transparent text-verde hover:border-verde hover:bg-verde-moale",
};

const MARIME: Record<Marime, string> = {
  mic: "px-3.5 py-2.5 text-[14.5px]",
  normal: "px-5 py-3 text-[15.5px]",
  mare: "px-6 py-[15px] text-baza",
};

const BAZA =
  "inline-flex items-center justify-center gap-2.5 rounded-[2px] border font-medium no-underline transition-colors duration-150 active:translate-y-px";

type Props = {
  href: string;
  children: React.ReactNode;
  fel?: Fel;
  marime?: Marime;
  sageata?: boolean;
  className?: string;
};

export default function Buton({
  href,
  children,
  fel = "plin",
  marime = "normal",
  sageata = false,
  className = "",
}: Props) {
  return (
    <a href={href} className={`${BAZA} ${FEL[fel]} ${MARIME[marime]} ${className}`}>
      {children}
      {sageata ? (
        <span aria-hidden className="font-mono text-[14px] opacity-80">
          →
        </span>
      ) : null}
    </a>
  );
}
