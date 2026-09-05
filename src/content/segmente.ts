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
  /**
   * Linia de sub titlu, pe ecranul de deschidere. Sub 40 de cuvinte, regula directiei:
   * un ecran spune un singur lucru. Ce nu incape aici NU se taie, trece in `continuare`.
   */
  lead: string;
  /**
   * Restul deschiderii, mutat SUB ecran, ca linie de deschidere a primei sectiuni.
   *
   * De ce exista campul. Cele sapte lead-uri aveau intre 38 si 73 de cuvinte, adica de
   * pana la doua ori peste pragul directiei, si impingeau butonul spre marginea de jos a
   * ecranului. Taierea ar fi pierdut text scris atribuit - inclusiv propozitia care spune
   * ce SCRIE pagina si unde nu avem raspuns, adica exact semnalul de onestitate. Asa
   * ecranul respira si nu se pierde niciun rand.
   */
  continuare: string;
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
    "Arhiva unui birou notarial nu are un moment în care se golește. Crește în fiecare zi lucrătoare, se păstrează ani lungi și se caută după nume, dată și număr de înregistrare.",
  continuare:
    "Pagina asta scrie ce preluăm noi, ce rămâne la biroul dumneavoastră și unde încă nu avem un răspuns pe care să îl putem susține.",

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
    "Nu scriem aici un termen în ani pentru actele notariale, fiindcă nu îl putem cita pe articol. Este același rând gol pe care îl lăsăm și la dosarele cabinetelor de avocatură, în verificatorul de termene de păstrare: preferăm golul în locul unei cifre pe care nu am putea să o susținem în fața unui control. Termenul care vă obligă este cel din nomenclatorul arhivistic propriu al biroului, avizat de Arhivele Naționale. Dacă lucrați într-un birou notarial și cunoașteți articolul, scrieți-ne și îl publicăm cu trimiterea la act.",

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

// Al doilea lot de segmente: primarii, contabilitate, avocatura. Fiecare constanta
// respecta aceeasi regula ca NOTARI - cifra intra pe pagina NUMAI daca actul si articolul
// se pot cita. Unde se poate, cifrele sunt chiar cele din `termene.ts`, cu acelasi articol,
// ca sa nu existe doua adevaruri despre acelasi termen pe acelasi site.
//
// Diferenta dintre cele trei nu e de vocabular. Durerea unei primarii e fondul MOSTENIT
// peste mandate si categoriile care nu se elimina niciodata; a unui birou de contabilitate
// e ca tine hartia ALTORA, pe termene care difera de zece ori intre ele; a unei case de
// avocatura e ca cine VEDE documentul conteaza cat unde sta el. Daca se pot schimba
// paragrafele intre pagini fara sa se observe, paginile sunt gresite.

export const PRIMARII: PaginaSegment = {
  titluMeta: "Arhivă pentru primării și instituții",
  descriereMeta:
    "Ce facem pentru o primărie: inventar pe nomenclatorul instituției, categorii permanente marcate ca atare și căutare care citează pagina. Actele, numite.",
  eticheta: "Domenii · Primării și instituții publice",
  h1: "Omul așteaptă la ghișeu, iar registrul e cu două etaje mai\u00a0jos.",
  lead:
    "Arhiva unei primării nu e făcută de cine o administrează azi. S-a strâns peste mandate, are categorii care nu se elimină niciodată și un nomenclator care se avizează la Arhivele Naționale.",
  continuare:
    "Pagina asta scrie ce preluăm noi, ce rămâne obligația instituției și unde încă nu avem un răspuns pe care să îl putem susține.",

  durere: [
    {
      titlu: "Fondul e moștenit, nu construit",
      text: "Cutiile din subsol vin de la mandate anterioare, uneori fără cotă și fără opis. Nomenclatorul arhivistic acoperă ce se creează de acum înainte; restanța dinainte rămâne o grămadă pe care nu o revendică nimeni, până în ziua în care se cere un act din ea.",
    },
    {
      titlu: "Cetățeanul așteaptă în picioare",
      text: "Cererea de informații de interes public are termen scris în Legea nr. 544/2001, iar căutarea se face în altă clădire, de către omul care știe unde e raftul. Când omul acela lipsește o săptămână, termenul curge mai departe.",
    },
    {
      titlu: "Eliminarea greșită nu se repară",
      text: "Hotărârile consiliului local și dispozițiile primarului au termen permanent: intră în Fondul Arhivistic Național și nu se propun spre eliminare niciodată. Un asemenea document apărut într-un proces-verbal de eliminare este cea mai gravă constatare pe care o poate lăsa un control.",
    },
  ],

  schimbare: [
    {
      titlu: "Ghișeul întreabă, nu răsfoiește",
      text: "Funcționarul pune întrebarea în română, de la calculatorul de la ghișeu. Răspunsul vine cu documentul și pagina din care a fost scos, deci se verifică înainte de a fi spus cetățeanului. Fără sursă, răspunsul nu se afișează.",
    },
    {
      titlu: "Restanța primește aceeași cheie",
      text: "Fondul vechi se inventariază pe nomenclatorul arhivistic al instituției dumneavoastră, nu pe o schemă a noastră. Ce s-a strâns peste mandate ajunge să se caute la fel ca dosarul înregistrat luna trecută.",
    },
    {
      titlu: "Evidența există înainte de control",
      text: "Opisul, cotele și jurnalul de acces stau la zi tot timpul. Când vine o verificare sau o solicitare de la altă instituție, se scoate ce există deja, nu se face o inventariere de avarie în paralel cu activitatea curentă.",
    },
  ],

  aratam: [
    "Depozitul din Golești, județul Argeș, cu tot cu condițiile de temperatură, umiditate și acces",
    "Inventarul construit pe nomenclatorul arhivistic al instituției dumneavoastră, pe un fond de probă ales de dumneavoastră",
    "Un răspuns dat pe documente-model, cu documentul și pagina citate, ca să vedeți ce înseamnă „cu sursă”",
    "Jurnalul de acces, în forma în care îl puteți pune la dosarul unui control",
  ],

  deschise: [
    "Nu deținem certificare ISO 27001 și nu ne prezentăm ca și cum am avea",
    "Nu avem o primărie pe care să o dăm ca referință: 3S este o firmă nouă, iar arhivarea din 2019 este a firmei-mamă, ADRIA Servicii Arhivare SRL",
    "Nu publicăm preț: costul se face pe metri liniari și pe ce anume se digitizează",
    "Nu scriem în zile termenul din Legea nr. 544/2001: el obligă instituția, nu furnizorul de arhivă, și se citește din act",
    "Nu ne pronunțăm asupra procedurii de achiziție: forma contractului o stabiliți dumneavoastră, cu compartimentul juridic",
    "Nu scriem un timp de răspuns în secunde, fiindcă nu l-am măsurat pe un fond real de primărie",
  ],

  temeiuri: [
    {
      act: "Legea Arhivelor Naționale nr. 16/1996",
      ce: "Evidența documentelor create și primite, gruparea lor pe termene într-un nomenclator arhivistic avizat, condițiile de păstrare și selecționarea numai prin comisie, cu avizul Arhivelor Naționale. Tot de aici vine termenul permanent al hotărârilor de consiliu și al dispozițiilor primarului, ca documente ale Fondului Arhivistic Național.",
    },
    {
      act: "Legea nr. 119/1996 cu privire la actele de stare civilă",
      ce: "Regimul registrelor de stare civilă: se păstrează 100 de ani de la întocmirea registrului, iar după împlinirea termenului se predau Arhivelor Naționale. Exemplarul al doilea are propriul regim de depunere. Pentru o primărie, acesta este fondul cu cea mai lungă viață și cel mai des cerut la ghișeu.",
    },
    {
      act: "HG nr. 273/1994, Regulamentul de recepție a lucrărilor de construcții",
      ce: "Cartea tehnică a construcției se păstrează pe toată durata existenței construcției și îl urmează pe proprietar la fiecare schimbare. Lipsa ei se constată exact atunci când e nevoie de ea: la o expertiză, la o vânzare sau după un eveniment.",
    },
  ],

  notaTermene:
    "Termenele de mai sus le putem cita pe articol și stau, fiecare cu actul lui, în verificatorul de termene de păstrare. Ce nu scriem este numărul de ani pentru fiecare categorie din nomenclatorul dumneavoastră: acela nu vine dintr-o lege generală, ci din nomenclatorul propriu al instituției, avizat de Arhivele Naționale. Dacă nomenclatorul dumneavoastră spune altceva decât o listă tipărită de un furnizor, nomenclatorul câștigă, iar noi ne aliniem la el.",

  intrebari: [
    {
      intrebare: "Fondul rămâne al instituției?",
      raspuns:
        "Da. Suntem custode, nu proprietar, iar documentele rămân proprietate publică. Preluarea se face cu proces-verbal și inventar semnate de dumneavoastră, iar originalul pe hârtie se aduce înapoi la cerere, în termenul scris în contract.",
    },
    {
      intrebare: "Ce se întâmplă cu documentele cu termen permanent",
      raspuns:
        "Nu se propun spre eliminare, indiferent câte rafturi ar elibera. Le inventariem separat și le marcăm ca atare, ca să nu poată intra dintr-o eroare de operare într-un proces-verbal de eliminare. Predarea către Arhivele Naționale rămâne a instituției, în condițiile legii.",
    },
    {
      intrebare: "Ce rămâne în sarcina instituției",
      raspuns:
        "Nomenclatorul arhivistic, comisia de selecționare și relația cu Arhivele Naționale. Legea le pune pe seama creatorului și deținătorului de documente, iar noi nu ne substituim comisiei. Ducem munca fizică, ținem evidența la zi și facem fondul căutabil; semnătura de pe procesul-verbal de selecționare rămâne a dumneavoastră.",
    },
    {
      intrebare: "Datele cetățenilor ajung la un model de limbaj",
      raspuns:
        "Documentele instituției nu sunt folosite pentru antrenarea niciunui model. Furnizorul de procesare, regiunea în care se face și politica de păstrare a interogărilor vi le arătăm la prima discuție, ca să le puteți pune în evaluarea de impact, nu după ce ne trimiteți un chestionar.",
    },
  ],

  incheiere: {
    titlu: "Începem de la ce vă cere cel mai des cetățeanul.",
    text: "O discuție de treizeci de minute, în care ne uităm la arhiva instituției așa cum arată ea azi: câți metri liniari, ce se cere cel mai des la ghișeu și ce categorii au termen permanent. Plecați cu o estimare a volumului și cu ordinea în care s-ar digitiza, începând cu fondul care produce cozi.",
  },
};

