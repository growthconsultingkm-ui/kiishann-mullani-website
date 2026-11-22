import { isDev } from "@/lib/site";

/**
 * Owner-facing reminder. Renders ONLY during `npm run dev`, never in a
 * production build — it marks slots that still need real content.
 */
export function DevNote({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  if (!isDev) return null;
  return (
    <div
      className={`rounded-md border border-dashed border-accent-deep/60 bg-accent/10 px-4 py-3 font-mono text-xs leading-relaxed text-accent-deep ${className}`}
      role="note"
    >
      <strong className="font-medium">Owner note (dev only):</strong> {children}
    </div>
  );
}
