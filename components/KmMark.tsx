type Props = { className?: string; title?: string };

/** The KM monogram, traced from the supplied logo so it stays crisp at any size. */
export function KmMark({ className, title }: Props) {
  return (
    <svg
      viewBox="0 0 965 898"
      fill="currentColor"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <path d="M747 0H491L213 301V0H0v898h213V588zM285 620l221 278h249L412 474zM852 0 483 453l160 196 119-141 1 390h202V0z" />
    </svg>
  );
}