export const CONTABILITATE: PaginaSegment = {
  titluMeta: "Arhivă pentru birouri de contabilitate",
  descriereMeta:
    "Ce facem pentru un birou de contabilitate: fond separat pe firmă și pe an, statele de salarii ținute deoparte de la preluare, căutare cu sursa citată.",
  eticheta: "Domenii · Birouri de contabilitate",
  h1: "Cinci ani pentru facturi, cincizeci pentru statele de salarii, același\u00a0dulap.",
  lead:
    "Un birou de contabilitate păstrează hârtia altora, pe termene care diferă de zece ori între ele și care ies din aceeași imprimantă, în aceeași lună.",
  continuare:
    "Pagina asta scrie ce preluăm, cum se separă fondul fiecărei firme și unde încă nu avem un răspuns pe care să îl putem susține.",

  durere: [
    {
      titlu: "Două termene în același biblioraft",
      text: "Registrele și documentele justificative se păstrează cinci ani, statele de salarii cincizeci. Amestecarea lor este cauza cea mai frecventă a eliminărilor greșite, iar greșeala nu se vede în ziua în care se face, ci atunci când un fost angajat cere dovada vechimii.",
    },
    {
      titlu: "Hârtia e a clientului, nu a biroului",
      text: "Fiecare cutie aparține altei firme, cu alt administrator și alt istoric. Când un client își mută contabilitatea, trebuie predat fondul lui, complet și numai al lui, de obicei într-o săptămână în care oricum se depun declarații.",
    },
    {
      titlu: "Controlul cere un an, nu un raft",
      text: "Inspecția vine cu un an anume și cu o listă de documente. Căutarea se face de aceiași oameni care duc termenele lunii, iar ce nu se găsește la timp nu devine mai ușor de găsit a doua zi.",
    },
  ],

  schimbare: [
    {
      titlu: "Termenele se separă la preluare, nu la eliminare",
      text: "Statele de salarii intră în alt fond, cu altă cotă, din ziua în care se preiau. Când vine momentul selecționării, separarea există deja și nu se face sub presiune, cu un ochi pe teancul greșit.",
    },
    {
      titlu: "Un an, o firmă, un răspuns",
      text: "Întrebarea se pune în română, iar răspunsul vine cu documentul și pagina din care a fost scos. Se filtrează pe firma-client și pe exercițiu financiar, deci un control care cere un singur an nu vă obligă să deschideți restul.",
    },
    {
      titlu: "Fondul unui client pleacă întreg",
      text: "Inventarul pe firmă stă la zi permanent, nu în săptămâna în care cineva îl cere. Când un client se mută, predarea se face din ce există, cu proces-verbal, plus copiile digitale în format deschis.",
    },
  ],

  aratam: [
    "Depozitul din Golești, județul Argeș, și felul în care fondurile a doi clienți diferiți stau separate în același depozit",
    "Inventarul pe firmă și pe exercițiu financiar, în forma exactă în care l-ați preda unui client care pleacă",
    "Un răspuns dat pe documente-model, cu documentul și pagina citate, ca să vedeți ce înseamnă „cu sursă”",
    "Clauza care spune ce se întâmplă cu fondul unui client care pleacă, scrisă în contract înainte de prima cutie",
  ],

  deschise: [
    "Nu deținem certificare ISO 27001 și nu ne prezentăm ca și cum am avea",
    "Nu avem un birou de contabilitate pe care să îl dăm ca referință: 3S este o firmă nouă, iar arhivarea din 2019 este a firmei-mamă, ADRIA Servicii Arhivare SRL",
    "Nu publicăm preț: costul se face pe metri liniari și pe ce anume se digitizează",
    "Nu dăm consultanță fiscală și nu vă spunem noi ce se poate elimina: propunerea rămâne a dumneavoastră și a comisiei de selecționare",
    "Nu prezentăm termenul dosarelor de personal ca literă de lege: cei 75 de ani sunt practica din nomenclatoarele avizate, nu un articol general",
    "Nu scriem un timp de răspuns în secunde, fiindcă nu l-am măsurat pe un fond real de birou de contabilitate",
  ],

  temeiuri: [
    {
      act: "Legea contabilității nr. 82/1991, art. 25 alin. (1)",
      ce: "Registrele de contabilitate și documentele justificative se păstrează cinci ani de la data încheierii exercițiului financiar în cursul căruia au fost întocmite. Termenul a fost redus de la zece ani prin Legea nr. 36/2023. Facturile, inclusiv cele emise prin RO e-Factura, intră în aceeași categorie.",
    },
    {
      act: "Legea contabilității nr. 82/1991, art. 25 alin. (2)",
      ce: "Statele de salarii se păstrează cincizeci de ani de la data întocmirii, ca excepție expresă de la termenul documentelor financiare. Termenul lung are un motiv practic: statul de salarii este actul din care se dovedește vechimea, cerut uneori la treizeci de ani după plecarea angajatului.",
    },
    {
      act: "Legea Arhivelor Naționale nr. 16/1996",
      ce: "Evidența documentelor, gruparea pe termene într-un nomenclator arhivistic avizat și selecționarea numai prin comisie. De aici vine și termenul dosarelor de personal, care nu e scris ca atare într-un articol general: cei 75 de ani sunt practica preluată în nomenclatoarele avizate.",
    },
  ],

  notaTermene:
    "Cifrele de mai sus le putem cita pe articol. Ce nu scriem este un termen unic pentru „arhiva biroului”, fiindcă nu există unul: fiecare categorie are actul ei. Atenție și la o suprapunere care induce în eroare: prescripția dreptului organului fiscal de a stabili creanțe este tot de cinci ani, dar poate curge de la altă dată decât termenul de arhivare, deci cele două nu se ating la aceeași zi. Iar termenul dosarelor de personal rămâne cel din nomenclatorul dumneavoastră avizat, nu cel dintr-o listă a noastră.",

  intrebari: [
    {
      intrebare: "Ale cui rămân documentele",
      raspuns:
        "Ale firmelor care le-au creat. Biroul dumneavoastră rămâne cel care răspunde față de ele, iar noi suntem custode, cu proces-verbal și inventar. Originalul pe hârtie se aduce înapoi la cerere, în termenul scris în contract.",
    },
    {
      intrebare: "Ce se întâmplă când un client își mută contabilitatea",
      raspuns:
        "Se predă fondul lui, întreg și numai al lui. Inventarul pe firmă e ținut la zi tot timpul, deci predarea se face din ce există, cu proces-verbal, plus copiile digitale în format deschis, PDF cu index CSV, ca preluarea să nu depindă de noi.",
    },
    {
      intrebare: "Cum se face selecționarea, concret",
      raspuns:
        "Comisia de selecționare rămâne a biroului dumneavoastră. Noi pregătim listele pe categorii și pe termene, cu statele de salarii deja separate, și scoatem din propunere ce are termen mai lung decât se credea. Semnătura de pe procesul-verbal nu e a noastră.",
    },
    {
      intrebare: "Cine vede documentele și ce rămâne scris",
      raspuns:
        "Accesul se dă nominal, pe persoană și pe fondul unei singure firme, nu pe tot depozitul. Fiecare căutare și fiecare deschidere de document se jurnalizează, iar jurnalul vi se pune la dispoziție, inclusiv pentru accesul personalului nostru.",
    },
  ],

  incheiere: {
    titlu: "Pornim de la ce v-a cerut ultimul control.",
    text: "O discuție de treizeci de minute, în care ne uităm la arhiva biroului așa cum arată ea azi: câte firme, câți metri liniari, ce s-a cerut la ultima inspecție și cum stau azi statele de salarii față de restul. Plecați cu o estimare a volumului și cu ordinea în care s-ar prelua, firmă cu firmă.",
  },
};

