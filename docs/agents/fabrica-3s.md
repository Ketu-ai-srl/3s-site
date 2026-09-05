# Cum lucreaza fabrica pe 3S, in 8 pasi

> Ce citesti aici e drumul unei bucati de munca de la o intrebare a owner-ului pana la ceva vizibil
> pe `3s.ke2.in`. Definitiile agentilor sunt in `.claude/agents/`. Starile de pe tabla sunt in
> `tabla-status.md`, langa acest fisier.

**Ce e verificat la 2026-09-05, 13:45, si ce nu.** Poarta locala ruleaza: `pnpm porti` iese 0 pe
arborele curent, iar pe o fixtura cu o afirmatie neatribuita iese 1 si numeste fisierul si randul.
Cele patru definitii de agenti exista. In `.claude/scripts/fabrica/` existau la ora aceea patru
fisiere - `lib.sh`, `provizioneaza.sh`, `plieaza.sh`, `poarta.sh` - **citite, nu rulate de mine**.
**Scriptul de promovare nu exista inca**, deci comenzile din pasul 8 sunt cele planificate, iar
numele lui se confirma cand apare. Nimic din ce urmeaza nu presupune ca un script a rulat verde:
ce nu a fost masurat e marcat ca atare.

---

## Regula comuna tuturor celor patru agenti

Niciun agent nu atinge `main`, nu face push, nu face merge, nu deschide PR, nu scrie pe tabla.
Push-ul, plaitul, PR-ul si promovarea sunt ale dispecerului si ale owner-ului.

Motivul nu e neincrederea. Un PR per felie a golit bugetul de minute de Actions pe fabrica
precedenta, iar doi agenti care scriu in acelasi arbore pierd munca fara sa se anunte.

---

## Pasul 1 - felia se taie si intra pe tabla

**Cine:** owner-ul si dispecerul. **Unde:** issue in `Ketu-ai-srl/3s-site`, sablonul "Felie de lucru".

Sablonul cere doua lucruri, si niciunul nu e optional:

- **Ce trebuie sa fie adevarat la final** - rezultatul, ca stare verificabila, nu sarcina.
- **Cum se dovedeste** - comanda sau verificarea. "Am verificat vizual" nu e o dovada.

Al treilea camp, "Ce NU intra in felie", e granita care impiedica sarcina sa creasca in timpul
lucrului. Se completeaza cand exista o tentatie clara de crestere.

O felie fara criteriu de dovada nu se dispecerizeaza. Agentul o va refuza oricum, si atunci ai
platit provizionarea degeaba.

**Marimea unui lot: 2 pana la 5 felii**, cu fisiere disjuncte si o singura clasa. Plafonul
mecanic al lui `plieaza.sh` e 6 (`FABRICA_PLAFON_VAL`); 2 pana la 5 e tinta practica, nu limita.

---

## Pasul 2 - un worktree per felie

**Cine:** dispecerul.

Fiecare agent primeste arborele lui, cu ramura `felie/<numar>` deja creata, prin
`.claude/scripts/fabrica/provizioneaza.sh <numar> [slug]`. Slugul intra doar in numele
directorului, pentru citit; ramura poarta numarul. Agentul **nu isi
creeaza singur worktree-ul** si nu comuta ramura: daca ramura primita e `main`, se opreste si
raporteaza, fiindca premisa dispecerului e falsa.

Doua capcane platite deja, si de care depinde tot paralelismul:

- `node_modules` se leaga prin jonctiune intre worktree-uri, nu se reinstaleaza in fiecare.
- `git checkout -- .` **nu** revine daca fisierul e deja stagiat. Dupa orice aruncare de
  modificari se citeste `git status`, nu se presupune.

---

## Pasul 3 - agentii lucreaza in paralel, pe fisiere disjuncte

**Cine:** `dev-implementer`, `redactor-ro`, `vizibilitate`, dupa clasa feliei.

| Clasa | Agent | Ce atinge |
|---|---|---|
| cod | `dev-implementer` | `src/app/**`, `src/components/**`, `tests/**` |
| continut | `redactor-ro` | `src/content/**` si textele vizibile |
| structura | `vizibilitate` | sitemap, robots, date structurate, metadate per ruta |

Impartirea nu e organizatorica, e mecanica: singurul mod de a rula mai multi agenti simultan fara
sa se calce pe picioare e ca multimile de fisiere sa fie disjuncte.

