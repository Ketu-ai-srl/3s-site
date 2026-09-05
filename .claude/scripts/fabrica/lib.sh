#!/usr/bin/env bash
# lib.sh - ce folosesc in comun cele cinci scripturi de lot ale fabricii 3S.
#
# Se SURSEAZA, nu se executa. Nu pune `set -e` aici: fiecare script isi alege regimul,
# iar o biblioteca sursata care schimba regimul apelantului e o scriere in casa altuia.
#
# Contractul de coduri de iesire, acelasi peste toate scripturile:
#   0 = a mers          1 = a refuzat, cu motiv scris
#   2 = folosire gresita (argument lipsa sau invalid)
#   3 = NEMASURAT: o preconditie a lipsit, deci nu s-a masurat nimic.
#       3 nu inseamna "curat", inseamna "nu stiu". Regula vine din
#       `.claude/rules/masoara-adevarul-nu-surogatul.md`.

# --- afisare -------------------------------------------------------------------------------

spune() { printf '%s\n' "$*"; }
pas()   { printf '\n== %s\n' "$*"; }
avert() { printf 'ATENTIE: %s\n' "$*" >&2; }
moare() { printf 'REFUZ: %s\n' "$*" >&2; exit "${2:-1}"; }
nemasurat() { printf 'NEMASURAT: %s\n' "$*" >&2; exit 3; }
folosire_gresita() { printf 'FOLOSIRE: %s\n' "$*" >&2; exit 2; }

# nevoie_de <comanda> [<comanda>...] - opreste cu 3, nu cu 1: o unealta lipsa inseamna
# ca nu s-a masurat nimic, nu ca verificarea a picat.
nevoie_de() {
  local c lipsa=""
  for c in "$@"; do
    command -v "$c" >/dev/null 2>&1 || lipsa="$lipsa $c"
  done
  [ -z "$lipsa" ] || nemasurat "lipsesc uneltele:$lipsa"
}

# --- ceas ----------------------------------------------------------------------------------

acum_iso() { date -u +%Y-%m-%dT%H:%M:%SZ; }
acum_ms()  { date +%s%3N; }

# --- radacina si meta ----------------------------------------------------------------------

# radacina_repo - depozitul pe care se lucreaza.
#
# `FABRICA_RADACINA` exista ca sa poata proba sa ruleze scripturile pe un depozit fabricat la
# rulare, nu pe cel real. Fara cusatura asta, probele ar trebui sa atinga arborele de lucru al
# omului - adica exact clasa de accidente pe care fabrica incearca sa o evite.
radacina_repo() {
  if [ -n "${FABRICA_RADACINA:-}" ]; then
    [ -d "$FABRICA_RADACINA/.git" ] || [ -f "$FABRICA_RADACINA/.git" ] \
      || nemasurat "FABRICA_RADACINA nu arata spre un depozit git: $FABRICA_RADACINA"
    printf '%s' "$FABRICA_RADACINA"
    return 0
  fi
  git rev-parse --show-toplevel 2>/dev/null \
    || nemasurat "nu sunt intr-un depozit git si FABRICA_RADACINA nu e setat"
}

# radacina_principala - depozitul-parinte, si din interiorul unui worktree de felie.
#
# `radacina_repo` intoarce arborele CURENT, care intr-un worktree de felie e worktree-ul insusi.
# Tot ce e comun lotului - meta, verdicte, marcaje de GO - trebuie sa aiba insa aceeasi adresa
# indiferent de unde se ruleaza scriptul. Directorul git COMUN e singurul lucru pe care toate
# worktree-urile il impart, deci de acolo se deriva.
radacina_principala() {
  local comun rad
  rad="$(radacina_repo)" || return 1
  comun="$(git -C "$rad" rev-parse --path-format=absolute --git-common-dir 2>/dev/null || true)"
  if [ -n "$comun" ]; then
    dirname "$comun"
    return 0
  fi
  radacina_repo
}

# meta_dir - unde traiesc worktree-urile de felie, verdictele si marcajele de GO.
# Implicit LANGA depozit, nu inauntru: un worktree creat sub radacina ar aparea in `git status`
# ca director netraversat si ar murdari arborele pe care il masoara poarta.
meta_dir() {
  if [ -n "${FABRICA_META:-}" ]; then printf '%s' "$FABRICA_META"; return 0; fi
  local rad; rad="$(radacina_principala)" || return 1
  printf '%s' "$(dirname "$rad")/3s-fabrica"
}

