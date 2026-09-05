// Masura randului pe paginile juridice - un singur loc, fiindca o citesc trei fisiere.
//
// DE CE UN FISIER SEPARAT, si nu o constanta in `JuridicBlocuri`. `JuridicBlocuri` il
// importa deja pe `JuridicIdentificare`, deci o constanta tinuta acolo si citita inapoi ar
// fi inchis un ciclu de import intre cele doua. Un modul fara randare pe care il citesc
// toti trei nu are directie, deci nu are ciclu.
//
// DE CE NU SE SCRIE IN `ch`, si de unde vin cifrele. Intentia a fost de la inceput sub
// optzeci de caractere pe rand: dincolo de atat ochiul pierde inceputul randului urmator,
// iar aici se citesc fraze lungi, nu titluri. Clasa scrisa era `max-w-[74ch]` si suna a
// exact asta. Nu era. `ch` e latimea glifei ZERO, iar zeroul e printre cele mai late glife
// ale fontului, deci unitatea raspunde la alta intrebare decat cea pusa.
//
// Masurat pe pagina randata la 1280 px, cu un `Range` asezat peste fiecare rand vizual:
// `74ch` dadea 661 px si 98 de caractere in medie, cu varf la 103 - cu un sfert peste
// pragul pe care nota il declara respectat. Nicio poarta nu se inrosea, fiindca niciuna nu
// numara caractere; scria in nota, si nota se citea ca o masuratoare.
//
// Cifrele de mai jos sunt calibrate pe masuratoarea de DUPA schimbare, aceeasi metoda, nu
// pe aritmetica unitatii - si bine ca sunt, fiindca aritmetica dadea altceva: din 661 px la
// 74ch ar fi iesit 8,93 px pe `ch` si 464 px la 52ch, iar masurat ies 485. Verificat la
// 1280 px: 485 px, 68 de caractere in medie pe rand, cu varf la 72; enumerarile stau la 65
// cu varf la 71. La 390 px, unde coloana e oricum mai ingusta decat masura, ies 41 pana la
// 51. `MASURA_STRANSA` e pentru textul din randurile de fisa, unde coloana e deja ingusta.
export const MASURA = "max-w-[52ch]";
export const MASURA_STRANSA = "max-w-[45ch]";

// Casetele (`declaratie`, `limite`, blocul de identificare) au o suprafata vizibila -
// chenar sau linie de arama - deci latimea lor se vede, spre deosebire de a unui paragraf.
// Lasate fara plafon, se intindeau pe toata coloana (circa 950 px la 1280) in timp ce
// textul dinauntru statea pe 485: jumatate de caseta ramanea goala la dreapta si arata a
// greseala de asezare. Cifra e MASURA plus cele doua paddinguri de 24 px, si e verificata
// pe pagina, nu calculata: 57ch da 547 px, adica 499 px inauntru, unde textul de 485 incape.
// Calculul ar fi dat 532: `ch` se raporteaza la fontul ELEMENTULUI, iar caseta mosteneste
// 17 px, nu cei 16,5 ai paragrafului. Inca un motiv sa nu se scrie masura in `ch` din cap.
export const MASURA_CASETA = "max-w-[57ch]";
