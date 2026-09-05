import BandaTitlu from "@/components/BandaTitlu";
import BaraAnunt from "@/components/BaraAnunt";
import BlocDovada from "@/components/BlocDovada";
import CardCompact from "@/components/CardCompact";
import CardSegment from "@/components/CardSegment";
import Erou from "@/components/Erou";
import FormularDiscutie from "@/components/FormularDiscutie";
import ListaBifa from "@/components/ListaBifa";
import Navigatie from "@/components/Navigatie";
import Pas from "@/components/Pas";
import RandRaspundere from "@/components/RandRaspundere";
import SectiuneRegistru from "@/components/SectiuneRegistru";
import Subsol from "@/components/Subsol";
import VerificatorTermene from "@/components/VerificatorTermene";

// Data la care au fost preluate termenele din actele normative. Se schimba aici,
// intr-un singur loc.
const VERIFICAT = "5 septembrie 2026";

const PASI = [
  {
    titlu: "Ridicăm",
    text: "Venim cu mașina și cu proces-verbal de predare-primire. Măsurăm metrii liniari, sigilăm cutiile și semnați exact ce pleacă din instituție. Din acel moment, fondul are un custode cu nume.",
  },
  {
    titlu: "Inventariem",
    text: "Fiecare unitate arhivistică primește cotă și intră în opis, după nomenclatorul instituției. Dacă nu aveți un nomenclator avizat, îl întocmim și îl pregătim pentru avizare la Arhivele Naționale.",
  },
  {
    titlu: "Digitizăm",
    text: "Scanăm ce se cere des, la o rezoluție care rezistă la citire automată, și verificăm textul rezultat pe diacritice. Originalul rămâne în raft; copia devine căutabilă.",
  },
  {
    titlu: "Răspundem",
    text: "Întrebați în română, ca pe un coleg care cunoaște arhiva. Răspunsul vine cu documentul și pagina. Originalul pe hârtie îl cereți doar când chiar aveți nevoie de el, și îl aducem înapoi.",
  },
];

