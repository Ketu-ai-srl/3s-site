import Link from "next/link";
import Buton from "@/components/Buton";
import Eticheta from "@/components/Eticheta";
import Invelis from "@/components/Invelis";
import { CALE_DISCUTIE, RUTE, type Ruta } from "@/content/rute";

// Pagina de 404, in limbajul directiei: fundal de noapte, cota mono pe coloana de margine,
// titlul in fontul de afis, cu majuscule. Pana pe 2026-09-06 era ultima suprafata alba a
// site-ului, cu numeralul in serifa si titlul in fontul de text - adica pagina care ii apare
// omului cand ceva merge prost era chiar cea care nu semana cu site-ul. Meniul si subsolul
// vin din layout, deci omul care nimereste aici are aceleasi drumuri ca pe orice alta pagina.
//
// Nu se deschide cu ecran plin si nu poarta fotografie: nu e o pagina de vitrina, e un
// indicator. Cine ajunge aici cauta un drum, nu un afis.
//
// PATRU DRUMURI, NU TOT SITE-UL. Doua runde au incercat sa faca lista de 22 de rute mai
// suportabila - intai scotandu-le descrierile, apoi asezandu-le pe trei coloane - si niciuna
// n-a atins defectul. Masurat inainte: 27 de randuri identice (22 de rute plus cele 5 ancore
// ale paginii de start), 23 dintre ele in primul ecran la 1280 px, iar la 390 px pagina avea
// 2569 px si iesirea catre pagina de start statea sub doua ecrane de legaturi. Ordinea era
// cea bruta a manifestului, deci pozitiile 3 si 4 erau "Securitate" si "Accesibilitate",
// inaintea lui "Cum functioneaza". Descrierile, mutate in atributul `title`, nu se vad pe
// atingere - adica pentru cititorul de pe telefon disparusera cu totul.
//
// Omul care ajunge aici cauta UN drum, nu harta intreaga; harta intreaga are pagina ei, si
// randul care duce la ea sta chiar sub lista. Deci raman patru destinatii: pagina de start,
// domeniile, instrumentul de termene si contactul.
//
// Numele si adresele vin tot din manifest, cautate dupa cale: daca o ruta e redenumita,
// randul isi ia numele nou, iar daca dispare din manifest, randul dispare cu ea. O pagina de
// 404 care trimite spre adrese inexistente ar fi chiar defectul pe care il explica.
const CAI_SCURTE = ["/", "/solutii", "/instrumente/termene-de-pastrare", "/contact"];

const DESTINATII: Ruta[] = CAI_SCURTE.map((cale) => RUTE.find((r) => r.cale === cale)).filter(
  (r): r is Ruta => Boolean(r),
);
//
// Nu poarta titlu propriu in `metadata`: fisierul asta nu e o pagina de ruta, iar HTML-ul
// lui (`_not-found`) nu intra in harta de site si nu se indexeaza.

const RAND_LISTA =
  "group flex items-baseline justify-between gap-4 border-b border-linie-suprafata py-3.5 font-afis text-[clamp(1.05rem,1.5vw,1.35rem)] font-semibold tracking-[0.04em] uppercase text-cerneala-2 no-underline transition-colors duration-200 hover:text-cerneala";

const SAGEATA =
  "font-mono text-cerneala-accent transition-transform duration-200 group-hover:translate-x-1";

export default function PaginaNegasita() {
  return (
    <main className="border-t border-linie-suprafata bg-noapte">
      <Invelis>
        <div className="grid gap-4 py-16 md:grid-cols-[148px_1fr] md:gap-8 md:py-24">
          <div className="flex items-baseline gap-3 border-b border-linie-suprafata pb-3 md:relative md:block md:border-b-0 md:pb-0">
            <span
              aria-hidden
              className="absolute top-1.5 -right-4 bottom-0 hidden w-px bg-linie-suprafata md:block"
            />
            <span
              aria-hidden
              className="font-mono text-[15px] leading-none font-medium tracking-[0.18em] text-cerneala-accent md:mb-3 md:block md:text-[17px]"
            >
              404
            </span>
            <Eticheta className="md:block md:max-w-[120px]">Adresă negăsită</Eticheta>
          </div>

          <div>
            <h1 className="mb-5 max-w-[20ch] font-afis text-titlu-2 font-bold tracking-[-0.01em] uppercase text-cerneala">
              Adresa asta nu duce la nicio pagină.
            </h1>
            <p className="mb-10 max-w-[60ch] text-lead text-cerneala-2">
              Fie adresa a fost scrisă altfel, fie pagina pe care o căutați nu există pe acest
              site. Mai jos sunt patru drumuri scurte.
            </p>

            <Eticheta className="mb-3 block">Drumuri</Eticheta>
            <ul className="m-0 list-none border-t border-linie-suprafata p-0">
              {DESTINATII.map((ruta) => (
                <li key={ruta.cale} className="list-none">
                  <Link href={ruta.cale} className={RAND_LISTA}>
                    {ruta.scurt}
                    <span aria-hidden className={SAGEATA}>
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <p className="mt-6 max-w-[60ch] text-nota text-cerneala-3">
              Toate paginile site-ului, fiecare cu ce scrie pe ea într-un rând, stau în{" "}
              <Link
                href="/harta-site"
                className="text-cerneala-accent underline underline-offset-[3px]"
              >
                harta site-ului
              </Link>
              .
            </p>

            <div className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Buton href="/" marime="mare" sageata className="max-sm:w-full">
                Înapoi la pagina de start
              </Buton>
              <Buton href={CALE_DISCUTIE} fel="text" marime="mare">
                Discuție de 30 de minute
              </Buton>
            </div>
          </div>
        </div>
      </Invelis>
    </main>
  );
}
