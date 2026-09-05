#!/usr/bin/env bash
# lib-proba.sh - ce folosesc in comun probele scripturilor de lot.
#
# DE CE FIXTURILE SE FABRICA LA RULARE si nu stau pe disc: o fixtura salvata imbatraneste. O data
# scrisa de mana devine "azi" intr-o zi, o lista de fisiere devine falsa la al patrulea consumator
# corect, un nume de entitate reala se schimba sub proba. Ce se construieste la fiecare rulare nu
# poate deveni fals fara ca cineva sa schimbe proba insasi.
#
# DE CE PROBELE NU ATING DEPOZITUL REAL: fiecare isi face un depozit git propriu intr-un director
# temporar si ii da scripturilor cusatura `FABRICA_RADACINA`. O proba care creeaza ramuri sau
# worktree-uri in arborele omului e o scriere armata, nu o masuratoare.

set -uo pipefail

CAZURI=0
PICATE=0
FABRICA_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

titlu() { printf '\n### %s\n' "$*"; }

# reusit <descriere> / picat <descriere> - fiecare caz se numara, si numaratoarea se tipareste la
# final. O proba care nu spune cate cazuri a rulat nu se deosebeste de una care n-a rulat niciunul.
reusit() { CAZURI=$(( CAZURI + 1 )); printf '  OK    %s\n' "$*"; }
picat()  { CAZURI=$(( CAZURI + 1 )); PICATE=$(( PICATE + 1 )); printf '  PICAT %s\n' "$*"; }

# ruleaza <comanda...> - pune iesirea in $IESIRE si codul in $COD.
# Iesirea se aduna intr-o variabila, nu se trece printr-o conducta care se termina intr-un `grep`
# cu iesire devreme: forma aia minte peste tamponul tevii sub `pipefail`, iar o proba oarba e mai
# rea decat lipsa ei.
ruleaza() {
  if IESIRE="$("$@" 2>&1)"; then COD=0; else COD=$?; fi
}

cod_este() {
  local asteptat="$1" descriere="$2"
  if [ "$COD" = "$asteptat" ]; then
    reusit "$descriere (cod $COD)"
  else
    picat "$descriere - asteptat cod $asteptat, primit $COD"
    printf '%s\n' "$IESIRE" | sed 's/^/        | /' | tail -12
  fi
}

contine() {
  local sir="$1" descriere="$2"
  case "$IESIRE" in
    *"$sir"*) reusit "$descriere" ;;
    *) picat "$descriere - nu am gasit '$sir' in iesire"
       printf '%s\n' "$IESIRE" | sed 's/^/        | /' | tail -12 ;;
  esac
}

nu_contine() {
  local sir="$1" descriere="$2"
  case "$IESIRE" in
    *"$sir"*) picat "$descriere - am gasit '$sir' desi NU trebuia"
              printf '%s\n' "$IESIRE" | sed 's/^/        | /' | tail -12 ;;
    *) reusit "$descriere" ;;
  esac
}

adevarat() {
  if "$@"; then reusit "$*"; else picat "$*"; fi
}

fals() {
  if "$@"; then picat "NU trebuia sa fie adevarat: $*"; else reusit "corect fals: $*"; fi
}

# depozit_fixtura <dir> - un depozit git pornit de la zero, pe `main`, cu un commit.
# Identitatea de commit se pune LOCAL: pe o masina fara `user.email` global, `git commit` refuza,
# iar proba ar pica dintr-un motiv care n-are legatura cu ce masoara.
depozit_fixtura() {
  local dir="$1"
  mkdir -p "$dir"
  git -C "$dir" init -q -b main
  git -C "$dir" config user.email "proba@fabrica.local"
  git -C "$dir" config user.name "Proba Fabrica"
  git -C "$dir" config commit.gpgsign false
  # Fara asta, git converteste LF in CRLF in copia de lucru a fixturii. Un caracter de retur de car
  # scapat intr-un fisier intermediar face ca o potrivire sa reuseasca sau sa esueze dupa POZITIA
  # randului - ultimul e curat, restul nu - si o proba poate fi oarba saptamani. Caracterul se
  # DESCRIE aici, nu se scrie: un comentariu care il poarta devine el insusi o instanta a lui.
  git -C "$dir" config core.autocrlf false
  printf 'depozit de proba\n' > "$dir/CITESTE.md"
  git -C "$dir" add -A
  git -C "$dir" commit -q -m "pornire"
}

