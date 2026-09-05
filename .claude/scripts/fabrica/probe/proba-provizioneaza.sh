#!/usr/bin/env bash
# proba-provizioneaza.sh - masoara ce face `provizioneaza.sh`, pe un depozit fabricat la rulare.
#
# MARTOR NEGATIV (forma corecta, NU trebuie prinsa): o felie normala se provizioneaza, iese 0,
# worktree-ul exista, ramura exista, jonctiunea duce la node_modules al radacinii, iar `git status`
# in worktree e CURAT - daca jonctiunea ar murdari arborele, poarta ar fi inrosita de unealta care
# trebuia s-o ajute.
#
# MARTORI POZITIVI (trebuie sa inroseasca): numar de felie care nu e numar; baza inexistenta;
# a doua provizionare peste o ramura ocupata; slug cu caractere interzise.

set -uo pipefail
source "$(dirname "${BASH_SOURCE[0]}")/lib-proba.sh"

RADACINA_FIXTURA="$(mktemp -d "${TMPDIR:-/tmp}/pv-repo-XXXXXX")"
META_FIXTURA="$(mktemp -d "${TMPDIR:-/tmp}/pv-meta-XXXXXX")"
trap 'curata_fixtura "$META_FIXTURA"; curata_fixtura "$RADACINA_FIXTURA"' EXIT

export FABRICA_RADACINA="$RADACINA_FIXTURA"
export FABRICA_META="$META_FIXTURA"
SCRIPT="$FABRICA_DIR/provizioneaza.sh"

depozit_fixtura "$RADACINA_FIXTURA"
unelte_false "$RADACINA_FIXTURA"

titlu "ajutorul si folosirea gresita"
ruleaza bash "$SCRIPT" --ajutor
cod_este 0 "--ajutor iese 0"
contine "provizioneaza.sh <numar-felie>" "--ajutor descrie folosirea"

ruleaza bash "$SCRIPT"
cod_este 2 "MARTOR POZITIV: fara argument = folosire gresita"

ruleaza bash "$SCRIPT" abc
cod_este 2 "MARTOR POZITIV: numar de felie care nu e numar"

ruleaza bash "$SCRIPT" 1 "SLUG_GRESIT"
cod_este 2 "MARTOR POZITIV: slug cu majuscule si liniuta de subliniere"

ruleaza bash "$SCRIPT" 1 --baza ramura-care-nu-exista
cod_este 1 "MARTOR POZITIV: baza inexistenta = refuz"

titlu "proba nu schimba nimic"
INAINTE="$(git -C "$RADACINA_FIXTURA" worktree list | wc -l)"
ruleaza bash "$SCRIPT" 7 experiment --proba
cod_este 0 "--proba iese 0"
contine "PROBA - nu se schimba nimic" "--proba se anunta"
DUPA="$(git -C "$RADACINA_FIXTURA" worktree list | wc -l)"
if [ "$INAINTE" = "$DUPA" ]; then
  reusit "--proba nu a creat niciun worktree ($INAINTE = $DUPA)"
else
  picat "--proba a creat ceva: $INAINTE -> $DUPA"
fi
fals git -C "$RADACINA_FIXTURA" show-ref --verify --quiet "refs/heads/felie/7"

titlu "MARTOR NEGATIV: provizionare normala"
ruleaza bash "$SCRIPT" 3 continut-nap
cod_este 0 "provizionarea unei felii corecte iese 0"
contine "BUGET CALE" "bugetul de cale se tipareste mereu, nu doar la depasire"
contine "Versiune 0.0.0-proba" "uneltele portii au pornit din worktree"

WT="$META_FIXTURA/felie-3-continut-nap"
adevarat test -d "$WT"
adevarat git -C "$RADACINA_FIXTURA" show-ref --verify --quiet "refs/heads/felie/3"

# Jonctiunea: se citeste prin ea un fisier care exista doar in radacina.
adevarat test -f "$WT/node_modules/.bin/tsc"

# Marcajul de proprietate sta in directorul git, nu in arbore.
MARCAJ="$(git -C "$WT" rev-parse --absolute-git-dir)/fabrica-proprietar"
adevarat test -f "$MARCAJ"

MURDAR="$(git -C "$WT" status --porcelain | wc -l | tr -d ' ')"
if [ "$MURDAR" = "0" ]; then
  reusit "arborele worktree-ului e curat - jonctiunea nu apare in git status"
else
  picat "worktree murdar imediat dupa provizionare ($MURDAR fisiere) - poarta ar fi inrosita degeaba"
  git -C "$WT" status --porcelain | sed 's/^/        | /'
fi

# Fara upstream: un push distrat din worktree nu are unde sa se duca singur.
UPSTREAM="$(git -C "$WT" rev-parse --abbrev-ref --symbolic-full-name '@{u}' 2>&1 || true)"
case "$UPSTREAM" in
  *"no upstream"*|*"No upstream"*|*"nu exista"*) reusit "ramura feliei nu are upstream (--no-track)" ;;
  *) picat "ramura feliei ARE upstream: $UPSTREAM" ;;
esac

titlu "MARTOR POZITIV: a doua provizionare peste ramura ocupata"
ruleaza bash "$SCRIPT" 3 alt-slug
cod_este 1 "refuza cand ramura e deja folosita de un worktree"
contine "e deja folosita de worktree-ul" "refuzul spune CINE tine ramura"

titlu "MARTOR POZITIV: numele se scurteaza in bugetul de cale"
# Pragul se coboara deliberat pentru cazul asta: masuratoarea reala e prea generoasa ca sa produca
# scurtarea pe o cale de proba, iar un caz care nu se poate declansa nu dovedeste nimic.
ADANCIME="$(cd "$RADACINA_FIXTURA" && find node_modules -type f | awk '{ if (length($0)>x) x=length($0) } END { print x+0 }')"
PRAG=$(( ${#META_FIXTURA} + ADANCIME + 14 ))
# Slug fara liniute: nu exista limita de cuvant la care sa se taie, deci coada dispare intreaga
# si numele ramane exact `felie-9`. Cu liniute, rezultatul ar depinde de cate segmente incap, iar
# proba ar afirma un nume pe care nu il poate calcula fara sa refaca aritmetica scriptului.
ruleaza env FABRICA_CALE_MAX="$PRAG" bash "$SCRIPT" 9 slugfoartelungcarenuincapenicicum
cod_este 0 "provizionarea reuseste si cu nume scurtat"
contine "NUME SCURTAT" "scurtarea se anunta, nu se face pe tacute"
adevarat test -d "$META_FIXTURA/felie-9"

raport_final
