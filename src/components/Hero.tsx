"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="hero-glow relative flex min-h-screen flex-col items-center justify-center px-6 pt-20 text-center">
      {/* Floating badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
        <span className="text-xs font-medium text-accent">
          LEED v4.1 EQc7 Compliant
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="mx-auto max-w-4xl text-5xl font-bold leading-[1.1] tracking-tight text-light md:text-7xl"
      >
        Daylighting analysis,{" "}
        <span className="bg-gradient-to-r from-accent to-sky bg-clip-text text-transparent">
          simplified.
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl"
      >
        One click to compute SDA and ASE for LEED v4.1 compliance.
        Works inside Rhino, Revit, or as a standalone app.
        Powered by Radiance.
      </motion.p>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.35 }}
        className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
      >
        <a
          href="#download"
          className="rounded-full bg-accent px-8 py-3.5 text-base font-semibold text-midnight transition-all hover:bg-accent-dim hover:shadow-xl hover:shadow-accent/25"
        >
          Download Free
        </a>
        <a
          href="#how-it-works"
          className="group rounded-full border border-border px-8 py-3.5 text-base font-medium text-muted transition-all hover:border-muted hover:text-light"
        >
          See how it works
          <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
            &rarr;
          </span>
        </a>
      </motion.div>

      {/* Metrics row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="mt-20 grid grid-cols-3 gap-8 md:gap-16"
      >
        {[
          { value: "SDA", label: "Spatial Daylight Autonomy" },
          { value: "ASE", label: "Annual Sunlight Exposure" },
          { value: "LEED", label: "v4.1 EQc7 Option 1" },
        ].map((m) => (
          <div key={m.value} className="text-center">
            <div className="text-2xl font-bold text-accent md:text-3xl">
              {m.value}
            </div>
            <div className="mt-1 text-xs text-dim md:text-sm">{m.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8"
      >
        <a href="#features" className="text-dim transition-colors hover:text-muted">
          <ArrowDown size={20} className="animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
}
