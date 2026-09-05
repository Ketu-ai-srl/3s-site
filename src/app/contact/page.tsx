import type { Metadata } from "next";
import Link from "next/link";
import AntetPagina from "@/components/AntetPagina";
import BlocDovada from "@/components/BlocDovada";
import Buton from "@/components/Buton";
import ContactDrumuri, { type Drum } from "@/components/ContactDrumuri";
import ListaBifa from "@/components/ListaBifa";
import SectiuneRegistru from "@/components/SectiuneRegistru";
import { campLipsa, entitate } from "@/content/entitate";
import { FOTOGRAFII } from "@/content/fotografii";

// PAGINA DE CONTACT: trei drumuri, din care unul singur ajunge la noi azi.
//
// CE S-A SCHIMBAT PE 2026-09-06, ȘI DE CE ERA OBLIGATORIU. Pagina avea un al patrulea rând,
// „Formularul de pe pagina de start”, care explica vizitatorului că formularul acela există,
// dar nu are destinatar. Odată cu reașezarea paginii de start în direcția nouă, formularul a
// fost scos de acolo: componenta `FormularDiscutie` nu mai există în arbore. Rândul a rămas
// deci o explicație pentru un obiect inexistent, cu o legătură către o ancoră fără secțiune.
//
// Nu se putea repara scriind mai bine textul: nu mai există niciun formular pe site, nicăieri,
// deci pagina spune drumurile care CHIAR funcționează, și atât. Afirmația din registru care
// descria formularul (`formular-fara-destinatar`) a fost RETRASĂ în același commit - ce se
// taie din pagină se taie și din registrul ei de afirmații.
//
// Consecința bună a dispariției: nu mai există niciun loc de pe site în care cineva poate
// scrie o cerere care nu pleacă nicăieri. Înainte erau două - formularul și rândul care îl
// explica; acum zero.
//
// DE CE NU PUNEM UN FORMULAR AICI, acum că locul e liber. Ar trebui să trimită undeva, iar
// azi nu are unde: nu există destinatar configurat. Un buton care spune „Trimiteți cererea”
// și nu trimite costă mai mult decât absența lui, fiindcă omul pleacă convins că a lăsat o
// cerere și așteaptă un răspuns care nu are de unde să vină.
//
// DE CE VALORILE NU SUNT SCRISE ÎN PAGINĂ. Adresa și telefonul se citesc din
// `config/entitate.ro.json`, prin `src/content/entitate.ts` - același loc din care le ia
// poarta juridică și blocul de identificare din subsol. Consecința: nu putem inventa aici o
// valoare care nu există în configurare, iar în ziua în care cineva completează telefonul
// după înmatriculare, rândul se umple singur, fără să treacă nimeni prin fișierul acesta.
// `campLipsa` este funcția care recunoaște substituenții, deci `de completat` nu poate
// ajunge pe pagină arătând ca un număr.
export const metadata: Metadata = {
  title: "Contact",
  description:
    "Adresa la care ne scrieți, ce ajută să conțină primul mesaj și care date de contact nu există încă, fiindcă 3S este o firmă în curs de înființare.",
  alternates: { canonical: "/contact" },
};

const ARE_EMAIL = !campLipsa(entitate.email);
const CATRE = "mailto:" + entitate.email;

const DRUMURI: Drum[] = [
  {
    eticheta: "Poștă electronică",
    valoare: ARE_EMAIL ? entitate.email : null,
    href: ARE_EMAIL ? CATRE : undefined,
    nota: ARE_EMAIL
      ? "Drumul care funcționează azi, și singurul. Scrieți de la adresa la care vreți să primiți răspunsul, ca discuția să rămână într-un singur fir."
      : "Adresa se scrie aici din configurarea firmei. Cât timp lipsește de acolo, nu punem alta în loc.",
  },
  {
    eticheta: "Telefon",
    valoare: campLipsa(entitate.telefon) ? null : entitate.telefon,
    nota: "3S nu are încă număr propriu. Numărul ADRIEI nu îl punem în loc: ar suna la altă firmă decât cea cu care discutați, iar cine răspunde nu ar avea de unde să știe despre ce este vorba. Rândul acesta se completează la înmatriculare.",
  },
  {
    eticheta: "Sediu",
    valoare: campLipsa(entitate.sediu) ? null : entitate.sediu,
    nota: "Sediul se declară la înmatriculare și abia atunci se scrie. Depozitul în care ajunge hârtia este cel al ADRIEI, la Golești, județul Argeș, și poate fi vizitat cu programare înainte să semnați ceva.",
  },
];

const PRIMUL_MESAJ = [
  "Instituția sau firma, și cine semnează pentru ea",
  "Cât credeți că aveți: metri liniari, rafturi ocupate sau număr de cutii",
  "Ce document se cere cel mai des și cât durează azi până este găsit",
  "Dacă vă apasă un control, un termen sau o mutare de sediu, și până când",
  "Un interval în care puteți vorbi treizeci de minute",
];

