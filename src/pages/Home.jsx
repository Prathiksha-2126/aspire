import React, { useRef, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

import SectionHeading from "../components/SectionHeading";
import Testimonials from "../components/Testimonials";
import PackagePlans from "../components/PackagePlans";
import ClientLogos from "../components/ClientLogos";
import ParallaxSection from "../components/animations/ParallaxSection";
import OurProducts from "../components/OurProducts";
import ContactForm from "../components/ContactForm";

// ---- WHY ASPIRE DATA ----
const whyAspireItems = [
  {
    title: "Remote Access for Admin",
    labelLine1: "Remote Access",
    labelLine2: "for Admin",
    desc: "Manage projects, sales, teams, and daily operations anytime through one centralized dashboard.",
    icon: "/images/Task Mangement Icon (eng).png",
    bubbleIcon: "/images/remote-access.png",
    video: "/images/Remote Access for Admin.MP4",
    angle: 160,
    labelSide: "left",
  },
  {
    title: "Smarter Decision Making",
    labelLine1: "Smarter",
    labelLine2: "Decision Making",
    desc: "Access real-time reports, analytics, and data to make faster and more confident business decisions.",
    icon: "/images/Booking Management Icon.png",
    bubbleIcon: "/images/decision-making.png",
    video: "/images/Quick & Informed Decision Making.MP4",
    angle: 215,
    labelSide: "left",
  },
  {
    title: "Never Miss a Deadline",
    labelLine1: "Never Miss",
    labelLine2: "a Deadline",
    desc: "Track tasks, milestones, and progress with smart reminders and automated notifications.",
    icon: "/images/Attendance Management ICon.png",
    bubbleIcon: "/images/top-of-deadlines.png",
    video: "/images/Stay on top of your Schedule.mp4",
    angle: 325,
    labelSide: "right",
  },
  {
    title: "Streamlined Processes",
    labelLine1: "Streamlined",
    labelLine2: "Processes",
    desc: "Automate approvals, reminders, notifications, and routine tasks to save time and improve efficiency.",
    icon: "/images/Reports Analytics ICon.png",
    bubbleIcon: "/images/automated-workflow.png",
    video: "/images/Automated Workflow.mp4",
    angle: 20,
    labelSide: "right",
  },
];

// ---- WHY ASPIRE — circle layout on ALL screen sizes ----
function WhyAspireSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [radius, setRadius] = useState(280);

  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;

      // Increased circle for mobile so card/content stays fully visible
      const minR = vw < 480 ? 190 : vw < 768 ? 230 : 220;
      const maxR = vw < 480 ? 230 : vw < 768 ? 280 : 270;

      const calc = Math.max(minR, Math.min(vw * 0.42, maxR));
      setRadius(calc);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Auto-advance on video end
  const handleVideoEnd = () =>
    setActiveIndex((prev) => (prev + 1) % whyAspireItems.length);

  const handleBubbleClick = (index) => setActiveIndex(index);

  const svgSize = (radius + 40) * 2;

  return (
    <section
      id="why-aspire"
      className="relative w-full py-10 md:py-14 px-4 overflow-hidden box-border vector-on-light blend-to-light fade-clear-top flex flex-col items-center justify-start min-h-[720px] sm:min-h-[800px] md:min-h-[820px]"
    >
      {/* Header */}
      <div className="text-center px-4 z-20 max-w-4xl mx-auto shrink-0 mb-7 md:mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight text-primary opacity-90 mb-2 md:mb-3 font-poppins">
          Why AspiRE?
        </h2>

        <p
          className="text-xs sm:text-sm md:text-base lg:text-lg leading-snug font-medium"
          style={{ color: "#383838" }}
        >
          Built by industry experts to solve the real bottlenecks in construction.
        </p>
      </div>

      {/* Circular Stage Arena */}
      <div className="relative w-full max-w-6xl flex items-center justify-center min-h-[420px] sm:min-h-[500px] md:min-h-[520px] my-auto z-10">
        <svg
          className="absolute pointer-events-none transition-all duration-300 z-1"
          width={svgSize}
          height={svgSize}
          viewBox={`0 0 ${svgSize} ${svgSize}`}
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <defs>
            <linearGradient
              id="solidRingFadeGradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#2C6035" stopOpacity="1" />
              <stop offset="40%" stopColor="#2C6035" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#2C6035" stopOpacity="0.45" />
              <stop offset="92%" stopColor="#2C6035" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#2C6035" stopOpacity="0" />
            </linearGradient>
          </defs>

          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            fill="none"
            stroke="url(#solidRingFadeGradient)"
            strokeWidth="2.5"
          />
        </svg>

        {whyAspireItems.map((item, index) => {
          const isActive = index === activeIndex;
          const isLeftSide = item.labelSide === "left";
          const rad = (item.angle * Math.PI) / 180;
          const x = Math.cos(rad) * radius;
          const y = Math.sin(rad) * radius;

          return (
            <div
              key={item.title}
              onClick={() => handleBubbleClick(index)}
              className="absolute cursor-pointer group flex items-center justify-center"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: "translate(-50%, -50%)",
                zIndex: isActive ? 30 : 25,
              }}
            >
              <motion.div
                className={`rounded-full flex items-center justify-center shadow-lg border-2 select-none transition-colors duration-300 ${isActive
                    ? "bg-[#2C6035] border-[#2C6035]"
                    : "bg-white border-[#2C6035]"
                  }`}
                animate={
                  isActive
                    ? {
                      width: [56, 50, 72, 68],
                      height: [56, 50, 72, 68],
                      scale: [1, 0.88, 1.18, 1.12],
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
                    : {
                      duration: 0.3,
                    }
                }
              >
                <img
                  src={item.bubbleIcon}
                  alt={item.title}
                  className="w-6 h-6 md:w-7 md:h-7 object-contain transition-all duration-300 select-none"
                  style={{
                    filter: isActive
                      ? "brightness(0) invert(1)"
                      : "brightness(0) saturate(100%) invert(31%) sepia(40%) saturate(637%) hue-rotate(86deg) brightness(92%) contrast(90%)",
                  }}
                />
              </motion.div>

              {/* Labels */}
              <motion.span
                className={`hidden sm:block text-[9px] md:text-sm font-semibold select-none absolute top-1/2 -translate-y-1/2 pointer-events-none leading-snug ${isLeftSide ? "text-right" : "text-left"
                  }`}
                style={{
                  [isLeftSide ? "right" : "left"]: "100%",
                }}
                animate={{
                  [isLeftSide ? "marginRight" : "marginLeft"]: isActive
                    ? "14px"
                    : "12px",
                  opacity: isActive ? 1 : 0.85,
                  scale: isActive ? 1.05 : 1,
                  color: isActive ? "#2C6035" : "#4A4A4A",
                }}
                transition={{
                  duration: 0.45,
                  ease: "easeInOut",
                }}
              >
                <span className="block whitespace-nowrap">
                  {item.labelLine1}
                </span>
                <span className="block whitespace-nowrap">
                  {item.labelLine2}
                </span>
              </motion.span>
            </div>
          );
        })}

        {/* Center card */}
        <div className="relative flex items-center justify-center z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{
                duration: 0.25,
                ease: "easeInOut",
              }}
              className="rounded-2xl overflow-hidden w-[180px] sm:w-[200px] md:w-[270px] lg:w-[285px] shadow-2xl border border-white/20"
              style={{ backgroundColor: "#2C6035" }}
            >
              <div className="p-1.5 md:p-2 pb-0">
                <div className="rounded-xl overflow-hidden w-full h-[180px] sm:h-[190px] md:h-[265px] lg:h-[280px] bg-black flex items-center justify-center">
                  <video
                    key={whyAspireItems[activeIndex].video}
                    autoPlay
                    muted
                    playsInline
                    onEnded={handleVideoEnd}
                    className="w-full h-full object-cover"
                  >
                    <source
                      src={whyAspireItems[activeIndex].video}
                      type="video/mp4"
                    />
                  </video>
                </div>
              </div>

              <div className="p-2 md:p-3 pt-1.5 md:pt-2 text-left">
                <h3 className="text-white font-bold text-[10px] md:text-sm leading-snug mb-0.5">
                  {whyAspireItems[activeIndex].title}
                </h3>

                <p className="text-white/90 text-[8px] md:text-xs leading-relaxed font-light hidden sm:block">
                  {whyAspireItems[activeIndex].desc}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const heroRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { scrollY } = useScroll();

  const heroScale = useTransform(scrollY, [0, 500], [1, 0.85]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  const handleGetInTouch = (e) => {
    e.preventDefault();
    const targetElement = document.getElementById("contact");

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <motion.section
        ref={heroRef}
        id="hero"
        className="relative min-h-screen flex items-center justify-center bg-gray-900 text-white pt-20 pb-10 md:pt-24 md:pb-16 overflow-hidden"
      >
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/hero-video.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20 md:bg-gradient-to-r md:from-black/50 md:via-black/20 md:to-transparent" />
        </div>

        <motion.div
          className="relative w-full max-w-7xl mx-auto z-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 lg:gap-16 items-center px-5 sm:px-8 md:px-16"
          style={{
            scale: heroScale,
            opacity: heroOpacity,
          }}
        >
          {/* Text block */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1
              className="text-3xl sm:text-4xl md:text-[56px] font-bold leading-tight md:leading-[68px] mb-4 md:mb-6 text-white"
              variants={fadeInUpVariants}
            >
              Let's Digitize Your{" "}
              <span className="bg-gradient-to-r from-[#FBFCFB] to-[#8CA791] bg-clip-text text-transparent">
                Construction
              </span>
              <br />
              <span className="bg-gradient-to-r from-[#7F9E85] to-[#306239] bg-clip-text text-transparent">
                Projects.
              </span>
            </motion.h1>

            <motion.p
              className="text-white/90 mb-6 md:mb-8 max-w-md text-sm md:text-base leading-relaxed"
              variants={fadeInUpVariants}
            >
              Seamlessly manage operations, boost efficiency, and grow with our
              AI-Powered platform.
            </motion.p>

            <motion.div variants={fadeInUpVariants}>
              <div className="inline-block transition-transform hover:scale-105 active:scale-95">
                <button
                  onClick={handleGetInTouch}
                  className="inline-flex items-center gap-2 rounded-[11px] px-5 py-3 font-semibold text-white cursor-pointer text-sm md:text-base"
                  style={{ backgroundColor: "#2C6035" }}
                >
                  Get in Touch <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          </motion.div>

          {/* Right image */}
          <motion.div
            className="relative flex justify-center md:justify-end md:translate-x-8 lg:translate-x-16"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
            }}
          >
            <div className="relative inline-block max-w-[420px] lg:max-w-[460px] w-full">
              <motion.img
                src="/images/Hero Section right Side image.png"
                alt="AspiRE dashboard"
                className="w-full drop-shadow-2xl rounded-[20px]"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />

              {/* Floating badge — left */}
              <motion.div
                className="absolute -left-10 md:-left-12 lg:-left-16 top-1/2 -translate-y-1/2"
                initial={{
                  opacity: 0,
                  scale: 0.8,
                  rotateY: -20,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotateY: 0,
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.6,
                  y: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                style={{
                  width: "220px",
                  height: "85px",
                  backgroundColor: "rgba(0,0,0,0.4)",
                  borderRadius: "12px",
                  boxShadow:
                    "0 12px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
                  padding: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    backgroundColor: "rgba(0,0,0,0.6)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                    border: "1px solid rgba(76,175,80,0.3)",
                  }}
                >
                  <Check size={24} style={{ color: "#4CAF50" }} />
                </div>

                <div className="flex flex-col">
                  <span
                    style={{
                      fontSize: "12px",
                      color: "rgba(255,255,255,0.6)",
                      fontWeight: "normal",
                    }}
                  >
                    Block 1
                  </span>

                  <span
                    style={{
                      fontSize: "16px",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    Completed
                  </span>
                </div>
              </motion.div>

              {/* Floating badge — right */}
              <motion.div
                className="absolute -right-6 md:-right-8 lg:-right-10 bottom-4 translate-y-4"
                initial={{
                  opacity: 0,
                  scale: 0.8,
                  rotateY: 20,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotateY: 0,
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.7,
                  y: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                style={{
                  width: "220px",
                  height: "85px",
                  backgroundColor: "rgba(0,0,0,0.4)",
                  borderRadius: "12px",
                  boxShadow:
                    "0 12px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
                  padding: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    backgroundColor: "rgba(0,0,0,0.6)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                    border: "1px solid rgba(76,175,80,0.3)",
                  }}
                >
                  <Check size={24} style={{ color: "#4CAF50" }} />
                </div>

                <div className="flex flex-col">
                  <span
                    style={{
                      fontSize: "12px",
                      color: "rgba(255,255,255,0.6)",
                      fontWeight: "normal",
                    }}
                  >
                    Block 2
                  </span>

                  <span
                    style={{
                      fontSize: "16px",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    Completed
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ── OUR VISION ───────────────────────────────────────────────────── */}
      <motion.section
        id="our-vision"
        className="w-full min-h-screen min-h-[100dvh] px-5 sm:px-8 md:px-16 pt-0 md:pt-2 pb-16 text-center relative overflow-hidden flex flex-col justify-center items-center vector-on-light"
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          margin: "-100px",
        }}
        variants={staggerContainer}
      >
        <div className="max-w-4xl lg:max-w-5xl mx-auto flex flex-col items-center justify-center px-2 font-poppins w-full">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
          >
            <p
              className="text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3 md:mb-6"
              style={{ color: "#2C6035" }}
            >
              — OUR VISION
            </p>
          </motion.div>

          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold leading-tight mb-5 md:mb-10 tracking-tight"
            style={{ color: "#2C6035" }}
            variants={fadeInUpVariants}
          >
            Transforming Construction
            <br className="hidden sm:block" />
            {" "}Through AI
          </motion.h2>

          <motion.p
            className="w-full max-w-4xl mx-auto text-lg sm:text-xl md:text-2xl lg:text-2xl leading-relaxed font-normal text-center"
            style={{ color: "#5d9767ff" }}
            variants={fadeInUpVariants}
          >
            Our vision is to become the trusted technology partner <span className="whitespace-nowrap">for real estate</span> developers with AspiRE that simplify your
            complex workflows. We aim to help developers make faster
            decisions, improve productivity, and deliver exceptional projects
            through our AI driven digital platform.
          </motion.p>
        </div>
      </motion.section>

      <OurProducts />
      <WhyAspireSection />
      <Testimonials />
      <PackagePlans defaultTab="engineering" />
      <ClientLogos />
    </>
  );
}