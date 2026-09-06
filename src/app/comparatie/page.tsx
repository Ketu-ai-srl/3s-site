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
// TABELUL RAMANE TABEL. E cel mai bun lucru de pe pagina si singura forma in care sase
// intrebari cu patru raspunsuri se citesc ca raspunsuri. Ce s-a schimbat e suprafata pe
// care sta - noapte, cu liniile directiei - si litera capului de coloana. Motivul pentru
// care e o grila si nu un `<table>` e masurat si e scris in `ComparatieTabel.tsx`.
//
// BANDA „UNDE PIERDEM" RAMANE BANDA, si ramane a treia din cinci, nu ultima nota de
// subsol. E decizia de continut a paginii: o comparatie care iese in avantajul nostru pe
// fiecare rand nu convinge un cumparator institutional, il alerteaza. Sta pe treapta
// `noapte-2`, intre doua sectiuni de noapte, deci se vede ca bloc de la distanta.
//
// FOTOGRAFIA a trecut de la `maini` la `legatura`: /comparatie si /cum-functioneaza se
// leaga una de alta - butonul secundar si prima sectiune duc acolo - si deschideau cu
// ACELASI cadru, adica exact ce interzice regula „paginile vecine sa nu deschida la fel"
// din `docs/design/DIRECTIA.md`. `legatura` e singura cheie, alaturi de `rafturi`, care nu
// e purtata de vreo pagina spre care duce /comparatie: /investitia are `dosare`,
// /arhivare-fizica `cutii`, /instrumente/termene-de-pastrare `sertare`, /solutii `dulapuri`.
// Schimbarea cere remasurarea contrastului peste fotografie, si a fost facuta.
//
// Continutul sta in `src/content/comparatie.ts`; aici e numai forma paginii.
export const metadata: Metadata = {
  title: C.titluMeta,
  description: C.descriereMeta,
  alternates: { canonical: "/comparatie" },
};

const LEGATURA = "text-cerneala-accent underline underline-offset-[3px]";

export default function Comparatie() {
  return (
    <main id="continut">
      <AntetPagina
        adresa="/comparatie"
        forma="banda"
        imagine={FOTOGRAFII.legatura}
        fir={[{ text: "Pagina de start", href: "/" }, { text: "Comparație" }]}
        eticheta={C.eticheta}
        titlu={C.h1}
        lead={C.lead}
        actiune={{ href: "/#discutie", text: "Discuție de 30 de minute" }}
        secundar={{ href: "/investitia", text: "Ce determină costul" }}
      />

      <SectiuneRegistru
        id="variante"
        cota="I"
        eticheta="Variantele"
        titlu="Patru situații reale, nu patru produse de pe un raft."
        lead="Comparăm ce comparați dumneavoastră de fapt. Nu spațiu de stocare cu alt spațiu de stocare, fiindcă documentele nu sunt încă fișiere. Cele patru variante de mai jos sunt scrise pe îndelete, fiecare cu ce are bun; trei dintre ele nu sunt ale noastre și sunt descrise ca și cum le-ar fi descris cine le folosește."
      >
        {C.variante.map((v) => (
          <MecanismRandFisa key={v.titlu} titlu={v.titlu}>
            {v.text}
          </MecanismRandFisa>
        ))}

        <p className="mt-10 max-w-[62ch] text-[17px] leading-[1.6] text-cerneala-2">
          Ce se întâmplă concret în varianta a patra, pas cu pas, de la ridicarea cutiilor
          până la restituire, este scris pe{" "}
          <Link href="/cum-functioneaza" className={LEGATURA}>
            pagina de mecanism
          </Link>
          , iar partea cu rafturi și depozit pe{" "}
          <Link href="/arhivare-fizica" className={LEGATURA}>
            pagina de arhivare fizică
          </Link>
          .
        </p>
      </SectiuneRegistru>

      <SectiuneRegistru
        id="tabel"
        cota="II"
        eticheta="Comparația"
        titlu="Șase întrebări care se pun oricum, cu patru răspunsuri fiecare."
        lead="Sunt întrebările care apar în discuție, în ordinea în care apar. Pe ecran lat se citesc pe coloane; pe telefon fiecare întrebare devine un bloc, iar fiecare răspuns își poartă numele variantei."
      >
        <ComparatieTabel coloane={C.coloane} randuri={C.randuri} />

        <BlocDovada fel="limite" eticheta="Ce nu măsoară tabelul" className="mt-14">
          {C.notaTabel}
        </BlocDovada>
      </SectiuneRegistru>

      <SectiuneRegistru
        id="pierdem"
        ton="inchis"
        cota="III"
        eticheta="Unde pierdem"
        titlu="Rândurile pe care le pierdem, scrise de noi, înaintea celor pe care le câștigăm."
        lead="Un tabel care iese în avantajul furnizorului pe fiecare rând nu este o comparație. Cele patru rânduri de mai jos sunt locurile în care varianta actuală este mai bună decât a noastră, iar unul este chiar motivul pentru care mulți nu ar trebui să ne aleagă."
      >
        {C.pierdem.map((p) => (
          <MecanismRandFisa key={p.titlu} titlu={p.titlu}>
            {p.text}
          </MecanismRandFisa>
        ))}
      </SectiuneRegistru>

      <SectiuneRegistru
        id="cand-nu-merita"
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

        <p className="mt-10 max-w-[62ch] text-[17px] leading-[1.6] text-cerneala-2">
          Cât timp trebuie păstrată legal fiecare categorie, cu actul normativ din care vine
          termenul, se vede în{" "}
          <Link href="/instrumente/termene-de-pastrare" className={LEGATURA}>
            verificatorul de termene
          </Link>
          . Din el se vede și ce se poate elimina legal chiar acum.
        </p>
      </SectiuneRegistru>

      <SectiuneRegistru
        id="discutie"
        ton="inchis"
        cota="V"
        eticheta="Pasul următor"
        titlu={C.incheiere.titlu}
        lead={C.incheiere.text}
      >
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <Buton href="/#discutie" marime="mare" sageata className="max-sm:w-full">
            Discuție de 30 de minute
          </Buton>
          <Buton href="/investitia" fel="text" marime="mare">
            Ce determină costul
          </Buton>
        </div>

        <p className="mt-8 max-w-[60ch] text-[15.5px] leading-[1.55] text-cerneala-3">
          Dacă vreți întâi să vedeți ce se schimbă la fondul dumneavoastră în funcție de
          domeniu, fișele pe{" "}
          <Link href="/solutii" className={LEGATURA}>
            domenii
          </Link>{" "}
          spun ce diferă la un birou notarial față de o primărie sau de un birou de
          contabilitate.
        </p>
      </SectiuneRegistru>
    </main>
  );
}
