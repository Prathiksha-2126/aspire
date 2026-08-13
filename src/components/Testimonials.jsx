import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, User, Star } from "lucide-react";

// Updated client testimonial list with star ratings
const testimonials = [
  {
    name: "Tanmay Usgaonkar",
    role: "Partner – Maharudra Real Estate",
    rating: 5,
    quote:
      "An essential tool for construction management—simple to use, highly efficient, and keeps every project on track!",
    image: "/images/Tanmay Usgaonkar - Maharudra.jpeg",
  },
  {
    name: "Cedric Vaz",
    role: "Owner – EDCON Real Estate",
    rating: 4,
    quote:
      "Managing project activities is now faster and systematic—keeping every stage of the project efficiently on track!",
    image: null,
  },
  {
    name: "Marcus Cardoso",
    role: "Director – Ruby Realtors Goa Private Limited",
    rating: 4,
    quote:
      "A powerful tool for streamlining operations—improves visibility, reduces manual work, and enables better project coordination.",
    image: null,
  },
  {
    name: "Sanket Singbal",
    role: "Director – Sanvi Developers",
    rating: 5,
    quote:
      "It has transformed the way we manage our construction projects—streamlined, efficient, and incredibly user-friendly!",
    image: null,
  },
  {
    name: "Sunil Morajkar",
    role: "Partner – Vaastu Estate Developers",
    rating: 5,
    quote:
      "Simplified how we manage construction projects—keeps everything organised, improves coordination, and boosts team efficiency!",
    image: "/images/Kabir Morajkar - Vaastu.jpeg",
  },
  {
    name: "Varun Kudchadkar",
    role: "Director – JMD Group",
    rating: 4,
    quote:
      "Made project management more structured and efficient. It is easy to use, saves valuable time, and helps teams stay updated and productive.",
    image: "/images/Varun Kudchadkar - JMD.jpeg",
  },
];

