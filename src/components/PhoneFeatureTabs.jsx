import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Horizontal slide animation variants
const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
    scale: 0.95
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1
  },
  exit: (direction) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
    scale: 0.95
  })
};

export default function PhoneFeatureTabs({ tabs }) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleTabClick = (index) => {
    setDirection(index > active ? 1 : -1);
    setActive(index);
  };

  const current = tabs[active];

  return (
    <section className="relative w-full min-h-[700px] md:min-h-[720px] overflow-hidden">
      {/* Diagonal Background */}
      <div className="absolute inset-0 flex">
        {/* Left cream section ~72% */}
        <div className="w-[72%]" style={{ backgroundColor: '#F9F8F5' }} />
        {/* Right green section ~28% with diagonal cut */}
        <div 
          className="w-[28%] relative"
          style={{ backgroundColor: '#2C6035' }}
        >
          {/* Diagonal cut overlay */}
          <div 
            className="absolute inset-0"
            style={{
              clipPath: 'polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)',
              backgroundColor: '#2C6035'
            }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 pt-16 pb-20">
        <div className="grid md:grid-cols-5 gap-12 items-center">
          {/* Left Column - Text Content (40%) */}
          <div className="md:col-span-2">
            {/* Eyebrow Label */}
            <div className="flex items-center gap-3 mb-12">
              <div className="w-8 h-0.5" style={{ backgroundColor: '#2C6035' }} />
              <p className="text-sm font-semibold tracking-wide uppercase" style={{ color: '#2C6035' }}>
                OUR FEATURES
              </p>
            </div>

            {/* Heading */}
            <div className="overflow-hidden">
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.h2
                  key={`heading-${active}`}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ 
                    duration: 0.4,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                  className="text-[64px] md:text-[72px] font-bold leading-none mb-8 uppercase"
                  style={{ color: '#2C6035' }}
                >
                  {current.title}
                </motion.h2>
              </AnimatePresence>
            </div>

            {/* Description */}
            <div className="overflow-hidden">
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.p
                  key={`desc-${active}`}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ 
                    duration: 0.4,
                    ease: [0.25, 0.1, 0.25, 1],
                    delay: 0.05
                  }}
                  className="text-[20px] leading-relaxed mb-16"
                  style={{ 
                    color: '#4B4A4A',
                    maxWidth: '450px'
                  }}
                >
                  {current.description}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Bubble Row - Horizontal Scrollable Carousel */}
            <div className="relative">
              <div 
                className="flex gap-8 overflow-x-auto pb-4 scrollbar-hide"
                style={{ 
                  scrollSnapType: 'x mandatory',
                  scrollBehavior: 'smooth'
                }}
              >
                {tabs.map((tab, i) => {
                  const isActive = i === active;
                  const isGhosted = i >= 4;
                  const isFading = i === 3;

                  return (
                    <motion.button
                      key={tab.label}
                      onClick={() => handleTabClick(i)}
                      className="flex flex-col items-center flex-shrink-0 scroll-snap-center"
                      whileHover={{ scale: isActive ? 1.05 : 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      animate={{
                    x: 0
                  }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      {/* Bubble */}
                      <div
                        className="relative flex items-center justify-center mb-3"
                        style={{ 
                          width: '100px',
                          height: '100px'
                        }}
                      >
                        {/* Outer ring for active only */}
                        {isActive && (
                          <motion.div 
                            className="absolute inset-0 rounded-full"
                            style={{ 
                              border: '2px solid #4CAF50',
                              opacity: 0.5
                            }}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 0.5 }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                        
                        {/* Main circle */}
                        <motion.div
                          className="rounded-full flex items-center justify-center"
                          style={{
                            width: '80px',
                            height: '80px',
                            backgroundColor: isGhosted 
                              ? '#E8F5E9' 
                              : isFading 
                                ? '#C8E6C9' 
                                : '#2C6035',
                            opacity: isGhosted ? 0.3 : 1
                          }}
                          animate={{
                            scale: isActive ? 1.1 : 1
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <span 
                            className="flex items-center justify-center"
                            style={{ 
                              color: isGhosted ? '#BDBDBD' : 'white',
                              fontSize: '32px'
                            }}
                          >
                            {tab.icon}
                          </span>
                        </motion.div>
                      </div>

                      {/* Label */}
                      <motion.span
                        className="text-center text-sm"
                        style={{
                          fontWeight: isActive ? 'bold' : 'normal',
                          color: isActive ? '#2C6035' : isGhosted ? '#BDBDBD' : '#4B4A4A',
                          minWidth: '100px'
                        }}
                        animate={{
                          opacity: isActive ? 1 : 0.7
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {tab.label}
                      </motion.span>

                      {/* Underline for active */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            layoutId="active-underline"
                            className="w-8 h-0.5 mt-1"
                            style={{ backgroundColor: '#2C6035' }}
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: 32 }}
                            exit={{ opacity: 0, width: 0 }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </AnimatePresence>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column - Phone Mockup + Floating Cards (60%) */}
          <div className="md:col-span-3 relative">
            {/* Phone Mockup */}
            <div className="relative mx-auto" style={{ width: '280px', height: '580px' }}>
              {/* Phone Frame */}
              <div 
                className="absolute inset-0 rounded-[40px] shadow-2xl overflow-hidden"
                style={{ backgroundColor: '#1a1a1a' }}
              >
                {/* Phone Screen */}
                <div className="absolute inset-2 rounded-[32px] overflow-hidden bg-white">
                  {/* Status Bar */}
                  <div className="h-8 bg-white flex items-center justify-between px-6 pt-2">
                    <span className="text-xs font-medium">9:41</span>
                    <div className="w-20 h-5 bg-black rounded-full" />
                  </div>
                  
                  {/* App Content */}
                  <div className="p-4 overflow-hidden">
                    <AnimatePresence mode="wait" custom={direction} initial={false}>
                      <motion.div
                        key={`screen-${active}`}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ 
                          duration: 0.4,
                          ease: [0.25, 0.1, 0.25, 1]
                        }}
                      >
                        {current.screenContent}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Floating Cards - Left Side */}
              <div className="absolute left-0 top-0 -translate-x-full pr-8 flex flex-col gap-6">
                <AnimatePresence mode="wait" initial={false}>
                  {current.leftCards?.map((card, i) => (
                    <FloatingCard
                      key={`left-${active}-${i}`}
                      card={card}
                      position="left"
                      delay={i * 0.05}
                      direction={direction}
                    />
                  ))}
                </AnimatePresence>
              </div>

              {/* Floating Cards - Right Side */}
              <div className="absolute right-0 top-0 translate-x-full pl-8 flex flex-col gap-6">
                <AnimatePresence mode="wait" initial={false}>
                  {current.rightCards?.map((card, i) => (
                    <FloatingCard
                      key={`right-${active}-${i}`}
                      card={card}
                      position="right"
                      delay={i * 0.05}
                      direction={direction}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Floating Card Component
function FloatingCard({ card, position, delay, direction }) {
  return (
    <motion.div
      key={card.label}
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ 
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
        delay
      }}
      className="relative bg-white rounded-xl shadow-lg p-6"
      style={{ 
        width: position === 'left' ? '140px' : '160px',
        minHeight: '80px'
      }}
    >
      {/* Dashed line connection */}
      <div 
        className={`absolute ${position === 'left' ? 'right-0' : 'left-0'} top-1/2 -translate-y-1/2 w-8`}
        style={{
          borderStyle: 'dashed',
          borderWidth: '1px',
          borderColor: '#BDBDBD',
          [position === 'left' ? 'marginRight' : 'marginLeft']: '-8px'
        }}
      >
        {/* Dot at phone end */}
        <div 
          className={`absolute ${position === 'left' ? 'right-0' : 'left-0'} top-1/2 -translate-y-1/2 w-2 h-2 rounded-full`}
          style={{ backgroundColor: '#2C6035' }}
        />
      </div>

      {/* Card Content */}
      <div className="flex flex-col gap-2">
        {card.icon && (
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: card.iconBg || '#E8F5E9' }}
          >
            {card.icon}
          </div>
        )}
        {card.label && (
          <span className="text-xs font-medium" style={{ color: '#4B4A4A' }}>
            {card.label}
          </span>
        )}
        {card.value && (
          <span className="text-lg font-bold" style={{ color: '#2C6035' }}>
            {card.value}
          </span>
        )}
      </div>
    </motion.div>
  );
}
