export default function Footer() {
  return (
    <footer className="border-t border-border/30 px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
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
              <span className="text-lg font-semibold text-light">
                Daylight
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-dim">
              Making daylighting analysis accessible to every architect and
              designer. Built with Radiance, Honeybee, and a commitment to
              sustainable building design.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">
              Product
            </h4>
            <ul className="space-y-2.5">
              {["Features", "Workflows", "Download", "Changelog"].map((l) => (
                <li key={l}>
                  <a
                    href={`#${l.toLowerCase()}`}
                    className="text-sm text-dim transition-colors hover:text-light"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">
              Resources
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Ladybug Tools", url: "https://www.ladybug.tools/" },
                {
                  label: "LEED v4.1 Guide",
                  url: "https://www.usgbc.org/credits/eq7",
                },
                {
                  label: "IES LM-83",
                  url: "https://www.ies.org/product/approved-method-ida/",
                },
                { label: "GitHub", url: "#" },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-dim transition-colors hover:text-light"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border/20 pt-8 md:flex-row">
          <p className="text-xs text-dim">
            &copy; {new Date().getFullYear()} YCD Studio. All rights reserved.
          </p>
          <p className="text-xs text-dim">
            Powered by{" "}
            <a
              href="https://www.radiance-online.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-light"
            >
              Radiance
            </a>{" "}
            &{" "}
            <a
              href="https://www.ladybug.tools/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-light"
            >
              Honeybee
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
