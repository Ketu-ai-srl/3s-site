#!/usr/bin/env bash
# promoveaza.sh - muta ramura de lot in `main`, si numai daca trei lucruri sunt adevarate deodata.
#
# CELE TREI CONDITII, si de ce fiecare:
#   1. POARTA LOCALA verde pe SHA-ul EXACT. Nu "am rulat poarta acum o ora": verdictul de pe disc
#      poarta un sha, si daca nu e sha-ul care pleaca, nu spune nimic despre el.
#   2. CI verde pe SHA-ul EXACT. Starea unei rulari se citeste pe SHA, nu pe numele ramurii -
#      `.claude/rules/verifica-preconditii-externe.md`. Un `skipped` nu e un verde: e un verdict
#      mostenit din alta parte, si nu se accepta la promovare.
#   3. MARCAJ DE GO, legat de acelasi SHA. Fisierul se cheama dupa sha, deci un GO dat pentru un
#      commit nu poate fi refolosit pentru altul. Un GO cu data ar fi putut.
#
# IMPLICIT E PROBA. Fara `--go` nu se scrie nimic nicaieri, se tipareste planul si verdictul
# fiecarei conditii. `--go` accepta sursa DOAR ca sha40: promovarea cere identitatea masurata, nu
# un ref mobil care se rezolva la varful de la momentul apasarii.
#
# ORDINEA VERIFICARILOR: intai toate cele locale, apoi cele de retea. Doua motive - pasul ieftin
# inaintea celui scump, si un refuz local sigur nu merita nicio cerere de retea. Efectul lateral e
# ca proba poate exercita conditiile 1 si 3 fara retea.
#
# ZERO GIT PESTE RETEA. Scrierea se face prin `gh api`, nu prin `git push`: pe Windows managerul
# de credentiale se intepeneste sub sarcina concurenta si un push atarna minute intregi.
#
# Iesire: 0 promovat (sau proba curata) · 1 refuz cu motiv · 2 folosire gresita · 3 nemasurat

set -euo pipefail
source "$(dirname "${BASH_SOURCE[0]}")/lib.sh"

ajutor() {
  cat <<'SFARSIT'
promoveaza.sh [optiuni]

  Muta un SHA de pe ramura de lot in `main`, prin API GitHub, doar cu poarta locala verde,
  CI verde pe acelasi SHA si marcaj de GO pentru acelasi SHA.

Optiuni
  --lot <ramura>   ramura de lot din care se ia SHA-ul (implicit: ramura curenta)
  --sursa <sha40>  SHA-ul exact care se promoveaza (obligatoriu cu --go)
  --tinta <ramura> unde se muta (implicit: main)
  --go             executa mutarea; fara el nu se schimba nimic
  --proba          explicit ce se intampla oricum fara --go
  --ajutor         textul asta

Cum se da GO (owner)
  mkdir -p "<meta>/GO" && printf 'GO de la <cine>, %s\n' "$(date -u +%FT%TZ)" > "<meta>/GO/<sha40>.txt"

Variabile
  FABRICA_META       radacina meta: verdictele portii si marcajele de GO
  FABRICA_RADACINA   depozitul pe care se lucreaza (cusatura pentru probe)

Coduri de iesire: 0 promovat sau proba curata · 1 refuz · 2 folosire gresita · 3 nemasurat
SFARSIT
}

LOT=""; SURSA=""; TINTA="main"; GO=0
while [ $# -gt 0 ]; do
  case "$1" in
    --ajutor|-h|--help) ajutor; exit 0 ;;
    --go) GO=1; shift ;;
    --proba) shift ;;
    --lot)   [ $# -ge 2 ] || folosire_gresita "--lot cere o valoare";   LOT="$2";   shift 2 ;;
    --sursa) [ $# -ge 2 ] || folosire_gresita "--sursa cere o valoare"; SURSA="$2"; shift 2 ;;
    --tinta) [ $# -ge 2 ] || folosire_gresita "--tinta cere o valoare"; TINTA="$2"; shift 2 ;;
    *) folosire_gresita "argument necunoscut: $1 (vezi --ajutor)" ;;
  esac
