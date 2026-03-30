"use client";

import { motion } from "framer-motion";
import { Download, PenTool, Box, Monitor, Clock } from "lucide-react";

const tools = [
  {
    icon: PenTool,
    name: "Rhino 8 Plugin",
    version: "1.0",
    platform: "Windows",
    requirement: "Rhino 8 + Ladybug Tools",
    status: "available",
    description:
      "Layer-based geometry detection, viewport heatmaps, design tools, PDF/CSV export.",
    downloadUrl: "https://github.com/ycdstudio233/dayra-tool-website/releases/download/v1.0-beta/DayraTool-Rhino8-v1.0-beta.zip",
    downloadLabel: "Download .rhp",
  },
  {
    icon: Box,
    name: "Revit 2025 Add-in",
    version: "1.0",
    platform: "Windows",
    requirement: "Revit 2025 + Ladybug Tools",
    status: "available",
    description:
      "Room & window extraction, shared parameters, color overrides, schedule-ready data.",
    downloadUrl: "https://github.com/ycdstudio233/dayra-tool-website/releases/download/v1.0-beta/DayraTool-Revit2025-v1.0-beta.zip",
    downloadLabel: "Download .addin",
  },
  {
    icon: Monitor,
    name: "Standalone App",
    version: "1.0",
    platform: "Windows",
    requirement: "Ladybug Tools",
    status: "available",
    description:
      "Import OBJ/STL models, 3D viewport with orbit/pan/zoom, visual room tagging, color-coded results overlay, CSV export.",
    downloadUrl: "https://github.com/ycdstudio233/dayra-tool-website/releases/download/v1.0-beta/DayraTool-Standalone-v1.0-beta.zip",
    downloadLabel: "Download .exe",
  },
  {
    icon: Box,
    name: "Grasshopper Component",
    version: "\u2014",
    platform: "Windows / Mac",
    requirement: "Rhino 8 + Grasshopper",
    status: "coming",
    description:
      "Native GH component for parametric daylight workflows. Define rooms, run simulations, and read results all within the Grasshopper canvas.",
    downloadUrl: null,
    downloadLabel: "Coming Soon",
  },
];

export default function DownloadSection() {
  return (
    <section id="download" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
            Download
          </p>
          <h2 className="text-3xl font-bold text-light md:text-5xl">
            Get started today
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            All tools are free during beta. Download the one that fits your
            workflow.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {tools.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative overflow-hidden rounded-2xl border p-8 transition-all ${
                t.status === "available"
                  ? "border-border/50 bg-card/50 hover:border-accent/30"
                  : "border-border/30 bg-card/20"
              }`}
            >
              {/* Coming soon overlay */}
              {t.status === "coming" && (
                <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
                  <Clock size={12} />
                  Coming Soon
                </div>
              )}

              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                <t.icon size={24} />
              </div>

              <h3 className="text-xl font-bold text-light">{t.name}</h3>

              <div className="mt-2 flex items-center gap-3 text-xs text-dim">
                <span>v{t.version}</span>
                <span className="h-1 w-1 rounded-full bg-dim" />
                <span>{t.platform}</span>
                <span className="h-1 w-1 rounded-full bg-dim" />
                <span>{t.requirement}</span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-dim">
                {t.description}
              </p>

              {t.status === "available" ? (
                <a
                  href={t.downloadUrl!}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-midnight transition-all hover:bg-accent-dim hover:shadow-lg hover:shadow-accent/20"
                >
                  <Download size={16} />
                  {t.downloadLabel}
                </a>
              ) : (
                <button
                  disabled
                  className="mt-6 inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-border bg-card px-6 py-2.5 text-sm font-medium text-dim"
                >
                  <Clock size={16} />
                  {t.downloadLabel}
                </button>
              )}
            </motion.div>
          ))}
        </div>

        {/* Prerequisites note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 rounded-2xl border border-border/30 bg-card/20 p-6 text-center"
        >
          <p className="text-sm text-dim">
            <span className="font-semibold text-muted">Prerequisite:</span> All
            tools require{" "}
            <a
              href="https://www.ladybug.tools/ladybug-tools-installer.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline decoration-accent/30 transition-colors hover:text-accent-dim"
            >
              Ladybug Tools
            </a>{" "}
            (free) to be installed, which provides the Honeybee and Radiance
            simulation engine.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
