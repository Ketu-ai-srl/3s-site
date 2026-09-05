import { MASURA, MASURA_CASETA } from "./JuridicMasura";
import {
  CAMPURI_IDENTITATE,
  ETICHETE,
  entitate,
  identitateCompleta,
} from "@/content/entitate";

// Blocul de identificare a comerciantului de pe pagina de termeni.
//
// DE CE NU E ACELASI CU CEL DIN SUBSOL, desi arata la fel. Subsolul il afiseaza pe fiecare
// pagina si TACE cand datele lipsesc - acolo tacerea e alegerea corecta, fiindca un subsol
// cu `de completat` pe fiecare pagina arata a santier. Pe pagina de termeni tacerea ar fi
// gresita: cine deschide `/termeni` cauta EXACT datele astea, iar un gol nemotivat il lasa
// sa creada ca am uitat. Deci aici absenta se explica in proza, cu motivul ei.
//
// Cele doua blocuri citesc din ACEEASI sursa, `src/content/entitate.ts`, care citeste la
// randul ei `config/entitate.ro.json` - acelasi fisier pe care il masoara poarta juridica
// (L-01). Trei cititori, o singura sursa: nu au cum sa se contrazica.
//
// DE CE NU ENUMERAM ETICHETELE CAMPURILOR LIPSA. Varianta evidenta era o lista de forma
// "Denumire: lipseste, Sediu: lipseste". Am scris in proza, din doua motive. Intai, o lista
// de goluri e mai lunga si spune mai putin decat o fraza care zice DE CE lipsesc. Al doilea
// motiv e mecanic: una dintre etichetele de mai jos incepe cu un cuvant din familia care
// denumeste un contor, iar poarta juridica (codul L-10) opreste lotul cand un asemenea
// cuvant e urmat indeaproape de termenul care numeste entitatea ce decide scopul prelucrarii
// - tiparul care vaneaza afisarea unei inregistrari la registrul desfiintat al acestora.
// Randand lista doar cand datele EXISTA, cazul nu poate aparea din intamplare intr-un text
// viitor. Nota insasi nu scrie cele doua cuvinte alaturi: prima versiune le scria si a
// oprit lotul, fiindca o explicatie care citeaza tiparul devine o instanta a lui.

export default function JuridicIdentificare() {
  if (!identitateCompleta()) {
    return (
      <div className={MASURA_CASETA + " border-l-2 border-cerneala-accent bg-noapte-3 px-6 py-5"}>
        {/* Aceeasi caseta ca `declaratie` din `JuridicBlocuri` si `BlocDovada`: arama pe
            noapte-3 da 5,72:1. Fundalul bej de dinainte era ultima suprafata deschisa
            ramasa in mijlocul paginii de termeni. */}
        <span className="mb-1.5 block font-mono text-eticheta font-medium tracking-[0.1em] text-cerneala-accent uppercase">
          Ce lipsește azi, și de ce
        </span>
        <p className={MASURA + " text-corp text-cerneala-2"}>
          3S este o firmă în curs de înființare. Din datele cerute de art. 5, azi există una
          singură, adresa de poștă electronică: <strong className="font-semibold text-cerneala">contact@3s.ro</strong>.
          Denumirea exactă, sediul, datele din registrul comerțului, codul de identificare
          fiscală și telefonul apar aici după înmatriculare, copiate dintr-un certificat, nu
          scrise din memorie.
        </p>
        <p className={"mt-3 " + MASURA + " text-corp text-cerneala-2"}>
          Nu le înlocuim cu datele firmei-mamă: ar fi o afirmație falsă despre o altă persoană
          juridică. Golul este verificat automat înainte de fiecare publicare și blochează
          punerea site-ului în producție cât timp durează, tocmai ca să nu poată fi uitat.
        </p>
      </div>
    );
  }

  return (
    <dl className="grid gap-x-8 gap-y-2 border-y border-linie-suprafata py-6 text-corp sm:grid-cols-2">
      {CAMPURI_IDENTITATE.map((camp) => (
        <div key={camp} className="flex flex-wrap gap-x-2">
          <dt className="text-cerneala-3">{ETICHETE[camp]}:</dt>
          <dd className="m-0 font-medium text-cerneala">{entitate[camp]}</dd>
        </div>
      ))}
    </dl>
  );
}
