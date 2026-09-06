import type { Metadata } from "next";
import Link from "next/link";
import AntetPagina from "@/components/AntetPagina";
import BlocDovada from "@/components/BlocDovada";
import Buton from "@/components/Buton";
import ComparatieTabel from "@/components/ComparatieTabel";
import MecanismRandFisa from "@/components/MecanismRandFisa";
import SectiuneRegistru from "@/components/SectiuneRegistru";
import { COMPARATIE as C } from "@/content/comparatie";
import { FOTOGRAFII } from "@/content/fotografii";

// Pagina de comparatie. Compara ce compara CLIENTUL: dulapul din birou, colegul care se
// ocupa si de arhiva, un depozit fara cautare si o arhiva administrata. Nu compara spatii
// de stocare intre ele - aia e comparatia altcuiva, pentru un om care are deja documentele
// scanate, iar clientul nostru are hartie.
//
// Sectiunea III se cheama "Unde pierdem" si e a treia din cinci, nu ultima nota de subsol.
// E decizia de continut a paginii: o comparatie care iese in avantajul nostru pe fiecare
// rand nu convinge un cumparator institutional, il alerteaza.
//
// Continutul sta in `src/content/comparatie.ts`; aici e numai forma paginii.
export const metadata: Metadata = {
  title: C.titluMeta,
  description: C.descriereMeta,
  alternates: { canonical: "/comparatie" },
};

export default function Comparatie() {
  return (
    <main id="continut">
      <AntetPagina
        adresa="/comparatie"
        imagine={FOTOGRAFII.maini}
        fir={[{ text: "Pagina de start", href: "/" }, { text: "Comparație" }]}
        eticheta={C.eticheta}
        titlu={C.h1}
        lead={C.lead}
        actiune={{ href: "/#discutie", text: "Programați o discuție de 30 de minute" }}
        secundar={{ href: "/investitia", text: "Ce determină costul" }}
      />

      <SectiuneRegistru
        id="variante"
        ton="fisier"
        cota="I"
        eticheta="Variantele"
        titlu="Patru situații reale, nu patru produse de pe un raft."
        lead="Înainte de orice tabel, cele patru variante scrise pe îndelete, fiecare cu ce are bun. Trei dintre ele nu sunt ale noastre și sunt descrise ca și cum le-ar fi descris cine le folosește."
      >
        {C.variante.map((v) => (
          <MecanismRandFisa key={v.titlu} titlu={v.titlu}>
            {v.text}
          </MecanismRandFisa>
        ))}

        <p className="mt-8 max-w-[64ch] text-corp text-tus-2">
          Ce se întâmplă concret în varianta a patra, pas cu pas, de la ridicarea cutiilor
          până la restituire, este scris pe{" "}
          <Link
            href="/cum-functioneaza"
            className="text-verde underline underline-offset-[3px]"
          >
            pagina de mecanism
          </Link>
          , iar partea cu rafturi și depozit pe{" "}
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
        id="tabel"
        ton="hartie"
        cota="II"
        eticheta="Comparația"
        titlu="Șase întrebări care se pun oricum, cu patru răspunsuri fiecare."
        lead="Sunt întrebările care apar în discuție, în ordinea în care apar. Pe ecran lat se citesc pe coloane; pe telefon fiecare întrebare devine un bloc, iar fiecare răspuns își poartă numele variantei."
      >
        <ComparatieTabel coloane={C.coloane} randuri={C.randuri} />

        <BlocDovada fel="limite" eticheta="Ce nu măsoară tabelul" className="mt-10">
          {C.notaTabel}
        </BlocDovada>
      </SectiuneRegistru>

      <SectiuneRegistru
        id="pierdem"
        ton="inchis"
        cota="III"
        eticheta="Unde pierdem"
        titlu="Rândurile pe care le pierdem, scrise de noi, înaintea celor pe care le câștigăm."
        lead="Un tabel care iese în avantajul furnizorului pe fiecare rând nu este o comparație. Cele patru rânduri de mai jos sunt locurile în care varianta actuală este mai bună decât a noastră, iar unul dintre ele este chiar motivul pentru care mulți nu ar trebui să ne aleagă."
      >
        {C.pierdem.map((p) => (
          <MecanismRandFisa key={p.titlu} titlu={p.titlu} inchis>
            {p.text}
          </MecanismRandFisa>
        ))}
      </SectiuneRegistru>

      <SectiuneRegistru
        id="cand-nu-merita"
        ton="fisier"
        cota="IV"
        eticheta="Când nu merită"
        titlu="Patru situații în care răspunsul corect este nu."
        lead="Le scriem fiindcă le auzim oricum în prima jumătate de oră, iar atunci s-a consumat deja timpul dumneavoastră. Mai bine se citesc aici, gratis."
      >
        {C.nuMerita.map((n) => (
          <MecanismRandFisa key={n.titlu} titlu={n.titlu}>
            {n.text}
          </MecanismRandFisa>
        ))}

        <p className="mt-8 max-w-[64ch] text-corp text-tus-2">
          Cât timp trebuie păstrată legal fiecare categorie, cu actul normativ din care vine
          termenul, se vede în{" "}
          <Link href="/#termene" className="text-verde underline underline-offset-[3px]">
            verificatorul de termene
          </Link>{" "}
          de pe pagina de start. Din el se vede și ce se poate elimina legal chiar acum.
        </p>
      </SectiuneRegistru>

      <SectiuneRegistru
        id="discutie"
        ton="hartie"
        cota="V"
        eticheta="Pasul următor"
        titlu={C.incheiere.titlu}
      >
        <p className="mb-8 max-w-[62ch] text-lead text-tus-2">{C.incheiere.text}</p>

        <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
          <Buton href="/#discutie" marime="mare" sageata className="max-sm:w-full">
            Programați o discuție de 30 de minute
          </Buton>
          <Buton href="/investitia" fel="text" marime="mare">
            Ce determină costul
          </Buton>
        </div>

        <p className="mt-6 max-w-[60ch] text-[15.5px] text-tus-3">
          Dacă vreți întâi să vedeți ce se schimbă la fondul dumneavoastră în funcție de
          domeniu, fișele pe{" "}
          <Link href="/solutii" className="text-verde underline underline-offset-[3px]">
            domenii
          </Link>{" "}
          spun ce diferă la un birou notarial față de o primărie sau de un birou de
          contabilitate.
        </p>
      </SectiuneRegistru>
    </main>
  );
}
