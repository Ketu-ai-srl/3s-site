// Sigiliul de verificare de lângă verificatorul de termene. Data e o singură
// valoare, dată din afară, ca să nu existe două locuri care spun când a fost
// verificat conținutul.

type Props = {
  data: string;
  dataScurta: string;
};

export default function SigiliuVerificat({ data, dataScurta }: Props) {
  return (
    <svg
      className="flex-none"
      width="76"
      height="76"
      viewBox="0 0 76 76"
      role="img"
      aria-label={`Sigiliu de verificare, ${data}`}
    >
      <g transform="rotate(-7 38 38)" fill="none" stroke="#A4571C">
        <circle cx="38" cy="38" r="34" strokeWidth="1" />
        <circle cx="38" cy="38" r="29.5" strokeWidth="2" />
        <path d="M25 33.5h26M25 44h26" strokeWidth="0.75" opacity=".55" />
        <text
          x="38"
          y="36.5"
          textAnchor="middle"
          fill="#A4571C"
          stroke="none"
          fontFamily="var(--font-masina), monospace"
          fontSize="8.5"
          letterSpacing="1.4"
        >
          VERIFICAT
        </text>
        <text
          x="38"
          y="49.5"
          textAnchor="middle"
          fill="#A4571C"
          stroke="none"
          fontFamily="var(--font-masina), monospace"
          fontSize="8"
        >
          {dataScurta}
        </text>
      </g>
    </svg>
  );
}
