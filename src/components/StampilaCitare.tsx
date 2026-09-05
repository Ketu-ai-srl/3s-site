// Stampila de citare: semnatura vitrinei.
//
// E singurul lucru pe care nu-l are niciunul dintre site-urile cu care ne comparam: fiecare
// raspuns vine cu documentul, pagina si articolul din care a fost scos. Se arata ca un
// obiect - intrebarea, raspunsul si stampila lui - nu ca un paragraf care il descrie.
//
// Marimile sunt stranse cat sa incapa, cu titlul si butonul ecranului, in 800 px de
// inaltime: ecranul Solve avea 976 px si butonul cadea sub margine.
//
// Continutul e EXEMPLU si scrie asta pe el. Un raspuns fabricat prezentat ca real ar fi
// exact clasa de afirmatie pe care registrul o refuza.

type Props = {
  intrebare: string;
  raspuns: string;
  sursa: { document: string; pagina: string; articol?: string };
};

export default function StampilaCitare({ intrebare, raspuns, sursa }: Props) {
  return (
    <figure className="mt-8 max-w-[620px] border border-linie-noapte bg-noapte/70 p-5 backdrop-blur-[6px] md:p-7">
      <figcaption className="mb-4 flex items-center justify-between font-mono text-[11px] tracking-[0.2em] uppercase text-hartie-veche-3">
        <span>Exemplu de răspuns</span>
        <span>WhatsApp</span>
      </figcaption>
      <p className="font-vitrina mb-4 inline-block border border-hartie-veche-3 px-3 py-1.5 text-[15px] text-hartie-veche-2">
        {intrebare}
      </p>
      <p className="font-vitrina text-[clamp(1.1rem,1.6vw,1.45rem)] leading-[1.4] text-hartie-veche">
        {raspuns}
      </p>
      <p className="mt-4 inline-flex flex-wrap items-center gap-x-3 border-l-2 border-arama-clar bg-noapte-3 px-3 py-2 font-mono text-[12.5px] tracking-[0.06em] text-arama-clar">
        <span>{sursa.document}</span>
        <span aria-hidden="true">·</span>
        <span>{sursa.pagina}</span>
        {sursa.articol ? (
          <>
            <span aria-hidden="true">·</span>
            <span>{sursa.articol}</span>
          </>
        ) : null}
      </p>
    </figure>
  );
}
