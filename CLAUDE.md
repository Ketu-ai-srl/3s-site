# 3S Site - reguli de lucru

Site public de vanzare pentru marca **3S - Scan Store Solve**. Repo **PUBLIC**.

## Inainte de orice modificare

1. Citeste `CONTEXT.md` (glosarul) si `.claude/rules/INDEX.md` (routerul de reguli).
2. Ruleaza poarta locala: `pnpm verifica`. Nimic nu pleaca spre GitHub fara ea verde.

## Reguli dure

- **Tipografie: doar cratima.** Niciodata em-dash sau en-dash. Poarta `pnpm porti` o verifica.
- **Diacritice complete** in tot textul vizibil, si o singura forma de adresare pe tot site-ul.
- **Fara preturi** pe site (decizie owner). Pagina de investitie explica ce influenteaza costul.
- **Afirmatiile de vechime se scriu atribuit** catre ADRIA, firma-mama. Vezi regula dedicata.
- **Fara telefon** pe site: formular si email.
- Butonul principal duce mereu la **discutia de 30 de minute**.

## Dovada, nu declaratia

Un deploy se dovedeste cu `/stamp`, comparat cu `src/content/_stamp.json` din commit.
"Serviciul raspunde 200" nu e dovada.
