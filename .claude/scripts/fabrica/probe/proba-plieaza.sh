#!/usr/bin/env bash
# proba-plieaza.sh - masoara ce face `plieaza.sh`.
#
# MARTOR NEGATIV (forma corecta): doua felii cu suprafete disjuncte se pliaza, scriptul iese 0,
# ramura de lot exista si contine ambele modificari.
#
# MARTOR POZITIV (trebuie sa inroseasca): doua felii care schimba acelasi rand din acelasi fisier -
# scriptul iese 1, NUMESTE fisierul, spune cu care felie deja plaita se bate, si lasa arborele
# CURAT, nu la mijlocul unui merge.
#
# Al doilea martor pozitiv: plafonul valului. Cu 7 felii peste un plafon de 6, scriptul iese 1
# INAINTE sa atinga vreo ramura.

set -uo pipefail
source "$(dirname "${BASH_SOURCE[0]}")/lib-proba.sh"

RADACINA_FIXTURA="$(mktemp -d "${TMPDIR:-/tmp}/pl-repo-XXXXXX")"
META_FIXTURA="$(mktemp -d "${TMPDIR:-/tmp}/pl-meta-XXXXXX")"
trap 'curata_fixtura "$META_FIXTURA"; curata_fixtura "$RADACINA_FIXTURA"' EXIT

export FABRICA_RADACINA="$RADACINA_FIXTURA"
export FABRICA_META="$META_FIXTURA"
SCRIPT="$FABRICA_DIR/plieaza.sh"
R="$RADACINA_FIXTURA"

depozit_fixtura "$R"
unelte_false "$R"

printf 'randul comun, versiunea de baza\nal doilea rand\n' > "$R/comun.txt"
printf 'baza\n' > "$R/a.txt"
printf 'baza\n' > "$R/b.txt"
git -C "$R" add -A && git -C "$R" commit -q -m "fisiere de plecare"

# felie <numar> <fisier> <continut> - o ramura cu exact o schimbare, construita la rulare.
felie() {
  git -C "$R" checkout -q -b "felie/$1" main
  printf '%s\n' "$3" > "$R/$2"
  git -C "$R" add -A
  git -C "$R" commit -q -m "felia $1 atinge $2"
  git -C "$R" checkout -q main
}

felie 1 a.txt "schimbat de felia 1"
felie 2 b.txt "schimbat de felia 2"
felie 3 comun.txt "randul comun, versiunea feliei 3"
felie 4 comun.txt "randul comun, versiunea feliei 4"
for n in 5 6 7 8 9; do felie "$n" "fisier-$n.txt" "felia $n"; done

titlu "ajutor si folosire gresita"
ruleaza bash "$SCRIPT" --ajutor
cod_este 0 "--ajutor iese 0"
contine "plieaza.sh [optiuni] <felie...>" "--ajutor descrie folosirea"

ruleaza bash "$SCRIPT"
cod_este 2 "MARTOR POZITIV: fara felii = folosire gresita"

ruleaza bash "$SCRIPT" 1 1
cod_este 2 "MARTOR POZITIV: aceeasi felie de doua ori"

ruleaza bash "$SCRIPT" 42
cod_este 1 "MARTOR POZITIV: felie inexistenta = refuz"
contine "ramura nu exista: felie/42" "refuzul numeste ramura lipsa"

titlu "MARTOR POZITIV: plafonul valului"
ruleaza bash "$SCRIPT" 1 2 3 5 6 7 8
cod_este 1 "sapte felii peste plafonul de sase = refuz"
contine "peste plafonul de 6" "refuzul spune care e plafonul"
contine "FABRICA_PLAFON_VAL" "refuzul arata drumul legitim, nu doar interdictia"
fals test -d "$META_FIXTURA/lot-plafon"

