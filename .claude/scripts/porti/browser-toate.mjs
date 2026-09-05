#!/usr/bin/env node
// Toate portile de browser intr-o singura trecere: un build, un server, o rulare.
//
// De ce nu se cheama cele cinci lansatoare unul dupa altul: fiecare ar reface build-ul si
// ar porni alt server. Un pas ieftin pus dupa unul scump nu economiseste nimic, iar aici
// pasul scump s-ar plati de cinci ori.
//
// Lansatoarele individuale raman pentru rulari tintite, cand repari o singura poarta.
//
// Iesire: 0 trece | 1 pica | 3 NEMASURAT.
import { ruleazaPoarta } from './browser-rulator.mjs'

process.exit(await ruleazaPoarta('porti de browser', ['tests/browser']))
