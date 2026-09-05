#!/usr/bin/env bash
# proba-igiena.sh - poarta care apara scripturile fabricii de ele insele.
#
# O poarta scrisa gresit e mai rea decat o poarta absenta: raporteaza verde exact pe cazurile pe
# care ar trebui sa le prinda. Aici se scaneaza fisierele din `.claude/scripts/fabrica/` dupa trei
# tipare care au produs deja masuratori false, fiecare cu martorul lui.
#
# 1. o conducta care se termina intr-un `grep` cu iesire devreme - peste tamponul tevii, sub
#    `pipefail`, o potrivire REUSITA se citeste ca esec. Conteaza iesirea devreme, nu teava in sine.
#    Tiparul se descrie, nu se scrie: altfel fisierul asta ar deveni propriul lui caz.
# 2. caracterul de retur de car intr-un fisier de script - pe Windows face ca o potrivire sa
#    reuseasca sau sa esueze dupa POZITIA randului. Se DESCRIE, nu se scrie: un tipar care il
#    poarta pe litere ar deveni el insusi o instanta a lui.
# 3. liniuta lunga - regula de tipografie a proiectului: doar cratima.
#
# Scanarea se face cu python, nu cu `grep`: `grep` intr-o localizare non-UTF-8 nu vede punctele de
# cod, ci octetii, si atunci raspunde despre altceva decat ce am intrebat.

set -uo pipefail
source "$(dirname "${BASH_SOURCE[0]}")/lib-proba.sh"

SCANER="$(mktemp -d "${TMPDIR:-/tmp}/ig-XXXXXX")"
trap 'rm -rf "$SCANER"' EXIT

# scaneaza <director> -> tipareste constatarile, iese 1 daca a gasit ceva
cat > "$SCANER/scaneaza.py" <<'PYTHON'
import io, os, re, sys
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

RETUR_DE_CAR = chr(13)
LINIUTE_LUNGI = (chr(8211), chr(8212))
# Conducta care se termina in `grep -q`. Tiparul cere un `|` inaintea lui, deci un `grep -q` pe
# FISIER - forma corecta - nu se prinde.
CONDUCTA = re.compile(r"\|\s*grep\s+(-[a-zA-Z]*\s+)*-[a-zA-Z]*q")

constatari = 0
fisiere = 0
for radacina, directoare, nume_fisiere in os.walk(sys.argv[1]):
    for nume in sorted(nume_fisiere):
        if not (nume.endswith(".sh") or nume.endswith(".py")):
            continue
        cale = os.path.join(radacina, nume)
        with io.open(cale, encoding="utf-8", errors="replace", newline="") as f:
            continut = f.read()
        fisiere += 1
        for nr, linie in enumerate(continut.split("\n"), 1):
            if CONDUCTA.search(linie):
                print("%s:%s: conducta care se termina in grep -q" % (cale, nr))
                constatari += 1
            if RETUR_DE_CAR in linie:
                print("%s:%s: caracter de retur de car intr-un script" % (cale, nr))
                constatari += 1
            for liniuta in LINIUTE_LUNGI:
                if liniuta in linie:
                    print("%s:%s: liniuta lunga (doar cratima e permisa)" % (cale, nr))
                    constatari += 1

print("fisiere scanate: %d, constatari: %d" % (fisiere, constatari))
sys.exit(1 if constatari else 0)
PYTHON

titlu "MARTOR POZITIV: fisiere fabricate cu exact defectele vanate"
POZITIV="$SCANER/pozitiv"
mkdir -p "$POZITIV"
# Fixtura se asambleaza la RULARE, din bucati: daca proba ar purta tiparul scris literal, s-ar
# prinde singura si ar raporta un defect care nu exista in cod.
printf 'cat fisier %s grep %sq tinta\n' '|' '-' > "$POZITIV/conducta.sh"
printf 'echo unu%s\necho doi\n' "$(printf '\r')" > "$POZITIV/retur.sh"
python -c "import io,sys; io.open(sys.argv[1],'w',encoding='utf-8',newline='\n').write('# text cu liniuta lunga ' + chr(8212) + ' aici\n')" "$POZITIV/liniuta.sh"

ruleaza python "$SCANER/scaneaza.py" "$POZITIV"
cod_este 1 "scanerul iese 1 pe fisierele cu defecte"
contine "conducta care se termina in grep -q" "prinde conducta"
contine "caracter de retur de car" "prinde returul de car"
contine "liniuta lunga" "prinde liniuta lunga"
contine "fisiere scanate: 3" "spune cate fisiere a scanat, nu doar ca a terminat"

titlu "MARTOR NEGATIV: forme corecte, care NU trebuie prinse"
NEGATIV="$SCANER/negativ"
mkdir -p "$NEGATIV"
# `grep -q` pe un FISIER e corect: nu exista teava, deci nu exista iesire devreme care sa minta.
printf 'if grep -q tinta fisier.txt; then echo gasit; fi\n' > "$NEGATIV/pe-fisier.sh"
printf 'cat fisier %s grep -c tinta\n' '|' > "$NEGATIV/numarare.sh"
printf '# comentariu cu cratima - normala\n' > "$NEGATIV/cratima.sh"
ruleaza python "$SCANER/scaneaza.py" "$NEGATIV"
cod_este 0 "scanerul iese 0 pe formele corecte"
contine "constatari: 0" "zero constatari, si o spune cu cifra"

titlu "scripturile fabricii, scanate cu adevarat"
ruleaza python "$SCANER/scaneaza.py" "$FABRICA_DIR"
cod_este 0 "scripturile fabricii trec propria igiena"
contine "fisiere scanate:" "numarul de fisiere scanate se tipareste"
# Controlul care deosebeste "curat" de "n-a gasit nimic de scanat": daca numarul ar fi 0, verdictul
# de mai sus ar fi verde pe multimea goala.
NR="$(printf '%s' "$IESIRE" | sed -n 's/^fisiere scanate: \([0-9]*\),.*/\1/p')"
if [ -n "$NR" ] && [ "$NR" -ge 10 ]; then
  reusit "s-au scanat $NR fisiere (nu o multime goala)"
else
  picat "s-au scanat $NR fisiere - prea putine ca verdictul sa insemne ceva"
fi

raport_final