**Dependinta reala:** felia care populeaza sursele de fapte (denumire, adrese, email) **aterizeaza
prima**; continutul si structura o citesc. Nu e o pierdere de paralelism care conteaza, fiindca e
cea mai scurta felie.

Fiecare agent scrie proba inainte de cod si verifica in mod concret ca **pica** inainte de fix.
O proba scrisa dupa cod se muleaza pe cod si nu prinde regresia.

---

## Pasul 4 - poarta locala, in fiecare worktree

```bash
bash .claude/scripts/fabrica/poarta.sh ; echo "EXIT=$?"    # sau, direct: pnpm verifica
```

`poarta.sh` nu are o lista proprie de pasi: o citeste din scriptul `verifica` din `package.json`
si o sparge pe operatorul de inlantuire. Asa nu poate diverge de ce ruleaza CI-ul, si nu prin
disciplina, ci prin constructie. Fata de `pnpm verifica` adauga codul de iesire si durata **per
pas**, plus un verdict JSON pe disc.

Lantul, in ordinea costului: `lint`, `typecheck`, `porti` (tipografie, limba, afirmatii),
`build`, `test`. Portile ieftine sunt primele prin proiectare - un pas ieftin pus dupa cel scump nu
economiseste nimic.

Codurile de iesire nu sunt doua, sunt patru, si confuzia dintre ele e cea mai scumpa:

| Cod | Ce inseamna |
|---|---|
| 0 | curat, **si** martorii portilor au trecut |
| 1 | defecte reale, cu fisier si rand |
| 2 | folosire gresita a portii |
| **3** | **NEMASURAT**: un martor a picat, deci poarta nu masoara ce spune. Nu e verde si nu e rosu. Se escaladeaza |

Fiecare poarta isi fabrica martorii **la rulare** si raporteaza starea lor. Iesirea reala arata asa:

```
CONTROALE: martor pozitiv OK, martor negativ OK
SURSA: 29 fisier(e)
AFIRMATII NEACOPERITE: 0
```

`poarta.sh` tipareste marcajul `POARTA_3S_TOTUL_VERDE` **exclusiv** cand toti pasii au iesit 0.
Ala e verdictul; nu se deduce din restul textului, si de aceea sirul nu apare nicaieri altundeva in
iesirea lui.

Interdictie neconditionata pentru orice agent: **nu se slabeste o proba existenta ca sa treaca
poarta.** Fara praguri coborate, fara sarirea unui caz, fara aserttiuni sterse. Daca o proba pare
gresita, e o constatare de raportat, nu o reparatie de facut.

---

## Pasul 5 - recenzie adversariala, pe fiecare felie

**Cine:** `dev-reviewer`, inainte de plait, pe fiecare felie in parte.

Diff-ul se ia cu **doua puncte** (`origin/main..felie/...`), nu cu trei. Vederea cu trei puncte
umfla marimea cu ce e deja pe baza: masurat, acelasi PR a aratat 17 fisiere si +1393 randuri cu
trei puncte, fata de 5 fisiere si +118 cu doua.

Revizorul produce intai o **harta de acoperire** - fiecare cerinta a issue-ului, punct cu punct, cu
ancora `fisier:linie` pe fiecare cerinta declarata acoperita - si abia apoi verdictul `ACORD` sau
`OBIECTII`. O impresie generala nu e o comparatie: ascunde exact cerinta pe care nimeni n-a
observat-o lipsind.

La incertitudine, obiecteaza. O obiectie gresita costa minute; una lipsa costa o felie de reparatie
cu val, poarta si rulare CI proprii.

---

## Pasul 6 - plait pe ramura de lot, apoi poarta pe LOT

**Cine:** dispecerul.

Feliile se impletesc pe o ramura de lot cu `plieaza.sh`, prin merge fara avans rapid, si **poarta
se ruleaza din nou, pe lot**.

```bash
bash .claude/scripts/fabrica/plieaza.sh 3 4 5
bash .claude/scripts/fabrica/poarta.sh
```

Merge-ul fara avans rapid nu e preferinta de istoric: pastreaza granita fiecarei felii, deci un lot
se poate desface inapoi pe felii. La primul conflict, `plieaza.sh` se opreste, spune ce fisiere se
bat cap in cap si cu ce felie, si lasa arborele **curat**, nu la mijloc.

Pasul asta pare redundant si nu e. **E singurul loc unde se poate prinde coliziunea de suprafata:**
doua felii cu zero suprapunere de fisiere se pot anula reciproc, una introducand un apel pe care
cealalta il interzice. Nicio recenzie pe felie nu o poate gasi, fiindca cere ca amandoua sa existe
simultan.

