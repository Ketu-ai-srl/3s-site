import type { Metadata } from "next";
import Link from "next/link";
import AntetPagina from "@/components/AntetPagina";
import BlocDovada from "@/components/BlocDovada";
import Buton from "@/components/Buton";
import CardSegment from "@/components/CardSegment";
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

// Pagina „despre”, scrisă pe dos față de obicei: începe cu ce lipsește, nu cu ce avem.
//
// Aranjarea are un motiv, altfel pagina ar minți prin ea. O firmă care se
// înființează acum și care se sprijină pe depozitul firmei-mamă are DOUĂ vechimi diferite,
// iar cititorul care le confundă semnează cu impresia greșită despre cine îi ține hârtia.
// Deci împărțirea se scrie explicit, într-o secțiune proprie, cu două coloane: ce este al
// ADRIEI și ce se construiește la 3S.
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
        fir={[{ text: "Pagina de start", href: "/" }, { text: "Despre noi" }]}
        eticheta={DESPRE.eticheta}
        titlu={DESPRE.h1}
        lead={DESPRE.lead}
        actiune={{ href: "/contact", text: "Vedeți cum ne scrieți" }}
        secundar={{ href: "/solutii", text: "Vedeți domeniile" }}
      />

      <SectiuneRegistru
        id="starea"
        ton="fisier"
        cota="I"
        eticheta="Starea de azi"
        titlu="3S nu are încă personalitate juridică, și asta se vede în pagină."
        lead="Dosarul de înmatriculare este în lucru. Până se încheie, firma nu are cod fiscal, număr de registru, sediu declarat sau telefon, iar acolo unde ar trebui să fie, site-ul scrie că lipsesc. Datele firmei-mamă nu se pun în locul lor: ar fi o afirmație falsă despre altă persoană juridică."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {STAREA_DE_AZI.map((f) => (
            <CardSegment key={f.titlu} titlu={f.titlu} fundal="hartie">
              {f.text}
            </CardSegment>
          ))}
        </div>

        <BlocDovada className="mt-8">
          <strong className="font-semibold text-tus">De ce citiți asta aici:</strong> starea
          juridică a unui furnizor se află oricum, la prima verificare de dosar. Scrisă de noi,
          costă o secțiune. Descoperită de dumneavoastră după trei discuții, costă discuțiile.
        </BlocDovada>
      </SectiuneRegistru>

      <SectiuneRegistru
        id="impartirea"
        ton="inchis"
        cota="II"
        eticheta="Împărțirea"
        titlu="Ce este al ADRIEI și ce se construiește la 3S."
        lead="Împărțirea contează la semnătură. Vechimea, autorizațiile și depozitul aparțin firmei-mamă, deci o afirmație despre ele se verifică la ea. Ce stă în coloana din dreapta este muncă nouă și nu are în spate niciun an de funcționare."
      >
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <ListaBifa
            inchis
            titlu="ADRIA Servicii Arhivare SRL, firma-mamă"
            elemente={MOSTENIT}
          />
          <ListaBifa inchis titlu="3S, firma care se înființează" elemente={CONSTRUIT} />
        </div>
      </SectiuneRegistru>

      <SectiuneRegistru
        ton="hartie"
        cota="III"
        eticheta="Numele"
        titlu="Scan, Store, Solve: trei verbe, în ordinea în care se întâmplă."
        lead="Cele trei verbe sunt lucrurile care se fac cu un document, de la cutia din subsol până la răspunsul de pe telefon. Fiecare are în spate un furnizor cu nume, iar împărțirea de mai sus spune care pe care."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {NUMELE.map((f) => (
            <CardSegment key={f.titlu} titlu={f.titlu}>
              {f.text}
            </CardSegment>
          ))}
        </div>
      </SectiuneRegistru>

      <SectiuneRegistru
        id="limite"
        ton="inchis"
        cota="IV"
        eticheta="Limite"
        titlu="Ce nu putem susține, scris de noi, primii."
        lead="Într-o achiziție publică, afirmația nesusținută costă mai mult decât tăcerea. Coloana din stânga este lista lucrurilor care lipsesc de pe site fiindcă nu le putem dovedi; coloana din dreapta este ce punem în loc."
      >
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <ListaBifa inchis titlu="Ce nu scriem pe site" elemente={NESCRIS} />
          <ListaBifa inchis titlu="Ce vă arătăm în schimb" elemente={ARATAM} />
        </div>
      </SectiuneRegistru>

      <SectiuneRegistru
        ton="fisier"
        cota="V"
        eticheta="Pasul următor"
        titlu="Dacă v-a rămas o întrebare, scrieți-ne-o pe ea."
      >
        <p className="mb-8 max-w-[62ch] text-lead text-tus-2">
          Pagina de contact spune pe ce drum ajunge un mesaj la noi și pe care încă nu ajunge.
          Sunt patru rânduri și se citesc în jumătate de minut, înainte să vă apucați să
          scrieți.
        </p>

        <div className="flex flex-wrap gap-3">
          <Buton href="/contact" marime="mare" sageata className="max-sm:w-full">
            Vedeți cum ne scrieți
          </Buton>
          <Buton href="/solutii" fel="contur" marime="mare" className="max-sm:w-full">
            Vedeți domeniile
          </Buton>
        </div>

        <p className="mt-6 max-w-[62ch] text-[15.5px] text-tus-3">
          Termenele de păstrare, cu actul normativ din care provin, stau în{" "}
          <Link href="/#termene" className="text-verde underline underline-offset-[3px]">
            verificatorul de pe pagina de start
          </Link>
          . Sunt un punct de plecare, nu un aviz: confirmarea lor de către un arhivist
          autorizat se face înainte de publicare.
        </p>
      </SectiuneRegistru>
    </main>
  );
}
