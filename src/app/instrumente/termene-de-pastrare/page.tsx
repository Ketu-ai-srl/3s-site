import type { Metadata } from "next";
import Link from "next/link";
import AntetPagina from "@/components/AntetPagina";
import BlocDovada from "@/components/BlocDovada";
import Buton from "@/components/Buton";
import ListaBifa from "@/components/ListaBifa";
import MecanismRandFisa from "@/components/MecanismRandFisa";
import SectiuneRegistru from "@/components/SectiuneRegistru";
import TermeneCuprins from "@/components/TermeneCuprins";
import TermeneFisa from "@/components/TermeneFisa";
import { PAGINA_TERMENE as P, TERMENE_ROMANIA } from "@/content/termene-extins";

// Verificatorul de termene, ca document de sine statator.
//
// CE FACE IN PLUS FATA DE WIDGETUL DE PE PAGINA DE START, fiindca altfel n-ar avea rost
// sa existe: acolo se vede un singur rand deodata, ales cu clicul, si numai de un om cu
// JavaScript pornit. Aici toate cele opt randuri sunt in HTML de la prima cerere, fiecare
// cu ancora proprie, deci pagina se poate tipari, trimite prin mesaj cu trimitere la un
// rand anume, si citi de un crawler care nu executa JavaScript.
//
// CE NU FACE, si e o decizie, nu o scapare: nu adauga niciun termen nou. Cifrele raman
// cele din `src/content/termene.ts`, unde le-a scris felia care le-a cules, cu actul pe
// fiecare rand. Un instrument corect pe o jurisdictie bate unul plauzibil pe optsprezece,
// iar randul care nu are articol ramane gol, cu motivul scris pe el.
//
// Canonical auto-referential: fara el pagina ar mosteni canonical-ul layout-ului si ar
// arata spre pagina de start, ceea ce o scoate din index.
export const metadata: Metadata = {
  title: P.titluMeta,
  description: P.descriereMeta,
  alternates: { canonical: "/instrumente/termene-de-pastrare" },
};

