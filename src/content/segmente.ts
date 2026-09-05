// Datele segmentelor de clienti. Hub-ul /solutii si fiecare pagina de segment se
// genereaza DE AICI, ca urmatorul segment sa se adauge scriind o intrare, nu
// rescriind o pagina. Concret, ca sa adaugi "primarii":
//   1. scrii constanta PRIMARII de tipul PaginaSegment, dupa modelul NOTARI;
//   2. legi `pagina: PRIMARII` in intrarea din SEGMENTE;
//   3. creezi src/app/solutii/primarii/page.tsx, care doar randeaza constanta.
// Hub-ul se actualizeaza singur: listeaza toate intrarile si pune legatura numai
// la cele care au `pagina` nenul, deci nu poate produce o legatura moarta.
//
// REGULA DE CONTINUT, aceeasi ca pe pagina de start: zero cifre pe care nu le
// putem sustine, zero certificari, zero preturi, zero clienti dati ca referinta.
// Ce e obligatie legala se scrie cu ACTUL NUMIT. Ce nu putem cita pe articol
// ramane GOL si scrie de ce, in campul `deschise` - precedentul e randul gol al
// dosarelor de avocatura din `termene.ts`, care spune pe fata ca nu am gasit
// norma si de ce preferam sa nu inventam una.
//
// Fiecare afirmatie verificabila de mai jos are o intrare in
// `src/content/afirmatii/solutii-notari.json`, cu stare `neconfirmat`.

/** Un fapt scurt: un titlu si un paragraf. Folosit la durere, schimbare, dovezi. */
export type Fapt = {
  titlu: string;
  text: string;
};

/** Un act normativ NUMIT, plus ce anume reglementeaza. Fara numere de articol pe care nu le putem cita. */
export type Temei = {
  act: string;
  ce: string;
};

export type Intrebare = {
  intrebare: string;
  raspuns: string;
};

/** Continutul unei pagini de segment. Tot ce se vede pe pagina vine de aici. */
export type PaginaSegment = {
  /** Titlul din <title>, fara sufixul de site. Sablonul din layout adauga 24 de caractere. */
  titluMeta: string;
  /** meta description: intre 50 si 160 de caractere, unica in lot. Poarta S-01 masoara. */
  descriereMeta: string;
  eticheta: string;
  h1: string;
  lead: string;
  durere: Fapt[];
  schimbare: Fapt[];
  /** Ce poate verifica cineva inainte sa ne creada pe cuvant. */
  aratam: string[];
  /** Ce NU putem sustine inca. Se scrie pe pagina, nu se ascunde in subsol. */
  deschise: string[];
  temeiuri: Temei[];
  /** Nota despre termenul de pastrare pe care NU il scriem, si de ce. */
  notaTermene: string;
  intrebari: Intrebare[];
  /** Titlul si textul sectiunii finale, care duce la aceeasi discutie ca pagina de start. */
  incheiere: {
    titlu: string;
    text: string;
  };
};

export type Segment = {
  slug: string;
  nume: string;
  /** Randul de pe hub: durerea segmentului, intr-o propozitie. */
  rezumat: string;
  /** Nenul cand segmentul are pagina proprie. Hub-ul pune legatura numai atunci. */
  pagina: PaginaSegment | null;
};

