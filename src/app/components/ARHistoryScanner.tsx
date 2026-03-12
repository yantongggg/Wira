import { motion } from "motion/react";
import { Droplets, Sparkles } from "lucide-react";

// Cute Mascot Component - Surprised expression
const CuteMascot = () => (
  <svg width="60" height="60" viewBox="0 0 100 100" className="drop-shadow-lg">
    <g stroke="white" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round">
      {/* Head */}
      <circle cx="50" cy="50" r="35" fill="#FFD4A3" />
      
      {/* Ears */}
      <circle cx="25" cy="30" r="12" fill="#FFD4A3" />
      <circle cx="75" cy="30" r="12" fill="#FFD4A3" />
      <circle cx="25" cy="30" r="6" fill="#FFB4A3" stroke="none" />
      <circle cx="75" cy="30" r="6" fill="#FFB4A3" stroke="none" />
      
      {/* Eyes - Surprised */}
      <circle cx="40" cy="45" r="6" fill="white" stroke="black" strokeWidth="2" />
      <circle cx="60" cy="45" r="6" fill="white" stroke="black" strokeWidth="2" />
      <circle cx="40" cy="45" r="3" fill="black" stroke="none" />
      <circle cx="60" cy="45" r="3" fill="black" stroke="none" />
      
      {/* Cheeks */}
      <circle cx="30" cy="55" r="8" fill="#FFB4C3" opacity="0.6" stroke="none" />
      <circle cx="70" cy="55" r="8" fill="#FFB4C3" opacity="0.6" stroke="none" />
      
      {/* Mouth - Surprised O */}
      <circle cx="50" cy="60" r="5" fill="#FF6B9D" stroke="black" strokeWidth="2" />
    </g>
  </svg>
);

// Cute Rain Cloud Component
const RainCloud = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay, duration: 0.6, ease: "easeOut" }}
  >
    <svg width="80" height="60" viewBox="0 0 100 80" className="drop-shadow-md">
      {/* Cloud */}
      <ellipse cx="50" cy="35" rx="35" ry="25" fill="#A8DADC" stroke="white" strokeWidth="3" />
      <ellipse cx="30" cy="40" rx="25" ry="20" fill="#A8DADC" stroke="white" strokeWidth="3" />
      <ellipse cx="70" cy="40" rx="25" ry="20" fill="#A8DADC" stroke="white" strokeWidth="3" />
      
      {/* Rain drops */}
      <motion.g
        animate={{ y: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <ellipse cx="35" cy="60" rx="3" ry="6" fill="#6EC1E4" stroke="white" strokeWidth="2" />
        <ellipse cx="50" cy="65" rx="3" ry="6" fill="#6EC1E4" stroke="white" strokeWidth="2" />
        <ellipse cx="65" cy="60" rx="3" ry="6" fill="#6EC1E4" stroke="white" strokeWidth="2" />
      </motion.g>
    </svg>
  </motion.div>
);

// Cute Wave Pattern Component
const WavePattern = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    initial={{ scaleY: 0, opacity: 0 }}
    animate={{ scaleY: 1, opacity: 1 }}
    transition={{ delay, duration: 0.8, ease: "easeOut" }}
    className="w-full"
  >
    <svg width="100%" height="60" viewBox="0 0 400 60" preserveAspectRatio="none">
      <motion.path
        d="M0,30 Q50,10 100,30 T200,30 T300,30 T400,30"
        fill="none"
        stroke="#6EC1E4"
        strokeWidth="6"
        strokeLinecap="round"
        animate={{ d: [
          "M0,30 Q50,10 100,30 T200,30 T300,30 T400,30",
          "M0,30 Q50,50 100,30 T200,30 T300,30 T400,30",
          "M0,30 Q50,10 100,30 T200,30 T300,30 T400,30"
        ]}}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      />
      <motion.path
        d="M0,45 Q50,25 100,45 T200,45 T300,45 T400,45"
        fill="none"
        stroke="#A8DADC"
        strokeWidth="5"
        strokeLinecap="round"
        animate={{ d: [
          "M0,45 Q50,25 100,45 T200,45 T300,45 T400,45",
          "M0,45 Q50,65 100,45 T200,45 T300,45 T400,45",
          "M0,45 Q50,25 100,45 T200,45 T300,45 T400,45"
        ]}}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 0.3 }}
      />
    </svg>
  </motion.div>
);

