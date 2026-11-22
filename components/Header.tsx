"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { navigation, site } from "@/site.config";
import { KmMark } from "./KmMark";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu on navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock scroll, trap focus and support Escape while the menu is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusables = () => Array.from(menuRef.current?.querySelectorAll<HTMLElement>("a, button") ?? []);
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab") {
        const f = focusables();
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
          scrolled ? "border-b border-ink/10 bg-paper/85 backdrop-blur-md" : "border-b border-transparent bg-paper"
        }`}
      >
        <div className="wrap flex h-[4.5rem] items-center justify-between gap-6">
          <Link href="/" className="group flex items-center gap-3" aria-label={`${site.name} — home`}>
            <KmMark className="h-6 w-auto text-ink transition-colors duration-300 group-hover:text-accent-deep" />
            <span className="whitespace-nowrap font-display text-[1.05rem] font-semibold tracking-[-0.03em]">
              {site.name}
            </span>
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`relative whitespace-nowrap rounded-full px-3.5 py-2 text-[0.92rem] transition-colors duration-200 hover:text-ink ${
                      isActive(item.href) ? "text-ink" : "text-ink/70"
                    }`}
                  >
                    {item.label}
                    {isActive(item.href) && (
                      <span aria-hidden className="absolute inset-x-3.5 -bottom-0.5 h-[2px] bg-accent" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/contact?type=growth"
              className="group hidden min-h-11 items-center gap-2 whitespace-nowrap rounded-full bg-ink px-5 py-2.5 text-[0.9rem] font-medium text-paper transition-colors hover:bg-ink-2 md:inline-flex lg:hidden xl:inline-flex"
            >
              Discuss a growth challenge
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform group-hover:translate-x-0.5"
                strokeWidth={1.75}
              />
            </Link>
            <button
              ref={toggleRef}
              type="button"
              className="inline-flex min-h-11 items-center gap-3 rounded-full border border-ink/20 px-4 text-[0.9rem] font-medium lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
            >
              Menu
              <span aria-hidden className="flex flex-col gap-[5px]">
                <span className="block h-[1.5px] w-5 bg-ink" />
                <span className="block h-[1.5px] w-3.5 self-end bg-ink" />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        hidden={!open}
        className="on-dark fixed inset-0 z-[80] overflow-y-auto bg-ink text-paper lg:hidden"
      >
        <div className="wrap flex h-[4.5rem] items-center justify-between">
          <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <KmMark className="h-6 w-auto text-paper" />
            <span className="font-display text-[1.05rem] font-semibold tracking-[-0.03em]">{site.name}</span>
          </Link>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              toggleRef.current?.focus();
            }}
            className="inline-flex size-11 items-center justify-center rounded-full border border-paper/30"
            aria-label="Close menu"
          >
            <X className="size-5" aria-hidden />
          </button>
        </div>
        <nav aria-label="Mobile" className="wrap pb-12 pt-8">
          <ul className="border-t border-paper/15">
            <li className="border-b border-paper/15">
              <Link
                href="/"
                className="flex items-baseline gap-4 py-5"
                aria-current={pathname === "/" ? "page" : undefined}
              >
                <span className="kicker text-accent">00</span>
                <span className="display-md">Home</span>
              </Link>
            </li>
            {navigation.map((item, i) => (
              <li key={item.href} className="border-b border-paper/15">
                <Link
                  href={item.href}
                  className="flex items-baseline gap-4 py-5"
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  <span className="kicker text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <span className={`display-md ${isActive(item.href) ? "text-accent" : ""}`}>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/contact?type=growth"
            className="mt-10 inline-flex min-h-12 items-center gap-3 rounded-full bg-accent px-6 py-3 font-medium text-ink"
          >
            Discuss a growth challenge
            <ArrowRight aria-hidden className="size-4" />
          </Link>
          <p className="kicker mt-10 text-mist">{site.tagline}</p>
        </nav>
      </div>
    </>
  );
}
