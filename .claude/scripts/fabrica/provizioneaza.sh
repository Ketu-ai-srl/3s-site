#!/usr/bin/env bash
# provizioneaza.sh - deschide un loc de lucru izolat pentru o felie.
#
# CE PROBLEMA REZOLVA. Doi agenti care lucreaza in acelasi arbore se calca pe picioare in moduri
# care nu seamana a conflict: `git checkout -- .` al unuia sterge munca celuilalt, `refs/stash` e
# un ref GLOBAL partajat de toate worktree-urile, iar `.next/` se rescrie sub build-ul vecinului.
# Cu un worktree per felie, singurul lucru partajat ramane depozitul - adica exact ce trebuie.
#
# CE NU FACE: nu instaleaza dependinte. `node_modules` vine prin JONCTIUNE spre radacina, deci
# provizionarea costa secunde, nu minute. Motivul complet e in `lib.sh`, la `leaga_director`.
#
# Iesire: 0 provizionat · 1 refuz cu motiv · 2 folosire gresita · 3 nemasurat (unealta lipsa)

set -euo pipefail
source "$(dirname "${BASH_SOURCE[0]}")/lib.sh"

ajutor() {
  cat <<'SFARSIT'
provizioneaza.sh <numar-felie> [slug] [optiuni]

  Creeaza un worktree git separat pe ramura `felie/<numar>` si leaga `node_modules` prin
  jonctiune spre radacina, ca dependintele sa nu se reinstaleze.

Argumente
  <numar-felie>   numar intreg; da si numele ramurii (`felie/12`)
  [slug]          text scurt (a-z 0-9 -) folosit DOAR in numele directorului, pentru citit

Optiuni
  --baza <ref>    de unde pleaca felia (implicit: main)
  --proba         arata planul si nu schimba nimic
  --verifica-complet   ruleaza `pnpm verifica` in worktree dupa creare (minute, nu secunde)
  --ajutor        textul asta

Variabile
  FABRICA_META        unde traiesc worktree-urile (implicit: <langa depozit>/3s-fabrica)
  FABRICA_RADACINA    depozitul pe care se lucreaza (cusatura pentru probe)
  FABRICA_CALE_MAX    pragul de lungime a caii pe Windows (implicit 275, avertisment)

Coduri de iesire: 0 provizionat · 1 refuz · 2 folosire gresita · 3 nemasurat
SFARSIT
}

# --- argumente ------------------------------------------------------------------------------

NUMAR=""; SLUG=""; BAZA="main"; PROBA=0; VERIFICA_COMPLET=0
while [ $# -gt 0 ]; do
  case "$1" in
    --ajutor|-h|--help) ajutor; exit 0 ;;
    --proba) PROBA=1; shift ;;
    --verifica-complet) VERIFICA_COMPLET=1; shift ;;
    --baza) [ $# -ge 2 ] || folosire_gresita "--baza cere o valoare"; BAZA="$2"; shift 2 ;;
    -*) folosire_gresita "optiune necunoscuta: $1 (vezi --ajutor)" ;;
    *)
      if [ -z "$NUMAR" ]; then NUMAR="$1"
      elif [ -z "$SLUG" ]; then SLUG="$1"
      else folosire_gresita "argument in plus: $1 (vezi --ajutor)"
      fi
      shift ;;
  esac
done

[ -n "$NUMAR" ] || folosire_gresita "lipseste numarul feliei (vezi --ajutor)"
case "$NUMAR" in ''|*[!0-9]*) folosire_gresita "numarul feliei trebuie sa fie intreg: '$NUMAR'" ;; esac
case "$SLUG" in *[!a-z0-9-]*) folosire_gresita "slug invalid (doar a-z 0-9 -): '$SLUG'" ;; esac

nevoie_de git pnpm
# `if`, nu `A && B`: sub `set -e` o conditie falsa la nivelul de sus intoarce 1 si omoara
# scriptul. Pe Linux `este_windows` e fals, si forma scurta ar fi oprit provizionarea acolo.
if este_windows; then nevoie_de cygpath; fi

RADACINA="$(radacina_repo)"
META="$(meta_dir)"
RAMURA="felie/$NUMAR"

# --- numele directorului, in bugetul de cale ------------------------------------------------