# unelte_false <dir> - un `node_modules` mic, cu exact ce cauta provizionarea.
#
# Nu leg node_modules-ul real: proba ar depinde atunci de starea instalarii din depozitul omului,
# adica ar masura lumea in loc de contract. Aici uneltele isi spun versiunea si atat.
# Se scriu DOUA forme fiindca `pnpm exec` pe Windows are nevoie de `.cmd`, iar pe Linux de scriptul
# de shell; masurat azi ca forma `.cmd` chiar e gasita.
unelte_false() {
  local dir="$1" nume
  mkdir -p "$dir/node_modules/.bin"
  # `pnpm exec` refuza sa porneasca fara `package.json` in arbore: masurat azi, prima varianta a
  # fixturii n-avea unul si scriptul a raportat corect ca uneltele nu pornesc. Deci lipsa lui era
  # un defect al fixturii, nu al scriptului - si asta se vede doar rulind proba.
  if [ ! -f "$dir/package.json" ]; then
    printf '{\n  "name": "fixtura-fabrica",\n  "version": "0.0.0",\n  "private": true,\n  "scripts": {\n    "verifica": "pnpm pas-usor && pnpm pas-greu"\n  }\n}\n' > "$dir/package.json"
  fi
  for nume in tsc next; do
    printf '#!/bin/sh\necho "Versiune 0.0.0-proba (%s)"\n' "$nume" > "$dir/node_modules/.bin/$nume"
    printf '@echo off\r\necho Versiune 0.0.0-proba (%s)\r\n' "$nume" > "$dir/node_modules/.bin/$nume.cmd"
    chmod +x "$dir/node_modules/.bin/$nume"
  done
  # Un fisier adanc, ca masuratoarea de buget de cale sa aiba ce masura si sa nu iasa 0.
  mkdir -p "$dir/node_modules/.pnpm/pachet-de-referinta/adanc/mai/adanc"
  printf 'x\n' > "$dir/node_modules/.pnpm/pachet-de-referinta/adanc/mai/adanc/fisier-lung-de-referinta.js"
  printf 'node_modules\n' > "$dir/.gitignore"
  git -C "$dir" add -A
  git -C "$dir" commit -q -m "unelte de proba"
}

# curata_fixtura <dir> - taie intai jonctiunile, apoi sterge.
# Taierea explicita nu e prudenta decorativa: daca un `node_modules` al probei ar arata vreodata
# spre unul real, o stergere recursiva facuta de alta unealta decat `rm` din MSYS l-ar urma.
curata_fixtura() {
  local dir="$1" wt
  [ -n "$dir" ] || return 0
  [ -d "$dir" ] || return 0
  while IFS= read -r wt || [ -n "$wt" ]; do
    [ -n "$wt" ] || continue
    [ -e "$wt/node_modules" ] || continue
    if [ -n "${MSYSTEM:-}" ]; then
      MSYS_NO_PATHCONV=1 cmd /c rmdir "$(cygpath -w "$wt/node_modules")" >/dev/null 2>&1 || true
    else
      rm -f "$wt/node_modules"
    fi
  done <<< "$(find "$dir" -maxdepth 2 -type d 2>/dev/null)"
  rm -rf "$dir"
}

raport_final() {
  printf '\n== %s: %s cazuri, %s picate\n' "$(basename "$0")" "$CAZURI" "$PICATE"
  if [ "$CAZURI" = "0" ]; then
    printf 'NEMASURAT: zero cazuri rulate. Asta nu e "curat".\n' >&2
    exit 3
  fi
  [ "$PICATE" = "0" ]
}
