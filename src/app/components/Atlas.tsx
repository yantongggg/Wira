import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Search, Wind, Mountain, TriangleAlert, Droplets, Flame, Sun, X, CheckCircle2, Shield, ZoomIn, ZoomOut, Waves, CloudRain, Activity, AlertCircle } from "lucide-react";

// Placeholder - using a solid color background since Figma asset is unavailable
const aseanMapImage = "";

// Inline SVG map of Southeast Asia (stylized, Neo-Brutalism)
const AseanMapSVG = () => (
  <svg viewBox="0 0 1600 1200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Ocean waves doodle pattern */}
    <defs>
      <pattern id="waves" x="0" y="0" width="120" height="40" patternUnits="userSpaceOnUse">
        <path d="M0 20 Q15 5 30 20 Q45 35 60 20 Q75 5 90 20 Q105 35 120 20" stroke="#93C5FD" strokeWidth="2" fill="none" opacity="0.4"/>
      </pattern>
    </defs>
    <rect width="1600" height="1200" fill="#DBEAFE" />
    <rect width="1600" height="1200" fill="url(#waves)" />

    {/* Doodle clouds */}
    <g opacity="0.35">
      <ellipse cx="200" cy="80" rx="60" ry="25" fill="white" stroke="#94A3B8" strokeWidth="2"/>
      <ellipse cx="170" cy="70" rx="40" ry="20" fill="white" stroke="#94A3B8" strokeWidth="2"/>
      <ellipse cx="240" cy="75" rx="35" ry="18" fill="white" stroke="#94A3B8" strokeWidth="2"/>
      <ellipse cx="900" cy="120" rx="55" ry="22" fill="white" stroke="#94A3B8" strokeWidth="2"/>
      <ellipse cx="870" cy="110" rx="38" ry="18" fill="white" stroke="#94A3B8" strokeWidth="2"/>
      <ellipse cx="1350" cy="60" rx="50" ry="20" fill="white" stroke="#94A3B8" strokeWidth="2"/>
      <ellipse cx="1320" cy="52" rx="35" ry="16" fill="white" stroke="#94A3B8" strokeWidth="2"/>
    </g>

    {/* Myanmar */}
    <path d="M280 250 L320 220 L360 230 L380 280 L370 340 L350 400 L330 440 L300 420 L280 370 L260 320 Z"
      fill="#FDE68A" stroke="black" strokeWidth="5" strokeLinejoin="round" />
    <text x="310" y="330" textAnchor="middle" fontWeight="900" fontSize="16" fill="#1E293B" fontFamily="sans-serif">Myanmar</text>

    {/* Laos */}
    <path d="M460 280 L500 260 L530 290 L520 350 L500 400 L470 380 L450 330 Z"
      fill="#D9F99D" stroke="black" strokeWidth="5" strokeLinejoin="round" />
    <text x="490" y="340" textAnchor="middle" fontWeight="900" fontSize="14" fill="#1E293B" fontFamily="sans-serif">Laos</text>

    {/* Thailand */}
    <path d="M380 380 L430 340 L460 360 L470 420 L460 480 L440 530 L410 560 L380 540 L370 480 L360 430 Z"
      fill="#BBF7D0" stroke="black" strokeWidth="5" strokeLinejoin="round" />
    <text x="415" y="460" textAnchor="middle" fontWeight="900" fontSize="16" fill="#1E293B" fontFamily="sans-serif">Thailand</text>

    {/* Vietnam */}
    <path d="M540 260 L580 240 L600 280 L610 340 L630 400 L640 460 L630 520 L600 560 L570 540 L550 480 L530 420 L520 360 Z"
      fill="#FECACA" stroke="black" strokeWidth="5" strokeLinejoin="round" />
    <text x="580" y="400" textAnchor="middle" fontWeight="900" fontSize="14" fill="#1E293B" fontFamily="sans-serif">Vietnam</text>

    {/* Cambodia */}
    <path d="M480 480 L530 460 L560 490 L550 540 L510 560 L470 530 Z"
      fill="#E9D5FF" stroke="black" strokeWidth="5" strokeLinejoin="round" />
    <text x="515" y="510" textAnchor="middle" fontWeight="900" fontSize="13" fill="#1E293B" fontFamily="sans-serif">Cambodia</text>

    {/* Malaysia (Peninsula) */}
    <path d="M420 600 L450 580 L470 610 L460 680 L440 740 L420 720 L400 660 Z"
      fill="#BFDBFE" stroke="black" strokeWidth="5" strokeLinejoin="round" />
    <text x="435" y="670" textAnchor="middle" fontWeight="900" fontSize="12" fill="#1E293B" fontFamily="sans-serif">Malaysia</text>

    {/* Singapore */}
    <circle cx="450" cy="780" r="14" fill="#FCA5A5" stroke="black" strokeWidth="4" />
    <text x="450" y="810" textAnchor="middle" fontWeight="900" fontSize="11" fill="#1E293B" fontFamily="sans-serif">SG</text>

    {/* Brunei */}
    <circle cx="700" cy="620" r="14" fill="#A7F3D0" stroke="black" strokeWidth="4" />
    <text x="700" y="650" textAnchor="middle" fontWeight="900" fontSize="11" fill="#1E293B" fontFamily="sans-serif">Brunei</text>

    {/* Malaysia (Borneo - Sabah & Sarawak) */}
    <path d="M620 600 L700 580 L780 590 L800 630 L780 670 L720 680 L660 670 L620 640 Z"
      fill="#BFDBFE" stroke="black" strokeWidth="5" strokeLinejoin="round" />
    <text x="710" y="700" textAnchor="middle" fontWeight="900" fontSize="12" fill="#1E293B" fontFamily="sans-serif">Borneo</text>

    {/* Indonesia (Sumatra) */}
    <path d="M300 700 L350 660 L380 700 L370 780 L340 850 L300 870 L270 830 L260 770 Z"
      fill="#FED7AA" stroke="black" strokeWidth="5" strokeLinejoin="round" />

    {/* Indonesia (Java) */}
    <path d="M500 880 L580 870 L660 880 L720 890 L700 920 L600 930 L500 920 Z"
      fill="#FED7AA" stroke="black" strokeWidth="5" strokeLinejoin="round" />

    {/* Indonesia (Kalimantan) */}
    <path d="M620 700 L700 690 L780 710 L800 760 L770 810 L700 820 L640 800 L610 750 Z"
      fill="#FED7AA" stroke="black" strokeWidth="5" strokeLinejoin="round" />

    {/* Indonesia (Sulawesi) */}
    <path d="M830 720 L860 700 L880 730 L870 790 L850 810 L830 780 Z"
      fill="#FED7AA" stroke="black" strokeWidth="5" strokeLinejoin="round" />

    {/* Indonesia (Papua) */}
    <path d="M1000 750 L1080 730 L1140 750 L1130 800 L1060 820 L1000 800 Z"
      fill="#FED7AA" stroke="black" strokeWidth="5" strokeLinejoin="round" />

    <text x="700" y="960" textAnchor="middle" fontWeight="900" fontSize="18" fill="#1E293B" fontFamily="sans-serif">Indonesia</text>

    {/* Philippines */}
    <path d="M820 280 L850 260 L870 300 L860 360 L840 400 L820 380 L810 320 Z"
      fill="#C4B5FD" stroke="black" strokeWidth="5" strokeLinejoin="round" />
    <path d="M830 420 L860 410 L870 450 L850 480 L830 460 Z"
      fill="#C4B5FD" stroke="black" strokeWidth="5" strokeLinejoin="round" />
    <path d="M800 440 L820 430 L830 460 L810 490 L790 470 Z"
      fill="#C4B5FD" stroke="black" strokeWidth="5" strokeLinejoin="round" />
    <text x="870" y="350" textAnchor="middle" fontWeight="900" fontSize="14" fill="#1E293B" fontFamily="sans-serif">Philippines</text>

    {/* Decorative wave doodles at edges */}
    <g opacity="0.3" stroke="#60A5FA" strokeWidth="2" fill="none">
      <path d="M50 950 Q80 935 110 950 Q140 965 170 950 Q200 935 230 950"/>
      <path d="M1300 200 Q1330 185 1360 200 Q1390 215 1420 200 Q1450 185 1480 200"/>
      <path d="M100 400 Q130 385 160 400 Q190 415 220 400"/>
      <path d="M1200 850 Q1230 835 1260 850 Q1290 865 1320 850"/>
    </g>

    {/* Compass rose */}
    <g transform="translate(1400, 950)">
      <circle r="40" fill="white" stroke="black" strokeWidth="4" />
      <polygon points="0,-32 6,-8 0,-14 -6,-8" fill="black" />
      <polygon points="0,32 6,8 0,14 -6,8" fill="#94A3B8" />
      <polygon points="-32,0 -8,-6 -14,0 -8,6" fill="#94A3B8" />
      <polygon points="32,0 8,-6 14,0 8,6" fill="#94A3B8" />
      <text y="-36" textAnchor="middle" fontWeight="900" fontSize="14" fill="black" fontFamily="sans-serif">N</text>
    </g>
  </svg>
);