pas "buget de cale"
ADANCIME="$(adancime_referinta "$RADACINA")"
if [ "$ADANCIME" = "0" ]; then
  avert "nu am gasit node_modules in $RADACINA - adancimea de referinta e 0, deci bugetul de cale e NEMASURAT (nu 'in regula')"
fi
BUGET="$(buget_nume "$META" "$ADANCIME")"
NUME_DORIT="felie-$NUMAR"
if [ -n "$SLUG" ]; then NUME_DORIT="felie-$NUMAR-$SLUG"; fi

# Taierea pastraza mereu `felie-<numar>`: un director fara numarul feliei nu se mai leaga de
# nimic, si asta ar fi mai rau decat calea lunga pe care o reparam. Slugul complet nu se pierde -
# el nu e identitatea feliei, ramura e.
NUME_WT="$NUME_DORIT"
if [ "$BUGET" -gt 0 ] && [ "${#NUME_DORIT}" -gt "$BUGET" ]; then
  NUME_WT="felie-$NUMAR"
  if [ -n "$SLUG" ]; then
    parte=""
    OIFS="$IFS"; IFS='-'
    for bucata in $SLUG; do
      [ -n "$bucata" ] || continue
      if [ -z "$parte" ]; then candidat="$bucata"; else candidat="$parte-$bucata"; fi
      if [ "$(( ${#NUME_WT} + 1 + ${#candidat} ))" -le "$BUGET" ]; then parte="$candidat"; else break; fi
    done
    IFS="$OIFS"
    if [ -n "$parte" ]; then NUME_WT="$NUME_WT-$parte"; fi
  fi
  avert "NUME SCURTAT: $NUME_DORIT -> $NUME_WT (buget $BUGET caractere, derivat din adancimea masurata $ADANCIME). Foloseste $NUME_WT in comenzile care cer directorul."
fi

WT="$META/$NUME_WT"
poarta_cale "$WT" "$ADANCIME" || avert "cale peste prag chiar dupa scurtare - pragul e avertisment, nu refuz (motivul: parantezele masuratorii vin de pe alt proiect, vezi lib.sh)"

# --- ce e deja pe disc ----------------------------------------------------------------------

pas "starea de plecare"
git -C "$RADACINA" rev-parse --verify --quiet "$BAZA^{commit}" >/dev/null \
  || moare "baza '$BAZA' nu exista in depozit"

RAMURA_EXISTA=0
if git -C "$RADACINA" show-ref --verify --quiet "refs/heads/$RAMURA"; then RAMURA_EXISTA=1; fi

# Un ref checked-out in alt worktree nu se poate refolosi. Il caut in lista, nu pe disc.
OCUPAT_DE=""
if [ "$RAMURA_EXISTA" = "1" ]; then
  while IFS= read -r cale || [ -n "$cale" ]; do
    [ -n "$cale" ] || continue
    r="$(git -C "$cale" symbolic-ref --quiet --short HEAD 2>/dev/null || true)"
    if [ "$r" = "$RAMURA" ]; then OCUPAT_DE="$cale"; fi
  done <<< "$(lista_worktree "$RADACINA")"
fi

RELUARE=0
if [ "$RAMURA_EXISTA" = "1" ]; then
  [ -z "$OCUPAT_DE" ] || moare "ramura $RAMURA e deja folosita de worktree-ul $OCUPAT_DE - lucreaza acolo sau curata-l intai cu curata.sh"
  PROPRII="$(git -C "$RADACINA" rev-list --count "$BAZA..$RAMURA" 2>/dev/null || echo 0)"
  if [ "$PROPRII" = "0" ]; then
    RELUARE=1
    spune "ramura $RAMURA exista dar nu are commituri proprii fata de $BAZA - o reiau"
  else
    # Refuzul spune si iesirea. Un refuz care nu arata drumul legitim trimite omul sa ocoleasca
    # poarta, si atunci poarta a produs exact gestul pe care voia sa-l previna.
    moare "ramura $RAMURA are $PROPRII commituri proprii fata de $BAZA - nu o rescriu. Ori lucrezi mai departe pe ea (git worktree add \"$WT\" $RAMURA), ori o stergi tu explicit (git branch -D $RAMURA) dupa ce te-ai uitat la ele."
  fi
fi

[ ! -e "$WT" ] || moare "directorul exista deja: $WT (curata-l cu curata.sh --aplica sau alege alt slug)"

