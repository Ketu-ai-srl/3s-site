#!/usr/bin/env python3
"""Poarta de limba romana: diacritice complete si o singura forma de adresare.

De ce exista: concurentul analizat (arhivix.com) livreaza pe site-ul lui ROMANESC
titluri fara diacritice, o pagina intreaga netradusa si o cheie de traducere ramasa
in tabelul de preturi. Sunt exact defectele pe care le prinde un om abia dupa ce
le-a vazut clientul. Le prindem mecanic, la fiecare lot.

Verifica trei lucruri, in textul VIZIBIL:
  1. cuvinte romanesti frecvente scrise fara diacritice (lista curata, fara ambiguitati)
  2. amestec de adresare: "dumneavoastra" impreuna cu "tu / tau / tie" in acelasi fisier
  3. chei de traducere scapate in text (forma "ceva.altceva_" ramasa neprocesata)

CONTROALE la fiecare rulare:
  - martor pozitiv, fabricat la rulare: un text cu toate cele trei defecte; daca nu-l prinde,
    verdictul e NEMASURAT (iesire 3)
  - martor negativ: un text corect; daca il prinde, tiparele sunt prea late (iesire 3)

IESIRE: 0 curat · 1 defecte gasite · 2 eroare de folosire · 3 control picat
"""
import os
import re
import sys

RADACINA = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
CAI = ('src',)
EXTENSII = ('.tsx', '.mdx', '.md')
SARITE = {'node_modules', '.next', '.git', '__pycache__'}

# Cuvinte care in romana corecta NU pot aparea fara diacritice. Lista e scurta si
# curata deliberat: fiecare intrare de aici trebuie sa fie fara alta lectura valida.
CUVINTE = [
    'romana', 'romaneasca', 'romanesti', 'pastrare', 'pastram', 'cautare', 'cautati',
    'raspuns', 'raspunde', 'raspundem', 'intrebare', 'intrebati', 'documentatie',
    'arhivare', 'incredere', 'primarie', 'primarii', 'contabilitate', 'inregistrare',
    'digitalizare', 'urmarire', 'termene', 'sanatate', 'siguranta', 'facturi',
]
# "termene" si "facturi" nu au diacritice; le scoatem ca sa nu producem zgomot.
# Se scot cuvintele care in romana corecta NU au diacritice: le pusesem din reflex si
# produceau fals pozitive pe text corect. "termene", "facturi", "arhivare" si
# "contabilitate" se scriu exact asa. "documentatie" ramane afara pana verific forma.
CUVINTE = [c for c in CUVINTE if c not in ('termene', 'facturi', 'arhivare', 'documentatie', 'contabilitate')]

TIPAR_CUVINTE = re.compile(r'\b(' + '|'.join(CUVINTE) + r')\b', re.I)
TIPAR_CHEIE = re.compile(r'\b[a-z][a-z0-9]{2,}\.[a-z][a-z0-9_]*_\s')
TIPAR_FORMAL = re.compile(r'dumneavoastr', re.I)
TIPAR_INFORMAL = re.compile(r'\b(tu|t[aă]u|t[aă]i|t[aă]|tale|tie|ție)\b', re.I)

# Textul vizibil dintr-un fisier .tsx: ce sta intre > si <, plus sirurile din atribute de text.
TIPAR_TEXT_JSX = re.compile(r'>([^<>{}]{3,})<')


def pare_cod(bucata):
    """Textul citit de om nu poarta sintaxa.

    Fara filtrul asta, poarta raporteaza numele proprietatilor - `intrebare=`,
    `ex.raspuns` - ca text romanesc fara diacritice, adica se inroseste pe cod corect.
    Masurat pe primul continut real: 8 din 9 constatari erau de acest fel.
    """
    b = bucata.strip()
    if any(ch in b for ch in '<>{}=$`'):
        return True
    if len(b.split()) < 2:
        return True
    return False


