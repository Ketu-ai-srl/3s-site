// Manifestul rutelor: singurul loc din care se afla ce pagini exista pe site.
//
// CINE IL CITESTE: meniul din `src/components/Navigatie.tsx`, subsolul din
// `src/components/Subsol.tsx` si harta de site din `src/app/sitemap.ts`. Nicio alta
// lista de pagini nu se scrie de mana nicaieri. Daca ar exista a doua, cele doua ar
// diverge exact in ziua in care cineva face lucrul corect si adauga o pagina.
//
// CUM SE ADAUGA O PAGINA (asta e tot ce e de facut):
//   1. se creeaza `src/app/<segment>/page.tsx`, cu `export const metadata` proprie,
//      care contine si `alternates: { canonical: "/<segment>" }`;
//   2. se adauga o intrare in `RUTE`, in pozitia in care trebuie sa apara in meniu.
// Meniul, subsolul si `sitemap.xml` o preiau singure, fara alta modificare.
//
// REGULA DURA: aici intra NUMAI rute care exista deja in `src/app`. Meniul si subsolul
// stau in layout, deci apar pe fiecare pagina: o intrare scrisa inainte de pagina nu
// produce o legatura moarta intr-un loc, ci in toate. Poarta de legaturi din
// `tests/browser/legaturi-imagini.spec.ts` o prinde si opreste lotul, pe drept.

/** Adresa publica a site-ului. Din ea se compun canonical-urile, harta de site si robots. */
export const ADRESA_BAZA = "https://3s.ke2.in";

export type Ruta = {
  /** Calea absoluta, exact cum apare in bara de adrese. Fara bara la final, in afara de "/". */
  cale: string;
  /** Titlul scurt, pentru bara de sus si pentru subsol. Nu titlul din `metadata`. */
  scurt: string;
  /** O propozitie despre ce gaseste omul acolo. Se foloseste ca `title` pe legatura. */
  descriere: string;
  /** Apare ca element separat in bara de sus? */
  inMeniu: boolean;
  /** Intra in `sitemap.xml`? Se pune pe `false` doar pentru pagini care nu se indexeaza. */
  inHarta: boolean;
};

export const RUTE: Ruta[] = [
  {
    cale: "/",
    scurt: "Acasă",
    descriere:
      "Arhivare fizică, digitizare și căutare care citează pagina din care vine răspunsul.",
    // Pagina de start NU se repeta ca element de meniu: sigla din stanga duce deja acolo,
    // pe fiecare pagina. Un al doilea drum catre acelasi loc ocupa un rand in bara de sus
    // fara sa adauge nimic. In subsol apare, fiindca acolo lista e un cuprins, nu o bara.
    inMeniu: false,
    inHarta: true,
  },
  {
    cale: "/solutii",
    scurt: "Domenii",
    descriere:
      "Ce facem pentru fiecare domeniu: notari, primării, contabilitate, avocatură, construcții, logistică.",
    inMeniu: true,
    inHarta: true,
  },
  // ANCORE DE FELIE. Fiecare felie de pagini isi scrie intrarile NUMAI sub marcajul ei si
  // nu atinge celelalte marcaje. Motivul e mecanic, nu organizatoric: `rute.ts` e singurul
  // fisier pe care mai multe felii trebuie sa il modifice deodata, iar imbinarea in trei
  // puncte reuseste doar daca hunk-urile au randuri de context intre ele. Marcajele sunt
  // acele randuri. Fara ele, doua felii care adauga cate o pagina se ciocnesc de fiecare data.
  //
  // Ordinea marcajelor = ordinea din bara de sus. Se muta doar de dispecer.

  // <<felie:mecanism>>
  //
  // De ce cele doua pagini de mai jos NU urca in bara de sus, cu cifre, nu cu impresii.
  // Le-am pus intai cu `inMeniu: true` si am rulat poarta de derapaj: la 390 px,
  // scrollWidth 529 peste innerWidth 390, si nu pe paginile mele, ci pe TOATE CINCI -
  // `/`, `/solutii`, `/solutii/notari` incluse. Bara sta in layout, deci doua randuri in
  // plus in meniu sparg fiecare pagina a site-ului deodata; masurat pe 2026-09-05, lot
  // felie/9. Cu `inMeniu: false` derapajul dispare pe toate cinci.
  //
  // Deci intrarea in pagini se face din corpul paginilor (butonul secundar de pe fisele
  // de domeniu, legaturile incrucisate dintre cele doua) si din subsol, unde lista de
  // rute e un cuprins si are loc sa creasca. Se muta in bara de sus in ziua in care
  // `Navigatie` primeste un meniu pliabil sub 768 px - atunci se remasoara, nu inainte.
  {
    cale: "/cum-functioneaza",
    scurt: "Cum funcționează",
    descriere:
      "Mecanismul cap la cap: preluare, inventar, digitizare, căutare cu sursa citată, retur, ieșire.",
    inMeniu: false,
    inHarta: true,
  },
  {
    cale: "/arhivare-fizica",
    scurt: "Arhivare fizică",
    descriere:
      "Depozitul, condițiile de păstrare, preluarea cu proces-verbal, cotele și selecționarea cu aviz.",
    inMeniu: false,
    inHarta: true,
  },

  // <<felie:segmente>>

  // <<felie:despre-contact>>

  // <<felie:juridic>>

  {
    cale: "/solutii/notari",
    scurt: "Birouri notariale",
    descriere:
      "Preluare cu proces-verbal și inventar, digitizare și căutare care citează pagina.",
    // Pagina de segment nu urca in bara de sus: intrarea in domenii se face prin hub,
    // iar o bara care creste cu fiecare segment nou devine ilizibila la al treilea.
    inMeniu: false,
    inHarta: true,
  },
];

