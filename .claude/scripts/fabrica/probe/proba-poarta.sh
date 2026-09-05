#!/usr/bin/env bash
# proba-poarta.sh - masoara ce face `poarta.sh`.
#
# MARTOR NEGATIV (forma corecta): un proiect cu doi pasi care ies 0 - poarta iese 0, marcajul de
# verdict apare, iar JSON-ul are `cod_final: 0` si doi pasi rulati.
#
# MARTOR POZITIV (trebuie sa inroseasca): al doilea pas iese 1 - poarta iese 1, marcajul de verdict
# LIPSESTE din iesire, si JSON-ul numeste pasul picat cu codul lui.
#
# CONTROLUL CARE APARA PROBA INSASI: `--ajutor` NU are voie sa contina marcajul de verdict. Daca
# textul de ajutor l-ar purta, orice proba care cauta marcajul in iesire ar raporta verde pentru o
# rulare care n-a masurat nimic - exact clasa „comentariul care declanseaza mecanismul".

set -uo pipefail
source "$(dirname "${BASH_SOURCE[0]}")/lib-proba.sh"

RADACINA_FIXTURA="$(mktemp -d "${TMPDIR:-/tmp}/pg-repo-XXXXXX")"
META_FIXTURA="$(mktemp -d "${TMPDIR:-/tmp}/pg-meta-XXXXXX")"
trap 'curata_fixtura "$META_FIXTURA"; curata_fixtura "$RADACINA_FIXTURA"' EXIT

export FABRICA_RADACINA="$RADACINA_FIXTURA"
export FABRICA_META="$META_FIXTURA"
SCRIPT="$FABRICA_DIR/poarta.sh"
MARCAJ_ASTEPTAT="POARTA_3S_TOTUL_VERDE"

depozit_fixtura "$RADACINA_FIXTURA"

# scrie_pachet <valoarea lui pas-greu> - fixtura se rescrie la fiecare caz, la rulare.
scrie_pachet() {
  local pas_greu="$1"
  python - "$RADACINA_FIXTURA/package.json" "$pas_greu" <<'PYTHON'
import io, json, sys
destinatie, pas_greu = sys.argv[1], sys.argv[2]
pachet = {
    "name": "fixtura-poarta",
    "version": "0.0.0",
    "private": True,
    "scripts": {
        "pas-usor": "git --version",
        "pas-greu": pas_greu,
        "verifica": "pnpm pas-usor && pnpm pas-greu",
    },
}
with io.open(destinatie, "w", encoding="utf-8", newline="\n") as f:
    json.dump(pachet, f, ensure_ascii=False, indent=2)
    f.write("\n")
PYTHON
  git -C "$RADACINA_FIXTURA" add -A
  git -C "$RADACINA_FIXTURA" commit -q -m "pachet: pas-greu=$pas_greu"
}

