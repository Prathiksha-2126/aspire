import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

/**
 * Carousel: autoplay, free-drag scrolling, and items scale/fade based on
 * their offset from the center (offset-linked animation).
 *
 * Usage:
 *   <Carousel autoplay interval={3000}>
 *     {items.map((item) => <div key={item.id}>{item.content}</div>)}
 *   </Carousel>
 *
 * Set showThumbnails to render it as a thumbnail gallery instead.
 */
export default function Carousel({ children, autoplay = false, interval = 4000, showThumbnails = false }) {
  const items = Array.isArray(children) ? children : [children];
  const [active, setActive] = useState(0);
  const dragX = useMotionValue(0);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!autoplay) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % items.length);
    }, interval);
    return () => clearInterval(timer);
  }, [autoplay, interval, items.length]);

  return (
    <div className="w-full">
      <div ref={containerRef} className="overflow-hidden">
        <motion.div
          drag="x"
          dragConstraints={{ left: -((items.length - 1) * 320), right: 0 }}
          style={{ x: dragX }}
          animate={{ x: -active * 320 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="flex gap-4"
        >
          {items.map((item, i) => {
            const distance = Math.abs(i - active);
            const scale = 1 - Math.min(distance * 0.08, 0.2);
            const opacity = 1 - Math.min(distance * 0.25, 0.6);

            return (
              <motion.div
                key={i}
                animate={{ scale, opacity }}
                transition={{ duration: 0.3 }}
                className="min-w-[300px] flex-shrink-0"
              >
                {item}
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Dot indicators or thumbnail strip */}
      <div className="flex justify-center gap-2 mt-6">
        {items.map((_, i) =>
          showThumbnails ? (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-12 h-8 rounded border-2 transition ${
                active === i ? "border-aspire-600" : "border-gray-200 opacity-60"
              }`}
            />
          ) : (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-2.5 h-2.5 rounded-full transition ${
                active === i ? "bg-aspire-600" : "bg-gray-300"
              }`}
            />
          )
        )}
      </div>
    </div>
  );
}