# depozit_remote - "proprietar/nume" derivat din `origin`, niciodata scris de mana.
# O constanta scrisa de mana devine falsa in ziua in care depozitul se muta, si nimic nu se
# inroseste; derivarea se inroseste imediat.
depozit_remote() {
  local rad url; rad="$(radacina_repo)" || return 1
  url="$(git -C "$rad" remote get-url origin 2>/dev/null || true)"
  [ -n "$url" ] || return 1
  url="${url%.git}"
  case "$url" in
    *github.com[:/]*) printf '%s' "${url#*github.com}" | sed 's|^[:/]||' ;;
    *) return 1 ;;
  esac
}

# --- legaturi de directoare (Windows) ------------------------------------------------------
#
# DE CE JONCTIUNE SI NU LEGATURA SIMBOLICA: pe statia asta contul nu are dreptul de a crea
# legaturi simbolice (`SeCreateSymbolicLinkPrivilege`), iar Modul Dezvoltator nu e pornit. O
# jonctiune de director (`mklink /J`) e singura forma de legatura pe care Windows o da unui cont
# obisnuit, si e exact ce ne trebuie: `node_modules` e un director si niciodata un fisier.
#
# DE CE `MSYS_NO_PATHCONV=1` SI `cygpath -w`: Git Bash converteste argumentele care arata a cale
# POSIX inainte sa le predea unui program Windows. Fara variabila, `/J` devine o cale si `cmd`
# porneste interactiv fara sa execute nimic - masurat azi, prima incercare a deschis un prompt
# `cmd` si a raportat succes aparent.
#
# DE CE NU SE REINSTALEAZA DEPENDINTELE PER WORKTREE: `pnpm install` intr-un worktree nou costa
# minute si spatiu, iar `node_modules` al pnpm e deja un arbore de legaturi catre magazie. O
# jonctiune spre `node_modules` al radacinii da acelasi arbore, instantaneu.

este_windows() { case "$(uname -s)" in MINGW*|MSYS*|CYGWIN*) return 0 ;; *) return 1 ;; esac; }

# leaga_director <legatura> <tinta> - creeaza legatura, 0 la reusita.
leaga_director() {
  local legatura="$1" tinta="$2"
  [ -d "$tinta" ] || { avert "tinta legaturii nu exista: $tinta"; return 1; }
  [ -e "$legatura" ] && { avert "legatura exista deja: $legatura"; return 1; }
  if este_windows; then
    local l t
    l="$(cygpath -w "$legatura")" || return 1
    t="$(cygpath -w "$tinta")" || return 1
    MSYS_NO_PATHCONV=1 cmd /c mklink /J "$l" "$t" >/dev/null 2>&1 || return 1
  else
    ln -s "$tinta" "$legatura" || return 1
  fi
  [ -e "$legatura" ]
}

# dezleaga_director <legatura> - taie legatura FARA sa atinga tinta.
#
# Masurat azi in Git Bash: `rm -rf` pe directorul parinte NU a urmarit jonctiunea, continutul
# real a supravietuit. Pastrez totusi taierea explicita, si nu din prudenta decorativa: garantia
# de mai sus tine pentru `rm` din MSYS, nu pentru orice alta unealta care ar putea sterge acelasi
# director maine (`Remove-Item -Recurse` din PowerShell, Explorer, un `git worktree remove` viitor).
# Cand taierea e explicita, garantia nu mai depinde de cine sterge.
dezleaga_director() {
  local legatura="$1"
  [ -e "$legatura" ] || [ -L "$legatura" ] || return 0
  if este_windows; then
    local l; l="$(cygpath -w "$legatura")" || return 1
    MSYS_NO_PATHCONV=1 cmd /c rmdir "$l" >/dev/null 2>&1 || rm -f "$legatura" 2>/dev/null || true
  else
    rm -f "$legatura"
  fi
  [ ! -e "$legatura" ]
}