export default function TermeneDePastrare() {
  return (
    <main id="continut">
      <AntetPagina
        adresa="/instrumente/termene-de-pastrare"
        fir={[{ text: "Pagina de start", href: "/" }, { text: "Termene de păstrare" }]}
        eticheta={P.eticheta}
        titlu={P.h1}
        lead={P.lead}
        actiune={{ href: "/#discutie", text: "Programați o discuție de 30 de minute" }}
        secundar={{ href: "/arhivare-fizica", text: "Vedeți cum se păstrează" }}
      />

      <SectiuneRegistru
        id="acoperire"
        ton="fisier"
        cota="I"
        eticheta="Acoperirea"
        titlu={P.acoperire.titlu}
        lead={P.acoperire.lead}
      >
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <ListaBifa titlu="Ce este acoperit" elemente={P.acoperire.acoperit} />
          <ListaBifa titlu="Ce nu este acoperit" elemente={P.acoperire.neacoperit} />
        </div>

        <BlocDovada fel="declaratie" eticheta="Ce este pagina aceasta" className="mt-8">
          {P.acoperire.nota}
        </BlocDovada>
      </SectiuneRegistru>

      <SectiuneRegistru
        id="pe-scurt"
        ton="hartie"
        cota="II"
        eticheta="Pe scurt"
        titlu={P.cuprins.titlu}
        lead={P.cuprins.lead}
      >
        <TermeneCuprins
          termene={TERMENE_ROMANIA}
          antetDocument={P.cuprins.antetDocument}
          antetTermen={P.cuprins.antetTermen}
          antetTemei={P.cuprins.antetTemei}
          fara={P.cuprins.fara}
          faraTemei={P.cuprins.faraTemei}
        />
      </SectiuneRegistru>

      <SectiuneRegistru
        id="randuri"
        ton="fisier"
        cota="III"
        eticheta="Rândurile"
        titlu={P.fise.titlu}
        lead={P.fise.lead}
      >
        {TERMENE_ROMANIA.map((t) => (
          <TermeneFisa key={t.ancora} termen={t} />
        ))}

        <p className="mt-8 max-w-[66ch] text-corp text-tus-2">
          Aceleași opt rânduri se pot răsfoi și cu un clic, în{" "}
          <Link href="/#termene" className="text-verde underline underline-offset-[3px]">
            verificatorul de pe pagina de start
          </Link>
          . Ce diferă de la un domeniu la altul, inclusiv rândul lăsat gol la{" "}
          <Link
            href="/solutii/avocatura"
            className="text-verde underline underline-offset-[3px]"
          >
            casele de avocatură
          </Link>
          , se citește pe fișele de domeniu.
        </p>
      </SectiuneRegistru>

      <SectiuneRegistru
        id="moldova"
        ton="inchis"
        cota="IV"
        eticheta="A doua jurisdicție"
        titlu={P.moldova.titlu}
      >
        {P.moldova.paragrafe.map((text) => (
          <p key={text.slice(0, 40)} className="mb-4 max-w-[68ch] text-corp text-pe-inchis-2">
            {text}
          </p>
        ))}

        <p className="mt-6 max-w-[62ch] text-[15.5px] text-pe-inchis-2">
          Scrieți-ne la{" "}
          <a
            href="mailto:contact@3s.ro"
            className="text-arama-clar underline underline-offset-[3px]"
          >
            contact@3s.ro
          </a>
          , cu actul și articolul. Adăugăm rândul și scriem de unde vine.
        </p>
      </SectiuneRegistru>

      <SectiuneRegistru
        id="folosire"
        ton="hartie"
        cota="V"
        eticheta="Folosirea"
        titlu={P.folosire.titlu}
        lead={P.folosire.lead}
      >
        {P.folosire.reguli.map((r) => (
          <MecanismRandFisa key={r.titlu} titlu={r.titlu}>
            {r.text}
          </MecanismRandFisa>
        ))}

        <div className="mt-10">
          <ListaBifa titlu="Actele pe care le citim" elemente={P.folosire.temeiuri} />
        </div>

        <BlocDovada fel="limite" eticheta="Limitele instrumentului" className="mt-8">
          {P.folosire.nota}
        </BlocDovada>

        <p className="mt-8 max-w-[66ch] text-corp text-tus-2">
          Cum se face selecționarea, pas cu pas, și ce hârtie rămâne după fiecare etapă sunt
          scrise pe{" "}
          <Link
            href="/arhivare-fizica"
            className="text-verde underline underline-offset-[3px]"
          >
            pagina de arhivare fizică
          </Link>
          , iar mecanismul întreg, de la preluare până la răspunsul cu sursa citată, pe{" "}
          <Link
            href="/cum-functioneaza"
            className="text-verde underline underline-offset-[3px]"
          >
            pagina de mecanism
          </Link>
          .
        </p>
      </SectiuneRegistru>

      <SectiuneRegistru
        id="discutie"
        ton="fisier"
        cota="VI"
        eticheta="Pasul următor"
        titlu={P.incheiere.titlu}
      >
        <p className="mb-8 max-w-[62ch] text-lead text-tus-2">{P.incheiere.text}</p>

        <div className="flex flex-wrap gap-3">
          <Buton href="/#discutie" marime="mare" sageata className="max-sm:w-full">
            Programați o discuție de 30 de minute
          </Buton>
          <Buton href="/solutii" fel="contur" marime="mare" className="max-sm:w-full">
            Vedeți fișele de domeniu
          </Buton>
        </div>

        <p className="mt-6 max-w-[62ch] text-[15.5px] text-tus-3">
          Restul paginilor sunt listate în{" "}
          <Link href="/harta-site" className="text-verde underline underline-offset-[3px]">
            harta site-ului
          </Link>
          .
        </p>
      </SectiuneRegistru>
    </main>
  );
}
