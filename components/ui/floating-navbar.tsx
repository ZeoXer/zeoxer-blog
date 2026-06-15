"use client";

import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";

export const FloatingNav = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);

  useMotionValueEvent(scrollY, "change", (current) => {
    if (typeof current !== "number") return;

    if (current < 80) {
      // Near the top: always visible
      setVisible(true);
    } else if (current > lastY) {
      // Scrolling down
      setVisible(false);
    } else {
      // Scrolling up
      setVisible(true);
    }
    setLastY(current);
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{ y: visible ? 0 : -120, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className={cn(
          "fixed top-4 inset-x-0 mx-auto z-[5000] w-[95%] max-w-7xl",
          "rounded-2xl border border-default-200/60 dark:border-default-100/60",
          "bg-white/80 dark:bg-black/60 backdrop-blur-md shadow-lg",
          "px-4 py-2",
          className
        )}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
