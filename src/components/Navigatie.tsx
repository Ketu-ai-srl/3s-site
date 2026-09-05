import Buton from "./Buton";
import Invelis from "./Invelis";

const LEGATURI = [
  { href: "#mecanism", text: "Cum funcționează" },
  { href: "#termene", text: "Termene legale" },
  { href: "#domenii", text: "Domenii" },
  { href: "#raspundere", text: "Răspundere" },
];

export default function Navigatie() {
  return (
    <header className="sticky top-0 z-40 border-b border-linie bg-hartie/90 backdrop-blur-[8px]">
      <Invelis className="flex items-center gap-6 py-3">
        <a href="#continut" className="flex items-baseline gap-2.5 no-underline">
          <span className="font-serif text-[26px] leading-none font-semibold tracking-[-0.02em] text-verde">
            3S
          </span>
          <span className="hidden font-mono text-[11.5px] tracking-[0.14em] uppercase text-tus-3 sm:inline">
            Scan · Store · Solve
          </span>
        </a>
        <nav className="ml-auto flex items-center gap-6" aria-label="Secțiunile paginii">
          {LEGATURI.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hidden border-b border-transparent py-1.5 text-[15px] text-tus-2 no-underline hover:border-arama hover:text-tus md:inline-block"
            >
              {l.text}
            </a>
          ))}
          <Buton href="#discutie" marime="mic" className="shrink-0 whitespace-nowrap">
            Discuție de 30 de minute
          </Buton>
        </nav>
      </Invelis>
    </header>
  );
}
