// Exemplele de raspuns din cartonasul de erou. Sunt ILUSTRARE, construite pe
// documente-model: nu sunt documentele unui client si nu reproduc o conversatie
// reala. Ultimul exemplu este un refuz, si e acolo dinadins.

export type ExempluRaspuns = {
  /** Textul scurt de pe butonul care schimba exemplul. */
  intrebare: string;
  raspuns: string;
  /** Codul sursei: document, pagina, articol. Gol la refuz. */
  sursa: string;
  /** Textul legaturii catre document. Gol la refuz. */
  legatura: string;
  refuz: boolean;
  ora: string;
};

export const EXEMPLE: ExempluRaspuns[] = [
  {
    intrebare: "Când expiră contractul de salubritate?",
    raspuns:
      "Contractul a fost semnat la 14 martie 2019, pe o durată de 8 ani. Expiră la 13 martie 2027 și se prelungește numai prin act adițional, nu automat.",
    sursa: "Contract 214/2019 · pag. 4 · art. 7.2",
    legatura: "Deschideți documentul la pagina 4",
    refuz: false,
    ora: "09:41",
  },
  {
    intrebare: "Ce garanție are hala din Mioveni?",
    raspuns:
      "Garanția de bună execuție este de 24 de luni de la recepția la terminarea lucrărilor. Recepția a fost semnată pe 12 iunie 2023, deci garanția curge până pe 12 iunie 2025.",
    sursa: "PV recepție hala Mioveni 2023 · pag. 3 · cap. IV",
    legatura: "Deschideți documentul la pagina 3",
    refuz: false,
    ora: "11:08",
  },
  {
    intrebare: "Pe ce factură a intrat avizul 4412?",
    raspuns:
      "Avizul de însoțire a mărfii 4412 a intrat pe factura 2024-0871, emisă pe 18 septembrie 2024, cu 14 poziții de marfă.",
    sursa: "Facturi emise 2024, trimestrul III · pag. 42 · poziția 6",
    legatura: "Deschideți documentul la pagina 42",
    refuz: false,
    ora: "14:20",
  },
  {
    intrebare: "Câți angajați aveam în 2011?",
    raspuns: "Nu am găsit asta în documentele dumneavoastră.",
    sursa: "",
    legatura: "",
    refuz: true,
    ora: "17:35",
  },
];
