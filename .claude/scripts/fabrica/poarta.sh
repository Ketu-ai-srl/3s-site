#!/usr/bin/env bash
# poarta.sh - ruleaza poarta locala in worktree-ul curent si scrie un verdict citibil de masina.
#
# DE UNDE IA PASII, si de ce nu sunt scrisi aici. Lista de pasi se citeste din `package.json`,
# din scriptul `verifica`, si se sparge pe `&&`. Nu e comoditate: `pnpm verifica` e si ce ruleaza
# CI-ul, iar o lista scrisa de mana aici ar diverge in ziua in care cineva adauga un pas si ar
# produce clasa cea mai scumpa - poarta locala verde, CI rosu. Asa divergenta e imposibila prin
# constructie, nu prin disciplina.
#
# CE ADAUGA FATA DE `pnpm verifica`: cod de iesire si durata PER PAS, si un verdict JSON pe disc.
# `pnpm verifica` intoarce un singur cod si nu spune care pas a costat cat.
#
# MARCAJUL DE VERDICT se tipareste EXCLUSIV cand toti pasii au iesit 0. E singura sursa de adevar
# despre rularea asta; nimeni nu deduce verdictul din restul textului. De aceea sirul nu apare
# nicaieri altundeva in iesire - nici in ajutor, nici in mesajele de eroare.
#
# ZERO CONDUCTE PE PASII DE VERDICT. O conducta care se termina intr-un `grep` cu iesire devreme
# minte peste tamponul tevii sub `pipefail`: o potrivire REUSITA se citeste ca esec. Tiparul nu se
# scrie pe litere nici macar aici - un comentariu care il poarta devine o instanta a lui, iar
# scanerul din `probe/proba-igiena.sh` l-ar raporta pe drept. Se descrie, si atat.
#
# Iesire: 0 verde · 1 un pas a picat · 2 folosire gresita · 3 nemasurat (lipseste `verifica`)

set -euo pipefail
source "$(dirname "${BASH_SOURCE[0]}")/lib.sh"

MARCAJ_VERDE="POARTA_3S_TOTUL_VERDE"

ajutor() {
  cat <<'SFARSIT'
poarta.sh [optiuni]

  Ruleaza, pas cu pas, exact comenzile din scriptul `verifica` al proiectului, in worktree-ul
  curent, si scrie un verdict JSON: felie, ramura, sha, comanda, cod de iesire, durata.

Optiuni
  --iesire <fisier>   unde se scrie verdictul (implicit: <meta>/verdicte/<ramura>-<sha7>-<ceas>.json)
  --proba             arata pasii si unde ar scrie verdictul, fara sa ruleze nimic
  --ajutor            textul asta

Variabile
  FABRICA_META        radacina meta (implicit: <langa depozit>/3s-fabrica)
  FABRICA_RADACINA    depozitul pe care se lucreaza (cusatura pentru probe)

Coduri de iesire: 0 verde · 1 un pas a picat · 2 folosire gresita · 3 nemasurat
SFARSIT
}

IESIRE=""; PROBA=0
while [ $# -gt 0 ]; do
  case "$1" in
    --ajutor|-h|--help) ajutor; exit 0 ;;
    --proba) PROBA=1; shift ;;
    --iesire) [ $# -ge 2 ] || folosire_gresita "--iesire cere o valoare"; IESIRE="$2"; shift 2 ;;
    *) folosire_gresita "argument necunoscut: $1 (vezi --ajutor)" ;;
  esac
done

nevoie_de git python

RADACINA="$(radacina_repo)"
META="$(meta_dir)"
[ -f "$RADACINA/package.json" ] || nemasurat "nu gasesc package.json in $RADACINA"

