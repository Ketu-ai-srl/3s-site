// Continutul celor doua pagini de mecanism: `/cum-functioneaza` si `/arhivare-fizica`.
//
// De ce sta aici si nu in `page.tsx`, ca la segmente: paginile astea sunt aproape numai
// text, iar textul e singurul lucru pe care il va reciti clientul inainte de publicare.
// Cu proza intr-un fisier de date, runda de editare atinge un singur loc si nu risca sa
// strice structura paginii. Forma paginii sta in `page.tsx`, componentele in
// `src/components/Mecanism*.tsx`.
//
// REGULA DE CONTINUT, aceeasi ca pe pagina de start si pe fisele de domeniu: zero cifre
// pe care nu le putem sustine, zero certificari, zero preturi, zero clienti dati ca
// referinta. Vechimea si autorizarea se scriu ATRIBUIT catre ADRIA Servicii Arhivare SRL,
// firma-mama - regula din `.claude/rules/afirmatii-atribuite.md`, aparata de
// `poarta-afirmatii.py`. Obligatiile legale se scriu cu ACTUL NUMIT; unde nu putem cita
// articolul, se spune pe fata ca nu il citam, exact ca la randul gol din `termene.ts`.
//
// Fiecare afirmatie verificabila de mai jos are o intrare in
// `src/content/afirmatii/mecanism.json`, cu stare `neconfirmat`.

/** O etapa din proces: ce se intampla si ce hartie ramane dupa ea. */
export type Etapa = {
  titlu: string;
  text: string;
  /** Urma scrisa care ramane dupa etapa. Fara ea, etapa e o promisiune verbala. */
  urma: string;
};

/** O veriga din lantul intrebare-raspuns. */
export type Veriga = {
  titlu: string;
  text: string;
};

/** Un rand de fisa: o intrebare sau un termen, cu raspunsul lui. */
export type Fisa = {
  titlu: string;
  text: string;
};

// ---------------------------------------------------------------------------
// /cum-functioneaza
// ---------------------------------------------------------------------------

