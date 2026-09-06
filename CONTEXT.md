# Glosar 3S

Termenii care apar in cod, in issue-uri si in discutie. Fiecare are cel mult trei randuri si o trimitere unde traieste detaliul.

| Termen | Ce inseamna | Unde e detaliul |
|---|---|---|
| **3S** | Marca "Scan Store Solve": arhivare fizica autorizata, digitalizare si cautare AI in documente. Firma din spate e in curs de infiintare. | `docs/adr/ADR-0001-stiva-si-medii.md` |
| **ADRIA** | ADRIA SERVICII ARHIVARE SRL, Pitesti - firma-mama, operator de arhivare. Orice afirmatie de vechime sau autorizare vine de la ea si se scrie ATRIBUIT. | `.claude/rules/afirmatii-atribuite.md` |
| **SerenityFlow** | Platforma care exista deja si face munca. Site-ul nu o contine: doar vinde si trimite spre ea. | - |
| **staging** | `3s.ke2.in` - mediul de proba, inchis cu autentificare de baza si marcat `noindex`. Singurul mediu care exista azi. | `src/middleware.ts` |
| **productie** | Nu exista inca. Se creeaza cand owner-ul comunica domeniul real. | `docs/adr/ADR-0001-stiva-si-medii.md` |
| **marcaj de livrare** | Valoarea din `src/content/_stamp.json`, servita la `/stamp`. Dovedeste ca deploy-ul a schimbat continutul livrat, nu doar ca serviciul raspunde. | `src/app/stamp/route.ts` |
| **poarta** | O comanda care intoarce 0 sau 1 si opreste munca daca da 1. Nu e o intentie, e un cod de iesire. | `package.json`, scriptul `verifica` |
| **val** (lot) | Un grup de 2-5 felii duse impreuna: agenti in worktree separat, poarta locala, un singur push, o singura rulare CI, promovare pe `main` prin API. Masinaria (scripturi, agenti, orchestrare) sta in depozitul PRIVAT `Ketu-ai-srl/3s-fabrica`; aici raman doar portile site-ului. | `.claude/scripts/porti/` (portile), depozitul `3s-fabrica` (masinaria) |
| **discutia de 30 de minute** | Actiunea principala a site-ului. Nu vindem proba gratuita, vindem o discutie. | - |
