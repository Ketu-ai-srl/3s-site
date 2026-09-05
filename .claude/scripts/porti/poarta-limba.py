#!/usr/bin/env python3
"""Poarta de limba romana: diacritice complete si o singura forma de adresare.

De ce exista: un site de arhivare din regiune, masurat de noi, livreaza in ROMANA
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
# `.ts` e aici fiindca proza de continut sta in `src/content/*.ts` - liste de segmente,
# tabele de termene. Cat timp lipsea, textul de acolo nu trecea prin nicio poarta de limba.
EXTENSII = ('.tsx', '.ts', '.mdx', '.md')
SARITE = {'node_modules', '.next', '.git', '__pycache__'}

# Cuvinte care in romana corecta NU pot aparea fara diacritice. Lista e scurta si
# curata deliberat: fiecare intrare trebuie sa nu aiba alta lectura valida.
#
# Ce s-a SCOS din lista, si de ce - nota ramane aici ca sa nu le readaug din reflex:
# 'arhivare', 'contabilitate', 'termene', 'facturi', 'documentatie' si 'digitalizare'
# se scriu EXACT asa, fara niciun semn. Cat au stat in lista, poarta se inrosea pe
# text CORECT (ultima, 'digitalizare', pe 5 sep 2026, in JSON-LD, unde restul randului
# chiar era fara diacritice - deci acuza nimerea fisierul si rata cuvantul).
# Regula: cand poarta acuza o forma corecta, se repara POARTA, nu textul.
CUVINTE = [
    'romana', 'romaneasca', 'romanesti', 'pastrare', 'pastram', 'cautare', 'cautati',
    'raspuns', 'raspunde', 'raspundem', 'intrebare', 'intrebati', 'incredere',
    'primarie', 'primarii', 'inregistrare', 'urmarire', 'sanatate', 'siguranta',
]

TIPAR_CUVINTE = re.compile(r'\b(' + '|'.join(CUVINTE) + r')\b', re.I)
TIPAR_CHEIE = re.compile(r'\b[a-z][a-z0-9]{2,}\.[a-z][a-z0-9_]*_\s')
TIPAR_FORMAL = re.compile(r'dumneavoastr', re.I)
TIPAR_INFORMAL = re.compile(r'\b(tu|t[aă]u|t[aă]i|t[aă]|tale|tie|ție)\b', re.I)

# Textul vizibil dintr-un fisier de cod: ce sta intre > si <, plus continutul sirurilor.
TIPAR_TEXT_JSX = re.compile(r'>([^<>{}]{3,})<')

# Sirurile se extrag INTREGI, fara prag de lungime in tipar; cele scurte se arunca dupa.
#
# De ce conteaza ordinea, masurat pe 5 sep 2026: tiparul vechi cerea cel putin 12
# caractere CHIAR IN TIPAR. Cand primul sir dintr-un fisier era mai scurt - `from "next"` -
# potrivirea esua acolo, motorul avansa un caracter si se resincroniza pe ghilimeaua de
# INCHIDERE. De acolo incolo perechile erau decalate cu unu, deci poarta citea CODUL
# DINTRE siruri in loc de continutul lor. Pe `layout.tsx` a extras 23 de bucati, toate
# cod, si niciun titlu: `Arhiva care raspunde` a stat in `<title>` fara diacritice, desi
# `raspunde` e in lista de cuvinte de cand exista poarta. Verdictul 0 nu insemna curat,
# insemna ca nu se masura nimic.
#
# Extragerea are de acum martorii ei in `controale()`. Martorii vechi probau doar
# `analizeaza()`, adica pasul de DUPA extragere - tocmai pasul care nu era stricat.
TIPARE_SIRURI = (
    re.compile(r'"((?:[^"\\\n]|\\.)*)"'),
    re.compile(r"'((?:[^'\\\n]|\\.)*)'"),
    re.compile(r'`((?:[^`\\]|\\.)*)`', re.S),
)
LUNGIME_MINIMA_SIR = 12


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
    """Ce citeste un OM din fisier: textul din JSX plus continutul sirurilor.

    `.ts` intra la fel ca `.tsx`, nu ca text brut: fisierele de continut - liste de
    segmente, tabele de termene - tin proza in siruri, iar restul e cod. Cat timp `.ts`
    lipsea din `EXTENSII`, proza din `src/content/*.ts` nu era masurata deloc.
    """
    if cale.endswith(('.tsx', '.ts')):
        bucati = TIPAR_TEXT_JSX.findall(continut) if cale.endswith('.tsx') else []
        for tipar in TIPARE_SIRURI:
            bucati += [s for s in tipar.findall(continut) if len(s) >= LUNGIME_MINIMA_SIR]
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
        # Se raporteaza TOATE potrivirile de pe rand, nu doar prima: cu `search`, un
        # rand cu trei cuvinte gresite se repara in trei rulari, iar ultimele doua par
        # aparute din senin dupa ce le-am "reparat" pe primele.
        for m in TIPAR_CUVINTE.finditer(curat):
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

    # Martorii EXTRAGERII, nu ai analizei. Fara ei, poarta poate iesi 0 fiindca nu a
    # citit nimic - si exact asta s-a intamplat luni intregi pe `layout.tsx`.
    # Fixtura se asambleaza aici, la rulare, nu sta scrisa intr-un fisier: un fisier de
    # proba cu un cuvant gresit ar fi el insusi prins de poarta pe care o probeaza.
    g = chr(96)  # accent grav, scris asa ca sa nu deschida o comanda in shell
    sursa = '\n'.join([
        'import type { Metadata } from "next";',   # sirul SCURT care decala perechile
        'export const T = {',
        '  titlu: "3S - arhiva care raspunde repede",',
        "  nota: 'Va pastram documentele in conditii de siguranta.',",
        '  sablon: ' + g + 'Termenul de pastrare a fost stabilit prin lege.' + g + ',',
        '};',
    ])
    extras = text_vizibil('proba.ts', sursa)
    for asteptat in ('raspunde', 'pastram', 'pastrare'):
        if asteptat not in extras:
            return ('martorul de extragere: sirul cu `' + asteptat + '` nu a fost extras din `.ts` - '
                    'poarta ar iesi 0 fiindca nu citeste, nu fiindca e curat')
    if not analizeaza(extras):
        return 'martorul de extragere: textul extras contine greseli, dar analiza nu le-a gasit'

    # Si controlul opus: un fisier care contine NUMAI cod nu trebuie sa produca text.
    doar_cod = 'import { useState } from "react";\nconst x = a.b_ + 1;\n'
    if analizeaza(text_vizibil('proba.ts', doar_cod)):
        return 'martorul negativ de extragere: cod curat a fost raportat ca text gresit'
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
