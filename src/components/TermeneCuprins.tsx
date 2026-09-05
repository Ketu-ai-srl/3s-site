import type { TermenCuAncora } from "@/content/termene-extins";

// Cuprinsul tabelar al paginii de termene: categoria, termenul si, de la 768 px in sus,
// actul normativ. Fiecare categorie e o legatura catre fisa ei intreaga, de mai jos.
//
// DOUA DECIZII DE LATIME, si de ce nu sunt de stil.
//
// 1. Coloana cu actul normativ apare doar de la 768 px. La 390 px, trei coloane de text
//    romanesc lasa fiecarei coloane sub douazeci de caractere: randurile se rup dupa
//    fiecare cuvant si tabelul devine mai greu de citit decat lista de fise de sub el.
//    Actul nu se pierde: e scris intreg in fisa, care e destinatia legaturii.
// 2. Tabelul sta intr-un recipient cu derulare proprie pe orizontala. Nu fiindca ar
//    trebui derulat - la doua coloane incape - ci fiindca un tabel e locul clasic in care
//    apare derapajul orizontal al PAGINII, iar derapajul paginii muta toata coloana de
//    text sub degetul cititorului. Cu recipientul, cel mai rau caz posibil ramane inchis
//    in tabel.

const CELULA = "py-3 pr-4 align-top text-[15.5px] last:pr-0";

export default function TermeneCuprins({
  termene,
  antetDocument,
  antetTermen,
  antetTemei,
  fara,
  faraTemei,
}: {
  termene: TermenCuAncora[];
  antetDocument: string;
  antetTermen: string;
  antetTemei: string;
  fara: string;
  faraTemei: string;
}) {
  return (
    <div className="overflow-x-auto border-t border-linie">
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">
          Termenele de păstrare din pagina aceasta, pe scurt. Fiecare categorie duce la
          fișa ei completă.
        </caption>
        <thead>
          <tr className="border-b border-linie">
            <th
              scope="col"
              className="py-2.5 pr-4 font-mono text-eticheta font-medium tracking-[0.08em] text-tus-3 uppercase"
            >
              {antetDocument}
            </th>
            <th
              scope="col"
              className="py-2.5 pr-4 font-mono text-eticheta font-medium tracking-[0.08em] text-tus-3 uppercase"
            >
              {antetTermen}
            </th>
            <th
              scope="col"
              className="hidden py-2.5 font-mono text-eticheta font-medium tracking-[0.08em] text-tus-3 uppercase md:table-cell"
            >
              {antetTemei}
            </th>
          </tr>
        </thead>
        <tbody>
          {termene.map((t) => (
            <tr key={t.ancora} className="border-b border-linie last:border-b-0">
              <th scope="row" className={`${CELULA} font-normal`}>
                <a
                  href={"#" + t.ancora}
                  className="text-verde underline underline-offset-[3px]"
                >
                  {t.scurt}
                </a>
              </th>
              <td className={CELULA}>
                {t.termen ? (
                  <span className="font-medium text-tus">{t.termen}</span>
                ) : (
                  <span className="text-tus-3 italic">{fara}</span>
                )}
              </td>
              <td className={`${CELULA} hidden text-tus-2 md:table-cell`}>
                {t.lege ? t.lege : <span className="text-tus-3 italic">{faraTemei}</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
