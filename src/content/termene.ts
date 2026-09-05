// Termenele legale din verificatorul de la sectiunea IV. Starea spune cat de
// tare se poate sprijini cifra: `confirmat` are articol de lege citabil,
// `orientativ` cere confirmare pe nomenclatorul propriu, `neconfirmat` lasa
// randul GOL, dinadins, si scrie de ce.

export type StareTermen = "confirmat" | "orientativ" | "neconfirmat";

export type Termen = {
  tip: string;
  /** Textul de pe buton, scurt cat sa incapa in coloana. */
  scurt: string;
  stare: StareTermen;
  /** Gol inseamna rand lasat gol intentionat. */
  termen: string;
  dela: string;
  lege: string;
  legeNota: string;
  nota: string;
};

export const STARI: Record<StareTermen, { text: string; clase: string }> = {
  confirmat: {
    text: "Confirmat cu articol de lege",
    clase: "bg-verde-moale text-verde",
  },
  orientativ: {
    text: "Orientativ, confirmați pe nomenclator",
    clase: "bg-arama-moale text-arama-inchis",
  },
  neconfirmat: {
    text: "Nu îl putem susține încă",
    clase: "bg-hartie-2 text-tus-2",
  },
};

export const TERMENE: Termen[] = [
  {
    tip: "Registre de contabilitate și documente justificative",
    scurt: "Registre și documente justificative",
    stare: "confirmat",
    termen: "5 ani",
    dela: "De la data încheierii exercițiului financiar în cursul căruia au fost întocmite.",
    lege: "Legea contabilității nr. 82/1991, art. 25 alin. (1)",
    legeNota: "Termen redus de la 10 la 5 ani prin Legea nr. 36/2023.",
    nota: "Facturile, inclusiv cele emise prin RO e-Factura, intră în aceeași categorie. Atenție la termenul de prescripție a dreptului organului fiscal de a stabili creanțe, tot de 5 ani, care poate curge de la altă dată decât termenul de arhivare.",
  },
  {
    tip: "State de salarii",
    scurt: "State de salarii",
    stare: "confirmat",
    termen: "50 de ani",
    dela: "De la data întocmirii.",
    lege: "Legea contabilității nr. 82/1991, art. 25 alin. (2)",
    legeNota: "Excepție expresă de la termenul general al documentelor financiare.",
    nota: "Este documentul pe care îl cere un fost angajat pentru dovada vechimii, uneori la treizeci de ani după ce a plecat. Se păstrează separat de restul documentelor financiare exact pentru că are alt termen, iar amestecarea lor este cauza cea mai frecventă a eliminărilor greșite.",
  },
  {
    tip: "Dosare de personal",
    scurt: "Dosare de personal",
    stare: "orientativ",
    termen: "75 de ani",
    dela: "De la data încetării raportului de muncă.",
    lege: "Legea Arhivelor Naționale nr. 16/1996",
    legeNota:
      "Termenul concret se stabilește prin nomenclatorul arhivistic avizat al organizației.",
    nota: "75 de ani este practica preluată în nomenclatoarele avizate, nu o cifră scrisă ca atare într-un articol de lege general. Termenul care vă obligă este cel din nomenclatorul propriu. Dacă nomenclatorul dumneavoastră spune altceva, nomenclatorul câștigă.",
  },
  {
    tip: "Registre de stare civilă",
    scurt: "Registre de stare civilă",
    stare: "confirmat",
    termen: "100 de ani",
    dela: "De la data întocmirii registrului.",
    lege: "Legea nr. 119/1996 cu privire la actele de stare civilă",
    legeNota: "După împlinirea termenului, registrele se predau Arhivelor Naționale.",
    nota: "Exemplarul al doilea al registrului are propriul regim de păstrare și de depunere. Pentru o primărie, acesta este fondul cu cea mai lungă viață și cel mai des solicitat de cetățean la ghișeu.",
  },
  {
    tip: "Hotărâri ale consiliului local și dispoziții ale primarului",
    scurt: "Hotărâri și dispoziții",
    stare: "confirmat",
    termen: "Permanent",
    dela: "Nu curge un termen. Documentele nu pot fi propuse spre eliminare niciodată.",
    lege: "Legea Arhivelor Naționale nr. 16/1996",
    legeNota: "Documente care fac parte din Fondul Arhivistic Național al României.",
    nota: "Permanent înseamnă păstrare până la predarea către Arhivele Naționale, în condițiile legii. Un document cu termen permanent apărut într-un proces-verbal de eliminare este cea mai gravă eroare pe care o poate găsi un control.",
  },
  {
    tip: "Cartea tehnică a construcției",
    scurt: "Cartea tehnică a construcției",
    stare: "confirmat",
    termen: "Pe toată durata existenței construcției",
    dela: "De la recepția la terminarea lucrărilor.",
    lege: "HG nr. 273/1994, Regulamentul de recepție a lucrărilor de construcții",
    legeNota: "Se predă proprietarului și îl urmează la fiecare schimbare de proprietar.",
    nota: "Lipsa ei se constată exact în momentul în care aveți nevoie de ea: la o expertiză, la o vânzare sau după un eveniment. Reconstituirea costă de câteva ori mai mult decât păstrarea.",
  },
  {
    tip: "Contracte comerciale",
    scurt: "Contracte comerciale",
    stare: "orientativ",
    termen: "Durata contractului plus 3 ani",
    dela: "De la data la care obligația a devenit exigibilă.",
    lege: "Codul civil, art. 2517",
    legeNota: "Termenul general de prescripție este de 3 ani, dacă legea nu prevede altfel.",
    nota: "Prescripția generală este punctul de plecare, nu răspunsul complet. Garanțiile de bună execuție, clauzele de răspundere pe termen lung și obligațiile fiscale pot cere mai mult. Termenul practic se stabilește pe tip de contract, nu pe categoria întreagă.",
  },
  {
    tip: "Dosare ale cabinetelor de avocatură",
    scurt: "Dosare de cabinet de avocatură",
    stare: "neconfirmat",
    termen: "",
    dela: "",
    lege: "",
    legeNota: "",
    nota: "Nu am găsit o normă generală unică, aplicabilă tuturor dosarelor unui cabinet, pe care să o putem cita cu articol. Termenul se construiește din statutul profesiei, din contractul de asistență juridică și din nomenclatorul propriu al cabinetului. Preferăm rândul gol în locul unei cifre pe care nu am putea să o susținem în fața unui control. Îl completăm cu articol atunci când îl avem, iar dacă lucrați într-un cabinet și cunoașteți temeiul, scrieți-ne.",
  },
];
