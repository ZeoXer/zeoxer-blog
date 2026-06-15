"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface LensProps {
  children: React.ReactNode;
  zoomFactor?: number;
  lensSize?: number;
  isStatic?: boolean;
  position?: { x: number; y: number };
  className?: string;
  ariaLabel?: string;
}

export const Lens = ({
  children,
  zoomFactor = 1.5,
  lensSize = 170,
  isStatic = false,
  position = { x: 200, y: 150 },
  className,
  ariaLabel,
}: LensProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [hovering, setHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const pos = isStatic ? position : mousePos;
  const show = isStatic || hovering;

  return (
    <div
      ref={ref}
      role="img"
      aria-label={ariaLabel}
      className={cn("relative overflow-hidden rounded-full", className)}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onMouseMove={handleMouseMove}
    >
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-none absolute z-50 overflow-hidden rounded-full"
            style={{
              maskImage: `radial-gradient(circle ${lensSize / 2}px at ${pos.x}px ${pos.y}px, black 100%, transparent 100%)`,
              WebkitMaskImage: `radial-gradient(circle ${lensSize / 2}px at ${pos.x}px ${pos.y}px, black 100%, transparent 100%)`,
              inset: 0,
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                transform: `scale(${zoomFactor})`,
                transformOrigin: `${pos.x}px ${pos.y}px`,
              }}
            >
              {children}
            </div>
            {/* Lens ring */}
            <div
              className="pointer-events-none absolute rounded-full border-2 border-warning/70 shadow-[0_0_20px_rgba(251,146,60,0.45)]"
              style={{
                width: lensSize,
                height: lensSize,
                left: pos.x - lensSize / 2,
                top: pos.y - lensSize / 2,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
