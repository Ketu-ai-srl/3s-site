import Link from "next/link";

// Butoanele paginii. `plin` e actiunea principala - acelasi buton ca pe ecranele vitrinei:
// contur de hartie veche, majuscule condensate, colturi drepte. `text` e drumul al doilea:
// o legatura subliniata, fara chenar.
//
// DE CE A APARUT `text`, si de ce `contur` nu mai e drumul al doilea. Regula directiei e UN
// buton pe ecran, si tinea in antet, unde `Ecran` are deja slotul `secundar` ca legatura de
// text. Cadea in blocul de incheiere: numarat pe 17 pagini, pagina de start avea 6 butoane
// pe toata lungimea ei si niciodata mai mult de unul pe sectiune, in timp ce 14 din cele 16
// pagini interioare aveau doua butoane de aceeasi greutate in sectiunea de inchidere, iar
// /termeni, /confidentialitate si /cookies aveau trei, unul langa altul. Doua chenare
// alaturate nu spun care e pasul urmator; un chenar plus o legatura subliniata spune.
// `contur` a ramas in semnatura fiindca il mai dau pagini nerescrise, dar e ACELASI stil cu
// `text` - nu mai deseneaza chenar, deci nu poate reaparea perechea de doua butoane.
//
// Semnatura (href, fel, marime, sageata, className) e cea veche, ca paginile care il
// folosesc sa ramana compilabile si sa treaca singure in directia noua.

type Fel = "plin" | "text" | "contur";
type Marime = "mic" | "normal" | "mare";

const FEL: Record<Fel, string> = {
  plin: "border border-cerneala text-cerneala hover:border-cerneala-accent hover:text-cerneala-accent",
  text: "border-0 text-cerneala-2 underline decoration-cerneala-3 underline-offset-[5px] hover:text-cerneala",
  contur:
    "border-0 text-cerneala-2 underline decoration-cerneala-3 underline-offset-[5px] hover:text-cerneala",
};

// Legatura de text nu poarta chenar, deci nu poarta nici captuseala orizontala: aliniata cu
// butonul plin de langa ea, nu impinsa de un chenar inexistent.
const MARIME: Record<Marime, string> = {
  mic: "px-4 py-2.5 text-[13px]",
  normal: "px-5 py-3 text-[14px]",
  mare: "px-6 py-3.5 text-[15px]",
};

const MARIME_TEXT: Record<Marime, string> = {
  mic: "py-2.5 text-[13px]",
  normal: "py-3 text-[14px]",
  mare: "py-3.5 text-[15px]",
};

const BAZA =
  "group inline-flex items-center justify-center gap-3 bg-transparent font-afis font-semibold tracking-[0.14em] uppercase transition-colors duration-200";

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
  const chenar = fel === "plin";
  return (
    <Link
      href={href}
      className={`${BAZA} ${chenar ? "no-underline" : ""} ${FEL[fel]} ${
        chenar ? MARIME[marime] : MARIME_TEXT[marime]
      } ${className}`}
    >
      {children}
      {sageata ? (
        <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      ) : null}
    </Link>
  );
}
