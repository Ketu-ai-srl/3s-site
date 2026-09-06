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
//
// `filtru` ADUCE CADRUL IN BANDA PAGINII DE START, si e o cifra masurata, nu o preferinta.
// Identitatea site-ului e cerneala aproape neutra pe noapte, cu arama drept singura culoare.
// Masurat pe primul ecran, la 1280x800, cu textul ascuns si miscarea oprita (saturatie medie
// HSV pe toti pixelii): pagina de start 0,044 si hub-ul 0,045, iar `maini` 0,313, `legatura`
// 0,260, `dosare` 0,156 si `cutii` 0,095 - de doua pana la sapte ori peste referinta. La 1280
// se vedea de la doi metri ca sunt din alta pelicula: `maini` avea 6,4% pixeli puternic
// saturati, `dosare` 3,0%, pagina de start 0,0%.
//
// Valoarea fiecarui filtru e ALEASA PRIN MASURATOARE, nu rotunda din obisnuinta: s-a coborat
// pana cand saturatia medie a primului ecran a intrat sub 0,06, pragul cerut. Masurat dupa,
// pe pagina construita: `maini` 0,058, `legatura` 0,057, `dosare` 0,057, `cutii` 0,052.
//
// CIFRA ARE UN PLANSEU, si se vede pe un control: un ecran de deschidere FARA nicio
// fotografie, doar noapte-2, masoara 0,091. `(max-min)/max` e mare la diferente de un bit
// cand `max` e mic, deci pe pixeli aproape negri saturatia medie nu spune nimic despre
// culoarea unei fotografii. De aceea nici nu se coboara mai jos: pagina de start, care nu are
// niciun filtru, masoara 0,044 - nu 0 - si ea e referinta, nu zeroul.
//
// Filtrul se aplica DIN REGISTRU, deci numai paginilor care citesc registrul. Pagina de start
// isi scrie fotografiile pe loc, in `page.tsx`, si ramane neatinsa: e directia aprobata, si
// referinta contra careia s-a masurat nu are voie sa se miste odata cu masuratoarea.
//
// `voalBanda` E O MASURATOARE, nu o preferinta. Voalul benzii de antet (`.voal-banda`) era
// o constanta peste patru fotografii cu expuneri foarte diferite, deci dadea patru
// rezultate diferite. Amplitudinea de luminanta a benzii (p95-p5), pe captura reala la
// 1280 px, cu textul si bara de sus scoase, INAINTE - toate la voal 1:
//   rafturi 0,0130 · dosare 0,0078 · sertare 0,0061 · legatura 0,0035
// Amplitudinea BRUTA a acelorasi decupaje, cu voalul stins: rafturi 0,8385 · sertare
// 0,6411 · dosare 0,5098 · legatura 0,3278. Deci nu fotografia lui /termeni e „fara
// continut": intra cu un sfert din contrastul lui `rafturi` si iese sub pragul la care
// ochiul mai vede ceva.
//
// Tinta e valoarea care FUNCTIONEAZA, adica `rafturi` la voal 1 (0,0130): acolo cutiile de
// pe raft se citesc. Cifrele de mai jos sunt punctele de pe curba masurata unde fiecare
// fotografie ajunge acolo, dintr-o baleiere k = 1 / 1,5 / 2 / 2,5 / 3 / 3,5 interpolata
// intre punctele vecine si verificata din nou pe captura. `rafturi` ramane fara camp: 1 e
// implicitul, si el e referinta.
//
// PLAFONUL NU E TINTA, SI NU EU IL PUN. Voalul subtiat lasa sa treaca si lumina de sub
// litera, iar contrastul peste fotografie NU e masurat de axe (le marcheaza „needs
// review"), deci s-a masurat separat, pe dreptunghiuri stranse pe text, la 1280 si la 390,
// cu acelasi voal fortat la 1 ca martor. `legatura` ar fi avut nevoie de 2,9 ca sa atinga
// 0,0130; la 2,9 eticheta de arama „Cadrul juridic" cadea la 4,44:1 pe 390 px, sub pragul
// de 4,5 pentru text mic. La 2,5 sta la 4,7 si amplitudinea iese 0,0105 - cu o cincime sub
// referinta, si acolo se opreste, fiindca dincolo se plateste in litera. Se scrie aici ce
// s-a masurat, nu ce s-ar fi vrut.
//
// `sertare` (/instrumente/termene-de-pastrare) A FOST MASURAT SI LASAT LA 1, deliberat.
// Plafonul lui e 1,3: banda paginii aceleia e mai scurta (478 px fata de 527), deci firul
// de navigare urca in zona unde voalul e cel mai subtire, iar separatorul „/" - scris cu
// cerneala cea mai stinsa - sta la 4,75:1 chiar si cu voalul neatins. Castigul intre 1 si
// 1,3 e 0,0055 -> 0,0086, platit cu 4,75 -> 4,54. Pagina e a altei felii si nimeni nu a
// cerut schimbarea ei, deci ramane cum era; cifrele stau scrise ca sa nu fie remasurate.
//
// A se remasura la orice fotografie noua sau decupaj nou, in ambele sensuri: si
// amplitudinea, si contrastul literei.

export type Fotografie = {
  /** numele fisierului fara sufixul de marime: `rafturi` -> rafturi-1920.webp / rafturi-960.webp */
  nume: string;
  alt: string;
  pozitie?: string;
  /** filtru CSS pe fotografie, ca sa intre in banda de culoare a paginii de start */
  filtru?: string;
  /**
   * Cat de mult se subtiaza voalul benzii de antet peste fotografia asta (`--voal-tarie`
   * din `globals.css`). 1 = calibrarea de referinta. Vezi nota de mai jos.
   */
  voalBanda?: number;
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
    filtru: "saturate(0.4)",
  },
  dosare: {
    nume: "dosare",
    alt: "Dosare de arhivă legate cu sfoară, fotografie ilustrativă",
    pozitie: "center 55%",
    filtru: "saturate(0.15)",
    voalBanda: 1.45,
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
    filtru: "saturate(0.12)",
  },
  legatura: {
    nume: "legatura",
    alt: "Dosare legate cu panglică într-o cutie de arhivă, fotografie ilustrativă",
    // Decupajul era `center 50%` si cadea pe partea intunecata a fotografiei: masurat pe
    // primul ecran, 0,7% din pixeli treceau de luminanta 45, adica subiectul nu se citea
    // deloc - o ceata brun-inchisa la 15,3 luminanta medie, fata de 33,5 pe pagina de start.
    // Voalul nu era vinovat: e acelasi pe toate paginile. La `center 15%` cadrul se muta pe
    // partea luminata si masoara 14,5% vizibil la 26,6 luminanta.
    pozitie: "center 15%",
    filtru: "saturate(0.12)",
    // `voalBanda` NU se seteaza aici: calibrarea 2,5 din felia 29 a fost masurata pe decupajul
    // `center 50%`, cel intunecat. Pe `center 15%` fotografia intra luminata, iar un voal
    // subtiat de 2,5 ori ar cobori contrastul etichetei sub 4,5:1. Ramane la referinta (1)
    // pana la o remasurare pe decupajul asta - in ambele sensuri, amplitudine si litera.
  },
} as const satisfies Record<string, Fotografie>;

export type CheieFotografie = keyof typeof FOTOGRAFII;