def text_vizibil(cale, continut):
    if cale.endswith('.tsx'):
        bucati = TIPAR_TEXT_JSX.findall(continut)
        # plus sirurile lungi din obiectele de continut (ex. liste de segmente)
        bucati += re.findall(r'"([^"\\]{12,})"', continut)
        bucati += re.findall(r"'([^'\\]{12,})'", continut)
        return '\n'.join(b for b in bucati if not pare_cod(b))
    return continut


def fisiere():
    gasite = []
    for cale in CAI:
        absolut = os.path.join(RADACINA, cale)
        if not os.path.isdir(absolut):
            continue
        for radacina, directoare, nume in os.walk(absolut):
            directoare[:] = [d for d in directoare if d not in SARITE]
            for n in nume:
                if n.endswith(EXTENSII):
                    gasite.append(os.path.join(radacina, n))
    return sorted(gasite)


def analizeaza(text):
    """Intoarce lista de (fel, numar_rand, fragment)."""
    gasiri = []
    for numar, rand in enumerate(text.splitlines(), start=1):
        # sarim adresele si caile, unde diacriticele nu au ce cauta
        curat = re.sub(r'https?://\S+', ' ', rand)
        curat = re.sub(r'[\w./-]+\.(?:tsx|ts|mdx|md|png|svg|json)\b', ' ', curat)
        m = TIPAR_CUVINTE.search(curat)
        if m:
            gasiri.append(('cuvant fara diacritice: ' + m.group(1), numar, rand.strip()[:110]))
        k = TIPAR_CHEIE.search(curat)
        if k:
            gasiri.append(('cheie de traducere scapata: ' + k.group(0).strip(), numar, rand.strip()[:110]))
    if TIPAR_FORMAL.search(text) and TIPAR_INFORMAL.search(text):
        gasiri.append(('adresare amestecata: dumneavoastra impreuna cu tu', 0, ''))
    return gasiri


def controale():
    pozitiv = '\n'.join([
        'Va ' + 'raspunde' + ' in ' + 'romana' + ' imediat.',
        'pricing.f_workspace_ 7',
        'Arhiva dumneavoastra si arhiva ta.',
    ])
    g = analizeaza(pozitiv)
    feluri = ' '.join(x[0] for x in g)
    if 'cuvant fara diacritice' not in feluri:
        return 'martorul pozitiv: cuvintele fara diacritice nu au fost prinse'
    if 'cheie de traducere' not in feluri:
        return 'martorul pozitiv: cheia de traducere nu a fost prinsa'
    if 'adresare amestecata' not in feluri:
        return 'martorul pozitiv: amestecul de adresare nu a fost prins'
    negativ = 'Va răspundem în română, iar arhiva dumneavoastră rămâne a dumneavoastră.'
    if analizeaza(negativ):
        return 'martorul negativ a fost prins: tiparele sunt prea late'
    return None


def main():
    motiv = controale()
    if motiv:
        print('CONTROL PICAT: ' + motiv, file=sys.stderr)
        return 3

    lista = fisiere()
    if not lista:
        print('poarta-limba: niciun fisier de verificat - masuratoarea e invalida', file=sys.stderr)
        return 3

    total = 0
    for cale in lista:
        continut = open(cale, encoding='utf-8').read()
        vizibil = text_vizibil(cale, continut)
        rel = os.path.relpath(cale, RADACINA)
        for fel, numar, fragment in analizeaza(vizibil):
            unde = rel + (':' + str(numar) if numar else '')
            print(unde + '  ' + fel + ('  | ' + fragment if fragment else ''))
            total += 1

    print('CONTROALE: martor pozitiv OK, martor negativ OK')
    print('SURSA: ' + str(len(lista)) + ' fisier(e)')
    print('DEFECTE DE LIMBA: ' + str(total))
    return 1 if total else 0


if __name__ == '__main__':
    sys.exit(main())
