import Link from "next/link";
import Buton from "@/components/Buton";
import Eticheta from "@/components/Eticheta";
import Invelis from "@/components/Invelis";
import { CALE_DISCUTIE, RUTE, SECTIUNI_ACASA } from "@/content/rute";

// Pagina de 404, in acelasi limbaj vizual ca restul site-ului: fisa institutionala, cota
// pe coloana de margine, serifa la titlu. Bara de anunt, meniul si subsolul vin din layout,
// deci omul care nimereste aici are aceleasi drumuri ca pe orice alta pagina.
//
// Lista de mai jos se compune din manifestul de rute, nu de mana: o pagina de 404 care
// trimite spre adrese inexistente e chiar defectul pe care il explica.
//
// Nu poarta titlu propriu in `metadata`: fisierul asta nu e o pagina de ruta, iar HTML-ul
// lui (`_not-found`) nu intra in harta de site si nu se indexeaza.

export default function PaginaNegasita() {
  return (
    <main className="border-t border-linie bg-suprafata">
      <Invelis>
        <div className="grid gap-4 py-16 md:grid-cols-[148px_1fr] md:gap-8 md:py-24">
          <div className="flex items-baseline gap-3 border-b border-linie pb-3 md:relative md:block md:border-b-0 md:pb-0">
            <span
              aria-hidden
              className="absolute top-1.5 -right-4 bottom-0 hidden w-px bg-linie md:block"
            />
            <span
              aria-hidden
              className="font-serif text-2xl leading-none font-normal text-arama md:mb-2.5 md:block md:text-[34px]"
            >
              404
            </span>
            <Eticheta className="md:block md:max-w-[120px]">Adresă negăsită</Eticheta>
          </div>

          <div>
            <h1 className="mb-4 max-w-[19ch] text-[27px] md:text-[33px] lg:text-[38px]">
              Adresa asta nu duce la nicio pagină.
            </h1>
            <p className="mb-8 max-w-[60ch] text-lead text-tus-2">
              Fie adresa a fost scrisă altfel, fie pagina pe care o căutați nu există pe acest
              site. Mai jos sunt drumurile care există acum, luate din structura site-ului, nu
              scrise de mână.
            </p>

            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <Eticheta className="mb-3 block">Pagini</Eticheta>
                <ul className="m-0 list-none p-0">
                  {RUTE.map((ruta) => (
                    <li key={ruta.cale} className="mb-4 text-[15.5px]">
                      <Link
                        href={ruta.cale}
                        className="text-verde underline underline-offset-[3px]"
                      >
                        {ruta.scurt}
                      </Link>
                      <span className="mt-0.5 block max-w-[38ch] text-nota text-tus-3">
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
                        className="text-verde underline underline-offset-[3px]"
                      >
                        {sectiune.scurt}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <Buton href="/" marime="mare" sageata className="max-sm:w-full">
                Înapoi la pagina de start
              </Buton>
              <Buton href={CALE_DISCUTIE} fel="contur" marime="mare" className="max-sm:w-full">
                Discuție de 30 de minute
              </Buton>
            </div>
          </div>
        </div>
      </Invelis>
    </main>
  );
}
