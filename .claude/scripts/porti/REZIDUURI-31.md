# Reziduuri si zona editabila pentru cele doua porti atinse de felia 31

> **Ce e fisierul asta si de ce exista.** Felia 33 a scris sectiunile "Ce NU verifica" si
> "La rosu" direct in antetul fiecarei porti. Doua porti - `poarta-evidenta.py` si
> `poarta-tipografie.py` - sunt in acelasi timp modificate in LOGICA de felia 31, in acelasi val.
> O editare simultana pe acelasi fisier ar fi produs conflict la pliere, garantat si inutil.
>
> **Instructiune pentru dispecer, la pliere:** muta fiecare bloc de mai jos in docstringul portii
> lui, imediat inaintea randului `IESIRE:`, apoi sterge fisierul asta. Blocurile sunt scrise ca
> text de docstring, nu ca marcare: se copiaza asa cum sunt.
>
> **Contra carei versiuni sunt scrise.** Blocurile descriu codul de pe `felie/31` - fisierul in
> care ajung - nu pe cel de langa ele, de pe `felie/33`. Fiecare limita numita mai jos a fost
> citita din:
>
> ```
> MSYS_NO_PATHCONV=1 git show felie/31:.claude/scripts/porti/poarta-evidenta.py
> MSYS_NO_PATHCONV=1 git show felie/31:.claude/scripts/porti/poarta-tipografie.py
> ```
>
> Daca felia 31 se mai misca inainte de pliere, se reruleaza cele doua comenzi si se compara
> rand cu rand. Un reziduu e un fapt despre codul in care ajunge; scris despre alt cod, devine
> exact defectul pe care felia 33 il vaneaza - o limita DECLARATA care nu exista.

---

## `poarta-evidenta.py`

```
CE NU VERIFICA (reziduuri)
Intrebarea pe care o pune de fapt: "sunt intrarile din registru bine formate, si e fiecare
lista generata identica cu fisierul de pe disc?" Nu "are fiecare afirmatie de pe site o
intrare", si nu "e sursa buna".
  - NIMIC nu leaga o pagina de o intrare. Campul `unde` e un sir liber: nu se verifica nici ca
    fisierul indicat exista, nici ca textul intrarii mai apare in el. Un registru complet
    corect poate acoperi zero din afirmatiile de pe site, si poarta iese verde.
  - Starea `neconfirmat` trece intotdeauna. E deliberat - asa arata "inca nu am intrebat
    clientul" - dar inseamna ca un site intreg cu afirmatii neconfirmate e verde.
  - La `confirmat` se cere ca `sursa` si `confirmat_de` sa fie NEVIDE. Continutul lor nu se
    verifica in niciun fel: un singur caracter satisface amandoua campurile.
  - Nu se verifica formatul datei si nici ca `data` e completata.
  - Textul intrarii nu se compara cu textul paginii; o afirmatie rescrisa pe pagina lasa
    registrul cu formularea veche, si nimic nu semnaleaza.
  - Poarta asta SCRIE in arbore: regenereaza listele, sterge listele orfane si sterge forma
    veche cu un singur fisier. `--doar-raport` opreste scrierea, dar trebuie CERUT: implicit
    poarta scrie. `--radacina` alege arborele, iar implicitul e depozitul din care e rulata,
    deci o rulare fara argumente pe un arbore fabricat atinge depozitul REAL.
  - Un fisier de registru care nu e o lista, sau care nu e JSON valid, intoarce 1 imediat: din
    momentul acela restul registrului nu mai e citit deloc.

LA ROSU: CE AI VOIE SA EDITEZI
  DA  fisierele din src/content/afirmatii/, unde se adauga sau se repara intrari.
      Listele regenerate din docs/afirmatii/, comise in ACELASI commit cu registrul.
  NU  OBLIGATORII, STARI, probleme(), genereaza_lista(), controale().
      O intrare nu se repara mutand-o din `confirmat` in `neconfirmat` ca sa taca poarta:
      atunci se pierde chiar informatia pentru care exista registrul.
```

---

## `poarta-tipografie.py`

```
CE NU VERIFICA (reziduuri)
Poarta asta nu masoara ea insasi nimic: aduna o lista de fisiere si transmite verdictul
detectorului. Intrebarea pe care o pune de fapt: "are vreunul dintre fisierele pe care le-am
ADUNAT EU vreunul dintre punctele de cod pe care le vaneaza detectorul?" Deci acoperirea ei e
exact lista ei de fisiere, si nimic mai mult.
  - Din `.claude` intra in CAI o singura cale, scrisa intreaga: `.claude/scripts/porti`.
    Restul - memoria de proiect, regulile de sesiune - ramane nescanat fiindca nu e in CAI,
    nu fiindca ar fi in SARITE; acolo `.claude` nu mai apare.
  - Se aduna din src, docs, tests, .github si .claude/scripts/porti, plus README.md din
    radacina. CLAUDE.md, CONTEXT.md, package.json, Dockerfile, config/ si public/ raman
    nemasurate.
  - Doar extensiile din EXTENSII. Un .txt, un .html sau un .svg cu o liniuta lunga trece.
  - Reziduurile DETECTORULUI (alte liniute din Unicode, ghilimele tipografice, puncte de
    suspensie, spatii neintrerupte, codificari non-UTF-8) se aplica intacte si aici; sunt
    scrise in antetul lui tipografie-liniute.py.
  - Lista goala iese 3, nu 0 - singurul lucru pe care poarta asta il verifica singura.

LA ROSU: CE AI VOIE SA EDITEZI
  DA  fisierul raportat, in care liniuta lunga devine cratima.
  NU  CAI, EXTENSII, SARITE prin INGUSTARE. Largirea lor e libera si e chiar imbunatatirea de
      facut; scoaterea unui director sau a unei extensii din multimea masurata ca sa treaca
      lotul e slabire.
```
