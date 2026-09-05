# Cum se citeste tabla "Fabrica 3S"

Tabla e **Project 1 pe organizatia `Ketu-ai-srl`**, cu titlul `Fabrica 3S` si identificatorul
`PVT_kwDOE2JfZc4BihkW`.

```bash
gh api graphql -f query='query{ organization(login:"Ketu-ai-srl"){ projectV2(number:1){
  id title fields(first:30){ nodes{
    ... on ProjectV2SingleSelectField { name options{name} }
    ... on ProjectV2Field { name } } } } }'
```

## Coloana `Status` e singura masina de stare

Decizia e in `docs/adr/ADR-0002-un-singur-canal-de-stare.md` si are un motiv masurat pe proiectul
precedent: doua masini de stare traiau in paralel, etichetele si coloana `Status`, si au divergit
tacit. Un contor raporta "totul e triat" in timp ce eticheta care il hranea ajunsese la zero
purtatori. Pe 24.08.2026 toate etichetele de stare au fost sterse din ambele depozite.

Consecinta operationala, si e neintuitiva: un filtru pe o eticheta care nu exista **nu esueaza**.
Intoarce zero randuri, adica arata exact ca o masuratoare. E mai periculos decat un filtru rupt.

**Etichetele de aici nu descriu stari.** Raspund la alte intrebari, si sunt versionate in
`.github/labels.yml`, aplicate din fisier, nu de mana:

| Familie | Ce raspunde |
|---|---|
| `zona:continut`, `zona:cod`, `zona:seo`, `zona:infra`, `zona:legal` | ce suprafata se atinge, deci care agent si care regula |
| `limba:ro` | in ce limba e continutul |
| `agent:implementer`, `agent:reviewer` | cine lucreaza acum pe ea |
| `poarta:blocheaza-lansarea` | nu se lanseaza in productie cat timp e deschis |
| `nu-atinge` | decizie umana in asteptare; **agentii nu lucreaza pe ea**, indiferent de `Status` |

Nicio eticheta de prioritate: prioritatea e ordinea pe tabla.

## Starea masurata azi, 2026-09-05

Interogarea de mai sus, rulata in aceasta sesiune, intoarce pentru `Status` exact trei optiuni:

```
Status: Todo | In Progress | Done
```

Deci **tabla e inca in configuratia implicita a GitHub**, iar campul `Blocat pe` **nu exista**.
Pana cand cineva schimba asta, se citeste literal ce e acolo, si orice raport care foloseste alte
nume descrie o tabla care nu exista:

| `Status` | Ce inseamna azi, verificabil |
|---|---|
| `Todo` | intrata pe tabla. Nu spune daca e triata, daca are criteriu de dovada, sau daca e gata de dispecerizat |
| `In Progress` | cineva a inceput. Nu spune daca e agent sau om, si nici in ce worktree |
| `Done` | inchisa. Nu spune unde a ajuns munca: pe `main`, pe staging, sau doar in verdictul unui agent |

Cele trei stari sunt suficiente ca sa nu pierzi o felie si insuficiente ca sa raspunzi la
intrebarea care conteaza in fabrica, adica **pe cine se asteapta**.

## Setul propus, cand tabla se configureaza

Nu e implementat. E propunerea, cu criteriul de trecere scris langa fiecare stare, fiindca o stare
fara criteriu verificabil devine o parere:

| Stare propusa | Trece in ea cand |
|---|---|
| `Noua` | a intrat pe tabla, netriata |
| `Planificata` | are cele doua campuri obligatorii din sablon completate |
| `Coada` | e gata de dispecerizat: criteriu de dovada scris, fisiere disjuncte de restul lotului |
| `In lucru` | worktree provizionat pentru ea |
| `Revizuita` | `dev-reviewer` a dat `ACORD`, sau obiectiile au fost inchise |
| `Pe main` | numarul feliei e citat intr-un commit de pe `origin/main` |
| `Pe staging` | `/stamp` de pe `3s.ke2.in` raporteaza commitul care o contine |

Plus un camp `Blocat pe`, cu valorile `Nimic`, `Om`, `Agent`, `Extern`. Spune **pe cine** se
asteapta, nu unde a ajuns. "Asteapta o cifra de la owner" inseamna `Blocat pe: Om`. Dispecerul
alimenteaza numai din `Coada` cu `Blocat pe: Nimic`.

**"Nu se face" nu e o stare.** Se inchide issue-ul ca neplanificat si `Status` ramane cum e. Un
`Livrat` pus pe ceva ce nimeni n-a livrat e o afirmatie falsa pe care orice masura de debit o
numara apoi ca livrare.

## Avertisment inainte de a modifica optiunile coloanei

**Operatia care pare aditiva este distructiva.** Mutatia GraphQL care actualizeaza un camp de tip
alegere unica **rescrie intreaga lista de optiuni si sterge valorile TUTUROR elementelor**, chiar
si cand optiunile existente sunt retrimise identic. Masurat pe proiectul precedent: 90 de marcaje
pierdute, recuperate dintr-o copie de siguranta.

Semnul general, valabil dincolo de cazul asta: cand parametrul e la plural si nu exista alaturi o
operatie de adaugare si una de stergere, e **inlocuire**, nu adaugare. Inainte de o astfel de
scriere se salveaza ce refera elementele rescrise.

Deci: configurarea coloanei se face **o data**, deliberat, cu lista completa scrisa dinainte si cu
valorile curente exportate, nu incremental pe masura ce apar stari noi.

## Ce citeste si ce scrie fabrica

- **Agentii nu scriu pe tabla.** Nici implementatorul, nici revizorul, nici redactorul, nici agentul
  de vizibilitate. Verdictele lor merg in canalul feliei.
- **Dispecerul citeste** ca sa aleaga feliile lotului, si scrie starea dupa aterizare.
- **Owner-ul** decide taierea si da GO-ul de promovare.

Un raport de fabrica care spune "felia e pe staging" fara sa fi cerut `/stamp` relateaza tabla, nu
realitatea. Tabla e o afirmatie despre lume, verificata ultima data cand a scris-o cineva.
