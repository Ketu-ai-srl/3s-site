import { readFileSync, readdirSync } from 'node:fs'
import { join, sep } from 'node:path'
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
// Juridic* etc.) sunt ale feliei lor si se muta odata cu pagina. `Ecran`, `StampilaCitare`,
// `Navigatie` si `Subsol` nu sunt aici fiindca isi pun SINGURE fundalul de noapte si au
// voie sa scrie culori explicite deasupra lui.
//
// `CadruScan`, `CardCompact`, `Pas` si `VerificatorTermene` SUNT in lista desi azi nu le
// importa nicio pagina (verificat cu grep pe `src` si `tests`). Nu sunt cod mort din
// neatentie: sunt piese pe care le cer feliile de pagini care vin dupa asta - pasii
// mecanismului, verificatorul de termene - si au fost convertite acum tocmai ca sa nu
// inceapa fiecare felie prin a repara o primitiva. Daca trec si fara ele, se sterg atunci,
// cu masuratoarea de atunci, nu cu presupunerea de acum.
const PRIMITIVE = [
  'AntetPagina',
  'BandaTitlu',
  'BlocDovada',
  'Buton',
  'CadruScan',
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

/**
 * Cele trei clase de regresie pe care le-a gasit criticul, mecanizate. Toate trei aveau
 * aceeasi proprietate neplacuta: NICIO poarta existenta nu le vedea. Poarta de contrast
 * masoara contrastul, iar cele trei pagini albe treceau contrastul; poarta axe nu numara
 * fotografii; nimic nu masoara inaltimea de rand contra diacriticelor. Se prind aici, la
 * sursa, in sub o secunda.
 */
describe('regresiile de directie prinse pe 2026-09-06', () => {
  it('suprafata nu mai e alba, si cerneala ei s-a mutat odata cu ea', () => {
    const css = readFileSync(join(RADACINA, 'src', 'app', 'globals.css'), 'utf8')

    // Jetonul: orice altceva decat noaptea ar aduce inapoi documentul alb pe site-ul negru.
    expect(css, '--color-suprafata nu mai e legat de noapte').toMatch(
      /--color-suprafata:\s*var\(--color-noapte\)\s*;/,
    )

    // Si cerneala LUI. Cele doua trebuie sa se miste impreuna: suprafata de noapte cu
    // cerneala deschisa pe lista deschisa ar da litera inchisa pe fundal inchis.
    const deNoapte = css.match(/:root,([\s\S]*?)\{\s*--cerneala:/)
    expect(deNoapte, 'nu gasesc lista de suprafete de noapte din @layer base').not.toBeNull()
    expect(deNoapte![1], '`.bg-suprafata` nu e pe lista suprafetelor de noapte').toContain(
      '.bg-suprafata',
    )
    const deschise = css.match(/\.bg-hartie,([\s\S]*?)\{/)
    expect(deschise, 'nu gasesc lista de suprafete deschise').not.toBeNull()
    expect(deschise![1], '`.bg-suprafata` a ramas si pe lista suprafetelor deschise').not.toContain(
      '.bg-suprafata',
    )
  })

  it('niciun fisier din src nu mai picteaza o suprafata alba', () => {
    // `bg-hartie-2`, `bg-arama-moale` si `bg-verde-moale` RAMAN permise: sunt cele trei
    // pastile de stare din `src/content/termene.ts`, suprafete deschise intentionate si
    // mici. `bg-suprafata` si `bg-hartie` nu mai au voie sa apara ca fundal de sectiune.
    const abateri: string[] = []
    const mers = (dir: string) => {
      for (const nume of readdirSync(dir, { withFileTypes: true })) {
        const cale = join(dir, nume.name)
        if (nume.isDirectory()) mers(cale)
        else if (/\.tsx?$/.test(nume.name)) {
          const text = readFileSync(cale, 'utf8')
          // Sfarsitul numelui se cere cu `(?![\w-])`, nu cu `\b`: dupa `bg-hartie` urmeaza
          // o cratima si in `bg-hartie-veche`, care e CULOAREA DE LITERA a directiei noi si
          // are voie sa existe. Prima varianta a probei o prinsese, pe `layout.tsx`.
          for (const m of text.matchAll(/className=[^\n]*(bg-suprafata|bg-hartie)(?![\w-])/g)) {
            abateri.push(cale.replace(RADACINA, '') + ': ' + m[1])
          }
        }
      }
    }
    mers(join(RADACINA, 'src'))
    expect(abateri, 'suprafete deschise ramase in src').toEqual([])
  })

  it('inaltimea de rand a titlurilor incape diacriticele romanesti', () => {
    // Pragul e masurat pe fontul real (Barlow Condensed 700): virgula lui S coboara 0,180 em
    // sub linia de baza, iar cea mai inalta capitala romaneasca urca 0,889 em. Suma e 1,069
    // em, deci orice pas de rand sub atat produce suprapunere adevarata, nu doar inghesuiala.
    const PRAG = 1.069
    const css = readFileSync(join(RADACINA, 'src', 'app', 'globals.css'), 'utf8')
    // Tipare LITERALE, nu construite dintr-un sir: un `RegExp` facut din sir cere backslash
    // dublu, iar prima varianta a probei l-a pierdut pe drum si a cautat litera `s` in loc de
    // spatiu. N-a intors o eroare, a intors zero potriviri.
    const pasi: Array<[string, RegExpMatchArray | null]> = [
      ['--text-titlu-1--line-height', css.match(/--text-titlu-1--line-height:\s*([0-9.]+)\s*;/)],
      ['--text-titlu-2--line-height', css.match(/--text-titlu-2--line-height:\s*([0-9.]+)\s*;/)],
    ]
    for (const [jeton, m] of pasi) {
      expect(m, 'nu gasesc ' + jeton).not.toBeNull()
      expect(Number(m![1]), jeton + ' e sub pragul diacriticelor').toBeGreaterThanOrEqual(PRAG)
    }
    // Si regula de baza, pentru titlurile fara clasa de scara: ele au dat 46 din cele 175
    // de coliziuni masurate.
    const baza = css.match(/h1,\s*\n\s*h2,\s*\n\s*h3,\s*\n\s*h4\s*\{([\s\S]*?)\}/)
    expect(baza, 'nu gasesc regula de baza h1..h4').not.toBeNull()
    const pas = baza![1].match(/line-height:\s*([0-9.]+)\s*;/)
    expect(pas, 'regula de baza h1..h4 nu are line-height').not.toBeNull()
    expect(Number(pas![1]), 'line-height de baza sub pragul diacriticelor').toBeGreaterThanOrEqual(
      PRAG,
    )
  })

  it('fiecare folosire a lui AntetPagina primeste o fotografie, in afara celor declarate', () => {
    // Masurat inainte: `/` avea 3 fotografii in `main`, celelalte 21 de pagini aveau ZERO,
    // desi `AntetPagina` primea deja `imagine` si le pasa mai departe, iar patru din cele
    // sapte fotografii nu erau referite de niciun fisier din `src`.
    //
    // DE CE ARE EXCEPTII DECLARATE, de pe 2026-09-06. Regula scrisa asa, fara portita, e mai
    // stricta decat directia: directia da ecranul de deschidere ca "fotografie SAU ton plin",
    // iar pagina aprobata deschide doua din cele sase ecrane ale ei fara fotografie. Regula
    // devenea blocanta cand cadrele se termina: sunt SAPTE fisiere in `public/img/`, nu se
    // descarca altele, eroul paginii de start nu are voie sa reapara ca erou pe alta pagina,
    // deci raman SASE cadre pentru OPT ecrane de deschidere in /solutii.
    //
    // Am probat intai varianta care ar fi lasat regula neatinsa - acelasi fisier cu alt
    // decupaj - si masuratoarea a respins-o: pe sase pozitii de decupaj, `dulapuri` se muta
    // cu 1,7-4,2 din 255, `cutii` cu 0,6-3,6 si `sertare` cu 0-7. Criticul numise "acelasi
    // cadru" doua capturi la 1,16 diferenta, deci un decupaj mutat NU produce un cadru
    // propriu; ar fi trecut litera probei lasand cititorului aceeasi fotografie.
    //
    // Exceptia se scrie deci pe nume, aici, si nu se poate lua tacut: o pagina noua fara
    // fotografie inroseste proba pana cand cineva o adauga in lista asta, in acelasi commit.
    const DESCHIDERI_TIPOGRAFICE = new Set([
      // hub-ul /solutii: singura pagina a carei fotografie nu trebuie sa spuna un domeniu
      // anume. Deschidea cu acelasi cadru ca fisa /solutii/imobiliare - diferenta medie
      // absoluta ZERO intre capturile primului ecran, cu textul ascuns.
      'src/app/solutii/page.tsx',
    ])
    const faraFoto: string[] = []
    const mers = (dir: string) => {
      for (const nume of readdirSync(dir, { withFileTypes: true })) {
        const cale = join(dir, nume.name)
        if (nume.isDirectory()) mers(cale)
        else if (nume.name.endsWith('.tsx')) {
          const text = readFileSync(cale, 'utf8')
          for (const m of text.matchAll(/<AntetPagina\b([\s\S]*?)\/>/g)) {
            // Calea se normalizeaza pe `/`: pe Windows `join` da backslash, si o lista scrisa
            // cu bare oblice n-ar fi potrivit niciodata - proba ar fi trecut mereu, adica ar
            // fi tacut exact cand are ceva de spus.
            const relativa = cale.replace(RADACINA, '').split(sep).join('/').replace(/^\//, '')
            if (!/\bimagine=/.test(m[1]) && !DESCHIDERI_TIPOGRAFICE.has(relativa)) {
              faraFoto.push(relativa)
            }
          }
        }
      }
    }
    mers(join(RADACINA, 'src'))
    expect(faraFoto, 'AntetPagina fara `imagine` si fara declaratie').toEqual([])
  })

  it('niciun ecran de deschidere nu repeta cadrul altuia', () => {
    // Clasa de defect, gasita de critic si nemasurata de nimic pana acum: /solutii/constructii
    // deschidea cu `rafturi` la acelasi decupaj ca eroul paginii de start, iar hub-ul /solutii
    // cu acelasi cadru ca fisa /solutii/imobiliare. Diferenta medie absoluta intre capturile
    // primelor ecrane, cu textul ascuns si miscarea oprita: ZERO, in amandoua perechile.
    // Regula era scrisa in `PaginaDeSegment.tsx`, dar compara cele sapte fise INTRE ELE si
    // scotea din multime chiar pagina de referinta. Poarta de legaturi nu vede fotografii,
    // axe nu numara cadre, si un `grep` prin `.claude/scripts/porti/` da zero.
    const pagina = readFileSync(join(RADACINA, 'src', 'components', 'PaginaDeSegment.tsx'), 'utf8')
    const tabel = pagina.match(/const FOTO_SEGMENT[^=]*=\s*\{([\s\S]*?)\n\};/)
    expect(tabel, 'nu gasesc FOTO_SEGMENT in PaginaDeSegment.tsx').not.toBeNull()
    const intrari = [...tabel![1].matchAll(/(\w+):\s*(?:"(\w+)"|null)/g)].map((m) => [m[1], m[2]])
    expect(intrari.length, 'FOTO_SEGMENT pare gol').toBeGreaterThan(5)

    // Cadrul eroului paginii de start: prima fotografie de dupa `nivel="h1"`. Pagina de start
    // isi scrie fotografiile pe loc, nu din registru, deci se citeste de acolo.
    const acasa = readFileSync(join(RADACINA, 'src', 'app', 'page.tsx'), 'utf8')
    const dupaH1 = acasa.slice(acasa.indexOf('nivel="h1"'))
    const erouAcasa = dupaH1.match(/nume:\s*"(\w+)"/)
    expect(erouAcasa, 'nu gasesc fotografia eroului de pe pagina de start').not.toBeNull()

    const cuFoto = intrari.filter(([, cheie]) => cheie)
    const cheile = cuFoto.map(([, cheie]) => cheie)
    // Surorile intre ele: sapte fise care se ajung din aceeasi lista.
    expect(new Set(cheile).size, 'doua fise deschid cu acelasi cadru: ' + cheile.join(', ')).toBe(
      cheile.length,
    )
    // Si contra referintei, care lipsea din comparatie.
    const cuErouAcasa = cuFoto.filter(([, cheie]) => cheie === erouAcasa![1]).map(([s]) => s)
    expect(cuErouAcasa, 'fise care deschid cu cadrul eroului paginii de start').toEqual([])
  })

  it('registrul de fotografii numeste doar fisiere care exista, in ambele marimi', () => {
    const registru = readFileSync(join(RADACINA, 'src', 'content', 'fotografii.ts'), 'utf8')
    const nume = [...registru.matchAll(/nume:\s*"([a-z]+)"/g)].map((m) => m[1])
    expect(nume.length, 'registrul de fotografii pare gol').toBeGreaterThan(5)
    const existente = new Set(readdirSync(join(RADACINA, 'public', 'img')))
    for (const n of nume) {
      for (const marime of ['1920', '960']) {
        expect(existente.has(n + '-' + marime + '.webp'), 'lipseste ' + n + '-' + marime).toBe(true)
      }
    }
    // Si textul alternativ SPUNE ca fotografia e ilustrativa - regula de adevar a directiei,
    // nu o preferinta de redactare.
    const alturi = [...registru.matchAll(/alt:\s*"([^"]+)"/g)].map((m) => m[1])
    expect(alturi.length).toBe(nume.length)
    for (const a of alturi) expect(a, 'alt fara mentiunea ilustrativa: ' + a).toMatch(/ilustrativ/)
  })
})
