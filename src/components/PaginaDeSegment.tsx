import Link from "next/link";
import AntetPagina from "./AntetPagina";
import BlocDovada from "./BlocDovada";
import Buton from "./Buton";
import CardSegment from "./CardSegment";
import ListaBifa from "./ListaBifa";
import RandRaspundere from "./RandRaspundere";
import SectiuneRegistru from "./SectiuneRegistru";
import { FOTOGRAFII, type CheieFotografie } from "@/content/fotografii";
import { HUB, type PaginaSegment } from "@/content/segmente";

// Corpul unei pagini de segment, o singura data pentru toate segmentele.
//
// De ce e componenta si nu cod copiat in fiecare page.tsx: cerinta feliei e ca urmatorul
// segment - primarii, contabilitate, avocatura - sa se adauge FARA sa rescrie cineva
// paginile. Cu sablonul aici, un segment nou inseamna o constanta in `segmente.ts` si un
// fisier de ruta de vreo douazeci de randuri. Fara el, ar insemna cinci sectiuni copiate,
// adica cinci locuri care se desincronizeaza la prima schimbare de ton.
//
// Ordinea benzilor urmeaza pagina de start: fila, hartie, inchis, fila, inchis, fila.
//
// FOTOGRAFIA de antet se alege dupa slug, aici si nu in `segmente.ts`, fiindca e o decizie
// de vitrina, nu un fapt despre domeniu: cele sapte fise sunt surori si se ajunge la ele
// din aceeasi lista, deci nu au voie sa deschida cu acelasi cadru. Sapte chei distincte
// pentru sapte fise; hub-ul /solutii ia `dulapuri`, care se repeta o singura data, pe
// ultima fisa din lista.
const FOTO_SEGMENT: Record<string, CheieFotografie> = {
  notari: "maini",
  primarii: "sertare",
  contabilitate: "cutii",
  avocatura: "dosare",
  constructii: "rafturi",
  logistica: "legatura",
  imobiliare: "dulapuri",
};

type Props = {
  segment: PaginaSegment;
  /** Numele domeniului, asa cum apare pe hub. Ultima veriga din firul de navigare. */
  nume: string;
  slug: string;
};

