#!/usr/bin/env python3
"""Poarta de tipografie: aduna fisierele de text ale proiectului si le da
detectorului de liniute lungi (tipografie-liniute.py, portat din platforma-prp).

Motivul pentru care exista invelisul asta: detectorul primeste fisiere, nu
directoare, iar lista de fisiere trebuie sa fie stabila si sa nu intre in
node_modules sau .next. Verdictul detectorului se transmite ca atare - inclusiv
codul 3, care inseamna NEMASURAT, nu "curat".
"""
import os
import subprocess
import sys

RADACINA = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
DETECTOR = os.path.join(RADACINA, '.claude', 'scripts', 'porti', 'tipografie-liniute.py')
EXTENSII = ('.md', '.mdx', '.ts', '.tsx', '.js', '.mjs', '.json', '.yml', '.yaml', '.css')
SARITE = {'node_modules', '.next', '.git', 'dist', 'build', '__pycache__', '.claude'}


def fisiere():
    gasite = []
    for cale in ('src', 'docs', 'tests', '.github'):
        absolut = os.path.join(RADACINA, cale)
        if not os.path.isdir(absolut):
            continue
        for radacina, directoare, nume in os.walk(absolut):
            directoare[:] = [d for d in directoare if d not in SARITE]
            for n in nume:
                if n.endswith(EXTENSII):
                    gasite.append(os.path.join(radacina, n))
    for n in ('README.md',):
        p = os.path.join(RADACINA, n)
        if os.path.isfile(p):
            gasite.append(p)
    return sorted(gasite)


def main():
    lista = fisiere()
    if not lista:
        print('poarta-tipografie: NICIUN fisier de verificat - masuratoarea e invalida, nu curata', file=sys.stderr)
        return 3
    rezultat = subprocess.run([sys.executable, DETECTOR, '--fisiere'] + lista)
    return rezultat.returncode


if __name__ == '__main__':
    sys.exit(main())
