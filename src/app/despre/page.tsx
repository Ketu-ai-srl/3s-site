import type { Metadata } from "next";
import Link from "next/link";
import AntetPagina from "@/components/AntetPagina";
import BlocDovada from "@/components/BlocDovada";
import Buton from "@/components/Buton";
import CardSegment from "@/components/CardSegment";
import DespreVerb from "@/components/DespreVerb";
import Ecran from "@/components/Ecran";
import ListaBifa from "@/components/ListaBifa";
import SectiuneRegistru from "@/components/SectiuneRegistru";
import {
  ARATAM,
  CONSTRUIT,
  DESPRE,
  MOSTENIT,
  NESCRIS,
  NUMELE,
  STAREA_DE_AZI,
} from "@/content/despre";
import { FOTOGRAFII } from "@/content/fotografii";

// Pagina „despre”, scrisă pe dos față de obicei: începe cu ce lipsește, nu cu ce avem.
//
// Aranjarea are un motiv, altfel pagina ar minți prin ea. O firmă care se înființează acum
// și care se sprijină pe depozitul firmei-mamă are DOUĂ vechimi diferite, iar cititorul care
// le confundă semnează cu impresia greșită despre cine îi ține hârtia.
//
// ÎMPĂRȚIREA ARE DOUĂ ECRANE, NU DOUĂ COLOANE. Erau două liste alăturate, de aceeași
// greutate, iar ochiul le citea ca pe două jumătăți ale aceluiași lucru - exact confuzia pe
// care secțiunea există ca să o desfacă. Pe ecrane separate nu se pot citi deodată: mai
// întâi ADRIA, cu depozitul ei fotografiat, apoi 3S, pe negru gol. Diferența de tratament nu
// este decor - ADRIA are un depozit care se poate arăta, 3S are deocamdată numai muncă
// începută, iar pagina arată exact atât.
//
// Canonical auto-referențial, ca pe celelalte pagini: fără el, ruta ar moșteni canonical-ul
// layout-ului, ar arăta către pagina de start și ar ieși din index.
export const metadata: Metadata = {
  title: DESPRE.titluMeta,
  description: DESPRE.descriereMeta,
  alternates: { canonical: "/despre" },
};