titlu "proba prezice suprapunerile fara sa atinga nimic"
ruleaza bash "$SCRIPT" --lot proba-predictie --proba 3 4
cod_este 0 "--proba iese 0"
contine "comun.txt" "predictia numeste fisierul atins de amandoua"
contine "predictie, nu verdict" "predictia se numeste predictie"
fals test -d "$META_FIXTURA/lot-proba-predictie"
fals git -C "$R" show-ref --verify --quiet "refs/heads/lot/proba-predictie"

ruleaza bash "$SCRIPT" --lot proba-disjuncte --proba 1 2
cod_este 0 "--proba pe felii disjuncte iese 0"
contine "niciuna - feliile au suprafete disjuncte" "spune cand nu exista suprapuneri"

titlu "MARTOR NEGATIV: doua felii disjuncte se pliaza"
ruleaza bash "$SCRIPT" --lot bun 1 2
cod_este 0 "plierea a doua felii disjuncte iese 0"
contine "felii plaite: 2" "raportul numara feliile plaite"
WT_BUN="$META_FIXTURA/lot-bun"
adevarat test -d "$WT_BUN"
adevarat git -C "$R" show-ref --verify --quiet "refs/heads/lot/bun"
if [ "$(cat "$WT_BUN/a.txt" 2>/dev/null)" = "schimbat de felia 1" ] \
   && [ "$(cat "$WT_BUN/b.txt" 2>/dev/null)" = "schimbat de felia 2" ]; then
  reusit "lotul contine schimbarile amandurora"
else
  picat "lotul nu contine ambele schimbari"
fi
# Doua merge-uri --no-ff inseamna doua commituri de imbinare, nu doua avansari tacute.
IMBINARI="$(git -C "$R" rev-list --merges --count main..lot/bun)"
if [ "$IMBINARI" = "2" ]; then
  reusit "doua commituri de imbinare (--no-ff a pastrat granitele feliilor)"
else
  picat "asteptam 2 imbinari, am gasit $IMBINARI"
fi

titlu "MARTOR POZITIV: doua felii peste acelasi rand"
ruleaza bash "$SCRIPT" --lot ciocnire 3 4
cod_este 1 "conflictul opreste plierea cu 1"
contine "CONFLICT la felie/4" "spune la ce felie s-a oprit"
contine "comun.txt" "NUMESTE fisierul care se bate cap in cap"
contine "atins si de: felie/3" "spune CU CINE se bate"
contine "plaite pana aici: felie/3" "spune ce apucase sa plieze"

WT_CIOCNIRE="$META_FIXTURA/lot-ciocnire"
GITDIR_CIOCNIRE="$(git -C "$WT_CIOCNIRE" rev-parse --absolute-git-dir 2>/dev/null || echo '')"
if [ -n "$GITDIR_CIOCNIRE" ] && [ ! -f "$GITDIR_CIOCNIRE/MERGE_HEAD" ]; then
  reusit "arborele NU a ramas la mijlocul unui merge (fara MERGE_HEAD)"
else
  picat "a ramas un merge in curs in $WT_CIOCNIRE"
fi
MURDAR="$(git -C "$WT_CIOCNIRE" status --porcelain 2>/dev/null | wc -l | tr -d ' ')"
if [ "$MURDAR" = "0" ]; then
  reusit "arborele lotului e curat dupa merge --abort"
else
  picat "arborele lotului a ramas murdar ($MURDAR fisiere)"
fi
# Prima felie a ramas plaita: oprirea e la primul conflict, nu o anulare a tot ce s-a facut.
if [ "$(cat "$WT_CIOCNIRE/comun.txt" 2>/dev/null)" = "randul comun, versiunea feliei 3" ]; then
  reusit "felia deja plaita a ramas in lot"
else
  picat "continutul feliei 3 s-a pierdut din lot"
fi

titlu "MARTOR POZITIV: acelasi nume de lot de doua ori"
ruleaza bash "$SCRIPT" --lot bun 5 6
cod_este 1 "refuza sa rescrie o ramura de lot existenta"
contine "exista deja" "refuzul spune de ce"

raport_final
