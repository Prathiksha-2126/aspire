import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function LoadingOverlay() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    // Minimum display time of 2 seconds
    const minDisplayTime = setTimeout(() => {
      if (progress >= 100) {
        setIsLoading(false);
      }
    }, 2000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(minDisplayTime);
    };
  }, [progress]);

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { 
      opacity: 0,
      transition: { duration: 0.5, ease: "easeInOut" }
    }
  };

  const logoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    },
    exit: {
      scale: 1.2,
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const progressVariants = {
    hidden: { width: "0%" },
    visible: { width: `${progress}%` }
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0C1813]"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Logo Animation */}
          <motion.div
            className="mb-8"
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white font-poppins">
              AspiRE<span className="text-[#8CA791]">.</span>
            </h1>
          </motion.div>

          {/* Progress Bar */}
          <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#8CA791] to-[#2C6035]"
              variants={progressVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Loading Text */}
          <motion.p
            className="mt-4 text-white/60 text-sm font-inter"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Loading experience...
          </motion.p>

          {/* Decorative Elements */}
          <motion.div
            className="absolute top-20 left-20 w-20 h-20 rounded-full bg-[#2C6035]/20 blur-xl"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-32 h-32 rounded-full bg-[#8CA791]/20 blur-xl"
            animate={{
              scale: [1.5, 1, 1.5],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
