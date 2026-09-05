// Continutul celor doua pagini de decizie: `/comparatie` si `/investitia`.
//
// De ce stau in acelasi fisier: sunt cele doua pagini pe care le citeste acelasi om, in
// aceeasi jumatate de ora, inainte sa ceara o discutie. Una raspunde la "fata de ce",
// cealalta la "cat ma costa". Textul lor se reciteste impreuna la runda de editare cu
// clientul, deci se tine intr-un singur loc.
//
// REGULA DE CONTINUT, aceeasi ca pe restul site-ului: zero cifre pe care nu le putem
// sustine, zero certificari, zero preturi - nici interval, nici exemplu. Vechimea si
// autorizarea se scriu ATRIBUIT catre ADRIA Servicii Arhivare SRL, firma-mama.
//
// REGULA PROPRIE PAGINII DE COMPARATIE: randul pe care il pierdem se scrie primul, si e
// o sectiune de sine statatoare, nu o nota de subsol. O comparatie care iese in avantajul
// nostru pe fiecare rand nu e o comparatie, e o reclama, si un client institutional o
// citeste ca atare.
//
// Fiecare afirmatie verificabila de mai jos are o intrare in
// `src/content/afirmatii/comparatie-investitia.json`, cu stare `neconfirmat`.

/** O coloana din tabelul de comparatie: una dintre cele patru variante reale. */
export type ColoanaComparatie = {
  /** Cheia de React si nimic altceva. Nu ajunge in text. */
  id: string;
  /** Numele scurt, cat sa incapa pe un cap de coloana. */
  nume: string;
  /** O linie care spune ce este varianta. Apare sub nume, pe coloana. */
  rezumat: string;
  /**
   * Varianta pe care o vindem noi. Se marcheaza o singura data: componenta deduce din ea
   * accentul vizual, ca sa nu existe doua locuri care decid acelasi lucru.
   */
  aNoastra?: boolean;
};

/**
 * Un rand din tabel: intrebarea pe care si-o pune clientul, cu raspunsul pentru fiecare
 * dintre cele patru variante. Campul `celule` are aceeasi lungime si aceeasi ordine ca
 * lista de coloane; componenta verifica la randare si refuza sa deseneze un rand incomplet.
 */
export type RandComparatie = {
  axa: string;
  celule: string[];
};

/** O pereche titlu-text: o varianta descrisa, un rand de pierdere, un caz in care nu merita. */
export type FisaComparatie = {
  titlu: string;
  text: string;
};

/** Un element care determina costul, cu cele doua directii in care il misca. */
export type FactorCost = {
  titlu: string;
  text: string;
  creste: string;
  scade: string;
};

// ---------------------------------------------------------------------------
// /comparatie
// ---------------------------------------------------------------------------

