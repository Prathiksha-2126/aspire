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
    angle: 160, // Left down (shifted upper along circle)
    labelSide: "left",
  },
  {
    title: "Quick & Informed Decision Making",
    labelLine1: "Quick & Informed",
    labelLine2: "Decision Making",
    desc: "Access real-time reports, analytics, and data to make faster and more confident business decisions.",
    icon: "/images/Booking Management Icon.png",
    bubbleIcon: "/images/decision-making.png",
    video: "/images/Quick & Informed Decision Making.MP4",
    angle: 215, // Left top (top-left)
    labelSide: "left",
  },
  {
    title: "Stay on Top of Your Deadlines",
    labelLine1: "Stay on Top of",
    labelLine2: "Your Deadlines",
    desc: "Track tasks, milestones, and progress with smart reminders and automated notifications.",
    icon: "/images/Attendance Management ICon.png",
    bubbleIcon: "/images/top-of-deadlines.png",
    video: "/images/Stay on top of your Schedule.mp4",
    angle: 325, // Right top (top-right)
    labelSide: "right",
  },
  {
    title: "Automated Workflows",
    labelLine1: "Automated",
    labelLine2: "Workflows",
    desc: "Automate approvals, reminders, notifications, and routine tasks to save time and improve efficiency.",
    icon: "/images/Reports Analytics ICon.png",
    bubbleIcon: "/images/automated-workflow.png",
    video: "/images/Automated Workflow.mp4",
    angle: 20, // Right bottom (shifted upper along circle)
    labelSide: "right",
  },
];

