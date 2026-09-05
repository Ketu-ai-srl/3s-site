"use client";

import { useEffect, useRef, useState } from "react";
import CadruScan from "./CadruScan";
import Eticheta from "./Eticheta";

// Cererea de discuție. Validarea e cea din design: cele trei câmpuri
// obligatorii, apoi confirmarea se afișează în pagină, fără redirecționare.
// ATENȚIE: nu există încă un destinatar. Formularul nu trimite nimic nicăieri,
// deci nu se pune pe un mediu public înainte să fie legat de un endpoint real.

const TIPURI = [
  "Primărie sau instituție publică",
  "Birou notarial",
  "Casă de avocatură",
  "Birou de contabilitate",
  "Firmă de construcții",
  "Unitate medicală",
  "Transport și logistică",
  "Altceva",
];

const CAMP =
  "w-full rounded-[2px] border border-linie-fn bg-hartie px-3 py-[11px] font-sans text-[16px] text-tus focus:border-verde focus:bg-white";
const ETICHETA_CAMP =
  "mb-1.5 block font-mono text-eticheta tracking-[0.08em] uppercase text-tus-2";

export default function FormularDiscutie() {
  const [nume, setNume] = useState("");
  const [organizatie, setOrganizatie] = useState("");
  const [email, setEmail] = useState("");
  const [trimis, setTrimis] = useState(false);
  const confirmare = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (trimis) {
      confirmare.current?.focus();
    }
  }, [trimis]);

  function trimite(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!nume.trim() || !organizatie.trim() || email.indexOf("@") < 1) {
      return;
    }
    setTrimis(true);
  }

  if (trimis) {
    return (
      <CadruScan>
        <div className="p-4 sm:px-6 sm:py-8">
          <div
            ref={confirmare}
            tabIndex={-1}
            className="border-l-[3px] border-verde bg-verde-moale px-6 py-4 text-[16px] text-verde"
          >
            <p className="font-semibold">
              Formularul nu trimite încă nimic, {nume.trim().split(" ")[0]}.
            </p>
            <p className="mt-2.5">
              Suntem pe mediul de probă, iar cererea rămâne în pagină: nu pleacă niciun e-mail
              și nu se salvează nimic. Livrarea cererii se leagă la pasul următor, împreună cu
              informarea privind prelucrarea datelor. Când va fi gata, răspunsul vine în aceeași
              zi lucrătoare, cu două intervale de discuție propuse.
            </p>
          </div>
        </div>
      </CadruScan>
    );
  }

  return (
    <CadruScan>
      <form className="p-4 sm:px-6 sm:py-8" onSubmit={trimite} noValidate>
        <Eticheta className="mb-5 block">Cerere de discuție</Eticheta>

        <div className="mb-4">
          <label className={ETICHETA_CAMP} htmlFor="f-nume">
            Nume și prenume
          </label>
          <input
            id="f-nume"
            name="nume"
            type="text"
            autoComplete="name"
            required
            className={CAMP}
            value={nume}
            onChange={(e) => setNume(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className={ETICHETA_CAMP} htmlFor="f-org">
            Instituția sau firma
          </label>
          <input
            id="f-org"
            name="organizatie"
            type="text"
            autoComplete="organization"
            required
            className={CAMP}
            value={organizatie}
            onChange={(e) => setOrganizatie(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className={ETICHETA_CAMP} htmlFor="f-email">
            Email
          </label>
          <input
            id="f-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={CAMP}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className={ETICHETA_CAMP} htmlFor="f-tip">
            Ce fel de organizație
          </label>
          <select id="f-tip" name="tip" className={CAMP} defaultValue={TIPURI[0]}>
            {TIPURI.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className={ETICHETA_CAMP} htmlFor="f-mesaj">
            Ce vă apasă acum în arhivă
          </label>
          <textarea
            id="f-mesaj"
            name="mesaj"
            className={`${CAMP} min-h-24 resize-y`}
            placeholder="De exemplu: avem circa 60 de metri liniari în subsol și ni se cer des dosare de personal din anii 2000."
          />
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer rounded-[2px] border border-verde bg-verde px-6 py-[15px] text-baza font-medium text-white transition-colors duration-150 hover:bg-verde-apasat active:translate-y-px"
        >
          Trimiteți cererea
        </button>

        <p className="mt-3 text-[14px] text-tus-3">
          Vă răspundem în aceeași zi lucrătoare, cu două intervale de discuție propuse. Datele
          din formular se folosesc numai pentru a răspunde acestei cereri.
        </p>
      </form>
    </CadruScan>
  );
}
