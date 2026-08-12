import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

/**
 * Drag-to-reveal before/after image slider.
 * Usage:
 *   <ImageRevealSlider beforeSrc="/before.jpg" afterSrc="/after.jpg" />
 */
export default function ImageRevealSlider({ beforeSrc, afterSrc, beforeLabel = "Before", afterLabel = "After" }) {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(50); // percentage, starts at middle
  const clipPath = useTransform(x, (v) => `inset(0 ${100 - v}% 0 0)`);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    containerRef.current?.setPointerCapture(e.pointerId);
    updatePosition(e);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    updatePosition(e);
  };

  const handlePointerUp = (e) => {
    setIsDragging(false);
    containerRef.current?.releasePointerCapture(e.pointerId);
  };

  const updatePosition = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const percent = ((e.clientX - rect.left) / rect.width) * 100;
    x.set(Math.min(100, Math.max(0, percent)));
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden select-none touch-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* After image (bottom layer, fully visible) */}
      <img
        src={afterSrc}
        alt={afterLabel}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        draggable={false}
        style={{ userSelect: 'none', WebkitUserDrag: 'none' }}
      />
      <span className="absolute bottom-4 right-4 bg-black/70 text-white text-[13px] px-3 py-2 rounded-full font-medium z-12">
        {afterLabel}
      </span>

      {/* Before image (top layer, clipped by drag position) */}
      <motion.div
        className="absolute inset-0 z-1"
        style={{ clipPath }}
      >
        <img
          src={beforeSrc}
          alt={beforeLabel}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          draggable={false}
          style={{ userSelect: 'none', WebkitUserDrag: 'none' }}
        />
        <span className="absolute bottom-4 left-4 bg-black/70 text-white text-[13px] px-3 py-2 rounded-full font-medium">
          {beforeLabel}
        </span>
      </motion.div>

      {/* Vertical white divider - separate from clipped layer */}
      <motion.div
        style={{ left: useTransform(x, (v) => `${v}%`) }}
        className="absolute top-0 bottom-0 w-[3px] bg-white -translate-x-1/2 pointer-events-none z-10"
      />

      {/* Draggable handle - separate from clipped layer */}
      <motion.div
        style={{ left: useTransform(x, (v) => `${v}%`) }}
        className="absolute top-0 bottom-0 w-1 cursor-ew-resize -translate-x-1/2 flex items-center justify-center z-11"
      >
        <div className="w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center border-2 border-white/50 pointer-events-none">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2C6035" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8L22 12L18 16" />
            <path d="M6 8L2 12L6 16" />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}
