import Link from "next/link";
import type { ReactNode } from "react";

// Un ecran al vitrinei: o fotografie pe tot ecranul, o eticheta, un titlu, o linie, un buton.
//
// Regula e cea de pe site-urile pe care owner-ul le-a dat ca standard: un ecran spune un
// singur lucru. Tot ce nu incape in titlu + o linie + un buton nu e pentru vitrina, e pentru
// sectiunile de mai jos, unde omul ajunge fiindca vrea detaliul. Acelasi `Ecran` deschide
// si paginile interioare, prin `AntetPagina`, cu firul de navigare in slotul `inainte`.
//
// SCARA. `nivel="h1"` e cu o treapta mai mare decat `h2` (`text-titlu-1` / `text-titlu-2`,
// definite in `globals.css`). Cand toate ecranele aveau aceeasi marime, niciunul nu era
// primul - masurat: sase titluri la 108,8 px pe pagina de start, contra 80/48 la referinta.
//
// INALTIMEA. Continutul trebuie sa incapa cu buton cu tot intr-un ecran de 800 px: cu
// `pt-32` si `pb-24` eroul avea 863 px si butonul cadea sub margine. Acum `pt-28` (bara
// fixa de 68 px plus o rasuflare) si `pb-12 md:pb-16`.
//
// IMAGINEA vine cu doua marimi: 1920 pe ecran lat, 960 sub 768 px. Toate variantele de 960
// sunt decupaje PORTRET (2:3 sau 3:4): pe un telefon tinut vertical `object-cover` dintr-un
// peisaj de 960x637 marea fotografia de 1,32 ori si o inmuia.
//
// VOALUL e LOCAL, nu pe tot ecranul (clasa `.voal` din `globals.css`): negru sub coloana de
// text - jos si in stanga, unde stau eticheta, titlul, linia si butonul - si un voal subtire
// pe primii 140 px, sub bara de sus. Restul fotografiei ramane fotografie. Varianta veche
// avea minim 0,5 peste tot si fotografia nu se vedea nicaieri la peste 50%: luminanta medie
// a eroului era 0,215, nici fotografie, nici negru.
//
// CE S-A MASURAT SI CE NU. Contrastul textului peste fotografie NU e masurat de axe: axe
// nu evalueaza contrastul peste imagini, il marcheaza "needs review" si il lasa in afara
// verdictului. Cifra de contrast peste fotografie vine din scriptul de captura al feliei
// (culoarea textului contra mediei pixelilor de sub el, pe captura reala), si e valabila
// pentru fotografiile de azi si pentru textele de azi. O fotografie noua se remasoara.
//
// MISCAREA, doar pe primul ecran (`nivel="h1"`): fotografia respira lent (scale 1 -> 1,04
// in 20 s, doar `transform`) si eticheta, titlul, linia, butonul urca esalonat, o singura
// data. `prefers-reduced-motion` le opreste pe amandoua, in `globals.css`. Fara dezvaluire la
// derulare pe text: referinta nu are.

type Imagine = {
  /** numele fisierului fara sufixul de marime, ex. `rafturi` -> rafturi-1920.webp */
  nume: string;
  alt: string;
  /** unde sa se ancoreze decupajul cand ecranul are alta proportie decat fotografia */
  pozitie?: string;
};

type Legatura = { href: string; text: string };

type Props = {
  id?: string;
  imagine?: Imagine;
  eticheta: string;
  titlu: ReactNode;
  text?: ReactNode;
  /** UN buton pe ecran. */
  actiune?: Legatura;
  /** o legatura de text langa buton, pentru drumul al doilea; nu e al doilea buton */
  secundar?: Legatura;
  /** o linie mica sub buton, de ex. atribuirea catre firma-mama; se scrie din pagina */
  dovada?: ReactNode;
  /** deasupra etichetei: firul de navigare al paginilor interioare */
  inainte?: ReactNode;
  /** `h1` doar pe primul ecran */
  nivel?: "h1" | "h2";
  /** continut suplimentar sub linie (de ex. stampila de citare) */
  children?: ReactNode;
  /** ecran fara fotografie: fundal de noapte-2, pentru sectiunile tipografice */
  ton?: "foto" | "plin";
  className?: string;
};

