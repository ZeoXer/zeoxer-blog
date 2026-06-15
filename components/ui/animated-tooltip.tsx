"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

export type AnimatedTooltipItem = {
  id: string | number;
  name: string;
  designation?: string;
  href?: string;
  external?: boolean;
  icon: React.ReactNode;
};

export const AnimatedTooltip = ({
  items,
  className,
}: {
  items: AnimatedTooltipItem[];
  className?: string;
}) => {
  const [hoveredId, setHoveredId] = useState<string | number | null>(null);
  const x = useMotionValue(0);
  const springConfig = { stiffness: 100, damping: 5 };
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-25, 25]),
    springConfig
  );
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-25, 25]),
    springConfig
  );

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.currentTarget as HTMLElement;
    const halfWidth = target.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {items.map((item) => {
        const content = (
          <span
            className="relative inline-flex"
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
            onMouseMove={handleMouseMove}
          >
            <AnimatePresence mode="popLayout">
              {hoveredId === item.id && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.6 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { type: "spring", stiffness: 260, damping: 10 },
                  }}
                  exit={{ opacity: 0, y: 20, scale: 0.6 }}
                  style={{ translateX, rotate, whiteSpace: "nowrap" }}
                  className="absolute -top-14 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center justify-center rounded-md bg-black/90 px-3 py-1.5 text-xs shadow-xl"
                >
                  <div className="absolute inset-x-2 -bottom-px z-30 h-px w-1/2 bg-gradient-to-r from-transparent via-warning to-transparent" />
                  <div className="absolute -bottom-px left-2 z-30 h-px w-1/3 bg-gradient-to-r from-transparent via-orange-400 to-transparent" />
                  <div className="relative z-30 text-sm font-semibold text-white">
                    {item.name}
                  </div>
                  {item.designation && (
                    <div className="text-[10px] text-white/70">
                      {item.designation}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <span className="block text-default-800 hover:text-warning transition-colors">
              {item.icon}
            </span>
          </span>
        );

        return item.href ? (
          <a
            key={item.id}
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
            className="inline-flex"
          >
            {content}
          </a>
        ) : (
          <span key={item.id}>{content}</span>
        );
      })}
    </div>
  );
};
