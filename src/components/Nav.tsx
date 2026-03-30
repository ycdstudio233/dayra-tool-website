"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Features", href: "#features" },
  { label: "Workflows", href: "#workflows" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Download", href: "#download" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-midnight/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-accent"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="m4.93 4.93 1.41 1.41" />
              <path d="m17.66 17.66 1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="m6.34 17.66-1.41 1.41" />
              <path d="m19.07 4.93-1.41 1.41" />
            </svg>
          </div>
          <span className="text-lg font-semibold text-light">Daylight</span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted transition-colors hover:text-light"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#download"
            className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-midnight transition-all hover:bg-accent-dim hover:shadow-lg hover:shadow-accent/20"
          >
            Get Started
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="text-muted md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border/50 bg-midnight/95 px-6 py-4 backdrop-blur-xl md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm text-muted transition-colors hover:text-light"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#download"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-full bg-accent px-5 py-2.5 text-center text-sm font-medium text-midnight"
          >
            Get Started
          </a>
        </div>
      )}
    </nav>
  );
}
