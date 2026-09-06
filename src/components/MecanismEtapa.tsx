// O etapă dintr-un lanț, cu urma scrisă care rămâne după ea.
//
// FORMA, în direcția nouă: un ecran scurt, nu un rând de tabel. Cota etapei stă în
// margine, în mono, iar titlul urcă la o treaptă condensată cu majuscule - destul cât
// să se citească de la distanța de la care se derulează, nu atât cât să concureze cu
// titlul secțiunii (`text-titlu-2`). Textul rămâne sub 60 de cuvinte, iar dedesubt vine
// ștampila.
//
// DE CE ȘTAMPILĂ, și nu încă un paragraf. Fiecare etapă se închide cu un DOCUMENT, iar
// documentul e jumătate din argument - exact partea pe care o poate arăta cineva la un
// control. Topită în paragraf, s-ar citi ca o promisiune printre altele; ridicată pe un
// bloc propriu, cu eticheta ei de mono și cu linia de aramă în stânga, se numără.
//
// Cerneala vine din SUPRAFAȚĂ (`text-cerneala*`), nu din paletă scrisă pe litere:
// componenta stă azi pe `noapte` în trei pagini, iar ștampila își pune singură treapta
// `noapte-2`, deci literele ei se recalculează acolo. Arama pe `noapte-2` rămâne peste
// pragul de text mic; cifrele măsurate sunt în `docs/design/DIRECTIA.md`.
//
// Numărul e scris, nu ornamental: „Etapa 3" se citește, iar `01/02/03` mare, pus ca
// decor, e chiar tiparul pe care direcția îl refuză.

type Props = {
  numar: number;
  titlu: string;
  text: string;
  urma: string;
};

export default function MecanismEtapa({ numar, titlu, text, urma }: Props) {
  return (
    <li className="border-t border-linie-suprafata py-12 last:border-b md:grid md:grid-cols-[7rem_minmax(0,1fr)] md:gap-x-12 md:py-16 lg:gap-x-20">
      <span className="mb-5 block font-mono text-[12px] tracking-[0.22em] uppercase text-cerneala-accent md:mb-0 md:pt-3">
        Etapa {numar}
      </span>

      <div>
        <h3 className="font-afis max-w-[20ch] text-[clamp(1.6rem,3vw,2.5rem)] font-bold tracking-[-0.01em] uppercase text-cerneala">
          {titlu}
        </h3>
        <p className="mt-5 max-w-[54ch] text-[17px] leading-[1.55] text-cerneala-2">{text}</p>

        <p className="mt-7 max-w-[54ch] border-l-2 border-cerneala-accent bg-noapte-2 px-5 py-4 text-[15.5px] leading-[1.5] text-cerneala-2">
          <span className="mb-2 block font-mono text-[11px] tracking-[0.22em] uppercase text-cerneala-accent">
            Rămâne scris
          </span>
          {urma}
        </p>
      </div>
    </li>
  );
}