export const NOTARI: PaginaSegment = {
  titluMeta: "Arhivă pentru birouri notariale",
  descriereMeta:
    "Ce facem pentru un birou notarial: preluare cu proces-verbal și inventar, digitizare și căutare care citează pagina. Temeiul legal, numit pe față.",
  eticheta: "Domenii · Birouri notariale",
  h1: "Un act din 2009, o cerere de azi, și rafturile dintre ele.",
  lead:
    "Arhiva unui birou notarial nu are un moment în care se golește. Crește în fiecare zi lucrătoare, se păstrează ani lungi și se caută după nume, dată și număr de înregistrare. Pagina asta scrie ce preluăm noi, ce rămâne la biroul dumneavoastră și unde încă nu avem un răspuns pe care să îl putem susține.",

  durere: [
    {
      titlu: "Fondul crește, spațiul nu",
      text: "Actele se adaugă în fiecare zi lucrătoare, iar rafturile ocupă metri de birou, nu de depozit. Un dulap în plus rezolvă șase luni și amână întrebarea, cu chirie de birou plătită pentru hârtie care nu se mai atinge.",
    },
    {
      titlu: "Cheia de căutare e a hârtiei, nu a omului",
      text: "Actele se găsesc după nume, dată și număr de înregistrare. Cererea vine cu un nume scris aproximativ și cu un an aproximativ. Un opis pe hârtie se citește pe o singură cheie odată, iar restul devine răsfoire.",
    },
    {
      titlu: "Predarea nu suportă improvizație",
      text: "Când arhiva se predă, se predă cu proces-verbal și inventar. Dacă inventarul nu este la zi în ziua aceea, predarea se transformă într-o inventariere de avarie, făcută sub termen și în paralel cu activitatea curentă.",
    },
  ],

  schimbare: [
    {
      titlu: "Dimineața, la ghișeu",
      text: "Cererea se pune ca întrebare, în română, de pe telefon sau din pagina de căutare. Răspunsul vine cu documentul și pagina din care a fost scos, deci se verifică pe loc. Fără sursă, răspunsul nu se afișează.",
    },
    {
      titlu: "Raftul, la Golești",
      text: "Fondul stă inventariat, cu cotă, în depozitul din județul Argeș. Ce se cere des se scanează și devine căutabil; originalul rămâne în raft și vine înapoi la biroul dumneavoastră când chiar aveți nevoie de el pe hârtie.",
    },
    {
      titlu: "Inventarul, permanent",
      text: "Opisul se ține la zi tot timpul, nu în săptămâna în care cineva îl cere. O predare cu proces-verbal se face atunci din ce există deja, nu dintr-o numărătoare făcută în grabă.",
    },
  ],

  aratam: [
    "Depozitul din Golești, județul Argeș, cu tot cu condițiile de temperatură, umiditate și acces",
    "Procesul-verbal de preluare și inventarul, în forma exactă în care le semnați",
    "Un răspuns dat pe documente-model, cu documentul și pagina citate, ca să vedeți ce înseamnă „cu sursă”",
    "Contractul în limba română, sub lege română, cu anexa de prelucrare a datelor semnată odată cu el",
  ],

  deschise: [
    "Nu deținem certificare ISO 27001 și nu ne prezentăm ca și cum am avea",
    "Nu avem un birou notarial pe care să îl dăm ca referință, fiindcă 3S este o firmă nouă",
    "Nu publicăm preț: costul se face pe metri liniari și pe ce anume se digitizează",
    "Nu scriem un timp de răspuns în secunde sau minute, fiindcă nu l-am măsurat pe un fond real",
    "Nu scriem termenul de păstrare pe categorii de acte notariale, fiindcă nu îl putem cita pe articol",
  ],

  temeiuri: [
    {
      act: "Legea Arhivelor Naționale nr. 16/1996",
      ce: "Obligațiile creatorilor și deținătorilor de documente: evidența documentelor create și primite, gruparea lor pe termene de păstrare într-un nomenclator arhivistic avizat, condițiile de păstrare și selecționarea numai prin comisie, cu avizul Arhivelor Naționale.",
    },
    {
      act: "Legea notarilor publici și a activității notariale nr. 36/1995, republicată, cu regulamentul ei de aplicare",
      ce: "Regimul arhivei activității notariale: registrele ținute de birou și situația arhivei atunci când activitatea încetează sau se transferă. Termenele concrete se citesc din acest act și din regulamentul lui, nu din practica altcuiva.",
    },
  ],

  notaTermene:
    "Nu scriem aici un termen în ani pentru actele notariale, fiindcă nu îl putem cita pe articol. Este același rând gol pe care îl lăsăm și la dosarele cabinetelor de avocatură, în verificatorul de termene de pe pagina de start: preferăm golul în locul unei cifre pe care nu am putea să o susținem în fața unui control. Termenul care vă obligă este cel din nomenclatorul arhivistic propriu al biroului, avizat de Arhivele Naționale. Dacă lucrați într-un birou notarial și cunoașteți articolul, scrieți-ne și îl publicăm cu trimiterea la act.",

  intrebari: [
    {
      intrebare: "Originalele rămân ale biroului?",
      raspuns:
        "Da. Suntem custode, nu proprietar. Fondul se preia cu proces-verbal și inventar semnate de dumneavoastră, iar originalul pe hârtie vine înapoi la cerere. Termenul în care îl aducem se scrie în contract, nu se lasă la latitudinea noastră.",
    },
    {
      intrebare: "Cine vede actele și ce rămâne scris",
      raspuns:
        "Accesul se dă nominal, pe persoană și pe fond, nu pe birou la grămadă. Fiecare căutare și fiecare deschidere de document se jurnalizează, iar jurnalul vi se pune la dispoziție. Inclusiv accesul personalului nostru.",
    },
    {
      intrebare: "Ce se întâmplă dacă biroul își încetează activitatea",
      raspuns:
        "Predarea arhivei se face în condițiile legii notariale, către cine indică ea. Partea noastră este să vă dăm fondul complet și inventariat, cu proces-verbal, plus copiile digitale în format deschis, PDF cu index CSV, ca preluarea să nu depindă de noi.",
    },
    {
      intrebare: "Actele ajung la un model de limbaj",
      raspuns:
        "Documentele dumneavoastră nu sunt folosite pentru antrenarea niciunui model. Furnizorul de procesare, regiunea în care se face și politica de păstrare a interogărilor vi le arătăm la prima discuție, nu la primul chestionar de securitate.",
    },
  ],

  incheiere: {
    titlu: "De luni, cererea de la ghișeu se pune ca întrebare.",
    text: "O discuție de treizeci de minute, în care ne uităm la arhiva biroului așa cum arată ea azi: câți metri liniari, ce se cere cel mai des și ce urmează să se predea. Plecați cu o estimare a volumului, cu ordinea în care s-ar digitiza și cu un calendar de preluare scris.",
  },
};