done

nevoie_de git python
RADACINA="$(radacina_repo)"
META="$(meta_dir)"

REFUZURI=0
refuz() { printf 'PICAT %s\n' "$*"; REFUZURI=$(( REFUZURI + 1 )); }
trece()  { printf 'OK    %s\n' "$*"; }

# --- L1. tinta ---------------------------------------------------------------------------------

pas "L1. tinta"
case "$TINTA" in
  main)
    trece "tinta e main - Coolify serveste de acolo pe staging"
    ;;
  productie|prod)
    # Poarta se scrie ACUM, nu in ziua in care apare domeniul. Un prag asezat pe punctul de esec
    # e necrolog, nu avertisment. Astazi lipsesc toate trei conditiile, deci raspunsul e 1.
    moare "productia nu exista si nu se creeaza de aici. Ii trebuie, simultan: (a) datele reale ale firmei (CUI, nr. reg. com., denumire legala), (b) domeniul de productie comunicat de owner, (c) un GO de productie semnat, mai nou de 30 de zile. Niciuna nu e adevarata azi."
    ;;
  *)
    moare "tinta '$TINTA' nu e recunoscuta - azi exista doar main"
    ;;
esac

# --- L2. identitatea sursei ---------------------------------------------------------------------

pas "L2. identitatea sursei"
if [ -z "$LOT" ]; then
  LOT="$(git -C "$RADACINA" symbolic-ref --quiet --short HEAD 2>/dev/null || echo '')"
fi
if [ -z "$SURSA" ]; then
  [ -n "$LOT" ] || moare "nu stiu ce sa promovez: da --sursa <sha40> sau --lot <ramura>"
  SURSA="$(git -C "$RADACINA" rev-parse "$LOT" 2>/dev/null || echo '')"
  [ -n "$SURSA" ] || moare "ramura '$LOT' nu se rezolva local"
  spune "sursa derivata din ramura $LOT"
fi

# Sir-aici, nu conducta: un `$SURSA` cu doua randuri (copiat gresit dintr-o iesire de comanda) ar
# face ca sub `pipefail` potrivirea GASITA sa se citeasca drept esec, si paznicul identitatii ar
# refuza un sha40 corect - sau, mai rau, l-ar accepta pe cel gresit.
if grep -Eq '^[0-9a-f]{40}$' <<< "$SURSA"; then
  trece "sursa e sha40: $SURSA"
else
  if [ "$GO" = "1" ]; then
    moare "--go accepta sursa DOAR ca sha40, nu un ref mobil ('$SURSA'). Ia SHA-ul din proba si repeta."
  fi
  refuz "sursa nu e sha40: '$SURSA'"
fi
SHA7="${SURSA:0:7}"

# --- L3. marcajul de GO --------------------------------------------------------------------------

pas "L3. marcaj de GO"
FISIER_GO="$META/GO/$SURSA.txt"
if [ -f "$FISIER_GO" ] && [ -s "$FISIER_GO" ]; then
  trece "GO gasit: $FISIER_GO"
  spune "      continut: $(head -1 "$FISIER_GO")"
else
  refuz "nu exista GO pentru $SHA7. Promovarea pe un mediu servit e decizie per actiune, nu mandat de sesiune."
  spune "      owner-ul il da asa:"
  spune "      mkdir -p \"$META/GO\" && printf 'GO de la <cine>, %s\\n' \"\$(date -u +%FT%TZ)\" > \"$FISIER_GO\""
fi

# --- L4. poarta locala pe SHA-ul exact -------------------------------------------------------------

pas "L4. poarta locala pe $SHA7"
if [ -d "$META/verdicte" ]; then
  REZULTAT_VERDICT="$(SHA="$SURSA" python - "$META/verdicte" <<'PYTHON'
import io, json, os, sys
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

