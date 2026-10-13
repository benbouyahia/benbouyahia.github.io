export function CertificationLogo({ brand, variant }: { brand: string; variant: string }) {
  const label = `${brand} logo`;

  return (
    <span
      className={`certification-logo certification-logo--${variant}`}
      role="img"
      aria-label={label}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="1" y="1" width="10" height="10" fill="#f25022" />
        <rect x="13" y="1" width="10" height="10" fill="#7fba00" />
        <rect x="1" y="13" width="10" height="10" fill="#00a4ef" />
        <rect x="13" y="13" width="10" height="10" fill="#ffb900" />
      </svg>
    </span>
  );
}
