// Continutul paginii de instrument `/instrumente/termene-de-pastrare`.
//
// DE CE EXISTA FISIERUL ASTA, si de ce NU e o a doua lista de termene. Cifrele raman
// intr-un singur loc, `src/content/termene.ts`, care hraneste si widgetul de pe pagina de
// start. Doua liste de termene ar diverge exact in ziua in care se modifica o lege si
// cineva repara o singura lista. Aici se adauga numai ce cere pagina de sine statatoare:
// o ancora stabila pentru fiecare rand, ca sa poata fi trimisa prin mesaj, si proza care
// spune ce acopera instrumentul si ce nu.
//
// UNDE INTRA UN RAND NOU, romanesc sau moldovenesc: in `termene.ts`, si numai cu actul si
// articolul CITITE LA SURSA. Cat timp articolul nu e citit cuvant cu cuvant, randul nu se
// scrie. Precedentul e randul dosarelor de avocatura, lasat gol dinadins, cu motivul pe el.

import { TERMENE, type Termen } from "./termene";

/** Un rand de termen, plus ancora din pagina de instrument. */
export type TermenCuAncora = Termen & { ancora: string };

const FARA_SEMNE: Record<string, string> = {
  ă: "a",
  â: "a",
  î: "i",
  ș: "s",
  ț: "t",
  Ă: "a",
  Â: "a",
  Î: "i",
  Ș: "s",
  Ț: "t",
};

/**
 * Ancora unui rand, derivata din textul scurt. Derivata, nu scrisa de mana: o lista de
 * ancore scrise separat s-ar desincroniza de randuri la prima redenumire, si legaturile
 * din cuprins ar duce in gol fara ca nimic sa se planga. Textele scurte sunt distincte
 * intre ele, fiindca sunt deja folosite drept chei de lista in verificator.
 */
export function ancoraTermen(scurt: string): string {
  const literal = Array.from(scurt)
    .map((c) => FARA_SEMNE[c] ?? c)
    .join("");
  return (
    "termen-" +
    literal
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "")
  );
}

/** Randurile romanesti, in ordinea din verificator, fiecare cu ancora lui. */
export const TERMENE_ROMANIA: TermenCuAncora[] = TERMENE.map((t) => ({
  ...t,
  ancora: ancoraTermen(t.scurt),
}));

// Nu exista o lista `TERMENE_MOLDOVA`. Nu e o omisiune: n-am citit actele moldovenesti la
// sursa, iar o lista goala randata printr-o ramura care nu se executa niciodata ar fi cod
// neverificat pus in pagina. Partea de Moldova e scrisa ca text, in campul `moldova` de mai jos,
// si spune exact ce lipseste. Cand cineva are actul si articolul, randurile intra in
// `termene.ts` langa cele romanesti, cu aceeasi coloana de temei.

