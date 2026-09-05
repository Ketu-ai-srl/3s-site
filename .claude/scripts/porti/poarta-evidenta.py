#!/usr/bin/env python3
"""Evidenta afirmatiilor: fiecare afirmatie verificabila de pe site are o sursa.

De ce exista: owner-ul a decis ca site-ul se scrie ACUM, iar confirmarea de la client
vine la final, ca runda de editare. Fara un registru, "le editam la final" se transforma
intr-o recitire din memorie, si memoria dispecerului cedeaza prima sub viteza.

Registrul e `src/content/afirmatii.json`, o lista de intrari:
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
  3. genereaza `docs/afirmatii-de-confirmat.md`, lista inchisa pe care o pune cineva
     in fata clientului. Daca fisierul generat difera de cel din arbore, poarta pica:
     altfel lista imbatraneste tacut si nimeni nu observa.

CONTROALE la fiecare rulare:
  - martor pozitiv: o intrare fabricata cu stare `confirmat` si sursa goala TREBUIE
    sa fie prinsa; daca nu, poarta nu masoara nimic (iesire 3);
  - martor negativ: o intrare corecta NU trebuie prinsa.

IESIRE: 0 curat - 1 probleme gasite - 2 folosire gresita - 3 control picat
"""
import io
import json
import os
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

RADACINA = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
REGISTRU = os.path.join(RADACINA, 'src', 'content', 'afirmatii.json')
LISTA = os.path.join(RADACINA, 'docs', 'afirmatii-de-confirmat.md')
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


def genereaza_lista(intrari):
    neconfirmate = [i for i in intrari if i.get('stare') == 'neconfirmat']
    randuri = []
    randuri.append('# Afirmatii de confirmat')
    randuri.append('')
    randuri.append('> Generat automat din `src/content/afirmatii.json`. NU se editeaza de mana:')
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

    if not os.path.isfile(REGISTRU):
        print('Registrul lipseste: ' + os.path.relpath(REGISTRU, RADACINA), file=sys.stderr)
        print('Se creeaza cu o lista goala `[]` si se completeaza pe masura ce se scrie continut.', file=sys.stderr)
        return 1

    try:
        intrari = json.load(io.open(REGISTRU, encoding='utf-8'))
    except ValueError as e:
        print('Registrul nu e JSON valid: ' + str(e), file=sys.stderr)
        return 1
    if not isinstance(intrari, list):
        print('Registrul trebuie sa fie o lista de intrari.', file=sys.stderr)
        return 1

    gasite = probleme(intrari)
    for g in gasite:
        print(g)

    asteptat = genereaza_lista(intrari)
    actual = io.open(LISTA, encoding='utf-8').read() if os.path.isfile(LISTA) else ''
    if actual != asteptat:
        os.makedirs(os.path.dirname(LISTA), exist_ok=True)
        io.open(LISTA, 'w', encoding='utf-8', newline='\n').write(asteptat)
        print('LISTA REGENERATA: ' + os.path.relpath(LISTA, RADACINA) + ' - adaug-o in acelasi commit')
        gasite.append('lista de confirmat era invechita')

    neconfirmate = sum(1 for i in intrari if i.get('stare') == 'neconfirmat')
    print('CONTROALE: martor pozitiv OK, martor negativ OK')
    print('REGISTRU: ' + str(len(intrari)) + ' afirmatii, din care ' + str(neconfirmate) + ' neconfirmate')
    print('PROBLEME: ' + str(len(gasite)))
    return 1 if gasite else 0


if __name__ == '__main__':
    sys.exit(main())