export const AVOCATURA: PaginaSegment = {
  titluMeta: "Arhivă pentru case de avocatură",
  descriereMeta:
    "Ce facem pentru o casă de avocatură: dosare inventariate, acces nominal pe dosar cu jurnal, căutare cu sursa citată. Rândul de termen rămâne gol, dinadins.",
  eticheta: "Domenii · Case de avocatură",
  h1: "Termenul e miercuri, iar înscrisul e în al șaptelea biblioraft.",
  lead:
    "Un dosar de instanță se măsoară în bibliorafturi, iar termenele care contează se măsoară în zile.",
  continuare:
    "Pagina asta scrie ce preluăm, cum se dă accesul pe dosar și de ce lăsăm gol, dinadins, rândul cu termenul de păstrare.",

  durere: [
    {
      titlu: "Volumul e dat de dosar, nu de cabinet",
      text: "Un singur litigiu produce zeci de centimetri de hârtie: cereri, întâmpinări, expertize, înscrisuri depuse în copie. Dosarele închise nu se micșorează și nu se aruncă, dar ocupă rafturi în biroul din centru, la chirie de birou.",
    },
    {
      titlu: "Termenul procedural nu așteaptă căutarea",
      text: "Când se cere un înscris dintr-un dosar de acum șase ani, căutarea intră pe drumul critic al termenului. Diferența dintre a răsfoi douăzeci de bibliorafturi și a întreba direct este, în cazurile proaste, chiar termenul.",
    },
    {
      titlu: "Cine vede documentul contează cât unde stă",
      text: "Secretul profesional nu se oprește la ușa depozitului. Un furnizor care păstrează cutiile în siguranță, dar dă acces „echipei” la grămadă, a mutat problema în altă clădire în loc să o rezolve.",
    },
  ],

  schimbare: [
    {
      titlu: "Întrebarea în locul răsfoirii",
      text: "Puneți întrebarea în română, de pe telefon sau din pagina de căutare, iar răspunsul vine cu dosarul, documentul și pagina din care a fost scos. Fără sursă, răspunsul nu se afișează: un citat aproximativ dintr-un înscris nu vă folosește la nimic.",
    },
    {
      titlu: "Accesul se dă pe dosar, nu pe cabinet",
      text: "Fiecare persoană primește acces nominal, pe dosarele la care lucrează. Colaboratorul intrat pentru un singur litigiu vede un singur fond, iar accesul se retrage la încetarea colaborării, nu când își aduce cineva aminte.",
    },
    {
      titlu: "Originalul stă închis, copia circulă",
      text: "Ce se cere des se digitizează și devine căutabil; originalul rămâne în raft, la Golești, și vine înapoi la cabinet când chiar aveți nevoie de el pe hârtie, în termenul scris în contract.",
    },
  ],

  aratam: [
    "Depozitul din Golești, județul Argeș, și cine are acces fizic la raft, cu nume",
    "Jurnalul de acces pe dosar: cine a căutat, ce a deschis și când, inclusiv personalul nostru",
    "Un răspuns dat pe documente-model, cu dosarul și pagina citate, ca să vedeți ce înseamnă „cu sursă”",
    "Angajamentul de confidențialitate și anexa de prelucrare a datelor, semnate înainte de prima cutie ridicată",
  ],

  deschise: [
    "Nu deținem certificare ISO 27001 și nu ne prezentăm ca și cum am avea",
    "Nu avem o casă de avocatură pe care să o dăm ca referință: 3S este o firmă nouă, iar arhivarea din 2019 este a firmei-mamă, ADRIA Servicii Arhivare SRL",
    "Nu publicăm preț: costul se face pe metri liniari și pe ce anume se digitizează",
    "Nu scriem un termen de păstrare pentru dosarele unui cabinet, fiindcă nu am găsit o normă generală pe care să o putem cita cu articol",
    "Nu interpretăm ce impune statutul profesiei: acela se citește la barou, nu la furnizorul de arhivă",
    "Nu scriem un timp de aducere a originalului ca promisiune generală de pagină: se negociază pe categorii și se scrie în contract",
  ],

  temeiuri: [
    {
      act: "Legea Arhivelor Naționale nr. 16/1996",
      ce: "Obligațiile deținătorului de documente: evidența, gruparea pe termene într-un nomenclator arhivistic, condițiile de păstrare și selecționarea prin comisie. Se aplică și unui cabinet mic, cu un singur depozit, nu doar instituțiilor mari.",
    },
    {
      act: "Legea nr. 51/1995 pentru organizarea și exercitarea profesiei de avocat, cu statutul profesiei",
      ce: "De aici vin secretul profesional și regimul dosarelor cabinetului. Termenul concret de păstrare nu se citește dintr-un articol general, ci din statut, din contractul de asistență juridică și din nomenclatorul propriu al cabinetului. Sunt acte pe care le citiți dumneavoastră, la barou; noi nu construim termene din ele.",
    },
  ],

  notaTermene:
    "Rândul cu termenul de păstrare a dosarelor de cabinet este gol în verificatorul de termene de păstrare, și rămâne gol. Nu am găsit o normă generală unică, aplicabilă tuturor dosarelor, pe care să o putem cita cu articol; termenul se construiește din statutul profesiei, din contractul de asistență juridică și din nomenclatorul propriu al cabinetului. Preferăm golul în locul unei cifre pe care nu am putea să o susținem în fața unui control. Îl completăm cu trimiterea la act în ziua în care îl avem, iar dacă lucrați într-un cabinet și cunoașteți temeiul, scrieți-ne și îl publicăm cu trimiterea lui.",

  intrebari: [
    {
      intrebare: "Dosarele rămân ale cabinetului?",
      raspuns:
        "Da. Suntem custode, nu proprietar. Fondul se preia cu proces-verbal și inventar semnate de dumneavoastră, iar originalul pe hârtie vine înapoi la cerere, în termenul scris în contract, nu la latitudinea noastră.",
    },
    {
      intrebare: "Cum se împacă asta cu secretul profesional",
      raspuns:
        "Accesul se dă nominal și pe dosar, nu pe cabinet. Personalul nostru care manipulează cutiile semnează angajament de confidențialitate, iar fiecare deschidere de document rămâne în jurnal, cu nume și oră. Dacă cineva din 3S a văzut un înscris, se vede că l-a văzut.",
    },
    {
      intrebare: "Cât de repede vine un dosar înapoi pe hârtie",
      raspuns:
        "Termenul se stabilește pe categorii și se scrie în contract, înainte de prima ridicare. Nu îl publicăm aici ca promisiune generală, fiindcă depinde de distanța până la depozit și de ora la care intră cererea, iar un număr pus pe pagină nu vă ajută în fața unui termen de judecată.",
    },
    {
      intrebare: "Ce se întâmplă dacă încetează colaborarea",
      raspuns:
        "Vă dăm fondul complet și inventariat, cu proces-verbal, plus copiile digitale în format deschis, PDF cu index CSV. Nu există format proprietar și nu rămâne la noi o cheie fără de care dosarele nu se citesc.",
    },
  ],

  incheiere: {
    titlu: "Alegeți un dosar închis și vă arătăm căutarea pe el.",
    text: "O discuție de treizeci de minute, în care ne uităm la arhiva cabinetului așa cum arată ea azi: câți metri liniari, ce se cere cel mai des dintr-un dosar închis și cine are voie să vadă ce. Plecați cu o estimare a volumului și cu regulile de acces scrise pe hârtie, nominal, înainte de prima cutie.",
  },
};

