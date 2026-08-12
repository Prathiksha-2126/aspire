import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Wrap your hero's background image/video with this.
 * The background scales up slightly as the user scrolls past it.
 *
 * Usage:
 *   <ScrollZoomHero>
 *     <img src="/hero-bg.jpg" className="w-full h-full object-cover" />
 *   </ScrollZoomHero>
 */
export default function ScrollZoomHero({ children, className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.6]);

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden ${className}`}>
      <motion.div style={{ scale, opacity }} className="w-full h-full">
        {children}
      </motion.div>
    </div>
  );
}
