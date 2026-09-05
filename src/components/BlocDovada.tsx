import Eticheta from "./Eticheta";

// Blocul care spune ce NU putem sustine. Doua feluri: `declaratie` (ce nu scriem aici) si
// `limite` (ce nu poate face instrumentul). E semnalul de onestitate al paginii, deci are
// voie sa fie vizibil, nu ascuns in subsol - o linie de arama in stanga, pe fundalul cu o
// treapta mai deschis decat pagina.

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
      ? "border-l-2 border-cerneala-accent bg-noapte-3 px-6 py-5"
      : "border border-linie-suprafata bg-noapte-2 px-6 py-5";

  return (
    <div className={`${stil} ${className}`}>
      {/* `arama-clar` pe `noapte-3`: 5,72:1, deci trece si ca text mic. */}
      {eticheta ? (
        <Eticheta className="mb-2 block text-cerneala-accent!">{eticheta}</Eticheta>
      ) : null}
      <p className="max-w-[70ch] text-[16px] leading-[1.55] text-cerneala-2">{children}</p>
    </div>
  );
}
