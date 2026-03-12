import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Battery, BatteryMedium, BatteryWarning, Flashlight, Radio, Mic, MapPin, Share2, TriangleAlert, Zap, Signal, WifiOff, RefreshCcw } from "lucide-react";

export function PossumProtocol() {
  const [flashlightOn, setFlashlightOn] = useState(false);
  const [sosActive, setSosActive] = useState(false);
  const [listening, setListening] = useState(false);
  
  // Fake battery decline
  const [battery, setBattery] = useState(87);

  // Fake mesh nodes
  const nodes = [
    { id: 1, top: "20%", left: "30%", active: true },
    { id: 2, top: "50%", left: "70%", active: true },
    { id: 3, top: "70%", left: "20%", active: false },
    { id: 4, top: "80%", left: "60%", active: true },
  ];

  return (
    <div className="h-full flex flex-col bg-[#0A0F1A] text-slate-300 relative overflow-x-hidden font-sans">
      {/* Status Bar Top */}
      <div className="bg-[#121A2F]/80 backdrop-blur-md pt-12 pb-4 px-6 sticky top-0 z-50 border-b border-slate-800/50">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <TriangleAlert size={20} className="text-[#EF476F]" />
            <h1 className="text-white font-black tracking-widest uppercase text-sm">Possum Protocol</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-slate-800/50 px-2 py-1 rounded-md border border-slate-700">
              <Signal size={14} className="text-[#06D6A0]" />
              <span className="text-[10px] font-bold text-[#06D6A0]">MESH</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold font-mono">{battery}%</span>
              {battery > 50 ? <BatteryMedium size={18} className="text-[#06D6A0]" /> : <BatteryWarning size={18} className="text-[#FFD166]" />}
            </div>
          </div>
        </div>
        
        <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase flex items-center gap-2">
          <Zap size={10} className="text-[#FFD166]" />
          Ultra Power Saving Active
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 hide-scrollbar">
        
        {/* Core Emergency Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => setFlashlightOn(!flashlightOn)}
            className={`p-6 rounded-[2rem] border-2 flex flex-col items-center justify-center gap-4 transition-all ${flashlightOn ? 'bg-[#FFD166]/20 border-[#FFD166] text-[#FFD166]' : 'bg-[#121A2F] border-slate-800 text-slate-400'}`}
          >
            <Flashlight size={36} strokeWidth={flashlightOn ? 2.5 : 2} />
            <span className="font-bold text-sm tracking-wide">Flashlight</span>
          </button>
          
          <button 
            onClick={() => setSosActive(!sosActive)}
            className={`p-6 rounded-[2rem] border-2 flex flex-col items-center justify-center gap-4 transition-all relative overflow-hidden ${sosActive ? 'bg-[#EF476F]/20 border-[#EF476F] text-[#EF476F]' : 'bg-[#121A2F] border-slate-800 text-slate-400'}`}
          >
            {sosActive && (
              <motion.div animate={{ scale: [1, 2], opacity: [0.5, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="absolute inset-0 bg-[#EF476F] rounded-full" />
            )}
            <Radio size={36} strokeWidth={sosActive ? 2.5 : 2} className="relative z-10" />
            <span className="font-bold text-sm tracking-wide relative z-10">SOS Broadcast</span>
          </button>
        </div>

        {/* Sound Rescue Signal */}
        <div className="bg-[#121A2F] rounded-[2rem] p-6 border border-slate-800 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-32 h-32 bg-[#4CC9F0]/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div>
              <h3 className="text-white font-black text-lg mb-1">Sound Rescue Signal</h3>
              <p className="text-slate-500 text-xs font-mono">Listening for distress whistles...</p>
            </div>
            <button 
              onClick={() => setListening(!listening)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${listening ? 'bg-[#4CC9F0] text-slate-900 shadow-[0_0_20px_#4CC9F0]' : 'bg-slate-800 text-slate-400'}`}
            >
              <Mic size={20} strokeWidth={listening ? 3 : 2} />
            </button>
          </div>

          <div className="h-24 flex items-center justify-center gap-1">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                animate={listening ? { height: ["20%", `${Math.random() * 80 + 20}%`, "20%"] } : { height: "20%" }}
                transition={{ duration: 0.5 + Math.random(), repeat: Infinity, ease: "easeInOut" }}
                className={`w-2 rounded-full ${listening ? 'bg-[#4CC9F0]' : 'bg-slate-800'}`}
                style={{ height: "20%" }}
              />
            ))}
          </div>
          
          {listening && (
            <div className="mt-4 flex items-center justify-between text-[#4CC9F0] bg-[#4CC9F0]/10 px-4 py-2 rounded-lg text-xs font-mono border border-[#4CC9F0]/20">
              <span>Signal Strength</span>
              <span className="font-bold">Scanning...</span>
            </div>
          )}
        </div>

        {/* Offline Mesh Network */}
        <div className="bg-[#121A2F] rounded-[2rem] p-6 border border-slate-800">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-white font-black text-lg">Offline Mesh</h3>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
              <RefreshCcw size={12} className={sosActive ? "animate-spin" : ""} />
              Auto-sync
            </div>
          </div>
          
          <div className="h-48 bg-slate-900 rounded-[1.5rem] border border-slate-800 relative overflow-hidden mb-6">
            {/* Grid background */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at center, #06D6A0 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
            
            {/* Connection Lines (Fake) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
              <line x1="50%" y1="50%" x2="30%" y2="20%" stroke="#06D6A0" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="50%" y1="50%" x2="70%" y2="50%" stroke="#06D6A0" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="50%" y1="50%" x2="60%" y2="80%" stroke="#06D6A0" strokeWidth="2" strokeDasharray="4 4" />
            </svg>

            {/* Central Node (You) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-4 h-4 bg-[#06D6A0] rounded-full shadow-[0_0_15px_#06D6A0]" />
              <span className="text-[10px] font-mono mt-2 text-[#06D6A0]">YOU</span>
            </div>
            
            {/* Nearby Nodes */}
            {nodes.map((node) => (
              <div key={node.id} className="absolute flex flex-col items-center" style={{ top: node.top, left: node.left }}>
                <div className={`w-3 h-3 rounded-full ${node.active ? 'bg-[#4CC9F0] shadow-[0_0_10px_#4CC9F0]' : 'bg-slate-700'}`} />
                <span className="text-[8px] font-mono mt-1 text-slate-500">N-{node.id}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="bg-slate-800/50 hover:bg-slate-800 text-slate-300 font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 transition-colors border border-slate-700">
              <MapPin size={16} /> Share GPS
            </button>
            <button className="bg-slate-800/50 hover:bg-slate-800 text-slate-300 font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 transition-colors border border-slate-700">
              <Share2 size={16} /> Send Msg
            </button>
          </div>
        </div>

      </div>

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
