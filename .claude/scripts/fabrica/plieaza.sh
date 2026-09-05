#!/usr/bin/env bash
# plieaza.sh - aduce mai multe felii intr-o singura ramura de lot.
#
# DE CE UN LOT SI NU FELII SEPARATE PANA SUS. Doua felii fara nicio suprapunere de fisiere se pot
# anula reciproc: una introduce un apel, cealalta il interzice. Nicio recenzie pe felie nu poate
# gasi asta, fiindca defectul cere ca amandoua sa existe simultan. Ramura de lot e singurul loc
# unde poarta le vede impreuna - si de aceea `poarta.sh` se ruleaza AICI, dupa pliere, nu doar in
# worktree-ul fiecarui agent.
#
# DE CE `--no-ff`. Un merge fast-forward sterge granita feliei din istoric. Cu `--no-ff` fiecare
# felie ramane un commit de imbinare identificabil, deci un lot se poate desface inapoi pe felii.
#
# DE CE SE OPRESTE LA PRIMUL CONFLICT. Un al doilea merge peste un arbore cu markeri de conflict
# amesteca doua probleme intr-una. Se opreste, se spune exact ce fisiere se bat cap in cap si cu
# ce felie, iar arborele se lasa CURAT (`merge --abort`), nu la mijloc.
#
# Iesire: 0 plait · 1 conflict sau plafon depasit · 2 folosire gresita · 3 nemasurat

set -euo pipefail
source "$(dirname "${BASH_SOURCE[0]}")/lib.sh"

PLAFON="${FABRICA_PLAFON_VAL:-6}"

ajutor() {
  cat <<'SFARSIT'
plieaza.sh [optiuni] <felie...>

  Creeaza o ramura de lot si pliaza in ea, pe rand, ramurile feliilor date, cu `git merge --no-ff`.

Argumente
  <felie...>      numere de felie (`3` -> `felie/3`) sau nume complete de ramura

Optiuni
  --lot <nume>    numele lotului (implicit: lot/<AAAALLZZ-HHMM>)
  --baza <ref>    de unde pleaca lotul (implicit: main)
  --proba         nu atinge nimic: verifica feliile, plafonul, si arata ce fisiere ating in comun
  --ajutor        textul asta

Variabile
  FABRICA_PLAFON_VAL   cate felii incap intr-un lot (implicit 6)
  FABRICA_META         unde se creeaza worktree-ul lotului
  FABRICA_RADACINA     depozitul pe care se lucreaza (cusatura pentru probe)

Coduri de iesire: 0 plait · 1 conflict sau plafon · 2 folosire gresita · 3 nemasurat
SFARSIT
}

LOT=""; BAZA="main"; PROBA=0; FELII=()
while [ $# -gt 0 ]; do
  case "$1" in
    --ajutor|-h|--help) ajutor; exit 0 ;;
    --proba) PROBA=1; shift ;;
    --lot)  [ $# -ge 2 ] || folosire_gresita "--lot cere o valoare";  LOT="$2";  shift 2 ;;
    --baza) [ $# -ge 2 ] || folosire_gresita "--baza cere o valoare"; BAZA="$2"; shift 2 ;;
    -*) folosire_gresita "optiune necunoscuta: $1 (vezi --ajutor)" ;;
    *) FELII+=("$1"); shift ;;
  esac
done

[ "${#FELII[@]}" -gt 0 ] || folosire_gresita "nu ai dat nicio felie (vezi --ajutor)"

nevoie_de git
RADACINA="$(radacina_repo)"
PRINCIPALA="$(radacina_principala)"
META="$(meta_dir)"

# --- feliile, normalizate si verificate -------------------------------------------------------

RAMURI=()
for f in "${FELII[@]}"; do
  case "$f" in
    ''|*[!0-9]*) ramura="$f" ;;
    *)           ramura="felie/$f" ;;
  esac
  for deja in "${RAMURI[@]:-}"; do
    [ "$deja" = "$ramura" ] && folosire_gresita "felia $ramura e data de doua ori"
  done
  git -C "$RADACINA" show-ref --verify --quiet "refs/heads/$ramura" \
    || moare "ramura nu exista: $ramura"
  RAMURI+=("$ramura")
