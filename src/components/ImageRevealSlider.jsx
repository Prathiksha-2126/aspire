import { useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

export default function ImageRevealSlider({ beforeImage, afterImage, beforeLabel = "Before", afterLabel = "After" }) {
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(50);
  const xPercent = useTransform(x, [0, 100], [0, 100]);
  const springX = useSpring(x, { stiffness: 400, damping: 30 });

  const handleDragStart = () => setIsDragging(true);
  const handleDragEnd = () => setIsDragging(false);

  return (
    <div className="relative w-full aspect-video rounded-[10.65px] overflow-hidden select-none cursor-ew-resize">
      {/* Before Image (Background) */}
      <img
        src={beforeImage}
        alt="Before"
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Before Label */}
      <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-md text-sm font-semibold z-10">
        {beforeLabel}
      </div>

      {/* After Image (Overlay with clip) */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - xPercent.get()}% 0 0)` }}
      >
        <img
          src={afterImage}
          alt="After"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ left: `-${100 - xPercent.get()}%` }}
        />
      </motion.div>

      {/* After Label */}
      <div className="absolute top-4 right-4 bg-[#2C6035]/80 text-white px-3 py-1 rounded-md text-sm font-semibold z-10">
        {afterLabel}
      </div>

      {/* Draggable Handle */}
      <motion.div
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20"
        style={{ left: `${xPercent.get()}%`, x: springX }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        dragMomentum={false}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {/* Handle Circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
          <motion.div
            className="flex gap-1"
            animate={isDragging ? { x: [0, 5, 0] } : { x: 0 }}
            transition={{ duration: 0.3, repeat: isDragging ? Infinity : 0 }}
          >
            <div className="w-1 h-4 bg-gray-400 rounded-full" />
            <div className="w-1 h-4 bg-gray-400 rounded-full" />
          </motion.div>
        </div>
      </motion.div>

      {/* Drag Instructions */}
      {!isDragging && (
        <motion.div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm z-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          Drag to compare
        </motion.div>
      )}
    </div>
  );
}