export const CUM_FUNCTIONEAZA = {
  titluMeta: "Cum funcționează, pas cu pas",
  descriereMeta:
    "Mecanismul întreg: preluarea cu proces-verbal, inventarul pe cote, ce se digitizează și ce nu, căutarea cu pagina citată și ce primiți dacă plecați.",
  eticheta: "Mecanismul serviciului",
  h1: "Șase etape între cutia din subsol și răspunsul de pe ecran.",
  lead:
    "Pagina asta descrie serviciul în ordinea în care se întâmplă: cine ridică arhiva, ce se semnează, ce se scanează și ce nu, cum se caută, cum vine originalul înapoi pe hârtie și ce primiți în ziua în care vă opriți. Unde un pas depinde de un aviz care nu este al nostru, scriem asta pe față.",

  etape: [
    {
      titlu: "Ridicarea",
      text: "Venim la sediul dumneavoastră, măsurăm fondul în metri liniari, împachetăm și sigilăm cutiile de față cu persoana pe care o desemnați. Nimic nu pleacă nenumărat. Transportul îl facem noi, iar un lot nu se împarte între două curse decât dacă scrie așa în procesul-verbal.",
      urma: "Proces-verbal de predare-primire, semnat pe loc, cu numărul de cutii, metrii liniari și anii acoperiți.",
    },
    {
      titlu: "Inventarierea",
      text: "În depozit, fondul se desface pe unități arhivistice. Fiecare primește o cotă și intră în inventar, după nomenclatorul instituției dumneavoastră. Dacă nomenclatorul lipsește sau nu a fost avizat, îl întocmim și îl pregătim pentru avizare. Avizul îl dau Arhivele Naționale, iar termenul lui nu este al nostru și nu îl promitem.",
      urma: "Inventarul pe unități arhivistice, cu cota fiecăreia. O copie rămâne la dumneavoastră, în format editabil.",
    },
    {
      titlu: "Digitizarea",
      text: "Se scanează ce se cere des, nu tot fondul. Lista se face împreună, înainte de prima cutie deschisă: ce intră la scanat, în ce ordine și ce rămâne pe raft. Scanăm la o rezoluție care rezistă la recunoașterea automată a textului, apoi verificăm rezultatul pe diacritice, fiindcă acolo se pierd cele mai multe căutări în română.",
      urma: "Lista de digitizare, convenită în scris înainte de scanare, cu ordinea loturilor.",
    },
    {
      titlu: "Indexarea și căutarea",
      text: "Fiecare pagină scanată rămâne legată de cota unității din care provine, adică de raftul real. Întrebați în română, din pagina de căutare sau de pe telefon, iar răspunsul vine cu documentul și pagina. Când răspunsul nu se află în documentele dumneavoastră, primiți exact asta, nu o presupunere care sună bine.",
      urma: "Jurnalul căutărilor și al deschiderilor de documente, pus la dispoziția dumneavoastră, inclusiv pentru accesul personalului nostru.",
    },
    {
      titlu: "Originalul înapoi",
      text: "Copia digitală nu ține loc de original acolo unde vi se cere hârtia semnată. Cereți unitatea pe cotă, o scoatem din raft și o aducem, cu ieșirea și cu întoarcerea consemnate. Termenul în care ajunge la dumneavoastră se scrie în contract, nu se lasă la latitudinea noastră.",
      urma: "Fișă de ieșire și de retur pe cotă: cine a cerut unitatea, când a plecat din depozit și când s-a întors în raft.",
    },
    {
      titlu: "Încheierea contractului",
      text: "Dacă vă opriți, plecați cu tot. Fondul fizic se restituie cu proces-verbal și inventar, în starea în care se află atunci. Fondul digital se predă în format deschis, PDF plus index CSV, ca preluarea lui de către altcineva să nu depindă de noi. Termenul de restituire este scris în contract și este același număr pe care îl citiți aici.",
      urma: "Proces-verbal de restituire a fondului fizic, plus arhiva digitală pe suport, în format deschis.",
    },
  ] as Etapa[],

  digitizat: [
    "Documentele cerute des la ghișeu sau în control, indiferent de vechimea lor",
    "Fondul care se caută după mai multe chei deodată: nume, dată, număr de înregistrare",
    "Registrele de intrare și opisurile vechi, fiindcă din ele pornește orice căutare",
    "Documentele fragile care s-ar deteriora dacă ar fi manipulate de fiecare dată",
  ],

  peHartie: [
    "Fondul care nu s-a mai cerut de ani buni și pentru care scanarea ar costa mai mult decât căutarea",
    "Documentele legate strâns, deteriorate sau în formate care cer altă manipulare decât un scaner obișnuit",
    "Ce urmează oricum la selecționare în anul următor: nu se scanează ce se va elimina",
    "Documentele pe care le folosiți numai în original, unde o copie nu vă ajută la nimic",
  ],

  notaDigitizare:
    "Digitizarea integrală a unui fond este varianta cea mai scumpă și rar cea mai utilă. Nu o refuzăm dacă o cereți, dar nu o propunem ca implicit: pornim de la ce se caută, iar restul rămâne pe raft și vine la cerere. Ce elemente influențează costul vi le arătăm punct cu punct la prima discuție; preț pe pagină sau pe metru liniar nu publicăm, fiindcă ar fi o cifră ruptă de fondul dumneavoastră.",

  lant: [
    {
      titlu: "Întrebarea, în română",
      text: "Scrieți cum ați spune unui coleg care cunoaște arhiva: ce autorizație s-a dat pe o stradă, într-un an. Fără cuvinte-cheie și fără o sintaxă de căutare pe care trebuie să o învețe cineva de la ghișeu.",
    },
    {
      titlu: "Căutarea, numai în fondul dumneavoastră",
      text: "Se caută în documentele instituției dumneavoastră, nu pe internet și nu în fondul altui client. Fondurile rămân separate, iar accesul se dă nominal, pe persoană și pe fond.",
    },
    {
      titlu: "Fragmentele găsite",
      text: "Se scot pasajele care conțin răspunsul, împreună cu documentul și pagina din care provin. Fără fragmente, pasul următor nu se face deloc.",
    },
    {
      titlu: "Răspunsul, cu sursa lipită de el",
      text: "Răspunsul se formulează pe fragmentele găsite și se afișează cu documentul și pagina alături. Fără sursă, răspunsul nu se afișează.",
    },
    {
      titlu: "Verificarea, la dumneavoastră",
      text: "Deschideți documentul la pagina citată și citiți fraza pe care se sprijină răspunsul. Asta este partea pe care nu v-o cerem pe încredere.",
    },
  ] as Veriga[],

  nuFace: [
    "Nu inventează o cifră sau o dată ca să nu vă lase fără răspuns",
    "Nu caută în afara documentelor pe care ni le-ați dat",
    "Nu ține loc de original acolo unde vi se cere hârtia semnată",
    "Nu decide în locul dumneavoastră ce se păstrează și ce se elimină",
  ],

  hartie: [
    {
      titlu: "Cine rămâne proprietarul fondului",
      text: "Dumneavoastră. Noi suntem custode, iar custodia se dovedește cu procesul-verbal de preluare și cu inventarul semnat, nu cu o clauză generală în contract.",
    },
    {
      titlu: "Cum iese o unitate din depozit",
      text: "Pe cotă, la cererea unei persoane cu drept de acces pe fondul acela. Ieșirea și întoarcerea se consemnează, iar fișa rămâne la dosarul fondului, deci se vede oricând pe mâna cui a trecut hârtia.",
    },
    {
      titlu: "Ce se întâmplă cu copia digitală după ce plecați",
      text: "Se predă în format deschis, PDF plus index CSV, apoi se șterge din sistemele noastre la termenul scris în contract, cu confirmare scrisă a ștergerii.",
    },
    {
      titlu: "Ce facem dacă un document lipsește la inventariere",
      text: "Se consemnează în inventar ca lipsă la momentul preluării, cu trimitere la procesul-verbal. Un fond preluat în grabă, fără consemnarea lipsurilor, mută o problemă veche în curtea noastră și pe a dumneavoastră deodată.",
    },
  ] as Fisa[],

  aratam: [
    "Depozitul de la Golești, județul Argeș, cu tot cu condițiile de păstrare și cu regimul de acces",
    "Procesul-verbal de preluare și inventarul, în forma exactă în care le veți semna",
    "Un răspuns dat pe documente-model, cu documentul și pagina citate",
    "Contractul în limba română, cu anexa de prelucrare a datelor semnată odată cu el",
  ],

  deschise: [
    "Nu deținem certificare ISO 27001 și nu ne prezentăm ca și cum am avea",
    "Nu scriem un timp de răspuns în secunde: nu l-am măsurat pe un fond real de client",
    "Nu publicăm preț, nici pe pagină, nici pe metru liniar",
    "Nu dăm nicio instituție ca referință, fiindcă 3S este o firmă nouă",
    "Nu promitem un termen pentru avizarea nomenclatorului: avizul îl dau Arhivele Naționale",
  ],

  incheiere: {
    titlu: "Prima etapă durează treizeci de minute și nu vă costă o cutie mutată.",
    text: "Ne uităm împreună la arhiva dumneavoastră așa cum arată ea azi: câți metri liniari, ce se cere cel mai des, ce vă cere controlul și ce a rămas neinventariat. Plecați cu estimarea volumului, cu ordinea în care s-ar digitiza și cu un calendar de preluare scris.",
  },
};

