"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";

/* ─── Data for each demo step ─── */
const steps = [
  {
    id: 0,
    label: "Rhino Viewport",
    caption: "Organize rooms, windows & shading on layers",
    ui: "viewport",
  },
  {
    id: 1,
    label: "Open Panel",
    caption: 'Type "DARunAnalysis" — the panel opens',
    ui: "panel-open",
  },
  {
    id: 2,
    label: "Run Analysis",
    caption: "One click triggers a full-year Radiance simulation",
    ui: "running",
  },
  {
    id: 3,
    label: "View Results",
    caption: "SDA, ASE & LEED points — color-coded rooms in viewport",
    ui: "results",
  },
  {
    id: 4,
    label: "Smart Suggestions",
    caption: "Actionable fixes: add overhangs, light shelves, adjust glazing",
    ui: "suggestions",
  },
  {
    id: 5,
    label: "Iterate & Improve",
    caption: "Apply a fix, re-run, compare — all inside the same panel",
    ui: "iterate",
  },
];

/* ─── Fake room results ─── */
const rooms = [
  { name: "Office_01", sda: 72, ase: 3, status: "passes_2pt", color: "#22c55e" },
  { name: "Office_02", sda: 58, ase: 8, status: "passes_2pt", color: "#84cc16" },
  { name: "Conference", sda: 41, ase: 12, status: "fails", color: "#f87171" },
  { name: "Lobby", sda: 80, ase: 5, status: "passes_3pt", color: "#22c55e" },
];

const improvedRooms = [
  { name: "Office_01", sda: 72, ase: 3, status: "passes_2pt", color: "#22c55e" },
  { name: "Office_02", sda: 58, ase: 8, status: "passes_2pt", color: "#84cc16" },
  { name: "Conference", sda: 62, ase: 7, status: "passes_2pt", color: "#84cc16" },
  { name: "Lobby", sda: 80, ase: 5, status: "passes_3pt", color: "#22c55e" },
];

