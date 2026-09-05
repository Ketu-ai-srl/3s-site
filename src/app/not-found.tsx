import Link from "next/link";
import Buton from "@/components/Buton";
import Eticheta from "@/components/Eticheta";
import Invelis from "@/components/Invelis";
import { CALE_DISCUTIE, RUTE, SECTIUNI_ACASA } from "@/content/rute";

// Pagina de 404, in limbajul directiei: fundal de noapte, cota mono pe coloana de margine,
// titlul in fontul de afis, cu majuscule. Pana pe 2026-09-06 era ultima suprafata alba a
// site-ului, cu numeralul in serifa si titlul in fontul de text - adica pagina care ii apare
// omului cand ceva merge prost era chiar cea care nu semana cu site-ul. Meniul si subsolul
// vin din layout, deci omul care nimereste aici are aceleasi drumuri ca pe orice alta pagina.
//
// Nu se deschide cu ecran plin si nu poarta fotografie: nu e o pagina de vitrina, e un
// indicator. Cine ajunge aici cauta un drum, nu un afis.
//
// Lista de mai jos se compune din manifestul de rute, nu de mana: o pagina de 404 care
// trimite spre adrese inexistente e chiar defectul pe care il explica.
//
// Nu poarta titlu propriu in `metadata`: fisierul asta nu e o pagina de ruta, iar HTML-ul
// lui (`_not-found`) nu intra in harta de site si nu se indexeaza.

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
            <p className="mb-8 max-w-[60ch] text-lead text-cerneala-2">
              Fie adresa a fost scrisă altfel, fie pagina pe care o căutați nu există pe acest
              site. Mai jos sunt paginile care există acum.
            </p>

            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <Eticheta className="mb-3 block">Pagini</Eticheta>
                <ul className="m-0 list-none p-0">
                  {RUTE.map((ruta) => (
                    <li key={ruta.cale} className="mb-4 text-[15.5px]">
                      <Link
                        href={ruta.cale}
                        className="text-cerneala-accent underline underline-offset-[3px]"
                      >
                        {ruta.scurt}
                      </Link>
                      <span className="mt-0.5 block max-w-[38ch] text-nota text-cerneala-3">
                        {ruta.descriere}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <Eticheta className="mb-3 block">Pe pagina de start</Eticheta>
                <ul className="m-0 list-none p-0">
                  {SECTIUNI_ACASA.map((sectiune) => (
                    <li key={sectiune.ancora} className="mb-2.5 text-[15.5px]">
                      <a
                        href={"/#" + sectiune.ancora}
                        className="text-cerneala-accent underline underline-offset-[3px]"
                      >
                        {sectiune.scurt}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
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
