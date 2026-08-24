import { useState, useEffect, useRef } from "react";
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
  const [isPaused, setIsPaused] = useState(false);
  const current = tabs[active];
  const scrollRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isPaused) {
        setDirection(1);
        setActive((prev) => (prev === tabs.length - 1 ? 0 : prev + 1));
      }
    }, 3200);
    return () => clearInterval(timer);
  }, [tabs.length, isPaused]);

  useEffect(() => {
    const el = itemRefs.current[active];
    const container = scrollRef.current;
    if (!el || !container) return;
    const rect = container.getBoundingClientRect();
    const isInView = rect.top < window.innerHeight && rect.bottom > 0;
    if (!isInView) return;
    const left = el.offsetLeft - container.clientWidth / 2 + el.clientWidth / 2;
    container.scrollTo({ left, behavior: "smooth" });
  }, [active]);

  const go = (index) => {
    if (index === active) return;
    setDirection(index > active ? 1 : -1);
    setActive(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
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
    <section id="features" className="relative overflow-hidden bg-[#F9F8F5] flex flex-col vector-on-offwhite pt-8 sm:pt-10 md:pt-12">

      {/* ── MOBILE layout — exactly as shared image ── */}
      <div className="md:hidden bg-[#F9F8F5] flex flex-col">
        <div className="px-6 pt-8 pb-2">
          <div className="flex items-center justify-center gap-2 mb-7">
            <div className="w-7 h-0.5 bg-[#2C6035]" />
            <p className="text-[11px] font-bold tracking-widest uppercase text-[#2C6035]">OUR FEATURES</p>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-[28px] font-extrabold uppercase leading-[1.05] tracking-tight text-[#1B4D2E]">{current.title}</h3>
              <p className="text-[13px] leading-[1.55] text-[#6B6B6B] mt-3 pr-2">{current.description}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative mt-4 w-full h-[460px] sm:h-[480px] overflow-hidden bg-[#F9F8F5] flex items-end justify-center pb-12">
          <div
            className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[145%] h-[62%] bg-[#2C6035] pointer-events-none"
            style={{ borderRadius: "50% 50% 0 0 / 65% 65% 0 0" }}
          />
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active}
              custom={direction}
              variants={wheelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative z-10 w-[340px] max-w-[90%] flex items-center justify-center -translate-y-6"
            >
              {tabImg ? (
                <img
                  src={tabImg}
                  alt={current.label}
                  className="w-full h-[430px] sm:h-[450px] object-contain drop-shadow-2xl block"
                  style={{ maxHeight: "450px" }}
                />
              ) : (
                <div className="w-full h-[300px] bg-[#2C6035] flex items-center justify-center text-white">{current.label}</div>
              )}
            </motion.div>
          </AnimatePresence>
          <button
            onClick={handlePrev}
            aria-label="Previous feature"
            className="absolute left-3 bottom-3 z-20 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md border border-gray-100"
          >
            <ChevronLeft size={16} className="text-[#2C6035]" strokeWidth={2.5} />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next feature"
            className="absolute right-3 bottom-3 z-20 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md border border-gray-100"
          >
            <ChevronRight size={16} className="text-[#2C6035]" strokeWidth={2.5} />
          </button>
        </div>

        <div className="bg-white px-3 py-5">
          <div ref={scrollRef} className="flex items-end justify-between gap-1 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory px-1">
            {tabs.map((tab, i) => {
              const isAct = active === i;
              return (
                <motion.button
                  key={tab.label}
                  ref={(el) => (itemRefs.current[i] = el)}
                  onClick={() => go(i)}
                  className="flex flex-col items-center flex-shrink-0 flex-1 min-w-[64px] snap-center"
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    animate={isAct ? { width: 60, height: 60 } : { width: 46, height: 46 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className={`rounded-full flex items-center justify-center ${isAct ? "shadow-lg ring-2 ring-[#2C6035]/20" : "shadow-sm"}`}
                    style={{ backgroundColor: "#2C6035" }}
                  >
                    <motion.span
                      animate={isAct ? { scale: [1, 1.12, 1.06] } : { scale: 1 }}
                      transition={isAct ? { duration: 0.6, ease: "easeOut", times: [0, 0.5, 1] } : { duration: 0.3 }}
                      className="text-white flex items-center justify-center"
                    >
                      {tab.icon ? (
                        <span className="[&>svg]:w-5 [&>svg]:h-5 [&>svg]:text-white">{tab.icon}</span>
                      ) : tab.iconImage ? (
                        <img src={tab.iconImage} alt={tab.label} className="w-5 h-5 object-contain brightness-0 invert" />
                      ) : null}
                    </motion.span>
                  </motion.div>
                  <motion.span
                    animate={{ scale: isAct ? 1.06 : 1, opacity: isAct ? 1 : 0.75 }}
                    transition={{ duration: 0.35 }}
                    className={`mt-2 text-center leading-tight uppercase ${isAct ? "font-bold text-[#2C6035]" : "font-medium text-[#6B6B6B]"}`}
                    style={{ fontSize: "8px", maxWidth: "68px", whiteSpace: "pre-line" }}
                  >
                    {tab.label.toUpperCase()}
                  </motion.span>
                  {isAct && <motion.div layoutId="sales-mobile-active-underline" className="w-6 h-0.5 bg-[#2C6035] mt-1.5 rounded-full" />}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── DESKTOP layout ────────────────────────────────────────────────── */}
      <div className="hidden md:flex flex-col" style={{ minHeight: "700px" }}>
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
                  <div className="absolute right-[-640px] top-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full shadow-2xl pointer-events-none z-0" style={{ backgroundColor: "#2C6035" }} />
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
