import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Circle } from "lucide-react";

const moduleData = {
  engineering: {
    heading: "AspiRE Engineering",
    description:
      "Bring the site to your screen. Control material requests, track labor productivity, and ensure project milestones are hit safely and on schedule.",
    features: [
      "Material Management Workflow",
      "Daily Progress Reporting (DPR)",
      "Attendance & Payouts Management",
    ],
    image: "/images/our-product-engineering.jpg",
    video: "/images/aspire-engineering.mp4",
    link: "/engineering",
    cta: "Explore Engineering Module",
  },
  sales: {
    heading: "AspiRE Sales",
    description:
      "Take control of your leads, clients, bookings, and sales from one centralized platform. Track every opportunity, automate follow-ups, and keep your sales team aligned from enquiry to closure.",
    features: [
      "Leads and Clients Management",
      "Booking and stage-wise payment tracking",
      "Auto Document Generation",
    ],
    image: "/images/our-product-sales.jpg",
    video: "/images/aspire-sales.mp4",
    link: "/sales",
    cta: "Explore Sales Module",
  },
};

function ProductCard({ data, index }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isHovered) {
        videoRef.current.currentTime = 0;
        const p = videoRef.current.play();
        if (p !== undefined) p.catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isHovered]);

  const handleExplore = (e) => {
    e.preventDefault();
    navigate(data.link);
    setTimeout(() => {
      const el = document.getElementById("hero");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      else window.scrollTo({ top: 0, behavior: "smooth" });
    }, 300);
  };

  return (
    <motion.div
      className="relative w-full rounded-3xl overflow-hidden group cursor-pointer shadow-xl"
      style={{ aspectRatio: "4/3" }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 1, 0.5, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setTimeout(() => setIsHovered(false), 1200)}
    >
      <img
        src={data.image}
        alt={data.heading}
        className={`w-full h-full object-cover transition-opacity duration-500 ${isHovered ? "opacity-0" : "opacity-100"}`}
      />
      {data.video && (
        <video
          ref={videoRef}
          src={data.video}
          muted
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        />
      )}
      {/* Black film overlay over background media */}
      <div className="absolute inset-0 z-[5] bg-black/55" />
      {/* Content */}
      <div className="absolute inset-0 z-10 flex items-center p-5 sm:p-6 md:p-8">
        <div className="w-fit max-w-full rounded-2xl p-5 sm:p-6 md:p-8">
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 text-left font-poppins tracking-tight">
            {data.heading}
          </h3>
          <ul className="space-y-2 mb-5">
            {data.features.map((item) => (
              <li key={item} className="flex items-center gap-2 text-xs sm:text-sm md:text-base text-white/90 font-medium">
                <Circle size={7} fill="white" className="text-white shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <button
            onClick={handleExplore}
            className="inline-flex items-center gap-2 text-white rounded-full px-5 py-2.5 font-semibold text-xs sm:text-sm cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg w-fit group/btn"
            style={{ backgroundColor: "#2C6035" }}
          >
            {data.cta}
            <ArrowRight size={16} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function OurProducts() {
  return (
    <section
      id="our-products"
      className="w-full pb-12 sm:pb-16 md:pb-20 lg:pb-24 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden vector-on-green blend-to-green fade-clear-top"
      style={{ backgroundColor: "#2C6035" }}
    >
      <div className="max-w-[1600px] mx-auto">
        {/* Heading */}
        <motion.div
          className="text-center mb-6 md:mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-3 md:mb-4">
            <div className="w-6 md:w-8 h-0.5 bg-white" />
            <p className="text-xs md:text-base font-bold tracking-widest uppercase text-white">
              OUR PRODUCTS
            </p>
            <div className="w-6 md:w-8 h-0.5 bg-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight font-poppins">
            Purpose-Built Modules for Builders
          </h2>
        </motion.div>

        {/* Cards — 1 col mobile, 2 col md+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 lg:gap-10">
          <ProductCard data={moduleData.engineering} index={0} />
          <ProductCard data={moduleData.sales} index={1} />
        </div>
      </div>
    </section>
  );
}
