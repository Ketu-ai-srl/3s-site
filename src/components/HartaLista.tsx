import Link from "next/link";

// O grupa de rute din harta site-ului: un RAND pe pagina, nu un cartonas si nici o legatura
// subliniata pierduta intr-un paragraf.
//
// Forma e cea a listelor tipografice ale directiei: numele condensat cu majuscule, sageata
// de arama la capatul randului, descrierea alaturi. Pe /solutii aceeasi forma poarta
// rezumatul unui domeniu; aici poarta descrierea rutei si, pe al treilea rand, adresa ei in
// mono - fiindca harta e singurul loc de pe site unde adresa insasi e informatie: se copiaza
// intr-un mesaj, se lipeste intr-un browser, se compara cu `sitemap.xml`.
//
// Randul intreg e legatura, nu doar numele: pe telefon, o tinta de un cuvant intr-o lista de
// douazeci si doua de randuri se rateaza. Descrierea si adresa raman inauntrul ei, deci
// tinta e cat randul.

export type RandHarta = {
  cale: string;
  scurt: string;
  descriere: string;
};

export default function HartaLista({ rute }: { rute: RandHarta[] }) {
  return (
    <ul className="m-0 list-none border-t border-linie-noapte p-0">
      {rute.map((r) => (
        <li key={r.cale} className="border-b border-linie-noapte">
          <Link
            href={r.cale}
            className="group grid gap-x-10 gap-y-2 py-6 no-underline md:grid-cols-[minmax(0,7fr)_minmax(0,9fr)_auto]"
          >
            <span className="font-afis text-[clamp(1.35rem,2.2vw,1.95rem)] font-semibold tracking-[0.04em] uppercase text-hartie-veche-2 transition-colors duration-200 group-hover:text-hartie-veche">
              {r.scurt}
            </span>
            <span>
              <span className="block text-[16px] leading-[1.55] text-hartie-veche-2">
                {r.descriere}
              </span>
              <span className="mt-1.5 block font-mono text-[12.5px] tracking-[0.06em] text-hartie-veche-3">
                {r.cale}
              </span>
            </span>
            <span
              aria-hidden="true"
              className="font-mono text-arama-clar transition-transform duration-200 group-hover:translate-x-1 md:self-center"
            >
              →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
