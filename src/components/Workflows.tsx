"use client";

import { motion } from "framer-motion";
import { Box, PenTool, Monitor } from "lucide-react";

const workflows = [
  {
    icon: PenTool,
    platform: "Rhino 8",
    badge: "Available Now",
    badgeColor: "bg-accent/10 text-accent border-accent/20",
    steps: [
      "Organize geometry on Room, Window, and Shade layers",
      'Type "DayraRun" in the command line to open the panel',
      "Hit Analyze \u2014 rooms, windows, and shading are auto-detected",
      "View SDA/ASE heatmaps directly in the viewport",
      "Use Design Tools to add overhangs and light shelves",
      "Export PDF reports or CSV data for LEED submission",
    ],
    description:
      "The Rhino plugin detects room volumes, windows, and shading surfaces from your layer structure. Results are applied as color overrides and TextDots right in the viewport.",
  },
  {
    icon: Box,
    platform: "Revit 2025",
    badge: "Available Now",
    badgeColor: "bg-accent/10 text-accent border-accent/20",
    steps: [
      "Select rooms in Revit (or run on all rooms)",
      'Click "Run Analysis" from the Dayra ribbon tab',
      "Hosted windows are extracted automatically from room boundaries",
      "Results write back as shared parameters (DA_SDA_Percent, DA_ASE_Percent)",
      "Rooms are color-coded by performance in the active view",
      "Create room schedules with the daylight parameters",
    ],
    description:
      "The Revit add-in reads room geometry and hosted windows directly from the BIM model. Results are stored as shared parameters so they appear in schedules and can be exported.",
  },
  {
    icon: Monitor,
    platform: "Standalone App",
    badge: "Available Now",
    badgeColor: "bg-accent/10 text-accent border-accent/20",
    steps: [
      "Prepare a spec JSON describing rooms, windows, and shading",
      "Select the spec file, EPW weather file, and output directory",
      "Click Run \u2014 the simulation pipeline executes automatically",
      "View SDA, ASE, and LEED status in the results dashboard",
      "Per-room breakdown with pass/fail indicators",
      "Export CSV with all metrics for reporting",
    ],
    description:
      "The standalone WPF app works without any CAD software. Feed it a JSON spec and weather file, and it runs the full Radiance simulation pipeline.",
  },
];

export default function Workflows() {
  return (
    <section id="workflows" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
            Workflows
          </p>
          <h2 className="text-3xl font-bold text-light md:text-5xl">
            Three tools, one mission
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            Whether you design in Rhino, model in Revit, or work from specs
            \u2014 there&apos;s a workflow for you.
          </p>
        </motion.div>

        <div className="space-y-12">
          {workflows.map((w, i) => (
            <motion.div
              key={w.platform}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="overflow-hidden rounded-3xl border border-border/50 bg-card/30"
            >
              <div className="grid md:grid-cols-5">
                {/* Left info */}
                <div className="flex flex-col justify-center border-b border-border/30 p-8 md:col-span-2 md:border-b-0 md:border-r">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                    <w.icon size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-light">
                    {w.platform}
                  </h3>
                  <span
                    className={`mt-2 inline-flex w-fit items-center rounded-full border px-3 py-0.5 text-xs font-medium ${w.badgeColor}`}
                  >
                    {w.badge}
                  </span>
                  <p className="mt-4 text-sm leading-relaxed text-dim">
                    {w.description}
                  </p>
                </div>

                {/* Right steps */}
                <div className="p-8 md:col-span-3">
                  <ol className="space-y-4">
                    {w.steps.map((step, j) => (
                      <li key={j} className="flex items-start gap-4">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">
                          {j + 1}
                        </span>
                        <span className="pt-0.5 text-sm leading-relaxed text-muted">
                          {step}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