director, sha = sys.argv[1], os.environ["SHA"]
potrivite = []
for nume in sorted(os.listdir(director)):
    if not nume.endswith(".json"):
        continue
    cale = os.path.join(director, nume)
    try:
        with io.open(cale, encoding="utf-8") as f:
            v = json.load(f)
    except Exception as e:
        continue
    if v.get("sha") != sha:
        continue
    potrivite.append((nume, v))

if not potrivite:
    print("LIPSA|niciun verdict de poarta pentru acest sha")
    sys.exit(0)

# Cel mai recent verdict pentru sha-ul asta. Un verdict verde vechi nu sterge un rosu nou:
# se citeste ULTIMA masuratoare, nu cea mai convenabila.
nume, v = sorted(potrivite, key=lambda p: p[1].get("sfarsit", ""))[-1]
if v.get("cod_final") != 0:
    print("ROSU|%s: cod_final=%s, pasi %s/%s" % (nume, v.get("cod_final"), v.get("pasi_rulati"), v.get("pasi_declarati")))
elif v.get("fisiere_murdare", 0) != 0:
    print("MURDAR|%s: verde, dar masurat pe un arbore cu %s fisiere modificate - descrie masa de lucru, nu commit-ul" % (nume, v.get("fisiere_murdare")))
else:
    print("VERDE|%s: %s pasi, %s ms" % (nume, v.get("pasi_rulati"), v.get("durata_ms")))
PYTHON
)"
else
  REZULTAT_VERDICT="LIPSA|nu exista directorul $META/verdicte"
fi
STARE_VERDICT="${REZULTAT_VERDICT%%|*}"
DETALIU_VERDICT="${REZULTAT_VERDICT#*|}"
if [ "$STARE_VERDICT" = "VERDE" ]; then
  trece "poarta locala verde pe $SHA7 ($DETALIU_VERDICT)"
else
  refuz "poarta locala nu e verde pe $SHA7 [$STARE_VERDICT] $DETALIU_VERDICT"
  spune "      ruleaza: cd <worktree-ul lotului> && bash .claude/scripts/fabrica/poarta.sh"
fi

# --- oprire inainte de retea ------------------------------------------------------------------------

if [ "$REFUZURI" -gt 0 ]; then
  pas "rezumat"
  spune "$REFUZURI conditii locale au picat - nu ating reteaua."
  spune "Conditiile de retea (SHA pe origin, CI pe SHA, fast-forward) raman NEMASURATE, nu trecute."
  exit 1
fi

# --- R1..R3. conditiile de retea ---------------------------------------------------------------------

nevoie_de gh
DEPOZIT="$(depozit_remote)" || nemasurat "nu pot deriva proprietar/nume din remote-ul origin"
spune "depozit: $DEPOZIT"

LUCRU="$(mktemp -d "${TMPDIR:-/tmp}/promov3s-XXXXXX")"
trap 'rm -rf "$LUCRU"' EXIT

pas "R1. SHA-ul exista pe origin"
if gh api "repos/$DEPOZIT/commits/$SURSA" --jq .sha > "$LUCRU/commit.txt" 2>"$LUCRU/commit.err"; then
  trece "commit gasit pe origin"
else
  refuz "SHA-ul $SHA7 nu e pe origin. Impinge intai ramura de lot: git push -u origin $LOT"
  spune "      raspuns: $(head -2 "$LUCRU/commit.err" | tr '\n' ' ')"
fi

pas "R2. CI pe SHA-ul exact"
if [ "$REFUZURI" = "0" ]; then
  if gh api "repos/$DEPOZIT/commits/$SURSA/check-runs" > "$LUCRU/ci.json" 2>"$LUCRU/ci.err"; then
    # Fisier intermediar, nu conducta: peste tamponul tevii, sub `pipefail`, un producator care
    # se opreste devreme face ca raspunsul GASIT sa se citeasca drept esec.
    REZULTAT_CI="$(python - "$LUCRU/ci.json" <<'PYTHON'
import io, json, sys
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

with io.open(sys.argv[1], encoding="utf-8") as f:
    date = json.load(f)
rulari = date.get("check_runs", [])
if not rulari:
    print("FARA_VERDICT|zero rulari CI pe acest sha")
    sys.exit(0)

