import type { Metadata } from "next";
import Link from "next/link";
import AntetPagina from "@/components/AntetPagina";
import BlocDovada from "@/components/BlocDovada";
import Buton from "@/components/Buton";
import InvestitiaFactor from "@/components/InvestitiaFactor";
import ListaBifa from "@/components/ListaBifa";
import MecanismRandFisa from "@/components/MecanismRandFisa";
import SectiuneRegistru from "@/components/SectiuneRegistru";
import { INVESTITIA as I } from "@/content/comparatie";
import { FOTOGRAFII } from "@/content/fotografii";

// Pagina de investitie. NU contine preturi si nu contine intervale - nici "de la", nici
// exemplu de calcul. Decizia e a owner-ului si e scrisa in `CLAUDE.md`; pagina asta o
// respecta si, mai important, spune DE CE, in sectiunea III.
//
// Ce poate raspunde cinstit o pagina fara preturi: ce determina costul, ce se plateste o
// data si ce se plateste recurent, si ce primeste concret cineva din discutia de treizeci
// de minute. Atat contine.
//
// CEI SAPTE FACTORI SUNT O LISTA TIPOGRAFICA MARE, FARA CIFRE. E singurul lucru pe care
// pagina il poate da in locul unui pret: SCARA. Titlul fiecarui element urca la litera de
// afis, iar sub el stau cele doua directii - creste cand, scade cand - ca doua randuri
// egale, fiecare cu eticheta ei de mono. Numarul „Elementul 4" a fost scos: elementele nu
// sunt o ordine, deci numarul nu se citea, si un numar care nu se citeste e ornament.
//
// Continutul sta in `src/content/comparatie.ts`; aici e numai forma paginii.
export const metadata: Metadata = {
  title: I.titluMeta,
  description: I.descriereMeta,
  alternates: { canonical: "/investitia" },
};

const LEGATURA = "text-cerneala-accent underline underline-offset-[3px]";

export default function Investitia() {
  return (
    <main id="continut">
      <AntetPagina
        adresa="/investitia"
        imagine={FOTOGRAFII.dosare}
        fir={[{ text: "Pagina de start", href: "/" }, { text: "Investiția" }]}
        eticheta={I.eticheta}
        titlu={I.h1}
        lead={I.lead}
        actiune={{ href: "/#discutie", text: "Discuție de 30 de minute" }}
        secundar={{ href: "/comparatie", text: "Vedeți comparația" }}
      />

      <SectiuneRegistru
        id="factori"
        cota="I"
        eticheta="Ce determină costul"
        titlu="Șapte elemente, fiecare cu direcția în care mișcă suma."
        lead="Nu sunt criterii de listă de prețuri, sunt lucrurile pe care le măsurăm la fața locului. Fiecare are scris în ce condiții crește și în ce condiții scade, ca să vă puteți așeza singur fondul undeva pe scară."
      >
        <ol className="m-0 grid list-none gap-0 p-0">
          {I.factori.map((f) => (
            <InvestitiaFactor
              key={f.titlu}
              titlu={f.titlu}
              text={f.text}
              creste={f.creste}
              scade={f.scade}
            />
          ))}
        </ol>
      </SectiuneRegistru>

      <SectiuneRegistru
        id="unic-si-recurent"
        ton="inchis"
        cota="II"
        eticheta="Structura"
        titlu="Ce se plătește o dată și ce se plătește lună de lună."
        lead="Împărțirea contează mai mult decât suma: partea unică se face o singură dată și rămâne făcută, partea recurentă se adună cât ține contractul. Două oferte cu același total pot fi foarte diferite aici."
      >
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ListaBifa titlu="Se plătește o singură dată" elemente={I.costUnic} />
          <ListaBifa titlu="Se plătește recurent" elemente={I.costRecurent} />
        </div>

        <BlocDovada fel="limite" eticheta="Ce nu intră în nicio coloană" className="mt-12">
          {I.notaCosturi}
        </BlocDovada>

        <p className="mt-8 max-w-[62ch] text-[17px] leading-[1.6] text-cerneala-2">
          Termenele legale de păstrare, care hotărăsc cât timp stă fiecare categorie în
          depozit, se pot verifica în{" "}
          <Link href="/instrumente/termene-de-pastrare" className={LEGATURA}>
            verificatorul de termene
          </Link>
          . Ce se întâmplă fizic cu fondul, de la ridicare până la retur, este descris pe{" "}
          <Link href="/cum-functioneaza" className={LEGATURA}>
            pagina de mecanism
          </Link>
          .
        </p>
      </SectiuneRegistru>

      <SectiuneRegistru
        id="fara-pret"
        cota="III"
        eticheta="De ce nu scrie un preț aici"
        titlu="O cifră dată înainte de a măsura rafturile ar fi o cifră inventată."
        lead="Nu este o tactică de vânzare și nu ascunde nimic: pur și simplu nu se poate calcula corect. Mai jos sunt cele trei motive, plus întrebările cu care puteți verifica pe oricine, inclusiv pe noi."
      >
        {I.deCeFaraPret.map((d) => (
          <MecanismRandFisa key={d.titlu} titlu={d.titlu}>
            {d.text}
          </MecanismRandFisa>
        ))}
      </SectiuneRegistru>

      <SectiuneRegistru
        id="discutia"
        ton="inchis"
        cota="IV"
        eticheta="Discuția de 30 de minute"
        titlu="Ce iese din jumătatea de oră, și ce nu iese."
        lead="Discuția nu este o prezentare. Se măsoară, se scrie și pleacă la dumneavoastră, chiar dacă la final decideți să rămâneți la dulapul din birou."
      >
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ListaBifa titlu="Ce primiți, în scris" elemente={I.primiti} />
          <ListaBifa titlu="Ce nu primiți, și nici nu promitem" elemente={I.nuPrimiti} />
        </div>

        <p className="mt-10 max-w-[62ch] text-[17px] leading-[1.6] text-cerneala-2">
          Dacă din discuție reiese că nu vă suntem de folos, o spunem atunci. Situațiile în
          care se întâmplă asta sunt scrise dinainte, pe{" "}
          <Link href="/comparatie" className={LEGATURA}>
            pagina de comparație
          </Link>
          .
        </p>
      </SectiuneRegistru>

      <SectiuneRegistru
        id="discutie"
        cota="V"
        eticheta="Pasul următor"
        titlu={I.incheiere.titlu}
        lead={I.incheiere.text}
      >
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <Buton href="/#discutie" marime="mare" sageata className="max-sm:w-full">
            Discuție de 30 de minute
          </Buton>
          <Buton href="/comparatie" fel="text" marime="mare">
            Vedeți comparația
          </Buton>
        </div>

        <p className="mt-8 max-w-[60ch] text-[15.5px] leading-[1.55] text-cerneala-3">
          Scrieți-ne și direct, dacă preferați:{" "}
          <a href="mailto:contact@3s.ro" className={LEGATURA}>
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
