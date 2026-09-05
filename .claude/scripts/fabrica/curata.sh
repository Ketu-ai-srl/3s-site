#!/usr/bin/env bash
# curata.sh - scoate de pe disc worktree-urile feliilor inchise, si nimic altceva.
#
# SURSA DE ADEVAR E `git worktree list`, NICIODATA UN GLOB PE DISC. Motivul e un incident platit
# pe alt proiect: un glob a raportat 109 directoare "orfane" si doua dintre ele erau worktree-uri
# vii. Controlul care se tipareste la final - numarul raportat egal cu randurile din lista minus
# radacina - exista tocmai ca sa se vada daca cineva schimba asta cindva.
#
# CE INSEAMNA "FELIE INCHISA", si de ce criteriul e de CONTINUT si nu de descendenta. Cu squash
# merge, `merge-base --is-ancestor` raspunde NU si pentru munca aterizata: commit-urile feliei nu
# mai exista in main, doar continutul lor. Deci intreb altceva - arborele feliei difera de arborele
# lui main? Daca nu difera, tot ce a adus felia e deja in main si directorul se poate scoate.
#
# LIMITA DECLARATA A CRITERIULUI: cand main a avansat cu ALTE lucruri dupa aterizarea feliei,
# arborii difera din nou si felia apare drept "nu e inchisa". Greseala merge in directia sigura -
# nu sterge - iar directorul se scoate atunci cu `git worktree remove` de mana. Nu incerc sa fiu
# mai destept de atat: un criteriu care ghiceste ar sterge munca intr-o zi.
#
# IMPLICIT NU STERGE NIMIC. Raportul e comportamentul normal; `--aplica` e gestul.
#
# Iesire: 0 raport curat (sau stersuri reusite) · 1 s-a gasit munca necomisa, m-am oprit
#         2 folosire gresita · 3 nemasurat

set -euo pipefail
source "$(dirname "${BASH_SOURCE[0]}")/lib.sh"

ajutor() {
  cat <<'SFARSIT'
curata.sh [optiuni]

  Trece prin worktree-urile fabricii si spune care se pot scoate. Nu sterge nimic fara --aplica,
  si nu sterge NIMIC daca a gasit munca necomisa undeva.

Optiuni
  --aplica     scoate efectiv worktree-urile feliilor inchise
  --baza <ref> ramura fata de care se masoara "inchisa" (implicit: main)
  --proba      raportul, explicit (e si comportamentul implicit)
  --ajutor     textul asta

Variabile
  FABRICA_META       unde traiesc worktree-urile
  FABRICA_RADACINA   depozitul pe care se lucreaza (cusatura pentru probe)

Coduri de iesire: 0 curat · 1 munca necomisa gasita, oprit · 2 folosire gresita · 3 nemasurat
SFARSIT
}

APLICA=0; BAZA="main"
while [ $# -gt 0 ]; do
  case "$1" in
    --ajutor|-h|--help) ajutor; exit 0 ;;
    --aplica) APLICA=1; shift ;;
    --baza) [ $# -ge 2 ] || folosire_gresita "--baza cere o valoare"; BAZA="$2"; shift 2 ;;
    --proba) shift ;;
    *) folosire_gresita "argument necunoscut: $1 (vezi --ajutor)" ;;
  esac
done

nevoie_de git
RADACINA="$(radacina_repo)"
PRINCIPALA="$(radacina_principala)"
# Fara baza nu exista criteriu de "inchisa", deci nu exista raport - si atunci raspunsul e
# NEMASURAT, nu "nimic de curatat".
git -C "$PRINCIPALA" rev-parse --verify --quiet "$BAZA^{commit}" >/dev/null   || nemasurat "baza '$BAZA' nu exista - fara ea nu pot spune despre nicio felie ca e inchisa"

LUCRU="$(mktemp -d "${TMPDIR:-/tmp}/curata3s-XXXXXX")"
trap 'rm -rf "$LUCRU"' EXIT

LISTA="$LUCRU/worktree.txt"
lista_worktree "$PRINCIPALA" > "$LISTA"
RANDURI="$(wc -l < "$LISTA" | tr -d ' ')"

pas "worktree-uri, dupa git worktree list"
spune "randuri in lista: $RANDURI (radacina inclusa)"

INCHISE=()
BLOCATE=()
STRAINE=()
DESCHISE=()
EXAMINATE=0

