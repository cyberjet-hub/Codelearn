"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/#features", label: "Features" },
  { href: "/courses", label: "Courses" },
  { href: "/pricing", label: "Pricing" },
  { href: "/testimonials", label: "Stories" },
  { href: "/faq", label: "FAQ" },
  { href: "/dashboard", label: "Dashboard" },
];

export function SiteNavbar({ signedIn = false }: { signedIn?: boolean }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-white/10 px-4 py-3 shadow-2xl shadow-black/20 backdrop-blur-2xl transition-all duration-300 sm:px-5"
      >
        <Link
          href="/"
          className="group flex items-center gap-3 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          onClick={() => setOpen(false)}
        >
          <span className="grid size-10 place-items-center rounded-2xl bg-gradient-to-br from-cyan-300 via-blue-400 to-violet-500 text-lg font-black text-slate-950 shadow-lg shadow-cyan-500/25 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105">
            Cl
          </span>
          <span className="leading-none">
            <span className="block text-sm font-semibold uppercase tracking-[0.25em] text-cyan-100/80">
              Code
            </span>
            <span className="block text-xl font-black tracking-tight text-white">learn</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition duration-300 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${
                  active ? "bg-white/10 text-white" : "text-white/70"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href={signedIn ? "/dashboard" : "/login"}
            className="rounded-full px-4 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            {signedIn ? "Open app" : "Log in"}
          </Link>
          <Link
            href={signedIn ? "/courses" : "/signup"}
            className="group rounded-full bg-white px-5 py-2.5 text-sm font-black text-slate-950 shadow-xl shadow-cyan-500/20 transition hover:-translate-y-0.5 hover:bg-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            {signedIn ? "Keep learning" : "Start free"}
            <span className="ml-1 inline-block transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="grid size-11 place-items-center rounded-full border border-white/10 bg-white/10 text-white transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 lg:hidden"
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 top-0 h-0.5 w-5 rounded bg-white transition ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`absolute left-0 top-2 h-0.5 w-5 rounded bg-white transition ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`absolute left-0 top-4 h-0.5 w-5 rounded bg-white transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </span>
        </button>
      </nav>

      <div
        className={`mx-auto mt-2 max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/90 shadow-2xl shadow-black/30 backdrop-blur-2xl transition-all duration-300 lg:hidden ${
          open ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="grid gap-2 p-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              {link.label}
            </Link>
          ))}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <Link
              href={signedIn ? "/dashboard" : "/login"}
              onClick={() => setOpen(false)}
              className="rounded-2xl border border-white/10 px-4 py-3 text-center text-sm font-semibold text-white/80"
            >
              {signedIn ? "Open app" : "Log in"}
            </Link>
            <Link
              href={signedIn ? "/courses" : "/signup"}
              onClick={() => setOpen(false)}
              className="rounded-2xl bg-cyan-300 px-4 py-3 text-center text-sm font-black text-slate-950"
            >
              {signedIn ? "Courses" : "Start free"}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
