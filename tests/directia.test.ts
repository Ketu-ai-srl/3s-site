import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

/**
 * Fundatia directiei noi (felia 25): fundal de noapte pe tot site-ul, iar primitivele
 * partajate isi iau culoarea de text din SUPRAFATA pe care stau, nu din paleta veche.
 *
 * Ce clasa de defect inchide. Body-ul a trecut pe negru, dar paginile interioare inca
 * isi pun singure benzi deschise (`bg-hartie`, `bg-suprafata`) pana le rescrie felia lor.
 * O primitiva partajata ajunge deci pe AMBELE fundaluri in aceeasi zi. Daca cineva scrie
 * in ea `text-tus-2` (cerneala inchisa) sau `text-hartie-veche-2` (cerneala deschisa),
 * pica pe unul dintre ele - iar poarta axe o prinde abia la pasul cel mai scump, dupa
 * build, pe 22 de pagini. Aici se prinde in sub o secunda, la sursa.
 *
 * Primitivele partajate scriu culoarea de text cu jetoanele de cerneala (`text-cerneala`,
 * `text-cerneala-2`, `text-cerneala-3`, `text-cerneala-accent`) si liniile cu
 * `border-linie-suprafata`; suprafata (clasa `bg-*` de deasupra) decide ce inseamna ele.
 * Exceptie legitima: o primitiva care isi pune SINGURA fundalul (`bg-noapte-*`) poate
 * scrie culori explicite deasupra lui, fiindca stie pe ce sta.
 */

const RADACINA = join(__dirname, '..')
const COMPONENTE = join(RADACINA, 'src', 'components')

// Primitivele partajate: cele pe care le importa paginile mai multor felii. Nu e toata
// lista din `src/components/`: componentele unei singure pagini (Mecanism*, Termene*,
// Juridic* etc.) sunt ale feliei lor si se muta odata cu pagina.
const PRIMITIVE = [
  'AntetPagina',
  'BandaTitlu',
  'BlocDovada',
  'Buton',
  'CardCompact',
  'CardSegment',
  'Eticheta',
  'Invelis',
  'ListaBifa',
  'Pas',
  'RandRaspundere',
  'SectiuneRegistru',
  'VerificatorTermene',
]

// Orice culoare de text scrisa pe litere, din ORICE paleta: cerneala inchisa (tus, verde),
// perechea ei de pe benzile verzi (pe-inchis, white), dar si cea a vitrinei (hartie-veche,
// arama-clar), fiindca o primitiva nu stie daca sta pe noapte sau pe o banda deschisa
// ramasa din tranzitie. Se cauta DOAR prefixul `text-` (si varianta `hover:`): un
// `border-linie` sau un `bg-hartie` lasat intentionat nu e defect de contrast.
const TEXT_VECHI = /\b(?:hover:)?text-(?:tus|verde|pe-inchis|white|arama|hartie|noapte)(?:-[a-z0-9-]+)?\b/g

function sursa(nume: string) {
  return readFileSync(join(COMPONENTE, nume + '.tsx'), 'utf8')
}

describe('fundatia directiei noi', () => {
  it('body-ul sta pe noapte, cu text de hartie veche, in globals.css', () => {
    const css = readFileSync(join(RADACINA, 'src', 'app', 'globals.css'), 'utf8')
    const body = css.match(/\n\s*body\s*\{([^}]*)\}/)
    expect(body, 'nu gasesc regula `body` in globals.css').not.toBeNull()
    const corp = body![1]
    expect(corp).toMatch(/background:\s*var\(--color-noapte\)/)
    expect(corp).toMatch(/color:\s*var\(--color-hartie-veche\)/)
  })

  it('fiecare primitiva partajata exista si nu scrie text cu paleta veche', () => {
    const existente = new Set(readdirSync(COMPONENTE))
    const abateri: string[] = []
    for (const nume of PRIMITIVE) {
      expect(existente.has(nume + '.tsx'), 'lipseste primitiva ' + nume).toBe(true)
      const text = sursa(nume)
      for (const m of text.matchAll(TEXT_VECHI)) abateri.push(nume + ': ' + m[0])
    }
    expect(abateri, 'text din paleta veche in primitive partajate').toEqual([])
  })

  it('jetoanele de cerneala exista in globals.css si sunt documentate in DIRECTIA.md', () => {
    const css = readFileSync(join(RADACINA, 'src', 'app', 'globals.css'), 'utf8')
    const jetoane = ['cerneala', 'cerneala-2', 'cerneala-3', 'cerneala-accent', 'linie-suprafata']
    for (const j of jetoane) {
      expect(css, 'globals.css nu defineste --color-' + j).toContain('--color-' + j + ':')
    }
    const doc = readFileSync(join(RADACINA, 'docs', 'design', 'DIRECTIA.md'), 'utf8')
    for (const j of jetoane) {
      expect(doc, 'DIRECTIA.md nu numeste jetonul ' + j).toContain(j)
    }
    // Si jetoanele vitrinei, cele pe care le scriu paginile direct: fiecare are voie sa
    // existe doar daca cineva l-a explicat.
    const vitrina = css.match(/--color-(noapte[\w-]*|hartie-veche[\w-]*|linie-noapte|arama-clar):/g) ?? []
    expect(vitrina.length, 'blocul vitrina din globals.css pare gol').toBeGreaterThan(5)
    for (const v of vitrina) {
      const nume = v.replace('--color-', '').replace(':', '')
      expect(doc, 'DIRECTIA.md nu numeste jetonul ' + nume).toContain(nume)
    }
  })
})