---

## Pasul 7 - un push, un PR de lot, o rulare CI urmarita pe SHA

**Cine:** dispecerul.

Un singur push, un singur PR pentru tot lotul. Starea se citeste **pe SHA**, obtinut cu
`git rev-parse`, niciodata pe numele ramurii.

**Asteptarea corecta de cost, nu cea naiva:** "o rulare CI per lot" e o cifra pe ramura, nu pe
aterizare. Masurat pe fabrica precedenta: push pe ramura de lot inseamna 2 rulari, iar merge-ul cu
strangere inca 2 sau 3. Un lot verde din prima costa **4 rulari**; unul cu o rulare rosie, 6.

**Frana, netransabila:** doua rulari CI rosii consecutive pe acelasi lot inseamna STOP si
diagnostic la owner inainte de alt push.

CI-ul ruleaza acelasi `pnpm verifica`, intr-un singur job, si declanseaza deploy-ul pe staging doar
pe `main` si doar la succes.

---

## Pasul 8 - promovare pe staging, cu GO, si dovada ca s-a schimbat CONTINUTUL

**Cine:** owner-ul da GO-ul, dispecerul executa.

Promovarea se face intai in gol, ca sa arate planul, si abia apoi cu confirmare explicita.

Dovada ceruta dupa deploy nu e "build success" si nu e "serviciul raspunde 200":

```bash
curl -s https://3s.ke2.in/stamp
curl -sI https://3s.ke2.in/ | grep -i "x-robots-tag"
curl -s https://3s.ke2.in/<ruta noua> > livrat.html && grep -c "<text unic din felie>" livrat.html
```

1. `/stamp` intoarce marcajul din `src/content/_stamp.json` al commit-ului construit.
2. `X-Robots-Tag: noindex` e prezent: staging-ul e public, dar neindexat pana la lansare.
3. Textul unic introdus de felie apare in HTML-ul livrat.

Si o contra-verificare, ca sa nu confundam clasele de esec: **un 503 de la Traefik nu inseamna
server picat.** Masurat pe alta infrastructura: doua gazde dadeau 503 dintr-o intrare DNS orfana in
timp ce cinci gazde de pe aceeasi masina raspundeau 200. Daca masina ar fi cazut, ai fi primit
refuz de conexiune, nu 503.

---

## Ce se cere de la om, si unde exact

Trei momente. Nimic altceva nu asteapta pe om, si nimic din cele trei nu se poate ocoli.

| Moment | Unde | Ce se cere | Ce se blocheaza fara el |
|---|---|---|---|
| **M1 - taierea feliilor** | issue pe GitHub, sablonul "Felie de lucru" | rezultatul verificabil si modul de dovada; pentru felii care ating fapte de firma, si faptul insusi | tot lotul: agentii refuza o felie fara criteriu de dovada |
| **M2 - raspuns la `fara-informatie`** | canalul feliei | cifra, data, adresa sau decizia de business pe care numai omul o detine | felia respectiva; celelalte continua |
| **M3 - GO de promovare** | inainte de comanda de promovare | confirmare explicita per actiune | pasul 8. Restul lantului e pre-autorizat pe mandat de sesiune |

**Orice esec de poarta sau de CI suspenda mandatul de sesiune** pana la diagnostic raportat. Nu se
reia dispecerizarea "ca sa nu stam", fiindca exact atunci se acumuleaza munca pe o premisa falsa.

Un al patrulea lucru se cere de la om, dar nu blocheaza: cand un agent scrie `NEVERIFICAT` in
raport, cineva trebuie sa decida daca acel gol se inchide sau se accepta. Un `NEVERIFICAT` lasat
necitit devine, in doua saptamani, o afirmatie pe care nimeni nu si-o mai aminteste ca e nesustinuta.

---

## Ce nu face fabrica

- Nu creeaza productie. Nu exista, si nu se creeaza pana cand owner-ul comunica domeniul real.
- Nu decide fondul juridic. Redacteaza forma; corectitudinea de fond a unui text legal ramane la om.
- Nu inventeaza fapte de firma. Un substituent marcat vizibil e un raspuns corect; o cifra
  aproximata nu e.
- Nu isi repara singura portile. O poarta care se inroseste gresit se raporteaza; se repara pe
  felie proprie, si petecul nu se comite pana proba nu l-a respins macar o data.
