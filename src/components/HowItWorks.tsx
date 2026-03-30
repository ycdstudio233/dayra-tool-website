"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Model your building",
    description:
      "Design rooms, windows, and shading in Rhino or Revit. Or describe them in a simple JSON spec. The tool reads your geometry automatically from layers.",
    accent: "from-accent to-accent-dim",
  },
  {
    number: "02",
    title: "Run the simulation",
    description:
      "One click triggers a full-year Radiance simulation. 8,760 hours of daylight are computed using real weather data for your location. Takes 2\u20135 minutes per room.",
    accent: "from-sky to-accent",
  },
  {
    number: "03",
    title: "Get LEED results",
    description:
      "SDA, ASE, and LEED points are computed per room and for the whole model. Heatmaps show exactly where daylight reaches and where direct sun causes problems.",
    accent: "from-gold to-coral",
  },
  {
    number: "04",
    title: "Iterate and improve",
    description:
      "Smart suggestions tell you exactly what to change. Add overhangs or light shelves with one click. Re-run to see the impact. Compare scenarios side by side.",
    accent: "from-accent to-sky",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
            How It Works
          </p>
          <h2 className="text-3xl font-bold text-light md:text-5xl">
            Four steps to compliance
          </h2>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-[29px] top-0 hidden h-full w-px bg-gradient-to-b from-accent/50 via-sky/30 to-transparent md:block" />

          <div className="space-y-16">
            {steps.map((s, i) => (
              <motion.div
                key={s.number}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-8"
              >
                {/* Number circle */}
                <div className="relative shrink-0">
                  <div
                    className={`flex h-[60px] w-[60px] items-center justify-center rounded-2xl bg-gradient-to-br ${s.accent} text-lg font-bold text-midnight`}
                  >
                    {s.number}
                  </div>
                </div>

                {/* Content */}
                <div className="pt-2">
                  <h3 className="mb-2 text-xl font-semibold text-light">
                    {s.title}
                  </h3>
                  <p className="max-w-lg text-sm leading-relaxed text-dim">
                    {s.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
