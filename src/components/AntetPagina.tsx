import Link from "next/link";
import Buton from "./Buton";
import Eticheta from "./Eticheta";
import Invelis from "./Invelis";

// Antetul unei pagini interioare: firul de navigare, eticheta, singurul h1 al paginii,
// paragraful de deschidere si acelasi apel la actiune ca pe pagina de start.
//
// Firul de navigare nu e decor: e legatura inapoi, ceruta explicit in ambele sensuri.
// Ultimul element e pagina curenta si NU are legatura - o legatura catre pagina in care
// esti deja e zgomot pentru cititorul cu cititor de ecran, nu ajutor.
//
// Datele structurate BreadcrumbList se emit din aceeasi lista, ca sa nu existe doua
// surse pentru acelasi fir. Tipurile folosite - BreadcrumbList, ListItem - sunt in
// vocabularul pe care poarta S-09 il accepta.

export type Veriga = {
  text: string;
  /** Lipsa inseamna pagina curenta: se scrie ca text, nu ca legatura. */
  href?: string;
};

type Props = {
  fir: Veriga[];
  eticheta: string;
  titlu: string;
  lead: string;
  actiune: { href: string; text: string };
  secundar?: { href: string; text: string };
  /** Adresa canonica a paginii, ca ultima veriga din datele structurate sa aiba adresa. */
  adresa: string;
};

const GAZDA = "https://3s.ke2.in";

export default function AntetPagina({
  fir,
  eticheta,
  titlu,
  lead,
  actiune,
  secundar,
  adresa,
}: Props) {
  const firStructurat = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: fir.map((v, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: v.text,
      item: GAZDA + (v.href ?? adresa),
    })),
  };

  return (
    <section className="bg-hartie pt-6 pb-12 md:pt-10 md:pb-16">
      <Invelis>
        <nav aria-label="Firul de navigare" className="mb-8 md:mb-10">
          <ol className="m-0 flex flex-wrap items-baseline gap-x-2 gap-y-1 p-0 font-mono text-fisa tracking-[0.04em] text-tus-3">
            {fir.map((v, i) => (
              <li key={v.text} className="flex items-baseline gap-2">
                {i > 0 ? (
                  <span aria-hidden className="text-linie-fn">
                    /
                  </span>
                ) : null}
                {v.href ? (
                  <Link
                    href={v.href}
                    className="text-tus-2 underline underline-offset-[3px] hover:text-verde"
                  >
                    {v.text}
                  </Link>
                ) : (
                  <span aria-current="page">{v.text}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <Eticheta className="urca urca-1 block">{eticheta}</Eticheta>

        <h1 className="urca urca-2 mt-4 mb-6 max-w-[20ch] text-[32px] leading-[1.08] tracking-[-0.02em] sm:text-[40px] lg:max-w-[24ch] lg:text-[50px]">
          {titlu}
        </h1>

        <p className="urca urca-3 max-w-[64ch] text-[18px] leading-[1.55] text-tus-2 sm:text-[19px]">
          {lead}
        </p>

        <div className="urca urca-4 mt-8 flex flex-wrap gap-3">
          <Buton href={actiune.href} marime="mare" sageata className="max-sm:w-full">
            {actiune.text}
          </Buton>
          {secundar ? (
            <Buton href={secundar.href} fel="contur" marime="mare" className="max-sm:w-full">
              {secundar.text}
            </Buton>
          ) : null}
        </div>
      </Invelis>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(firStructurat) }}
      />
    </section>
  );
}
