// Fotografiile vitrinei: un singur loc care stie ce fisier exista in `public/img/` si ce
// scrie in textul alternativ al fiecaruia.
//
// DE CE UN REGISTRU, si nu textul alternativ scris in fiecare pagina. Pana acum fotografiile
// erau folosite doar de pagina de start, care si-l scria singura de trei ori. De cand
// deschid toate cele 22 de pagini, acelasi cadru apare pe doua-trei pagini diferite: cu
// textul scris de mana in fiecare, doua descrieri ale ACELEIASI fotografii diverg la prima
// editare, si nimic nu le-ar fi comparat. Aici e o singura descriere per cadru, iar pagina
// alege cheia.
//
// REGULA DE ADEVAR, scrisa in `docs/design/DIRECTIA.md`: sunt fotografii ILUSTRATIVE, de pe
// Pexels, cu licenta in `public/img/LICENTA.md`. Textul alternativ o SPUNE, in litere, si nu
// afirma nicaieri ca ar fi depozitul nostru. Nu se descarca altele.
//
// `pozitie` e ancora decupajului cand ecranul are alta proportie decat fotografia. Cadrele
// portret (dosare, legatura, maini, rafturi, sertare) se ancoreaza mai sus, ca subiectul sa
// nu iasa din banda de sus pe un ecran lat.

export type Fotografie = {
  /** numele fisierului fara sufixul de marime: `rafturi` -> rafturi-1920.webp / rafturi-960.webp */
  nume: string;
  alt: string;
  pozitie?: string;
};

export const FOTOGRAFII = {
  rafturi: {
    nume: "rafturi",
    alt: "Rafturi metalice de arhivă cu cutii numerotate, fotografie ilustrativă",
    pozitie: "center 40%",
  },
  cutii: {
    nume: "cutii",
    alt: "Cutii de arhivă cu cote numerotate pe raft, fotografie ilustrativă",
    pozitie: "center 45%",
  },
  dosare: {
    nume: "dosare",
    alt: "Dosare de arhivă legate cu sfoară, fotografie ilustrativă",
    pozitie: "center 55%",
  },
  dulapuri: {
    nume: "dulapuri",
    alt: "Sertare de fișier cu etichete de interval, fotografie ilustrativă",
    pozitie: "center 45%",
  },
  sertare: {
    nume: "sertare",
    alt: "Perete de sertare de arhivă numerotate, fotografie ilustrativă",
    pozitie: "center 35%",
  },
  maini: {
    nume: "maini",
    alt: "Mână care scoate un dosar dintr-o cutie de arhivă, fotografie ilustrativă",
    pozitie: "center 50%",
  },
  legatura: {
    nume: "legatura",
    alt: "Dosare legate cu panglică într-o cutie de arhivă, fotografie ilustrativă",
    pozitie: "center 50%",
  },
} as const satisfies Record<string, Fotografie>;

export type CheieFotografie = keyof typeof FOTOGRAFII;