export const PAGINA_TERMENE = {
  titluMeta: "Termene de păstrare a documentelor",
  descriereMeta:
    "Cât se păstrează registrele contabile, statele de salarii sau actele de stare civilă, cu actul normativ și articolul pe fiecare rând. România, atât.",
  eticheta: "Instrument",
  h1: "Cât se păstrează, și din ce articol de lege vine termenul",
  lead: "Opt categorii de documente, fiecare cu termenul, cu momentul din care începe să curgă și cu actul normativ din care provine. Acoperim România. Unde nu putem arăta articolul, rândul rămâne gol și scriem de ce.",

  acoperire: {
    titlu: "România, atât. Scriem asta primul, nu la subsol.",
    lead: "Un tabel care acoperă optsprezece jurisdicții arată convingător până în ziua în care cineva îl folosește ca să apere o eliminare. Am ales lista mai scurtă, pe care o putem duce la sursă rând cu rând.",
    acoperit: [
      "Documente create sau deținute de organizații din România, sub lege română.",
      "Opt categorii frecvente: contabilitate, salarizare, personal, stare civilă, acte administrative locale, construcții, contracte comerciale, dosare de avocatură.",
      "Pentru fiecare rând: termenul, momentul din care curge, actul normativ și, unde există, articolul.",
      "Starea rândului, scrisă pe el: confirmat cu articol, orientativ, sau lăsat gol cu motivul alături.",
    ],
    neacoperit: [
      "Republica Moldova. Motivul este mai jos, pe aceeași pagină.",
      "Celelalte jurisdicții europene. Nu le-am citit la sursă, deci nu le scriem.",
      "Nomenclatorul arhivistic al organizației dumneavoastră, care este termenul ce obligă efectiv.",
      "Termenele speciale din legislația sectorială: medical, farmaceutic, bancar, energetic.",
      "Prescripția fiscală și cea civilă, care pot curge din alte momente decât termenul de arhivare.",
    ],
    nota: "Pagina nu este consultanță juridică și nu este aviz. Este lista actelor pe care le citim, scrisă astfel încât să le puteți deschide singur. Unde termenul practic vine din nomenclatorul propriu, nu dintr-o lege generală, rândul o spune pe el.",
  },

  cuprins: {
    titlu: "Toate rândurile, pe scurt.",
    lead: "Alegeți categoria ca să ajungeți la rândul întreg, cu actul, cu momentul din care curge și cu nota lui. Pe ecran îngust, coloana cu actul normativ se ascunde: trei coloane de text la 390 px se rup după fiecare cuvânt, iar actul se citește oricum în rândul întreg.",
    antetDocument: "Categoria de documente",
    antetTermen: "Termen",
    antetTemei: "Actul normativ",
    fara: "Rând gol",
    faraTemei: "Nu îl putem cita",
  },

  fise: {
    titlu: "Fiecare rând, cu actul lui.",
    lead: "Ordinea este cea din verificatorul de pe pagina de start. Rândul fără cifră nu are cifră fiindcă nu am găsit articolul, nu fiindcă am uitat de el.",
  },

  moldova: {
    titlu: "Republica Moldova urmează, și încă nu este aici.",
    paragrafe: [
      "Lucrăm pentru România și pentru Republica Moldova, iar întrebarea despre termenele moldovenești vine des. Pe pagina aceasta nu apare niciun termen moldovenesc.",
      "Motivul nu ne avantajează: nu am citit actele moldovenești la sursă, articol cu articol. Un termen preluat din memorie sau dintr-un articol de blog arată identic cu unul corect, ceea ce îl face mai periculos decât un rând gol. Cine îl folosește ca să apere o eliminare în fața unui control află diferența prea târziu.",
      "Ca să apară aici, ne trebuie trei lucruri: actul moldovenesc, articolul citit la sursă și confirmarea că forma citită este cea în vigoare. Când le avem, rândurile intră în același tabel, cu aceeași coloană de temei ca cele românești, și se vede pe ele de unde vin.",
      "Dacă lucrați cu arhive în Republica Moldova și cunoașteți actul și articolul, scrieți-ne. Adăugăm rândul cu trimiterea la act, iar dacă ne arătați că un rând românesc contrazice actul citat, îl corectăm în pagină.",
    ],
  },

  folosire: {
    titlu: "Cum se folosește lista fără să vă puneți în pericol.",
    lead: "Sunt cele patru lucruri pe care le întreabă un control și pe care o listă de termene, oricât de corectă, nu le rezolvă singură.",
    reguli: [
      {
        titlu: "Termenul care obligă este cel din nomenclatorul propriu",
        text: "Nomenclatorul arhivistic al organizației, avizat de Arhivele Naționale, stabilește termenul pentru fiecare categorie de documente. Când el spune altceva decât o listă tipărită de un furnizor, el câștigă, iar noi ne aliniem la el. Lista de aici este punctul de plecare al discuției cu comisia de selecționare.",
      },
      {
        titlu: "Nimic nu se elimină fără comisie și fără aviz",
        text: "Eliminarea se face prin comisie de selecționare, cu proces-verbal și cu inventarele documentelor propuse spre eliminare. Avizul Arhivelor Naționale vine înainte de distrugere. Documentul pe care îl arătați la un control este procesul-verbal al comisiei, nu o adresă primită de la firma de arhivare.",
      },
      {
        titlu: "Termenul permanent nu curge niciodată",
        text: "Categoriile cu termen permanent fac parte din Fondul Arhivistic Național și nu se propun spre eliminare, indiferent câte rafturi ar elibera. Un document cu termen permanent apărut într-un proces-verbal de eliminare este eroarea cea mai gravă pe care o poate găsi un control.",
      },
      {
        titlu: "Rândurile orientative se confirmă înainte de orice decizie",
        text: "Un rând marcat orientativ are un temei general citabil, dar cifra din el vine din practica nomenclatoarelor avizate, nu dintr-un articol care o scrie ca atare. Diferența contează exact în momentul în care cineva vă cere temeiul, deci se confirmă înainte, nu atunci.",
      },
    ],
    temeiuri: [
      "Legea Arhivelor Naționale nr. 16/1996: evidența documentelor create și primite, gruparea lor pe termene într-un nomenclator avizat, condițiile de păstrare și selecționarea numai prin comisie, cu aviz.",
      "Instrucțiunile privind activitatea de arhivă la creatorii și deținătorii de documente, aprobate prin Ordinul de zi nr. 217/1996 al Arhivelor Naționale: partea practică a aceleiași obligații.",
    ],
    nota: "Instrumentul nu înlocuiește nomenclatorul arhivistic avizat și nu este temei pentru eliminarea vreunui document. Numerele de articol sunt cele culese odată cu termenele, din actele citate pe fiecare rând; nu le-am recitit la sursă în ziua în care s-a scris pagina, iar confirmarea listei de către un arhivist autorizat se face înainte de publicare. Dacă găsiți un rând care contrazice actul citat, scrieți-ne: corectăm în pagină, ca să vadă și următorul cititor corectura.",
  },

  incheiere: {
    titlu: "Ce urmează, dacă lista v-a ridicat o întrebare",
    text: "Discuția de treizeci de minute începe de la fondul dumneavoastră, nu de la ofertă: câți metri liniari, ce categorii, ce se cere des și ce are termen permanent. Din ea iese o listă de categorii cu termene, pe care o duceți la comisia de selecționare, indiferent dacă lucrăm împreună mai departe.",
  },
};
