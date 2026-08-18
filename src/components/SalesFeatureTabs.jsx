import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const imageMap = {
  "Lead Management": "/images/Lead Management Features Section of AspiRe Sales.png",
  "Booking Management": "/images/Booking Management Features of AspiRE Sales.png",
  "Document Automation": "/images/Document Automation Features of AspiRE Sales.png",
  "Reports Analytics": "/images/Reports & Analytics Features of AspiRE Sales.png",
};

const getImageForTab = (label) => imageMap[label] || null;

export default function SalesFeatureTabs({ tabs }) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const current = tabs[active];

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setActive((prev) => (prev === tabs.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [tabs.length]);

  const go = (index) => {
    if (index === active) return;
    setDirection(index > active ? 1 : -1);
    setActive(index);
  };
  const handlePrev = () => go(active === 0 ? tabs.length - 1 : active - 1);
  const handleNext = () => go(active === tabs.length - 1 ? 0 : active + 1);

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
    <section id="features" className="relative overflow-hidden bg-[#F9F8F5] flex flex-col vector-on-offwhite">

      {/* ── MOBILE layout ─────────────────────────────────────────────────── */}
      <div className="md:hidden flex flex-col">
        {/* Feature image */}
        <div className="relative w-full bg-[#2C6035] overflow-hidden" style={{ minHeight: "240px" }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 40 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full flex items-center justify-center p-4"
              style={{ minHeight: "240px" }}
            >
              {tabImg ? (
                <img src={tabImg} alt={current.label} className="w-full max-w-sm h-auto object-contain drop-shadow-xl" />
              ) : (
                <div className="bg-gray-900/60 rounded-2xl p-6 w-full max-w-sm flex items-center justify-center text-white text-sm text-center" style={{ minHeight: "180px" }}>
                  {current.label}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
          <button onClick={handlePrev} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/30 flex items-center justify-center text-white" aria-label="Previous">
            <ChevronLeft size={20} strokeWidth={2.5} />
          </button>
          <button onClick={handleNext} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/30 flex items-center justify-center text-white" aria-label="Next">
            <ChevronRight size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* Text content */}
        <div className="px-5 py-6 bg-[#F9F8F5]">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-0.5 bg-[#2C6035]" />
            <p className="text-[10px] font-bold tracking-widest uppercase text-[#2C6035]">OUR FEATURES</p>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-bold uppercase leading-tight mb-3 text-[#2C6035]">{current.title}</h3>
              <p className="text-sm leading-relaxed text-[#4B4A4A]">{current.description}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile thumb nav */}
        <div className="bg-[#EDEDED] px-4 py-4" style={{ boxShadow: "0 -4px 20px rgba(0,0,0,0.08)" }}>
          <div className="flex items-end gap-3 overflow-x-auto scrollbar-hide pb-1 justify-center">
            {tabs.map((tab, i) => {
              const isAct = active === i;
              const thumb = tab.iconImage || getImageForTab(tab.label);
              return (
                <button key={tab.label} onClick={() => go(i)} className="flex flex-col items-center flex-shrink-0">
                  <div
                    className="rounded-full overflow-hidden flex items-center justify-center transition-all duration-300"
                    style={{ width: isAct ? 52 : 40, height: isAct ? 52 : 40, backgroundColor: isAct ? "#FFFFFF" : "transparent" }}
                  >
                    {thumb ? <img src={thumb} alt={tab.label} className="w-full h-full object-cover" /> : (
                      <div className="w-full h-full flex items-center justify-center text-[8px] font-bold text-[#2C6035] text-center p-1">{tab.label}</div>
                    )}
                  </div>
                  <span className="mt-1 text-center leading-tight" style={{ fontSize: isAct ? "9px" : "8px", fontWeight: isAct ? 900 : 500, color: isAct ? "#2C6035" : "#5A5A5A", maxWidth: "60px" }}>
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── DESKTOP layout ────────────────────────────────────────────────── */}
      <div className="hidden md:flex flex-col" style={{ height: "700px" }}>
        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 w-full flex-1 flex items-center">
          <div className="grid md:grid-cols-5 gap-8 items-center w-full">
            <div className="md:col-span-2 z-20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-[#2C6035]" />
                <p className="text-xs md:text-sm font-bold tracking-widest uppercase text-[#2C6035]">OUR FEATURES</p>
              </div>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div key={active} custom={direction} initial="hidden" animate="visible" exit="exit" variants={textVariants}>
                  <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase leading-none mb-6 text-[#2C6035]">{current.title}</h3>
                  <p className="text-base md:text-lg leading-relaxed text-[#4B4A4A] max-w-[420px]">{current.description}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="md:col-span-3 relative h-[520px] flex items-center justify-end overflow-visible">
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
                  <div className="absolute right-[-640px] top-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full shadow-2xl pointer-events-none z-0" style={{ backgroundColor: "#2C6035" }} />
                  <div className="relative z-10 w-[580px] h-[480px] md:w-[680px] md:h-[520px] flex items-center justify-center">
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
            <motion.button onClick={handlePrev} className="flex items-center justify-center rounded-full shadow-md border border-gray-200 cursor-pointer bg-white w-[44px] h-[44px] hover:shadow-lg" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <ChevronLeft size={22} className="text-[#2C6035]" strokeWidth={2.5} />
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
                        <div className="w-full h-full flex items-center justify-center text-[10px] text-center p-1.5 font-bold text-[#2C6035]">{tab.label}</div>
                      )}
                    </motion.div>
                    <motion.span
                      className="mt-2 text-center select-none"
                      animate={{ scale: isAct ? 1.15 : 1, opacity: isAct ? 1 : 0.7, color: isAct ? "#2C6035" : "#5A5A5A" }}
                      transition={{ duration: 0.3 }}
                      style={{ fontSize: isAct ? "11px" : "10px", fontWeight: isAct ? 900 : 500, maxWidth: "85px" }}
                    >
                      {tab.label}
                    </motion.span>
                  </motion.button>
                );
              })}
            </div>
            <motion.button onClick={handleNext} className="flex items-center justify-center rounded-full shadow-md border border-gray-200 cursor-pointer bg-white w-[44px] h-[44px] hover:shadow-lg" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <ChevronRight size={22} className="text-[#2C6035]" strokeWidth={2.5} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