done

pas "plafonul valului"
spune "felii cerute: ${#RAMURI[@]} · plafon: $PLAFON"
if [ "${#RAMURI[@]}" -gt "$PLAFON" ]; then
  # Plafonul nu e o preferinta estetica. Un val mare pica intreg pe un singur defect, si atunci
  # feliile bune stau pe loc fara nicio vina. Ridicarea plafonului e o decizie, nu un ocol:
  # FABRICA_PLAFON_VAL=<n>, scris in comanda, deci vizibil in jurnal.
  moare "lot de ${#RAMURI[@]} felii peste plafonul de $PLAFON. Sparge-l in doua loturi, sau ridica plafonul explicit: FABRICA_PLAFON_VAL=${#RAMURI[@]} plieaza.sh ..."
fi

git -C "$RADACINA" rev-parse --verify --quiet "$BAZA^{commit}" >/dev/null \
  || moare "baza '$BAZA' nu exista in depozit"

[ -n "$LOT" ] || LOT="lot/$(date -u +%Y%m%d-%H%M)"
case "$LOT" in lot/*) : ;; *) LOT="lot/$LOT" ;; esac
NUME_WT="$(printf '%s' "$LOT" | tr '/' '-')"
WT="$META/$NUME_WT"

# --- ce fisiere ating feliile in comun --------------------------------------------------------
#
# Vederea cu DOUA puncte raspunde la "ce se schimba daca apesi"; cea cu trei puncte umfla lista cu
# ce e deja pe baza. Aici ma intereseaza ce aduce felia peste baza, deci `baza...ramura` - forma
# cu trei puncte fata de BAZA, care e chiar "de la punctul comun incoace".

LUCRU="$(mktemp -d "${TMPDIR:-/tmp}/plieaza3s-XXXXXX")"
trap 'rm -rf "$LUCRU"' EXIT

pas "suprafata fiecarei felii"
for ramura in "${RAMURI[@]}"; do
  fisier="$LUCRU/$(printf '%s' "$ramura" | tr '/' '-').txt"
  git -C "$RADACINA" diff --name-only "$BAZA...$ramura" > "$fisier"
  spune "$ramura: $(wc -l < "$fisier" | tr -d ' ') fisiere"
done

pas "fisiere atinse de mai multe felii"
# Un fisier atins de doua felii NU e neaparat un conflict - poate fi acelasi fisier, randuri
# diferite. E o predictie, si se numeste asa; verdictul il da merge-ul.
SUPRAPUNERI=0
i=0
while [ "$i" -lt "${#RAMURI[@]}" ]; do
  j=$(( i + 1 ))
  while [ "$j" -lt "${#RAMURI[@]}" ]; do
    a="$LUCRU/$(printf '%s' "${RAMURI[$i]}" | tr '/' '-').txt"
    b="$LUCRU/$(printf '%s' "${RAMURI[$j]}" | tr '/' '-').txt"
    comune="$(comm -12 <(sort "$a") <(sort "$b"))"
    if [ -n "$comune" ]; then
      SUPRAPUNERI=$(( SUPRAPUNERI + 1 ))
      spune "${RAMURI[$i]} si ${RAMURI[$j]} ating amandoua:"
      printf '%s\n' "$comune" | sed 's/^/  - /'
    fi
    j=$(( j + 1 ))
  done
  i=$(( i + 1 ))
done
# `if`, nu `[ ... ] && ...`: sub `set -e` o conditie falsa la nivelul de sus intoarce 1 si
# omoara scriptul. Capcana e tacuta - arata a rand inofensiv si opreste plierea.
if [ "$SUPRAPUNERI" = "0" ]; then spune "niciuna - feliile au suprafete disjuncte"; fi

# --- proba --------------------------------------------------------------------------------------

if [ "$PROBA" = "1" ]; then
  pas "PROBA - nu se schimba nimic"
  spune "lot:       $LOT (baza $BAZA)"
  spune "worktree:  $WT"
  spune "felii:     ${RAMURI[*]}"
  spune "suprapuneri de fisiere: $SUPRAPUNERI perechi (predictie, nu verdict - conflictul il da merge-ul)"
  exit 0
fi

# --- plierea --------------------------------------------------------------------------------------

if git -C "$RADACINA" show-ref --verify --quiet "refs/heads/$LOT"; then
  moare "ramura de lot $LOT exista deja - da alt --lot sau sterge-o tu explicit"
fi
[ ! -e "$WT" ] || moare "directorul lotului exista deja: $WT (curata-l cu curata.sh --aplica)"

pas "creez ramura de lot"
mkdir -p "$META"
git -C "$RADACINA" worktree add --no-track -b "$LOT" "$WT" "$BAZA"
MARCAJ="$(marcaj_proprietate "$WT")" || moare "nu pot afla directorul git al lotului"
printf 'lot=%s\nfelii=%s\ncreat=%s\n' "$LOT" "${RAMURI[*]}" "$(acum_iso)" > "$MARCAJ"

# Lotul primeste si el node_modules, fiindca `poarta.sh` se ruleaza AICI dupa pliere.
if [ -d "$PRINCIPALA/node_modules" ] && [ ! -e "$WT/node_modules" ]; then
  leaga_director "$WT/node_modules" "$PRINCIPALA/node_modules" \
    && spune "node_modules legat prin jonctiune" \
    || avert "jonctiunea node_modules nu s-a creat - poarta nu va putea rula in $WT"
fi

PLAITE=()
for ramura in "${RAMURI[@]}"; do
  pas "pliez $ramura"
  if git -C "$WT" merge --no-ff --no-edit "$ramura"; then
    PLAITE+=("$ramura")
    spune "OK: $ramura plait"
    continue
  fi

  # Conflict. Ce se cere aici e numele fisierelor si cu CINE se bat, nu un mesaj generic.
  pas "CONFLICT la $ramura"
  CONFLICTE="$LUCRU/conflicte.txt"
  git -C "$WT" diff --name-only --diff-filter=U > "$CONFLICTE" || true
  spune "fisiere in conflict:"
  while IFS= read -r fisier || [ -n "$fisier" ]; do
    [ -n "$fisier" ] || continue
    vinovati=""
    for anterior in "${PLAITE[@]:-}"; do
      [ -n "$anterior" ] || continue
      lista="$LUCRU/$(printf '%s' "$anterior" | tr '/' '-').txt"
      while IFS= read -r atins || [ -n "$atins" ]; do
        [ "$atins" = "$fisier" ] && vinovati="$vinovati $anterior"
      done < "$lista"
    done
    if [ -n "$vinovati" ]; then
      spune "  - $fisier   (atins si de:$vinovati)"
    else
      spune "  - $fisier   (nu e atins de nicio felie deja plaita: conflictul e cu baza $BAZA)"
    fi
  done < "$CONFLICTE"

  spune ""
  spune "las arborele CURAT si ma opresc - nu pliez peste un conflict."
  git -C "$WT" merge --abort || avert "merge --abort a picat; arborele din $WT poate fi la mijloc"
  spune "plaite pana aici: ${PLAITE[*]:-niciuna}"
  spune "de reparat: rescrie felia $ramura peste $LOT si reia plierea."
  exit 1
done

pas "rezumat"
spune "lot:      $LOT"
spune "worktree: $WT"
spune "felii plaite: ${#PLAITE[@]} (${PLAITE[*]})"
spune ""
spune "urmeaza poarta pe LOT, nu pe felii:"
spune "  cd \"$WT\" && bash .claude/scripts/fabrica/poarta.sh"
exit 0
