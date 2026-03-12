import { useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "motion/react";
import {
  Target, ShieldCheck, ChevronLeft, ChevronRight, AlertTriangle,
  Sparkles, RotateCcw, Play, X, MapPin, BookOpen, XCircle,
} from "lucide-react";

const PLAYROOM_PANORAMA = "/playroom-panorama.png";
const VILLAGE_PANORAMA = "/village-panorama.png";

type DrillMode = "earthquake" | "flood";

// ── Hotspot zones the user can tap ──
// positionX = pixel offset from left edge of 2400-wide panorama
interface Hotspot {
  id: string;
  label: string;
  positionX: number; // px from left edge of panorama
  positionY: string; // CSS top %
  correct: boolean;
  feedback: string;
}

// ── History markers overlaid on panorama ──
interface HistoryMarker {
  id: string;
  year: string;
  label: string;
  positionX: number;
  positionY: string;
  story: string;
  deaths: string;
  lesson: string;
}

// ── Real disaster history data ──
const FLOOD_HISTORY: HistoryMarker[] = [
  {
    id: "f1",
    year: "2014",
    label: "Kelantan Flood",
    positionX: 300,
    positionY: "60%",
    story: "In December 2014, Malaysia's worst flooding in decades hit Kelantan, Terengganu, and Pahang. Over 200,000 people were displaced. Entire villages were submerged under 3–5 metres of water.",
    deaths: "21 deaths, RM2.8 billion damages",
    lesson: "Seek high ground immediately. Never attempt to walk or drive through floodwater.",
  },
  {
    id: "f2",
    year: "2021",
    label: "Shah Alam Flood",
    positionX: 900,
    positionY: "55%",
    story: "In December 2021, unprecedented rainfall caused flash floods across Selangor and Kuala Lumpur. Shah Alam's Section 24–27 was cut off for days. Residents were trapped on rooftops awaiting rescue.",
    deaths: "54 deaths, 120,000+ displaced",
    lesson: "Keep an emergency go-bag ready. Move to upper floors — never stay in a ground-floor unit during flash floods.",
  },
  {
    id: "f3",
    year: "2011",
    label: "Thailand Mega Flood",
    positionX: 1500,
    positionY: "50%",
    story: "From July to December 2011, Thailand experienced its worst flooding in 50 years. The Chao Phraya River basin overflowed, inundating Bangkok's industrial zones and displacing millions.",
    deaths: "815 deaths, US$46.5 billion damages",
    lesson: "Stay near elevated structures. Flood water carries disease — avoid direct contact and boil drinking water.",
  },
];

const EARTHQUAKE_HISTORY: HistoryMarker[] = [
  {
    id: "e1",
    year: "2015",
    label: "Sabah Earthquake",
    positionX: 300,
    positionY: "55%",
    story: "On 5 June 2015, a 6.0-magnitude earthquake struck Ranau, Sabah, Malaysia. It caused a massive landslide on Mount Kinabalu, trapping climbers. 18 people died, including students on a school trip.",
    deaths: "18 deaths, major landslides on Mt. Kinabalu",
    lesson: "During earthquakes, DROP, COVER, and HOLD ON under sturdy furniture. Stay away from windows and heavy objects.",
  },
  {
    id: "e2",
    year: "2018",
    label: "Lombok Earthquake",
    positionX: 900,
    positionY: "50%",
    story: "In July–August 2018, a series of earthquakes (up to M6.9) devastated Lombok, Indonesia. Over 560 people died and 417,000 were displaced. Buildings collapsed across the island.",
    deaths: "560+ deaths, 417,000 displaced",
    lesson: "Identify the nearest sturdy table or desk in every room. Practice 'Drop, Cover, Hold On' drills regularly.",
  },
  {
    id: "e3",
    year: "2025",
    label: "Myanmar Earthquake",
    positionX: 1500,
    positionY: "60%",
    story: "On 28 March 2025, a magnitude 7.7 earthquake struck Mandalay Region, Myanmar. It caused catastrophic destruction, collapsing thousands of buildings and bridges. Over 3,000 people were confirmed dead.",
    deaths: "3,000+ deaths, widespread destruction",
    lesson: "After shaking stops, evacuate calmly. Avoid damaged buildings — aftershocks can cause further collapse.",
  },
];

// ── Hotspots (tappable choice zones on the panorama) ──
const FLOOD_HOTSPOTS: Hotspot[] = [
  { id: "fh1", label: "Low Bridge", positionX: 400, positionY: "65%", correct: false, feedback: "❌ Bridges near rivers are extremely dangerous during floods! Water can sweep them away." },
  { id: "fh2", label: "Riverbank", positionX: 1000, positionY: "70%", correct: false, feedback: "❌ Never stay near riverbanks during floods. Flash floods can surge without warning." },
  { id: "fh3", label: "Open Field", positionX: 1500, positionY: "60%", correct: false, feedback: "❌ Open low ground floods quickly. You need elevation to survive rising water." },
  { id: "fh4", label: "🏔️ High Rock", positionX: 2100, positionY: "40%", correct: true, feedback: "✅ Elevated rocky ground is the safest spot! Above flood levels and structurally stable." },
];

const EARTHQUAKE_HOTSPOTS: Hotspot[] = [
  { id: "eh1", label: "Near Window", positionX: 350, positionY: "50%", correct: false, feedback: "❌ Windows shatter during earthquakes! Stay away from glass." },
  { id: "eh2", label: "Open Shelf", positionX: 850, positionY: "45%", correct: false, feedback: "❌ Shelves collapse and heavy objects fall. Never take cover near shelves." },
  { id: "eh3", label: "Center Room", positionX: 1400, positionY: "55%", correct: false, feedback: "❌ Without a sturdy cover above you, falling debris can cause serious injury." },
  { id: "eh4", label: "🪑 Under Table", positionX: 2050, positionY: "45%", correct: true, feedback: "✅ Drop, Cover, Hold On! A sturdy table protects you from falling debris." },
];

const DRILL_CONFIG: Record<DrillMode, {
  panorama: string;
  safeZone: string;
  instruction: string;
  subtitle: string;
  history: HistoryMarker[];
  hotspots: Hotspot[];
}> = {
  earthquake: {
    panorama: PLAYROOM_PANORAMA,
    safeZone: "Sturdy Table (Drop, Cover, Hold On!)",
    instruction: "Earthquake Drill",
    subtitle: "Tap the safest place to take cover!",
    history: EARTHQUAKE_HISTORY,
    hotspots: EARTHQUAKE_HOTSPOTS,
  },
  flood: {
    panorama: VILLAGE_PANORAMA,
    safeZone: "High Rock Platform",
    instruction: "Flood Drill",
    subtitle: "Tap the safest place to evacuate!",
    history: FLOOD_HISTORY,
    hotspots: FLOOD_HOTSPOTS,
  },
};

// ──────────────────────────────────────────────
// Component
// ──────────────────────────────────────────────
export function ARTimeMachine() {
  const [mode, setMode] = useState<DrillMode | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [activeStory, setActiveStory] = useState<HistoryMarker | null>(null);
  const [wrongChoice, setWrongChoice] = useState<string | null>(null); // feedback text
  const [wrongShake, setWrongShake] = useState(false);
  const [chosenIds, setChosenIds] = useState<Set<string>>(new Set());

  const frameRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  const panoramaWidth = 2400;
  const frameWidth = 390;
  const minX = -(panoramaWidth - frameWidth);

  const progress = useTransform(x, [minX, 0], [1, 0]);
  const progressWidth = useTransform(progress, (p: number) => `${p * 100}%`);

  const handleReset = useCallback(() => {
    setShowSuccess(false);
    setWrongChoice(null);
    setWrongShake(false);
    setChosenIds(new Set());
    x.set(0);
  }, [x]);

  const handleBack = useCallback(() => {
    setMode(null);
    handleReset();
    setActiveStory(null);
  }, [handleReset]);

  const handleHotspotTap = useCallback((hotspot: Hotspot) => {
    if (showSuccess) return;
    if (hotspot.correct) {
      setShowSuccess(true);
      setWrongChoice(null);
    } else {
      setChosenIds((prev) => new Set(prev).add(hotspot.id));
      setWrongChoice(hotspot.feedback);
      setWrongShake(true);
      setTimeout(() => setWrongShake(false), 600);
    }
  }, [showSuccess]);

  const config = mode ? DRILL_CONFIG[mode] : null;

  // ──────────────────────────────────────────────
  // Mode Selection Screen
  // ──────────────────────────────────────────────
  if (!mode) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-[#E6F4F1]">
        <div className="w-full max-w-md mx-auto px-6 flex flex-col items-center gap-6">
          {/* Title */}
          <div className="bg-white border-[4px] border-black rounded-2xl px-6 py-4 shadow-[6px_6px_0px_rgba(0,0,0,1)] text-center">
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">AR Survival Training</h1>
            <p className="text-sm font-bold text-slate-500 mt-1">360° Safe Zone Finder</p>
          </div>

          {/* Guideline Video */}
          <button
            onClick={() => setShowVideo(true)}
            className="w-full bg-white border-[4px] border-black rounded-2xl px-5 py-4 shadow-[6px_6px_0px_rgba(0,0,0,1)] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all flex items-center gap-4 text-left"
          >
            <div className="w-12 h-12 bg-[#EF476F] rounded-xl border-[3px] border-black flex items-center justify-center shrink-0 shadow-[3px_3px_0px_rgba(0,0,0,1)]">
              <Play size={22} className="text-white ml-0.5" fill="white" />
            </div>
            <div>
              <p className="font-black text-slate-800 text-sm leading-tight">Guideline Video</p>
              <p className="text-xs font-bold text-slate-400">Watch before you start!</p>
            </div>
          </button>

          {/* Drill Buttons */}
          <div className="w-full flex flex-col gap-4">
            <button
              onClick={() => setMode("flood")}
              className="w-full bg-[#4CC9F0] text-white border-[4px] border-black rounded-2xl px-6 py-5 font-black text-xl uppercase tracking-wide shadow-[6px_6px_0px_rgba(0,0,0,1)] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all flex items-center gap-4"
            >
              <span className="text-3xl">🌊</span>
              <span>Flood Drill</span>
            </button>
            <button
              onClick={() => setMode("earthquake")}
              className="w-full bg-[#FFD166] text-slate-900 border-[4px] border-black rounded-2xl px-6 py-5 font-black text-xl uppercase tracking-wide shadow-[6px_6px_0px_rgba(0,0,0,1)] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all flex items-center gap-4"
            >
              <span className="text-3xl">🏚️</span>
              <span>Earthquake Drill</span>
            </button>
          </div>

          {/* Video Modal */}
          <AnimatePresence>
            {showVideo && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
                onClick={() => setShowVideo(false)}
              >
                <motion.div
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.85, opacity: 0 }}
                  transition={{ type: "spring", damping: 22, stiffness: 260 }}
                  className="w-full max-w-sm bg-white border-[4px] border-black rounded-2xl shadow-[8px_8px_0px_rgba(0,0,0,1)] overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b-[3px] border-black">
                    <p className="font-black text-slate-800 text-sm">📹 Guideline Video</p>
                    <button
                      onClick={() => setShowVideo(false)}
                      className="w-8 h-8 bg-[#EF476F] rounded-lg border-[2px] border-black flex items-center justify-center shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                    >
                      <X size={16} className="text-white" strokeWidth={3} />
                    </button>
                  </div>
                  <div className="aspect-[9/16] w-full">
                    <iframe
                      src="https://www.youtube.com/embed/ZT7j0qG8iRY"
                      title="Disaster Survival Guideline"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  // ──────────────────────────────────────────────
  // 360° Panorama Drill
  // ──────────────────────────────────────────────
  return (
    <div className="h-full w-full flex items-center justify-center bg-[#E6F4F1]">
      {/* Phone Frame */}
      <motion.div
        animate={wrongShake ? { x: [0, -8, 8, -6, 6, -3, 3, 0] } : {}}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md mx-auto aspect-[9/16] relative overflow-hidden rounded-[2rem] border-[5px] border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] bg-black"
      >
        {/* Panoramic Image — draggable */}
        <motion.div
          ref={frameRef}
          drag="x"
          dragConstraints={{ left: minX, right: 0 }}
          dragElastic={0.05}
          dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
          style={{ x }}
          className="absolute top-0 left-0 h-full cursor-grab active:cursor-grabbing touch-none"
        >
          <img
            src={config!.panorama}
            alt="360° panoramic view"
            draggable={false}
            className="h-full w-auto max-w-none object-cover pointer-events-none select-none"
          />

          {/* ── History Markers (on the panorama, move with drag) ── */}
          {config!.history.map((marker, i) => (
            <motion.button
              key={marker.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.2, type: "spring", bounce: 0.5 }}
              onClick={(e) => { e.stopPropagation(); setActiveStory(marker); }}
              className="absolute flex flex-col items-center gap-1 pointer-events-auto z-10"
              style={{ left: marker.positionX, top: marker.positionY, transform: "translate(-50%, -100%)" }}
            >
              <div className="bg-white/95 backdrop-blur-sm border-[3px] border-black rounded-xl px-2.5 py-1.5 shadow-[3px_3px_0px_rgba(0,0,0,1)] flex items-center gap-1.5">
                <BookOpen size={12} className="text-[#4CC9F0]" strokeWidth={3} />
                <span className="text-[10px] font-black text-slate-800 whitespace-nowrap">{marker.year} · {marker.label}</span>
              </div>
              <MapPin size={20} className="text-[#EF476F] drop-shadow-lg" fill="#EF476F" />
            </motion.button>
          ))}

          {/* ── Hotspot Buttons (tappable choices on the panorama) ── */}
          {config!.hotspots.map((hotspot, i) => {
            const wasWrong = chosenIds.has(hotspot.id);
            return (
              <motion.button
                key={hotspot.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6 + i * 0.15, type: "spring", bounce: 0.4 }}
                onClick={(e) => { e.stopPropagation(); handleHotspotTap(hotspot); }}
                disabled={showSuccess || wasWrong}
                className={`absolute pointer-events-auto z-10 flex flex-col items-center gap-0.5`}
                style={{ left: hotspot.positionX, top: hotspot.positionY, transform: "translate(-50%, -50%)" }}
              >
                <motion.div
                  animate={!wasWrong && !showSuccess ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.3 }}
                  className={`px-3 py-2 rounded-xl border-[3px] shadow-[3px_3px_0px_rgba(0,0,0,1)] font-black text-xs whitespace-nowrap ${
                    wasWrong
                      ? "bg-slate-300 border-slate-400 text-slate-500 line-through"
                      : hotspot.correct
                        ? "bg-[#06D6A0] border-black text-white"
                        : "bg-[#FFD166] border-black text-slate-900"
                  }`}
                >
                  {wasWrong ? "✗ " : "📍 "}{hotspot.label}
                </motion.div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Vignette overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{ background: "radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.4) 100%)" }}
        />

        {/* Scan line */}
        <motion.div
          animate={{ y: ["0%", "100%"] }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          className="absolute inset-x-0 top-0 pointer-events-none z-[2]"
        >
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#4CC9F0]/60 to-transparent" />
        </motion.div>

        {/* ── Top HUD ── */}
        <div className="absolute top-0 inset-x-0 z-40 p-3 pointer-events-none">
          {/* Status bar */}
          <div className="flex justify-between items-center mb-2 px-1">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-[#06D6A0] rounded-full animate-pulse" />
              <span className="text-white text-[10px] font-black tracking-widest">AR ACTIVE</span>
            </div>
            <span className="text-white/70 text-[10px] font-bold">360° VIEW</span>
          </div>

          {/* Instruction card */}
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white border-[3px] border-[#EF476F] rounded-xl px-4 py-3 flex items-center gap-3 shadow-[4px_4px_0px_rgba(0,0,0,1)]"
          >
            <AlertTriangle className="text-[#EF476F] shrink-0" size={22} strokeWidth={3} />
            <div className="min-w-0">
              <p className="text-slate-900 font-black text-sm leading-tight">{config!.instruction}</p>
              <p className="text-[#EF476F] text-xs font-bold">{config!.subtitle}</p>
            </div>
          </motion.div>
        </div>

        {/* ── Wrong Choice Toast ── */}
        <AnimatePresence>
          {wrongChoice && !showSuccess && (
            <motion.div
              key="wrong-toast"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              className="absolute bottom-36 inset-x-3 z-40"
            >
              <div className="bg-white border-[3px] border-[#EF476F] rounded-xl px-4 py-3 shadow-[4px_4px_0px_rgba(0,0,0,1)] flex items-start gap-3">
                <XCircle size={20} className="text-[#EF476F] shrink-0 mt-0.5" strokeWidth={3} />
                <div className="min-w-0">
                  <p className="text-slate-800 font-bold text-xs leading-snug">{wrongChoice}</p>
                  <p className="text-slate-400 text-[10px] font-bold mt-1">Try another spot!</p>
                </div>
                <button onClick={() => setWrongChoice(null)} className="shrink-0 mt-0.5">
                  <X size={14} className="text-slate-400" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Center Reticle (visual guide only, no auto-detection) ── */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-[3px] border-white/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Target size={20} strokeWidth={2.5} className="text-white/50" />
            </div>
          </div>
        </div>

        {/* ── Bottom Controls ── */}
        {!showSuccess && (
          <div className="absolute bottom-0 inset-x-0 z-30 pb-4 px-4 pointer-events-none">
            <div className="flex items-center justify-between mb-3 pointer-events-auto">
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
                className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/40"
              >
                <ChevronLeft className="text-white" size={18} />
              </motion.div>

              <div className="flex flex-col items-center gap-1">
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-white text-[10px] font-black tracking-widest bg-black/40 px-3 py-0.5 rounded-full"
                >
                  DRAG & TAP A SPOT
                </motion.span>
                <div className="w-20 h-1 bg-white/20 rounded-full overflow-hidden">
                  <motion.div className="h-full bg-[#4CC9F0]" style={{ width: progressWidth }} />
                </div>
              </div>

              <motion.div
                animate={{ x: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
                className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/40"
              >
                <ChevronRight className="text-white" size={18} />
              </motion.div>
            </div>

            <button
              onClick={handleBack}
              className="w-full bg-white/15 backdrop-blur-sm text-white border-2 border-white/30 rounded-xl py-2 text-xs font-black tracking-wider active:bg-white/25 transition-colors pointer-events-auto"
            >
              ← BACK TO MENU
            </button>
          </div>
        )}

        {/* ── History Story Modal ── */}
        <AnimatePresence>
          {activeStory && (
            <motion.div
              key="story-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end"
              onClick={() => setActiveStory(null)}
            >
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 24, stiffness: 220 }}
                className="w-full bg-white rounded-t-[2rem] border-t-[4px] border-[#4CC9F0] shadow-[0_-6px_0px_rgba(0,0,0,1)] p-5 max-h-[70%] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-4" />

                {/* Year badge */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-[#EF476F] text-white font-black text-sm px-3 py-1 rounded-lg border-[2px] border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                    {activeStory.year}
                  </div>
                  <h3 className="font-black text-slate-800 text-lg">{activeStory.label}</h3>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed mb-3">{activeStory.story}</p>

                <div className="bg-[#EF476F]/10 border-[2px] border-[#EF476F] rounded-xl px-4 py-2.5 mb-3">
                  <p className="text-[#EF476F] font-black text-xs">💔 Impact: {activeStory.deaths}</p>
                </div>

                <div className="bg-[#06D6A0]/10 border-[2px] border-[#06D6A0] rounded-xl px-4 py-2.5 mb-4">
                  <p className="text-[#06D6A0] font-black text-xs">🛡️ Lesson: {activeStory.lesson}</p>
                </div>

                <button
                  onClick={() => setActiveStory(null)}
                  className="w-full py-3 bg-[#4CC9F0] text-white font-black rounded-xl border-[3px] border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all text-sm"
                >
                  Got It — Back to Drill
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Success Bottom Sheet ── */}
        <AnimatePresence>
          {showSuccess && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm z-40"
              />

              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 24, stiffness: 220 }}
                className="absolute bottom-0 inset-x-0 z-50 bg-white rounded-t-[2rem] border-t-[5px] border-[#06D6A0] shadow-[0_-8px_0px_rgba(0,0,0,1)] p-5"
              >
                <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-5" />

                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", bounce: 0.5, delay: 0.15 }}
                  className="w-16 h-16 bg-[#06D6A0]/15 rounded-full flex items-center justify-center mx-auto mb-3 border-[4px] border-[#06D6A0]"
                >
                  <ShieldCheck size={32} className="text-[#06D6A0]" strokeWidth={2.5} />
                </motion.div>

                <div className="text-center mb-4">
                  <motion.h2
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.25 }}
                    className="text-xl font-black text-slate-800"
                  >
                    Safe Zone Found!
                  </motion.h2>
                  <motion.p
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.35 }}
                    className="text-slate-500 font-bold text-sm mt-1"
                  >
                    Survival Probability{" "}
                    <span className="text-[#06D6A0] font-black">+80%</span>
                  </motion.p>
                  <motion.p
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.45 }}
                    className="text-slate-400 text-xs mt-0.5"
                  >
                    {config!.safeZone}
                  </motion.p>
                  {chosenIds.size > 0 && (
                    <motion.p
                      initial={{ y: 15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.55 }}
                      className="text-[#EF476F] text-xs font-bold mt-2"
                    >
                      Wrong attempts: {chosenIds.size} — review the history markers to learn more!
                    </motion.p>
                  )}
                </div>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.6, delay: 0.5 }}
                  className="flex justify-center mb-5"
                >
                  <div className="bg-[#FFD166] border-[3px] border-black px-5 py-1.5 rounded-full shadow-[3px_3px_0px_rgba(0,0,0,1)]">
                    <span className="text-slate-900 font-black text-sm">+50 XP EARNED ⭐</span>
                  </div>
                </motion.div>

                <div className="flex gap-3">
                  <button
                    onClick={handleReset}
                    className="flex-1 py-3.5 bg-white text-slate-700 font-black rounded-xl border-[3px] border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={16} strokeWidth={3} />
                    Retry
                  </button>
                  <button
                    onClick={handleBack}
                    className="flex-1 py-3.5 bg-[#06D6A0] text-white font-black rounded-xl border-[3px] border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
                  >
                    Complete ✓
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}