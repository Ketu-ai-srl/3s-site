import type { Metadata } from "next";
import Link from "next/link";
import AntetPagina from "@/components/AntetPagina";
import BlocDovada from "@/components/BlocDovada";
import Buton from "@/components/Buton";
import ListaBifa from "@/components/ListaBifa";
import SectiuneRegistru from "@/components/SectiuneRegistru";
import TermeneCuprins from "@/components/TermeneCuprins";
import TermeneFisa from "@/components/TermeneFisa";
import TermeneRegula from "@/components/TermeneRegula";
import { FOTOGRAFII } from "@/content/fotografii";
import { PAGINA_TERMENE as P, TERMENE_ROMANIA } from "@/content/termene-extins";

// Verificatorul de termene, ca document de sine statator.
//
// CE FACE, si de ce e singurul loc in care se face: de la reasezarea paginii de start in
// directia noua, widgetul cu clic nu mai exista acolo, deci pagina asta e SINGURUL loc de pe
// site in care se citesc cele opt randuri. Toate sunt in HTML de la prima cerere, fiecare cu
// ancora proprie, deci pagina se poate tipari, trimite prin mesaj cu trimitere la un rand
// anume, si citi de un crawler care nu executa JavaScript.
//
// De aceea au disparut si cele trei trimiteri catre "verificatorul de pe pagina de start":
// duceau la `/#termene`, o ancora ramasa fara sectiune. Poarta de legaturi nu le-ar fi
// prins - ea verifica ancorele doar in pagina care le poarta, iar acestea aratau spre alta
// pagina - deci erau legaturi moarte pe care nicio masina nu le numara.
//
// CE NU FACE, si e o decizie, nu o scapare: nu adauga niciun termen nou. Cifrele raman cele
// din `src/content/termene.ts`, unde le-a scris felia care le-a cules, cu actul pe fiecare
// rand. Un instrument corect pe o jurisdictie bate unul plauzibil pe optsprezece, iar randul
// care nu are articol ramane gol, cu motivul scris pe el.
//
// Canonical auto-referential: fara el pagina ar mosteni canonical-ul layout-ului si ar arata
// spre pagina de start, ceea ce o scoate din index.
export const metadata: Metadata = {
  title: P.titluMeta,
  description: P.descriereMeta,
  alternates: { canonical: "/instrumente/termene-de-pastrare" },
};

