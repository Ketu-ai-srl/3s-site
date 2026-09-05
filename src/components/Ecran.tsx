import Link from "next/link";
import type { ReactNode } from "react";

// Un ecran al vitrinei: o imagine pe tot ecranul, un titlu, o linie, un buton.
//
// Regula e cea de pe site-urile pe care owner-ul le-a dat ca standard: un ecran spune un
// singur lucru. Tot ce nu incape in titlu + o linie + un buton nu e pentru vitrina, e pentru
// paginile interioare, unde omul ajunge fiindca vrea detaliul.
//
// Imaginea vine cu doua marimi: 1920 pe ecran lat, 960 sub 768 px. Deasupra ei sta un voal
// negru gradat, ca textul sa ramana la contrast indiferent de ce e in fotografie - masurat
// cu axe pe fiecare ecran, nu presupus.

type Imagine = {
  /** numele fisierului fara sufixul de marime, ex. `rafturi` -> rafturi-1920.webp */
  nume: string;
  alt: string;
  /** unde sa se ancoreze decupajul cand ecranul are alta proportie decat fotografia */
  pozitie?: string;
};

type Props = {
  id?: string;
  imagine?: Imagine;
  eticheta: string;
  titlu: ReactNode;
  text?: ReactNode;
  actiune?: { href: string; text: string };
  /** `h1` doar pe primul ecran */
  nivel?: "h1" | "h2";
  /** continut suplimentar sub linie (de ex. stampila de citare) */
  children?: ReactNode;
  /** ecran fara fotografie: fundal de noapte-2, pentru sectiunile tipografice */
  ton?: "foto" | "plin";
  className?: string;
};

export default function Ecran({
  id,
  imagine,
  eticheta,
  titlu,
  text,
  actiune,
  nivel = "h2",
  children,
  ton = "foto",
  className = "",
}: Props) {
  const Titlu = nivel;
  return (
    <section
      id={id}
      className={
        "relative isolate flex min-h-dvh flex-col justify-end overflow-hidden " +
        (ton === "plin" ? "bg-noapte-2 " : "bg-noapte ") +
        className
      }
    >
      {imagine ? (
        <>
          <picture className="absolute inset-0 -z-20">
            <source media="(max-width: 767px)" srcSet={"/img/" + imagine.nume + "-960.webp"} />
            <img
              src={"/img/" + imagine.nume + "-1920.webp"}
              alt={imagine.alt}
              className="h-full w-full object-cover"
              style={{ objectPosition: imagine.pozitie ?? "center" }}
              loading={nivel === "h1" ? "eager" : "lazy"}
              decoding="async"
            />
          </picture>
          {/* Voalul: negru plin jos, unde sta textul; se subtiaza spre sus, unde e fotografia. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(11,11,12,0.97)_0%,rgba(11,11,12,0.86)_40%,rgba(11,11,12,0.5)_68%,rgba(11,11,12,0.78)_100%)]"
          />
        </>
      ) : null}

      <div className="mx-auto w-full max-w-[1400px] px-6 pt-32 pb-16 md:px-10 md:pb-24">
        <p className="mb-5 font-mono text-[12px] tracking-[0.22em] uppercase text-arama-clar">
          {eticheta}
        </p>
        <Titlu className="font-afis max-w-[14ch] text-[clamp(2.75rem,8.5vw,7.25rem)] leading-[0.92] font-bold tracking-[-0.01em] uppercase text-hartie-veche">
          {titlu}
        </Titlu>
        {text ? (
          <p className="font-vitrina mt-7 max-w-[46ch] text-[clamp(1.05rem,1.4vw,1.3rem)] leading-[1.5] text-hartie-veche-2">
            {text}
          </p>
        ) : null}
        {children}
        {actiune ? (
          <Link
            href={actiune.href}
            className="group mt-9 inline-flex items-center gap-3 border border-hartie-veche px-6 py-3.5 font-afis text-[15px] font-semibold tracking-[0.14em] uppercase text-hartie-veche no-underline transition-colors duration-200 hover:border-arama-clar hover:text-arama-clar"
          >
            {actiune.text}
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </Link>
        ) : null}
      </div>
    </section>
  );
}
