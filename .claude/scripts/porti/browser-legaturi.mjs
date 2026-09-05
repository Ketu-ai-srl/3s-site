#!/usr/bin/env node
// Poarta de browser: legaturi si imagini
// Iesire: 0 trece | 1 pica | 3 NEMASURAT. Detaliu in browser-rulator.mjs.
import { ruleazaPoarta } from './browser-rulator.mjs'

process.exit(await ruleazaPoarta('legaturi si imagini', ['tests/browser/legaturi-imagini.spec.ts']))
