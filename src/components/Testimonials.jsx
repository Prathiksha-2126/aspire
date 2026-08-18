import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, User } from "lucide-react";

const testimonials = [
  {
    name: "Tanmay Usgaonkar",
    role: "Partner – Maharudra Real Estate",
    rating: 5,
    quote: "An essential tool for construction management—simple to use, highly efficient, and keeps every project on track!",
    image: "/images/Tanmay Usgaonkar - Maharudra.jpeg",
  },
  {
    name: "Cedric Vaz",
    role: "Owner – EDCON Real Estate",
    rating: 4,
    quote: "Managing project activities is now faster and systematic—keeping every stage of the project efficiently on track!",
    image: null,
  },
  {
    name: "Marcus Cardoso",
    role: "Director – Ruby Realtors Goa Private Limited",
    rating: 4,
    quote: "A powerful tool for streamlining operations—improves visibility, reduces manual work, and enables better project coordination.",
    image: null,
  },
  {
    name: "Sanket Singbal",
    role: "Director – Sanvi Developers",
    rating: 5,
    quote: "It has transformed the way we manage our construction projects—streamlined, efficient, and incredibly user-friendly!",
    image: null,
  },
  {
    name: "Kabir Morajkar",
    role: "Partner – Vaastu Estate Developers",
    rating: 5,
    quote: "Simplified how we manage construction projects—keeps everything organised, improves coordination, and boosts team efficiency!",
    image: "/images/Kabir Morajkar - Vaastu.jpeg",
  },
  {
    name: "Varun Kudchadkar",
    role: "Director – JMD Group",
    rating: 4,
    quote: "Made project management more structured and efficient. It is easy to use, saves valuable time, and helps teams stay updated and productive.",
    image: "/images/Varun Kudchadkar - JMD.jpeg",
  },
];

