# Regulile se incarca pe cale, nu se cauta intr-un router

Fiecare regula din directorul asta isi declara singura suprafata, in frontmatter-ul `paths`. Cine
atinge un fisier primeste regulile a caror suprafata il contine; nu exista un pas in care cineva
alege ce sa citeasca.

Randurile de mai jos sunt harta suprafetelor, nu un pas obligatoriu de lectura.

| Regula | Suprafata declarata |
|---|---|
| `afirmatii-atribuite.md` | textul vizibil al site-ului si registrul de afirmatii |
| `zero-secrete-in-cod.md` | tot arborele, mai putin dependintele si iesirile de build |
| `verifica-preconditii-externe.md` | scripturile de mediu, lantul de integrare, deciziile de arhitectura |
| `masoara-adevarul-nu-surogatul.md` | portile si probele |
| `la-rosu-se-justifica.md` | portile, probele si pragurile lor |

## Doua lucruri de stiut despre forma asta

**`paths` e o declaratie, nu un mecanism al depozitului.** Nimic din `pnpm verifica` nu o citeste;
o citeste unealta cu care lucreaza agentul. Cifrele suprafetelor au fost masurate contra
`git ls-files` cand au fost scrise, si se remasoara la fel cand se schimba.

**Fiecare regula e auto-continenta.** Niciuna nu spune "tine si cealalta". Cand doua reguli au
nevoie de aceeasi propozitie, propozitia se scrie in amandoua: un pointer moare tacut cand tinta
lui e stearsa, o duplicare nu.

Regulile sunt scurte prin proiectare. Daca una creste peste o pagina, se taie. Formatul si motivul
fiecarei alegeri: `docs/adr/ADR-0005-format-reguli.md`.