// Al treilea lot: constructii, logistica, imobiliare. Aceeasi regula ca la loturile
// dinainte - cifra intra pe pagina NUMAI daca actul si articolul se pot cita, iar unde
// se poate cifrele sunt chiar cele din `termene.ts`, cu acelasi articol.
//
// Ce deosebeste cele trei, ca sa nu iasa acelasi text cu alte substantive. La o firma de
// CONSTRUCTII documentul se naste pe santier si trebuie si PREDAT proprietarului, si
// pastrat de executant, fiindca raspunderea nu se inchide la receptie. La un TRANSPORTATOR
// hartia circula cu marfa si se intoarce tarziu, in exemplare multiple din care unul singur
// poarta mentiunea scrisa la descarcare; volumul e mare si marunt, iar cererea vine cu o
// data si un client, nu cu numarul de inregistrare. La o agentie IMOBILIARA dosarul
// supravietuieste relatiei si poarta datele unor oameni care nu mai sunt clienti, deci
// intrebarea grea devine cine are voie sa il deschida si pana cand.

export const CONSTRUCTII: PaginaSegment = {
  titluMeta: "Arhivă pentru firme de construcții",
  descriereMeta:
    "Ce facem pentru un constructor: dosarul de șantier inventariat pe obiectiv, cartea tehnică predată și un exemplar digital care rămâne firmei.",
  eticheta: "Domenii · Firme de construcții și dezvoltatori",
  h1: "Fisura a apărut luna trecută. Betonul s-a turnat acum șapte\u00a0ani.",
  lead:
    "Arhiva unei firme de construcții nu crește lună de lună, ci în valuri: un șantier produce metri de dosare cât ține execuția, apoi tace.",
  continuare:
    "Ce rămâne după el se predă proprietarului și, în același timp, vă rămâne dumneavoastră, fiindcă răspunderea nu se închide odată cu recepția. Pagina asta scrie ce preluăm, ce rămâne obligația firmei și unde încă nu avem un răspuns pe care să îl putem susține.",

  durere: [
    {
      titlu: "Arhiva se naște în container, nu în birou",
      text: "Procesele-verbale de lucrări ascunse, cele de fază determinantă, buletinele de încercări și certificatele materialelor se semnează pe șantier, pe o masă pliantă, în exemplare care pleacă la firme diferite. Când organizarea de șantier se demontează, dosarul intră într-un portbagaj și ajunge unde apucă.",
    },
    {
      titlu: "Cartea tehnică se predă, răspunderea rămâne",
      text: "Cartea tehnică pleacă la proprietar, cum cere regulamentul de recepție. Firma care a executat rămâne însă cea căreia i se cer explicații peste ani, deci are nevoie de propriul exemplar, complet și găsibil, nu de amintirea că l-a predat cuiva.",
    },
    {
      titlu: "Dovada e o semnătură de sub tencuială",
      text: "La o infiltrație sau la o fisură, întrebarea nu ajunge la cine a construit, ci la ce s-a executat acolo, în ce zi și cine a semnat înainte să se acopere. Răspunsul stă într-un proces-verbal semnat de mai multe părți, iar una dintre ele este adesea un subantreprenor care între timp nu mai există.",
    },
  ],

  schimbare: [
    {
      titlu: "Un fond pe obiectiv, nu pe an",
      text: "Fiecare șantier primește fondul lui, cu cotă proprie, de la autorizația de construire până la procesul-verbal de recepție finală. Se caută într-un obiectiv, nu în arhiva firmei la grămadă, iar dosarele a două proiecte nu se amestecă fiindcă s-au executat în aceeași lună.",
    },
    {
      titlu: "Predarea și copia, în aceeași operațiune",
      text: "Cartea tehnică se predă proprietarului, iar firma rămâne cu exemplarul digital complet și indexat. Cine o întocmește și cine o semnează rămân cei pe care îi obligă regulamentul de recepție: noi ducem inventarul, scanarea și predarea, nu răspunderea tehnică.",
    },
    {
      titlu: "Întrebarea, în locul teancului",
      text: "Se întreabă în română: ce proces-verbal acoperă hidroizolația de la corpul B și în ce zi s-a semnat. Răspunsul vine cu documentul și pagina din care a fost scos, deci ajunge la avocat sau la expert ca citat, nu ca relatare. Când sursa lipsește, nu se afișează nimic.",
    },
  ],

  aratam: [
    "Depozitul din Golești, județul Argeș, și felul în care dosarul unui obiectiv stă întreg, într-un singur loc",
    "Inventarul unui șantier încheiat, de la autorizația de construire la procesul-verbal de recepție, pe un proiect ales de dumneavoastră",
    "Un răspuns dat pe documente-model, cu documentul și pagina citate, ca să vedeți ce înseamnă „cu sursă”",
    "Predarea cărții tehnice către proprietar, cu proces-verbal, plus exemplarul digital care vă rămâne dumneavoastră",
  ],

  deschise: [
    "Nu deținem certificare ISO 27001 și nu ne prezentăm ca și cum am avea",
    "Nu avem o firmă de construcții pe care să o dăm ca referință: 3S este o firmă nouă, iar arhivarea din 2019 este a firmei-mamă, ADRIA Servicii Arhivare SRL",
    "Nu publicăm preț: costul se face pe metri liniari și pe ce anume se digitizează",
    "Nu întocmim cartea tehnică și nu ne substituim dirigintelui de șantier sau responsabilului tehnic cu execuția: ducem hârtia, evidența și predarea, nu răspunderea tehnică",
    "Nu scriem în ani durata răspunderii pentru vicii și nici perioada de garanție: sunt termene care se citesc din contract și din actul normativ, nu de pe pagina unui furnizor de arhivă",
    "Nu dăm preț pe planșe fără să le vedem: peste formatul A3 se schimbă și scanerul, și felul în care stau pe raft, iar o estimare făcută înainte de măsurare nu ar ține",
    "Nu scriem un timp de răspuns în secunde, fiindcă nu l-am măsurat pe un fond real de șantier",
  ],

  temeiuri: [
    {
      act: "HG nr. 273/1994, Regulamentul de recepție a lucrărilor de construcții",
      ce: "Cartea tehnică a construcției se păstrează pe toată durata existenței construcției și îl urmează pe proprietar la fiecare schimbare de proprietar. Tot de aici vin recepția la terminarea lucrărilor și recepția finală, adică exact procesele-verbale care se cer la un control sau într-un litigiu, la ani distanță.",
    },
    {
      act: "Legea nr. 10/1995 privind calitatea în construcții",
      ce: "Actul care așază sistemul calității în construcții și obligațiile participanților la actul de construire. Întinderea răspunderii și termenele concrete se citesc din el și din regulamentele lui de aplicare. Îl numim ca să îl puteți deschide dumneavoastră, nu ca să construim cifre din el.",
    },
    {
      act: "Legea Arhivelor Naționale nr. 16/1996",
      ce: "Evidența documentelor create și primite, gruparea lor pe termene într-un nomenclator arhivistic avizat, condițiile de păstrare și selecționarea numai prin comisie. Obligă firma care creează documentele, deci și o societate de construcții care nu s-a gândit niciodată la sine ca la un creator de fond arhivistic.",
    },
  ],

  notaTermene:
    "O singură durată din dosarul unui șantier o putem cita pe articol: cartea tehnică a construcției se păstrează pe toată durata existenței construcției, potrivit HG nr. 273/1994, iar rândul stă cu actul lui în verificatorul de termene de păstrare. Pentru celelalte piese - jurnalul de șantier, buletinele de încercări, dosarele subantreprenorilor - nu punem un număr de ani pe pagină. Termenul lor se compune din contract, din durata răspunderii pentru vicii și din nomenclatorul arhivistic propriu al firmei, iar noi nu adunăm cifrele acelea în locul dumneavoastră. Dacă lucrați într-o firmă de construcții și aveți articolul, scrieți-ne și îl publicăm cu trimiterea la act.",

  intrebari: [
    {
      intrebare: "Cartea tehnică o întocmiți dumneavoastră?",
      raspuns:
        "Nu. Întocmirea și semnarea rămân la cei pe care îi obligă regulamentul de recepție. Noi adunăm, inventariem, scanăm și predăm ce ne dați, cu proces-verbal, și vă lăsăm un exemplar digital complet. Dacă din dosar lipsește o piesă, o scriem în inventar ca lipsă; nu o completăm noi.",
    },
    {
      intrebare: "Ce se întâmplă cu dosarul unui subantreprenor care a dispărut",
      raspuns:
        "Rămâne ce ați primit de la el, atât. Îl inventariem ca atare, cu lipsurile scrise pe față, fiindcă un inventar care trece peste o lipsă vă lasă să o descoperiți exact în ziua în care aveți nevoie de document. Nu reconstituim documente și nu semnăm în locul nimănui.",
    },
    {
      intrebare: "Planurile și planșele mari intră în același fond",
      raspuns:
        "Le preluăm, dar le vedem întâi. Peste formatul A3 se schimbă și scanerul, și modul în care stau pe raft, deci le măsurăm înainte de orice estimare. Ce nu putem scana la o calitate la care se citește o cotă rămâne pe hârtie, inventariat, iar asta o spunem înainte, nu după.",
    },
    {
      intrebare: "Ce se întâmplă cu documentele în timpul procesării",
      raspuns:
        "Niciun document al dumneavoastră nu ajunge în antrenarea vreunui model. Furnizorul care face procesarea, regiunea în care rulează și cât timp se păstrează interogările se scriu în contract, cu anexa de prelucrare a datelor semnată odată cu el, nu se descriu verbal la prima discuție.",
    },
  ],

  incheiere: {
    titlu: "Începem cu obiectivul care v-a adus ultima întrebare.",
    text: "O discuție de treizeci de minute, în care ne uităm la arhiva firmei așa cum arată ea azi: câte șantiere închise, unde au ajuns dosarele lor și ce s-a predat deja proprietarilor. Plecați cu o estimare a volumului, cu ordinea în care s-ar prelua, obiectiv cu obiectiv, și cu lista pieselor lipsă din primul dosar pe care îl deschidem împreună.",
  },
};

