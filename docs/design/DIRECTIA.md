# Direcția vizuală 3S

Aprobată de owner pe pagina de start, septembrie 2026. Standardul dat: spacex.com.

Un ecran spune un singur lucru. Fundal de noapte, hârtie veche pe literă, un singur accent
de aramă, titluri condensate cu majuscule, fotografie pe tot ecranul, un buton. Tot ce nu
încape în titlu + o linie + un buton nu e pentru ecranul de deschidere, ci pentru secțiunile
de dedesubt, unde omul ajunge fiindcă vrea detaliul.

Regulile de mai jos sunt cele mecanizate. Poarta le măsoară; nu sunt preferințe.

## Jetoanele

**Suprafețe.** `noapte` (#0b0b0c) e fundalul implicit al site-ului, pus pe `body`. `noapte-2`
(#141416) e treapta pentru un ecran fără fotografie și pentru fișe; `noapte-3` (#1e1e21) e
treapta pentru blocuri așezate peste ele. Negrul nu e #000: e cu un fir mai cald, ca hârtia
să nu pară ecran.

**Literă.** `hartie-veche` (#f2f0eb) pentru text principal, `hartie-veche-2` (#a8a49c) pentru
text secundar, `hartie-veche-3` (#8a877f) pentru etichete mici. Contrastul, măsurat pe
raportul de luminanță WCAG, ca să nu se remăsoare:

    hartie-veche    pe noapte 17,27:1   pe noapte-3 14,60:1
    hartie-veche-2  pe noapte  7,92:1   pe noapte-3  6,70:1
    hartie-veche-3  pe noapte  5,48:1   pe noapte-3  4,63:1   (limita pentru text mic)
    arama-clar      pe noapte  6,76:1   pe noapte-3  5,72:1

**Accent.** `arama-clar` (#c98a4b), unul singur pe ecran: eticheta de deasupra titlului, sau
linia din stânga unui bloc, sau săgeata butonului. Nu toate trei.

**Linii.** `linie-noapte` (#2a2a2e) pentru chenare și despărțitoare pe fundal de noapte.

Text pe `noapte` și treptele lui se scrie NUMAI cu aceste patru culori de literă. Peste
fotografie cifrele de mai sus nu se aplică: acolo contrastul îl dă voalul din `Ecran`, iar
`axe` nu evaluează contrastul peste imagini - îl marchează „needs review" și îl lasă în afara
verdictului. O fotografie nouă se măsoară pe captură, nu se presupune.

## Cerneala urmează suprafața

O primitivă partajată ajunge azi și pe noapte, și pe o bandă deschisă rămasă dintr-o pagină
pe care încă n-a rescris-o felia ei. Dacă ar scrie `text-hartie-veche` ar fi albă pe alb
acolo; dacă ar scrie cerneala veche, ar fi neagră pe negru aici.

De aceea primitivele scriu `text-cerneala`, `text-cerneala-2`, `text-cerneala-3`,
`text-cerneala-accent` și `border-linie-suprafata`, iar suprafața de deasupra spune ce
înseamnă. Clasa de fundal e cea care decide: `bg-noapte` și treptele lui dau cerneală
deschisă, `bg-hartie`, `bg-hartie-2` și `bg-arama-moale` dau cerneală închisă. Suprafața duce
cu ea și culoarea moștenită, nu doar variabilele, deci un titlu fără nicio clasă de culoare
se așază corect singur.

Paleta veche e legată la aceleași variabile, ca alias. Paginile nerescrise încă rămân lizibile
pe negru fără să fie atinse, iar o bandă deschisă pe care o pune o pagină rămâne lizibilă cum
era. Nu scrieți cod nou cu ea.

`bg-suprafata` NU mai e o suprafață deschisă: jetonul `--color-suprafata` a trecut de la
#ffffff pe noapte, fiindcă era gaura prin care direcția veche supraviețuia tăcut - patru
fișiere îl scriau și primeau un document alb pe un site de noapte, iar mecanismul de cerneală
îl ținea peste 4,5:1, deci nicio poartă de contrast nu se înroșea. **Un mecanism de contrast
măsoară contrastul, nu coerența.** Coerența se măsoară pe suprafață: procentul de pixeli
deschiși din pagină. /termeni avea 80% la 1280 px, /confidentialitate 83%, /cookies 74%,
restul site-ului 0%. Astăzi nicio pagină nu trece de 3%, iar acel rest sunt literele însele și
cele trei pastile de stare din verificatorul de termene.

## Tipografie

`font-afis` (Barlow Condensed 700) pentru titluri, MAJUSCULE, `tracking-[-0.01em]`.
`font-vitrina` (Barlow) pentru text. `font-mono` (IBM Plex Mono) mic, cu tracking larg, pentru
cote, citări și etichete.

Scara titlurilor e una singură pe tot site-ul, și e o scară, nu o mărime:

- `text-titlu-1` = `clamp(2.5rem, 6.5vw, 6rem)`. Doar `h1`: ecranul de deschidere al
  paginii. Măsurat la 1280 px: 83,2 px.
- `text-titlu-2` = `clamp(2rem, 4.2vw, 3.5rem)`. `h2`: ecranele următoare și titlurile de
  secțiune. Măsurat la 1280 px: 53,8 px.
- antetul-bandă = `clamp(2.25rem, 5vw, 4.25rem)`, 64 px la 1280. Treapta paginilor care sunt
  documente sau unelte, ca titlul lor să rămână peste titlurile de secțiune fără să ocupe
  ecranul întreg.

**Înălțimea de rând este 1,1 la toate trei**, și la titlurile fără clasă de scară. E o cifră
măsurată, nu o preferință. Pe fontul real, la 83,2 px: virgula lui Ș coboară 15 px sub linia
de bază (0,180 em), iar cea mai înaltă capitală românească, Â/Î, urcă 74 px (0,889 em). Pasul
de rând trebuie deci să fie de cel puțin 1,070 em, plus o rezervă de 0,03 em ca marcajele să
se vadă separate.

Direcția a pornit de la 0,92, și 0,92 nu încape: rămâneau 2,54 px până la o capitală obișnuită
și MINUS 12,46 px când urma Â/Î, adică suprapunere. Se citea ca accent pe litera greșită -
„ȘASE" peste „SUBSOL" dădea „ȘUBSOL", „AȘTEAPTĂ" peste „REGISTRUL" dădea „REGÍSTRUL".
Numărate pe cele 22 de pagini, la 1280 și la 390 px: 175 de perechi Ș/Ț peste o capitală aveau
sub 2 px de spațiu. Pagina de start scăpa din întâmplarea formulării, fiindcă titlul ei nu are
ș/ț înainte de ultimul rând.

Un `h1` pe pagină, fără sărituri de nivel. Subsolul are `h2`.

Titlul se rupe unde vrea autorul, cu o rupere de rând explicită. Nu puneți o lățime maximă
strâmtă peste el: o limită de 14 caractere rupea titlurile PESTE ruperea autorului și lăsa
orfani pe rândul patru. Lățimea de acum e largă tocmai ca ruperea scrisă să rămână singura.

O etichetă de deasupra titlului nu e paragraf: se scrie `span` sau `div`, niciodată `p`. Are
majuscule din CSS, iar transformarea se vede în textul randat și nu în cel din sursă, deci un
paragraf cu majuscule sparge poarta S-17 pe unele pagini și nu pe altele. Nota lungă e în
`src/components/Ecran.tsx`.

## Ritm

Fiecare pagină se deschide cu un ecran plin: `Ecran` cu nivel `h1`, o etichetă mono, titlul
uriaș, O linie sub 40 de cuvinte, UN buton. Conținutul trebuie să încapă, cu buton cu tot,
într-un ecran de 800 px - butonul nu are voie să cadă sub margine. Se măsoară, nu se presupune:
poziția marginii de jos a butonului, pe fiecare pagină, la 1280x800 și la 390x844.

**Excepția: documentele și uneltele.** /termeni, /confidentialitate, /cookies și
/instrumente/termene-de-pastrare deschid cu `Ecran forma="banda"` - un antet de 478 px la
1280, cu titlul în stânga și linia plus butonul în dreapta. Acolo omul a venit după o clauză
sau după un termen, iar un afiș de film de 800 px îl ține departe de răspuns. Pe pagina care
ESTE o unealtă, acțiunea principală a antetului duce la unealtă, nu la o întâlnire, iar prima
secțiune e `dens`: măsurat, primul rând din tabelul de termene a urcat de la 1800 px (2,25
ecrane) la 773 px (0,97 ecrane) la 1280.

Sub el vin secțiunile, pe fundal de noapte, cu `py-24 md:py-36` între ele, titluri condensate
cu majuscule și text sub 60 de cuvinte pe bloc.

**Cadrul se umple sau nu există.** Lățimea containerului nu e o decorație pe care o alegi o
dată și o refolosești: e promisiunea că textul ajunge la marginea ei. Paginile juridice stăteau
în containerul de registru (1180 px) și declarau o coloană de conținut de 952 px, dar h2 folosea
516 și paragraful 485 - deci 436 px rămâneau goi ÎNĂUNTRUL coloanei declarate, pe 26 din 28 de
secțiuni, cu cinci margini drepte diferite pe aceeași pagină și niciuna a containerului. Pagina
de start umple cadrul pe toate cele cinci secțiuni ale ei. Reparația nu îngustează textul, ci
cadrul: `--container-act` (720 px) dă 148 px de jgheab pentru cifră plus 492 px de coloană, iar
coloana ESTE măsura - de aceea pe paginile acelea nu mai există niciun `max-w-[..ch]` scris pe
element. Două plafoane pentru aceeași măsură se abat unul de la altul; unul singur nu poate.

Măsura se verifică numărând caractere pe pagina randată, nu în `ch`: `ch` e lățimea glifei
ZERO, printre cele mai late ale fontului, iar `max-w-[74ch]` dădea 98 de caractere pe rând, nu
74. La 492 px ies 68 în medie, cu vârf la 75.

Listele tipografice: un rând = o legătură, cu numele condensat cu majuscule și o săgeată de
aramă la capăt. Pe pagina de start stau pe trei coloane, fiindcă rândul poartă doar numele;
când poartă și o descriere, ca pe /solutii, lista trece pe o coloană și rândul ține toată
lățimea. Fără grilă de cartonașe pentru aceleași date - același conținut nu are voie să apară
în două limbaje vizuale la un clic distanță.

UN buton plin pe secțiune, și în blocul de închidere, nu doar în antet. Al doilea drum se
scrie ca legătură de text subliniată (`Buton fel="text"`, sau `secundar` la `Ecran`). Două
chenare alăturate nu spun care e pasul următor.

## Fotografii

În `public/img/`: rafturi, cutii, dosare, dulapuri, sertare, mâini, legătură. Fiecare are o
variantă de 1920 px pentru ecran lat și una de 960 px servită sub 768 px; toate variantele de
960 sunt PORTRET, fiindcă un peisaj întins pe un telefon ținut vertical se mărește și se
înmoaie.

Sunt ILUSTRATIVE, de pe Pexels, cu licența în `public/img/LICENTA.md`. Textul alternativ spune
„fotografie ilustrativă". Nu se afirmă nicăieri că ar fi depozitul nostru și nu se descarcă
altele.

**Fiecare pagină are una.** Registrul e `src/content/fotografii.ts` - un singur loc care ține
numele fișierului, textul alternativ și ancora decupajului; pagina alege cheia, nu scrie
descrierea. Același cadru ajunge pe două-trei pagini, deci două descrieri scrise de mână ar
diverge la prima editare. Cheile se aleg ca paginile VECINE să nu deschidă la fel: cele șase
intrări din bara de sus au șase cadre diferite, iar cele șapte fișe de domeniu au șapte.

Voalul de sub text e LOCAL, nu pe tot ecranul: negru sub coloana de text, jos și în stânga,
plus o dungă subțire pe primii 140 px, sub bara fixă. Greul stă pe stratul din STÂNGA, unde e
coloana de text; cele două treimi din dreapta rămân fotografie. Sub 768 px voalul e mai gros,
fiindcă acolo textul ține toată lățimea și nu mai există jumătate de fotografie de apărat.
Antetul-bandă are voalul lui, mai uniform, fiindcă amândouă coloanele lui poartă text.

**Un voal constant nu dă un rezultat constant.** Fotografiile intră cu expuneri foarte diferite,
deci ce se egalizează e IEȘIREA, nu intrarea. Amplitudinea de luminanță a benzii (p95-p5),
măsurată pe captură cu textul făcut transparent, la 1280 px: cu un singur voal peste toate,
`rafturi` dădea 0,0138 (fotografia se vede), `dosare` 0,0081 (o aluzie) și `legatura` 0,0036 -
de 3,8 ori mai plat, adică 139.896 de octeți plătiți pentru șase niveluri de gri. Fiecare
fotografie își poartă acum factorul ei în registru (`voalBanda`), iar `.voal-banda` îl aplică pe
TRANSMITANȚA stratului vertical, nu pe opacitate: la 1 rămân exact valorile aprobate.

Plafonul nu-l pune ținta, îl pune litera. Voalul subțiat lasă să treacă și lumina de sub text,
iar contrastul peste fotografie nu e măsurat de `axe`. `legatura` ar fi avut nevoie de 2,9 ca să
atingă referința; la 2,9 eticheta de aramă cădea la 4,44:1 la 390 px. Stă la 2,5, unde dă 0,0108
și 4,80:1. Se scrie ce s-a măsurat: două din trei pagini ajung la referință, a treia se oprește
cu o cincime sub ea, fiindcă dincolo se plătește în literă.

Contrastul textului peste fotografie NU e măsurat de `axe`. Se măsoară pe captură, cu textul
ascuns și cu pixelii citiți sub dreptunghiurile strânse pe litere. Pragul: media peste 4,5:1
pentru text mic - eticheta de 11 px și firul de navigare sunt cele care cad primele. Măsurat
pe toate cele 22 de pagini, la 1280 și la 390: cea mai mică medie este 5,18:1. **O fotografie
nouă, o mutare de decupaj sau o schimbare de înălțime a titlului cer remăsurarea.** A treia nu
e evidentă și a fost prinsă chiar aici: titlurile mai înalte urcă blocul de text, iar blocul e
lipit de marginea de jos, deci eticheta iese din zona groasă a voalului.

## Mișcare

Două gesturi, amândouă pe primul ecran: fotografia respiră lent (`respira`, de la scara 1 la
1,04 în 20 de secunde, numai prin transformare) și eticheta, titlul, linia și butonul urcă
eșalonat (`urca`, cu treptele de la 1 la 5), o singură dată. Setarea de mișcare redusă a
sistemului le oprește pe amândouă. Fără dezvăluire la derulare pe text.

## Cum se construiește o pagină interioară

Antetul e același ecran plin ca pe pagina de start. `AntetPagina` îl compune, cu firul de
navigare deasupra etichetei, și emite datele structurate din aceeași listă.

```tsx
import AntetPagina from "@/components/AntetPagina";
import SectiuneRegistru from "@/components/SectiuneRegistru";
import ListaBifa from "@/components/ListaBifa";
import BlocDovada from "@/components/BlocDovada";

export const metadata = { alternates: { canonical: "/arhivare-fizica" } };

export default function Pagina() {
  return (
    <main id="continut">
      <AntetPagina
        adresa="/arhivare-fizica"
        fir={[{ text: "Pagina de start", href: "/" }, { text: "Arhivare fizică" }]}
        eticheta="Depozit și preluare"
        titlu="Hârtia stă pe raft, cu cotă."
        lead="O linie, sub 40 de cuvinte, care spune ce găsește omul pe pagina asta."
        actiune={{ href: "/contact", text: "Discuție de 30 de minute" }}
        secundar={{ href: "/cum-functioneaza", text: "Vedeți mecanismul" }}
        imagine={{ nume: "rafturi", alt: "Rafturi de arhivă, fotografie ilustrativă" }}
      />

      <SectiuneRegistru cota="I" eticheta="Preluare" titlu="Ce se întâmplă în prima zi">
        <ListaBifa titlu="Ce aducem" elemente={["Cutii", "Etichete", "Proces-verbal"]} />
        <BlocDovada eticheta="Ce nu putem susține încă">
          Textul care spune ce nu e confirmat. Rămâne pe pagină, nu se taie.
        </BlocDovada>
      </SectiuneRegistru>
    </main>
  );
}
```

`titlu` primește și noduri, nu doar șiruri, deci ruperea de rând se scrie acolo unde o vreți.
`imagine` vine din registrul de fotografii (`FOTOGRAFII.rafturi`); fără el, antetul stă pe
`noapte-2`, iar asta e o excepție care se argumentează, nu implicitul. `forma="banda"` e
pentru documente și unelte. `Ecran` mai primește `dovada`, o
linie de 14 px sub buton, pentru atribuiri de felul „ADRIA Servicii Arhivare, Golești -
autorizată, din 2019"; azi nu o folosește nicio pagină.

## Ce nu se face

Fără grilă de fișe identice cu icoane. Fără numere mari de ornament - un număr are voie să
existe dacă se citește, ca `Pasul 1` din `Pas`. Fără emoji. Fără antiteza „nu e X, e Y". Fără
secțiuni interschimbabile. Fără gradiente decorative, umbre sau colțuri rotunjite. Fără
sigilii despre propria noastră rigoare, de felul unei date de verificare tipărite în subsol.

Conținutul nu se inventează și nu se pierde. Textul fiecărei pagini e scris atribuit, cu
afirmațiile înregistrate în `src/content/afirmatii/`. Se REAȘAZĂ în ritmul nou - mai puțin pe
ecran, restul în secțiuni de detaliu - dar coloanele despre ce nu putem susține încă rămân,
temeiurile legale rămân, iar cifre, certificări sau clienți nu se adaugă. Ce tăiați din
pagină, tăiați și din registrul ei de afirmații.