function TestimonialAvatar({ item }) {
  const [hasError, setHasError] = useState(false);
  if (item.image && !hasError) {
    return <img src={encodeURI(item.image)} alt={item.name} className="w-full h-full object-cover rounded-full" onError={() => setHasError(true)} />;
  }
  return (
    <>
      <User size={20} className="sm:hidden" strokeWidth={1.8} />
      <User size={26} className="hidden sm:block" strokeWidth={1.8} />
    </>
  );
}

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardDimensions, setCardDimensions] = useState({ width: 310, height: 430, gap: 315 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setIsMobile(w < 640);
      if (w < 640) {
        setCardDimensions({ width: Math.min(w * 0.82, 280), height: Math.min(window.innerHeight * 0.52, 360), gap: Math.min(w * 0.68, 240) });
      } else if (w < 1024) {
        setCardDimensions({ width: 280, height: 400, gap: 275 });
      } else {
        setCardDimensions({ width: 320, height: 440, gap: 325 });
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const timer = setInterval(handleNext, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handlePrev = () => setCurrentIndex((p) => (p === 0 ? testimonials.length - 1 : p - 1));
  const handleNext = () => setCurrentIndex((p) => (p === testimonials.length - 1 ? 0 : p + 1));

  // ── MOBILE: single card swipeable ──────────────────────────────────────
  if (isMobile) {
    const item = testimonials[currentIndex];
    return (
      <motion.section
        className="relative w-full flex flex-col items-center text-white select-none overflow-hidden vector-on-green blend-to-green fade-clear-top"
        style={{ backgroundColor: "#2C6035" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center px-4 pt-4 pb-5 z-10 w-full">
          <h2 className="text-2xl font-bold font-poppins tracking-tight text-white drop-shadow-md">Testimonial</h2>
          <p className="text-xs text-white/85 mt-1 leading-snug max-w-xs mx-auto">
            Hear from our satisfied clients who have transformed their businesses with AspiRE.
          </p>
        </div>

        {/* Card */}
        <div className="px-4 pb-6 w-full flex justify-center z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 40, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -40, scale: 0.96 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="w-full max-w-[300px] rounded-2xl p-5 bg-white flex flex-col justify-between shadow-2xl"
              style={{ minHeight: "280px" }}
            >
              <div className="relative flex-1 flex flex-col justify-center text-center px-1">
                <span className="text-4xl font-serif leading-none absolute top-0 left-0 text-gray-300/80 select-none">"</span>
                <p className="font-serif text-sm leading-relaxed px-4 my-auto font-medium text-gray-900 line-clamp-5">{item.quote}</p>
                <span className="text-4xl font-serif leading-none absolute bottom-0 right-0 text-gray-300/80 select-none">"</span>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-gray-200/60 mt-3 shrink-0">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-gray-100 text-gray-700 border border-gray-300 overflow-hidden shadow-inner">
                  <TestimonialAvatar item={item} />
                </div>
                <div className="text-left flex-1 min-w-0">
                  <h4 className="font-bold text-xs leading-tight text-gray-900">{item.name}</h4>
                  <p className="text-[10px] font-normal mt-0.5 leading-snug text-gray-600 line-clamp-2">{item.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots + nav row */}
        <div className="flex items-center gap-4 pb-8 z-10">
          <button onClick={handlePrev} className="w-9 h-9 rounded-full border-2 border-white bg-black/20 flex items-center justify-center text-white" aria-label="Previous">
            <ChevronLeft size={20} strokeWidth={2.5} />
          </button>
          <div className="flex gap-1.5">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setCurrentIndex(i)}
                className={`rounded-full transition-all duration-300 ${i === currentIndex ? "w-5 h-2 bg-white" : "w-2 h-2 bg-white/40"}`}
              />
            ))}
          </div>
          <button onClick={handleNext} className="w-9 h-9 rounded-full border-2 border-white bg-black/20 flex items-center justify-center text-white" aria-label="Next">
            <ChevronRight size={20} strokeWidth={2.5} />
          </button>
        </div>
      </motion.section>
    );
  }

  // ── DESKTOP / tablet: 5-card carousel ─────────────────────────────────
  return (
    <motion.section
      className="relative w-full h-[700px] md:h-[820px] pt-16 md:pt-24 pb-12 md:pb-16 px-4 sm:px-6 overflow-hidden flex flex-col justify-between items-center text-white select-none box-border vector-on-green blend-to-green fade-clear-top"
      style={{ backgroundColor: "#2C6035" }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto z-10 px-4 mt-2 sm:mt-4 mb-2 shrink-0">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 font-poppins tracking-tight text-white drop-shadow-md">Testimonial</h2>
        <p className="text-xs sm:text-base md:text-lg font-normal text-white/90 leading-relaxed max-w-2xl mx-auto drop-shadow-sm">
          Hear from our satisfied clients who have transformed their businesses with AspiRE.
        </p>
      </div>

      {/* Carousel */}
      <div className="relative w-full max-w-[1400px] mx-auto flex items-center justify-center flex-1 my-auto overflow-hidden min-h-0 z-10">
        <button onClick={handlePrev} className="absolute left-4 sm:left-12 md:left-20 lg:left-28 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full border-2 border-white bg-black/20 hover:bg-black/40 backdrop-blur-sm flex items-center justify-center text-white transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-xl" aria-label="Previous">
          <ChevronLeft size={26} strokeWidth={2.5} stroke="white" />
        </button>
        <button onClick={handleNext} className="absolute right-4 sm:right-12 md:right-20 lg:right-28 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full border-2 border-white bg-black/20 hover:bg-black/40 backdrop-blur-sm flex items-center justify-center text-white transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-xl" aria-label="Next">
          <ChevronRight size={26} strokeWidth={2.5} stroke="white" />
        </button>

        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          {testimonials.map((item, index) => {
            const len = testimonials.length;
            let offset = (index - currentIndex) % len;
            if (offset > len / 2) offset -= len;
            if (offset < -len / 2) offset += len;
            const absOffset = Math.abs(offset);
            const isCenter = offset === 0;
            const isVisible = absOffset <= 2;

            let cardScale = 1, cardOpacity = 1, zIndexVal = 30;
            let bgClass = "bg-white text-gray-900 shadow-2xl";
            if (absOffset === 1) {
              cardScale = 0.88; cardOpacity = 0.72; zIndexVal = 20;
              bgClass = "bg-gradient-to-b from-white/95 via-white/80 to-white/60 text-gray-800 shadow-lg backdrop-blur-sm";
            } else if (absOffset === 2) {
              cardScale = 0.76; cardOpacity = 0.38; zIndexVal = 10;
              bgClass = "bg-gradient-to-b from-white/70 via-white/45 to-white/25 text-gray-700 shadow backdrop-blur-xs";
            }

            return (
              <motion.div
                key={index}
                initial={false}
                animate={{ x: offset * cardDimensions.gap, scale: cardScale, opacity: isVisible ? cardOpacity : 0, zIndex: zIndexVal, pointerEvents: isCenter ? "auto" : "none" }}
                transition={{ duration: 0.65, ease: [0.25, 1, 0.5, 1] }}
                className={`absolute rounded-2xl p-6 sm:p-8 flex flex-col justify-between shrink-0 box-border ${bgClass}`}
                style={{ width: `${cardDimensions.width}px`, height: `${cardDimensions.height}px`, maxHeight: "94%" }}
              >
                <div className="relative flex-1 flex flex-col justify-center text-center px-1 overflow-hidden">
                  <span className="text-4xl sm:text-5xl font-serif leading-none absolute top-0 left-0 text-gray-300/80 select-none">"</span>
                  <p className="font-serif text-sm sm:text-base md:text-lg leading-relaxed px-4 my-auto font-medium text-gray-900 line-clamp-6">{item.quote}</p>
                  <span className="text-4xl sm:text-5xl font-serif leading-none absolute bottom-0 right-0 text-gray-300/80 select-none">"</span>
                </div>
                <div className="flex items-center gap-3 pt-3 border-t border-gray-200/60 mt-3 shrink-0">
                  <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full flex items-center justify-center shrink-0 bg-gray-100 text-gray-700 border border-gray-300 overflow-hidden shadow-inner">
                    <TestimonialAvatar item={item} />
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-gray-400 font-bold shrink-0">—</span>
                      <h4 className="font-bold text-xs sm:text-sm md:text-base leading-tight text-gray-900 break-words">{item.name}</h4>
                    </div>
                    <p className="text-[11px] sm:text-xs font-normal mt-0.5 leading-snug text-gray-600 line-clamp-2 break-words">{item.role}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
