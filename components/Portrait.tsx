import Image from "next/image";
import type { Photo } from "@/site.config";
import { KmMark } from "./KmMark";
import { isDev } from "@/lib/site";

type Props = {
  photo: Photo;
  /** Describes the slot, shown only in development when the photo is missing. */
  slot: string;
  ratio?: "portrait" | "landscape" | "square" | "tall";
  priority?: boolean;
  sizes?: string;
  className?: string;
  caption?: string;
  variant?: "ink" | "stone";
};

const ratios = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[3/2]",
  square: "aspect-square",
  tall: "aspect-[3/4]",
};

/**
 * Shows an authentic photograph when one is configured; otherwise a
 * branded panel built from the KM mark — never a stock stand-in.
 */
export function Portrait({
  photo,
  slot,
  ratio = "portrait",
  priority,
  sizes = "(min-width: 1024px) 40vw, 100vw",
  className = "",
  caption,
  variant = "ink",
}: Props) {
  const hasPhoto = photo.src.trim() !== "";
  return (
    <figure className={className}>
      <div className={`relative overflow-hidden ${ratios[ratio]} ${variant === "ink" ? "bg-ink" : "bg-stone"}`}>
        {hasPhoto ? (
          <Image src={photo.src} alt={photo.alt} fill priority={priority} sizes={sizes} className="object-cover" />
        ) : (
          <BrandPanel slot={slot} variant={variant} />
        )}
      </div>
      {caption && <figcaption className="kicker mt-3 text-muted">{caption}</figcaption>}
    </figure>
  );
}

function BrandPanel({ slot, variant }: { slot: string; variant: "ink" | "stone" }) {
  const dark = variant === "ink";
  return (
    <div className={`absolute inset-0 ${dark ? "text-paper" : "text-ink"}`} aria-hidden>
      <div className={`absolute inset-0 ${dark ? "halftone" : ""}`} />
      {/* Diagonal accent cut — a nod to the slash inside the KM mark */}
      <div className="absolute -left-1/4 top-[58%] h-[3px] w-[150%] -rotate-[38deg] bg-accent" />
      <KmMark
        className={`absolute bottom-[-6%] right-[-8%] w-[78%] ${dark ? "text-paper/[0.07]" : "text-ink/[0.07]"}`}
      />
      <KmMark className={`absolute left-[9%] top-[9%] w-[18%] ${dark ? "text-paper" : "text-ink"}`} />
      <div className="absolute inset-x-[9%] bottom-[8%] flex items-end justify-between gap-4">
        <span className={`kicker px-1 py-0.5 ${dark ? "bg-ink text-mist" : "bg-stone text-ink/75"}`}>
          Kiishann Mullani
        </span>
        <span className={`kicker px-1 py-0.5 ${dark ? "bg-ink text-mist" : "bg-stone text-ink/75"}`}>KM</span>
      </div>
      {isDev && (
        <span className="kicker absolute left-[9%] top-[40%] max-w-[80%] rounded bg-accent px-2 py-1 text-ink">
          Photo slot: {slot}
        </span>
      )}
    </div>
  );
}
