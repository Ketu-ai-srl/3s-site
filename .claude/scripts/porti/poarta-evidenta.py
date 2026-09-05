#!/usr/bin/env python3
"""Evidenta afirmatiilor: fiecare afirmatie verificabila de pe site are o sursa.

De ce exista: owner-ul a decis ca site-ul se scrie ACUM, iar confirmarea de la client
vine la final, ca runda de editare. Fara un registru, "le editam la final" se transforma
intr-o recitire din memorie, si memoria dispecerului cedeaza prima sub viteza.

Registrul e un DIRECTOR, `src/content/afirmatii/`, cu cate un fisier JSON per pagina.
Nu un singur fisier: in fabrica lucreaza mai multi agenti deodata, iar un singur fisier
cu o lista ar fi produs conflict de imbinare la fiecare lot cu doua pagini noi. Un fisier
per felie inseamna multimi de fisiere disjuncte, adica exact conditia paralelismului.
Fiecare fisier e o lista de intrari:
  {
    "id": "depozit-golesti",
    "text": "Depozitul este la Golesti, langa Pitesti",
    "unde": "src/app/page.tsx",
    "stare": "neconfirmat",          // confirmat | neconfirmat | retras
    "sursa": "",                      // obligatorie cand stare = confirmat
    "confirmat_de": "",               // cine a confirmat, si cand
    "data": ""
  }

Poarta face trei lucruri:
  1. verifica structura registrului (campuri obligatorii, stari cunoscute);
  2. cere SURSA pentru orice intrare cu stare `confirmat` - o confirmare fara sursa
     e o parere, nu o dovada;
  3. genereaza `docs/afirmatii/<nume>.md`, cate o lista per fisier de registru - listele
     inchise pe care le pune cineva in fata clientului. Daca fisierul generat difera de
     cel din arbore, poarta pica: altfel lista imbatraneste tacut si nimeni nu observa.
     O lista ramasa fara registru se STERGE, din acelasi motiv.

     Cate una per registru, nu una singura: fisierul unic era ultimul punct in care patru
     felii paralele se ciocneau la fiecare lot. Poarta cere ca lista sa fie in acelasi
     commit, deci fiecare agent o regenera si o comitea - corect, si totusi conflict de
     fiecare data. O iesire partajata reintroduce exact cuplarea pe care intrarea, deja
     sparta pe fisiere, o desfacuse.

CONTROALE la fiecare rulare:
  - martor pozitiv: o intrare fabricata cu stare `confirmat` si sursa goala TREBUIE
    sa fie prinsa; daca nu, poarta nu masoara nimic (iesire 3);
  - martor negativ: o intrare corecta NU trebuie prinsa.

IESIRE: 0 curat - 1 probleme gasite - 2 folosire gresita - 3 control picat
"""
import glob
import io
import json
import os
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

RADACINA = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
REGISTRU = os.path.join(RADACINA, 'src', 'content', 'afirmatii')
LISTA = os.path.join(RADACINA, 'docs', 'afirmatii-de-confirmat.md')  # forma veche, se sterge
DOSAR_LISTE = os.path.join(RADACINA, 'docs', 'afirmatii')
STARI = {'confirmat', 'neconfirmat', 'retras'}
OBLIGATORII = ('id', 'text', 'unde', 'stare')


def probleme(intrari):
    """Intoarce lista de mesaje. Goala = registrul e in regula."""
    gasite = []
    vazute = set()
    for i, intrare in enumerate(intrari):
        eticheta = intrare.get('id') or ('intrarea ' + str(i + 1))
        for camp in OBLIGATORII:
            if not intrare.get(camp):
                gasite.append(eticheta + ': lipseste campul obligatoriu `' + camp + '`')
        stare = intrare.get('stare')
        if stare and stare not in STARI:
            gasite.append(eticheta + ': stare necunoscuta `' + str(stare) + '` (asteptat: ' + ', '.join(sorted(STARI)) + ')')
        if stare == 'confirmat' and not intrare.get('sursa'):
            gasite.append(eticheta + ': marcata `confirmat` FARA sursa - o confirmare fara sursa e o parere')
        if stare == 'confirmat' and not intrare.get('confirmat_de'):
            gasite.append(eticheta + ': marcata `confirmat` fara sa spuna CINE a confirmat')
        ident = intrare.get('id')
        if ident:
            if ident in vazute:
                gasite.append(eticheta + ': id duplicat')
            vazute.add(ident)
    return gasite


def genereaza_lista(intrari, sursa='src/content/afirmatii/'):
    neconfirmate = [i for i in intrari if i.get('stare') == 'neconfirmat']
    randuri = []
    randuri.append('# Afirmatii de confirmat')
    randuri.append('')
    randuri.append('> Generat automat din `' + sursa + '`. NU se editeaza de mana:')
    randuri.append('> se schimba registrul, iar poarta regenereaza fisierul si pica daca difera.')
    randuri.append('')
    randuri.append('Lista de mai jos e ce trebuie sa bifeze cineva care stie afacerea, inainte de publicare.')
    randuri.append('Pana atunci, afirmatiile stau pe site ca text redactional, nu ca fapt verificat.')
    randuri.append('')
    randuri.append('**De confirmat: ' + str(len(neconfirmate)) + ' din ' + str(len(intrari)) + '**')
    randuri.append('')
    if neconfirmate:
        randuri.append('| # | Afirmatia, asa cum apare pe site | Unde |')
        randuri.append('|---|---|---|')
        for n, i in enumerate(neconfirmate, start=1):
            text = i.get('text', '').replace('|', '\\|')
            randuri.append('| ' + str(n) + ' | ' + text + ' | `' + i.get('unde', '') + '` |')
    else:
        randuri.append('Nimic de confirmat: fiecare afirmatie are sursa.')
    randuri.append('')
    return '\n'.join(randuri) + '\n'


