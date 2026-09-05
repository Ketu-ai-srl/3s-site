// Conținutul paginii `/despre`, ținut aici din același motiv ca `segmente.ts`: pagina
// rămâne o formă, iar textul care se discută cu clientul stă într-un singur loc, unde se
// poate citi fără să treacă cineva prin JSX.
//
// REGULA CARE GUVERNEAZĂ FIECARE RÂND DE MAI JOS. 3S nu este încă înmatriculată. Vechimea,
// depozitul și autorizațiile sunt ale ADRIA Servicii Arhivare SRL, firma-mamă, și se scriu
// ATRIBUIT către ea. „Avem șase ani de experiență” este o afirmație pe care 3S nu o poate
// susține, iar `.claude/scripts/porti/poarta-afirmatii.py` o prinde mecanic. Regula întreagă
// stă în `.claude/rules/afirmatii-atribuite.md`.
//
// Fiecare afirmație verificabilă de mai jos are o intrare în
// `src/content/afirmatii/despre-contact.json`, cu stare `neconfirmat` până când o confirmă
// cineva care cunoaște firma, cu sursă.

/** Un fapt scurt: un titlu și un paragraf. Aceeași formă ca `Fapt` din `segmente.ts`. */
export type FaptDespre = {
  titlu: string;
  text: string;
};

export const DESPRE = {
  /** Titlul din `<title>`, fără sufixul de site. Șablonul din layout adaugă 24 de caractere. */
  titluMeta: "Despre 3S și ADRIA",
  /** meta description: între 50 și 160 de caractere, unică în lot. Poarta S-01 măsoară. */
  descriereMeta:
    "3S este o firmă nouă, crescută din ADRIA Servicii Arhivare SRL, care arhivează din 2019 în județul Argeș. Ce este moștenit, ce este nou, ce lipsește.",
  eticheta: "Despre noi",
  h1: "Firma este nouă. Depozitul din care a crescut lucrează din 2019.",
  lead:
    "3S se înființează acum, ca firmă româno-moldovenească. Arhivarea fizică, depozitul de la Golești și anii de la 2019 încoace sunt ale ADRIA Servicii Arhivare SRL, firma-mamă. Mai jos scriem ce este al ei, ce se construiește la noi și ce nu putem susține deocamdată.",
};

/** Ce există azi, ce se construiește și ce lipsește. Trei fișe, în ordinea asta. */
export const STAREA_DE_AZI: FaptDespre[] = [
  {
    titlu: "Ce lucrează deja",
    text: "Oamenii, depozitul de la Golești și procedura de preluare cu proces-verbal. Toate sunt ale ADRIEI și lucrează pentru clienții ei dinainte să existe site-ul acesta.",
  },
  {
    titlu: "Ce se construiește",
    text: "Partea de căutare: documentele scanate, indexate și interogate în română, cu documentul și pagina alături de răspuns. Aici este munca nouă, și tot aici este riscul pe care ni-l asumăm noi.",
  },
  {
    titlu: "Ce lipsește",
    text: "Datele unei firme înmatriculate: cod fiscal, număr de registru, sediu declarat, telefon. Apar în subsolul site-ului în ziua în care există, copiate dintr-un certificat, nu scrise din memorie.",
  },
];

/** Ce vine de la firma-mamă. Fiecare rând este o afirmație despre ADRIA, nu despre 3S. */
export const MOSTENIT: string[] = [
  "Arhivarea fizică și digitizarea, făcute din 2019, în județul Argeș",
  "Depozitul de la Golești, cu condițiile lui de temperatură, umiditate și acces",
  "Autorizațiile pentru arhivare, pe care le puteți cere scanate înainte de semnătură",
  "Preluarea cu proces-verbal, măsurarea în metri liniari și ținerea opisului la zi",
  "Oamenii care ridică documentele, le inventariază și le scanează",
];

/** Ce se construiește la 3S. Nimic de aici nu are vechime, și nu se scrie ca și cum ar avea. */
export const CONSTRUIT: string[] = [
  "Căutarea în documente, cu întrebarea pusă în română, ca unui coleg care cunoaște arhiva",
  "Răspunsul care citează documentul și pagina, sau spune limpede că nu a găsit",
  "Canalul de pe telefon, ca răspunsul să vină fără să deschideți un calculator",
  "Site-ul acesta, cu termenele legale citate pe actul normativ din care provin",
  "Firma nouă, româno-moldovenească, aflată în curs de înființare",
];

/** Cele trei verbe din nume, în ordinea în care se întâmplă cu documentele dumneavoastră. */
export const NUMELE: FaptDespre[] = [
  {
    titlu: "Scan",
    text: "Scanăm ce se cere des, la o rezoluție care rezistă la citire automată, și verificăm textul rezultat pe diacritice. Originalul rămâne în raft.",
  },
  {
    titlu: "Store",
    text: "Păstrăm hârtia în depozit, cu cotă și opis, iar copia digitală pe infrastructură din Uniunea Europeană. Locul exact se scrie în contract.",
  },
  {
    titlu: "Solve",
    text: "Răspundem la întrebarea pusă în română, cu documentul și pagina alături. Când răspunsul nu se află în documente, asta se spune, nu se presupune.",
  },
];

/** Ce nu scriem pe site. Lista se citește ca o limită asumată, nu ca o scuză. */
export const NESCRIS: string[] = [
  "Un număr de ani de experiență pe seama 3S: firma nu are încă vârstă proprie",
  "Cod fiscal, număr de registru sau sediu, fiindcă nu există înainte de înmatriculare",
  "Certificări: nu deținem certificare ISO 27001 și nu punem sigle de standarde în pagină",
  "Un număr de clienți deserviți sau sigle de referință",
  "Prețuri pe pagină, cât timp costul depinde de volum și de ce se digitizează întâi",
  "Nume și funcții ale echipei, cât timp organigrama firmei noi nu este stabilită",
];

/** Ce se poate vedea, în schimb, înainte de orice semnătură. */
export const ARATAM: string[] = [
  "Autorizațiile ADRIEI, scanate, la cerere",
  "Depozitul de la Golești, cu programare, înainte să semnați ceva",
  "Procesul-verbal de predare-primire, în forma exactă în care se semnează",
  "Contractul și anexa de prelucrare a datelor, în română, înainte de preluare",
  "Termenele legale cu actul normativ citat, în verificatorul de pe pagina de start",
];