// ---------------------------------------------------------------------------
// /arhivare-fizica
// ---------------------------------------------------------------------------

export const ARHIVARE_FIZICA = {
  titluMeta: "Arhivare fizică și depozitare",
  descriereMeta:
    "Depozitul de la Golești, preluarea cu proces-verbal, inventarul pe cote și selecționarea cu avizul Arhivelor Naționale. Partea care se face cu rafturi.",
  eticheta: "Serviciul de bază",
  h1: "Un program nu vă poate lua cutiile din subsol.",
  lead:
    "Arhivarea fizică este partea care se face cu mașina, cu rafturi și cu semnături. Pagina asta scrie unde stau documentele, în ce condiții, cum se numără, cum se face inventarul și cum se elimină ce nu mai trebuie păstrat, cu avizul cerut de lege. Fără partea asta, căutarea în documente rămâne un ecran peste o problemă nerezolvată.",

  depozit: [
    {
      titlu: "Adresa există și se poate vizita",
      text: "Depozitul este la Golești, județul Argeș, lângă Pitești, și este al ADRIA Servicii Arhivare SRL, firma-mamă, care arhivează documente din 2019. Puteți veni să îl vedeți înainte să semnați ceva.",
    },
    {
      titlu: "Condițiile se văd la fața locului",
      text: "Temperatură, umiditate, protecție împotriva focului și a apei, rafturi și spațiu de manipulare. La vizită vi le arătăm pe teren, în ziua aceea. Autorizația de funcționare este a firmei-mamă și v-o punem la dispoziție scanată, la cerere.",
    },
    {
      titlu: "Fondurile stau separate",
      text: "Fondul fiecărei instituții are locul lui în raft, cota lui și inventarul lui. Nu se amestecă la depozitare și nu se amestecă la căutare.",
    },
    {
      titlu: "Fiecare mișcare se consemnează",
      text: "Intrările în depozit se țin într-o evidență, iar scoaterea unei unități arhivistice se face pe cotă, cu fișă de ieșire. Regula este aceeași pentru personalul nostru.",
    },
  ] as Fisa[],

  preluare: [
    {
      titlu: "Vedem fondul așa cum este",
      text: "Venim la dumneavoastră și ne uităm la ce există: câți metri liniari, în ce stare, ce este legat și ce este vrac, ce a fost deja inventariat și ce nu. Din vizita asta iese estimarea, nu dintr-un formular completat de la distanță.",
      urma: "Notă de evaluare a fondului, cu volumul măsurat și cu ce am găsit deja inventariat.",
    },
    {
      titlu: "Împachetăm și numărăm",
      text: "Documentele se așază în cutii de arhivă, se numerotează și se sigilează de față cu persoana pe care o desemnați. Ce lipsește sau este deteriorat se scrie atunci, nu peste trei luni, când nimeni nu mai poate spune de unde vine lipsa.",
      urma: "Lista cutiilor, cu numerotare și cu observațiile de stare, anexată la procesul-verbal.",
    },
    {
      titlu: "Semnăm predarea",
      text: "Procesul-verbal de predare-primire spune ce pleacă, în câte cutii, câți metri liniari și pe ce ani. Din clipa semnării, fondul are un custode cu nume, iar dumneavoastră aveți hârtia care o dovedește.",
      urma: "Proces-verbal de predare-primire, în două exemplare semnate.",
    },
    {
      titlu: "Transportăm și așezăm",
      text: "Transportul îl facem noi. La depozit, fondul se așază pe rafturi, iar poziția fiecărei unități intră în evidență, ca să poată fi găsită pe cotă și nu din memoria cuiva care s-ar putea să nu mai lucreze aici peste doi ani.",
      urma: "Evidența pozițiilor din depozit, legată de cota din inventar.",
    },
  ] as Etapa[],

  cuvinte: [
    {
      titlu: "Metru liniar",
      text: "Unitatea în care se măsoară un fond: un metru de raft plin, indiferent câte dosare încap în el. Se măsoară la fața locului, cu ruleta, fiindcă de aici pornesc și volumul de lucru, și costul; o cifră dată după numărul de dulapuri se dovedește greșită la prima cutie.",
    },
    {
      titlu: "Unitate arhivistică",
      text: "Dosarul, registrul sau pachetul care se păstrează și se manipulează ca un întreg. Este cea mai mică bucată care primește cotă și care poate ieși singură din depozit.",
    },
    {
      titlu: "Cota",
      text: "Adresa unei unități arhivistice în fond. Cu ea se cere hârtia din raft și tot cu ea rămâne legată copia digitală, ca răspunsul de pe ecran să poată fi urmărit înapoi până la raft.",
    },
    {
      titlu: "Nomenclatorul arhivistic",
      text: "Tabelul care spune ce documente creează instituția, pe ce compartimente și cât se păstrează fiecare categorie. Se avizează de Arhivele Naționale. Fără el, termenele se stabilesc din amintiri, iar selecționarea nu are pe ce să se sprijine.",
    },
    {
      titlu: "Inventarul",
      text: "Lista unităților arhivistice dintr-un fond, cu cota, conținutul pe scurt și anii acoperiți. Este documentul pe care îl semnați la preluare și pe care îl primiți înapoi la restituire.",
    },
  ] as Fisa[],

  selectionare: [
    {
      titlu: "Cine decide",
      text: "Comisia de selecționare a instituției dumneavoastră. Noi pregătim lucrarea: grupăm documentele pe termene, scoatem ce a împlinit termenul de păstrare și întocmim documentația pe care comisia o analizează. Decizia rămâne unde o pune legea.",
    },
    {
      titlu: "Ce se semnează",
      text: "Procesul-verbal al comisiei de selecționare, împreună cu inventarele documentelor propuse spre eliminare. Acesta este documentul pe care îl arătați la un control, nu o adresă primită de la firma de arhivare.",
    },
    {
      titlu: "Cine avizează",
      text: "Arhivele Naționale, prin structura teritorială competentă. Până la aviz nu se elimină nimic. Termenul de răspuns nu depinde de noi, deci nu îl scriem nici în ofertă, nici aici.",
    },
    {
      titlu: "Cum se elimină efectiv",
      text: "Documentele avizate se scot din evidența fondului și se distrug astfel încât conținutul să nu mai poată fi reconstituit, cu proces-verbal de eliminare. Urma rămâne în evidență: se vede oricând ce a fost eliminat și pe baza cărui aviz.",
    },
  ] as Fisa[],

  notaSelectionare:
    "Eliminarea fără avizul Arhivelor Naționale încalcă Legea Arhivelor Naționale nr. 16/1996, iar răspunderea rămâne a creatorului documentelor, adică a dumneavoastră. Dacă cineva vă promite eliminare rapidă și fără hârtii, cereți-i să vă arate cu ce document rămâneți în fața controlului.",

  temeiuri: [
    {
      titlu: "Legea Arhivelor Naționale nr. 16/1996",
      text: "Obligațiile creatorilor și deținătorilor de documente: evidența documentelor create și primite, gruparea lor pe termene de păstrare într-un nomenclator avizat, condițiile de păstrare, selecționarea numai prin comisie și cu avizul Arhivelor Naționale.",
    },
    {
      titlu: "Instrucțiunile privind activitatea de arhivă la creatorii și deținătorii de documente, aprobate prin Ordinul de zi nr. 217/1996 al Arhivelor Naționale",
      text: "Partea practică a aceleiași obligații: cum se întocmește nomenclatorul, cum se constituie unitățile arhivistice, ce cuprinde inventarul, cum lucrează comisia de selecționare și ce condiții trebuie să îndeplinească spațiul de depozitare.",
    },
    {
      titlu: "Regulamentul (UE) 2016/679, cu legislația română de aplicare",
      text: "Dosarele de personal, statele de salarii și documentele medicale conțin date cu caracter personal. Prelucrarea lor de către noi, ca persoană împuternicită, se scrie în anexa la contract și se semnează odată cu el.",
    },
  ] as Fisa[],

  notaTemei:
    "Actele de mai sus sunt numite ca să le puteți citi la sursă. Nu punem numere de articol acolo unde nu le-am verificat cuvânt cu cuvânt și nu dăm consultanță juridică: termenul care vă obligă este cel din nomenclatorul propriu, avizat. Unde legea specifică domeniului dumneavoastră spune altceva decât regula generală, ea are prioritate. Dacă o cunoașteți și lipsește de aici, scrieți-ne și o adăugăm cu trimiterea la act.",

  aratam: [
    "Depozitul, rafturile și spațiul de manipulare, la o vizită anunțată din timp",
    "Condițiile de temperatură, umiditate și protecție, așa cum sunt în ziua vizitei",
    "Cutiile, etichetele și felul în care arată o cotă pe raft",
    "Modelele de proces-verbal și de inventar pe care urmează să le semnați",
    "Autorizația de funcționare a depozitului, care este a firmei-mamă",
  ],

  deschise: [
    "Nu deținem certificare ISO 27001 și nu ne prezentăm ca și cum am avea",
    "Nu publicăm capacitatea liberă a depozitului în metri liniari: se schimbă de la lună la lună și v-o spunem la discuție, pentru ziua aceea",
    "Nu publicăm preț pe metru liniar",
    "Nu dăm nicio instituție ca referință, fiindcă 3S este o firmă nouă",
    "Nu promitem termene pentru avizele care se dau de Arhivele Naționale",
  ],

  incheiere: {
    titlu: "Începe cu o măsurătoare, nu cu o ofertă.",
    text: "Venim, ne uităm la fond și îl măsurăm în metri liniari. Din vizita asta iese estimarea volumului, ordinea în care s-ar prelua loturile și un calendar scris. Dacă din discuție reiese că vă este mai bine cu arhiva la dumneavoastră, o spunem.",
  },
};