RAMURA="$(git -C "$RADACINA" symbolic-ref --quiet --short HEAD 2>/dev/null || echo 'HEAD-detasat')"
SHA="$(git -C "$RADACINA" rev-parse HEAD 2>/dev/null || echo '')"
SHA7="${SHA:0:7}"
case "$RAMURA" in
  felie/*) FELIE="${RAMURA#felie/}" ;;
  *)       FELIE="-" ;;
esac

# Arborele murdar nu opreste poarta, dar se consemneaza: un verdict verde masurat pe un arbore cu
# modificari nesalvate nu descrie commit-ul, ci masa de lucru. Cine citeste JSON-ul trebuie sa
# poata face diferenta.
MURDAR="$(git -C "$RADACINA" status --porcelain 2>/dev/null | wc -l | tr -d ' ')"

# --- pasii, cititi din package.json ---------------------------------------------------------
#
# Python, nu `sed`: `verifica` e o valoare JSON si se citeste cu un parser de JSON. Iesirea e
# fortata pe UTF-8 fiindca terminalul Windows e cp1252 si crapa pe diacritice.
# Fisierul intermediar se scrie cu terminator de linie EXPLICIT: pe Windows un `\r` scapat face
# ca potrivirile sa reuseasca sau sa esueze dupa POZITIA randului, si o poarta poate fi oarba
# saptamani intregi.

LUCRU="$(mktemp -d "${TMPDIR:-/tmp}/poarta3s-XXXXXX")"
curata_lucru() { rm -rf "$LUCRU"; }
trap curata_lucru EXIT

FISIER_PASI="$LUCRU/pasi.txt"
(
  cd "$RADACINA" || exit 3
  python - "$FISIER_PASI" <<'PYTHON'
import io, json, sys
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

destinatie = sys.argv[1]
with io.open("package.json", encoding="utf-8") as f:
    pachet = json.load(f)

verifica = pachet.get("scripts", {}).get("verifica")
if not verifica:
    sys.stderr.write("package.json nu are scriptul 'verifica'\n")
    sys.exit(3)

# Se sparge DOAR pe `&&`. Un `||` sau un `;` in lantul portii ar insemna ca un pas rosu nu
# opreste lantul, adica poarta nu mai e o poarta - se refuza explicit, nu se ghiceste.
for semn in ("||", ";", "|"):
    if semn in verifica:
        sys.stderr.write("scriptul 'verifica' contine '%s'; poarta se compune doar cu '&&'\n" % semn)
        sys.exit(3)

pasi = [p.strip() for p in verifica.split("&&")]
pasi = [p for p in pasi if p]
if not pasi:
    sys.stderr.write("scriptul 'verifica' e gol\n")
    sys.exit(3)
for p in pasi:
    if "\t" in p:
        sys.stderr.write("comanda contine TAB, iar fisierul de lucru e separat cu TAB: %r\n" % p)
        sys.exit(3)

with io.open(destinatie, "w", encoding="utf-8", newline="\n") as f:
    for p in pasi:
        f.write(p + "\n")
PYTHON
) || nemasurat "nu pot citi pasii din package.json (vezi randul de mai sus)"

# Bucla e gardata pentru ultimul rand fara terminator: fara `|| [ -n "$linie" ]` ultimul pas se
# pierde tacut, si poarta ar raporta verde masurand cu un pas mai putin.
PASI=()
while IFS= read -r linie || [ -n "$linie" ]; do
  [ -n "$linie" ] || continue
  PASI+=("$linie")
done < "$FISIER_PASI"

[ "${#PASI[@]}" -gt 0 ] || nemasurat "lista de pasi a iesit goala"

# --- unde se scrie verdictul ------------------------------------------------------------------

if [ -z "$IESIRE" ]; then
  RAMURA_FISIER="$(printf '%s' "$RAMURA" | tr '/' '-')"
  IESIRE="$META/verdicte/${RAMURA_FISIER}-${SHA7}-$(date -u +%Y%m%dT%H%M%SZ).json"
fi

# --- proba ------------------------------------------------------------------------------------

if [ "$PROBA" = "1" ]; then
  pas "PROBA - nu se ruleaza niciun pas"
  spune "radacina: $RADACINA"
  spune "ramura:   $RAMURA (felie $FELIE, sha ${SHA7:-necunoscut})"
  spune "verdict:  $IESIRE"
  spune "pasi (${#PASI[@]}), in ordinea din package.json:"
  for c in "${PASI[@]}"; do spune "  - $c"; done
  exit 0
fi

# --- rulare ------------------------------------------------------------------------------------

FISIER_REZULTATE="$LUCRU/rezultate.tsv"
: > "$FISIER_REZULTATE"

INCEPUT_ISO="$(acum_iso)"
INCEPUT_MS="$(acum_ms)"
COD_FINAL=0

indice=0
for comanda in "${PASI[@]}"; do
  indice=$(( indice + 1 ))
  pas "[$indice/${#PASI[@]}] $comanda"
  t0="$(acum_ms)"
  # `set -e` nu are voie sa omoare scriptul aici: un pas rosu e un rezultat de masurat, nu o
  # eroare de infrastructura. De aceea codul se prinde in `if`, nu se lasa sa se propage.
  if ( cd "$RADACINA" && bash -c "$comanda" ); then cod=0; else cod=$?; fi
  t1="$(acum_ms)"
  durata=$(( t1 - t0 ))
  printf '%s\t%s\t%s\t%s\n' "$indice" "$comanda" "$cod" "$durata" >> "$FISIER_REZULTATE"
  if [ "$cod" = "0" ]; then
    printf -- '-> OK (cod 0, %s ms)\n' "$durata"
  else
    printf -- '-> PICAT (cod %s, %s ms)\n' "$cod" "$durata"
    COD_FINAL=1
    # Se opreste la primul rosu, ca `&&` din `verifica`. Altfel poarta ar raporta alt lant decat
    # cel pe care il ruleaza CI-ul, si compararea celor doua ar fi fara sens.
    break
  fi
done

SFARSIT_MS="$(acum_ms)"
DURATA_TOTALA=$(( SFARSIT_MS - INCEPUT_MS ))

# --- verdictul pe disc --------------------------------------------------------------------------

mkdir -p "$(dirname "$IESIRE")"
FELIE="$FELIE" RAMURA="$RAMURA" SHA="$SHA" RADACINA="$RADACINA" \
INCEPUT_ISO="$INCEPUT_ISO" SFARSIT_ISO="$(acum_iso)" DURATA_TOTALA="$DURATA_TOTALA" \
COD_FINAL="$COD_FINAL" MURDAR="$MURDAR" NR_PASI="${#PASI[@]}" \
python - "$FISIER_REZULTATE" "$IESIRE" <<'PYTHON'
import io, json, os, sys
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

sursa, destinatie = sys.argv[1], sys.argv[2]
pasi = []
with io.open(sursa, encoding="utf-8", newline="") as f:
    for linie in f:
        linie = linie.rstrip("\r\n")
        if not linie:
            continue
        indice, comanda, cod, durata = linie.split("\t", 3)
        pasi.append({
            "indice": int(indice),
            "comanda": comanda,
            "cod": int(cod),
            "durata_ms": int(durata),
        })

verdict = {
    "felie": os.environ["FELIE"],
    "ramura": os.environ["RAMURA"],
    "sha": os.environ["SHA"],
    "radacina": os.environ["RADACINA"],
    "inceput": os.environ["INCEPUT_ISO"],
    "sfarsit": os.environ["SFARSIT_ISO"],
    "durata_ms": int(os.environ["DURATA_TOTALA"]),
    "cod_final": int(os.environ["COD_FINAL"]),
    # Cate fisiere erau modificate cand a pornit poarta. Zero inseamna ca verdictul descrie
    # commit-ul; orice altceva inseamna ca descrie masa de lucru.
    "fisiere_murdare": int(os.environ["MURDAR"]),
    "pasi_declarati": int(os.environ["NR_PASI"]),
    "pasi_rulati": len(pasi),
    "pasi": pasi,
}
with io.open(destinatie, "w", encoding="utf-8", newline="\n") as f:
    json.dump(verdict, f, ensure_ascii=False, indent=2)
    f.write("\n")
PYTHON

pas "rezumat"
spune "verdict scris in: $IESIRE"
spune "pasi rulati: $(wc -l < "$FISIER_REZULTATE" | tr -d ' ') din ${#PASI[@]} · durata totala ${DURATA_TOTALA} ms"
[ "$MURDAR" = "0" ] || avert "arborele avea $MURDAR fisiere modificate: verdictul descrie masa de lucru, nu commit-ul $SHA7"

if [ "$COD_FINAL" = "0" ]; then
  printf '%s\n' "$MARCAJ_VERDE"
  exit 0
fi
spune "poarta a picat - vezi pasul marcat PICAT mai sus si verdictul JSON."
exit 1
