#!/usr/bin/env bash
# ruleaza-probele.sh - toate probele mecanicii de lot, cu un singur cod de iesire.
#
# ORDINEA E DUPA COST, cea ieftina prima: un pas ieftin asezat dupa cel scump nu economiseste
# nimic. `proba-igiena.sh` merge prima fiindca apara celelalte probe de ele insele - o proba
# scrisa gresit raporteaza verde exact pe ce ar trebui sa prinda.
#
# NU SE OPRESTE LA PRIMA PICATA. Un raport partial ascunde cate lucruri sunt de reparat, iar
# probele sunt independente: ruleaza toate, si rezumatul spune care si cate.
#
# Iesire: 0 toate verzi · 1 cel putin una picata · 3 nu s-a gasit nicio proba

set -uo pipefail
AICI="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

ORDINE="proba-igiena.sh proba-plieaza.sh proba-provizioneaza.sh proba-curata.sh proba-poarta.sh proba-promoveaza.sh"

# Ce e pe disc, comparat cu ce e in ordine. Fara controlul asta, o proba noua adaugata in director
# si uitata aici ar face suita sa raporteze verde fara s-o ruleze niciodata.
PE_DISC="$(cd "$AICI" && ls proba-*.sh 2>/dev/null | sort)"
IN_ORDINE="$(printf '%s\n' $ORDINE | sort)"
if [ "$PE_DISC" != "$IN_ORDINE" ]; then
  printf 'NEMASURAT: lista de probe din script nu e cea de pe disc.\n' >&2
  printf 'pe disc:\n%s\nin ordine:\n%s\n' "$PE_DISC" "$IN_ORDINE" >&2
  exit 3
fi

TOTAL=0; PICATE=0
REZUMAT=""

for nume in $ORDINE; do
  printf '\n========================================================================\n'
  printf '## %s\n' "$nume"
  TOTAL=$(( TOTAL + 1 ))
  t0="$(date +%s%3N)"
  if bash "$AICI/$nume"; then cod=0; else cod=$?; fi
  t1="$(date +%s%3N)"
  if [ "$cod" = "0" ]; then
    REZUMAT="$REZUMAT
  VERDE  $nume ($(( t1 - t0 )) ms)"
  else
    PICATE=$(( PICATE + 1 ))
    REZUMAT="$REZUMAT
  ROSU   $nume (cod $cod, $(( t1 - t0 )) ms)"
  fi
done

printf '\n========================================================================\n'
printf '## rezumat%s\n' "$REZUMAT"
printf '\nprobe rulate: %s · picate: %s\n' "$TOTAL" "$PICATE"

if [ "$TOTAL" = "0" ]; then exit 3; fi
[ "$PICATE" = "0" ]