export function ARHistoryScanner() {
  return (
    <div 
      className="h-full w-full relative overflow-hidden flex flex-col"
      style={{ 
        fontFamily: "'Nunito', sans-serif",
        background: "linear-gradient(180deg, #FFF5E4 0%, #FFE5D9 50%, #FFC9C9 100%)"
      }}
    >
      {/* Illustrated Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%">
          <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="2" fill="#FF6B9D" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      {/* Top Header */}
      <div className="relative z-10 pt-12 px-6 flex items-center justify-between">
        <div className="bg-white/80 backdrop-blur-sm px-5 py-2 rounded-full border-3 border-white shadow-lg">
          <p className="text-[#FF6B9D] font-black text-sm tracking-wide">📍 AR MODE</p>
        </div>
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="bg-white/80 backdrop-blur-sm p-3 rounded-full border-3 border-white shadow-lg"
        >
          <Sparkles className="text-[#FFD166]" size={24} />
        </motion.div>
      </div>

      {/* AR Viewfinder - Dashed Scanning Box */}
      <div className="relative z-20 flex-1 flex items-center justify-center px-8 py-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-full max-w-sm aspect-square"
        >
          {/* Dashed Border Box */}
          <motion.div
            animate={{ 
              rotate: [0, 2, -2, 0],
              scale: [1, 1.02, 1]
            }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="absolute inset-0 border-4 border-dashed border-[#6EC1E4] rounded-[3rem] shadow-lg"
            style={{ borderStyle: "dashed" }}
          />

          {/* Corner Decorations */}
          {[
            { top: "-12px", left: "-12px", rotate: 0 },
            { top: "-12px", right: "-12px", rotate: 90 },
            { bottom: "-12px", right: "-12px", rotate: 180 },
            { bottom: "-12px", left: "-12px", rotate: 270 }
          ].map((pos, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 + i * 0.1, type: "spring", bounce: 0.6 }}
              className="absolute w-6 h-6 bg-[#FFD166] border-3 border-white rounded-full shadow-md"
              style={pos}
            />
          ))}

          {/* Content inside scanning box */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
            {/* Rain Clouds */}
            <div className="absolute top-8 left-4">
              <RainCloud delay={0.5} />
            </div>
            <div className="absolute top-4 right-8">
              <RainCloud delay={0.7} />
            </div>

            {/* Center Text */}
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.4, type: "spring", bounce: 0.5 }}
              className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full border-3 border-[#6EC1E4] shadow-lg mb-6"
            >
              <p className="text-[#6EC1E4] font-black text-lg">🌊 Scanning...</p>
            </motion.div>

            {/* Wave Patterns */}
            <div className="absolute bottom-12 left-0 right-0">
              <WavePattern delay={0.6} />
            </div>
            <div className="absolute bottom-8 left-0 right-0">
              <WavePattern delay={0.8} />
            </div>

            {/* Water Level Indicator */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute bottom-6 right-6 flex items-center gap-2 bg-[#6EC1E4]/90 backdrop-blur-sm px-4 py-2 rounded-full border-3 border-white shadow-lg"
            >
              <Droplets size={20} className="text-white" />
              <span className="text-white font-bold text-sm">1.8m</span>
            </motion.div>
          </div>

          {/* Scanning Line Effect */}
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#6EC1E4] to-transparent opacity-50"
            style={{ top: "50%" }}
          />
        </motion.div>
      </div>

      {/* Event Card - Floating at bottom */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring", bounce: 0.4 }}
        className="relative z-30 mx-6 mb-6"
      >
        <div className="bg-white rounded-[2rem] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.15)] border-4 border-white">
          {/* Header with Mascot */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-shrink-0">
              <CuteMascot />
            </div>
            <div className="flex-1">
              <h3 className="text-[#FF6B9D] font-black text-2xl mb-1">History Found!</h3>
              <p className="text-gray-600 font-semibold text-sm">Flood 2015: The water was THIS high!</p>
            </div>
          </div>

          {/* Visual Height Indicator */}
          <div className="bg-gradient-to-r from-[#FFF5E4] to-[#FFE5D9] rounded-2xl p-4 mb-4 border-2 border-[#6EC1E4]/30">
            <div className="flex items-end justify-center gap-2 h-20">
              <div className="w-12 h-8 bg-gray-300 rounded-t-lg border-2 border-gray-400" />
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "100%" }}
                transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
                className="w-16 bg-gradient-to-t from-[#6EC1E4] to-[#A8DADC] rounded-t-2xl border-3 border-white shadow-md relative"
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#FF6B9D] text-white px-3 py-1 rounded-full text-xs font-black whitespace-nowrap">
                  1.8m!
                </div>
              </motion.div>
              <div className="w-12 h-8 bg-gray-300 rounded-t-lg border-2 border-gray-400" />
            </div>
          </div>

          {/* Action Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-4 bg-gradient-to-r from-[#FFD166] to-[#FFB84D] text-white font-black text-lg rounded-full shadow-[0_6px_0_#E89B3C] active:translate-y-1 active:shadow-[0_2px_0_#E89B3C] transition-all border-3 border-white"
          >
            🎮 Start Rescue Training
          </motion.button>
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="absolute top-32 right-8 text-4xl opacity-80"
      >
        ☁️
      </motion.div>
      <motion.div
        animate={{ 
          y: [0, 10, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-48 left-6 text-3xl opacity-80"
      >
        💧
      </motion.div>
    </div>
  );
}
