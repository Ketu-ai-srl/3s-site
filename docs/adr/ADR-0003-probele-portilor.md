# ADR-0003: Probele portilor ruleaza inaintea portilor

**Data:** 2026-09-06 · **Stare:** acceptata

## Context

Trei lucruri masurate in aceeasi zi, pe arborele nostru:

1. **Probele cu mutant nu erau cablate nicaieri.** `proba-juridic.py`, `proba-seo.py` si
   `proba-regresie.py` existau, treceau, si nu le rula nimic: nici `verifica`, nici CI-ul.
   Nivelul cel mai adanc de verificare din proiect nu se atingea niciodata singur.
2. **Martorii portilor traiesc INAUNTRUL portilor.** Fiecare `poarta-*.py` are `controale()`,
   si acolo se cheama functia interna - `probleme()`, `analizeaza()`, `compara()`. Proba si
   lucrul probat sunt acelasi proces. Ce ramane nemasurat e stratul care se strica in practica:
   argumentele, citirea de pe disc si codul de iesire. O poarta care gaseste defectul, il
   tipareste corect si iese 0 trece prin toti martorii ei.
3. **Nimic nu masura inventarul.** O poarta scrisa si necablata nu apara nimic si nu se vede;
   `tests/browser/README.md` spunea „cinci porti" cand pe disc erau sase spec-uri. Fiecare
   poarta masoara CONTINUTUL site-ului; nici una nu punea o intrebare despre INVENTAR.

## Decizie

**1. `porti:probe` intra in `verifica`, imediat inaintea lui `porti:sursa`.**

Contractul e o PRECONDITIE a portii, nu un pas paralel: o poarta nu are voie sa ruleze pe logica
nevalidata. Asezarea e cea mai ieftina posibila - niciuna dintre probe nu cere build, fiecare isi
fabrica arborele in `temp` si cheama poarta ca proces, deci pasul incape inaintea lui `build`.
Durata masurata a lantului intreg: **48,5 s** (plafon declarat: 60 s). Daca vreo proba viitoare
ajunge sa aiba nevoie de build, ea se muta dupa `build`, nu se muta pasul.

Un pas ieftin asezat dupa unul scump nu economiseste nimic - regula e scrisa in antetul lui
`browser-toate.mjs` si de acolo o citeste verificarea de ordine, ca sa nu existe doua exemplare
ale ei care pot diverge.

**2. Partea B a contractului: fiecare poarta se probeaza si ca PROCES.**

`proba-porti-proces.py` ruleaza fiecare `poarta-*.py` ca subproces pe un arbore fabricat si
pineaza codul de iesire plus textul care numeste defectul: un caz care trebuie sa iasa 1, unul
care trebuie sa iasa 0, si - unde poarta are preconditie - unul care trebuie sa iasa 3. Partea A
(ce intoarce logica pura) ramane in `controale()`, unde e.

Cusatura pentru arborii fabricati nu cere modificarea portilor: cele cu `--radacina` se cheama cu
el, cele care isi deduc radacina din propria cale se copiaza in `<temp>/.claude/scripts/porti/`
si se ruleaza copia. Ce accepta fiecare se citeste din sursa portii la fiecare rulare, nu dintr-o
lista scrisa de mana - o lista de nume imbatraneste in ziua in care cineva adauga un argument.

**3. Completitudinea se verifica mecanic, nu prin disciplina.**

`proba-completitudine.py` compara ce e pe disc cu ce e in lant: porti contra `porti:sursa` si
`porti:build`, probe contra `porti:probe`, spec-uri de browser contra martorilor pe care
rulatorul ii cere, si ordinea pasilor din `verifica`. E acelasi control care exista deja pentru
probele fabricii (lista scrisa comparata cu `ls`), replicat pe cele patru inventare ale noastre.

Verificarea merge in ambele sensuri: un fisier de pe disc necablat pica, dar si un pas care
cheama un fisier care nu mai exista.

**4. Asteptarile se ancoreaza in afara codului probat.**

Codurile de iesire folosite de `proba-porti-proces.py` se citesc din `browser-rulator.mjs` - alt
fisier, alta limba, si singurul loc unde contractul casei e publicat ca text. Marcajele martorilor
din titlurile spec-urilor se citesc din acelasi rulator, care e codul care le CERE. Cifra
martorului negativ al portii de tipografie (cate U+2500 avea fisierul din incidentul cu numararea
pe octeti) se citeste din antetul detectorului. Cand ancora dispare, proba iese 3, nu 0.

**5. `poarta-evidenta.py` capata `--radacina` si `--doar-raport`.**

E singura poarta care SCRIE in arbore. Fara `--radacina`, o rulare pe un arbore fabricat scria in
depozitul real si ii murdarea `fisiere_murdare` din verdict. `--doar-raport` spune ce ar regenera
si iese 1 daca difera, fara sa atinga nimic. In `verifica` ramane comportamentul de azi -
regenerarea - fiindca lista trebuie sa ajunga in acelasi commit cu registrul.

**6. Portile intra in igiena pe care o impun.**

`poarta-tipografie.py` sarea `.claude`, deci nicio poarta nu trecea prin detectorul de liniute
lungi. Scutirea nu avea motiv scris, si o scutire nemotivata se re-examineaza: masurat, zero
liniute lungi in cele 22 de fisiere ale directorului, deci includerea nu costa nimic azi si prinde
ce ar veni maine. Restul lui `.claude` ramane afara - `.claude/scripts/porti` e numit pe cale
intreaga, nu prin numele directorului parinte.

## Consecinte

- `verifica` are un pas in plus, cu 48,5 s masurate. Rosul vine acum mai devreme si mai ieftin:
  o poarta stricata se vede inainte de build, nu dupa.
- Doua porti nu au caz de cod 3 in `proba-porti-proces.py`, si motivul e scris in fisier si
  tiparit la fiecare rulare: `poarta-scurgeri.py` si `poarta-tipografie.py` isi scaneaza propriul
  fisier, deci ramura „zero fisiere" e inaccesibila prin constructie. Un zero de acolo nu e
  acoperire, si asta se spune, nu se lasa dedus.
- `tests/browser/README.md` nu mai contine numarul spec-urilor. O cifra scrisa de mana intr-un
  document imbatraneste in tacere; lista adevarata e `ls`, si e verificata mecanic.