# --- buget de cale pe Windows --------------------------------------------------------------
#
# CE APARA: cu `LongPathsEnabled=0`, o cale absoluta prea lunga face `pnpm build` sa cada cu
# `Module not found` pe un pachet OARECARE. Mesajul trimite in `node_modules`, adica in locul
# gresit: pachetul e intreg si reinstalarea nu repara nimic.
#
# CE E MASURAT AICI SI CE E IMPRUMUTAT, separat explicit:
#   - MASURAT azi pe depozitul asta: cea mai adanca cale RELATIVA din `node_modules` are 215
#     caractere (`next@15.5.25/.../react-server-dom-webpack-client.node.unbundled.development.js`).
#     Cifra NU se citeaza din acest comentariu: `adancime_referinta` o remasoara la fiecare
#     provizionare, fiindca dependintele cresc si o constanta scrisa de mana ar deveni falsa
#     fara ca nimic sa se inroseasca.
#   - IMPRUMUTAT de la fabrica prp, NEmasurat aici: pragul total de 275 de caractere (acolo 275
#     construia, 280 pica). E o proprietate a Windows-ului, nu a proiectului, dar nu am refacut
#     masuratoarea pe stiva noastra, deci pragul e AVERTISMENT, nu refuz.
#
# De ce riscul e mai mic la noi decat la prp: acolo fiecare worktree avea `node_modules` propriu;
# la noi e o jonctiune spre radacina, iar uneltele care rezolva calea reala ajung la calea scurta.
# Bugetul ramane fiindca `.next/` se scrie totusi INAUNTRUL worktree-ului.

# adancime_referinta <radacina> - cea mai adanca cale relativa din `node_modules`, masurata acum.
adancime_referinta() {
  local rad="$1" m
  [ -d "$rad/node_modules" ] || { printf '0'; return 0; }
  m="$(cd "$rad" && find node_modules -type f 2>/dev/null \
        | awk '{ if (length($0) > x) x = length($0) } END { print x + 0 }')"
  case "$m" in ''|*[!0-9]*) m=0 ;; esac
  printf '%s' "$m"
}

# buget_nume <meta> <adancime> - cate caractere are voie numele directorului de worktree.
buget_nume() {
  local meta="$1" adancime="$2" maxim="${FABRICA_CALE_MAX:-275}"
  printf '%s' "$(( maxim - adancime - 1 - ${#meta} - 1 ))"
}

# poarta_cale <cale-worktree> <adancime> - 0 sub prag, 1 peste. Tipareste cifrele MEREU,
# nu doar la depasire: un numar asezat langa gest se citeste, un avertisment rar nu.
poarta_cale() {
  local wt="$1" adancime="$2" maxim="${FABRICA_CALE_MAX:-275}" total
  total=$(( ${#wt} + 1 + adancime ))
  printf 'BUGET CALE: worktree=%s + 1 + adancime masurata=%s = %s (prag %s)\n' \
    "${#wt}" "$adancime" "$total" "$maxim"
  [ "$total" -le "$maxim" ] && return 0
  printf 'CALE PREA LUNGA: %s peste pragul %s. Scurteaza numele cu %s caractere. Un build de aici poate cadea cu "Module not found" pe un pachet oarecare - pachetul e intact, cauza e lungimea caii.\n' \
    "$total" "$maxim" "$(( total - maxim ))" >&2
  return 1
}

# --- worktree-uri ---------------------------------------------------------------------------

# Marcajul de proprietate NU sta in arborele de lucru, ci in directorul git al worktree-ului.
# Un fisier necunoscut lasat in arbore ar aparea in `git status` si ar inrosi poarta de arbore
# curat - adica marcajul care ne ajuta la curatenie ar strica exact masuratoarea pe care o pazim.
marcaj_proprietate() {
  local wt="$1" gd
  gd="$(git -C "$wt" rev-parse --absolute-git-dir 2>/dev/null || true)"
  [ -n "$gd" ] || return 1
  printf '%s/fabrica-proprietar' "$gd"
}

# worktree_e_al_nostru <cale> - 0 daca poarta marcajul fabricii.
worktree_e_al_nostru() {
  local m; m="$(marcaj_proprietate "$1" 2>/dev/null || true)"
  [ -n "$m" ] && [ -f "$m" ]
}

# lista_worktree <radacina> - o cale pe rand, radacina INCLUSA, prima.
# Sursa de adevar e `git worktree list`, niciodata un glob pe disc. Motivul e un incident platit
# pe prp: un glob a raportat 109 "orfane", doua erau worktree-uri vii.
lista_worktree() {
  git -C "$1" worktree list --porcelain \
    | awk '/^worktree /{ print substr($0, 10) }'
}
