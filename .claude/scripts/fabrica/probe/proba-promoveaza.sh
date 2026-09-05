#!/usr/bin/env bash
# proba-promoveaza.sh - masoara ce face `promoveaza.sh`.
#
# LIMITA DECLARATA, si e cea mai importanta linie din fisier: partea de retea se masoara pe un `gh`
# FALS, pus in PATH inaintea celui adevarat. Deci ce dovedeste proba e LOGICA scriptului - ce
# accepta, ce refuza, in ce ordine - si NU comportamentul fata de GitHub-ul real. Contractul API
# ramane NEMASURAT aici; se masoara o singura data, pe viu, la primul lot promovat.
#
# MARTORI POZITIVI (trebuie sa inroseasca): lipsa marcajului de GO; verdict de poarta rosu;
# verdict pentru ALT sha; `--go` cu un sha scurt; tinta `productie`; CI cu `skipped`; mutare NON-FF.
#
# MARTOR NEGATIV (forma corecta): GO pentru sha-ul exact + verdict verde pe acelasi sha + CI cu
# toate rularile `success` + fast-forward. Fara `--go` nu se scrie nimic; cu `--go` se cheama
# exact o data mutarea ref-ului.

set -uo pipefail
source "$(dirname "${BASH_SOURCE[0]}")/lib-proba.sh"

RADACINA_FIXTURA="$(mktemp -d "${TMPDIR:-/tmp}/pr-repo-XXXXXX")"
META_FIXTURA="$(mktemp -d "${TMPDIR:-/tmp}/pr-meta-XXXXXX")"
FALS_BIN="$(mktemp -d "${TMPDIR:-/tmp}/pr-bin-XXXXXX")"
trap 'curata_fixtura "$META_FIXTURA"; curata_fixtura "$RADACINA_FIXTURA"; rm -rf "$FALS_BIN"' EXIT

export FABRICA_RADACINA="$RADACINA_FIXTURA"
export FABRICA_META="$META_FIXTURA"
SCRIPT="$FABRICA_DIR/promoveaza.sh"
R="$RADACINA_FIXTURA"

depozit_fixtura "$R"
git -C "$R" remote add origin "https://github.com/Ketu-ai-srl/proba-fabrica.git"
printf '{\n  "name": "fixtura-promovare",\n  "version": "0.0.0",\n  "scripts": { "verifica": "git --version" }\n}\n' > "$R/package.json"
git -C "$R" add -A && git -C "$R" commit -q -m "pachet"
git -C "$R" checkout -q -b lot/proba
printf 'ceva adus de lot\n' > "$R/adus.txt"
git -C "$R" add -A && git -C "$R" commit -q -m "lotul aduce ceva"
SHA="$(git -C "$R" rev-parse HEAD)"
SHA_MAIN="$(git -C "$R" rev-parse main)"

# --- gh fals ---------------------------------------------------------------------------------
#
# Raspunde la exact cele patru cereri pe care le face scriptul, si isi noteaza apelurile de
# SCRIERE intr-un fisier. Fara evidenta asta n-as putea deosebi "a refuzat" de "a scris si a tacut".
cat > "$FALS_BIN/gh" <<'SFARSIT'
#!/usr/bin/env bash
JURNAL="${GH_FALS_JURNAL:?}"
printf '%s\n' "$*" >> "$JURNAL"
for a in "$@"; do case "$a" in -X) ESTE_SCRIERE=1 ;; esac; done
CAPAT=""
urmatorul=0
for a in "$@"; do
  if [ "$urmatorul" = "1" ]; then CAPAT="$a"; urmatorul=0; fi
  [ "$a" = "api" ] && urmatorul=1
done
if [ "${ESTE_SCRIERE:-0}" = "1" ]; then
  printf '%s\n' "$JURNAL" > "${GH_FALS_JURNAL}.scriere"
  echo '{"ref":"refs/heads/main"}'
  exit "${GH_FALS_COD_SCRIERE:-0}"
