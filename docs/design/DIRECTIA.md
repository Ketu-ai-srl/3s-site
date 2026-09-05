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
deschisă, `bg-hartie`, `bg-hartie-2` și `bg-suprafata` dau cerneală închisă. Suprafața duce
cu ea și culoarea moștenită, nu doar variabilele, deci un titlu fără nicio clasă de culoare
se așază corect singur.

Paleta veche e legată la aceleași variabile, ca alias. Paginile nerescrise încă rămân lizibile
pe negru fără să fie atinse, iar o bandă deschisă pe care o pune o pagină rămâne lizibilă cum
era. Nu scrieți cod nou cu ea.

## Tipografie

`font-afis` (Barlow Condensed 700) pentru titluri, MAJUSCULE, `tracking-[-0.01em]`.
`font-vitrina` (Barlow) pentru text. `font-mono` (IBM Plex Mono) mic, cu tracking larg, pentru
cote, citări și etichete.

Scara titlurilor e una singură pe tot site-ul, și e o scară, nu o mărime:

- `text-titlu-1` = `clamp(2.5rem, 6.5vw, 6rem)`, înălțime de rând 0,92. Doar `h1`: ecranul de
  deschidere al paginii. Măsurat la 1280 px: 83,2 px.
- `text-titlu-2` = `clamp(2rem, 4.2vw, 3.5rem)`, înălțime de rând 0,95. `h2`: ecranele
  următoare și titlurile de secțiune. Măsurat la 1280 px: 53,8 px.

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
într-un ecran de 800 px - butonul nu are voie să cadă sub margine.

Sub el vin secțiunile, pe fundal de noapte, cu `py-24 md:py-36` între ele, titluri condensate
cu majuscule și text sub 60 de cuvinte pe bloc.

Listele tipografice stau pe O coloană, fără săgeată pe fiecare rând. Săgeata e a butonului.

## Fotografii

În `public/img/`: rafturi, cutii, dosare, dulapuri, sertare, mâini, legătură. Fiecare are o
variantă de 1920 px pentru ecran lat și una de 960 px servită sub 768 px; toate variantele de
960 sunt PORTRET, fiindcă un peisaj întins pe un telefon ținut vertical se mărește și se
înmoaie.

Sunt ILUSTRATIVE, de pe Pexels, cu licența în `public/img/LICENTA.md`. Textul alternativ spune
„fotografie ilustrativă". Nu se afirmă nicăieri că ar fi depozitul nostru și nu se descarcă
altele.

Voalul de sub text e LOCAL, nu pe tot ecranul: negru sub coloana de text, jos și în stânga,
plus o dungă subțire pe primii 140 px, sub bara fixă. Restul fotografiei rămâne fotografie.

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
`imagine` e opțional: fără el, antetul stă pe `noapte-2`. `Ecran` mai primește `dovada`, o
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