export const COMPARATIE = {
  titluMeta: "Dulap propriu sau arhivă administrată",
  descriereMeta:
    "Patru feluri de a ține arhiva: dulapul din birou, colegul care se ocupă și de ea, depozitarea fără căutare, arhiva administrată. Și când nu merită.",
  eticheta: "Comparație",
  h1: "Dulapul din birou nu vă trimite factură. Costul lui este în altă parte.",
  // Sub 40 de cuvinte, regula direcției. Motivul pentru care nu comparăm spații de stocare
  // între ele - documentele clientului sunt încă hârtie - stă în linia secțiunii I, unde sunt
  // și cele patru variante descrise pe îndelete. Nimic nu s-a pierdut.
  lead:
    "Documentele dumneavoastră sunt încă hârtie, în dulapuri, la câțiva pași de birou. Comparăm cele patru situații reale dintre care alegeți, iar rândul pe care îl pierdem este scris înaintea celor pe care le câștigăm.",

  variante: [
    {
      titlu: "Dulapul din birou sau camera de arhivă proprie",
      text:
        "Documentele rămân la dumneavoastră, la câțiva pași. Nu semnați nimic cu nimeni, nu plătiți lunar și nu cereți voie ca să deschideți un biblioraft. În schimb, ordinea, condițiile de păstrare și evidența ies din timpul și din bugetul dumneavoastră, iar rafturile stau pe metri pătrați de birou.",
    },
    {
      titlu: "Un angajat care se ocupă și de arhivă",
      text:
        "Cineva din firmă cunoaște fondul și găsește repede ce a aranjat singur. Sarcina nu are fișă separată, deci se face după celelalte, iar felul în care este ordonat fondul nu este scris nicăieri: stă în memoria unei singure persoane.",
    },
    {
      titlu: "Depozitare la un operator, fără căutare",
      text:
        "Cutiile pleacă din birou, spațiul se eliberează, iar condițiile de păstrare devin problema depozitului. Ce nu se schimbă este felul în care ajungeți la un act: cereți o cutie după inventar și așteptați. Dacă nu știți în care cutie se află, nici depozitul nu știe.",
    },
    {
      titlu: "Arhivă administrată, cu răspuns care citează pagina",
      text:
        "Fondul intră pe cote, ce se cere des se scanează, iar întrebarea pusă în română primește documentul și pagina din care vine răspunsul. Originalul rămâne al dumneavoastră și se aduce la cerere, cu ieșirea și cu returul consemnate.",
    },
  ] as FisaComparatie[],

  coloane: [
    {
      id: "dulap",
      nume: "Dulapul din birou",
      rezumat: "Arhiva rămâne la dumneavoastră, în sediu.",
    },
    {
      id: "angajat",
      nume: "Colegul care se ocupă",
      rezumat: "O persoană din firmă ține fondul, pe lângă sarcinile ei.",
    },
    {
      id: "depozit",
      nume: "Depozit fără căutare",
      rezumat: "Cutiile pleacă, se cer înapoi după inventar.",
    },
    {
      id: "administrata",
      nume: "Arhivă administrată",
      rezumat: "Fond pe cote, căutare care citează pagina.",
      aNoastra: true,
    },
  ] as ColoanaComparatie[],

  randuri: [
    {
      axa: "Cine răspunde dacă un act lipsește",
      celule: [
        "Dumneavoastră, în fața celui care îl cere. Nu există un al treilea care să spună când a ieșit actul din raft și cine l-a scos.",
        "Tot dumneavoastră. Persoana care se ocupă poartă sarcina, nu răspunderea, iar dacă nu s-a semnat nimic la preluare nu se poate reconstitui nimic.",
        "Depozitul răspunde de cutia predată, în limitele procesului-verbal. Ce era în cutie și nu s-a numărat la preluare rămâne o discuție fără hârtie.",
        "Răspundem de ce am preluat numărat, iar procesul-verbal și inventarul spun exact ce am preluat. Ieșirile și returul originalelor se consemnează pe cotă.",
      ],
    },
    {
      axa: "Ce se întâmplă la un control",
      celule: [
        "Documentul există, dar dovada ordinii lui nu. Nomenclatorul și inventarul ajung să fie căutate în aceeași zi în care sunt cerute.",
        "Depinde de cât a apucat să scrie persoana care se ocupă. De obicei fondul este ordonat în capul ei, nu într-un inventar semnat.",
        "Aveți procesul-verbal și inventarul cutiilor. Ce lipsește este legătura dintre cererea inspectorului și pagina din document.",
        "Inventarul pe cote și nomenclatorul există înainte de control, iar actul cerut vine cu documentul și pagina. Unde nomenclatorul are nevoie de avizul Arhivelor Naționale, termenul avizului nu este al nostru.",
      ],
    },
    {
      axa: "Cât durează găsirea unui act din 2009",
      celule: [
        "Cât durează să urce cineva la rafturi și să deschidă bibliorafturile, în ordinea în care își amintește. Dacă anul este greșit în minte, se reia.",
        "Puțin, dacă persoana este la birou și a aranjat ea fondul. Altfel, cât ia unui coleg să reconstituie logica ei.",
        "Cât ia să identificați cutia în inventar, să o cereți și să sosească. Dacă actul nu este în cutia bănuită, ciclul se reia de la capăt.",
        "Cât ia să scrieți întrebarea. Răspunsul vine cu documentul și pagina; originalul se cere separat, atunci când vă trebuie hârtia semnată.",
      ],
    },
    {
      axa: "Ce rămâne când pleacă omul care știa unde e fiecare cutie",
      celule: [
        "Rămâne dulapul, fără cheia lui de citire. Ordinea era în memoria cuiva, iar memoria a plecat cu preavizul.",
        "Pleacă deodată și sarcina, și harta fondului, de obicei în aceeași zi. Cine vine după reconstituie ordinea de la zero, cutie cu cutie.",
        "Inventarul cutiilor rămâne, deci nu se pierde tot. Se pierde însă legătura dintre o cerere concretă și cutia potrivită.",
        "Cota, inventarul și indexul rămân scrise. Cine vine după nu moștenește o memorie, ci un inventar pe care îl poate citi din prima zi.",
      ],
    },
    {
      axa: "Ce cost ascuns are spațiul ocupat de rafturi",
      celule: [
        "Metrii pătrați ocupați de arhivă se plătesc la prețul biroului, nu la cel al unui depozit. Costul nu apare pe nicio factură, fiindcă este deja în chirie.",
        "Același cost al spațiului, plus orele în care cineva plătit pentru altceva caută prin cutii.",
        "Spațiul se eliberează, iar costul devine vizibil: apare pe factură, măsurat pe metru liniar.",
        "La fel ca la depozitare: spațiul se eliberează, iar costul devine o linie pe care o puteți compara. Ce se adaugă este digitizarea a ceea ce se caută des.",
      ],
    },
    {
      axa: "Ce rămâne dacă vă opriți",
      celule: [
        "Nimic de desfăcut. Documentele sunt deja la dumneavoastră și nu depind de nimeni.",
        "La fel, cu observația că plecarea persoanei este chiar riscul, nu încheierea unui contract.",
        "Se cere restituirea și se așteaptă termenul din contract. Cutiile se întorc așa cum au plecat.",
        "Fondul fizic se restituie cu proces-verbal și inventar, iar fondul digital se predă în format deschis, ca preluarea lui de către altcineva să nu depindă de noi.",
      ],
    },
  ] as RandComparatie[],

  notaTabel:
    "Rândurile de mai sus descriu mecanisme, nu măsurători. Nu punem durate și nu punem sume pentru niciuna dintre cele patru variante, fiindcă nu am măsurat fondul dumneavoastră, iar o cifră luată din media altor arhive ar arăta a dovadă fără să fie.",

  pierdem: [
    {
      titlu: "Costul apare, și apare înainte de primul răspuns",
      text:
        "Un dulap în birou nu are factură lunară. Preluarea, inventarierea și digitizarea sunt o cheltuială reală, plătită înainte să vedeți primul răspuns cu pagina citată. Dacă bugetul de anul acesta nu are loc pentru ea, comparația se oprește aici, și este un răspuns corect, nu o obiecție de tratat.",
    },
    {
      titlu: "Originalul nu mai este la doi pași",
      text:
        "Dacă folosiți zilnic hârtia semnată, mâna dumneavoastră va fi întotdeauna mai rapidă decât orice depozit. Aducem originalul la cerere, cu termen scris în contract, dar termenul acela există și se adaugă la fiecare cerere. Pentru fondul viu, cel de anul în curs, dulapul din birou câștigă, și nu ne prefacem că nu.",
    },
    {
      titlu: "Apare un contract și încă cineva în lanț",
      text:
        "Astăzi nu cereți voie nimănui ca să deschideți un biblioraft. După preluare, între dumneavoastră și cutie stau un contract, un termen și o persoană de la noi. Câștigați evidență scrisă și pierdeți imediatețe; schimbul acesta merită numai dacă evidența vă lipsește cu adevărat.",
    },
    {
      titlu: "Colegul care ține arhiva știe ce nu scrie în documente",
      text:
        "Persoana care se ocupă de fond de ani buni știe de ce s-a făcut un lucru, nu doar că s-a făcut. Contextul acela nu este în niciun document, deci nu îl găsește nici căutarea noastră. Pe un fond mic, un om care cunoaște arhiva bate orice index, și nu avem cu ce să înlocuim asta.",
    },
  ] as FisaComparatie[],

  nuMerita: [
    {
      titlu: "Arhiva încape într-un dulap și se cere rar",
      text:
        "Dacă tot fondul stă într-un dulap, dacă îl caută cineva de câteva ori pe an și dacă persoana care îl ține nu are de gând să plece, un contract de arhivare vă adaugă cost și hârtii, nu liniște. Cutii de arhivă, un inventar scris de mână și puțină disciplină rezolvă situația mai bine decât noi.",
    },
    {
      titlu: "Documentele sunt deja scanate și ordonate",
      text:
        "Dacă fondul este deja în format digital, cu nume de fișier care înseamnă ceva, iar singurul lucru care lipsește este căutarea, atunci partea de rafturi, de transport și de inventariere nu vă folosește la nimic. Comparați numai stratul de căutare, cu furnizorii care vând asta. O spunem din prima discuție, nu după ofertă.",
    },
    {
      titlu: "Fondul urmează la selecționare chiar anul acesta",
      text:
        "Nu se plătește depozitarea și digitizarea a ceea ce se elimină legal peste câteva luni. Întâi selecționarea, cu avizul cerut de lege, apoi discuția despre ce rămâne. Dacă intrați invers în ordinea asta, plătiți transport și rafturi pentru hârtie care se distruge.",
    },
    {
      titlu: "Caietul de sarcini cere o certificare pe care nu o deținem",
      text:
        "Dacă achiziția dumneavoastră condiționează contractul de o certificare anume, spuneți-o în prima discuție. Nu afișăm pe site certificări pe care nu le avem, iar dacă cerința nu se poate acoperi, vă spunem în ziua în care aflăm, nu la sfârșitul procedurii.",
    },
  ] as FisaComparatie[],

  incheiere: {
    titlu: "Dacă niciunul dintre cele patru rânduri de mai sus nu vă descrie situația",
    text:
      "Atunci comparația de pe o pagină publică și-a atins limita, fiindcă nu cunoaște câți metri liniari aveți, ce se cere din ei și cât de des. Jumătatea de oră de discuție există exact pentru asta: se măsoară fondul împreună și se spune, inclusiv, dacă nu merită.",
  },
};

