import Eticheta from "./Eticheta";

// O etapa din mecanism, cu urma scrisa care ramane dupa ea.
//
// De ce nu e `Pas` din pagina de start: `Pas` arata un titlu si un paragraf, si atat.
// Aici fiecare etapa se incheie cu un DOCUMENT, iar documentul e jumatate din argument -
// exact partea pe care o poate arata cineva la un control. Pusa in paragraf, s-ar citi
// ca o promisiune printre altele; pusa pe rand separat, se numara.
//
// Rama urmei e o linie punctata, nu o banda colorata: componenta se foloseste si pe
// benzi albe, si pe hartie, iar o banda cu fundal propriu ar fi invizibila pe una din
// ele. In plus, arama pe arama-moale da 4,47:1, sub pragul de 4,5:1 din WCAG 1.4.3 -
// masurat pe valorile din `globals.css` inainte de a scrie componenta, tocmai fiindca
// poarta de accesibilitate opreste lotul pe asa ceva. Pe hartie, aceeasi arama da 4,75:1.

type Props = {
  numar: number;
  titlu: string;
  text: string;
  urma: string;
};

export default function MecanismEtapa({ numar, titlu, text, urma }: Props) {
  return (
    <li className="grid gap-3 border-t border-linie py-7 last:border-b sm:grid-cols-[92px_1fr] sm:gap-8">
      <span className="font-mono text-[13.5px] font-medium tracking-[0.04em] text-arama sm:pt-[7px]">
        Etapa {numar}
      </span>

      <div>
        <h3 className="mb-2 text-[22px]">{titlu}</h3>
        <p className="mb-4 max-w-[68ch] text-corp text-tus-2">{text}</p>
        <p className="flex max-w-[68ch] flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-dashed border-linie-fn pt-3 text-[15px] text-tus-2">
          <Eticheta className="text-arama!">Rămâne scris</Eticheta>
          <span className="flex-1 basis-[22ch]">{urma}</span>
        </p>
      </div>
    </li>
  );
}
