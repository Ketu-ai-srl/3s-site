import type { Metadata } from "next";
import Link from "next/link";
import AntetPagina from "@/components/AntetPagina";
import BlocDovada from "@/components/BlocDovada";
import Buton from "@/components/Buton";
import CardSegment from "@/components/CardSegment";
import ListaBifa from "@/components/ListaBifa";
import MecanismEtapa from "@/components/MecanismEtapa";
import MecanismRandFisa from "@/components/MecanismRandFisa";
import SectiuneRegistru from "@/components/SectiuneRegistru";
import { ARHIVARE_FIZICA as A } from "@/content/mecanism";
import { FOTOGRAFII } from "@/content/fotografii";

// Pagina partii fizice: depozit, preluare, inventar, selectionare.
//
// Continutul sta in `src/content/mecanism.ts`; aici e numai forma paginii.
//
// Ce face pagina asta si nu apartine niciunei alte pagini: leaga fiecare afirmatie de un
// obiect sau de un act - raftul, cutia, cota, procesul-verbal, avizul. Vechimea si
// autorizarea se scriu ATRIBUIT catre ADRIA, firma-mama, nu la persoana intai: 3S nu e
// inregistrata inca, deci nu are ce sa fie autorizat. Regula sta in
// `.claude/rules/afirmatii-atribuite.md` si e aparata de `poarta-afirmatii.py`.
export const metadata: Metadata = {
  title: A.titluMeta,
  description: A.descriereMeta,
  alternates: { canonical: "/arhivare-fizica" },
};

export default function ArhivareFizica() {
  return (
    <main id="continut">
      <AntetPagina
        adresa="/arhivare-fizica"
        imagine={FOTOGRAFII.cutii}
        fir={[{ text: "Pagina de start", href: "/" }, { text: "Arhivare fizică" }]}
        eticheta={A.eticheta}
        titlu={A.h1}
        lead={A.lead}
        actiune={{ href: "/#discutie", text: "Programați o discuție de 30 de minute" }}
        secundar={{ href: "/cum-functioneaza", text: "Vedeți mecanismul complet" }}
      />

      <SectiuneRegistru
        id="depozit"
        ton="fisier"
        cota="I"
        eticheta="Depozitul"
        titlu="Hârtia stă într-un loc care are adresă și poartă."
        lead="Un depozit se judecă după ce se vede la fața locului: condițiile, rafturile, felul în care sunt separate fondurile și cine are voie să intre. De aceea vizita este primul lucru pe care îl propunem, nu ultimul."
      >
        <div className="grid gap-6 sm:grid-cols-2">
          {A.depozit.map((f) => (
            <CardSegment key={f.titlu} titlu={f.titlu} fundal="hartie">
              {f.text}
            </CardSegment>
          ))}
        </div>
      </SectiuneRegistru>

      <SectiuneRegistru
        id="preluare"
        ton="hartie"
        cota="II"
        eticheta="Preluarea"
        titlu="Cum pleacă arhiva de la dumneavoastră, în patru pași."
        lead="Numărătoarea de la început decide tot ce urmează. Un fond preluat pe ochi se plătește mai târziu, când cineva caută un dosar despre care nimeni nu mai poate spune dacă a plecat vreodată din instituție."
      >
        <ol className="m-0 grid list-none gap-0 p-0">
          {A.preluare.map((e, i) => (
            <MecanismEtapa
              key={e.titlu}
              numar={i + 1}
              titlu={e.titlu}
              text={e.text}
              urma={e.urma}
            />
          ))}
        </ol>
      </SectiuneRegistru>

      <SectiuneRegistru
        id="inventar"
        ton="inchis"
        cota="III"
        eticheta="Inventarul"
        titlu="Cinci cuvinte pe care le veți auzi la fiecare discuție."
        lead="Sunt cuvintele din contract, din procesul-verbal și din discuția cu Arhivele Naționale. Le scriem aici ca să nu semnați nimic pe baza unei aproximări."
      >
        {A.cuvinte.map((f) => (
          <MecanismRandFisa key={f.titlu} titlu={f.titlu} inchis>
            {f.text}
          </MecanismRandFisa>
        ))}
      </SectiuneRegistru>

      <SectiuneRegistru
        id="selectionare"
        ton="fisier"
        cota="IV"
        eticheta="Selecționarea"
        titlu="Eliminarea documentelor este o procedură, cu comisie și cu aviz."
        lead="Este partea în care o scurtătură costă cel mai mult, fiindcă răspunderea rămâne la instituția care a creat documentele. Ordinea de mai jos nu se schimbă și nu se scurtează."
      >
        {A.selectionare.map((f) => (
          <MecanismRandFisa key={f.titlu} titlu={f.titlu}>
            {f.text}
          </MecanismRandFisa>
        ))}

        <BlocDovada fel="limite" eticheta="Fără aviz nu se elimină nimic" className="mt-8">
          {A.notaSelectionare}
        </BlocDovada>
      </SectiuneRegistru>

      <SectiuneRegistru
        id="temei"
        ton="hartie"
        cota="V"
        eticheta="Temeiul legal"
        titlu="Actele din care vine obligația, numite ca să le puteți citi."
        lead="Nu scriem o obligație fără să spunem din ce act vine. Unde nu putem cita articolul, rândul rămâne gol și scriem de ce, în loc să punem o trimitere care sună bine."
      >
        {A.temeiuri.map((f) => (
          <MecanismRandFisa key={f.titlu} titlu={f.titlu}>
            {f.text}
          </MecanismRandFisa>
        ))}

        <BlocDovada fel="limite" eticheta="Ce nu scriem aici" className="mt-8">
          {A.notaTemei}
        </BlocDovada>

        <p className="mt-6 max-w-[64ch] text-corp text-tus-2">
          Termenele pe care le putem cita pe articol stau în{" "}
          <Link href="/#termene" className="text-verde underline underline-offset-[3px]">
            verificatorul de termene
          </Link>{" "}
          de pe pagina de start, fiecare cu actul normativ și cu data la care a fost citit.
        </p>
      </SectiuneRegistru>

      <SectiuneRegistru
        id="dovada"
        ton="inchis"
        cota="VI"
        eticheta="Dovada"
        titlu="Ce se vede la o vizită, și ce nu putem susține încă."
        lead="Depozitul este singurul argument din pagina asta care se verifică cu ochii, într-o oră. Restul se verifică pe hârtii, iar hârtiile vi le arătăm înainte de semnătură."
      >
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <ListaBifa inchis titlu="Ce vă arătăm la vizită" elemente={A.aratam} />
          <ListaBifa inchis titlu="Ce nu putem susține încă" elemente={A.deschise} />
        </div>
      </SectiuneRegistru>

      <SectiuneRegistru
        id="discutie"
        ton="fisier"
        cota="VII"
        eticheta="Pasul următor"
        titlu={A.incheiere.titlu}
      >
        <p className="mb-8 max-w-[62ch] text-lead text-tus-2">{A.incheiere.text}</p>

        <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
          <Buton href="/#discutie" marime="mare" sageata className="max-sm:w-full">
            Programați o discuție de 30 de minute
          </Buton>
          <Buton href="/cum-functioneaza" fel="text" marime="mare">
            Vedeți mecanismul complet
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
          . Nu afișăm număr de telefon: solicitările intră prin formular sau prin poștă
          electronică, ca să rămână o urmă scrisă a cererii dumneavoastră și a răspunsului
          nostru.
        </p>
      </SectiuneRegistru>
    </main>
  );
}
