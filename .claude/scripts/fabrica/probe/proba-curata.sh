#!/usr/bin/env bash
# proba-curata.sh - masoara ce face `curata.sh`.
#
# MARTOR POZITIV (trebuie sa inroseasca): un worktree cu un fisier necomis. Scriptul iese 1 si NU
# sterge nimic - nici macar worktree-urile inchise, fiindca o curatenie partiala ascunde exact
# problema care trebuie vazuta.
#
# MARTOR NEGATIV (forma corecta, NU trebuie prinsa): un worktree curat al carui continut e deja in
# main. Se raporteaza inchis si, cu `--aplica`, se scoate.
#
# CONTROLUL CEL MAI IMPORTANT: dupa `--aplica`, `node_modules` al RADACINII trebuie sa fie intact.
# Worktree-ul il vede printr-o jonctiune, iar o stergere care ar urma-o ar goli instalarea comuna.

set -uo pipefail
source "$(dirname "${BASH_SOURCE[0]}")/lib-proba.sh"

RADACINA_FIXTURA="$(mktemp -d "${TMPDIR:-/tmp}/cu-repo-XXXXXX")"
META_FIXTURA="$(mktemp -d "${TMPDIR:-/tmp}/cu-meta-XXXXXX")"
trap 'curata_fixtura "$META_FIXTURA"; curata_fixtura "$RADACINA_FIXTURA"' EXIT

export FABRICA_RADACINA="$RADACINA_FIXTURA"
export FABRICA_META="$META_FIXTURA"
SCRIPT="$FABRICA_DIR/curata.sh"
PROVIZIONEAZA="$FABRICA_DIR/provizioneaza.sh"
R="$RADACINA_FIXTURA"

depozit_fixtura "$R"
unelte_false "$R"

# Cele trei felii se provizioneaza cu scriptul REAL, nu cu `git worktree add` de mana: proba
# masoara lantul asa cum ruleaza, inclusiv marcajul de proprietate si jonctiunea.
bash "$PROVIZIONEAZA" 1 gata     >/dev/null 2>&1
bash "$PROVIZIONEAZA" 2 in-lucru >/dev/null 2>&1
bash "$PROVIZIONEAZA" 3 avansata >/dev/null 2>&1

WT1="$META_FIXTURA/felie-1-gata"
WT2="$META_FIXTURA/felie-2-in-lucru"
WT3="$META_FIXTURA/felie-3-avansata"

# felia 2 are munca necomisa
printf 'ceva ce nu s-a salvat inca\n' > "$WT2/schita.txt"
# felia 3 are un commit propriu, deci continutul ei nu e in main
printf 'text nou\n' > "$WT3/adus-de-felia-3.txt"
git -C "$WT3" add -A && git -C "$WT3" commit -q -m "felia 3 aduce ceva"

# un worktree care NU e al fabricii: fara marcaj de proprietate
git -C "$R" worktree add -q --no-track -b "altceva/manual" "$META_FIXTURA/manual" main

titlu "ajutor si folosire gresita"
ruleaza bash "$SCRIPT" --ajutor
cod_este 0 "--ajutor iese 0"
contine "curata.sh [optiuni]" "--ajutor descrie folosirea"

ruleaza bash "$SCRIPT" --stergi-tot
cod_este 2 "MARTOR POZITIV: argument necunoscut = folosire gresita"

titlu "MARTOR POZITIV: munca necomisa opreste totul"
ruleaza bash "$SCRIPT" --aplica
cod_este 1 "se opreste cu 1 cand gaseste munca necomisa"
contine "MUNCA NECOMISA" "raportul are sectiunea de munca necomisa"
contine "felie-2-in-lucru" "numeste worktree-ul vinovat"
contine "1 fisiere necomise" "spune cate fisiere"
adevarat test -d "$WT1"
adevarat test -d "$WT2"
adevarat test -d "$WT3"
contine "examinate: 4" "controlul de numaratoare se tipareste"

titlu "clasificarea, dupa ce munca necomisa dispare"
rm -f "$WT2/schita.txt"
ruleaza bash "$SCRIPT"
cod_este 0 "raportul curat iese 0"
contine "INCHISE" "sectiunea de felii inchise exista"
contine "felie-1-gata" "felia fara schimbari e clasificata"
contine "DESCHISE" "sectiunea de felii deschise exista"
contine "felie-3-avansata" "felia cu continut propriu e numarata ca deschisa"
contine "1 commituri proprii" "raportul spune cate commituri are felia deschisa"
contine "STRAINE" "sectiunea de worktree-uri straine exista"
contine "fara marcaj de proprietate" "worktree-ul strain e recunoscut dupa marcaj, nu dupa nume"
contine "raport, nu stergere" "fara --aplica nu se sterge nimic"
adevarat test -d "$WT1"

titlu "MARTOR NEGATIV: --aplica scoate doar feliile inchise"
INAINTE="$(git -C "$R" worktree list | wc -l | tr -d ' ')"
ruleaza bash "$SCRIPT" --aplica
cod_este 0 "stergerea iese 0"
# Feliile 1 si 2 sunt amandoua inchise: dupa ce fisierul necomis a fost sters, arborele feliei 2 a
# redevenit identic cu main. Prima versiune a acestei probe cerea sa supravietuiasca, si gresea
# proba, nu scriptul - "a avut cindva munca necomisa" nu e o proprietate a starii de acum.
fals test -d "$WT1"
fals test -d "$WT2"
adevarat test -d "$WT3"
adevarat test -d "$META_FIXTURA/manual"
DUPA="$(git -C "$R" worktree list | wc -l | tr -d ' ')"
if [ "$DUPA" = "$(( INAINTE - 2 ))" ]; then
  reusit "au disparut exact doua randuri din lista ($INAINTE -> $DUPA): cele doua felii inchise"
else
  picat "lista s-a schimbat altfel decat se astepta: $INAINTE -> $DUPA (asteptat $(( INAINTE - 2 )))"
fi

titlu "CONTROL: instalarea comuna a supravietuit"
adevarat test -f "$R/node_modules/.bin/tsc"
adevarat test -f "$R/node_modules/.pnpm/pachet-de-referinta/adanc/mai/adanc/fisier-lung-de-referinta.js"

titlu "ramurile nu se sterg odata cu directoarele"
adevarat git -C "$R" show-ref --verify --quiet "refs/heads/felie/1"

titlu "MARTOR POZITIV: baza inexistenta = NEMASURAT, nu 'nimic de curatat'"
ruleaza bash "$SCRIPT" --baza ramura-inexistenta
cod_este 3 "fara baza nu exista criteriu, deci nu exista raport"

raport_final