while IFS= read -r cale || [ -n "$cale" ]; do
  [ -n "$cale" ] || continue
  # Radacina nu e o felie si nu se atinge niciodata.
  if [ "$cale" = "$PRINCIPALA" ]; then continue; fi
  EXAMINATE=$(( EXAMINATE + 1 ))

  if [ ! -d "$cale" ]; then
    DESCHISE+=("$cale|inregistrat in git dar lipseste de pe disc - ruleaza: git worktree prune")
    continue
  fi

  ramura="$(git -C "$cale" symbolic-ref --quiet --short HEAD 2>/dev/null || echo 'HEAD-detasat')"

  if ! worktree_e_al_nostru "$cale"; then
    # Un worktree fara marcajul fabricii nu e al nostru. Nu-l sterg si nu ghicesc: exact aici s-a
    # produs incidentul de pe celalalt proiect.
    STRAINE+=("$cale|$ramura|fara marcaj de proprietate")
    continue
  fi

  murdare="$(git -C "$cale" status --porcelain 2>/dev/null | wc -l | tr -d ' ')"
  if [ "$murdare" != "0" ]; then
    BLOCATE+=("$cale|$ramura|$murdare fisiere necomise")
    continue
  fi

  # Criteriul de continut. `--quiet` intoarce 0 cand arborii sunt identici.
  if git -C "$PRINCIPALA" diff --quiet "$BAZA" "$ramura" 2>/dev/null; then
    INCHISE+=("$cale|$ramura|arbore identic cu $BAZA")
  else
    difera="$(git -C "$PRINCIPALA" diff --name-only "$BAZA" "$ramura" 2>/dev/null | wc -l | tr -d ' ')"
    proprii="$(git -C "$PRINCIPALA" rev-list --count "$BAZA..$ramura" 2>/dev/null || echo '?')"
    DESCHISE+=("$cale|$ramura|$difera fisiere difera de $BAZA, $proprii commituri proprii")
  fi
done < "$LISTA"

arata() {
  local titlu="$1"; shift
  local n=0 rand
  printf '\n-- %s\n' "$titlu"
  for rand in "$@"; do
    [ -n "$rand" ] || continue
    n=$(( n + 1 ))
    printf '  %s\n' "$(printf '%s' "$rand" | tr '|' ' ')"
  done
  if [ "$n" = "0" ]; then printf '  (niciunul)\n'; fi
}

arata "MUNCA NECOMISA - nu se sterge nimic cat timp exista"  "${BLOCATE[@]:-}"
arata "INCHISE - continutul e deja in baza"                   "${INCHISE[@]:-}"
arata "DESCHISE - inca au ceva ce baza nu are"                "${DESCHISE[@]:-}"
arata "STRAINE - fara marcaj de fabrica, nu le ating"         "${STRAINE[@]:-}"

pas "control"
# Egalitatea asta e controlul masuratorii: daca scriptul ar incepe sa citeasca discul in loc de
# `git worktree list`, cele doua cifre ar diverge si s-ar vedea aici, nu peste trei saptamani.
CLASIFICATE=$(( ${#BLOCATE[@]} + ${#INCHISE[@]} + ${#DESCHISE[@]} + ${#STRAINE[@]} ))
spune "examinate: $EXAMINATE · clasificate: $CLASIFICATE · randuri minus radacina: $(( RANDURI - 1 ))"
if [ "$EXAMINATE" != "$CLASIFICATE" ] || [ "$EXAMINATE" != "$(( RANDURI - 1 ))" ]; then
  nemasurat "cifrele nu se potrivesc - clasificarea a pierdut sau a inventat worktree-uri, deci raportul de mai sus nu se poate crede"
fi

if [ "${#BLOCATE[@]}" -gt 0 ]; then
  pas "OPRIT"
  spune "am gasit munca necomisa in ${#BLOCATE[@]} worktree-uri. Nu sterg nimic - nici macar"
  spune "worktree-urile inchise, fiindca o curatenie partiala ascunde exact problema care trebuie vazuta."
  spune "Comite sau arunca explicit acolo, apoi ruleaza din nou."
  exit 1
fi

if [ "$APLICA" != "1" ]; then
  pas "rezumat"
  spune "raport, nu stergere. ${#INCHISE[@]} worktree-uri se pot scoate."
  spune "pentru a le scoate: bash .claude/scripts/fabrica/curata.sh --aplica"
  exit 0
fi

pas "sterg worktree-urile inchise"
ESEC=0
for rand in "${INCHISE[@]:-}"; do
  [ -n "$rand" ] || continue
  cale="${rand%%|*}"
  spune "-> $cale"
  # Jonctiunea se taie INTAI si explicit. Masurat azi: `rm -rf` din Git Bash nu o urmareste, deci
  # riscul imediat nu exista - dar garantia asta tine pentru `rm` din MSYS, nu pentru orice unealta
  # care va sterge acelasi director maine. Cu taierea explicita, `node_modules` al radacinii nu
  # depinde de cine face stergerea.
  if [ -e "$cale/node_modules" ]; then
    if dezleaga_director "$cale/node_modules"; then
      spune "   jonctiune node_modules taiata"
    else
      spune "   NU am putut taia jonctiunea node_modules - sar peste, ca sa nu risc radacina"
      ESEC=1
      continue
    fi
  fi
  if git -C "$PRINCIPALA" worktree remove "$cale"; then
    spune "   scos"
  else
    spune "   git worktree remove a picat"
    ESEC=1
  fi
done

pas "dupa stergere"
lista_worktree "$PRINCIPALA" > "$LUCRU/dupa.txt"
spune "randuri in lista acum: $(wc -l < "$LUCRU/dupa.txt" | tr -d ' ')"
spune "ramurile feliilor NU s-au sters - un director e o cale, o ramura e identitatea muncii."
exit "$ESEC"