export default function Contact() {
  return (
    <main id="continut">
      <AntetPagina
        adresa="/contact"
        imagine={FOTOGRAFII.legatura}
        fir={[{ text: "Pagina de start", href: "/" }, { text: "Contact" }]}
        eticheta="Contact"
        titlu={
          <>
            Ne scrieți pe e-mail.
            <br />
            Restul drumurilor nu există încă.
          </>
        }
        lead="Scriem mai jos exact ce ajunge la noi și ce nu. 3S se înființează acum, deci telefonul și sediul lipsesc, iar rândurile lor spun de ce."
        actiune={
          ARE_EMAIL
            ? { href: CATRE, text: "Scrieți-ne la " + entitate.email }
            : { href: "#drumuri", text: "Vedeți ce drumuri există" }
        }
        secundar={{ href: "/despre", text: "Cine suntem" }}
      />

      <SectiuneRegistru
        id="drumuri"
        dens
        cota="I"
        eticheta="Drumuri"
        titlu="Trei drumuri, din care unul singur ajunge la noi azi."
        lead="Rândurile de mai jos se citesc din configurarea firmei, nu se scriu de mână în pagină. Unde valoarea lipsește, scrie că lipsește: nici substituent, nici datele firmei-mamă puse în locul lor."
      >
        <ContactDrumuri drumuri={DRUMURI} />

        <BlocDovada className="mt-10">
          <strong className="font-semibold text-cerneala">
            Nu există niciun formular pe site:
          </strong>{" "}
          nici aici, nici pe pagina de start. Un câmp în care se scrie o cerere trebuie să
          aibă un destinatar, iar 3S nu are încă unul configurat. Până atunci, singurul loc în
          care puteți lăsa o cerere este poșta electronică, unde se vede că a plecat. Când
          formularul are destinatar, apare și aici, iar rândurile de mai sus se schimbă odată
          cu el.
        </BlocDovada>
      </SectiuneRegistru>

      <SectiuneRegistru
        id="primul-mesaj"
        ton="inchis"
        cota="II"
        eticheta="Primul mesaj"
        titlu="Cinci rânduri de la dumneavoastră scurtează discuția cu o săptămână."
        lead="Scrieți cât vreți și în ce ordine vreți. Lista de mai jos este ce ne trebuie oricum ca să vă putem răspunde cu ceva concret din primul mesaj, în loc să cerem detalii pe încă două."
      >
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ListaBifa titlu="Ce ajută să scrieți" elemente={PRIMUL_MESAJ} />
          <ListaBifa
            titlu="Ce primiți înapoi"
            elemente={[
              "Un răspuns în aceeași zi lucrătoare, cu două intervale de discuție propuse",
              "O estimare a volumului, în metri liniari și în cutii, după discuție",
              "Ce se digitizează primul și ce poate aștepta un an",
              "Un calendar de preluare, cu datele scrise",
            ]}
          />
        </div>
      </SectiuneRegistru>

      <SectiuneRegistru
        id="datele"
        cota="III"
        eticheta="Datele din mesaj"
        titlu="Ce facem cu ce ne scrieți."
        lead="Un mesaj către un furnizor de arhivare conține adesea mai mult decât un salut: numele instituției, ce se caută des, uneori un termen de control. Deci merită spus dinainte ce se întâmplă cu el."
      >
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ListaBifa
            titlu="Ce se întâmplă cu mesajul"
            elemente={[
              "Se folosește numai ca să răspundem cererii dumneavoastră",
              "Temeiul prelucrării sunt demersuri precontractuale, făcute la cererea dumneavoastră",
              "Nu ajunge la nimeni din afara discuției și nu intră în nicio listă de trimiteri",
              "Rămâne în corespondența noastră, ca să existe o urmă scrisă a cererii și a răspunsului",
            ]}
          />
          <ListaBifa
            titlu="Ce nu vă cerem în primul mesaj"
            elemente={[
              "Documente scanate sau fișiere cu date personale",
              "Numere de dosar, coduri numerice personale sau date medicale",
              "Inventarul complet al arhivei: îl măsurăm împreună, la fața locului",
            ]}
          />
        </div>
      </SectiuneRegistru>

      <SectiuneRegistru
        id="discutie"
        ton="inchis"
        cota="IV"
        eticheta="Pasul următor"
        titlu="Un mesaj de cinci rânduri este de ajuns ca să începem."
      >
        <p className="mb-10 max-w-[62ch] text-[clamp(1.05rem,1.3vw,1.2rem)] leading-[1.5] text-hartie-veche-2">
          Discuția de treizeci de minute se programează din același mesaj. Ne uităm peste umăr
          la arhiva dumneavoastră așa cum arată ea azi, nu la o prezentare a noastră.
        </p>

        <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
          {ARE_EMAIL ? (
            <Buton href={CATRE} marime="mare" sageata className="max-sm:w-full">
              Scrieți-ne la {entitate.email}
            </Buton>
          ) : null}
          <Buton href="/despre" fel="text" marime="mare">
            Cine suntem
          </Buton>
        </div>

        <p className="mt-8 max-w-[62ch] text-[15.5px] leading-[1.5] text-hartie-veche-3">
          Dacă vă interesează întâi ce facem pentru domeniul dumneavoastră, fișele stau la{" "}
          <Link href="/solutii" className="text-arama-clar underline underline-offset-[3px]">
            domenii
          </Link>
          , iar termenele legale, cu actul normativ citat, în{" "}
          <Link
            href="/instrumente/termene-de-pastrare"
            className="text-arama-clar underline underline-offset-[3px]"
          >
            instrumentul de termene
          </Link>
          .
        </p>
      </SectiuneRegistru>
    </main>
  );
}
