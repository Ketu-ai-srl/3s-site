#!/usr/bin/env node
// Poarta de browser: C-01 zero terti
// Iesire: 0 trece | 1 pica | 3 NEMASURAT. Detaliu in browser-rulator.mjs.
import { ruleazaPoarta } from './browser-rulator.mjs'

process.exit(await ruleazaPoarta('C-01 zero terti', ['tests/browser/consimtamant.spec.ts']))
