import Eticheta from "./Eticheta";

// Blocul care spune ce NU putem susține. Apare de două ori pe pagină, cu două
// feluri: `declaratie` (ce nu scriem aici) și `limite` (ce nu poate face
// instrumentul). E semnalul de onestitate al paginii, deci are voie să fie
// vizibil, nu ascuns în subsol.

type Fel = "declaratie" | "limite";

type Props = {
  fel?: Fel;
  eticheta?: string;
  children: React.ReactNode;
  className?: string;
};

export default function BlocDovada({
  fel = "declaratie",
  eticheta,
  children,
  className = "",
}: Props) {
  const stil =
    fel === "declaratie"
      ? "border-l-[3px] border-arama bg-arama-moale px-6 py-4"
      : "border border-linie-fn bg-hartie px-6 py-4";

  return (
    <div className={`${stil} ${className}`}>
      {/* `arama-inchis`, nu `arama`: pe fundalul `arama-moale` al blocului de declaratie,
          `arama` da 4,47:1, sub pragul de 4,5:1 pentru text mic. Perechea nu fusese randata
          niciodata pe site, deci axe nu avea ce masura - a iesit la iveala cand o felie a
          folosit blocul cu eticheta. `arama-inchis` da 6,55:1. */}
      {eticheta ? (
        <Eticheta className="mb-1.5 block text-arama-inchis!">{eticheta}</Eticheta>
      ) : null}
      <p className="max-w-[78ch] text-[16px] text-tus-2">{children}</p>
    </div>
  );
}