export type SectiuneAcasa = {
  /** Identificatorul sectiunii din pagina de start, fara diez. */
  ancora: string;
  /** Titlul scurt, pentru meniu si pentru subsol. */
  scurt: string;
  /** Apare in bara de sus cand esti pe pagina de start? */
  inMeniu: boolean;
};

// Ancorele de mai jos sunt SECTIUNI ale paginii de start, nu rute.
//
// De ce conteaza distinctia: meniul si subsolul apar acum pe fiecare pagina. O ancora
// `#mecanism` afisata in bara de sus pe alta pagina decat `/` nu duce nicaieri, iar
// scrisa ca `/#mecanism` ar arata in meniul global un rand care nu e o pagina.
//
// Solutia aleasa: `Navigatie` cunoaste calea curenta (`usePathname`) si arata ancorele
// NUMAI cand esti pe `/`. Cealalta varianta - un sub-meniu randat de pagina de start -
// ar fi insemnat doua bare suprapuse, una lipita si una nu, adica doua limbaje vizuale
// pentru acelasi gest. In subsol ancorele apar pe orice pagina, dar scrise `/#ancora`,
// fiindca acolo sunt un cuprins al paginii de start, nu navigatia paginii curente.
export const SECTIUNI_ACASA: SectiuneAcasa[] = [
  { ancora: "dovada", scurt: "Ce puteți verifica", inMeniu: false },
  { ancora: "mecanism", scurt: "Cum funcționează", inMeniu: true },
  { ancora: "termene", scurt: "Termene legale", inMeniu: true },
  { ancora: "domenii", scurt: "Domenii", inMeniu: true },
  { ancora: "raspundere", scurt: "Răspundere", inMeniu: true },
];

/**
 * Unde duce butonul principal, de pe orice pagina. Regula de proiect: butonul principal
 * duce mereu la discutia de treizeci de minute. Se scrie cu calea in fata, nu doar
 * `#discutie`, ca sa functioneze si de pe o pagina care nu are sectiunea aceea.
 */
export const CALE_DISCUTIE = "/#discutie";

/** Rutele care apar ca element separat in bara de sus. */
export function rutePentruMeniu(): Ruta[] {
  return RUTE.filter((r) => r.inMeniu);
}

/** Rutele care intra in `sitemap.xml`. */
export function rutePentruHarta(): Ruta[] {
  return RUTE.filter((r) => r.inHarta);
}

/**
 * Indexarea e permisa DOAR in productie, si implicitul e neindexarea.
 *
 * Scris asa, nu invers, deliberat: o variabila de mediu uitata trebuie sa lase site-ul
 * in afara indexului, nu in el. Un mediu de proba indexat concureaza cu productia pe
 * aceleasi cuvinte si motorul alege singur care adresa castiga.
 *
 * Se citeste la construire, deci un `SITE_ENV` schimbat dupa build nu are efect pana la
 * urmatorul build. Plasa de siguranta la rulare e antetul `X-Robots-Tag: noindex` pus de
 * `src/middleware.ts`. Functia se cheama numai din cod de server (`layout.tsx`,
 * `robots.ts`); in pachetul de browser `process.env.SITE_ENV` nu exista.
 */
export function indexareaEstePermisa(): boolean {
  return process.env.SITE_ENV === "productie";
}