# ultimul_verdict - calea celui mai recent JSON scris de poarta.
ultimul_verdict() { ls -t "$META_FIXTURA/verdicte"/*.json 2>/dev/null | head -1; }

# camp_verdict <fisier> <cheie>
camp_verdict() {
  python - "$1" "$2" <<'PYTHON'
import io, json, sys
with io.open(sys.argv[1], encoding="utf-8") as f:
    print(json.load(f)[sys.argv[2]])
PYTHON
}

titlu "ajutor si control pe marcajul de verdict"
ruleaza bash "$SCRIPT" --ajutor
cod_este 0 "--ajutor iese 0"
nu_contine "$MARCAJ_ASTEPTAT" "CONTROL: ajutorul nu poarta marcajul de verdict"

ruleaza bash "$SCRIPT" --argument-inventat
cod_este 2 "MARTOR POZITIV: argument necunoscut = folosire gresita"

titlu "MARTOR POZITIV: package.json fara scriptul verifica"
printf '{\n  "name": "fara-verifica",\n  "version": "0.0.0",\n  "scripts": {}\n}\n' > "$RADACINA_FIXTURA/package.json"
git -C "$RADACINA_FIXTURA" add -A && git -C "$RADACINA_FIXTURA" commit -q -m "fara verifica"
ruleaza bash "$SCRIPT"
cod_este 3 "fara scriptul verifica raspunsul e NEMASURAT, nu verde"
nu_contine "$MARCAJ_ASTEPTAT" "nemasurat nu tipareste marcajul"

titlu "MARTOR POZITIV: lantul portii cu || in loc de &&"
python - "$RADACINA_FIXTURA/package.json" <<'PYTHON'
import io, json, sys
pachet = {"name": "cu-sau", "version": "0.0.0", "scripts": {"verifica": "git --version || true"}}
with io.open(sys.argv[1], "w", encoding="utf-8", newline="\n") as f:
    json.dump(pachet, f, indent=2)
    f.write("\n")
PYTHON
git -C "$RADACINA_FIXTURA" add -A && git -C "$RADACINA_FIXTURA" commit -q -m "verifica cu sau"
ruleaza bash "$SCRIPT"
cod_este 3 "un lant care nu opreste la rosu nu e o poarta: NEMASURAT"
contine "se compune doar cu" "refuzul spune de ce"

titlu "proba nu ruleaza pasii"
scrie_pachet "git --version"
ruleaza bash "$SCRIPT" --proba
cod_este 0 "--proba iese 0"
contine "PROBA - nu se ruleaza niciun pas" "--proba se anunta"
contine "pnpm pas-usor" "--proba listeaza pasii cititi din package.json"
nu_contine "$MARCAJ_ASTEPTAT" "--proba nu tipareste marcajul de verdict"
if [ -z "$(ultimul_verdict)" ]; then
  reusit "--proba nu a scris niciun verdict pe disc"
else
  picat "--proba a scris un verdict: $(ultimul_verdict)"
fi

titlu "MARTOR NEGATIV: toti pasii ies 0"
ruleaza bash "$SCRIPT"
cod_este 0 "poarta verde iese 0"
contine "$MARCAJ_ASTEPTAT" "marcajul de verdict apare la verde"
V="$(ultimul_verdict)"
if [ -n "$V" ]; then
  reusit "verdictul s-a scris: $(basename "$V")"
  [ "$(camp_verdict "$V" cod_final)" = "0" ] && reusit "cod_final = 0" || picat "cod_final nu e 0"
  [ "$(camp_verdict "$V" pasi_rulati)" = "2" ] && reusit "doi pasi rulati" || picat "numar gresit de pasi rulati"
  [ "$(camp_verdict "$V" fisiere_murdare)" = "0" ] && reusit "arbore curat consemnat" || picat "arborele nu era curat"
else
  picat "poarta verde nu a scris niciun verdict"
fi

titlu "MARTOR POZITIV: al doilea pas iese diferit de 0"
rm -f "$META_FIXTURA/verdicte"/*.json
scrie_pachet "git aceasta-subcomanda-nu-exista"
ruleaza bash "$SCRIPT"
cod_este 1 "poarta rosie iese 1"
nu_contine "$MARCAJ_ASTEPTAT" "CONTROL: marcajul LIPSESTE cand un pas a picat"
V="$(ultimul_verdict)"
if [ -n "$V" ]; then
  [ "$(camp_verdict "$V" cod_final)" = "1" ] && reusit "cod_final = 1" || picat "cod_final nu e 1"
  COD_PAS="$(python - "$V" <<'PYTHON'
import io, json, sys
with io.open(sys.argv[1], encoding="utf-8") as f:
    pasi = json.load(f)["pasi"]
print(pasi[-1]["cod"])
PYTHON
)"
  if [ "$COD_PAS" != "0" ]; then reusit "ultimul pas are cod $COD_PAS in JSON"; else picat "JSON-ul zice ca ultimul pas a iesit 0"; fi
else
  picat "poarta rosie nu a scris niciun verdict"
fi

titlu "arborele murdar se consemneaza, nu se ascunde"
rm -f "$META_FIXTURA/verdicte"/*.json
scrie_pachet "git --version"
printf 'ceva nesalvat\n' > "$RADACINA_FIXTURA/lucru-in-desfasurare.txt"
ruleaza bash "$SCRIPT"
cod_este 0 "poarta ruleaza si pe arbore murdar"
contine "fisiere modificate" "avertismentul de arbore murdar apare"
V="$(ultimul_verdict)"
if [ -n "$V" ] && [ "$(camp_verdict "$V" fisiere_murdare)" != "0" ]; then
  reusit "JSON-ul consemneaza fisierele murdare"
else
  picat "JSON-ul nu consemneaza ca verdictul descrie masa de lucru, nu commit-ul"
fi
rm -f "$RADACINA_FIXTURA/lucru-in-desfasurare.txt"

raport_final
