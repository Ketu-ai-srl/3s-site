import Buton from "./Buton";
import CardExemplu from "./CardExemplu";
import Eticheta from "./Eticheta";
import Invelis from "./Invelis";

// Eroul. Singurul h1 al paginii stă aici.

export default function Erou() {
  return (
    <section className="bg-hartie pt-12 pb-12 md:pt-24 md:pb-16">
      <Invelis>
        <div className="grid items-start gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
          <div>
            <Eticheta className="urca urca-1 block">
              Arhivare fizică · digitizare · căutare cu sursa citată
            </Eticheta>

            <h1 className="urca urca-2 mt-4 mb-6 max-w-[16ch] text-[34px] leading-[1.06] tracking-[-0.022em] sm:text-[44px] lg:max-w-[14ch] lg:text-[56px] xl:text-[62px]">
              Când vine controlul, dosarul este{" "}
              <em className="font-normal text-verde italic">deja pe masă.</em>
            </h1>

            <p className="urca urca-3 max-w-[52ch] text-[18px] leading-[1.55] text-tus-2 sm:text-[20px]">
              Hârtia instituției dumneavoastră stă într-un depozit din Argeș, inventariată
              bucată cu bucată. Întrebarea o puneți în română, de pe telefon sau din pagina de
              căutare, iar răspunsul vine cu documentul și pagina din care a fost scos.
            </p>

            <div className="urca urca-4 mt-8 mb-4 flex flex-wrap gap-3">
              <Buton href="#discutie" marime="mare" sageata className="max-sm:w-full">
                Programați o discuție de 30 de minute
              </Buton>
              <Buton href="#mecanism" fel="contur" marime="mare" className="max-sm:w-full">
                Vedeți cum funcționează
              </Buton>
            </div>

            <p className="urca urca-4 max-w-[46ch] text-nota text-tus-3">
              Discuția se încheie cu un plan scris pentru arhiva dumneavoastră, nu cu o ofertă
              trimisă a doua zi pe email.
            </p>
          </div>

          <div className="urca urca-5">
            <CardExemplu />
          </div>
        </div>
      </Invelis>
    </section>
  );
}
