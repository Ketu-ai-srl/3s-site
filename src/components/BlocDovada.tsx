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
      {eticheta ? (
        <Eticheta className="mb-1.5 block text-arama!">{eticheta}</Eticheta>
      ) : null}
      <p className="max-w-[78ch] text-[16px] text-tus-2">{children}</p>
    </div>
  );
}