export const CLASA_BUTON_ECRAN =
  "group inline-flex items-center gap-3 border border-hartie-veche px-6 py-3.5 font-afis text-[15px] font-semibold tracking-[0.14em] uppercase text-hartie-veche no-underline transition-colors duration-200 hover:border-arama-clar hover:text-arama-clar";

export default function Ecran({
  id,
  imagine,
  eticheta,
  titlu,
  text,
  actiune,
  secundar,
  dovada,
  inainte,
  nivel = "h2",
  children,
  ton = "foto",
  className = "",
}: Props) {
  const Titlu = nivel;
  const primul = nivel === "h1";
  const urca = (n: number) => (primul ? " urca urca-" + n : "");

  return (
    <section
      id={id}
      className={
        "relative isolate flex min-h-dvh flex-col justify-end overflow-hidden " +
        (ton === "plin" && !imagine ? "bg-noapte-2 " : "bg-noapte ") +
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
              className={"h-full w-full object-cover" + (primul ? " respira" : "")}
              style={{ objectPosition: imagine.pozitie ?? "center" }}
              loading={primul ? "eager" : "lazy"}
              fetchPriority={primul ? "high" : undefined}
              decoding="async"
            />
          </picture>
          <div aria-hidden="true" className="voal absolute inset-0 -z-10" />
        </>
      ) : null}

      <div className="mx-auto w-full max-w-vitrina px-6 pt-28 pb-12 md:px-10 md:pb-16">
        {inainte}
        {/* Eticheta e `span`, nu `p`, si nu e cosmetica de markup. Doua motive, al doilea
            masurat. UNU: un cuvant-doua deasupra titlului nu e proza, e o eticheta - un
            cititor de ecran care sare din paragraf in paragraf nu are ce face cu ea.
            DOI: are `uppercase`, iar `text-transform` se vede in `innerText` si NU in
            `textContent`. Poarta S-17 compara ce scrie in pagina randata (`textContent`)
            cu ce se citeste fara JavaScript (`innerText`), si lua drept "paragraf" orice
            `p` de peste 40 de caractere. De cand `AntetPagina` deschide paginile cu
            `Ecran`, prima eticheta era chiar aici si trecea pragul: "Domenii - Agentii
            imobiliare si administrare de imobile" are 54. Comparatia iesea intre acelasi
            text scris cu litere mari si cu litere mici, deci pica - dar numai cand foaia
            de stil apucase sa se aplice inainte de citire, adica pe unele pagini si nu pe
            altele, si altele la fiecare rulare. Patru pagini din 22, masurat. Fara `p`,
            poarta cantareste paragrafele adevarate, care n-au `text-transform`. */}
        <span
          className={
            "mb-4 block font-mono text-[11px] tracking-[0.16em] uppercase text-arama-clar sm:mb-5 sm:text-[12px] sm:tracking-[0.22em]" +
            urca(1)
          }
        >
          {eticheta}
        </span>
        <Titlu
          className={
            "font-afis max-w-[24ch] font-bold tracking-[-0.01em] uppercase text-hartie-veche " +
            (primul ? "text-titlu-1" : "text-titlu-2") +
            urca(2)
          }
        >
          {titlu}
        </Titlu>
        {text ? (
          <p
            className={
              "font-vitrina mt-6 max-w-[44ch] text-[clamp(1.05rem,1.35vw,1.25rem)] leading-[1.5] text-hartie-veche-2" +
              urca(3)
            }
          >
            {text}
          </p>
        ) : null}
        {children}
        {actiune ? (
          <div className={"mt-8 flex flex-wrap items-center gap-x-7 gap-y-4" + urca(4)}>
            <Link href={actiune.href} className={CLASA_BUTON_ECRAN}>
              {actiune.text}
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </Link>
            {secundar ? (
              <Link
                href={secundar.href}
                className="font-afis text-[15px] font-semibold tracking-[0.14em] uppercase text-hartie-veche-2 underline decoration-hartie-veche-3 underline-offset-[5px] transition-colors duration-200 hover:text-hartie-veche"
              >
                {secundar.text}
              </Link>
            ) : null}
          </div>
        ) : null}
        {dovada ? (
          <p className={"font-vitrina mt-5 max-w-[60ch] text-[14px] leading-[1.5] text-hartie-veche-2" + urca(5)}>
            {dovada}
          </p>
        ) : null}
      </div>
    </section>
  );
}
