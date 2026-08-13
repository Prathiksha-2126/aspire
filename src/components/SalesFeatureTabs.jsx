import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * tabs: [{ icon: <LucideIcon />, label: "Lead Management", title, description, image, iconImage }]
 */
export default function SalesFeatureTabs({ tabs }) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const current = tabs[active];

  // 6-Second Auto-Advance Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setActive((prev) => (prev === tabs.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [tabs.length]);

  const getImageForTab = (label) => {
    const imageMap = {
      "Lead Management": "/images/Lead Management Features Section of AspiRe Sales.png",
      "Booking Management": "/images/Booking Management Features of AspiRE Sales.png",
      "Document Automation": "/images/Document Automation Features of AspiRE Sales.png",
      "Reports Analytics": "/images/Reports & Analytics Features of AspiRE Sales.png",
    };
    return imageMap[label] || null;
  };

  const handleTabClick = (index) => {
    if (index === active) return;
    setDirection(index > active ? 1 : -1);
    setActive(index);
  };

  const handlePrev = () => {
    const prevIndex = active === 0 ? tabs.length - 1 : active - 1;
    if (prevIndex !== active) {
      setDirection(-1);
      setActive(prevIndex);
    }
  };

  const handleNext = () => {
    const nextIndex = active === tabs.length - 1 ? 0 : active + 1;
    if (nextIndex !== active) {
      setDirection(1);
      setActive(nextIndex);
    }
  };

  const textVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.8,
        ease: [0.7, 0, 0.84, 0],
      },
    },
  };

  // Synchronized Wheel Rotation (Moves both circle & image on the same axis)
  const wheelVariants = {
    hidden: (dir) => ({
      rotate: dir > 0 ? 35 : -35,
    }),
    visible: {
      rotate: 0,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1], // Smooth, weighted decelerating spring
      },
    },
    exit: (dir) => ({
      rotate: dir > 0 ? -35 : 35,
      transition: {
        duration: 0.8,
        ease: [0.7, 0, 0.84, 0],
      },
    }),
  };

  return (
    <section id="features" className="relative h-[700px] overflow-hidden bg-[#F9F8F5] flex flex-col justify-between vector-on-offwhite">
      
      {/* MAIN FEATURE CONTENT AREA */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 w-full h-[580px] flex items-center">
        <div className="grid md:grid-cols-5 gap-8 items-center w-full">
          
          {/* Left Column: Title & Description */}
          <div className="md:col-span-2 z-20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-[#2C6035]" />
              <p className="text-xs md:text-sm font-bold tracking-widest uppercase text-[#2C6035]">
                OUR FEATURES
              </p>
            </div>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={active}
                custom={direction}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={textVariants}
              >
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase leading-none mb-6 text-[#2C6035]">
                  {current.title}
                </h3>

                <p className="text-base md:text-lg leading-relaxed text-[#4B4A4A] max-w-[420px]">
                  {current.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Green Circle + Image Grouped Together for Strict Sync Motion */}
          <div className="md:col-span-3 relative h-[520px] flex items-center justify-end overflow-visible">
            
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={active}
                custom={direction}
                variants={wheelVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{
                  transformOrigin: "calc(100% + 400px) 50%", // Fixed rotational center axis
                }}
                className="relative w-full h-full flex items-center justify-end pointer-events-none z-10 translate-x-12 md:translate-x-20"
              >
                {/* 1. GREEN SEMICIRCLE (Shifted further right, locked inside motion container) */}
                <div
                  className="absolute right-[-640px] top-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full shadow-2xl pointer-events-none z-0"
                  style={{ backgroundColor: "#2C6035" }}
                />

                {/* 2. FEATURE IMAGE (Attached right on top of circle edge) */}
                <div className="relative z-10 w-[580px] h-[480px] md:w-[680px] md:h-[520px] flex items-center justify-center">
                  {getImageForTab(current.label) ? (
                    <img
                      src={getImageForTab(current.label)}
                      alt={current.label}
                      className="w-full h-full object-contain drop-shadow-2xl"
                    />
                  ) : (
                    <div className="bg-gray-900 rounded-2xl p-6 aspect-[16/10] w-[450px] flex items-center justify-center text-white text-sm text-center">
                      {current.label} mockup
                    </div>
                  )}
                </div>

              </motion.div>
            </AnimatePresence>

          </div>

        </div>
      </div>

      {/* BOTTOM THUMBNAIL NAVIGATION BAR */}
      <div
        className="relative z-20 w-full bg-[#EDEDED]"
        style={{
          boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.08)",
        }}
      >
        <div className="max-w-7xl mx-auto px-8 md:px-16 h-[120px] flex items-center justify-between">
          <motion.button
            onClick={handlePrev}
            className="flex items-center justify-center rounded-full shadow-md border border-gray-200 cursor-pointer bg-white w-[44px] h-[44px] transition-shadow duration-200 hover:shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={22} className="text-[#2C6035]" strokeWidth={2.5} />
          </motion.button>

          <div className="flex items-center justify-center gap-4 md:gap-8">
            {tabs.map((tab, i) => {
              const isActive = active === i;
              const thumbImage = tab.iconImage || getImageForTab(tab.label);

              return (
                <motion.button
                  key={tab.label}
                  onClick={() => handleTabClick(i)}
                  className="flex flex-col items-center justify-center flex-shrink-0 cursor-pointer"
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="flex items-center justify-center rounded-full overflow-hidden border-none outline-none transition-colors duration-300"
                    style={{
                      backgroundColor: isActive ? "#FFFFFF" : "transparent",
                    }}
                    animate={
                      isActive
                        ? {
                            width: [56, 48, 76, 72],
                            height: [56, 48, 76, 72],
                            scale: [1, 0.88, 1.2, 1.15],
                          }
                        : {
                            width: 56,
                            height: 56,
                            scale: 1,
                          }
                    }
                    transition={
                      isActive
                        ? {
                            duration: 0.45,
                            times: [0, 0.25, 0.75, 1],
                            ease: "easeInOut",
                          }
                        : { duration: 0.3 }
                    }
                  >
                    {thumbImage ? (
                      <img src={thumbImage} alt={tab.label} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] text-center p-1.5 font-bold text-[#2C6035]">
                        {tab.label}
                      </div>
                    )}
                  </motion.div>

                  <motion.span
                    className="mt-2 text-center select-none"
                    animate={{
                      scale: isActive ? 1.15 : 1,
                      opacity: isActive ? 1 : 0.7,
                      color: isActive ? "#2C6035" : "#5A5A5A",
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                      fontSize: isActive ? "11px" : "10px",
                      fontWeight: isActive ? 900 : 500,
                      maxWidth: "85px",
                    }}
                  >
                    {tab.label}
                  </motion.span>
                </motion.button>
              );
            })}
          </div>

          <motion.button
            onClick={handleNext}
            className="flex items-center justify-center rounded-full shadow-md border border-gray-200 cursor-pointer bg-white w-[44px] h-[44px] transition-shadow duration-200 hover:shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={22} className="text-[#2C6035]" strokeWidth={2.5} />
          </motion.button>
        </div>
      </div>
    </section>
  );
}