export const SEGMENTE: Segment[] = [
  {
    slug: "notari",
    nume: "Birouri notariale",
    rezumat:
      "Fond care crește în fiecare zi lucrătoare și se caută după nume, dată și număr de înregistrare. Predarea arhivei cere inventar la zi, nu o numărătoare făcută în grabă.",
    pagina: NOTARI,
  },
  {
    slug: "primarii",
    nume: "Primării și instituții publice",
    rezumat:
      "Registre de stare civilă, hotărâri de consiliu, documentații de urbanism. Termene lungi, control extern și un cetățean care așteaptă la ghișeu cât durează căutarea.",
    pagina: null,
  },
  {
    slug: "contabilitate",
    nume: "Birouri de contabilitate",
    rezumat:
      "Un control fiscal se uită la un an vechi de cinci ani, iar statele de salarii au propriul termen, mult mai lung. Amestecarea lor este cauza cea mai frecventă a eliminărilor greșite.",
    pagina: null,
  },
  {
    slug: "avocatura",
    nume: "Case de avocatură",
    rezumat:
      "Dosare voluminoase și termene procedurale scurte. Diferența dintre a citi douăzeci de bibliorafturi și a întreba direct este un termen câștigat.",
    pagina: null,
  },
];

/** Titlul si descrierea hub-ului. Stau aici, langa segmente, ca sa nu se rupa de lista. */
export const HUB = {
  titluMeta: "Soluții pe domenii",
  descriereMeta:
    "Arhivare fizică, digitizare și căutare cu sursa citată, pe domenii: birouri notariale, primării, contabilitate, avocatură. Ce diferă la fiecare.",
  eticheta: "Domenii deservite",
  h1: "Fiecare domeniu întreabă altceva de la aceeași arhivă.",
  lead:
    "Pașii sunt aceiași peste tot: ridicăm, inventariem, digitizăm, răspundem. Ce diferă este ce se cere des, cine controlează și cât se păstrează. Paginile de mai jos scriu diferența, domeniu cu domeniu, și spun pe față unde nu avem încă un răspuns.",
};

/** Ce nu depinde de domeniu. Se scrie o singura data si apare pe hub. */
export const INDIFERENT_DE_DOMENIU: Fapt[] = [
  {
    titlu: "Un singur furnizor pentru raft și pentru răspuns",
    text: "Hârtia și căutarea vin de la aceeași firmă, deci nu mai există conversația în care depozitarul dă vina pe furnizorul de software.",
  },
  {
    titlu: "Fiecare răspuns are o sursă",
    text: "Document, pagină, fragment. Puteți deschide originalul și citi fraza pe care se sprijină răspunsul. Fără sursă, răspunsul nu se afișează.",
  },
  {
    titlu: "Contractul se judecă în România",
    text: "Contract în limba română, sub lege română, cu instanțele din România. Anexa de prelucrare a datelor se semnează odată cu el.",
  },
];