/* ─── Mockup viewport with colored rooms ─── */
function Viewport({
  colored,
  showOverhang,
  roomData,
}: {
  colored: boolean;
  showOverhang: boolean;
  roomData: typeof rooms;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg bg-[#1a1a2e]">
      {/* Grid floor */}
      <svg className="absolute inset-0 h-full w-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#4a5568" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Perspective floor plane */}
      <div className="absolute bottom-[15%] left-1/2 -translate-x-1/2" style={{ perspective: "500px" }}>
        <div
          className="grid grid-cols-2 gap-1.5"
          style={{ transform: "rotateX(55deg) rotateZ(-15deg)" }}
        >
          {roomData.map((r, i) => (
            <motion.div
              key={r.name}
              className="relative flex items-center justify-center rounded-sm border text-[8px] font-bold sm:text-[10px]"
              style={{
                width: i === 3 ? 120 : 80,
                height: i === 3 ? 60 : 55,
                borderColor: colored ? r.color + "80" : "#4a556850",
                background: colored ? r.color + "25" : "#2a3352" + "40",
                color: colored ? r.color : "#6b7394",
              }}
              animate={{
                borderColor: colored ? r.color + "80" : "#4a556850",
                background: colored ? r.color + "25" : "#2a335240",
              }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              {r.name}
              {/* Overhang on Conference room */}
              {showOverhang && r.name === "Conference" && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  className="absolute -bottom-2 left-0 h-1.5 w-full origin-left rounded-full bg-sky/60"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Axis indicator */}
      <div className="absolute bottom-3 left-3 flex items-end gap-0.5 text-[9px] text-dim opacity-60">
        <div className="flex flex-col items-center">
          <div className="h-5 w-px bg-coral" />
          <span className="text-coral">Y</span>
        </div>
        <div className="flex items-center">
          <div className="h-px w-5 bg-accent" />
          <span className="text-accent">X</span>
        </div>
      </div>

      {/* Viewport label */}
      <div className="absolute left-3 top-3 text-[10px] text-dim opacity-60">Perspective</div>

      {/* Layer list */}
      <div className="absolute right-2 top-2 space-y-1 rounded bg-[#111827]/80 px-2 py-1.5 text-[9px]">
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-sm bg-sky/70" />
          <span className="text-dim">Rooms</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-sm bg-gold/70" />
          <span className="text-dim">Windows</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-sm bg-muted/50" />
          <span className="text-dim">Shading</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Mockup side panel ─── */
function SidePanel({
  phase,
  progress,
  roomData,
}: {
  phase: "idle" | "running" | "results" | "suggestions" | "iterate";
  progress: number;
  roomData: typeof rooms;
}) {
  const modelSda = Math.round(roomData.reduce((s, r) => s + r.sda, 0) / roomData.length);
  const modelAse = Math.round(roomData.reduce((s, r) => s + r.ase, 0) / roomData.length);
  const leedPts = modelSda >= 75 ? 3 : modelSda >= 55 ? 2 : 0;

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-lg border border-border/50 bg-[#111827]">
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-border/30 px-3 py-2">
        <span className="text-[11px] font-semibold text-light">Dayra Tool</span>
        <div className="flex gap-1">
          <div className="h-2 w-2 rounded-full bg-dim/30" />
          <div className="h-2 w-2 rounded-full bg-dim/30" />
        </div>
      </div>

      <div className="flex-1 overflow-hidden px-3 py-2">
        <AnimatePresence mode="wait">
          {/* IDLE */}
          {phase === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex h-full flex-col items-center justify-center gap-3"
            >
              <div className="text-center text-[10px] text-dim">
                4 rooms detected on &quot;Room&quot; layer
              </div>
              <div className="flex h-8 w-28 items-center justify-center rounded-md bg-accent text-[11px] font-bold text-midnight">
                Run Analysis
              </div>
            </motion.div>
          )}

          {/* RUNNING */}
          {phase === "running" && (
            <motion.div
              key="running"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex h-full flex-col items-center justify-center gap-3"
            >
              <div className="text-[10px] text-muted">Simulating 8,760 hours...</div>
              <div className="h-1.5 w-32 overflow-hidden rounded-full bg-card">
                <motion.div
                  className="h-full rounded-full bg-accent"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="text-[9px] text-dim">Room {Math.min(Math.ceil(progress / 25), 4)} / 4</div>
            </motion.div>
          )}

          {/* RESULTS */}
          {phase === "results" && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-2"
            >
              {/* Summary cards */}
              <div className="grid grid-cols-3 gap-1.5">
                <div className="rounded-md bg-card/80 p-1.5 text-center">
                  <div className="text-[13px] font-bold text-accent">{modelSda}%</div>
                  <div className="text-[8px] text-dim">SDA</div>
                </div>
                <div className="rounded-md bg-card/80 p-1.5 text-center">
                  <div className="text-[13px] font-bold text-gold">{modelAse}%</div>
                  <div className="text-[8px] text-dim">ASE</div>
                </div>
                <div className="rounded-md bg-card/80 p-1.5 text-center">
                  <div className="text-[13px] font-bold text-sky">{leedPts}pt</div>
                  <div className="text-[8px] text-dim">LEED</div>
                </div>
              </div>

              {/* Per-room table */}
              <div className="space-y-1">
                {roomData.map((r) => (
                  <motion.div
                    key={r.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-center justify-between rounded-md bg-card/40 px-2 py-1"
                  >
                    <div className="flex items-center gap-1.5">
                      <div className="h-2 w-2 rounded-full" style={{ background: r.color }} />
                      <span className="text-[9px] text-light">{r.name}</span>
                    </div>
                    <div className="flex gap-2 text-[9px]">
                      <span className="text-muted">SDA {r.sda}%</span>
                      <span className="text-dim">ASE {r.ase}%</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* SUGGESTIONS */}
          {phase === "suggestions" && (
            <motion.div
              key="suggestions"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-2"
            >
              <div className="text-[10px] font-semibold text-light">Smart Suggestions</div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-md border border-coral/30 bg-coral/5 px-2 py-1.5"
              >
                <div className="text-[9px] font-semibold text-coral">Conference — SDA 41% (needs 55%)</div>
                <div className="mt-0.5 text-[8px] text-dim">ASE 12% exceeds 10% limit</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-1"
              >
                <div className="flex items-center gap-1.5 rounded-md bg-card/60 px-2 py-1.5">
                  <div className="h-3 w-3 rounded bg-sky/20 text-center text-[7px] leading-3 text-sky">+</div>
                  <span className="text-[9px] text-muted">Add overhang to south windows</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-md bg-card/60 px-2 py-1.5">
                  <div className="h-3 w-3 rounded bg-sky/20 text-center text-[7px] leading-3 text-sky">+</div>
                  <span className="text-[9px] text-muted">Add interior light shelf</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex h-6 w-full items-center justify-center rounded-md bg-sky/20 text-[10px] font-semibold text-sky"
              >
                Apply Fix →
              </motion.div>
            </motion.div>
          )}

          {/* ITERATE */}
          {phase === "iterate" && (
            <motion.div
              key="iterate"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-2"
            >
              <div className="grid grid-cols-3 gap-1.5">
                <div className="rounded-md bg-card/80 p-1.5 text-center">
                  <div className="text-[13px] font-bold text-accent">68%</div>
                  <div className="text-[8px] text-dim">SDA</div>
                </div>
                <div className="rounded-md bg-card/80 p-1.5 text-center">
                  <div className="text-[13px] font-bold text-accent">6%</div>
                  <div className="text-[8px] text-dim">ASE</div>
                </div>
                <div className="rounded-md bg-card/80 p-1.5 text-center">
                  <div className="text-[13px] font-bold text-accent">2pt</div>
                  <div className="text-[8px] text-dim">LEED</div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="rounded-md border border-accent/30 bg-accent/5 px-2 py-1.5 text-center"
              >
                <div className="text-[10px] font-bold text-accent">All rooms now pass LEED!</div>
                <div className="text-[8px] text-dim">Conference: 41% → 62% SDA</div>
              </motion.div>

              {improvedRooms.map((r) => (
                <div
                  key={r.name}
                  className="flex items-center justify-between rounded-md bg-card/40 px-2 py-1"
                >
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full" style={{ background: r.color }} />
                    <span className="text-[9px] text-light">{r.name}</span>
                  </div>
                  <div className="flex gap-2 text-[9px]">
                    <span className="text-accent">SDA {r.sda}%</span>
                    <span className="text-dim">ASE {r.ase}%</span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── Main demo component ─── */
export default function ToolDemo() {
  const [activeStep, setActiveStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const panelPhase = (() => {
    if (activeStep <= 1) return "idle" as const;
    if (activeStep === 2) return "running" as const;
    if (activeStep === 3) return "results" as const;
    if (activeStep === 4) return "suggestions" as const;
    return "iterate" as const;
  })();

  const showPanel = activeStep >= 1;
  const showColors = activeStep >= 3;
  const showOverhang = activeStep >= 5;
  const currentRoomData = activeStep >= 5 ? improvedRooms : rooms;

  // Auto-play timer
  const advanceStep = useCallback(() => {
    setActiveStep((prev) => {
      if (prev >= steps.length - 1) {
        setPlaying(false);
        return prev;
      }
      return prev + 1;
    });
    setProgress(0);
  }, []);

  useEffect(() => {
    if (!playing) return;

    // Simulate progress for the "running" step
    if (activeStep === 2) {
      const progressInterval = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return p + 4;
        });
      }, 80);

      const timer = setTimeout(advanceStep, 2500);
      return () => {
        clearTimeout(timer);
        clearInterval(progressInterval);
      };
    }

    const delay = activeStep === 0 ? 2000 : activeStep === 4 ? 3000 : 2500;
    const timer = setTimeout(advanceStep, delay);
    return () => clearTimeout(timer);
  }, [playing, activeStep, advanceStep]);

  const handlePlay = () => {
    setActiveStep(0);
    setProgress(0);
    setPlaying(true);
  };

  const handleStepClick = (idx: number) => {
    setPlaying(false);
    setActiveStep(idx);
    setProgress(idx === 2 ? 100 : 0);
  };

  return (
    <div className="mt-20">
      {/* Step indicators */}
      <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
        {steps.map((s, i) => (
          <button
            key={s.id}
            onClick={() => handleStepClick(i)}
            className={`rounded-full px-3 py-1 text-[11px] font-medium transition-all ${
              i === activeStep
                ? "bg-accent text-midnight"
                : i < activeStep
                  ? "bg-accent/10 text-accent"
                  : "bg-card/50 text-dim hover:text-muted"
            }`}
          >
            {s.label}
          </button>
        ))}

        <button
          onClick={handlePlay}
          className="ml-2 flex items-center gap-1 rounded-full border border-accent/30 px-3 py-1 text-[11px] font-medium text-accent transition-all hover:bg-accent/10"
        >
          {playing ? <RotateCcw size={12} /> : <Play size={12} />}
          {playing ? "Restart" : "Play Demo"}
        </button>
      </div>

      {/* Caption */}
      <AnimatePresence mode="wait">
        <motion.p
          key={activeStep}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className="mb-4 text-center text-sm text-muted"
        >
          {steps[activeStep].caption}
        </motion.p>
      </AnimatePresence>

      {/* Demo window */}
      <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-border/50 bg-[#0d1117] shadow-2xl shadow-black/40">
        {/* Window chrome */}
        <div className="flex items-center gap-2 border-b border-border/30 bg-[#161b22] px-4 py-2.5">
          <div className="h-3 w-3 rounded-full bg-coral/60" />
          <div className="h-3 w-3 rounded-full bg-gold/60" />
          <div className="h-3 w-3 rounded-full bg-accent/60" />
          <span className="ml-3 text-[11px] text-dim">Rhino 8 — Dayra Tool</span>
        </div>

        {/* Content area */}
        <div className="flex" style={{ height: 320 }}>
          {/* Viewport */}
          <div className={`transition-all duration-500 ${showPanel ? "w-[60%]" : "w-full"}`}>
            <Viewport colored={showColors} showOverhang={showOverhang} roomData={currentRoomData} />
          </div>

          {/* Side panel */}
          <AnimatePresence>
            {showPanel && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "40%", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="border-l border-border/30"
              >
                <SidePanel phase={panelPhase} progress={progress} roomData={currentRoomData} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
