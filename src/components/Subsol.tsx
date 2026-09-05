import Invelis from "./Invelis";

const COLOANE = [
  {
    titlu: "Servicii",
    legaturi: [
      { href: "#mecanism", text: "Arhivare fizică și custodie" },
      { href: "#mecanism", text: "Scanare și digitizare" },
      { href: "#mecanism", text: "Nomenclator arhivistic" },
      { href: "#mecanism", text: "Selecționare și eliminare" },
      { href: "#termene", text: "Căutare în arhivă" },
    ],
  },
  {
    titlu: "Instrumente",
    legaturi: [
      { href: "#termene", text: "Verificator de termene" },
      { href: "#domenii", text: "Domenii deservite" },
      { href: "#dovada", text: "Ce puteți verifica" },
      { href: "#raspundere", text: "Răspundere și date" },
    ],
  },
  {
    titlu: "Documente",
    legaturi: [
      { href: "#discutie", text: "Termeni contractuali" },
      { href: "#discutie", text: "Politica de confidențialitate" },
      { href: "#discutie", text: "Prelucrarea datelor" },
      { href: "#discutie", text: "Declarație de accesibilitate" },
    ],
  },
];

export default function Subsol({ dataVerificare }: { dataVerificare: string }) {
  return (
    <footer className="bg-verde-adanc pt-16 pb-8 text-pe-inchis-2">
      <Invelis>
        <div className="grid gap-8 border-b border-linie-inchis pb-8 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <span className="mb-4 flex items-baseline gap-2.5">
              <span className="font-serif text-[26px] leading-none font-semibold tracking-[-0.02em] text-white">
                3S
              </span>
              <span className="font-mono text-[11.5px] tracking-[0.14em] uppercase text-pe-inchis-3">
                Scan · Store · Solve
              </span>
            </span>
            <p className="max-w-[42ch] text-nota leading-relaxed">
              Arhivare fizică autorizată, digitizare și căutare care citează sursa. 3S este
              proiectul ADRIA Servicii Arhivare SRL, Golești, județul Argeș, firma-mamă care
              arhivează documente din 2019.
            </p>
          </div>

          {COLOANE.map((c) => (
            <div key={c.titlu}>
              <h4 className="mb-3 font-mono text-eticheta font-medium tracking-[0.1em] uppercase text-pe-inchis-3">
                {c.titlu}
              </h4>
              <ul className="m-0 list-none p-0">
                {c.legaturi.map((l) => (
                  <li key={l.text} className="mb-2.5 text-[15.5px]">
                    <a href={l.href} className="text-pe-inchis no-underline hover:text-white hover:underline">
                      {l.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2 pt-6 text-[14px]">
          <span>Pagină verificată la {dataVerificare}</span>
          <span>Contract în limba română, sub lege română</span>
          <span>
            <a href="mailto:contact@3s.ro" className="text-pe-inchis no-underline hover:text-white hover:underline">
              contact@3s.ro
            </a>
          </span>
        </div>
      </Invelis>
    </footer>
  );
}
