import Link from "next/link";
import Invelis from "./Invelis";

// Subsolul paginilor interioare.
//
// De ce nu se refoloseste `Subsol`: toate cele treisprezece legaturi ale lui sunt ancore
// din pagina de start (`#mecanism`, `#termene`, `#discutie`). Randate pe /solutii, ele
// devin /solutii#mecanism, adica ancore fara tinta in chiar pagina care le poarta. Aici
// legaturile sunt absolute, deci duc in acelasi loc de oriunde.
//
// Nu poarta data de verificare a termenelor legale: aia e un fapt al paginii de start,
// unde stau cifrele. Un al doilea loc care scrie aceeasi data ar fi al doilea loc care
// se invecheste, si nu exista nimeni care sa le tina pe amandoua sincronizate.

type Legatura = { href: string; text: string };

const LEGATURI: Legatura[] = [
  { href: "/", text: "Pagina de start" },
  { href: "/solutii", text: "Domenii deservite" },
  { href: "/#termene", text: "Verificator de termene" },
  { href: "/#raspundere", text: "Răspundere și date" },
  { href: "/#discutie", text: "Programați o discuție" },
];

export default function SubsolPagina() {
  return (
    <footer className="bg-verde-adanc pt-14 pb-8 text-pe-inchis-2">
      <Invelis>
        <div className="grid gap-8 border-b border-linie-inchis pb-8 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <span className="mb-4 flex items-baseline gap-2.5">
              <span className="font-serif text-[26px] leading-none font-semibold tracking-[-0.02em] text-white">
                3S
              </span>
              <span className="font-mono text-[11.5px] tracking-[0.14em] uppercase text-pe-inchis-3">
                Scan · Store · Solve
              </span>
            </span>
            <p className="max-w-[46ch] text-nota leading-relaxed">
              Arhivare fizică, digitizare și căutare care citează sursa. 3S este proiectul
              ADRIA Servicii Arhivare SRL, Golești, județul Argeș, firma-mamă care arhivează
              documente din 2019.
            </p>
          </div>

          <nav aria-label="Legături din subsol">
            <ul className="m-0 list-none p-0">
              {LEGATURI.map((l) => (
                <li key={l.href} className="mb-2.5 text-[15.5px]">
                  <Link
                    href={l.href}
                    className="text-pe-inchis no-underline hover:text-white hover:underline"
                  >
                    {l.text}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2 pt-6 text-[14px]">
          <span>Contract în limba română, sub lege română</span>
          <span>
            <a
              href="mailto:contact@3s.ro"
              className="text-pe-inchis no-underline hover:text-white hover:underline"
            >
              contact@3s.ro
            </a>
          </span>
        </div>
      </Invelis>
    </footer>
  );
}
