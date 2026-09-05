import type { Metadata } from "next";
import Link from "next/link";
import AntetPagina from "@/components/AntetPagina";
import BlocDovada from "@/components/BlocDovada";
import Buton from "@/components/Buton";
import ListaBifa from "@/components/ListaBifa";
import MecanismEtapa from "@/components/MecanismEtapa";
import MecanismRandFisa from "@/components/MecanismRandFisa";
import SectiuneRegistru from "@/components/SectiuneRegistru";
import SecuritateIntrebare from "@/components/SecuritateIntrebare";
import { SECURITATE as S } from "@/content/securitate";
import { FOTOGRAFII } from "@/content/fotografii";

// Pagina de securitate. Ordinea sectiunilor e argumentul ei, deci nu se rearanjeaza fara
// motiv: depozit, drum, acces, iesire - adica tot lantul pe hartie - si abia la sfarsit
// partea digitala, imparita in ce am masurat si ce nu putem sustine.
//
// De ce asa. Un furnizor de software isi scrie pagina de securitate numai despre biti.
// Aici documentul e un obiect: se pierde printr-o cutie asezata gresit, o predare fara
// proces-verbal, o eliminare fara aviz. Lantul de hartie e partea pe care o cunoastem si
// pe care o poate vedea oricine vine in vizita; partea digitala ruleaza pe o platforma
// care nu e scrisa de noi si despre care nu avem inca raspunsuri in scris. Daca ordinea
// s-ar inversa, pagina ar incepe cu ce stim cel mai putin.
//
// CELE SASE INTREBARI DESCHISE RAMAN RANDURI DISTINCTE, fiecare cu linia ei deasupra si cu
// starea in margine. Sunt argumentul paginii, nu subsolul ei: stranse intr-o lista cu
// bulina s-ar fi citit ca o rezerva politicoasa la sfarsit, iar cine numara ce nu stim ar
// fi trebuit sa citeasca tot blocul ca sa ajunga la cifra.
//
// Continutul sta in `src/content/securitate.ts`; aici e numai forma paginii.
//
// Canonical auto-referential: fara el, pagina ar mosteni canonical-ul layout-ului si ar
// arata spre pagina de start, ceea ce o scoate din index.
export const metadata: Metadata = {
  title: S.titluMeta,
  description: S.descriereMeta,
  alternates: { canonical: "/securitate" },
};

const LEGATURA = "text-cerneala-accent underline underline-offset-[3px]";