// ---- COMMENTS QUESTION FLATICON ICON (Regular & Solid Variants) ----
function CommentsQuestionIcon({ isSolid, className, style }) {
  if (isSolid) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        style={style}
        width="1em"
        height="1em"
      >
        <path d="M12 2C6.477 2 2 6.03 2 11c0 2.378 1.05 4.542 2.8 6.162-.254 1.488-.958 2.842-1.996 3.864-.176.174-.187.458-.025.646.121.14.309.2.493.153 2.766-.694 4.966-2.072 6.302-3.037.79.14 1.605.212 2.426.212 5.523 0 10-4.03 10-9s-4.477-9-10-9zm0 13.75c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25zm1.494-5.275c-.328.32-.75.525-1.25.625v.4c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-.75c0-.414.336-.75.75-.75.464 0 .867-.206 1.132-.525.266-.32.348-.734.226-1.145-.164-.555-.675-.98-1.254-1.055-.733-.095-1.424.36-1.636 1.071-.118.397-.535.623-.932.505-.397-.118-.623-.535-.505-.932.443-1.488 1.88-2.441 3.415-2.241 1.222.159 2.29.8 3.06 2.228.257.868.084 1.742-.477 2.417-.561.675-1.455 1.065-2.36 1.065z" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      width="1em"
      height="1em"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

// ---- WHY ASPIRE AUTO-SCROLLING & INTERACTIVE CIRCULAR VIDEO CAROUSEL ----
function WhyAspireSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [radius, setRadius] = useState(320);

  // Calculate enlarged circle radius dynamically based on screen size
  useEffect(() => {
    const updateRadius = () => {
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const calculatedRadius = Math.max(250, Math.min(vh * 0.42, vw * 0.42, 400));
      setRadius(calculatedRadius);
    };

    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  const handleVideoEnd = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % whyAspireItems.length);
  };

  const handleBubbleClick = (index) => {
    setActiveIndex(index);
  };

  const svgSize = (radius + 40) * 2;

  return (
    <section
      id="why-aspire"
      className="relative w-full h-screen min-h-[100dvh] min-h-[600px] flex flex-col items-center justify-between pt-10 md:pt-14 pb-8 overflow-hidden box-border vector-on-light blend-to-light"
      style={{
        backgroundColor: "#FFFFFF",
      }}
    >
      {/* Header Section */}
      <div className="text-center px-4 z-20 max-w-4xl mx-auto shrink-0 mt-1 mb-2">
        <h2 className="text-3xl md:text-5xl font-bold leading-tight text-primary opacity-90 mb-1.5">
          Why AspiRE?
        </h2>
        <p
          className="text-xs md:text-base lg:text-lg leading-snug font-medium whitespace-nowrap sm:whitespace-normal md:whitespace-nowrap"
          style={{ color: "#383838" }}
        >
          Built by industry experts to solve the real bottlenecks in construction and development
        </p>
      </div>

      {/* Circular Stage Arena - Shifted lower down with mt-6 md:mt-8 translate-y-4 md:translate-y-6 */}
      <div className="relative w-full max-w-7xl flex-1 flex items-center justify-center min-h-0 mt-6 md:mt-8 translate-y-4 md:translate-y-6">

          {/* Fully Lined Solid Circle Ring fading towards the bottom end */}
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
              <linearGradient id="solidRingFadeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
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
              strokeWidth="3.5"
            />
          </svg>

          {/* Bubbles Centered Exactly ON TOP of the Circle Ring */}
          {whyAspireItems.map((item, index) => {
            const isActive = index === activeIndex;
            const isLeftSide = item.labelSide === "left";

            // Precise trigonometric coordinates along the ring path
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
                {/* Bubble Icon Container with Anticipation Shrink-then-Pop Animation */}
                <motion.div
                  className={`rounded-full flex items-center justify-center shadow-lg border-2 select-none transition-colors duration-300 ${isActive
                      ? "bg-[#2C6035] border-[#2C6035]"
                      : "bg-white border-[#2C6035] hover:scale-110"
                    }`}
                  animate={
                    isActive
                      ? {
                          width: [68, 60, 92, 88],
                          height: [68, 60, 92, 88],
                          scale: [1, 0.88, 1.18, 1.12],
                        }
                      : {
                          width: 68,
                          height: 68,
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
                  <img
                    src={item.bubbleIcon}
                    alt={item.title}
                    className={`object-contain transition-all duration-300 select-none ${isActive ? "w-9 h-9 md:w-11 md:h-11" : "w-7 h-7 md:w-8 md:h-8"
                      }`}
                    style={{
                      filter: isActive
                        ? "brightness(0) invert(1)"
                        : "brightness(0) saturate(100%) invert(31%) sepia(40%) saturate(637%) hue-rotate(86deg) brightness(92%) contrast(90%)",
                    }}
                  />
                </motion.div>

                {/* Text Title Pushed Safely Outside Bubble Border - EXACTLY 2 Lines */}
                <motion.span
                  className={`hidden md:block text-xs md:text-sm font-semibold select-none absolute top-1/2 -translate-y-1/2 pointer-events-none leading-snug ${
                    isLeftSide ? "text-right" : "text-left"
                  }`}
                  style={{
                    [isLeftSide ? "right" : "left"]: "100%",
                  }}
                  animate={{
                    [isLeftSide ? "marginRight" : "marginLeft"]: isActive ? "22px" : "16px",
                    opacity: isActive ? 1 : 0.85,
                    scale: isActive ? 1.05 : 1,
                    color: isActive ? "#2C6035" : "#4A4A4A",
                  }}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                >
                  <span className="block whitespace-nowrap">{item.labelLine1}</span>
                  <span className="block whitespace-nowrap">{item.labelLine2}</span>
                </motion.span>
              </div>
            );
          })}

          {/* Active Floating Video & Content Card (Slightly Reduced Size & No Float-in y Animation) */}
          <div className="relative flex items-center justify-center z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="rounded-2xl overflow-hidden w-[210px] sm:w-[240px] md:w-[270px] lg:w-[285px] shadow-2xl border border-white/20"
                style={{ backgroundColor: "#2C6035" }}
              >
                {/* Reduced Video Viewport */}
                <div className="p-2 pb-0">
                  <div className="rounded-xl overflow-hidden w-full h-[210px] sm:h-[240px] md:h-[265px] lg:h-[280px] bg-black flex items-center justify-center">
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

                {/* Text Description */}
                <div className="p-3 pt-2 text-left">
                  <h3 className="text-white font-bold text-xs md:text-sm leading-snug mb-0.5">
                    {whyAspireItems[activeIndex].title}
                  </h3>
                  <p className="text-white/90 text-[10px] md:text-xs leading-relaxed font-light">
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
    const targetElement = document.getElementById('contact');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <>
      {/* HERO */}
      <motion.section
        ref={heroRef}
        id="hero"
        className="relative h-screen flex items-center justify-center bg-gray-900 text-white px-8 md:px-16 pt-32 pb-16 overflow-hidden"
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
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
        </div>
        <motion.div
          className="relative grid md:grid-cols-2 gap-10 lg:gap-16 items-center max-w-7xl w-full mx-auto z-10"
          style={{ scale: heroScale, opacity: heroOpacity }}
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1
              className="text-4xl md:text-[60px] font-bold leading-[72px] mb-6 text-white"
              variants={fadeInUpVariants}
            >
              Let's Digitize Your{" "}
              <span className="bg-gradient-to-r from-[#FBFCFB] to-[#8CA791] bg-clip-text text-transparent">Construction</span>
              <br />
              <span className="bg-gradient-to-r from-[#7F9E85] to-[#306239] bg-clip-text text-transparent">Projects.</span>
            </motion.h1>
            <motion.p
              className="text-white mb-8 max-w-md text-[16px] leading-[21px]"
              variants={fadeInUpVariants}
            >
              Seamlessly manage operations, boost efficiency, and Grow with
              our AI-Powered platform.
            </motion.p>
            <motion.div variants={fadeInUpVariants}>
              <div className="inline-block transition-transform hover:scale-105 active:scale-95">
                <button
                  onClick={handleGetInTouch}
                  className="inline-flex items-center gap-2 rounded-[11px] px-6 py-3 font-semibold text-white cursor-pointer"
                  style={{ backgroundColor: '#2C6035' }}
                >
                  Get in Touch <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative hidden md:flex justify-end md:translate-x-8 lg:translate-x-16"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative inline-block max-w-[420px] lg:max-w-[460px] w-full">
              <motion.img
                src="/images/Hero Section right Side image.png"
                alt="AspiRE dashboard"
                className="w-full drop-shadow-2xl rounded-[20px]"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />

              <motion.div
                className="absolute -left-10 md:-left-12 lg:-left-16 top-1/2 -translate-y-1/2"
                initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0, y: [0, -10, 0] }}
                transition={{
                  duration: 0.6,
                  delay: 0.6,
                  y: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                style={{
                  width: '220px',
                  height: '85px',
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  borderRadius: '12px',
                  boxShadow: '0 12px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(76, 175, 80, 0.3)'
                  }}
                >
                  <Check size={24} style={{ color: '#4CAF50' }} />
                </div>

                <div className="flex flex-col">
                  <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', fontWeight: 'normal' }}>
                    Block 1
                  </span>
                  <span style={{ fontSize: '16px', color: 'white', fontWeight: 'bold' }}>
                    Completed
                  </span>
                </div>
              </motion.div>

              <motion.div
                className="absolute -right-6 md:-right-8 lg:-right-10 bottom-4 translate-y-4"
                initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0, y: [0, -10, 0] }}
                transition={{
                  duration: 0.6,
                  delay: 0.7,
                  y: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                style={{
                  width: '220px',
                  height: '85px',
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  borderRadius: '12px',
                  boxShadow: '0 12px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(76, 175, 80, 0.3)'
                  }}
                >
                  <Check size={24} style={{ color: '#4CAF50' }} />
                </div>

                <div className="flex flex-col">
                  <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', fontWeight: 'normal' }}>
                    Block 2
                  </span>
                  <span style={{ fontSize: '16px', color: 'white', fontWeight: 'bold' }}>
                    Completed
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* OUR VISION */}
      <motion.section
        id="our-vision"
        className="w-full h-screen min-h-[100dvh] min-h-[550px] px-8 md:px-16 text-center relative overflow-hidden flex flex-col justify-center items-center vector-on-light"
        style={{ backgroundColor: '#FFFFFF' }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-4xl lg:max-w-5xl mx-auto flex flex-col items-center justify-center my-auto px-4 font-poppins w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="text-sm md:text-base font-semibold tracking-widest uppercase mb-4 md:mb-6"
              style={{ color: '#2C6035', fontFamily: "'Poppins', sans-serif" }}
            >
              — OUR VISION
            </p>
          </motion.div>
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight md:leading-[1.25] mb-6 md:mb-8 tracking-tight"
            style={{ color: '#2C6035', fontFamily: "'Poppins', sans-serif" }}
            variants={fadeInUpVariants}
          >
            Transforming Construction<br />Through AI
          </motion.h2>
          <motion.p
            className="w-full max-w-4xl lg:max-w-5xl mx-auto text-base sm:text-lg md:text-xl lg:text-[22px] leading-relaxed md:leading-[1.65] font-normal"
            style={{ color: '#5d9767ff', fontFamily: "'Poppins', sans-serif" }}
            variants={fadeInUpVariants}
          >
            Our vision is to become the trusted technology partner for real estate developers by<br className="hidden sm:block" />
            creating innovative solutions that simplify complex workflows. We aim to help<br className="hidden sm:block" />
            businesses make faster decisions, improve productivity, and deliver exceptional<br className="hidden sm:block" />
            projects through AI driven digital platforms.
          </motion.p>
        </div>
      </motion.section>

      <OurProducts />

      {/* WHY ASPIRE */}
      <WhyAspireSection />

      <Testimonials />
      <div id="package-plans">
        <PackagePlans defaultTab="engineering" />
      </div>
      <ClientLogos />
    </>
  );
}