// ---------------------------------------------------------------------------
// /investitia
// ---------------------------------------------------------------------------

export const INVESTITIA = {
  titluMeta: "Ce determină costul arhivării",
  descriereMeta:
    "Ce intră în cost înainte să existe o cifră: metri liniari, cât se scanează, cât de des se cere un act, termenele legale, transportul. Ce e unic și ce e lunar.",
  eticheta: "Investiția",
  h1: "Un preț dat înainte de a măsura rafturile este un preț inventat.",
  // Sub 40 de cuvinte. Ce primește omul din discuția de treizeci de minute e chiar
  // secțiunea IV, iar motivul pentru care cifra vine după măsurătoare e chiar secțiunea III.
  // Nimic nu s-a pierdut.
  lead:
    "Pagina aceasta nu conține prețuri și nici intervale. Conține ce determină costul, ce se plătește o singură dată și ce se plătește lună de lună.",

  factori: [
    {
      titlu: "Metrii liniari de arhivă",
      text:
        "Unitatea în care se măsoară un fond este metrul liniar de raft ocupat, nu numărul de dosare și nici numărul de ani. Se măsoară la fața locului, cu ruleta, înainte de orice discuție despre bani.",
      creste:
        "fondul este împrăștiat în mai multe sedii, prin dulapuri și subsoluri, și nu a fost niciodată inventariat",
      scade:
        "fondul stă deja în cutii, ordonat pe ani, și se poate măsura dintr-o singură trecere",
    },
    {
      titlu: "Cât se scanează și cât rămâne doar depozitat",
      text:
        "Digitizarea este partea cea mai scumpă a proiectului, iar fiecare pagină scanată fără să fie căutată vreodată este bani cheltuiți degeaba. Împărțirea între ce se scanează și ce rămâne pe raft se face înainte de prima cutie deschisă și intră în contract.",
      creste:
        "se cere digitizarea integrală a fondului, inclusiv a ceea ce nu s-a mai deschis de ani buni",
      scade:
        "se scanează întâi categoriile cerute des, iar restul rămâne pe raft și vine la cerere",
    },
    {
      titlu: "Cât de des se cere un act din arhivă",
      text:
        "Un fond care se atinge rar înseamnă în principal depozitare. Un fond din care se cere zilnic ceva înseamnă acces, căutare și scoateri de originale, adică muncă recurentă.",
      creste: "cererile vin zilnic, de la mai multe persoane, și au termen legal de răspuns",
      scade: "fondul se caută de câteva ori pe an, iar cererile nu au termen",
    },
    {
      titlu: "Termenele legale și nomenclatorul",
      text:
        "Categoriile cu termen lung stau în depozit mult după ce restul fondului a fost eliminat legal, deci se plătesc mai mult timp. Nomenclatorul arhivistic decide ce categorie este fiecare document, iar fără el nu se poate elimina nimic.",
      creste:
        "nomenclatorul lipsește sau nu a fost avizat, deci se întocmește, iar avizul Arhivelor Naționale nu depinde de noi",
      scade:
        "nomenclatorul există, este avizat, iar o parte din fond se poate elimina legal chiar acum",
    },
    {
      titlu: "Starea fizică a fondului",
      text:
        "Hârtia curată, în format obișnuit, se scanează dintr-o trecere. Documentele legate strâns, capsate, mucegăite sau în formate mari cer manipulare separată, iar manipularea separată este timp de om, nu timp de scaner.",
      creste:
        "dosare cusute, capse, hârtie deteriorată, planuri și formate mari, documente lipite între ele",
      scade:
        "hârtie în stare bună, format obișnuit, deja scoasă din bibliorafturi și așezată în cutii",
    },
    {
      titlu: "Transportul și accesul la sediul dumneavoastră",
      text:
        "Fondul trebuie să ajungă în depozit. Costul transportului nu ține de distanță singură, ci de câte curse sunt necesare și de cât durează încărcarea la dumneavoastră.",
      creste: "mai multe sedii, subsol fără lift, program de acces limitat, mai multe curse",
      scade:
        "un singur punct de preluare, acces la nivelul străzii, o zi în care se poate lucra fără întrerupere",
    },
    {
      titlu: "Urgența cu care trebuie eliberat spațiul",
      text:
        "Un calendar convenit din timp înseamnă loturi așezate pe săptămâni și oameni programați normal. Un termen impus de altcineva înseamnă echipă suplimentară și lucru în afara programului.",
      creste:
        "termenul vine de la un control anunțat, de la o mutare de sediu sau de la sfârșitul unui contract de chirie",
      scade: "preluarea se poate așeza într-un calendar convenit împreună, pe loturi",
    },
  ] as FactorCost[],

  costUnic: [
    "Preluarea la sediul dumneavoastră, cu proces-verbal, și transportul inițial",
    "Inventarierea fondului pe unități arhivistice, cu cotă pentru fiecare",
    "Întocmirea nomenclatorului arhivistic, atunci când lipsește sau nu este avizat",
    "Digitizarea lotului convenit în scris înainte de prima cutie deschisă",
    "Punerea fondului digitizat în index, ca o întrebare să poată primi documentul și pagina",
  ],

  costRecurent: [
    "Depozitarea, măsurată pe metru liniar ocupat în raft",
    "Accesul și căutarea, pe toată durata contractului",
    "Aducerea originalelor la cerere, cu ieșirea și returul consemnate pe cotă",
    "Selecționarea periodică a fondului, cu avizul cerut de lege",
    "Digitizarea loturilor adăugate după preluarea inițială",
  ],

  notaCosturi:
    "Un element nu intră în nicio coloană: avizul Arhivelor Naționale, cerut la nomenclator și la selecționare. Nu îl emitem noi, nu îl grăbim și nu îi promitem termenul. Îl pregătim și îl depunem, iar restul se așteaptă.",

  deCeFaraPret: [
    {
      titlu: "Nu am măsurat fondul dumneavoastră",
      text:
        "Un preț pe metru liniar scris pe un site este media altor arhive, ale altor firme, cu altă stare a hârtiei. Aplicat la fondul dumneavoastră, arată a dovadă fără să fie una. Preferăm o pagină fără cifre unei pagini cu cifre pe care nu le putem susține.",
    },
    {
      titlu: "Prima cifră citită rămâne ancora discuției",
      text:
        "Dacă publicăm un număr, el devine reperul întregii discuții, chiar dacă fondul dumneavoastră nu seamănă cu cel din care a ieșit numărul. Ancorarea aceasta lucrează în favoarea celui care publică cifra, deci nu ar fi un serviciu făcut dumneavoastră.",
    },
    {
      titlu: "Cele patru întrebări cu care puteți compara orice ofertă",
      text:
        "Cereți fiecărui furnizor: în ce unitate se măsoară tariful, ce intră în el și ce se facturează separat, în cât timp ajunge la dumneavoastră un original cerut, și ce se întâmplă cu fondul la încheierea contractului. Sunt aceleași patru întrebări la care răspundem și noi, în scris.",
    },
  ] as FisaComparatie[],

  primiti: [
    "O estimare de volum: metrii liniari, măsurați împreună sau estimați pe ce ne arătați",
    "Un calendar de preluare scris: ce lot pleacă primul, când, și ce rămâne pe loc la dumneavoastră",
    "Lista categoriilor care se pot elimina legal acum, ca să nu plătiți depozitarea lor",
    "Împărțirea de plecare între ce se scanează și ce rămâne pe raft, cu motivul fiecărei alegeri",
    "Răspunsul scris la cele patru întrebări de mai sus, ca să ne puteți compara cu altcineva",
  ],

  nuPrimiti: [
    "Un preț, cât timp nu s-a văzut arhiva și nu s-au măsurat rafturile",
    "O ofertă trimisă a doua zi, ca să pară promptă, construită pe presupuneri despre fondul dumneavoastră",
    "Un termen pentru avizul Arhivelor Naționale, fiindcă nu îl dăm noi",
    "O reducere condiționată de semnătura de astăzi",
  ],

  incheiere: {
    titlu: "Ce urmează, dacă vreți o cifră",
    text:
      "Se măsoară fondul. Jumătatea de oră servește la asta: se vede unde stă arhiva, cât ocupă, ce se cere din ea și ce se poate elimina legal chiar acum. Estimarea și calendarul de preluare pleacă spre dumneavoastră în scris, iar prețul vine după, pe ce s-a măsurat.",
  },
};
