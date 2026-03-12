import { ChevronRight, CloudLightning, Search, ShieldCheck, Award, Flame, BellRing, Radio, AlertTriangle, ChevronsRight, Droplets } from "lucide-react";
import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { Link } from "react-router";
import { useState } from "react";

export function Dashboard() {
  const avatarUrl = "https://images.unsplash.com/photo-1722238577710-1145a782ebb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMGF2YXRhciUyMHNtaWxpbmclMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzI3MjgwNzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

  const [possum, setPossum] = useState(false);
  const dragX = useMotionValue(0);
  const sliderBg = useTransform(dragX, [0, 200], ["rgba(239,71,111,0.15)", "rgba(239,71,111,0.5)"]);

  return (
    <div className="min-h-full bg-[#FAFAF9] pb-40 font-medium overflow-x-hidden">

      {/* ── 1. TOP STATUS BAR (Mesh Network Readiness) ── */}
      <header className="bg-black text-white px-5 pt-12 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-[#06D6A0] opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#06D6A0]" />
            </span>
            <div className="flex items-center gap-2">
              <Radio size={16} className="text-[#4CC9F0]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#4CC9F0]">
                Mesh Network: Standby <span className="text-[#06D6A0]">(Offline Ready)</span>
              </span>
            </div>
          </div>
          <div className="relative">
            <div className="w-11 h-11 rounded-full overflow-hidden border-4 border-black shadow-[2px_2px_0px_0px_rgba(76,201,240,1)] bg-white">
              <img src={avatarUrl} alt="Explorer" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-[#FFD166] text-black text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-black">
              4
            </div>
          </div>
        </div>
      </header>

      <div className="px-5 pt-5 space-y-6">

        {/* ── 2. DYNAMIC MASCOT & WEATHER CARD (Hero Section) ── */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-[#FFF2CC] border-4 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-5 flex items-center gap-4 relative overflow-hidden"
        >
          {/* Left: Weather Alert */}
          <div className="flex-1 space-y-2 z-10">
            <div className="flex items-center gap-2">
              <AlertTriangle size={20} className="text-[#EF476F]" strokeWidth={3} />
              <span className="text-xs font-black uppercase tracking-wider text-[#EF476F]">Active Alert</span>
            </div>
            <h2 className="text-lg font-black text-black leading-snug">
              ⚠️ Flash Flood Warning in your area
            </h2>
            <p className="text-sm font-medium text-slate-700">
              Heavy rain expected today. Stay on high ground and monitor this feed.
            </p>
            <div className="flex items-center gap-1 mt-1 text-xs font-bold text-slate-500 font-mono">
              <BellRing size={12} /> Updated 12 min ago
            </div>
          </div>
          {/* Right: Mascot */}
          <div className="shrink-0 flex flex-col items-center gap-1">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="bg-white border-4 border-black rounded-2xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] w-24 h-24 flex items-center justify-center"
            >
              <span className="text-6xl leading-none select-none" role="img" aria-label="elephant mascot">🐘</span>
            </motion.div>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">Gajah says: Move!</span>
          </div>
        </motion.div>

        {/* ── 3. DUAL PROGRESS SCORES ── */}
        <div className="grid grid-cols-1 gap-4">
          {/* Personal XP */}
          <div className="bg-white border-4 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-black text-sm uppercase tracking-wide text-black">Personal XP <span className="text-[#FFD166]">(Level 4 Explorer)</span></h3>
              <span className="font-mono text-xs font-bold text-slate-500">1,240 / 1,500</span>
            </div>
            <div className="h-6 bg-slate-100 rounded-lg overflow-hidden border-2 border-black relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "80%" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute top-0 left-0 h-full bg-[#FFD166] rounded-r-md"
              />
              <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-black z-10">80%</span>
            </div>
          </div>
          {/* Kampung Safety Score */}
          <div className="bg-white border-4 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-black text-sm uppercase tracking-wide text-black">Kampung <span className="text-[#06D6A0]">(Village)</span> Safety Score</h3>
              <span className="font-mono text-xs font-bold text-slate-500">72 / 100</span>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">50 users active today</p>
            <div className="h-6 bg-slate-100 rounded-lg overflow-hidden border-2 border-black relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "72%" }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute top-0 left-0 h-full bg-[#06D6A0] rounded-r-md"
              />
              <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-black z-10">72%</span>
            </div>
          </div>
        </div>

        {/* Daily Missions */}
        <section>
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-lg font-black text-black uppercase tracking-wide">Daily Missions</h2>
            <button className="text-xs font-black text-[#4CC9F0] uppercase tracking-wider hover:underline">See All</button>
          </div>
          
          <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory hide-scrollbar -mx-5 px-5">
            
            <motion.div whileHover={{ scale: 0.98 }} whileTap={{ scale: 0.95 }} className="snap-center shrink-0 w-[220px] bg-white rounded-2xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-5 relative overflow-hidden flex flex-col justify-between aspect-[4/5]">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#4CC9F0] flex items-center justify-center text-white mb-4 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <CloudLightning size={24} strokeWidth={2.5} />
                </div>
                <h3 className="font-black text-black text-base mb-1">Explore Disaster History</h3>
                <p className="text-xs text-slate-500 font-bold">Learn from past storms and floods.</p>
              </div>
              <Link to="/atlas" className="w-full bg-[#4CC9F0] text-black font-black py-3 rounded-xl mt-4 flex items-center justify-center gap-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
                Start <ChevronRight size={16} />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 0.98 }} whileTap={{ scale: 0.95 }} className="snap-center shrink-0 w-[220px] bg-white rounded-2xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-5 relative overflow-hidden flex flex-col justify-between aspect-[4/5]">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#06D6A0] flex items-center justify-center text-white mb-4 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <Search size={24} strokeWidth={2.5} />
                </div>
                <h3 className="font-black text-black text-base mb-1">AR Safety Treasure Hunt</h3>
                <p className="text-xs text-slate-500 font-bold">Find the hidden safe zone!</p>
              </div>
              <Link to="/ar-360/flood" className="w-full bg-[#06D6A0] text-black font-black py-3 rounded-xl mt-4 flex items-center justify-center gap-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
                Start <ChevronRight size={16} />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 0.98 }} whileTap={{ scale: 0.95 }} className="snap-center shrink-0 w-[220px] bg-white rounded-2xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-5 relative overflow-hidden flex flex-col justify-between aspect-[4/5]">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#FFD166] flex items-center justify-center text-black mb-4 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <ShieldCheck size={24} strokeWidth={2.5} />
                </div>
                <h3 className="font-black text-black text-base mb-1">Earthquake Drill</h3>
                <p className="text-xs text-slate-500 font-bold">Find the sturdy table for cover!</p>
              </div>
              <Link to="/ar-360/earthquake" className="w-full bg-[#FFD166] text-black font-black py-3 rounded-xl mt-4 flex items-center justify-center gap-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
                Start <ChevronRight size={16} />
              </Link>
            </motion.div>

          </div>
        </section>

        {/* Your Badges */}
        <section className="bg-white rounded-2xl p-5 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-lg font-black text-black uppercase tracking-wide">Your Badges</h2>
            <div className="flex items-center gap-1 text-[#EF476F] bg-[#EF476F]/10 px-3 py-1 rounded-lg text-xs font-black border-2 border-[#EF476F]">
              <Flame size={14} fill="currentColor" /> 3 Day Streak
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-2xl bg-[#4CC9F0] flex items-center justify-center border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <CloudLightning size={28} className="text-white" />
              </div>
              <span className="text-[10px] text-center font-black text-black leading-tight uppercase">Flood<br/>Explorer</span>
            </div>
            
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-2xl bg-[#06D6A0] flex items-center justify-center border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <Search size={28} className="text-white" />
              </div>
              <span className="text-[10px] text-center font-black text-black leading-tight uppercase">Storm<br/>Spotter</span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 border-4 border-dashed border-black flex items-center justify-center">
                <Award size={28} className="text-slate-400" />
              </div>
              <span className="text-[10px] text-center font-black text-slate-400 leading-tight uppercase">Safety<br/>Hero</span>
            </div>
          </div>
        </section>

      </div>

      {/* ── 4. SWIPE TO SURVIVE — EMERGENCY TOGGLE (Floating) ── */}
      <div className="sticky bottom-4 mx-4 z-50">
        <div className={`${possum ? "bg-[#06D6A0]" : "bg-[#EF476F]"} border-4 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-2 relative overflow-hidden transition-colors duration-500`}>
          {!possum && <motion.div style={{ background: sliderBg }} className="absolute inset-0 rounded-2xl" />}
          <div className="relative flex items-center">
            {!possum && (
              <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 200 }}
                dragElastic={0}
                dragMomentum={false}
                style={{ x: dragX }}
                onDragEnd={(_, info) => {
                  if (info.offset.x > 160) {
                    animate(dragX, 0, { duration: 0.3 });
                    setPossum(true);
                  } else {
                    animate(dragX, 0, { type: "spring", stiffness: 300, damping: 25 });
                  }
                }}
                whileTap={{ scale: 0.95 }}
                className="relative z-20 bg-white border-4 border-black rounded-xl w-14 h-14 flex items-center justify-center cursor-grab active:cursor-grabbing shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                <ChevronsRight size={24} className="text-[#EF476F]" strokeWidth={3} />
              </motion.div>
            )}
            <div className={`flex-1 text-center ${possum ? "py-3" : "pr-8"}`}>
              <p className="text-white font-black text-xs uppercase tracking-widest leading-tight">
                {possum ? "🦝 POSSUM PROTOCOL ACTIVE" : "SWIPE TO SURVIVE"}
              </p>
              <p className="text-white/70 font-bold text-[10px] uppercase tracking-wider">
                {possum ? "Emergency broadcast sent" : "(Possum Protocol)"}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Utility Styles */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}