import Invelis from "./Invelis";

// Bara de sus, împrumutată din direcția editorială: primul lucru citit e
// jurisdicția, nu produsul. Al doilea rând atribuie vechimea firmei-mamă, cum
// cere regula: 3S nu are încă personalitate juridică proprie.

export default function BaraAnunt() {
  return (
    <div className="bg-verde-adanc text-pe-inchis">
      <Invelis className="flex flex-wrap items-baseline gap-x-5 gap-y-1.5 py-2.5 text-[14.5px] leading-normal">
        <b className="font-semibold text-white">
          Hârtia dumneavoastră rămâne în Argeș, sub lege românească. Răspunsul vine pe telefon.
        </b>
        <span className="text-pe-inchis-2">
          3S este proiectul ADRIA Servicii Arhivare SRL, firma-mamă, care arhivează documente
          din 2019, la Golești, județul Argeș.
        </span>
      </Invelis>
    </div>
  );
}