export function Atlas() {
  const [selectedDisaster, setSelectedDisaster] = useState<any>(null);
  const [mapScale, setMapScale] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => setMapScale(s => Math.min(s + 0.3, 2.5));
  const handleZoomOut = () => setMapScale(s => Math.max(s - 0.3, 0.5));

  const openDisaster = (d: any) => {
    setSelectedDisaster(d);
    setSearchQuery(""); // Clear search when opening
    setShowSuggestions(false);
  };

  // Matrix Markers (10 ASEAN Countries)
  const markers = [
    { 
      id: "ph", 
      type: "typhoon", 
      country: "Philippines", 
      icon: Wind, 
      color: "#4CC9F0", 
      top: "30%", 
      left: "78%",
      flag: "🇵🇭",
      profile: "Extremely high disaster risk. Located in the Pacific typhoon belt, volcanic arc, earthquake faults, and mountainous islands prone to landslides.",
      history: ["Super Typhoon Haiyan (2013): 6,300+ deaths, 4M displaced.", "Mount Pinatubo Eruption (1991): 800+ deaths."],
      pattern: ["Super typhoons", "Storm surges", "Flooding", "Volcanic eruptions"],
      forecast: "Climate models predict stronger typhoons, heavier rainfall, and larger storm surges."
    },
    { 
      id: "id", 
      type: "volcano", 
      country: "Indonesia", 
      icon: TriangleAlert, 
      color: "#EF476F", 
      top: "80%", 
      left: "50%",
      flag: "🇮🇩",
      profile: "One of the most geologically active countries. Located along the Pacific Ring of Fire with 130+ active volcanoes.",
      history: ["2004 Indian Ocean Tsunami: 170,000+ deaths in Indonesia alone.", "Mount Merapi Eruption (2010): 350+ deaths.", "2025 Sumatra Flood: 1,000+ deaths."],
      pattern: ["Volcanic eruptions", "Earthquakes", "Monsoon flooding", "Tsunamis"],
      forecast: "Climate change increases extreme rainfall, landslides, and coastal flooding."
    },
    { 
      id: "my", 
      type: "flood", 
      country: "Malaysia", 
      icon: Droplets, 
      color: "#4682B4", 
      top: "54%", 
      left: "37%",
      flag: "🇲🇾",
      profile: "Mainly faces hydrological disasters. High exposure to monsoon flooding, landslides, and coastal storms.",
      history: ["2021–2022 Floods: 54 deaths, massive damages in Selangor & KL.", "2025 Cyclonic Storm Senyar: Rare cyclone caused major flooding."],
      pattern: ["Flash floods", "Monsoon floods", "Urban flooding", "Landslides"],
      forecast: "Projections indicate heavier monsoon rainfall, stronger coastal storms, and increased urban flash floods."
    },
    { 
      id: "th", 
      type: "flood", 
      country: "Thailand", 
      icon: Waves, 
      color: "#06D6A0", 
      top: "38%", 
      left: "28%",
      flag: "🇹🇭",
      profile: "Faces mainly monsoon floods, droughts, and tropical storms. Large rivers increase widespread flood risk.",
      history: ["2011 Mega Flood: 815 deaths, $46B damage. Bangkok almost completely flooded.", "2016–2017 Southern Floods: Affected 1.8M people."],
      pattern: ["Seasonal flooding", "Drought in northeast", "Tropical storms"],
      forecast: "Major concern: Bangkok sinking. Sea-level rise, river flooding, and urban drainage failure."
    },
    { 
      id: "vn", 
      type: "typhoon", 
      country: "Vietnam", 
      icon: CloudRain, 
      color: "#118AB2", 
      top: "28%", 
      left: "52%",
      flag: "🇻🇳",
      profile: "One of the highest typhoon exposure levels in Asia. High risk of coastal and river flooding.",
      history: ["1964 Central Vietnam Floods: 7,000 deaths.", "2025 Typhoon Season: Several storms caused severe flooding."],
      pattern: ["Typhoons", "Flooding", "Landslides"],
      forecast: "Major issue: Mekong Delta sinking. Predictions suggest up to 54% of delta below sea level by 2100."
    },
    { 
      id: "mm", 
      type: "cyclone", 
      country: "Myanmar", 
      icon: Activity, 
      color: "#FFD166", 
      top: "28%", 
      left: "18%",
      flag: "🇲🇲",
      profile: "Highly vulnerable to cyclones, earthquakes, landslides, and monsoon flooding.",
      history: ["Cyclone Nargis (2008): 138,000 deaths, millions displaced.", "2025 Earthquake: Magnitude 7.7 widespread damage.", "Cyclone Komen (2015): 1.7M displaced."],
      pattern: ["Cyclones", "Earthquakes", "Landslides", "Monsoon flooding"],
      forecast: "Climate models show stronger cyclones, increased coastal flooding, and landslides."
    },
    { 
      id: "sg", 
      type: "heat", 
      country: "Singapore", 
      icon: Sun, 
      color: "#FF9F1C", 
      top: "68%", 
      left: "34%",
      flag: "🇸🇬",
      profile: "Has fewer disasters but faces increasing urban climate risks like heat waves and flash floods.",
      history: ["2010 Orchard Road Flood: Urban drainage failure caused major city flooding."],
      pattern: ["Heat waves", "Flash floods", "Sea level rise"],
      forecast: "Key concern: Sea level rise. Coastal flooding and extreme heat days are increasing."
    },
    { 
      id: "kh", 
      type: "flood", 
      country: "Cambodia", 
      icon: Droplets, 
      color: "#073B4C", 
      top: "42%", 
      left: "44%",
      flag: "🇰🇭",
      profile: "Disasters are heavily linked to the Mekong River system, leading to alternating flood and drought cycles.",
      history: ["Mekong Floods (2000): 347 deaths, huge agricultural losses."],
      pattern: ["Seasonal flooding", "Droughts"],
      forecast: "Climate projections indicate extreme Mekong floods and severe droughts."
    },
    { 
      id: "la", 
      type: "flood", 
      country: "Laos", 
      icon: Mountain, 
      color: "#8B5A2B", 
      top: "30%", 
      left: "40%",
      flag: "🇱🇦",
      profile: "A mountainous country facing significant risks from river flooding, landslides, and dam failures.",
      history: ["2018 Xe-Pian Xe-Namnoy Dam Collapse: Hundreds dead, thousands displaced."],
      pattern: ["River flooding", "Landslides", "Dam failures"],
      forecast: "Major threats include stronger monsoon floods and landslides."
    },
    { 
      id: "bn", 
      type: "storm", 
      country: "Brunei", 
      icon: Shield, 
      color: "#06D6A0", 
      top: "58%", 
      left: "52%",
      flag: "🇧🇳",
      profile: "Lowest disaster exposure in ASEAN, with minimal displacement numbers.",
      history: ["Generally stable with the lowest disaster displacement numbers in Southeast Asia."],
      pattern: ["Flooding", "Storms"],
      forecast: "Potential future hazards include coastal flooding and stronger monsoon storms."
    }
  ];

  return (
    <div className="h-full flex flex-col relative overflow-hidden font-sans bg-[#E6F4F1]">
      
      {/* Wave Background Pattern (CSS pseudo-elements below) */}
      <div className="absolute inset-0 ocean-waves opacity-20 pointer-events-none z-0" />

      {/* Top Navigation (Z-Index 2) */}
      <div className="absolute top-0 left-0 w-full p-6 z-20 pointer-events-none flex flex-col gap-4">
        
        {/* Search Bar & Radar Toggle */}
        <div className="flex justify-between items-center gap-4 pointer-events-auto">
          <div className="flex-1 bg-white border-[4px] border-black rounded-full px-5 py-3 flex items-center gap-3 shadow-[4px_4px_0px_rgba(0,0,0,1)] relative">
            <Search size={20} className="text-slate-400" />
            <input 
              type="text" 
              placeholder="Where do you want to explore?"
              className="bg-transparent border-none outline-none w-full font-bold text-slate-700 placeholder:text-slate-400 text-sm"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setShowSuggestions(true); }}
              onFocus={() => setShowSuggestions(true)}
            />
            
            {/* Search Suggestions Dropdown */}
            <AnimatePresence>
              {showSuggestions && searchQuery.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-[calc(100%+8px)] left-0 w-full bg-white border-[4px] border-black rounded-2xl shadow-[6px_6px_0px_rgba(0,0,0,1)] overflow-hidden z-50"
                >
                  {markers
                    .filter(m => m.country.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map(m => (
                      <button
                        key={m.id}
                        onClick={() => openDisaster(m)}
                        className="w-full px-5 py-3 flex items-center gap-3 hover:bg-slate-100 transition-colors text-left border-b border-slate-200 last:border-0"
                      >
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center border-2 border-black shrink-0"
                          style={{ backgroundColor: m.color + '20', borderColor: m.color }}
                        >
                          <m.icon size={18} color={m.color} strokeWidth={2.5} />
                        </div>
                        <div className="flex-1">
                          <p className="font-black text-slate-800 text-sm">{m.country}</p>
                          <p className="text-xs text-slate-500 font-bold capitalize">{m.type} risk</p>
                        </div>
                        <span className="text-lg">{m.flag}</span>
                      </button>
                    ))}
                  {markers.filter(m => m.country.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                    <div className="px-5 py-4 text-center text-slate-500 font-bold text-sm">
                      No countries found
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Base Layer (Z-Index 0) */}
      <div className={`flex-1 relative overflow-hidden transition-all duration-700 ${selectedDisaster ? 'bg-[#1A2639]' : 'bg-[#E6F4F1]'}`} ref={mapRef}>
        
        {/* Map Focus Overlay */}
        <div className={`absolute inset-0 bg-black transition-opacity duration-500 z-[5] pointer-events-none ${selectedDisaster ? 'opacity-20' : 'opacity-0'}`} />
        
        {/* Zoom Controls */}
        <div className="absolute bottom-24 right-6 z-20 flex flex-col gap-2">
          <button 
            onClick={handleZoomIn}
            className="w-12 h-12 bg-white rounded-full border-[3px] border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] flex items-center justify-center active:translate-y-1 active:shadow-none transition-all"
          >
            <ZoomIn size={24} strokeWidth={2.5} className="text-slate-800" />
          </button>
          <button 
            onClick={handleZoomOut}
            className="w-12 h-12 bg-white rounded-full border-[3px] border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] flex items-center justify-center active:translate-y-1 active:shadow-none transition-all"
          >
            <ZoomOut size={24} strokeWidth={2.5} className="text-slate-800" />
          </button>
        </div>

        <motion.div
          className="absolute origin-center"
          style={{
            width: 1600,
            height: 1200,
            top: '50%',
            left: '50%',
            marginTop: -600,
            marginLeft: -800,
            backgroundImage: aseanMapImage ? `url(${aseanMapImage})` : undefined,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
          }}
          animate={{ scale: mapScale }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          drag={!selectedDisaster}
          dragConstraints={mapRef}
          whileTap={{ cursor: selectedDisaster ? 'default' : 'grabbing' }}
        >
          
          {/* SVG Map Background */}
          {!aseanMapImage && (
            <div className="absolute inset-0 z-0">
              <AseanMapSVG />
            </div>
          )}

          {/* Disaster Markers (Z-Index 1) */}
          <AnimatePresence>
            {!selectedDisaster && markers.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => openDisaster(m)}
                className="absolute z-[10] cursor-pointer -translate-x-1/2 -translate-y-1/2"
                style={{ top: m.top, left: m.left }}
              >
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="relative group"
                >
                  <div className={`w-16 h-16 rounded-[1.5rem] border-[4px] border-black flex items-center justify-center shadow-[4px_4px_0px_rgba(0,0,0,1)] bg-white relative z-10`}>
                    <m.icon size={36} color={m.color} strokeWidth={2.5} />
                    {/* Cute faces for specific icons could be added via SVG, but sticking to standard icons for now */}
                  </div>
                  
                  {/* Country Label */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white border-[3px] border-black px-3 py-1 rounded-full shadow-[2px_2px_0px_rgba(0,0,0,1)] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none">
                    <span className="text-[10px] font-black uppercase">{m.country}</span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>

        </motion.div>
      </div>

      {/* History Capsule Modal (Z-Index 3) */}
      <AnimatePresence>
        {selectedDisaster && (
          <>
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute bottom-0 left-0 w-full h-[65%] bg-white rounded-t-[32px] border-t-[4px] border-black shadow-[0_-10px_40px_rgba(0,0,0,0.2)] z-[50] p-6 flex flex-col"
            >
              {/* Handle */}
              <div className="w-16 h-2 bg-slate-200 rounded-full mx-auto mb-6 shrink-0" />
              
              <button 
                onClick={() => { setSelectedDisaster(null); }}
                className="absolute top-6 right-6 w-10 h-10 bg-white border-2 border-slate-200 text-slate-500 rounded-full flex items-center justify-center hover:bg-slate-50 transition-colors z-10"
              >
                <X size={20} strokeWidth={3} />
              </button>
              
              <div className="overflow-y-auto hide-scrollbar flex-1 pb-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-[3px] border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] bg-white`} style={{ borderColor: selectedDisaster.color }}>
                    <selectedDisaster.icon size={28} color={selectedDisaster.color} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-slate-800 leading-none">
                      {selectedDisaster.country} <span className="text-2xl">{selectedDisaster.flag}</span>
                    </h2>
                    <p className="text-slate-500 font-bold uppercase tracking-wider text-xs mt-1">Geographic Risk Profile</p>
                  </div>
                </div>
                
                {/* Risk Profile Card */}
                <div className="bg-slate-50 border-[3px] border-black rounded-2xl p-5 shadow-[4px_4px_0px_rgba(0,0,0,1)] mb-6">
                  <p className="text-lg font-bold text-slate-700 leading-snug">
                    {selectedDisaster.profile}
                  </p>
                </div>

                {/* Common Patterns */}
                <div className="mb-6">
                  <h3 className="text-lg font-black flex items-center gap-2 mb-3">
                    <Activity size={20} className="text-red-500" strokeWidth={3} /> Current Disaster Patterns
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedDisaster.pattern.map((p: string, i: number) => (
                      <span key={i} className="bg-red-100 border-[2px] border-red-500 text-red-700 font-bold px-3 py-1 rounded-full text-sm shadow-[2px_2px_0px_rgba(239,68,68,1)]">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Major Historical Disasters */}
                <div className="mb-6">
                  <h3 className="text-lg font-black flex items-center gap-2 mb-3">
                    <AlertCircle size={20} className="text-orange-500" strokeWidth={3} /> Major Historical Disasters
                  </h3>
                  <div className="space-y-3">
                    {selectedDisaster.history.map((h: string, i: number) => {
                      const [title, desc] = h.split(':');
                      return (
                        <div key={i} className="bg-white border-[2px] border-slate-300 rounded-xl p-3 shadow-[2px_2px_0px_rgba(0,0,0,0.1)]">
                          <span className="font-black text-slate-800 block">{title}</span>
                          {desc && <span className="font-medium text-slate-600 text-sm">{desc.trim()}</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Future Forecast */}
                <div className="mb-6 bg-[#E6F4F1] border-[3px] border-black rounded-2xl p-4 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                  <h3 className="text-lg font-black flex items-center gap-2 mb-2 text-[#073B4C]">
                    <Search size={20} strokeWidth={3} /> Future Forecast Risks
                  </h3>
                  <p className="font-bold text-slate-700 text-sm leading-relaxed">
                    {selectedDisaster.forecast}
                  </p>
                </div>

              </div>
            </motion.div>
            
            {/* Click-away backdrop */}
            <div 
              className="absolute inset-0 z-[40]" 
              onClick={() => { setSelectedDisaster(null); }} 
            />
          </>
        )}
      </AnimatePresence>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .ocean-waves {
          background-image: radial-gradient(circle at 10px -5px, transparent 12px, #E6F4F1 13px), 
                            radial-gradient(circle at 10px 15px, #E6F4F1 12px, transparent 13px);
          background-size: 20px 20px;
          background-color: #89CFF0;
        }
        .route-ants {
          animation: march 1s linear infinite;
        }
        @keyframes march {
          from { stroke-dashoffset: 32; }
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}