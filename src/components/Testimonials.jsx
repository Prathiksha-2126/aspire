import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, User } from "lucide-react";

const testimonials = [
  {
    name: "Varun Kudchadkar",
    role: "Joint Managing Director - JMD Group",
    quote: "AspiRE has transformed our project execution and operational tracking across all sites—highly efficient and user-friendly!",
    image: "/images/Varun Kudchadkar - JMD.jpeg",
  },
  {
    name: "Kabir Morajkar",
    role: "Partner- Vaastu Estate Developers",
    quote: "An essential tool for construction management simple to use, highly efficient, and keeps every project on track!",
    image: "/images/Kabir Morajkar - Vaastu.jpeg",
  },
  {
    name: "Tanmay Usgaonkar",
    role: "Partner- Maharudra Real Estate",
    quote: "Managing project activities has become faster and more systematic. It is an efficient solution that helps keep every stage of the project on track!",
    image: "/images/Tanmay Usgaonkar - Maharudra.jpeg",
  },
  {
    name: "Marcus Floriano Cardoso",
    role: "Director - Ruby Realtors Goa Private Limited",
    quote: "It has transformed the way we manage our construction projects—streamlined, efficient, and incredibly user-friendly!",
  },
  {
    name: "Sanvi Developers",
    role: "Managing Director",
    quote: "AspiRE has simplified our lead management and project tracking across all our sites. Highly recommended!",
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardDimensions, setCardDimensions] = useState({ width: 330, height: 450 });

  // Dynamically compute responsive card dimensions for smooth sliding offsets across viewports
  useEffect(() => {
    const updateDimensions = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (w < 640) {
        setCardDimensions({
          width: Math.min(w * 0.78, 270),
          height: Math.min(h * 0.52, 400),
        });
      } else if (w < 1024) {
        setCardDimensions({
          width: 300,
          height: 430,
        });
      } else {
        setCardDimensions({
          width: 330,
          height: 450,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Automatically slide leftwards every 5 seconds
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
      className="relative w-full h-screen max-h-[100dvh] min-h-[550px] py-4 sm:py-6 md:py-8 px-4 sm:px-6 overflow-hidden flex flex-col justify-between items-center text-white select-none box-border"
      style={{ backgroundColor: "#234D2B" }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* HEADER */}
      <div className="text-center max-w-3xl mx-auto z-10 px-4 mt-1 sm:mt-3 md:mt-4 mb-1 sm:mb-2 shrink-0">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-3 font-poppins tracking-tight">
          Testimonial
        </h2>
        <p className="text-xs sm:text-base md:text-lg lg:text-xl font-normal text-white/90 leading-relaxed max-w-2xl mx-auto">
          Hear from our satisfied clients who have transformed their businesses with AspiRE.
        </p>
      </div>

      {/* CAROUSEL CONTAINER */}
      <div className="relative w-full max-w-7xl mx-auto flex items-center justify-center flex-1 my-auto overflow-hidden min-h-0">
        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-4 md:left-8 lg:left-12 z-40 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border border-white/60 bg-black/20 hover:bg-black/40 backdrop-blur-md flex items-center justify-center text-white transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-lg"
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={22} className="sm:hidden" />
          <ChevronLeft size={28} className="hidden sm:block" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-4 md:right-8 lg:right-12 z-40 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border border-white/60 bg-black/20 hover:bg-black/40 backdrop-blur-md flex items-center justify-center text-white transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-lg"
          aria-label="Next testimonial"
        >
          <ChevronRight size={22} className="sm:hidden" />
          <ChevronRight size={28} className="hidden sm:block" />
        </button>

        {/* CAROUSEL CARDS TRACK */}
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          {testimonials.map((item, index) => {
            const len = testimonials.length;
            let offset = (index - currentIndex) % len;
            if (offset > len / 2) offset -= len;
            if (offset < -len / 2) offset += len;

            const isCenter = offset === 0;
            const isVisible = Math.abs(offset) <= 1;

            return (
              <motion.div
                key={index}
                initial={false}
                animate={{
                  x: offset * (cardDimensions.width + 24),
                  scale: isCenter ? 1.04 : 0.88,
                  opacity: isCenter ? 1 : isVisible ? 0.5 : 0,
                  zIndex: isCenter ? 30 : 20 - Math.abs(offset),
                  pointerEvents: isCenter ? "auto" : "none",
                }}
                transition={{
                  duration: 0.9,
                  ease: [0.25, 1, 0.5, 1],
                }}
                className="absolute rounded-xl p-6 sm:p-8 md:p-8 flex flex-col justify-between shrink-0 shadow-2xl bg-white text-gray-900"
                style={{
                  width: `${cardDimensions.width}px`,
                  height: `${cardDimensions.height}px`,
                  maxHeight: "92%",
                }}
              >
                {/* QUOTE BLOCK */}
                <div className="relative flex-1 flex flex-col justify-center text-center px-1 sm:px-2 overflow-hidden">
                  <span className="text-4xl sm:text-5xl font-serif leading-none absolute top-0 left-0 text-gray-300">
                    “
                  </span>

                  <p className="font-poppins text-base sm:text-lg md:text-xl leading-relaxed px-3 sm:px-4 my-auto font-medium text-gray-900 line-clamp-6">
                    {item.quote}
                  </p>

                  <span className="text-4xl sm:text-5xl font-serif leading-none absolute bottom-0 right-0 text-gray-300">
                    ”
                  </span>
                </div>

                {/* AUTHOR BLOCK */}
                <div className="flex items-center gap-3 sm:gap-3.5 pt-4 sm:pt-5 border-t border-gray-100 mt-3 sm:mt-4 shrink-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-13 md:h-13 rounded-full flex items-center justify-center shrink-0 bg-gray-100 text-gray-600 border border-gray-200 overflow-hidden">
                    <TestimonialAvatar item={item} />
                  </div>

                  <div className="text-left flex-1 min-w-0">
                    <div className="flex items-baseline gap-1.5 sm:gap-2">
                      <span className="text-gray-400 font-bold shrink-0">—</span>
                      <h4 className="font-bold text-sm sm:text-base leading-tight text-gray-900 break-words">
                        {item.name}
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm font-normal mt-1 leading-snug text-gray-600 line-clamp-2 break-words">
                      {item.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* INDICATOR DOTS */}
      <div className="flex items-center justify-center gap-2 z-30 mb-2 sm:mb-4 shrink-0">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2.5 rounded-full transition-all duration-500 cursor-pointer ${
              idx === currentIndex
                ? "w-8 bg-white"
                : "w-2.5 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </motion.section>
  );
}