export const LOGISTICA: PaginaSegment = {
  titluMeta: "Arhivă pentru transport și logistică",
  descriereMeta:
    "Ce facem pentru un transportator: scrisori de trăsură și avize regăsite după cursă, client și lună, pe fonduri separate pe exercițiu financiar.",
  eticheta: "Domenii · Transport și logistică",
  h1: "Exemplarul care contează are o mențiune scrisă de mână la descărcare.",
  lead:
    "Hârtia unui transportator se produce pe drum, se semnează la rampă și se întoarce în geanta șoferului, cu întârziere.",
  continuare:
    "Volumul e mare, formatul e mărunt și repetitiv, iar documentul care decide o reclamație de marfă este tocmai cel pe care cineva a scris trei rânduri cu pixul. Pagina asta scrie ce preluăm, cum se regăsește o cursă și unde încă nu avem un răspuns pe care să îl putem susține.",

  durere: [
    {
      titlu: "Documentul circulă înainte să devină arhivă",
      text: "Scrisoarea de trăsură pleacă odată cu marfa, se semnează și se ștampilează la destinație și se întoarce peste zile sau săptămâni, în exemplare care nu ajung toate în același loc. Până când o caută cineva, a trecut prin trei mâini și prin două mașini.",
    },
    {
      titlu: "Volumul e mărunt și uniform",
      text: "Teancuri de foi aproape identice: aceeași casetă tipărită, alt număr, altă dată. Într-o arhivă în care nimic nu se distinge la privit, răsfoirea nu duce nicăieri. Se caută pe un index, sau nu se caută deloc.",
    },
    {
      titlu: "Cererea vine cu o dată, nu cu un dosar",
      text: "Reclamația spune „transportul de pe 14 martie, către depozitul de la Deva”. Controlul spune un an și un cod de client. Nici una nu spune numărul sub care ați înregistrat dumneavoastră documentul, iar teancul e ordonat exact după numărul acela.",
    },
  ],

  schimbare: [
    {
      titlu: "Cursa devine cheia de căutare",
      text: "Se întreabă cum se vorbește în depozit: ce a plecat pe 14 martie către clientul acela și cine a semnat la descărcare. Răspunsul vine cu documentul și pagina din care a fost scos, deci ajunge la asigurator sau la client ca citat, nu ca relatare.",
    },
    {
      titlu: "Un exercițiu financiar, un fond",
      text: "Documentele se grupează pe an financiar și pe client din ziua preluării. Când un control cere un singur an, se scoate un singur fond; restul arhivei rămâne închis, fiindcă nu s-a deschis ca să se ajungă la el.",
    },
    {
      titlu: "Hârtia măruntă pleacă din birou",
      text: "Cutiile cu scrisori de trăsură și avize ocupă spațiu plătit ca birou. La Golești stau inventariate, cu cotă, iar ce se cere des e deja scanat: originalul face drumul înapoi doar când chiar trebuie predat pe hârtie.",
    },
  ],

  aratam: [
    "Depozitul din Golești, județul Argeș, și cum arată un raft de documente de transport, cotate pe an și pe client",
    "Indexul după care se regăsește o cursă - dată, client, localitate de descărcare, număr de document - pe un teanc de probă adus de dumneavoastră",
    "Un răspuns dat pe documente-model, cu documentul și pagina citate, ca să vedeți ce înseamnă „cu sursă”",
    "Cum arată scanat un exemplar mototolit, ștampilat peste text și completat de mână, și ce rămâne necitibil din el",
  ],

  deschise: [
    "Nu deținem certificare ISO 27001 și nu ne prezentăm ca și cum am avea",
    "Nu avem o firmă de transport pe care să o dăm ca referință: 3S este o firmă nouă, iar arhivarea din 2019 este a firmei-mamă, ADRIA Servicii Arhivare SRL",
    "Nu publicăm preț: costul se face pe metri liniari și pe ce anume se digitizează",
    "Nu promitem că citim orice scris de mână: o mențiune făcută cu pixul pe un exemplar la indigo poate rămâne necitibilă, iar atunci o marcăm ca atare în loc să o ghicim",
    "Nu scriem termenul de păstrare pentru datele din tahograf și pentru evidența timpilor de conducere și odihnă: au alt regim decât documentele contabile, iar articolul nu îl putem cita încă",
    "Nu ne pronunțăm dacă un anume document justifică sau nu o înregistrare contabilă: acela e răspunsul contabilului dumneavoastră, nu al arhivarului",
    "Nu scriem un timp de răspuns în secunde, fiindcă nu l-am măsurat pe un fond real de firmă de transport",
  ],

  temeiuri: [
    {
      act: "Legea contabilității nr. 82/1991, art. 25 alin. (1)",
      ce: "Registrele de contabilitate și documentele justificative se păstrează cinci ani de la data încheierii exercițiului financiar în cursul căruia au fost întocmite, termen redus de la zece ani prin Legea nr. 36/2023. Scrisoarea de trăsură, avizul de însoțire a mărfii și celelalte documente de transport intră aici atunci când stau la baza unei înregistrări contabile.",
    },
    {
      act: "Legea contabilității nr. 82/1991, art. 25 alin. (2)",
      ce: "Statele de salarii se păstrează cincizeci de ani de la data întocmirii, ca excepție expresă de la termenul documentelor financiare. Într-o firmă cu mulți șoferi acesta este fondul care supraviețuiește tuturor celorlalte, cerut peste decenii de un fost angajat care își dovedește vechimea.",
    },
    {
      act: "Legea Arhivelor Naționale nr. 16/1996",
      ce: "Evidența documentelor create și primite, gruparea lor pe termene într-un nomenclator arhivistic avizat și selecționarea numai prin comisie. Nomenclatorul este locul în care se decide ce se întâmplă cu documentele de transport după ce termenul contabil s-a împlinit, iar decizia rămâne a firmei, nu a depozitarului.",
    },
  ],

  notaTermene:
    "Cele trei termene de mai sus le putem cita pe articol și stau, fiecare cu actul lui, în verificatorul de termene de păstrare. Rândul rămâne gol pentru documentele din afara contabilității: datele din tahograf, foile de parcurs și evidența timpilor de conducere și odihnă au propriul regim, pe care nu îl putem cita încă cu articol. Mai este o graniță pe care nu o trecem: dacă un anume document justifică sau nu o înregistrare contabilă este răspunsul contabilului dumneavoastră. Noi păstrăm ce ne dați, pe termenul pe care îl scrieți în nomenclatorul propriu, și îl marcăm ca atare din ziua preluării.",

  intrebari: [
    {
      intrebare: "Cum se caută o cursă de acum trei ani",
      raspuns:
        "După ce știți: data, clientul, localitatea de descărcare, numărul mașinii. Nu după numărul de înregistrare al documentului, fiindcă acela e singurul lucru pe care nu îl are nimeni la îndemână când sună un client. Răspunsul vine cu documentul și pagina, ca să îl trimiteți mai departe fără să îl mai căutați o dată.",
    },
    {
      intrebare: "Ce faceți cu exemplarele multiple ale aceluiași document",
      raspuns:
        "Le inventariem ca exemplare ale aceluiași document, nu ca documente diferite, și marcăm care poartă semnătura și mențiunea de la descărcare. Acela decide o reclamație de marfă, iar dacă lipsește din ce ne dați, scriem în inventar că lipsește.",
    },
    {
      intrebare: "Preluați și cutiile care nu au fost niciodată ordonate",
      raspuns:
        "Da, dar nu ne prefacem că sunt ordonate. Se inventariază așa cum vin, se cotează, iar ce nu se poate identifica se marchează ca atare. Un inventar care trece peste o cutie neclară vă lasă să descoperiți lipsa în ziua controlului, adică în ziua cea mai proastă cu putință.",
    },
    {
      intrebare: "Cine vede documentele și ce se întâmplă cu datele din ele",
      raspuns:
        "Documentele de transport poartă nume și semnături de șoferi și de gestionari, deci prelucrarea lor se scrie în anexa semnată odată cu contractul: cine procesează, în ce regiune și cât se păstrează interogările. Nu intră în antrenarea niciunui model, iar accesul se dă nominal și rămâne în jurnal, inclusiv pentru personalul nostru.",
    },
  ],

  incheiere: {
    titlu: "Aduceți teancul de anul trecut și căutăm în el împreună.",
    text: "O discuție de treizeci de minute, pornind de la ce a rămas în urma curselor de anul trecut: câte cutii, ce vă cere lumea cel mai des - reclamație, control, client - și după ce anume căutați când sună cineva. Plecați cu o estimare a volumului și cu indexul propus, adică lista câmpurilor după care veți putea întreba.",
  },
};