export default function TermeneDePastrare() {
  return (
    <main id="continut">
      {/* ANTETUL E O BANDA, NU UN ECRAN PLIN, si actiunea principala e tabelul, nu o
          intalnire. Pagina asta ESTE unealta. Masurat inainte: antet de vitrina de 800 px al
          carui buton principal cerea o intalnire, urmat de o sectiune de 1126 px despre
          acoperire, iar primul rand din tabel aparea pe la 1800 px - dupa 2,25 ecrane la 1280
          px. Cine vrea sa afle cati ani se pastreaza statele de salarii derula doua ecrane si
          jumatate, iar primul lucru care i se cerea era o intalnire. Discutia n-a disparut:
          sta in blocul de incheiere, unde era deja. */}
      <AntetPagina
        adresa="/instrumente/termene-de-pastrare"
        forma="banda"
        imagine={FOTOGRAFII.sertare}
        fir={[{ text: "Pagina de start", href: "/" }, { text: "Termene de păstrare" }]}
        eticheta={P.eticheta}
        titlu={P.h1}
        lead={P.lead}
        actiune={{ href: "#pe-scurt", text: "Vedeți toate cele opt termene" }}
        secundar={{ href: "/arhivare-fizica", text: "Vedeți cum se păstrează" }}
      />

      <SectiuneRegistru
        id="pe-scurt"
        dens
        cota="I"
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
        cota="II"
        eticheta="Rândurile"
        titlu={P.fise.titlu}
        lead={P.fise.lead}
      >
        {TERMENE_ROMANIA.map((t) => (
          <TermeneFisa key={t.ancora} termen={t} />
        ))}

        <p className="mt-10 max-w-[66ch] text-[16px] leading-[1.55] text-hartie-veche-2">
          Ce diferă de la un domeniu la altul, inclusiv rândul lăsat gol la{" "}
          <Link
            href="/solutii/avocatura"
            className="text-arama-clar underline underline-offset-[3px]"
          >
            casele de avocatură
          </Link>
          , se citește pe fișele de domeniu.
        </p>
      </SectiuneRegistru>

      <SectiuneRegistru
        id="acoperire"
        ton="inchis"
        cota="III"
        eticheta="Acoperirea"
        titlu={P.acoperire.titlu}
        lead={P.acoperire.lead}
      >
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ListaBifa titlu="Ce este acoperit" elemente={P.acoperire.acoperit} />
          <ListaBifa titlu="Ce nu este acoperit" elemente={P.acoperire.neacoperit} />
        </div>

        <BlocDovada fel="declaratie" eticheta="Ce este pagina aceasta" className="mt-10">
          {P.acoperire.nota}
        </BlocDovada>
      </SectiuneRegistru>

      <SectiuneRegistru
        id="moldova"
        cota="IV"
        eticheta="A doua jurisdicție"
        titlu={P.moldova.titlu}
      >
        {P.moldova.paragrafe.map((text) => (
          <p
            key={text.slice(0, 40)}
            className="mb-5 max-w-[68ch] text-[16px] leading-[1.55] text-hartie-veche-2"
          >
            {text}
          </p>
        ))}

        <p className="mt-8 max-w-[62ch] text-[15.5px] leading-[1.5] text-hartie-veche-2">
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
        ton="inchis"
        cota="V"
        eticheta="Folosirea"
        titlu={P.folosire.titlu}
        lead={P.folosire.lead}
      >
        {P.folosire.reguli.map((r) => (
          <TermeneRegula key={r.titlu} titlu={r.titlu}>
            {r.text}
          </TermeneRegula>
        ))}

        <div className="mt-14">
          <ListaBifa titlu="Actele pe care le citim" elemente={P.folosire.temeiuri} />
        </div>

        <BlocDovada fel="limite" eticheta="Limitele instrumentului" className="mt-10">
          {P.folosire.nota}
        </BlocDovada>

        <p className="mt-10 max-w-[66ch] text-[16px] leading-[1.55] text-hartie-veche-2">
          Cum se face selecționarea, pas cu pas, și ce hârtie rămâne după fiecare etapă sunt
          scrise pe{" "}
          <Link
            href="/arhivare-fizica"
            className="text-arama-clar underline underline-offset-[3px]"
          >
            pagina de arhivare fizică
          </Link>
          , iar mecanismul întreg, de la preluare până la răspunsul cu sursa citată, pe{" "}
          <Link
            href="/cum-functioneaza"
            className="text-arama-clar underline underline-offset-[3px]"
          >
            pagina de mecanism
          </Link>
          .
        </p>
      </SectiuneRegistru>

      <SectiuneRegistru
        id="discutie"
        cota="VI"
        eticheta="Pasul următor"
        titlu={P.incheiere.titlu}
      >
        <p className="mb-10 max-w-[62ch] text-[clamp(1.05rem,1.3vw,1.2rem)] leading-[1.5] text-hartie-veche-2">
          {P.incheiere.text}
        </p>

        <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
          <Buton href="/contact" marime="mare" sageata className="max-sm:w-full">
            Programați o discuție de 30 de minute
          </Buton>
          <Buton href="/solutii" fel="text" marime="mare">
            Vedeți fișele de domeniu
          </Buton>
        </div>

        <p className="mt-8 max-w-[62ch] text-[15.5px] leading-[1.5] text-hartie-veche-3">
          Restul paginilor sunt listate în{" "}
          <Link href="/harta-site" className="text-arama-clar underline underline-offset-[3px]">
            harta site-ului
          </Link>
          .
        </p>
      </SectiuneRegistru>
    </main>
  );
}