export default function Acasa() {
  return (
    <>
      <a
        className="absolute top-[-100px] left-4 z-[99] bg-verde px-4 py-3 font-mono text-fisa text-white no-underline focus:top-3"
        href="#continut"
      >
        Săriți la conținut
      </a>

      <BaraAnunt />
      <Navigatie />

      <main id="continut">
        <Erou />

        <SectiuneRegistru
          id="dovada"
          ton="fisier"
          cota="I"
          eticheta="Ce puteți verifica"
          titlu="Trei lucruri pe care le puteți verifica înainte să ne credeți pe cuvânt."
          lead="Într-o achiziție publică, afirmația nesusținută costă mai mult decât tăcerea. Așa că punem pe masă doar ce se poate arăta."
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <CardSegment titlu="Hârtia are o adresă" fundal="hartie">
              Depozitul este la Golești, lângă Pitești. Puteți veni să îl vedeți, cu tot cu
              condițiile de temperatură, umiditate și acces, înainte să semnați ceva. Un
              furnizor pur software nu vă poate arăta un raft.
            </CardSegment>
            <CardSegment titlu="Fiecare răspuns are o sursă" fundal="hartie">
              Document, pagină, fragment. Puteți deschide originalul și citi cu ochii
              dumneavoastră fraza pe care se sprijină răspunsul. Fără sursă, răspunsul nu se
              afișează.
            </CardSegment>
            <CardSegment titlu="Contractul se judecă în România" fundal="hartie">
              Contract în limba română, sub lege română, cu instanțele din România. Anexa de
              prelucrare a datelor tot în română, semnată odată cu contractul, nu cerută după
              șase luni.
            </CardSegment>
          </div>

          <BlocDovada className="mt-8">
            <strong className="font-semibold text-tus">Ce nu scriem aici:</strong> nu deținem
            certificare ISO 27001, nu afișăm sigle de clienți și nu publicăm un număr de firme
            deservite. Când obținem o certificare, o publicăm cu numărul și emitentul ei, iar
            autorizațiile firmei-mamă vi le punem la dispoziție scanate, la cerere.
          </BlocDovada>
        </SectiuneRegistru>

        <SectiuneRegistru
          id="mecanism"
          ton="hartie"
          cota="II"
          eticheta="Cum funcționează"
          titlu="De la cutia din subsol până la răspunsul de pe telefon."
          lead="Patru pași, în ordinea în care se întâmplă. Fiecare se încheie cu un document semnat de dumneavoastră, nu cu un email de confirmare."
        >
          <ol className="m-0 grid list-none gap-0 p-0">
            {PASI.map((p, i) => (
              <Pas key={p.titlu} numar={i + 1} titlu={p.titlu}>
                {p.text}
              </Pas>
            ))}
          </ol>
        </SectiuneRegistru>

        <SectiuneRegistru
          ton="inchis"
          cota="III"
          eticheta="Împărțirea sarcinilor"
          titlu="Hârtia rămâne în siguranță. Răspunsul vine la dumneavoastră."
          lead="Un singur furnizor răspunde și pentru raft, și pentru răspuns. Nu mai există conversația în care depozitarul dă vina pe furnizorul de software."
        >
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <ListaBifa
              inchis
              titlu="Ce trece în grija noastră"
              elemente={[
                "Preluarea, transportul și depozitarea în condiții de arhivă",
                "Inventarierea, cotarea și ținerea opisului la zi",
                "Întocmirea și pregătirea pentru avizare a nomenclatorului",
                "Scanarea, indexarea și verificarea textului rezultat",
                "Selecționarea documentelor cu termen expirat, cu comisie și proces-verbal",
                "Aducerea originalului atunci când vi se cere pe hârtie",
              ]}
            />
            <ListaBifa
              inchis
              titlu="Ce rămâne la dumneavoastră"
              elemente={[
                "Întrebarea, pusă în română, de pe telefon sau din pagina de căutare",
                "Decizia asupra a ceea ce se elimină, luată de comisia instituției",
                "Semnătura pe procesele-verbale, care rămâne a instituției",
                "Spațiul eliberat din subsol, care se întoarce la folosința normală",
                "Ora de dimineață pe care nu o mai petreceți căutând un dosar",
              ]}
            />
          </div>
        </SectiuneRegistru>

        <SectiuneRegistru
          id="termene"
          ton="fisier"
          cota="IV"
          eticheta="Termene legale"
          titlu="Nu mai ghiciți cât se păstrează."
          lead="Alegeți tipul de document și primiți termenul, momentul din care curge și articolul de lege din care provine. Unde nu putem susține o cifră, rândul rămâne gol și scriem de ce."
        >
          <div className="mb-8 flex flex-wrap items-center gap-4">
            <p className="max-w-[54ch] text-nota text-tus-2">
              <b className="font-semibold text-tus">Termenele sunt preluate din actele normative
              citate pe fiecare rând</b>, la {VERIFICAT}, ca să le puteți verifica singur la sursă.
              Confirmarea lor de către un arhivist autorizat se face înainte de publicare; până
              atunci sunt un punct de plecare, nu un aviz. Când o lege se modifică, se schimbă
              data de aici, nu doar textul.
            </p>
          </div>

          <VerificatorTermene />

          <BlocDovada fel="limite" eticheta="Limitele acestui instrument" className="mt-6">
            Verificatorul nu înlocuiește nomenclatorul arhivistic avizat al instituției
            dumneavoastră și nu este temei pentru eliminarea vreunui document. Eliminarea se
            face numai prin comisie de selecționare, cu proces-verbal și cu avizul Arhivelor
            Naționale. Termenele marcate „orientativ” trebuie confirmate pe nomenclatorul
            propriu înainte de orice decizie.
          </BlocDovada>
        </SectiuneRegistru>

        <SectiuneRegistru
          id="domenii"
          ton="hartie"
          cota="V"
          eticheta="De unde începem"
          titlu="Începem cu organizațiile care răspund în fața cuiva."
          lead="Ordinea de mai jos este a noastră, nu a dumneavoastră. O scriem ca să știți dacă intrați în prima serie sau vă punem pe listă onest."
        >
          <BandaTitlu eticheta="Prima serie" titlu="Prioritate" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <CardSegment titlu="Primării și instituții publice">
              Registre de stare civilă, hotărâri de consiliu, documentații de urbanism. Termene
              lungi, control extern și un cetățean care așteaptă la ghișeu cât durează
              căutarea.
            </CardSegment>
            <CardSegment titlu="Birouri notariale">
              Fond care crește în fiecare zi și se păstrează decenii. Un act cerut după
              cincisprezece ani trebuie găsit la fel de repede ca unul de luna trecută.
            </CardSegment>
            <CardSegment titlu="Case de avocatură">
              Dosare voluminoase, termene procedurale scurte. Diferența dintre a citi douăzeci
              de bibliorafturi și a întreba direct este un termen câștigat.
            </CardSegment>
          </div>

          <BandaTitlu eticheta="Frecvent" titlu="Serviți în aceleași condiții" />
          <div className="flex flex-wrap gap-3">
            <CardCompact titlu="Birouri de contabilitate">
              Control fiscal pe un an vechi de cinci ani
            </CardCompact>
            <CardCompact titlu="Firme de construcții">
              Cartea tehnică, planșe, autorizații
            </CardCompact>
            <CardCompact titlu="Unități medicale">
              Foi de observație, cu regim de date sensibile
            </CardCompact>
          </div>

          <BandaTitlu eticheta="De asemenea" titlu="Când ne scrieți, intrăm în discuție" />
          <div className="flex flex-wrap gap-3">
            <CardCompact titlu="Transport și logistică">
              Documente de transport și avize
            </CardCompact>
            <CardCompact titlu="Firme în lichidare">
              Ce se întâmplă cu arhiva la închidere
            </CardCompact>
          </div>
        </SectiuneRegistru>

        <SectiuneRegistru
          id="raspundere"
          ton="inchis"
          cota="VI"
          eticheta="Răspundere și date"
          titlu="Întrebările pe care le pune un serviciu juridic, cu răspunsul scris din start."
          lead="Cele patru întrebări apar oricum, în chestionarul de securitate sau în caietul de sarcini. Le punem noi primii, ca să nu pierdeți o săptămână pe corespondență."
        >
          <RandRaspundere intrebare="Unde stau documentele">
            Originalele pe hârtie, în depozitul din Golești, județul Argeș. Copiile digitale, pe
            infrastructură din Uniunea Europeană. Locul exact al procesării și furnizorul se
            scriu în contract, nu se lasă la latitudinea noastră.
          </RandRaspundere>
          <RandRaspundere intrebare="Cine vede și ce rămâne scris">
            Accesul se dă nominal, pe persoană și pe fond, nu pe instituție la grămadă. Fiecare
            căutare și fiecare deschidere de document se jurnalizează, iar jurnalul vi se pune
            la dispoziție. Inclusiv accesul personalului nostru.
          </RandRaspundere>
          <RandRaspundere intrebare="Ce se întâmplă dacă plecați">
            Primiți fondul digital în format deschis, PDF plus index CSV, și fondul fizic
            înapoi, cu proces-verbal. Termenul este scris în contract și este același număr pe
            care îl citiți aici, nu unul mai generos în reclamă și mai strâns în anexă.
          </RandRaspundere>
          <RandRaspundere intrebare="Ce se întâmplă cu documentele în raport cu modelele de limbaj">
            Documentele dumneavoastră nu sunt folosite pentru antrenarea niciunui model.
            Furnizorul de procesare, regiunea și politica de păstrare a interogărilor vi le
            arătăm la prima discuție, nu la primul chestionar de securitate.
          </RandRaspundere>
        </SectiuneRegistru>

        <SectiuneRegistru
          id="discutie"
          ton="fisier"
          cota="VII"
          eticheta="Pasul următor"
          titlu="De luni, nu mai căutați. Întrebați."
        >
          <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="mb-6 max-w-[60ch] text-lead text-tus-2">
                O discuție de treizeci de minute, în care ne uităm peste umăr la arhiva
                dumneavoastră așa cum arată ea azi: câți metri liniari, ce se cere cel mai des
                și ce vă cere controlul.
              </p>

              <ListaBifa
                titlu="Cu ce plecați din discuție"
                elemente={[
                  "Estimarea volumului real, în metri liniari și în cutii",
                  "Ce se digitizează primul și ce poate aștepta un an",
                  "Un calendar de preluare, cu datele scrise",
                  "Ce elemente influențează costul în cazul dumneavoastră, punct cu punct",
                ]}
              />

              <p className="mt-6 max-w-[60ch] text-[15.5px] text-tus-3">
                Scrieți-ne și direct, dacă preferați:{" "}
                <a href="mailto:contact@3s.ro" className="text-verde underline-offset-[3px]">
                  contact@3s.ro
                </a>
                . Nu afișăm număr de telefon: solicitările intră prin formular sau email, ca să
                rămână o urmă scrisă a cererii dumneavoastră și a răspunsului nostru.
              </p>
            </div>

            <FormularDiscutie />
          </div>
        </SectiuneRegistru>
      </main>

      <Subsol dataVerificare={VERIFICAT} />
    </>
  );
}
