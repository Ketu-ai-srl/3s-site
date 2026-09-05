import type { Metadata } from "next";
import Link from "next/link";
import AntetPagina from "@/components/AntetPagina";
import BlocDovada from "@/components/BlocDovada";
import Buton from "@/components/Buton";
import ListaBifa from "@/components/ListaBifa";
import MecanismRandFisa from "@/components/MecanismRandFisa";
import SectiuneRegistru from "@/components/SectiuneRegistru";
import { ACCESIBILITATE as A } from "@/content/securitate";
import { FOTOGRAFII } from "@/content/fotografii";

// Declaratia de accesibilitate, scrisa ca lista de masuratori si nu ca declaratie de
// conformitate.
//
// Distinctia e tot continutul paginii. „Zero incalcari gasite de o unealta automata" si
// „conform cu un nivel dintr-un standard" sunt doua afirmatii diferite, iar a doua nu
// decurge din prima: unealta acopera o parte din criterii, restul se judeca de un om, si
// niciun om nu a facut inca auditul. Pagina spune amandoua lucrurile, in ordinea asta,
// si nu foloseste litera unui nivel nicaieri.
//
// Continutul sta in `src/content/securitate.ts`; aici e numai forma paginii.
//
// Canonical auto-referential: fara el, pagina ar mosteni canonical-ul layout-ului si ar
// arata spre pagina de start, ceea ce o scoate din index.
export const metadata: Metadata = {
  title: A.titluMeta,
  description: A.descriereMeta,
  alternates: { canonical: "/accesibilitate" },
};

export default function Accesibilitate() {
  return (
    <main id="continut">
      <AntetPagina
        adresa="/accesibilitate"
        imagine={FOTOGRAFII.dosare}
        fir={[{ text: "Pagina de start", href: "/" }, { text: "Accesibilitate" }]}
        eticheta={A.eticheta}
        titlu={A.h1}
        lead={A.lead}
        actiune={{ href: "/contact", text: "Semnalați-ne o problemă" }}
        secundar={{ href: "/securitate", text: "Vedeți pagina de securitate" }}
      />

      <SectiuneRegistru
        id="masurat"
        ton="fisier"
        cota="I"
        eticheta="Ce se măsoară"
        titlu="Ce rulează automat, pe fiecare pagină, înainte de fiecare publicare."
        lead="Nu sunt intenții și nu au fost făcute o singură dată, la lansare. Rulează automat înaintea fiecărei publicări, pe fiecare pagină publică a site-ului, iar dacă una dintre ele se înroșește, versiunea aceea nu ajunge la dumneavoastră."
      >
        {A.masurat.map((f) => (
          <MecanismRandFisa key={f.titlu} titlu={f.titlu}>
            {f.text}
          </MecanismRandFisa>
        ))}
      </SectiuneRegistru>

      <SectiuneRegistru
        id="nemasurat"
        ton="inchis"
        cota="II"
        eticheta="Ce nu am măsurat"
        titlu="Zero încălcări găsite automat nu înseamnă conform."
        lead="Aici se încheie ce putem susține. Rândurile de mai jos sunt lucrurile pe care o declarație de accesibilitate obișnuită le trece sub tăcere, fiindcă niciunul nu arată bine scris pe față."
      >
        <ListaBifa
          inchis
          titlu="Ce nu putem afirma despre site-ul acesta"
          elemente={A.neMasurat}
        />

        <p className="mt-8 max-w-[68ch] text-corp text-pe-inchis-2">
          Distincția are o consecință practică pentru dumneavoastră: dacă instituția
          dumneavoastră are nevoie de o declarație de conformitate ca document de achiziție,
          pagina asta nu ține locul ei și nu vă lăsăm să credeți că ține. Spuneți-ne ce
          formă vă trebuie și vă spunem ce e nevoie ca să existe.
        </p>
      </SectiuneRegistru>

      <SectiuneRegistru
        id="semnalare"
        ton="hartie"
        cota="III"
        eticheta="Semnalarea"
        titlu="Dacă ceva nu funcționează pentru dumneavoastră, spuneți-ne."
        lead="Partea pe care nu o poate măsura nicio unealtă este dacă pagina se poate folosi. Aceea se află numai de la cine o folosește, deci drumul până la noi este scris aici, pe scurt, și nu trece prin niciun formular care nu are destinatar."
      >
        {A.semnalare.map((f) => (
          <MecanismRandFisa key={f.titlu} titlu={f.titlu}>
            {f.text}
          </MecanismRandFisa>
        ))}

        <BlocDovada fel="limite" eticheta="Adresa" className="mt-8">
          Ne scrieți la{" "}
          <a
            href="mailto:contact@3s.ro"
            className="text-verde underline underline-offset-[3px]"
          >
            contact@3s.ro
          </a>
          . Nu afișăm număr de telefon, iar drumurile care există și cele care încă nu există
          sunt scrise pe pagina de contact, ca să nu așteptați răspuns pe un canal pe care nu
          îl citim.
        </BlocDovada>
      </SectiuneRegistru>

      <SectiuneRegistru
        id="incheiere"
        ton="fisier"
        cota="IV"
        eticheta="Pasul următor"
        titlu={A.incheiere.titlu}
      >
        <p className="mb-8 max-w-[62ch] text-lead text-tus-2">{A.incheiere.text}</p>

        <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
          <Buton href="/contact" marime="mare" sageata className="max-sm:w-full">
            Vedeți cum ne scrieți
          </Buton>
          <Buton href="/securitate" fel="text" marime="mare">
            Vedeți pagina de securitate
          </Buton>
        </div>

        <p className="mt-6 max-w-[62ch] text-[15.5px] text-tus-3">
          Același fel de împărțire, între ce am măsurat și ce nu, stă și în{" "}
          <Link
            href="/securitate"
            className="text-verde underline underline-offset-[3px]"
          >
            pagina despre protecția documentelor
          </Link>{" "}
          și în{" "}
          <Link href="/cookies" className="text-verde underline underline-offset-[3px]">
            pagina despre ce stocăm în browser
          </Link>
          .
        </p>
      </SectiuneRegistru>
    </main>
  );
}
