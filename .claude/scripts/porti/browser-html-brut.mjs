#!/usr/bin/env node
// Poarta de browser: S-17 raspuns in HTML brut
// Iesire: 0 trece | 1 pica | 3 NEMASURAT. Detaliu in browser-rulator.mjs.
import { ruleazaPoarta } from './browser-rulator.mjs'

process.exit(await ruleazaPoarta('S-17 raspuns in HTML brut', ['tests/browser/html-brut.spec.ts']))