export const IMOBILIARE: PaginaSegment = {
  titluMeta: "Arhivă pentru agenții imobiliare",
  descriereMeta:
    "Ce facem pentru o agenție imobiliară sau un administrator de imobile: dosare regăsite după adresă, acces nominal cu jurnal peste datele personale.",
  eticheta: "Domenii · Agenții imobiliare și administrare de imobile",
  h1: "Cine mai are dosarul apartamentului vândut acum cinci\u00a0ani?",
  lead:
    "Un dosar de tranzacție se închide odată cu semnătura la notar, dar nu dispare.",
  continuare:
    "Rămâne cu actele de proprietate, cu documentația cadastrală și cu datele unor oameni care nu vă mai sunt clienți. Se caută după adresă, se cere la ani distanță și trebuie predat sau șters exact cum spune legea. Pagina asta scrie ce preluăm, ce rămâne obligația agenției și unde încă nu avem un răspuns pe care să îl putem susține.",

  durere: [
    {
      titlu: "Se caută după adresă, se clasează după număr",
      text: "Cererea vine în forma în care o ține minte omul: blocul acela de pe strada aceea, apartamentul de la etajul trei, vânzătorul cu numele acela. Dosarul e clasat după numărul de intrare sau după agentul care l-a lucrat, iar cele două se întâlnesc doar dacă cineva le ține minte pe amândouă.",
    },
    {
      titlu: "Păstrați datele unor oameni care nu vă sunt clienți",
      text: "Într-un dosar de tranzacție stau copii de acte de identitate, extrase de carte funciară și documentații cadastrale ale ambelor părți, uneori și ale unor terți - moștenitori, foști proprietari. Obligația de a le ține în siguranță și de a răspunde la o cerere de acces sau de ștergere este a agenției, indiferent cine a adus hârtia.",
    },
    {
      titlu: "Predarea se face pe bază de bunăvoință",
      text: "Când pleacă agentul care a lucrat dosarul sau când o asociație schimbă administratorul, se predă ce își aduce cineva aminte să predea. O evidență ținută la zi face din predare o semnătură pe un inventar care există deja; fără ea, cel care rămâne află lipsurile pe rând, la fiecare telefon primit după aceea.",
    },
  ],

  schimbare: [
    {
      titlu: "Adresa devine cheie, nu notă în dosar",
      text: "Se întreabă așa cum se vorbește la telefon: ce s-a semnat pentru apartamentul de pe strada aceea, în ce an și cine a fost vânzătorul. Răspunsul vine cu documentul și pagina din care a fost scos, deci se verifică pe loc, înainte de a fi spus unui client sau unui notar.",
    },
    {
      titlu: "Datele stau unde se poate arăta că stau",
      text: "Fondul se preia cu proces-verbal, iar accesul se dă nominal, pe persoană și pe dosar. Fiecare căutare și fiecare deschidere de document rămâne în jurnal, inclusiv pentru personalul nostru. La o reclamație sau la o cerere venită de la o persoană vizată aveți ce pune pe masă, nu doar o asigurare verbală.",
    },
    {
      titlu: "Inventarul există înainte să fie nevoie de el",
      text: "Evidența pe dosar și pe imobil se ține la zi tot timpul. Când pleacă un agent sau când se schimbă administratorul unei asociații, predarea se face din ce există deja, cu proces-verbal, plus copiile digitale în format deschis.",
    },
  ],

  aratam: [
    "Depozitul din Golești, județul Argeș, cu condițiile de păstrare și cu lista celor care au acces fizic la raft",
    "Inventarul unui dosar de tranzacție încheiat, ales de dumneavoastră, cu adresa imobilului ca și cheie de căutare",
    "Un răspuns dat pe documente-model, cu documentul și pagina citate, ca să vedeți ce înseamnă „cu sursă”",
    "Jurnalul de acces și anexa de prelucrare a datelor, în forma în care le arătați cuiva care vă cere socoteală pentru datele lui",
  ],

  deschise: [
    "Nu deținem certificare ISO 27001 și nu ne prezentăm ca și cum am avea",
    "Nu avem o agenție imobiliară pe care să o dăm ca referință: 3S este o firmă nouă, iar arhivarea din 2019 este a firmei-mamă, ADRIA Servicii Arhivare SRL",
    "Nu publicăm preț: costul se face pe metri liniari și pe ce anume se digitizează",
    "Nu scriem un termen de păstrare pentru dosarele de tranzacție: nu am găsit o normă generală pe care să o putem cita cu articol",
    "Nu facem evaluarea de impact și nu stabilim noi ce date aveți dreptul să păstrați: acela e răspunsul celui care răspunde de protecția datelor în agenție",
    "Nu ștergem nimic din proprie inițiativă: la o cerere de ștergere executăm ce ne cereți în scris și vă dăm dovada, iar decizia rămâne a dumneavoastră",
    "Nu scriem un timp de răspuns în secunde, fiindcă nu l-am măsurat pe un fond real de agenție",
  ],

  temeiuri: [
    {
      act: "Regulamentul (UE) 2016/679 privind protecția datelor, cu Legea nr. 190/2018",
      ce: "Un dosar de tranzacție este plin de date ale unor oameni care nu vă mai sunt clienți. De aici vin temeiul pentru care le păstrați, durata pentru care le puteți ține, obligația de a răspunde cererilor de acces și de ștergere și contractul de prelucrare cu orice furnizor care le atinge, inclusiv cu noi. Operatorul rămâne agenția; noi suntem persoana împuternicită și nu decidem în locul dumneavoastră.",
    },
    {
      act: "Legea contabilității nr. 82/1991, art. 25 alin. (1)",
      ce: "Contractul de intermediere și facturile de comision sunt documente justificative și se păstrează cinci ani de la încheierea exercițiului financiar în cursul căruia au fost întocmite. Termenul acesta acoperă partea comercială a dosarului, nu și actele și datele personale din el, care au propriul regim.",
    },
    {
      act: "Legea Arhivelor Naționale nr. 16/1996",
      ce: "Evidența documentelor create și primite, gruparea lor pe termene într-un nomenclator arhivistic și condițiile de păstrare. Nomenclatorul este locul unde agenția își scrie propriile termene pe categorii de dosare, iar el este cel care ne obligă și pe noi, nu o listă tipărită de un furnizor.",
    },
  ],

  notaTermene:
    "Un singur termen din dosarul unei tranzacții îl putem cita pe articol: cei cinci ani ai documentelor justificative, din Legea contabilității, cu rândul lui în verificatorul de termene de păstrare. Restul dosarului - actele de proprietate, documentația cadastrală, copiile de acte de identitate - nu are un termen general pe care să îl putem cita, deci rândul rămâne gol, dinadins. El se compune din contractul de intermediere, din obligațiile fiscale și, pentru datele personale, din temeiul în baza căruia le păstrați. Când temeiul se stinge, datele se șterg, indiferent câți ani ar mai fi rămas dintr-un termen scris pe undeva. Dacă lucrați într-o agenție și cunoașteți articolul, scrieți-ne și îl publicăm cu trimiterea la act.",

  intrebari: [
    {
      intrebare: "Cum se caută un dosar după adresă",
      raspuns:
        "Adresa imobilului intră ca și cheie de căutare la inventariere, alături de numele părților, de numărul de dosar și de an. Întrebarea se pune în română, așa cum ar spune-o cineva la telefon, iar răspunsul vine cu documentul și pagina, ca să îl verificați înainte de a-l da mai departe.",
    },
    {
      intrebare: "Ce faceți la o cerere de ștergere a datelor",
      raspuns:
        "Decizia este a dumneavoastră, ca operator. Noi executăm ce ne cereți în scris, pe dosarele și pe documentele pe care le indicați, și vă întoarcem dovada a ceea ce s-a șters și când. Nu ștergem nimic din proprie inițiativă și nu interpretăm cererea în locul dumneavoastră.",
    },
    {
      intrebare: "Preluați și arhiva unei asociații de proprietari",
      raspuns:
        "Da, cu aceleași reguli: preluare cu proces-verbal și inventar, cotă, jurnal de acces. Diferența practică este că numărul celor care pot cere să vadă un document e mult mai mare decât la o agenție, deci accesul se dă nominal și rămâne scris. Cine anume are dreptul să consulte se stabilește din actele asociației, nu de la depozitar.",
    },
    {
      intrebare: "Documentele ajung la un model de limbaj",
      raspuns:
        "Nu intră în antrenarea niciunui model. Într-un dosar imobiliar stau date ale unor oameni care nu au dat niciun acord pentru așa ceva, deci prelucrarea se scrie în anexa semnată odată cu contractul: cine procesează, în ce regiune rulează și cât timp se păstrează interogările.",
    },
  ],

  incheiere: {
    titlu: "Pornim de la ultimul act pe care vi l-a cerut cineva după o tranzacție.",
    text: "O discuție de treizeci de minute, în care ne uităm la arhiva agenției așa cum arată ea azi: câte dosare închise, unde stau ele acum - birou, laptop, mașină - și după ce anume le caută cineva când sună un fost client. Plecați cu o estimare a volumului, cu lista câmpurilor după care veți putea întreba și cu ce am observat despre datele personale din primul dosar pe care îl deschidem.",
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
    pagina: PRIMARII,
  },
  {
    slug: "contabilitate",
    nume: "Birouri de contabilitate",
    rezumat:
      "Un control fiscal se uită la un an vechi de cinci ani, iar statele de salarii au propriul termen, mult mai lung. Amestecarea lor este cauza cea mai frecventă a eliminărilor greșite.",
    pagina: CONTABILITATE,
  },
  {
    slug: "avocatura",
    nume: "Case de avocatură",
    rezumat:
      "Dosare voluminoase și termene procedurale scurte. Diferența dintre a citi douăzeci de bibliorafturi și a întreba direct este un termen câștigat.",
    pagina: AVOCATURA,
  },
  {
    slug: "constructii",
    nume: "Firme de construcții și dezvoltatori",
    rezumat:
      "Dosarul de șantier se produce pe teren, în exemplare care pleacă la firme diferite, iar dovada se cere la ani după recepție, când apare o fisură sau un litigiu.",
    pagina: CONSTRUCTII,
  },
  {
    slug: "logistica",
    nume: "Transport și logistică",
    rezumat:
      "Foi aproape identice, care circulă cu marfa și se întorc târziu. Cererea vine cu o dată și un client, nu cu numărul sub care le-ați înregistrat dumneavoastră.",
    pagina: LOGISTICA,
  },
  {
    slug: "imobiliare",
    nume: "Agenții imobiliare și administrare de imobile",
    rezumat:
      "Dosarele se caută după adresă și poartă datele unor oameni care nu vă mai sunt clienți. Predarea lor cade exact atunci când pleacă cine le-a lucrat.",
    pagina: IMOBILIARE,
  },
];

