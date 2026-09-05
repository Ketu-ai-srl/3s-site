import type { Metadata } from "next";
import AntetPagina from "@/components/AntetPagina";
import HartaLista from "@/components/HartaLista";
import SectiuneRegistru from "@/components/SectiuneRegistru";
import { PAGINI_JURIDICE } from "@/content/juridic";
import { RUTE, SECTIUNI_ACASA, type Ruta } from "@/content/rute";
import { FOTOGRAFII } from "@/content/fotografii";

// Harta site-ului pentru om. `sitemap.xml` exista de mult si e pentru masini; pagina asta
// e pentru cineva care vrea sa vada dintr-o privire ce scrie pe site si sa aleaga.
//
// TOATE RUTELE VIN DIN `RUTE`, niciuna scrisa de mana. Daca as fi scris lista aici, ar fi
// existat a doua sursa de adevar despre ce pagini are site-ul, si s-ar fi desincronizat de
// prima exact in ziua in care cineva face lucrul corect si adauga o pagina. Pe proiectul
// asta s-a intamplat deja o data, si de aceea exista `poarta-rute.py`.
//
// IMPARTIREA PE GRUPE E O PARTITIE, nu o serie de filtre independente. Fiecare ruta e
// luata O SINGURA data, in ordinea regulilor, iar ultimul grup ia TOT ce a ramas. Asa, o
// ruta dintr-o categorie la care nu m-am gandit apare oricum in pagina, la "Paginile
// principale", in loc sa dispara tacut dintr-o harta care se declara completa. Ce se
// pierde e doar asezarea ei ideala, si aia se vede.
//
// FORMA RANDULUI e cea a listelor tipografice ale directiei (`HartaLista`), aceeasi cu a
// fiselor de domeniu de pe /solutii. Inainte era o legatura subliniata cu doua randuri de
// text sub ea, adica al doilea limbaj vizual pentru acelasi fel de continut, la un clic
// distanta de hub.

export const metadata: Metadata = {
  title: "Harta site-ului",
  description:
    "Toate paginile publice 3S, grupate: prezentare, domenii, instrumente și documente juridice, plus secțiunile paginii de start. Lista vine din manifest.",
  alternates: { canonical: "/harta-site" },
};

const CAI_JURIDICE = new Set(PAGINI_JURIDICE.map((p) => p.cale));

function imparte() {
  const luate = new Set<string>();
  const ia = (potrivit: (r: Ruta) => boolean): Ruta[] => {
    const gasite = RUTE.filter((r) => !luate.has(r.cale) && potrivit(r));
    for (const r of gasite) luate.add(r.cale);
    return gasite;
  };

  const domenii = ia((r) => r.cale === "/solutii" || r.cale.startsWith("/solutii/"));
  const instrumente = ia((r) => r.cale.startsWith("/instrumente/"));
  const juridice = ia((r) => CAI_JURIDICE.has(r.cale));
  const principale = ia(() => true);

  return { principale, domenii, instrumente, juridice };
}

export default function HartaSite() {
  const { principale, domenii, instrumente, juridice } = imparte();

  return (
    <main id="continut">
      <AntetPagina
        adresa="/harta-site"
        imagine={FOTOGRAFII.cutii}
        fir={[{ text: "Pagina de start", href: "/" }, { text: "Harta site-ului" }]}
        eticheta="Cuprins"
        titlu={
          <>
            Tot ce scrie pe site,
            <br />
            într-o singură listă
          </>
        }
        lead="Lista se face din manifestul de rute al site-ului, deci nu poate arăta o pagină care nu există și nici ascunde una care există."
        actiune={{ href: "#pagini", text: "Vedeți toate paginile" }}
        secundar={{ href: "/cum-functioneaza", text: "Vedeți cum funcționează" }}
      />

      <SectiuneRegistru
        id="pagini"
        dens
        cota="I"
        eticheta="Prezentarea"
        titlu="Paginile principale."
        lead="De aici începe oricine ne vede prima dată: ce facem, cum lucrăm, cine suntem și pe ce drum ne scrieți."
      >
        <HartaLista rute={principale} />
      </SectiuneRegistru>

      <SectiuneRegistru
        id="domenii"
        ton="inchis"
        cota="II"
        eticheta="Domeniile"
        titlu="Fișele pe domenii."
        lead="Aceleași etape, scrise cu documentele și termenele fiecărui domeniu. Hubul le adună pe toate."
      >
        <HartaLista rute={domenii} />
      </SectiuneRegistru>

      <SectiuneRegistru
        id="instrumente"
        cota="III"
        eticheta="Instrumentele"
        titlu="Ce puteți folosi fără să ne cumpărați nimic."
        lead="Pagini scrise ca să fie utile singure. Se pot tipări, trimite prin mesaj sau cita, iar noi le corectăm când cineva ne arată că un rând contrazice actul citat."
      >
        <HartaLista rute={instrumente} />
      </SectiuneRegistru>

      <SectiuneRegistru
        id="juridic"
        ton="inchis"
        cota="IV"
        eticheta="Documentele"
        titlu="Textele juridice ale site-ului."
        lead="Cine răspunde de site, ce date primim printr-un mesaj și ce scriem în browserul dumneavoastră. Sunt scurte dinadins."
      >
        <HartaLista rute={juridice} />
      </SectiuneRegistru>

      <SectiuneRegistru
        id="sectiuni"
        cota="V"
        eticheta="Pagina de start"
        titlu="Secțiunile paginii de start."
        lead="Nu sunt pagini separate, sunt locuri din pagina de start. Legăturile duc direct la ele."
      >
        <ul className="m-0 grid list-none border-t border-linie-noapte p-0 md:grid-cols-3">
          {SECTIUNI_ACASA.map((s) => (
            <li key={s.ancora} className="border-b border-linie-noapte">
              <a
                href={"/#" + s.ancora}
                className="group flex items-baseline justify-between py-5 pr-2 font-afis text-[clamp(1.35rem,2.2vw,1.95rem)] font-semibold tracking-[0.04em] uppercase text-hartie-veche-2 no-underline transition-colors duration-200 hover:text-hartie-veche md:pr-8"
              >
                {s.scurt}
                <span
                  aria-hidden="true"
                  className="text-arama-clar transition-transform duration-200 group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-10 max-w-[68ch] text-[16px] leading-[1.55] text-hartie-veche-2">
          Pagini publice pe tot site-ul: {RUTE.length}. Toate sunt listate mai sus, în cele
          patru grupe, fiindcă ultima grupă ia tot ce nu a intrat în celelalte.
        </p>

        <p className="mt-5 max-w-[68ch] text-[16px] leading-[1.55] text-hartie-veche-2">
          Harta pentru mașini stă la{" "}
          <a href="/sitemap.xml" className="text-arama-clar underline underline-offset-[3px]">
            sitemap.xml
          </a>
          . Se face din același manifest, păstrând rutele marcate pentru indexare. Pagina
          aceasta le arată pe toate, inclusiv pe cele care nu se indexează.
        </p>
      </SectiuneRegistru>
    </main>
  );
}
