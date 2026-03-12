import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "motion/react";
import { Target, ShieldCheck, ChevronLeft, ChevronRight, Sparkles, AlertTriangle, Waves, BookOpen } from "lucide-react";
import { useParams } from "react-router";

// Panoramic assets - very wide images for 360° effect
// Using local images from public folder
const PLAYROOM_PANORAMA = "/playroom-panorama.png";
const VILLAGE_PANORAMA = "/village-panorama.png";

interface AR360PanoramaProps {
  mode?: "earthquake" | "flood";
  onComplete?: () => void;
}

export function AR360Panorama({ mode: propMode, onComplete }: AR360PanoramaProps) {
  const { mode: urlMode } = useParams<{ mode: string }>();
  const mode = (urlMode as "earthquake" | "flood") || propMode || "flood";

  const [isLocked, setIsLocked] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  // Panorama settings - very wide aspect ratio for 360° effect
  const panoramaWidth = 2400; // Width of panoramic image
  const viewportWidth = 390;  // Mobile viewport width

  // Calculate drag constraints
  const dragConstraints = {
    left: -(panoramaWidth - viewportWidth),
    right: 0
  };

  // The safe zone is on the FAR RIGHT of the image
  // So we need to drag LEFT (negative x) to reveal it
  // Threshold is when we're 80% of the way to the left edge
  const safeZoneThreshold = -(panoramaWidth - viewportWidth) * 0.75;

  // Transform drag value to progress (0 = left edge, 1 = right edge visible)
  const progress = useTransform(x, [dragConstraints.left, dragConstraints.right], [1, 0]);

  // Reticle color based on lock state
  const reticleColor = isLocked ? "#06D6A0" : "#EF476F";
  const reticlePulse = isLocked ? "shadow-[0_0_30px_#06D6A0]" : "shadow-[0_0_30px_#EF476F]";

  // Listen to drag changes and check if safe zone is in view
  useEffect(() => {
    const unsubscribe = x.on("change", (latest) => {
      if (!isLocked && latest <= safeZoneThreshold) {
        setIsLocked(true);
        setTimeout(() => setShowSuccess(true), 500);
      }
    });
    return unsubscribe;
  }, [x, isLocked, safeZoneThreshold]);

  const backgroundImage = mode === "earthquake" ? PLAYROOM_PANORAMA : VILLAGE_PANORAMA;
  const safeZoneName = "Sturdy Rock Platform";
  const instructionText = "Flash Flood Drill";
  const instructionSubtitle = "Drag to find the safest high ground!";

  const handleReset = () => {
    setIsLocked(false);
    setShowSuccess(false);
    x.set(0);
  };

  const handleComplete = () => {
    onComplete?.();
  };

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden bg-black">

        {/* Status Bar */}
        <div className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center px-6 pt-4 pb-2 bg-gradient-to-b from-black/50 to-transparent">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-white text-xs font-bold tracking-wider">AR ACTIVE</span>
          </div>
          <div className="flex items-center gap-1">
            <Signal className="text-white" size={14} />
            <span className="text-white text-xs font-bold">5G</span>
          </div>
        </div>

        {/* Draggable Panoramic Background */}
        <motion.div
          drag="x"
          dragConstraints={containerRef}
          dragElastic={0.08}
          dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
          style={{ x }}
          className="absolute top-0 left-0 h-full cursor-grab active:cursor-grabbing"
        >
          <img
            src={backgroundImage}
            alt="Panoramic view"
            draggable={false}
            className="h-full w-auto max-w-none object-cover pointer-events-none select-none"
          />

          {/* Danger Pin - Low-lying Riverbank */}
          <div className="absolute bottom-[38%] left-[18%] z-10 flex flex-col items-center pointer-events-none">
            <div className="bg-red-600/90 backdrop-blur-sm border-2 border-red-400 rounded-xl px-3 py-2 flex items-center gap-2 shadow-lg">
              <Waves className="text-white" size={16} />
              <span className="text-white text-xs font-bold">Danger: Low-lying Riverbank</span>
            </div>
            <div className="bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1 mt-1 flex items-center gap-1">
              <BookOpen className="text-yellow-400" size={12} />
              <span className="text-yellow-300 text-[10px] font-bold">📖 2014 - Kelantan Major Flood</span>
            </div>
            <div className="w-0.5 h-6 bg-red-500" />
            <div className="w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-[0_0_10px_rgba(239,68,68,0.7)]" />
          </div>
        </motion.div>

        {/* Dark overlay vignette for depth */}
        <div className="absolute inset-0 pointer-events-none z-[1]" style={{
          background: "radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.35) 100%)"
        }} />

        {/* Scan line effect */}
        <motion.div
          animate={{ y: ["0%", "100%"] }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          className="absolute inset-0 pointer-events-none z-[2]"
        >
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
        </motion.div>

        {/* Top Instruction Bar */}
        <div className="absolute top-12 left-4 right-4 z-40">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={`bg-black/60 backdrop-blur-md border-2 rounded-2xl px-4 py-3 flex items-center gap-3 ${
              isLocked ? "border-green-500" : "border-orange-500"
            }`}
          >
            {!isLocked ? (
              <>
                <Waves className="text-orange-500" size={24} strokeWidth={2.5} />
                <div className="flex-1">
                  <p className="text-white font-bold text-sm">{instructionText}</p>
                  <p className="text-orange-400 text-xs font-semibold">{instructionSubtitle}</p>
                </div>
              </>
            ) : (
              <>
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="text-green-400" size={24} fill="currentColor" />
                </motion.div>
                <div className="flex-1">
                  <p className="text-green-400 font-bold text-sm">Safe Zone Detected!</p>
                  <p className="text-white text-xs font-semibold">{safeZoneName}</p>
                </div>
              </>
            )}
          </motion.div>
        </div>

        {/* Center Targeting Reticle */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
          <motion.div
            initial={{ scale: 0 }}
            animate={{
              scale: isLocked ? [1, 1.2, 1] : 1,
              rotate: isLocked ? [0, -5, 5, 0] : 0
            }}
            transition={{
              scale: { duration: 0.5, repeat: isLocked ? Infinity : 0 },
              rotate: { duration: 0.3 }
            }}
            className="relative"
          >
            {/* Outer ring */}
            <motion.div
              animate={{
                borderColor: isLocked ? "#06D6A0" : "#EF476F",
                scale: isLocked ? [1, 1.1, 1] : 1
              }}
              transition={{ duration: 0.3 }}
              className={`w-24 h-24 rounded-full border-4 ${reticlePulse} transition-colors duration-300`}
              style={{ borderColor: reticleColor }}
            />

            {/* Inner crosshair */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Target
                size={32}
                strokeWidth={3}
                className={isLocked ? "text-green-500" : "text-red-500"}
              />
            </div>

            {/* Corner brackets */}
            {[
              { top: "-4px", left: "-4px", rotate: 0 },
              { top: "-4px", right: "-4px", rotate: 90 },
              { bottom: "-4px", right: "-4px", rotate: 180 },
              { bottom: "-4px", left: "-4px", rotate: 270 }
            ].map((pos, i) => (
              <motion.div
                key={i}
                className={`absolute w-8 h-8 border-4 rounded-lg`}
                style={{
                  ...pos,
                  borderColor: reticleColor,
                  transform: `rotate(${pos.rotate}deg)`,
                  transition: "border-color 0.3s"
                }}
                animate={isLocked ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              />
            ))}
          </motion.div>
        </div>

        {/* Drag Indicators */}
        <div className="absolute bottom-32 left-0 right-0 z-30 flex justify-between px-8 pointer-events-none">
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30"
          >
            <ChevronLeft className="text-white" size={20} />
          </motion.div>

          {/* Progress indicator */}
          <div className="flex flex-col items-center gap-1">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-white text-xs font-bold bg-black/40 px-3 py-1 rounded-full"
            >
              DRAG TO EXPLORE
            </motion.div>
            <div className="w-24 h-1 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-cyan-400"
                style={{ width: useTransform(progress, (p: number) => `${p * 100}%`) }}
              />
            </div>
          </div>

          <motion.div
            animate={{ x: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30"
          >
            <ChevronRight className="text-white" size={20} />
          </motion.div>
        </div>

        {/* Success Modal/Bottom Sheet */}
        <AnimatePresence>
          {showSuccess && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/50 backdrop-blur-sm z-40"
                onClick={handleComplete}
              />

              {/* Success Card */}
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[2.5rem] border-t-4 border-green-500 shadow-[0_-10px_60px_rgba(0,0,0,0.3)] z-50 p-6"
              >
                {/* Handle */}
                <div className="w-16 h-2 bg-slate-200 rounded-full mx-auto mb-6" />

                {/* Success Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                  className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-green-500"
                >
                  <ShieldCheck size={40} className="text-green-500" strokeWidth={2.5} />
                </motion.div>

                {/* Success Text */}
                <div className="text-center mb-6">
                  <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl font-black text-slate-800 mb-2"
                  >
                    ✅ High Ground Reached!
                  </motion.h2>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-slate-600 font-semibold"
                  >
                    Survival Probability <span className="text-green-600 font-black">+80%</span>.
                  </motion.p>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-sm text-slate-500 mt-1"
                  >
                    Found: {safeZoneName}
                  </motion.p>
                </div>

                {/* XP Badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.6, delay: 0.6 }}
                  className="flex justify-center mb-6"
                >
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-400 px-6 py-2 rounded-full border-2 border-orange-500 shadow-lg">
                    <span className="text-white font-black text-sm">+50 XP EARNED</span>
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleReset}
                    className="flex-1 py-4 bg-slate-100 text-slate-700 font-bold rounded-2xl border-2 border-slate-300 hover:bg-slate-200 transition-colors"
                  >
                    Try Again
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleComplete}
                    className="flex-1 py-4 bg-green-500 text-white font-black rounded-2xl border-2 border-green-600 shadow-[0_4px_0_#16a34a] active:shadow-none active:translate-y-1 transition-all"
                  >
                    Complete
                  </motion.button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Bottom Navigation Hint */}
        {!showSuccess && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-4 left-0 right-0 z-30 flex justify-center"
          >
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-white text-xs font-bold">360° VIEW ACTIVE</span>
            </div>
          </motion.div>
        )}

    </div>
  );
}

// Helper component for signal icon
function Signal({ className, size = 24 }: { className?: string; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={size} height={size} className={className}>
      <path d="M5 12.55V11a5 5 0 0 1 5-5v0a5 5 0 0 1 5 5v1.55" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M9 12v5a3 3 0 0 0 6 0v-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M12 17v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="12" cy="22" r="1" fill="currentColor"/>
    </svg>
  );
}