function TestimonialAvatar({ item }) {
  const [hasError, setHasError] = useState(false);

  if (item.image && !hasError) {
    return (
      <img
        src={encodeURI(item.image)}
        alt={item.name}
        className="w-full h-full object-cover rounded-full"
        onError={() => setHasError(true)}
      />
    );
  }

  return (
    <>
      <User size={20} className="sm:hidden" strokeWidth={1.8} />
      <User size={26} className="hidden sm:block" strokeWidth={1.8} />
    </>
  );
}

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(3); // Start centered on Tanmay Usgaonkar (index 3) to match screenshot
  const [cardDimensions, setCardDimensions] = useState({ width: 310, height: 430, gap: 315 });

  // Compute responsive card dimensions for 5-card layout
  useEffect(() => {
    const updateDimensions = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (w < 640) {
        setCardDimensions({
          width: Math.min(w * 0.78, 260),
          height: Math.min(h * 0.52, 380),
          gap: Math.min(w * 0.65, 230),
        });
      } else if (w < 1024) {
        setCardDimensions({
          width: 280,
          height: 400,
          gap: 275,
        });
      } else {
        setCardDimensions({
          width: 320,
          height: 440,
          gap: 325,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateRadius => updateDimensions());
  }, []);

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <motion.section
      className="relative w-full h-[700px] md:h-[820px] pt-16 md:pt-24 pb-12 md:pb-16 px-4 sm:px-6 overflow-hidden flex flex-col justify-between items-center text-white select-none box-border vector-on-green blend-to-green fade-clear-top"
      style={{ backgroundColor: "#2C6035" }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* HEADER */}
      <div className="text-center max-w-3xl mx-auto z-10 px-4 mt-2 sm:mt-4 mb-2 shrink-0">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 font-poppins tracking-tight text-white drop-shadow-md">
          Testimonial
        </h2>
        <p className="text-xs sm:text-base md:text-lg font-normal text-white/90 leading-relaxed max-w-2xl mx-auto drop-shadow-sm">
          Hear from our satisfied clients who have transformed their businesses with AspiRE.
        </p>
      </div>

      {/* CAROUSEL CONTAINER */}
      <div className="relative w-full max-w-[1400px] mx-auto flex items-center justify-center flex-1 my-auto overflow-hidden min-h-0 z-10">

        {/* Circular White Navigation Arrow Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-4 sm:left-12 md:left-20 lg:left-28 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full border-2 border-white bg-black/20 hover:bg-black/40 backdrop-blur-sm flex items-center justify-center text-white transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-xl"
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={26} strokeWidth={2.5} stroke="white" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 sm:right-12 md:right-20 lg:right-28 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full border-2 border-white bg-black/20 hover:bg-black/40 backdrop-blur-sm flex items-center justify-center text-white transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-xl"
          aria-label="Next testimonial"
        >
          <ChevronRight size={26} strokeWidth={2.5} stroke="white" />
        </button>

        {/* 5-CARD CAROUSEL TRACK */}
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          {testimonials.map((item, index) => {
            const len = testimonials.length;
            let offset = (index - currentIndex) % len;
            if (offset > len / 2) offset -= len;
            if (offset < -len / 2) offset += len;

            const absOffset = Math.abs(offset);
            const isCenter = offset === 0;
            const isVisible = absOffset <= 2; // Exactly 5 cards visible (offset -2, -1, 0, 1, 2)

            // Dynamic styling based on distance from center
            let cardScale = 1;
            let cardOpacity = 1;
            let zIndexVal = 30;
            let bgClass = "bg-white text-gray-900 shadow-2xl";

            if (absOffset === 1) {
              cardScale = 0.88;
              cardOpacity = 0.72;
              zIndexVal = 20;
              bgClass = "bg-gradient-to-b from-white/95 via-white/80 to-white/60 text-gray-800 shadow-lg backdrop-blur-sm";
            } else if (absOffset === 2) {
              cardScale = 0.76;
              cardOpacity = 0.38;
              zIndexVal = 10;
              bgClass = "bg-gradient-to-b from-white/70 via-white/45 to-white/25 text-gray-700 shadow backdrop-blur-xs";
            }

            return (
              <motion.div
                key={index}
                initial={false}
                animate={{
                  x: offset * cardDimensions.gap,
                  scale: cardScale,
                  opacity: isVisible ? cardOpacity : 0,
                  zIndex: zIndexVal,
                  pointerEvents: isCenter ? "auto" : "none",
                }}
                transition={{
                  duration: 0.65,
                  ease: [0.25, 1, 0.5, 1],
                }}
                className={`absolute rounded-2xl p-6 sm:p-8 flex flex-col justify-between shrink-0 box-border ${bgClass}`}
                style={{
                  width: `${cardDimensions.width}px`,
                  height: `${cardDimensions.height}px`,
                  maxHeight: "94%",
                }}
              >
                {/* QUOTE BLOCK WITH FRAMING QUOTATION MARKS */}
                <div className="relative flex-1 flex flex-col justify-center text-center px-1 overflow-hidden">
                  {/* STAR RATING DISPLAY (Commented out for later use)
                  {item.rating && (
                    <div className="flex items-center justify-center gap-1 pt-1 pb-1 shrink-0">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} size={16} className="fill-amber-400 text-amber-400 stroke-amber-400" />
                      ))}
                    </div>
                  )}
                  */}

                  <span className="text-4xl sm:text-5xl font-serif leading-none absolute top-0 left-0 text-gray-300/80 select-none">
                    “
                  </span>

                  <p className="font-serif text-sm sm:text-base md:text-lg leading-relaxed px-4 my-auto font-medium text-gray-900 line-clamp-6">
                    {item.quote}
                  </p>

                  <span className="text-4xl sm:text-5xl font-serif leading-none absolute bottom-0 right-0 text-gray-300/80 select-none">
                    ”
                  </span>
                </div>

                {/* AUTHOR SECTION AT BOTTOM */}
                <div className="flex items-center gap-3 pt-3 border-t border-gray-200/60 mt-3 shrink-0">
                  <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full flex items-center justify-center shrink-0 bg-gray-100 text-gray-700 border border-gray-300 overflow-hidden shadow-inner">
                    <TestimonialAvatar item={item} />
                  </div>

                  <div className="text-left flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-gray-400 font-bold shrink-0">—</span>
                      <h4 className="font-bold text-xs sm:text-sm md:text-base leading-tight text-gray-900 break-words">
                        {item.name}
                      </h4>
                    </div>
                    <p className="text-[11px] sm:text-xs font-normal mt-0.5 leading-snug text-gray-600 line-clamp-2 break-words">
                      {item.role}
                    </p>
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
