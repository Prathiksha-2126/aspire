import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * tabs: [{ icon: <LucideIcon />, label: "Lead Management", title, description, image, iconImage }]
 */
export default function SalesFeatureTabs({ tabs }) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const current = tabs[active];

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
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.45,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.25,
        ease: "easeIn",
      },
    },
  };

  const imageVariants = {
    hidden: (dir) => ({
      opacity: 0,
      x: dir > 0 ? 100 : -100,
      y: dir > 0 ? -40 : 40,
      rotate: dir > 0 ? 8 : -8,
    }),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
    exit: (dir) => ({
      opacity: 0,
      x: dir < 0 ? 100 : -100,
      y: dir < 0 ? -40 : 40,
      rotate: dir < 0 ? 8 : -8,
      transition: {
        duration: 0.5,
        ease: "easeIn",
      },
    }),
  };

  return (
    <section id="features" className="relative h-[703px] overflow-hidden flex items-start pt-[5px]" style={{ backgroundColor: "#F9F8F5" }}>
      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 w-full -mt-6">
        <div className="grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-2" style={{ perspective: "1200px" }}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={active}
                custom={direction}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={textVariants}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-0.5" style={{ backgroundColor: "#2C6035" }} />
                  <p className="text-sm font-bold tracking-widest uppercase" style={{ color: "#2C6035" }}>
                    OUR FEATURES
                  </p>
                </div>

                <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase leading-none mb-6" style={{ color: "#2C6035" }}>
                  {current.title}
                </h3>

                <p className="text-lg leading-relaxed" style={{ color: "#4B4A4A", maxWidth: "420px" }}>
                  {current.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="md:col-span-3 relative flex items-center justify-center pl-12">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={active}
                custom={direction}
                variants={imageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative max-w-[600px] w-full aspect-square flex items-center justify-center"
              >
                {/* Plain Green Circle Attached to Image - Left edge aligned at image center, half visible */}
                <div
                  className="absolute left-1/2 top-1/2 -translate-y-1/2 w-[700px] h-[700px] md:w-[850px] md:h-[850px] rounded-full shadow-2xl pointer-events-none z-0"
                  style={{ backgroundColor: "#164D2B" }}
                />

                {/* Feature Image Attached On Top of Circle */}
                <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden flex items-center justify-center">
                  {getImageForTab(current.label) ? (
                    <img
                      src={getImageForTab(current.label)}
                      alt={current.label}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="bg-gray-900 rounded-2xl p-6 aspect-[9/16] max-w-[280px] mx-auto flex items-center justify-center text-white text-sm text-center">
                      {current.label} mockup
                      <br />
                      (mobile/tablet screen)
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 z-20"
        style={{
          backgroundColor: "#EDEDED",
          boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="max-w-7xl mx-auto px-8 md:px-16 h-[130px] flex items-center justify-between">
          <motion.button
            onClick={handlePrev}
            className="flex items-center justify-center rounded-full shadow-lg"
            style={{
              backgroundColor: "#1a1a1a",
              width: "52px",
              height: "52px",
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={24} className="text-white" />
          </motion.button>

          <div className="flex items-center justify-center gap-3 md:gap-5">
            {tabs.map((tab, i) => {
              const isActive = active === i;
              const thumbImage = tab.iconImage || getImageForTab(tab.label);

              return (
                <motion.button
                  key={tab.label}
                  onClick={() => handleTabClick(i)}
                  className="flex flex-col items-center justify-center flex-shrink-0"
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="flex items-center justify-center rounded-full overflow-hidden shadow-md"
                    style={{
                      width: "92px",
                      height: "92px",
                      backgroundColor: "transparent",
                    }}
                    animate={{ scale: isActive ? 1.12 : 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  >
                    {thumbImage ? (
                      <img src={thumbImage} alt={tab.label} className="w-full h-full object-contain p-2" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] text-center p-2" style={{ color: "#2C6035" }}>
                        {tab.label}
                      </div>
                    )}
                  </motion.div>

                  <motion.span
                    className="mt-2 text-center font-medium"
                    style={{
                      fontSize: "10px",
                      maxWidth: "80px",
                      color: "#2C6035",
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
            className="flex items-center justify-center rounded-full shadow-lg"
            style={{
              backgroundColor: "#1a1a1a",
              width: "52px",
              height: "52px",
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={24} className="text-white" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
