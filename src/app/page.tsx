import type { Metadata } from "next";
import Link from "next/link";
import Ecran from "@/components/Ecran";
import StampilaCitare from "@/components/StampilaCitare";
import { SEGMENTE } from "@/content/segmente";

// Pagina de start e VITRINA, nu documentatia. Sase ecrane, fiecare cu un singur lucru de
// spus, sub 300 de cuvinte in total. Tot ce era aici inainte - verificatorul de termene,
// cele opt randuri de raspundere, formularul - traieste pe paginile interioare, unde omul
// ajunge fiindca vrea detaliul. Aici ajunge fiindca nu stie inca daca il vrea.
//
// Fiecare afirmatie de mai jos e deja in registrul din `src/content/afirmatii/`. Nu s-a
// adaugat niciuna noua; s-au scos multe.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const CU_FISA = SEGMENTE.filter((s) => s.pagina !== null);
// Un singur cuvant per domeniu, la marimea asta de litera: "Agentii imobiliare si
// administrare de imobile" rupe pe doua randuri la orice latime, iar lista e ritm, nu text.
// Numele complet ramane pe fisa domeniului si in subsol.
const UN_CUVANT: Record<string, string> = {
  notari: "Notari",
  primarii: "Primării",
  contabilitate: "Contabilitate",
  avocatura: "Avocatură",
  constructii: "Construcții",
  logistica: "Logistică",
  imobiliare: "Imobiliare",
};

export default function Acasa() {
  return (
    <main id="continut">
      <Ecran
        nivel="h1"
        imagine={{
          nume: "rafturi",
          alt: "Rafturi metalice de arhivă cu cutii numerotate, fotografie ilustrativă",
          pozitie: "center 40%",
        }}
        eticheta="Arhivare fizică · Digitizare · Căutare cu sursă"
        titlu={
          <>
            Când vine controlul,
            <br />
            dosarul e deja pe masă.
          </>
        }
        text="Hârtia stă într-un depozit din Argeș. Întrebarea o puneți în română, de pe telefon. Răspunsul vine cu documentul și pagina din care a fost scos."
        actiune={{ href: "/contact", text: "Discuție de 30 de minute" }}
      />

      <Ecran
        id="scan"
        imagine={{
          nume: "dosare",
          alt: "Dosare de arhivă legate cu sfoară, fotografie ilustrativă",
          pozitie: "center 55%",
        }}
        eticheta="Scan"
        titlu={
          <>
            Ce se cere des
            <br />
            se scanează.
          </>
        }
        text="Nu digitizăm tot. Digitizăm ce se caută, iar originalul rămâne pe raft, cu cotă, și se întoarce când îl cereți pe hârtie."
        actiune={{ href: "/cum-functioneaza", text: "Cum funcționează" }}
      />

      <Ecran
        id="store"
        imagine={{
          nume: "cutii",
          alt: "Cutii de arhivă cu cote numerotate pe raft, fotografie ilustrativă",
          pozitie: "center 45%",
        }}
        eticheta="Store"
        titlu={
          <>
            Fiecare cutie are o cotă.
            <br />
            Fiecare cotă, un raft.
          </>
        }
        text="Depozit la Golești, județul Argeș. Preluare cu proces-verbal și inventar. Puteți vedea depozitul înainte să semnați."
        actiune={{ href: "/arhivare-fizica", text: "Arhivare fizică" }}
      />

      <Ecran
        id="solve"
        ton="plin"
        eticheta="Solve"
        titlu="Răspunsul vine cu pagina."
        text="Fără sursă, răspunsul nu se afișează. Fiecare frază se poate deschide la documentul și pagina din care a fost scoasă."
        actiune={{ href: "/instrumente/termene-de-pastrare", text: "Termene de păstrare" }}
      >
        <StampilaCitare
          intrebare="Când expiră contractul de salubritate?"
          raspuns="Contractul a fost semnat la 14 martie 2019, pe o durată de 8 ani. Expiră la 13 martie 2027 și se prelungește numai prin act adițional."
          sursa={{ document: "Contract 214/2019", pagina: "pag. 4", articol: "art. 7.2" }}
        />
      </Ecran>

      <section id="domenii" className="bg-noapte">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-36">
          <p className="mb-5 font-mono text-[12px] tracking-[0.22em] uppercase text-arama-clar">
            Domenii
          </p>
          <h2 className="font-afis max-w-[24ch] text-titlu-2 font-bold tracking-[-0.01em] uppercase text-hartie-veche">
            Aceeași arhivă.
            <br />
            Altă întrebare.
          </h2>
          <ul className="mt-12 grid list-none gap-x-10 gap-y-0 p-0 md:grid-cols-2 lg:grid-cols-3">
            {CU_FISA.map((s) => (
              <li key={s.slug} className="border-b border-linie-noapte">
                <Link
                  href={"/solutii/" + s.slug}
                  className="group flex items-baseline justify-between py-5 font-afis text-[clamp(1.5rem,2.4vw,2.1rem)] font-semibold tracking-[0.04em] uppercase text-hartie-veche-2 no-underline transition-colors duration-200 hover:text-hartie-veche"
                >
                  {UN_CUVANT[s.slug] ?? s.nume}
                  <span aria-hidden="true" className="text-arama-clar transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/solutii"
            className="mt-10 inline-flex items-center gap-3 border border-hartie-veche px-6 py-3.5 font-afis text-[15px] font-semibold tracking-[0.14em] uppercase text-hartie-veche no-underline transition-colors duration-200 hover:border-arama-clar hover:text-arama-clar"
          >
            Toate domeniile <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <Ecran
        id="discutie"
        ton="plin"
        eticheta="Pasul următor"
        titlu={
          <>
            Treizeci de minute.
            <br />
            Fără ofertă a doua zi.
          </>
        }
        text="Ne uităm împreună la ce aveți: câți metri liniari, ce se cere des, ce termene se aplică. Plecați cu o estimare de volum și un calendar de preluare scris."
        actiune={{ href: "/contact", text: "Contact" }}
      />
    </main>
  );
}