fi
case "$CAPAT" in
  */commits/*/check-runs) cat "${GH_FALS_CI:?}" ;;
  */commits/*)            [ "${GH_FALS_COMMIT_LIPSA:-0}" = "1" ] && { echo "gh: Not Found (HTTP 404)" >&2; exit 1; }
                          printf '%s\n' "${GH_FALS_SHA:?}" ;;
  */git/ref/heads/*)      printf '%s\n' "${GH_FALS_SHA_TINTA:?}" ;;
  */compare/*)            printf '%s\n' "${GH_FALS_RELATIE:-ahead}" ;;
  *)                      echo "gh fals: capat necunoscut: $CAPAT" >&2; exit 1 ;;
esac
SFARSIT
chmod +x "$FALS_BIN/gh"

export GH_FALS_JURNAL="$FALS_BIN/apeluri.txt"
export GH_FALS_SHA="$SHA"
export GH_FALS_SHA_TINTA="$SHA_MAIN"
export GH_FALS_CI="$FALS_BIN/ci.json"
export PATH="$FALS_BIN:$PATH"

ci_cu() {  # ci_cu <concluzie> - fabrica raspunsul CI la rulare, nu il tine pe disc
  python - "$FALS_BIN/ci.json" "$1" <<'PYTHON'
import io, json, sys
destinatie, concluzie = sys.argv[1], sys.argv[2]
if concluzie == "gol":
    date = {"total_count": 0, "check_runs": []}
else:
    date = {"total_count": 1, "check_runs": [
        {"name": "Verdict CI", "status": "completed", "conclusion": concluzie}]}
with io.open(destinatie, "w", encoding="utf-8", newline="\n") as f:
    json.dump(date, f)
PYTHON
}
ci_cu success

da_go() { mkdir -p "$META_FIXTURA/GO"; printf 'GO de la proba, %s\n' "$(date -u +%FT%TZ)" > "$META_FIXTURA/GO/$1.txt"; }
scoate_go() { rm -f "$META_FIXTURA/GO"/*.txt 2>/dev/null || true; }
scrieri() { [ -f "$GH_FALS_JURNAL.scriere" ] && echo 1 || echo 0; }
uita_apeluri() { rm -f "$GH_FALS_JURNAL" "$GH_FALS_JURNAL.scriere" 2>/dev/null || true; }

titlu "ajutor si folosire gresita"
ruleaza bash "$SCRIPT" --ajutor
cod_este 0 "--ajutor iese 0"
contine "promoveaza.sh [optiuni]" "--ajutor descrie folosirea"

ruleaza bash "$SCRIPT" --forteaza
cod_este 2 "MARTOR POZITIV: argument necunoscut = folosire gresita"

titlu "MARTOR POZITIV: tinta productie e blocata prin proiectare"
ruleaza bash "$SCRIPT" --sursa "$SHA" --tinta productie
cod_este 1 "productia se refuza"
contine "CUI" "refuzul enumera datele reale ale firmei"
contine "GO de productie" "refuzul cere GO-ul de productie"

ruleaza bash "$SCRIPT" --sursa "$SHA" --tinta oarecare
cod_este 1 "MARTOR POZITIV: tinta necunoscuta se refuza"

titlu "MARTOR POZITIV: fara GO si fara verdict"
uita_apeluri; scoate_go
ruleaza bash "$SCRIPT" --sursa "$SHA"
cod_este 1 "refuza cand lipsesc conditiile locale"
contine "nu exista GO pentru" "spune ca lipseste GO-ul"
contine "poarta locala nu e verde" "spune ca lipseste verdictul portii"
contine "raman NEMASURATE, nu trecute" "conditiile de retea se declara nemasurate, nu trecute"
if [ ! -f "$GH_FALS_JURNAL" ]; then
  reusit "CONTROL: nu s-a facut niciun apel de retea cand refuzul local era sigur"
else
  picat "a chemat reteaua degeaba: $(cat "$GH_FALS_JURNAL")"
fi

titlu "MARTOR POZITIV: --go cu sha scurt"
ruleaza bash "$SCRIPT" --sursa "${SHA:0:7}" --go
cod_este 1 "refuza un identificator scurt"
contine "DOAR ca sha40" "refuzul explica de ce cere identitatea exacta"

titlu "verdictul portii pe sha-ul exact"
uita_apeluri; da_go "$SHA"
ruleaza bash "$SCRIPT" --sursa "$SHA"
cod_este 1 "MARTOR POZITIV: GO fara verdict de poarta nu ajunge"
contine "GO gasit" "GO-ul e recunoscut"
contine "poarta locala nu e verde" "verdictul lipsa opreste promovarea"

# Verdictul se produce rulind poarta REALA in fixtura, nu scriind un JSON de mana: un JSON
# fabricat ar dovedi ca stiu formatul, nu ca lantul se leaga.
bash "$FABRICA_DIR/poarta.sh" >/dev/null 2>&1
ruleaza bash "$SCRIPT" --sursa "$SHA"
contine "poarta locala verde" "verdictul scris de poarta.sh e gasit dupa sha"

titlu "MARTOR POZITIV: verdict verde, dar pentru ALT sha"
ruleaza bash "$SCRIPT" --sursa "$SHA_MAIN"
cod_este 1 "un verdict pentru alt commit nu spune nimic despre acesta"

titlu "MARTOR POZITIV: CI cu skipped nu e verde"
uita_apeluri; ci_cu skipped
ruleaza bash "$SCRIPT" --sursa "$SHA"
cod_este 1 "skipped nu se citeste ca succes"
contine "Verdict CI=skipped" "raportul numeste rularea si concluzia ei"

titlu "MARTOR POZITIV: zero rulari CI pe sha"
uita_apeluri; ci_cu gol
ruleaza bash "$SCRIPT" --sursa "$SHA"
cod_este 1 "absenta rularilor nu e un verde"
contine "zero rulari CI" "spune exact ce lipseste"

titlu "MARTOR POZITIV: mutare care nu e fast-forward"
uita_apeluri; ci_cu success
ruleaza env GH_FALS_RELATIE=diverged bash "$SCRIPT" --sursa "$SHA"
cod_este 1 "o mutare divergenta se refuza"
contine "NON-FF" "refuzul numeste clasa problemei"

titlu "MARTOR NEGATIV: toate conditiile indeplinite, fara --go"
uita_apeluri; ci_cu success
ruleaza bash "$SCRIPT" --sursa "$SHA"
cod_este 0 "proba curata iese 0"
contine "toate conditiile sunt indeplinite" "spune ca ar putea promova"
contine "nu am schimbat nimic" "proba se declara proba"
if [ "$(scrieri)" = "0" ]; then
  reusit "CONTROL: fara --go nu s-a facut niciun apel de scriere"
else
  picat "a scris fara --go: $(cat "$GH_FALS_JURNAL")"
fi

titlu "MARTOR NEGATIV: cu --go se face mutarea, o singura data"
uita_apeluri
ruleaza bash "$SCRIPT" --sursa "$SHA" --go
cod_este 0 "promovarea iese 0"
if [ "$(scrieri)" = "1" ]; then
  reusit "s-a facut apelul de scriere"
else
  picat "nu s-a facut niciun apel de scriere desi --go era dat"
fi
NR_PATCH="$(grep -c -- '-X PATCH' "$GH_FALS_JURNAL" || true)"
if [ "$NR_PATCH" = "1" ]; then
  reusit "exact un apel de mutare a ref-ului"
else
  picat "apeluri de mutare: $NR_PATCH (asteptat 1)"
fi
contine "verifica-staging.sh" "dupa promovare trimite la dovada pe viu, nu declara succesul livrarii"

raport_final