export default function PaginaDeSegment({ segment, nume, slug }: Props) {
  const adresa = "/solutii/" + slug;

  return (
    <>


      <main id="continut">
        <AntetPagina
          adresa={adresa}
          imagine={FOTOGRAFII[FOTO_SEGMENT[slug] ?? "rafturi"]}
          fir={[
            { text: "Pagina de start", href: "/" },
            { text: HUB.titluMeta, href: "/solutii" },
            { text: nume },
          ]}
          eticheta={segment.eticheta}
          titlu={segment.h1}
          lead={segment.lead}
          actiune={{ href: "/#discutie", text: "Programați o discuție de 30 de minute" }}
          secundar={{ href: "/solutii", text: "Vedeți toate domeniile" }}
        />

        <SectiuneRegistru
          id="situatia"
          ton="fisier"
          cota="I"
          eticheta="Situația de azi"
          titlu="Ce se întâmplă acum, înainte să schimbăm ceva."
          lead="Scriem întâi problema așa cum arată ea dintr-un birou, nu din prezentarea noastră. Dacă nu vă recunoașteți în rândurile de mai jos, spuneți-ne: înseamnă că am înțeles greșit domeniul."
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {segment.durere.map((f) => (
              <CardSegment key={f.titlu} titlu={f.titlu} fundal="hartie">
                {f.text}
              </CardSegment>
            ))}
          </div>
        </SectiuneRegistru>

        <SectiuneRegistru
          id="schimbare"
          ton="hartie"
          cota="II"
          eticheta="Ce se schimbă"
          titlu="Aceleași documente, alt mod de a ajunge la ele."
          lead="Pașii serviciului sunt aceiași peste tot, iar mecanismul întreg este descris pe pagina de start. Aici scriem numai ce arată altfel în ziua de lucru a acestui domeniu."
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {segment.schimbare.map((f) => (
              <CardSegment key={f.titlu} titlu={f.titlu}>
                {f.text}
              </CardSegment>
            ))}
          </div>

          <p className="mt-8 max-w-[62ch] text-corp text-tus-2">
            Cei patru pași, în ordinea în care se întâmplă, sunt scriși pe{" "}
            <Link href="/" className="text-verde underline underline-offset-[3px]">
              pagina de start
            </Link>
            , împreună cu ce trece în grija noastră și ce rămâne la dumneavoastră.
          </p>
        </SectiuneRegistru>

        <SectiuneRegistru
          id="dovada"
          ton="inchis"
          cota="III"
          eticheta="Dovada"
          titlu="Ce puteți verifica, și ce nu putem susține încă."
          lead="Într-o relație care începe cu predarea unei arhive, afirmația nesusținută costă mai mult decât tăcerea. Punem pe masă prima listă; pe a doua o scriem tot noi, primii."
        >
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <ListaBifa inchis titlu="Ce vă arătăm înainte de semnătură" elemente={segment.aratam} />
            <ListaBifa inchis titlu="Ce nu putem susține încă" elemente={segment.deschise} />
          </div>
        </SectiuneRegistru>

        <SectiuneRegistru
          id="temei"
          ton="fisier"
          cota="IV"
          eticheta="Temeiul legal"
          titlu="Actele din care vine obligația, numite ca să le puteți citi."
          lead="Nu scriem un termen fără să spunem din ce act vine. Unde nu putem cita articolul, rândul rămâne gol și scriem de ce, în loc să punem o cifră care sună bine."
        >
          {segment.temeiuri.map((t) => (
            <div
              key={t.act}
              className="grid gap-2 border-t border-linie py-6 last:border-b lg:grid-cols-[300px_1fr] lg:gap-8"
            >
              <h3 className="text-[19px] text-tus">{t.act}</h3>
              <p className="text-corp text-tus-2">{t.ce}</p>
            </div>
          ))}

          <BlocDovada fel="limite" eticheta="Termenul pe care nu îl scriem" className="mt-8">
            {segment.notaTermene}
          </BlocDovada>

          <p className="mt-6 max-w-[62ch] text-corp text-tus-2">
            Termenele pe care le putem cita pe articol stau în{" "}
            <Link href="/#termene" className="text-verde underline underline-offset-[3px]">
              verificatorul de termene
            </Link>{" "}
            de pe pagina de start, fiecare cu actul normativ și cu data la care a fost citit.
          </p>
        </SectiuneRegistru>

        <SectiuneRegistru
          id="intrebari"
          ton="inchis"
          cota="V"
          eticheta="Întrebări"
          titlu="Întrebările care apar oricum, cu răspunsul scris din start."
          lead="Apar în prima discuție sau în chestionarul de securitate. Le punem noi primii, ca să nu pierdeți o săptămână pe corespondență."
        >
          {segment.intrebari.map((i) => (
            <RandRaspundere key={i.intrebare} intrebare={i.intrebare}>
              {i.raspuns}
            </RandRaspundere>
          ))}
        </SectiuneRegistru>

        <SectiuneRegistru
          id="discutie"
          ton="fisier"
          cota="VI"
          eticheta="Pasul următor"
          titlu={segment.incheiere.titlu}
        >
          <p className="mb-8 max-w-[62ch] text-lead text-tus-2">{segment.incheiere.text}</p>

          <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
            <Buton href="/#discutie" marime="mare" sageata className="max-sm:w-full">
              Programați o discuție de 30 de minute
            </Buton>
            <Buton href="/solutii" fel="text" marime="mare">
              Vedeți toate domeniile
            </Buton>
          </div>

          <p className="mt-6 max-w-[60ch] text-[15.5px] text-tus-3">
            Scrieți-ne și direct, dacă preferați:{" "}
            <a
              href="mailto:contact@3s.ro"
              className="text-verde underline underline-offset-[3px]"
            >
              contact@3s.ro
            </a>
            . Nu afișăm număr de telefon: solicitările intră prin formular sau email, ca să
            rămână o urmă scrisă a cererii dumneavoastră și a răspunsului nostru.
          </p>
        </SectiuneRegistru>
      </main>

    </>
  );
}