/** Titlul si descrierea hub-ului. Stau aici, langa segmente, ca sa nu se rupa de lista. */
export const HUB = {
  titluMeta: "Soluții pe domenii",
  descriereMeta:
    "Arhivare fizică, digitizare și căutare cu sursa citată, pe domenii: notariat, primării, contabilitate, avocatură, construcții, transport, imobiliare.",
  eticheta: "Domenii deservite",
  // Ruperea de rand e scrisa AICI, in date, nu duplicata in pagina: pagina o randeaza
  // taind sirul la newline. Fara ea, titlul se rupea la marginea de 24ch si lasa
  // "ARHIVA." singura pe randul trei, la 83 px inaltime.
  h1: "Fiecare domeniu\nîntreabă altceva\nde la aceeași arhivă.",
  // Linia de pe ecranul de deschidere, sub 40 de cuvinte. A treia propozitie a plecat in
  // `listaLead`, ca linie a sectiunii cu lista - nu s-a taiat: acolo e chiar la locul ei,
  // deasupra listei despre care vorbeste.
  lead:
    "Pașii sunt aceiași peste tot: ridicăm, inventariem, digitizăm, răspundem. Ce diferă este ce se cere des, cine controlează și cât se păstrează.",
  /** Linia de deasupra listei de domenii. */
  listaLead:
    "Paginile de mai jos scriu diferența, domeniu cu domeniu, și spun pe față unde nu avem încă un răspuns.",
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
