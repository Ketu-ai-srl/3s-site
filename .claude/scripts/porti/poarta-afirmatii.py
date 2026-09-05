#!/usr/bin/env python3
"""Poarta de adevar: afirmatiile de vechime si autoritate se scriu ATRIBUIT.

Faptul care naste poarta: firma 3S nu e inregistrata inca si e fiica a ADRIA
SERVICII ARHIVARE SRL. Deci "ADRIA, firma-mama, arhiveaza din 2019" e adevarat si
verificabil, iar "avem 6 ani de experienta" e o afirmatie pe care nu o putem sustine.

Poarta cauta in textul VIZIBIL al paginilor si al continutului doua clase de defect:
  1. persoana intai plus vechime sau autoritate ("avem X ani", "suntem autorizati")
  2. certificari pe care nu le detinem (ISO 27001, SOC 2)

CONTROALE, la fiecare rulare (o poarta fara control pozitiv e decorativa):
  - martor pozitiv: un rand fabricat LA RULARE cu tiparul interzis; daca nu e prins,
    verdictul e NEMASURAT (iesire 3), nu "curat";
  - martor negativ: forma corecta, atribuita; daca e prinsa, tiparul e prea lat (iesire 3).

Fixturile se asambleaza la rulare, niciodata scrise pe litere in corpul fisierului:
altfel poarta care scaneaza depozitul se declanseaza pe propria proba.

IESIRE
    0 = nicio afirmatie interzisa, si controalele au trecut
    1 = gasite; fiecare cu fisier, rand si tiparul care a prins
    2 = eroare de folosire
    3 = CONTROL PICAT: poarta nu masoara ce spune
"""
import os
import re
import sys

# Consola Windows e cp1252 si crapa pe diacritice; iesirea se forteaza pe UTF-8,
# altfel poarta moare exact cand are ceva de raportat.
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

RADACINA = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
CAI = ('src', 'docs')
EXTENSII = ('.tsx', '.ts', '.mdx', '.md', '.json')
SARITE = {'node_modules', '.next', '.git', '__pycache__'}

# Fiecare tipar are un nume, ca mesajul sa spuna ce s-a prins, nu doar ca s-a prins.
TIPARE = [
    ('persoana intai cu vechime', re.compile(r'\b(avem|aven|avem deja)\s+(?:peste\s+)?\d+\s+(?:ani|de ani)', re.I)),
    ('persoana intai cu experienta', re.compile(r'\b(experien\w+)\s+(?:noastr\w+)\s+de\s+(?:peste\s+)?\d+', re.I)),
    ('autoritate nesustinuta la persoana intai', re.compile(r'\bsuntem\s+(autoriza\w+|acredita\w+|certifica\w+)', re.I)),
    ('certificare pe care nu o detinem', re.compile(r'\b(ISO\s*27001|SOC\s*2|ISO\s*9001)\b', re.I)),
    ('numar de clienti fara sursa', re.compile(r'\bpeste\s+\d{2,}\s+(?:de\s+)?(?:clien\w+|companii|firme|institu\w+)', re.I)),
]


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


# O negare inaintea afirmatiei o rastoarna: "nu detinem certificare ISO 27001" e exact
# forma pe care o VREM pe site. Cautarea se face pe text intreg, nu pe rand, fiindca
# negarea si termenul cad frecvent pe randuri diferite dupa formatare.
NEGARI = re.compile(r'\b(nu|f[aă]r[aă]|nici|zero)\b', re.I)
FEREASTRA = 90


def cauta(text):
    """Intoarce lista de (nume_tipar, numar_rand, fragment).

    Textul se parcurge intreg, cu pozitia tradusa in numar de rand, ca sa nu pierdem
    potrivirile taiate de formatare si ca sa putem citi contextul dinaintea lor.
    """
    gasiri = []
    for nume, tipar in TIPARE:
        for m in tipar.finditer(text):
            inceput = max(0, m.start() - FEREASTRA)
            context_anterior = text[inceput:m.start()]
            if NEGARI.search(context_anterior):
                continue  # afirmatia e negata, deci e cinstita
            numar = text.count('\n', 0, m.start()) + 1
            fragment = ' '.join(text[max(0, m.start() - 40):m.end() + 40].split())
            gasiri.append((nume, numar, fragment[:120]))
    return gasiri


def controale():
    """Doua controale opuse. Intoarce None daca amandoua trec, altfel motivul."""
    # Martorul pozitiv se asambleaza din bucati, ca fisierul asta sa nu fie el insusi o instanta.
    pozitiv = ' '.join(['avem', '6', 'ani', 'de', 'experienta', 'in', 'arhivare'])
    if not cauta(pozitiv):
        return 'martorul pozitiv nu a fost prins: poarta nu masoara nimic'
    negativ = 'ADRIA, firma-mama, arhiveaza documente din 2019, la Golesti, judetul Arges.'
    if cauta(negativ):
        return 'martorul negativ a fost prins: tiparele sunt prea late si ar bloca forma corecta'
    return None


def main():
    motiv = controale()
    if motiv:
        print('CONTROL PICAT: ' + motiv, file=sys.stderr)
        print('Verdictul e NEMASURAT, nu "curat".', file=sys.stderr)
        return 3

    lista = fisiere()
    if not lista:
        print('poarta-afirmatii: niciun fisier de verificat - masuratoarea e invalida', file=sys.stderr)
        return 3

    total = 0
    for cale in lista:
        try:
            text = open(cale, encoding='utf-8').read()
        except (OSError, UnicodeDecodeError) as e:
            print('NU AM PUTUT CITI ' + cale + ': ' + str(e), file=sys.stderr)
            return 2
        for nume, numar, fragment in cauta(text):
            rel = os.path.relpath(cale, RADACINA)
            print(rel + ':' + str(numar) + '  ' + nume + '  | ' + fragment)
            total += 1

    print('CONTROALE: martor pozitiv OK, martor negativ OK')
    print('SURSA: ' + str(len(lista)) + ' fisier(e)')
    print('AFIRMATII NEACOPERITE: ' + str(total))
    if total:
        print('')
        print('Regula: vechimea si autorizarea se scriu ATRIBUIT catre ADRIA, firma-mama.')
        print('Vezi .claude/rules/afirmatii-atribuite.md')
    return 1 if total else 0


if __name__ == '__main__':
    sys.exit(main())
