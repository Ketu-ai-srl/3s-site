# ADR-0001: Stiva, gazduire si medii

**Data:** 2026-09-05 · **Stare:** acceptata

## Context

Construim site-ul public de vanzare al brandului 3S. Platforma de produs exista deja
(SerenityFlow); site-ul doar vinde si trimite spre ea.

## Decizie

- **Stiva:** Next.js 15 (App Router) + Tailwind v4, continut MDX versionat, pnpm 10.33.0, Node 24.
- **Livrare:** imagine Docker construita de Coolify, server `s3.ke2.in`. Panoul `c1.ke2.in` NU e
  tinta de deploy.
- **Medii:** `3s.ke2.in` = staging, inchis cu autentificare de baza si `X-Robots-Tag: noindex`.
  **Productia nu exista** si nu se creeaza pana cand owner-ul comunica domeniul real.
- **Repo:** `Ketu-ai-srl/3s-site`, public. Consecinta: minutele de Actions sunt gratuite si
  nelimitate, iar regula "zero secrete in cod" devine critica.
- `output: standalone` e conditionat de `BUILD_STANDALONE=1`: pe Windows fara drept de legaturi
  simbolice build-ul cade cu EPERM (masurat 2026-09-05). In Docker si CI, ambele Linux, e pornit.

## Consecinte

Un deploy se dovedeste cerand `/stamp` si comparand cu `src/content/_stamp.json` din commit.
Nicio alta forma de dovada nu se accepta.