export default function Securitate() {
  return (
    <main id="continut">
      <AntetPagina
        adresa="/securitate"
        imagine={FOTOGRAFII.rafturi}
        fir={[{ text: "Pagina de start", href: "/" }, { text: "Securitate" }]}
        eticheta={S.eticheta}
        titlu={S.h1}
        lead={S.lead}
        actiune={{ href: "/#discutie", text: "Discuție de 30 de minute" }}
        secundar={{ href: "/arhivare-fizica", text: "Vedeți depozitul și inventarul" }}
      />

      <SectiuneRegistru
        id="depozit"
        cota="I"
        eticheta="Depozitul"
        titlu="Unde stă hârtia și cine ajunge la ea."
        lead="Riscul care mută un dosar din locul lui rareori vine dintr-o rețea. Vine dintr-un raft greșit, dintr-o cutie deschisă fără fișă și dintr-o cheie care circulă. Sunt lucruri care se văd la o vizită anunțată din timp."
      >
        {S.depozit.map((f) => (
          <MecanismRandFisa key={f.titlu} titlu={f.titlu}>
            {f.text}
          </MecanismRandFisa>
        ))}

        <BlocDovada fel="limite" eticheta="Ce nu publicăm, dinadins" className="mt-12">
          {S.notaDepozit}
        </BlocDovada>

        <p className="mt-8 max-w-[62ch] text-[17px] leading-[1.6] text-cerneala-2">
          Cum arată depozitul, cum se măsoară un fond în metri liniari și ce înseamnă cota
          unei unități arhivistice sunt scrise pe{" "}
          <Link href="/arhivare-fizica" className={LEGATURA}>
            pagina de arhivare fizică
          </Link>
          .
        </p>
      </SectiuneRegistru>

      <SectiuneRegistru
        id="drum"
        ton="inchis"
        cota="II"
        eticheta="Drumul"
        titlu="Mutarea este momentul în care se pierde arhiva, nu depozitul."
        lead="Un lot împărțit între două curse, o cutie nenumărată, o predare fără hârtie: de aici vin discuțiile de peste un an despre un dosar care lipsește. Fiecare pas se închide cu un document semnat, iar documentul rămâne la dumneavoastră."
      >
        <ol className="m-0 grid list-none gap-0 p-0">
          {S.drum.map((e, i) => (
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
        id="acces"
        cota="III"
        eticheta="Accesul"
        titlu="Cine vede ce document, și pe ce bază."
        lead="Un depozit bine păzit din care oricine poate cere orice dosar nu păzește nimic. Regula de acces se scrie nominal, se schimbă în scris și se aplică la fel personalului nostru."
      >
        {S.acces.map((f) => (
          <MecanismRandFisa key={f.titlu} titlu={f.titlu}>
            {f.text}
          </MecanismRandFisa>
        ))}
      </SectiuneRegistru>

      <SectiuneRegistru
        id="iesire"
        ton="inchis"
        cota="IV"
        eticheta="Ieșirea"
        titlu="Ce se întâmplă când plecați, și când un document nu mai trebuie păstrat."
        lead="Sunt cele două momente în care un fond poate dispărea legal, deci exact cele două care se scriu înainte, nu la nevoie. Unul ține de contract, celălalt de o comisie și de un aviz care nu sunt ale noastre."
      >
        {S.iesire.map((f) => (
          <MecanismRandFisa key={f.titlu} titlu={f.titlu}>
            {f.text}
          </MecanismRandFisa>
        ))}

        <BlocDovada eticheta="Temeiul" className="mt-12">
          {S.notaIesire}
        </BlocDovada>
      </SectiuneRegistru>

      <SectiuneRegistru
        id="digital"
        cota="V"
        eticheta="Partea digitală"
        titlu="Ce am măsurat pe site, și ce nu scriem despre noi."
        lead="Prima listă se măsoară automat înainte de fiecare publicare, iar dacă o verificare se înroșește, versiunea aceea nu ajunge la dumneavoastră. A doua este lista afirmațiilor care lipsesc de pe site fiindcă nu le putem dovedi."
      >
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ListaBifa titlu="Ce se măsoară la fiecare publicare" elemente={S.masurat} />
          <ListaBifa titlu="Ce nu scriem despre noi" elemente={S.nuDetinem} />
        </div>

        <p className="mt-10 max-w-[62ch] text-[17px] leading-[1.6] text-cerneala-2">
          Prima coloană este descrisă pe larg în{" "}
          <Link href="/cookies" className={LEGATURA}>
            pagina despre ce stocăm în browser
          </Link>
          , iar ce vede găzduirea, chiar când browserul rămâne curat, în{" "}
          <Link href="/confidentialitate" className={LEGATURA}>
            politica de confidențialitate
          </Link>
          .
        </p>
      </SectiuneRegistru>

      <SectiuneRegistru
        id="intrebari"
        ton="inchis"
        cota="VI"
        eticheta="Ce nu putem susține încă"
        titlu="Șase întrebări la care încă nu avem răspuns în scris."
        lead="Căutarea în documente rulează pe o platformă care nu este scrisă de noi. Despre infrastructura altcuiva nu afirmăm nimic pe baza a ce s-a spus într-o discuție, deci întrebările stau aici, formulate așa cum le pune un serviciu juridic, cu miza fiecăreia lângă ea."
      >
        {S.intrebariDeschise.map((i) => (
          <SecuritateIntrebare
            key={i.intrebare}
            intrebare={i.intrebare}
            deCeConteaza={i.deCeConteaza}
            stare={i.stare}
          />
        ))}

        <BlocDovada eticheta="De ce sunt scrise ca întrebări" className="mt-12">
          {S.notaDigital}
        </BlocDovada>
      </SectiuneRegistru>

      <SectiuneRegistru
        id="discutie"
        cota="VII"
        eticheta="Pasul următor"
        titlu={S.incheiere.titlu}
        lead={S.incheiere.text}
      >
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <Buton href="/#discutie" marime="mare" sageata className="max-sm:w-full">
            Discuție de 30 de minute
          </Buton>
          <Buton href="/cum-functioneaza" fel="text" marime="mare">
            Vedeți mecanismul cap la cap
          </Buton>
        </div>

        <p className="mt-8 max-w-[62ch] text-[15.5px] leading-[1.55] text-cerneala-3">
          Dacă întrebarea dumneavoastră este despre felul în care se citește site-ul, nu
          despre documente, răspunsul stă în{" "}
          <Link href="/accesibilitate" className={LEGATURA}>
            declarația de accesibilitate
          </Link>
          . Pe ce drum ajunge un mesaj la noi scrie pe{" "}
          <Link href="/contact" className={LEGATURA}>
            pagina de contact
          </Link>
          .
        </p>
      </SectiuneRegistru>
    </main>
  );
}