export default function Despre() {
  return (
    <main id="continut">
      <AntetPagina
        adresa="/despre"
        imagine={FOTOGRAFII.dulapuri}
        fir={[{ text: "Pagina de start", href: "/" }, { text: "Despre noi" }]}
        eticheta={DESPRE.eticheta}
        titlu={
          <>
            Firma este nouă.
            <br />
            Depozitul din care a crescut lucrează din 2019.
          </>
        }
        lead={DESPRE.lead}
        actiune={{ href: "/contact", text: "Vedeți cum ne scrieți" }}
        secundar={{ href: "/solutii", text: "Vedeți domeniile" }}
      />

      <SectiuneRegistru
        id="starea"
        dens
        cota="I"
        eticheta="Starea de azi"
        titlu="3S nu are încă personalitate juridică, și asta se vede în pagină."
        lead="Dosarul de înmatriculare este în lucru. Până se încheie, firma nu are cod fiscal, număr de registru, sediu declarat sau telefon, iar acolo unde ar trebui să fie, site-ul scrie că lipsesc. Datele firmei-mamă nu se pun în locul lor: ar fi o afirmație falsă despre altă persoană juridică."
      >
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {STAREA_DE_AZI.map((f) => (
            <CardSegment key={f.titlu} titlu={f.titlu}>
              {f.text}
            </CardSegment>
          ))}
        </div>

        <BlocDovada className="mt-10">
          <strong className="font-semibold text-cerneala">De ce citiți asta aici:</strong>{" "}
          starea juridică a unui furnizor se află oricum, la prima verificare de dosar. Scrisă
          de noi, costă o secțiune. Descoperită de dumneavoastră după trei discuții, costă
          discuțiile.
        </BlocDovada>
      </SectiuneRegistru>

      <Ecran
        id="adria"
        imagine={FOTOGRAFII.maini}
        eticheta="Împărțirea · Firma-mamă"
        titlu={
          <>
            ADRIA ține
            <br />
            hârtia. Din 2019.
          </>
        }
        text="Vechimea, autorizațiile și depozitul aparțin firmei-mamă, deci o afirmație despre ele se verifică la ea, nu la noi."
        actiune={{ href: "/arhivare-fizica", text: "Vedeți depozitul și preluarea" }}
      >
        <div className="mt-8 max-w-[560px]">
          <ListaBifa titlu="ADRIA Servicii Arhivare SRL" elemente={MOSTENIT} />
        </div>
      </Ecran>

      <Ecran
        id="trei-s"
        ton="plin"
        eticheta="Împărțirea · Firma nouă"
        titlu={
          <>
            3S construiește
            <br />
            răspunsul. Din anul acesta.
          </>
        }
        text="Ce urmează este muncă nouă și nu are în spate niciun an de funcționare. Riscul ei ni-l asumăm noi, nu firma-mamă."
        actiune={{ href: "/cum-functioneaza", text: "Vedeți mecanismul" }}
      >
        <div className="mt-8 max-w-[560px]">
          <ListaBifa titlu="3S, firma care se înființează" elemente={CONSTRUIT} />
        </div>
      </Ecran>

      <SectiuneRegistru
        id="numele"
        cota="II"
        eticheta="Numele"
        titlu="Scan, Store, Solve: trei verbe, în ordinea în care se întâmplă."
        lead="Cele trei verbe sunt lucrurile care se fac cu un document, de la cutia din subsol până la răspunsul de pe telefon. Fiecare are în spate un furnizor cu nume, iar împărțirea de mai sus spune care pe care."
      >
        {NUMELE.map((f) => (
          <DespreVerb key={f.titlu} verb={f.titlu}>
            {f.text}
          </DespreVerb>
        ))}
      </SectiuneRegistru>

      <SectiuneRegistru
        id="limite"
        ton="inchis"
        cota="III"
        eticheta="Limite"
        titlu="Ce nu putem susține, scris de noi, primii."
        lead="Într-o achiziție publică, afirmația nesusținută costă mai mult decât tăcerea. Prima listă adună lucrurile care lipsesc de pe site fiindcă nu le putem dovedi; a doua este ce punem în loc."
      >
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ListaBifa titlu="Ce nu scriem pe site" elemente={NESCRIS} />
          <ListaBifa titlu="Ce vă arătăm în schimb" elemente={ARATAM} />
        </div>
      </SectiuneRegistru>

      <SectiuneRegistru
        id="discutie"
        cota="IV"
        eticheta="Pasul următor"
        titlu="Dacă v-a rămas o întrebare, scrieți-ne-o pe ea."
      >
        <p className="mb-10 max-w-[62ch] text-[clamp(1.05rem,1.3vw,1.2rem)] leading-[1.5] text-hartie-veche-2">
          Pagina de contact spune pe ce drum ajunge un mesaj la noi și pe care încă nu ajunge.
          Sunt trei rânduri și se citesc în jumătate de minut, înainte să vă apucați să
          scrieți.
        </p>

        <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
          <Buton href="/contact" marime="mare" sageata className="max-sm:w-full">
            Vedeți cum ne scrieți
          </Buton>
          <Buton href="/solutii" fel="text" marime="mare">
            Vedeți domeniile
          </Buton>
        </div>

        <p className="mt-8 max-w-[62ch] text-[15.5px] leading-[1.5] text-hartie-veche-3">
          Termenele de păstrare, cu actul normativ din care provin, stau în{" "}
          <Link
            href="/instrumente/termene-de-pastrare"
            className="text-arama-clar underline underline-offset-[3px]"
          >
            instrumentul de termene
          </Link>
          . Sunt un punct de plecare, nu un aviz: confirmarea lor de către un arhivist
          autorizat se face înainte de publicare.
        </p>
      </SectiuneRegistru>
    </main>
  );
}
