# Regula: preconditiile externe se verifica in momentul actiunii

Nu presupune ca un serviciu extern e in starea in care l-ai lasat. Inainte de o actiune care
depinde de el, reia interogarea care o justifica.

- DNS: se intreaba autoritatea, nu rezolvatorul local, care raspunde din cache.
- Deploy: dovada nu e "healthy" si nici "build success", ci ca **continutul livrat s-a schimbat**
  (se cere `/stamp` si se compara cu commit-ul).
- GitHub: starea unui PR sau a unei rulari se citeste pe SHA, nu pe numele ramurii.
