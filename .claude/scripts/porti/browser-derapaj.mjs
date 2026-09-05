#!/usr/bin/env node
// Poarta de browser: derapaj orizontal 390px
// Iesire: 0 trece | 1 pica | 3 NEMASURAT. Detaliu in browser-rulator.mjs.
import { ruleazaPoarta } from './browser-rulator.mjs'

process.exit(await ruleazaPoarta('derapaj orizontal 390px', ['tests/browser/derapaj.spec.ts']))
