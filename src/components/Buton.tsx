import Link from "next/link";

// Butoanele paginii. `plin` e actiunea principala - acelasi buton ca pe ecranele vitrinei:
// contur de hartie veche, majuscule condensate, colturi drepte. `contur` e drumul al
// doilea, mai stins. Butonul principal duce mereu la discutia de 30 de minute, deci
// componenta nu are varianta de accent care sa concureze cu el.
//
// Semnatura (href, fel, marime, sageata, className) e cea veche, ca paginile care il
// folosesc sa ramana compilabile si sa treaca singure in directia noua.

type Fel = "plin" | "contur";
type Marime = "mic" | "normal" | "mare";

const FEL: Record<Fel, string> = {
  plin: "border-cerneala text-cerneala hover:border-cerneala-accent hover:text-cerneala-accent",
  contur: "border-cerneala-3 text-cerneala-2 hover:border-cerneala hover:text-cerneala",
};

const MARIME: Record<Marime, string> = {
  mic: "px-4 py-2.5 text-[13px]",
  normal: "px-5 py-3 text-[14px]",
  mare: "px-6 py-3.5 text-[15px]",
};

const BAZA =
  "group inline-flex items-center justify-center gap-3 border bg-transparent font-afis font-semibold tracking-[0.14em] uppercase no-underline transition-colors duration-200";

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
    <Link href={href} className={`${BAZA} ${FEL[fel]} ${MARIME[marime]} ${className}`}>
      {children}
      {sageata ? (
        <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      ) : null}
    </Link>
  );
}
