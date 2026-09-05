import type { Metadata } from "next";
import Link from "next/link";
import AntetPagina from "@/components/AntetPagina";
import BlocDovada from "@/components/BlocDovada";
import Buton from "@/components/Buton";
import ListaBifa from "@/components/ListaBifa";
import MecanismEtapa from "@/components/MecanismEtapa";
import MecanismLant from "@/components/MecanismLant";
import MecanismRandFisa from "@/components/MecanismRandFisa";
import SectiuneRegistru from "@/components/SectiuneRegistru";
import { CUM_FUNCTIONEAZA as C } from "@/content/mecanism";

// Pagina de mecanism. Aici ajunge butonul secundar de pe fisele de domeniu si de pe
// hub, deci sarcina ei e sa raspunda o singura data, complet, la intrebarea pe care o
// pune oricine preda o arhiva: ce se intampla cu ea, in ce ordine, si ce hartie imi
// ramane dupa fiecare pas.
//
// Continutul sta in `src/content/mecanism.ts`; aici e numai forma paginii.
//
// Canonical auto-referential: fara el, pagina ar mosteni canonical-ul layout-ului si ar
// arata spre pagina de start, ceea ce o scoate din index.
export const metadata: Metadata = {
  title: C.titluMeta,
  description: C.descriereMeta,
  alternates: { canonical: "/cum-functioneaza" },
};

export default function CumFunctioneaza() {
  return (
    <main id="continut">
      <AntetPagina
        adresa="/cum-functioneaza"
        fir={[{ text: "Pagina de start", href: "/" }, { text: "Cum funcționează" }]}
        eticheta={C.eticheta}
        titlu={C.h1}
        lead={C.lead}
        actiune={{ href: "/#discutie", text: "Programați o discuție de 30 de minute" }}
        secundar={{ href: "/arhivare-fizica", text: "Vedeți partea fizică" }}
      />

      <SectiuneRegistru
        id="etape"
        ton="fisier"
        cota="I"
        eticheta="Etapele"
        titlu="Șase etape, fiecare cu un document semnat."
        lead="Nu vă cerem încredere între etape. Fiecare se închide cu o hârtie care spune ce s-a mutat, ce s-a numărat și cine răspunde de fondul dumneavoastră de acum înainte."
      >
        <ol className="m-0 grid list-none gap-0 p-0">
          {C.etape.map((e, i) => (
            <MecanismEtapa
              key={e.titlu}
              numar={i + 1}
              titlu={e.titlu}
              text={e.text}
              urma={e.urma}
            />
          ))}
        </ol>

        <p className="mt-8 max-w-[64ch] text-corp text-tus-2">
          Prima etapă și a doua se fac cu rafturi, cutii și mașină. Cum arată depozitul, cum
          se măsoară un fond și cum se elimină legal ce nu mai trebuie păstrat sunt scrise pe{" "}
          <Link
            href="/arhivare-fizica"
            className="text-verde underline underline-offset-[3px]"
          >
            pagina de arhivare fizică
          </Link>
          .
        </p>
      </SectiuneRegistru>

      <SectiuneRegistru
        id="digitizare"
        ton="hartie"
        cota="II"
        eticheta="Ce se scanează"
        titlu="Se digitizează ce se caută, în ordinea în care se caută."
        lead="Împărțirea de mai jos este punctul de plecare al discuției, nu o regulă fixă. Lista finală o hotărâți dumneavoastră, iar ea intră în contract înainte să se deschidă prima cutie."
      >
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <ListaBifa titlu="Ce intră la scanat, de obicei" elemente={C.digitizat} />
          <ListaBifa titlu="Ce rămâne pe hârtie, cel puțin la început" elemente={C.peHartie} />
        </div>

        <BlocDovada fel="limite" eticheta="Ce nu propunem din start" className="mt-8">
          {C.notaDigitizare}
        </BlocDovada>
      </SectiuneRegistru>

      <SectiuneRegistru
        id="cautare"
        ton="inchis"
        cota="III"
        eticheta="Căutarea"
        titlu="De la întrebarea pusă în română până la pagina pe care o citiți singur."
        lead="Cinci verigi, în ordine. Dacă una lipsește, lanțul se oprește acolo și nu vedeți un răspuns pe care nu îl putem susține cu un document."
      >
        <MecanismLant verigi={C.lant} />

        <div className="mt-10">
          <ListaBifa inchis titlu="Ce nu face căutarea" elemente={C.nuFace} />
        </div>
      </SectiuneRegistru>

      <SectiuneRegistru
        id="hartia"
        ton="fisier"
        cota="IV"
        eticheta="Hârtia"
        titlu="Întrebările care apar când documentul iese din mâna dumneavoastră."
        lead="Sunt întrebările pe care le pune un serviciu juridic sau un auditor intern. Le punem noi primii, cu răspunsul scris, ca să nu pierdeți o săptămână pe corespondență."
      >
        {C.hartie.map((f) => (
          <MecanismRandFisa key={f.titlu} titlu={f.titlu}>
            {f.text}
          </MecanismRandFisa>
        ))}

        <p className="mt-8 max-w-[64ch] text-corp text-tus-2">
          Termenele de păstrare, cu actul normativ din care vin, stau în{" "}
          <Link href="/#termene" className="text-verde underline underline-offset-[3px]">
            verificatorul de termene
          </Link>{" "}
          de pe pagina de start. Ce diferă de la un domeniu la altul se citește pe{" "}
          <Link href="/solutii" className="text-verde underline underline-offset-[3px]">
            fișele de domeniu
          </Link>
          .
        </p>
      </SectiuneRegistru>

      <SectiuneRegistru
        id="dovada"
        ton="inchis"
        cota="V"
        eticheta="Dovada"
        titlu="Ce puteți verifica, și ce nu putem susține încă."
        lead="Coloana din stânga se poate vedea înainte de semnătură. Pe cea din dreapta o scriem tot noi, primii, fiindcă o afirmație nesusținută costă mai mult decât tăcerea."
      >
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <ListaBifa inchis titlu="Ce vă arătăm înainte de semnătură" elemente={C.aratam} />
          <ListaBifa inchis titlu="Ce nu putem susține încă" elemente={C.deschise} />
        </div>
      </SectiuneRegistru>

      <SectiuneRegistru
        id="discutie"
        ton="fisier"
        cota="VI"
        eticheta="Pasul următor"
        titlu={C.incheiere.titlu}
      >
        <p className="mb-8 max-w-[62ch] text-lead text-tus-2">{C.incheiere.text}</p>

        <div className="flex flex-wrap gap-3">
          <Buton href="/#discutie" marime="mare" sageata className="max-sm:w-full">
            Programați o discuție de 30 de minute
          </Buton>
          <Buton href="/arhivare-fizica" fel="contur" marime="mare" className="max-sm:w-full">
            Vedeți partea fizică
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