neterminate = [r["name"] for r in rulari if r.get("status") != "completed"]
if neterminate:
    print("IN_CURS|inca ruleaza: %s" % ", ".join(neterminate))
    sys.exit(0)

# `skipped` NU e verde. E un verdict mostenit din alta parte, si la promovare se cere
# masuratoarea facuta pe SHA-ul care pleaca.
rele = ["%s=%s" % (r["name"], r.get("conclusion")) for r in rulari if r.get("conclusion") != "success"]
if rele:
    print("ROSU|%s" % ", ".join(rele))
else:
    print("VERDE|%s rulari, toate success: %s" % (len(rulari), ", ".join(r["name"] for r in rulari)))
PYTHON
)"
    STARE_CI="${REZULTAT_CI%%|*}"
    DETALIU_CI="${REZULTAT_CI#*|}"
    if [ "$STARE_CI" = "VERDE" ]; then
      trece "CI verde pe $SHA7 ($DETALIU_CI)"
    else
      refuz "CI nu e verde pe $SHA7 [$STARE_CI] $DETALIU_CI"
    fi
  else
    refuz "nu am putut citi rularile CI: $(head -2 "$LUCRU/ci.err" | tr '\n' ' ')"
  fi
else
  spune "sarit - SHA-ul nu e pe origin, deci CI-ul lui nu poate exista"
fi

pas "R3. mutarea e fast-forward"
if [ "$REFUZURI" = "0" ]; then
  TINTA_SHA="$(gh api "repos/$DEPOZIT/git/ref/heads/$TINTA" --jq .object.sha 2>/dev/null || echo '')"
  if [ -z "$TINTA_SHA" ]; then
    refuz "ramura tinta $TINTA nu se rezolva pe origin"
  elif [ "$TINTA_SHA" = "$SURSA" ]; then
    trece "$TINTA e deja pe $SHA7 - nimic de mutat"
  else
    RELATIE="$(gh api "repos/$DEPOZIT/compare/$TINTA_SHA...$SURSA" --jq .status 2>/dev/null || echo '')"
    case "$RELATIE" in
      ahead) trece "fast-forward: $TINTA e stramosul lui $SHA7" ;;
      identical) trece "identice" ;;
      "") refuz "compararea a picat - nu stiu daca mutarea e fast-forward" ;;
      *) refuz "NON-FF ($RELATIE): $TINTA nu e stramosul lui $SHA7. Asta cere o decizie separata a owner-ului, nu promoveaza.sh" ;;
    esac
  fi
else
  spune "sarit - o conditie anterioara a picat"
fi

# --- verdict -----------------------------------------------------------------------------------------

pas "rezumat"
if [ "$REFUZURI" -gt 0 ]; then
  spune "$REFUZURI conditii au picat. NU promovez."
  exit 1
fi

if [ "$GO" != "1" ]; then
  spune "toate conditiile sunt indeplinite pentru $SHA7 -> $TINTA."
  spune "PROBA: nu am schimbat nimic. Pentru executie:"
  spune "  bash .claude/scripts/fabrica/promoveaza.sh --sursa $SURSA --tinta $TINTA --go"
  exit 0
fi

pas "mut $TINTA pe $SHA7"
if gh api -X PATCH "repos/$DEPOZIT/git/refs/heads/$TINTA" -f "sha=$SURSA" -F force=false > "$LUCRU/mutare.json" 2>"$LUCRU/mutare.err"; then
  spune "OK: $TINTA e acum $SURSA"
  spune ""
  spune "Deploy-ul se declanseaza din CI. Ce URMEAZA nu e facut de scriptul asta si nu e dovedit"
  spune "de el: verifica pe viu ca s-a schimbat CONTINUTUL, nu ca serviciul raspunde:"
  spune "  bash .claude/scripts/porti/verifica-staging.sh"
  exit 0
fi
spune "mutarea a picat: $(head -3 "$LUCRU/mutare.err" | tr '\n' ' ')"
exit 1
