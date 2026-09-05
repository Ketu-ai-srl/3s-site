#!/usr/bin/env node
// Poarta de browser: PA-03 accesibilitate
// Iesire: 0 trece | 1 pica | 3 NEMASURAT. Detaliu in browser-rulator.mjs.
import { ruleazaPoarta } from './browser-rulator.mjs'

process.exit(await ruleazaPoarta('PA-03 accesibilitate', ['tests/browser/accesibilitate.spec.ts']))