# --- proba ----------------------------------------------------------------------------------

if [ "$PROBA" = "1" ]; then
  pas "PROBA - nu se schimba nimic"
  spune "radacina:     $RADACINA"
  spune "meta:         $META"
  spune "worktree:     $WT"
  spune "ramura:       $RAMURA (baza $BAZA)"
  spune "ramura noua:  $([ "$RELUARE" = "1" ] && echo 'nu, reluare' || echo da)"
  spune "node_modules: jonctiune -> $RADACINA/node_modules"
  exit 0
fi

# --- provizionare ---------------------------------------------------------------------------

pas "creez worktree-ul"
mkdir -p "$META"
if [ "$RELUARE" = "1" ]; then
  git -C "$RADACINA" worktree add "$WT" "$RAMURA"
else
  # --no-track: ramura feliei nu primeste upstream, deci un `git push` distrat din worktree nu
  # are unde sa se duca singur. Riscul de push pe ramura partajata dispare mecanic.
  git -C "$RADACINA" worktree add --no-track -b "$RAMURA" "$WT" "$BAZA"
fi

MARCAJ="$(marcaj_proprietate "$WT")" || moare "worktree creat dar nu ii pot afla directorul git: $WT"
printf 'felie=%s\nramura=%s\ncreat=%s\n' "$NUMAR" "$RAMURA" "$(acum_iso)" > "$MARCAJ"
spune "marcaj de proprietate: $MARCAJ"

pas "leg node_modules prin jonctiune"
if [ -d "$RADACINA/node_modules" ]; then
  if leaga_director "$WT/node_modules" "$RADACINA/node_modules"; then
    spune "OK: $WT/node_modules -> $RADACINA/node_modules"
  else
    moare "jonctiunea nu s-a creat. Fara ea worktree-ul nu poate rula nimic. Verifica manual: cmd /c mklink /J"
  fi
else
  avert "radacina nu are node_modules - worktree-ul e creat, dar NU poate rula poarta. Ruleaza pnpm install in radacina, apoi provizioneaza din nou."
fi

# --- dovada ca poarta POATE rula aici -------------------------------------------------------
#
# Nu rulez poarta completa implicit: costa minute si e treaba lui `poarta.sh`. Rulez uneltele ei
# si le cer versiunea - daca ele pornesc din worktree, rezolvarea de module functioneaza prin
# jonctiune. Ce am masurat si ce nu se scrie explicit mai jos, ca sa nu se citeasca drept verdict.

pas "pot uneltele portii sa porneasca de aici"
capabil=0
verifica_unealta() {
  local nume="$1"; shift
  local iesire cod
  iesire="$( (cd "$WT" && "$@") 2>&1 )" && cod=0 || cod=$?
  if [ "$cod" = "0" ]; then
    printf 'OK    %s: %s\n' "$nume" "$(printf '%s' "$iesire" | head -1)"
  else
    printf 'PICAT %s (cod %s): %s\n' "$nume" "$cod" "$(printf '%s' "$iesire" | head -3)"
    capabil=1
  fi
}
verifica_unealta "typescript" pnpm exec tsc --version
verifica_unealta "next"       pnpm exec next --version
verifica_unealta "python"     python --version

if [ "$VERIFICA_COMPLET" = "1" ]; then
  pas "poarta completa (pnpm verifica) in worktree"
  if (cd "$WT" && pnpm verifica); then
    spune "OK: pnpm verifica a iesit 0 in $WT"
  else
    moare "pnpm verifica a picat in worktree-ul proaspat provizionat - worktree-ul exista, dar nu e apt de lucru"
  fi
fi

pas "rezumat"
spune "worktree: $WT"
spune "ramura:   $RAMURA"
if [ "$capabil" = "0" ]; then
  spune "uneltele portii pornesc din worktree."
else
  spune "cel putin o unealta nu a pornit - vezi randurile PICAT de mai sus."
fi
if [ "$VERIFICA_COMPLET" = "1" ]; then
  spune "poarta completa: RULATA si verde."
else
  spune "poarta completa: NERULATA. Ce s-a masurat e ca uneltele pornesc, nu ca proiectul trece."
  spune "pentru verdict: cd \"$WT\" && bash .claude/scripts/fabrica/poarta.sh"
fi

exit "$capabil"