def controale():
    rau = [{'id': 'proba', 'text': 'ceva', 'unde': 'x', 'stare': 'confirmat', 'sursa': ''}]
    if not probleme(rau):
        return 'martorul pozitiv nu a fost prins: o confirmare fara sursa a trecut'
    bun = [{'id': 'proba', 'text': 'ceva', 'unde': 'x', 'stare': 'confirmat',
            'sursa': 'discutie cu clientul', 'confirmat_de': 'cineva, 2026-09-05'}]
    if probleme(bun):
        return 'martorul negativ a fost prins: o intrare corecta e raportata ca defecta'
    return None


def main():
    motiv = controale()
    if motiv:
        print('CONTROL PICAT: ' + motiv, file=sys.stderr)
        return 3

    if not os.path.isdir(REGISTRU):
        print('Registrul lipseste: ' + os.path.relpath(REGISTRU, RADACINA) + os.sep, file=sys.stderr)
        print('E un DIRECTOR cu cate un fisier JSON per pagina. Se creeaza si se pune in el', file=sys.stderr)
        print('cate o lista pentru fiecare felie de continut.', file=sys.stderr)
        return 1

    cai = sorted(glob.glob(os.path.join(REGISTRU, '*.json')))
    if not cai:
        print('Registrul e gol: niciun fisier .json in ' + os.path.relpath(REGISTRU, RADACINA),
              file=sys.stderr)
        print('Un registru gol pe un site cu text nu e "curat", e NEMASURAT.', file=sys.stderr)
        return 3

    intrari = []
    per_fisier = []
    for c in cai:
        rel = os.path.relpath(c, RADACINA)
        try:
            bucata = json.load(io.open(c, encoding='utf-8'))
        except ValueError as e:
            print(rel + ': nu e JSON valid: ' + str(e), file=sys.stderr)
            return 1
        if not isinstance(bucata, list):
            print(rel + ': fiecare fisier de registru trebuie sa fie o lista de intrari.', file=sys.stderr)
            return 1
        for intrare in bucata:
            if isinstance(intrare, dict):
                intrare.setdefault('fisier_registru', rel)
        intrari.extend(bucata)
        per_fisier.append((os.path.splitext(os.path.basename(c))[0], rel, bucata))

    gasite = probleme(intrari)
    for g in gasite:
        print(g)

    # O lista GENERATA per fisier de registru, nu una singura.
    #
    # De ce s-a schimbat: fisierul unic era ultimul punct in care patru felii care lucreaza
    # in paralel se ciocneau la fiecare lot. Nu din vina lor - poarta cere ca lista sa fie
    # in acelasi commit, deci fiecare agent o regenera si o comitea, corect. Registrul era
    # deja spart pe fisiere; iesirea nu era, si o iesire partajata reintroduce exact cuplarea
    # pe care intrarea o desfacuse. Acum multimile sunt disjuncte pe tot lantul.
    os.makedirs(DOSAR_LISTE, exist_ok=True)
    scrise = set()
    for nume, rel, bucata in per_fisier:
        cale_iesire = os.path.join(DOSAR_LISTE, nume + '.md')
        scrise.add(os.path.basename(cale_iesire))
        asteptat = genereaza_lista(bucata, rel.replace(os.sep, '/'))
        actual = io.open(cale_iesire, encoding='utf-8').read() if os.path.isfile(cale_iesire) else ''
        if actual != asteptat:
            io.open(cale_iesire, 'w', encoding='utf-8', newline='\n').write(asteptat)
            print('LISTA REGENERATA: ' + os.path.relpath(cale_iesire, RADACINA)
                  + ' - adaug-o in acelasi commit')
            gasite.append('lista pentru ' + nume + ' era invechita')

    # Un fisier de iesire ramas dupa ce registrul lui a disparut e o lista care imbatraneste
    # tacut, si cineva o va citi crezand ca e la zi.
    for orfan in sorted(os.path.basename(p) for p in glob.glob(os.path.join(DOSAR_LISTE, '*.md'))):
        if orfan not in scrise:
            os.remove(os.path.join(DOSAR_LISTE, orfan))
            print('LISTA STEARSA: ' + orfan + ' - registrul din care venea nu mai exista')
            gasite.append('lista orfana ' + orfan)

    # Fisierul unic vechi nu se mai genereaza. Cat timp ramane pe disc, e o a doua lista
    # care nu se mai actualizeaza - exact defectul impotriva caruia exista poarta asta.
    if os.path.isfile(LISTA):
        os.remove(LISTA)
        print('LISTA VECHE STEARSA: ' + os.path.relpath(LISTA, RADACINA)
              + ' - a fost inlocuita de cate un fisier per registru')
        gasite.append('lista unica veche mai era pe disc')

    neconfirmate = sum(1 for i in intrari if i.get('stare') == 'neconfirmat')
    print('CONTROALE: martor pozitiv OK, martor negativ OK')
    print('REGISTRU: ' + str(len(intrari)) + ' afirmatii, din care ' + str(neconfirmate) + ' neconfirmate')
    print('PROBLEME: ' + str(len(gasite)))
    return 1 if gasite else 0


if __name__ == '__main__':
    sys.exit(main())
