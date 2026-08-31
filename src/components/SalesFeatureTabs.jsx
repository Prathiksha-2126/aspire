import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const imageMap = {
  "Lead Management": "/images/Lead Management Features Section of AspiRe Sales.png",
  "Booking Management": "/images/Booking Management Features of AspiRE Sales.png",
  "Document Automation": "/images/Document Automation Features of AspiRE Sales.png",
  "Reports & Analytics": "/images/Reports & Analytics Features of AspiRE Sales.png",
};

const getImageForTab = (label) => imageMap[label] || null;

export default function SalesFeatureTabs({ tabs }) {
  const EXTENDED = [...tabs, ...tabs, ...tabs];
  const [virtualActive, setVirtualActive] = useState(tabs.length);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const active = ((virtualActive % tabs.length) + tabs.length) % tabs.length;
  const current = tabs[active];
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const itemWidth = 76;

  useEffect(() => {
    const update = () => {
      if (containerRef.current) setContainerWidth(containerRef.current.clientWidth);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isPaused) {
        setDirection(1);
        setVirtualActive((prev) => prev + 1);
      }
    }, 3000);
    return () => clearInterval(timer);
  }, [tabs.length, isPaused]);

  useEffect(() => {
    if (virtualActive >= tabs.length * 2) {
      const t = setTimeout(() => {
        setIsJumping(true);
        setVirtualActive(tabs.length);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setIsJumping(false));
        });
      }, 550);
      return () => clearTimeout(t);
    }
    if (virtualActive < tabs.length) {
      const t = setTimeout(() => {
        setIsJumping(true);
        setVirtualActive(tabs.length * 2 - 1);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setIsJumping(false));
        });
      }, 550);
      return () => clearTimeout(t);
    }
  }, [virtualActive, tabs.length]);

  const go = (logicalIndex) => {
    const curLogical = ((virtualActive % tabs.length) + tabs.length) % tabs.length;
    if (logicalIndex === curLogical) return;
    let delta = logicalIndex - curLogical;
    if (delta > tabs.length / 2) delta -= tabs.length;
    if (delta < -tabs.length / 2) delta += tabs.length;
    setDirection(delta > 0 ? 1 : -1);
    setVirtualActive((prev) => prev + delta);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  };
  const handlePrev = () => {
    setDirection(-1);
    setVirtualActive((prev) => prev - 1);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  };
  const handleNext = () => {
    setDirection(1);
    setVirtualActive((prev) => prev + 1);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  };

  const textVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.8, ease: [0.7, 0, 0.84, 0] } },
  };

  const wheelVariants = {
    hidden: (dir) => ({ rotate: dir > 0 ? 35 : -35 }),
    visible: { rotate: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
    exit: (dir) => ({ rotate: dir > 0 ? -35 : 35, transition: { duration: 0.8, ease: [0.7, 0, 0.84, 0] } }),
  };

  const tabImg = getImageForTab(current.label);

  return (
    <section id="features" className="relative overflow-hidden bg-[#F9F8F5] flex flex-col vector-on-offwhite pt-0 md:pt-12">

      {/* MOBILE - fits screen, heading larger, image+green same transition as desktop, bubbles chain loop slide */}
      <div className="md:hidden bg-[#F9F8F5] flex flex-col min-h-[100svh]">
        {/* Header - spacing and hierarchy */}
        <div className="px-6 pt-32 pb-4 flex-shrink-0">
          <div className="flex items-center justify-center gap-2 mb-5">
            <div className="w-7 h-0.5 bg-[#2c6035]" />
            <p className="text-[12px] font-bold tracking-[0.32em] uppercase text-[#2c6035]">OUR FEATURES</p>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-[32px] sm:text-[34px] font-extrabold uppercase leading-[1.05] tracking-wide text-[#2c6035]">{current.title}</h3>
              <p className="text-[15px] leading-[1.6] text-[#6B6B6B] mt-3">{current.description}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Stage - green blob + phone + floating cards, same data as desktop */}
        <div className="relative flex-1 flex items-center justify-center px-2 py-6 min-h-[480px] sm:min-h-[520px] overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active}
              custom={direction}
              variants={wheelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-[420px] sm:max-w-[480px] flex items-center justify-center min-h-[440px] sm:min-h-[480px]"
              style={{ transformOrigin: "50% calc(100% + 400px)" }}
            >
              {/* Green blob - a bit down */}
              <div className="absolute left-1/2 top-[47%] -translate-x-1/2 w-[840px] h-[840px] sm:w-[940px] sm:h-[940px] rounded-full bg-[#2c6035] pointer-events-none" />
              {/* Phone + floating cards - a bit top */}
              <div className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 z-10 w-[392px] sm:w-[451px] flex items-center justify-center">
                {tabImg ? (
                  <img
                    src={tabImg}
                    alt={current.label}
                    className="w-full h-auto object-contain drop-shadow-2xl block"
                  />
                ) : (
                  <div className="w-full h-[320px] bg-[#2c6035] flex items-center justify-center text-white rounded-2xl">{current.label}</div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom tab row - continuously auto-advancing horizontal slider, pure translateX, no scale, seamless loop */}
        <div className="bg-white px-2 py-4 flex-shrink-0 border-t border-gray-100">
          {/* Viewport - fixed to exactly 4 item-slots wide (4×64px + 3×12px gap = 292px), centered, clipped */}
          <div className="max-w-[292px] mx-auto overflow-hidden" ref={containerRef}>
            <motion.div
              ref={trackRef}
              className="flex gap-3"
              animate={{ x: -((virtualActive - 1) * itemWidth) }}
              transition={{ duration: isJumping ? 0 : 0.5, ease: "easeInOut" }}
              style={{ willChange: "transform" }}
            >
              {EXTENDED.map((tab, i) => {
                const isAct = i === virtualActive;
                const words = tab.label.toUpperCase().split(" ");
                const twoLineLabel = words.length > 1
                  ? `${words.slice(0, -1).join(" ")}\n${words[words.length - 1]}`
                  : words[0];
                return (
                  <button
                    key={`${tab.label}-${i}`}
                    onClick={() => go(i % tabs.length)}
                    className="flex flex-col items-center flex-shrink-0 min-w-[64px]"
                  >
                    <motion.div
                      animate={{ width: isAct ? 60 : 46, height: isAct ? 60 : 46 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className={`rounded-full overflow-hidden flex items-center justify-center ${isAct ? "bg-[#2c6035]" : "bg-white border border-gray-200"}`}
                    >
                      {tab.iconImage ? (
                        <img src={tab.iconImage} alt={tab.label} className="w-full h-full object-cover" />
                      ) : tab.icon ? (
                        <span className="flex items-center justify-center text-[#2c6035] [&>svg]:text-[#2c6035]">{tab.icon}</span>
                      ) : null}
                    </motion.div>
                    <span
                      className={`mt-2 text-center leading-tight uppercase ${isAct ? "font-bold text-[#2c6035]" : "font-medium text-[#6B6B6B]"}`}
                      style={{ fontSize: "9px", maxWidth: "64px", whiteSpace: "pre-line" }}
                    >
                      {twoLineLabel}
                    </span>
                    {isAct && <div className="w-6 h-0.5 bg-[#2c6035] mt-1.5 rounded-full" />}
                  </button>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── DESKTOP layout ────────────────────────────────────────────────── */}
      <div className="hidden md:flex flex-col" style={{ minHeight: "700px" }}>
        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 w-full flex-1 flex items-center">
          <div className="grid md:grid-cols-5 gap-8 items-center w-full">
            <div className="md:col-span-2 z-20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-[#2c6035]" />
                <p className="text-xs md:text-sm font-bold tracking-widest uppercase text-[#2c6035]">OUR FEATURES</p>
              </div>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div key={active} custom={direction} initial="hidden" animate="visible" exit="exit" variants={textVariants}>
                  <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase leading-none mb-6 text-[#2c6035]">{current.title}</h3>
                  <p className="text-base md:text-lg leading-relaxed text-[#4B4A4A] max-w-[420px]">{current.description}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="md:col-span-3 relative h-[560px] flex items-center justify-end overflow-visible">
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.div
                  key={active}
                  custom={direction}
                  variants={wheelVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  style={{ transformOrigin: "calc(100% + 400px) 50%" }}
                  className="relative w-full h-full flex items-center justify-end pointer-events-none z-10 translate-x-12 md:translate-x-20"
                >
                  <div className="absolute right-[-640px] top-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full shadow-2xl pointer-events-none z-0" style={{ backgroundColor: "#2c6035" }} />
                  <div className="relative z-10 w-[660px] h-[540px] md:w-[760px] md:h-[580px] flex items-center justify-center">
                    {getImageForTab(current.label) ? (
                      <img src={getImageForTab(current.label)} alt={current.label} className="w-full h-full object-contain drop-shadow-2xl" />
                    ) : (
                      <div className="bg-gray-900 rounded-2xl p-6 aspect-[16/10] w-[450px] flex items-center justify-center text-white text-sm text-center">{current.label} mockup</div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Bottom thumb nav */}
        <div className="relative z-20 w-full bg-[#EDEDED]" style={{ boxShadow: "0 -4px 20px rgba(0,0,0,0.08)" }}>
          <div className="max-w-7xl mx-auto px-8 md:px-16 h-[120px] flex items-center justify-between">
            <motion.button onClick={handlePrev} className="flex items-center justify-center rounded-full shadow-md border border-gray-200 cursor-pointer bg-white w-[44px] h-[44px] hover:shadow-none" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <ChevronLeft size={22} className="text-[#2c6035]" strokeWidth={2.5} />
            </motion.button>
            <div className="flex items-center justify-center gap-4 md:gap-8">
              {tabs.map((tab, i) => {
                const isAct = active === i;
                const thumb = tab.iconImage || getImageForTab(tab.label);
                return (
                  <motion.button key={tab.label} onClick={() => go(i)} className="flex flex-col items-center justify-center flex-shrink-0 cursor-pointer" whileTap={{ scale: 0.95 }}>
                    <motion.div
                      className="flex items-center justify-center rounded-full overflow-hidden transition-colors duration-300"
                      style={{ backgroundColor: isAct ? "#FFFFFF" : "transparent" }}
                      animate={isAct ? { width: [56, 48, 76, 72], height: [56, 48, 76, 72], scale: [1, 0.88, 1.2, 1.15] } : { width: 56, height: 56, scale: 1 }}
                      transition={isAct ? { duration: 0.45, times: [0, 0.25, 0.75, 1], ease: "easeInOut" } : { duration: 0.3 }}
                    >
                      {thumb ? <img src={thumb} alt={tab.label} className="w-full h-full object-cover" /> : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] text-center p-1.5 font-bold text-[#2c6035]">{tab.label}</div>
                      )}
                    </motion.div>
                    <motion.span
                      className="mt-2 text-center select-none"
                      animate={{ scale: isAct ? 1.15 : 1, opacity: isAct ? 1 : 0.7, color: isAct ? "#2c6035" : "#5A5A5A" }}
                      transition={{ duration: 0.3 }}
                      style={{ fontSize: isAct ? "11px" : "10px", fontWeight: isAct ? 900 : 500, maxWidth: "85px" }}
                    >
                      {tab.label}
                    </motion.span>
                  </motion.button>
                );
              })}
            </div>
            <motion.button onClick={handleNext} className="flex items-center justify-center rounded-full shadow-md border border-gray-200 cursor-pointer bg-white w-[44px] h-[44px] hover:shadow-none" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <ChevronRight size={22} className="text-[#2c6035]" strokeWidth={2.5} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}