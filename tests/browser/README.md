# Portile de browser

Cinci porti care cer un browser adevarat. Ruleaza pe serverul LOCAL, construit din arborele
curent (`pnpm build` plus `next start` pe un port liber), niciodata pe staging: o poarta care
depinde de reteaua publica se inroseste din motive straine de cod si se invata a fi ignorata
exact pana in ziua in care avea dreptate.

## Comenzi

| Comanda | Ce ruleaza |
|---|---|
| `node .claude/scripts/porti/browser-toate.mjs` | toate cinci, un build, un server, o rulare |
| `node .claude/scripts/porti/browser-accesibilitate.mjs` | `PA-03` plus `PA-05` |
| `node .claude/scripts/porti/browser-html-brut.mjs` | `S-17` |
| `node .claude/scripts/porti/browser-derapaj.mjs` | derapaj orizontal la 390 px |
| `node .claude/scripts/porti/browser-consimtamant.mjs` | `C-01` |
| `node .claude/scripts/porti/browser-legaturi.mjs` | legaturi si imagini |

`SARI_BUILD=1` sare peste build cand arborele e deja construit. Probele se pot rula si direct:
`pnpm exec playwright test --config tests/browser/playwright.config.ts`, dar atunci se pierde
traducerea codurilor de iesire, deci si distinctia dintre "pica" si "NEMASURAT".

## Coduri de iesire

`0` trece. `1` a picat o proba. `2` folosire gresita. `3` NEMASURAT: build picat, raport JSON
necitit, zero probe rulate, un detector care a refuzat sa masoare, sau martori care nu au rulat
amandoi. Ultimul caz e regula din PORTI-FABRICA.md §1.2: o poarta fara control pozitiv nu e
poarta, e o decoratiune, iar verdictul ei nu are voie sa fie "curat".

## Ce masoara fiecare, si pragul

| Poarta | Prag | Sursa pragului |
|---|---|---|
| Accesibilitate | zero incalcari `serious` sau `critical`; `minor` si `moderate` se raporteaza | `PA-03`, `PA-05` |
| Raspuns in HTML brut | titlul si primele doua paragrafe ale paginii randate exista in HTML-ul livrat fara JavaScript | `S-17`, spiritul lui `S-08` |
| Derapaj orizontal | `scrollWidth <= innerWidth` la 390 px | `<<din cercetare>>`, catalogul nu are poarta de derapaj |
| Consimtamant | zero gazde straine, zero cookie-uri, zero stocare, fara interactiune si dupa refuz | `C-01` |
| Legaturi si imagini | zero legaturi interne moarte, zero ancore fara tinta, zero imagini fara `alt` | `PA-04`, `S-07`, `S-15` |

## Doua lucruri care nu sunt de comoditate

**Asteptarile se deriva, nu se scriu.** Rutele publice vin din `src/app`, nu dintr-o lista.
Titlul si paragrafele cerute in HTML-ul brut vin din randarea cu JavaScript a aceleiasi pagini.
O constanta scrisa de mana se inroseste in ziua in care cineva face lucrul corect.

**`innerWidth` se citeste, nu se presupune.** Raportul de pixeli al masinii nu e constant intre
rulari, deci nu exista factor de inmultit. Dupa fiecare redimensionare, poarta citeste
`innerWidth` din pagina si il scrie in raport, langa `scrollWidth` si `devicePixelRatio`.

## Fixturile

Paginile-martor se asambleaza la RULARE, intr-un server pe `127.0.0.1` cu port ales de sistem
(`ajutor/fixturi.ts`). Nu stau ca fisiere `.html` in arbore fiindca o proba care poarta literal
ce vaneaza devine ea insasi o instanta a defectului si inroseste alte porti pe cod corect.
Gazdele straine folosite de martorii pozitivi sunt sub TLD-ul rezervat `.invalid`, deci
controlul nu produce trafic real catre nimeni; browserul inregistreaza cererea inainte de DNS,
si exact asta se masoara.
