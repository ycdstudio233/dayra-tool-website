"use client";

import { motion } from "framer-motion";
import {
  Sun,
  BarChart3,
  Layers,
  Zap,
  Palette,
  Shield,
  Lightbulb,
  FileText,
} from "lucide-react";

const features = [
  {
    icon: Sun,
    title: "Full-Year Simulation",
    description:
      "Simulates 8,760 hours of daylight using Radiance ray-tracing and real weather data (EPW files) for your exact location.",
  },
  {
    icon: BarChart3,
    title: "SDA & ASE Metrics",
    description:
      "Computes Spatial Daylight Autonomy and Annual Sunlight Exposure per IES LM-83, the metrics LEED v4.1 requires.",
  },
  {
    icon: Shield,
    title: "LEED v4.1 Ready",
    description:
      "Automatically evaluates EQc7 Option 1 thresholds (SDA >= 55%, ASE <= 10%) and reports 0, 2, or 3 LEED points.",
  },
  {
    icon: Layers,
    title: "Works Where You Work",
    description:
      "Native plugins for Rhino 8 and Revit 2025, plus a standalone WPF app. No workflow disruption.",
  },
  {
    icon: Palette,
    title: "Visual Heatmaps",
    description:
      "Color-coded floor plans show exactly where daylight reaches and where direct sun causes glare. Multiple color themes.",
  },
  {
    icon: Zap,
    title: "One-Click Analysis",
    description:
      "Auto-detects rooms, windows, and shading from your model layers. Hit Analyze and get results in minutes, not hours.",
  },
  {
    icon: Lightbulb,
    title: "Smart Suggestions",
    description:
      "AI-powered design advice: where to add overhangs, light shelves, or adjust glazing. Add them with one click.",
  },
  {
    icon: FileText,
    title: "Export Everything",
    description:
      "PDF reports, CSV data, HD viewport captures. Results write back to Rhino UserText and Revit shared parameters.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Features() {
  return (
    <section id="features" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
            Features
          </p>
          <h2 className="text-3xl font-bold text-light md:text-5xl">
            Everything you need for LEED daylighting
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            From simulation to submission. One tool handles the full daylighting
            compliance workflow.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={item}
              className="group rounded-2xl border border-border/50 bg-card/50 p-6 transition-all hover:border-accent/30 hover:bg-card-hover/50"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent/20">
                <f.icon size={20} />
              </div>
              <h3 className="mb-2 text-base font-semibold text-light">
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed text-dim">{f.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
