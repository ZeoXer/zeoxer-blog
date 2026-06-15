"use client";

import { useEffect, useRef } from "react";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "0px 0px -10% 0px" });
  const tokens = words.split(/(\s+)/);

  useEffect(() => {
    if (!inView) return;
    animate(
      "span.token",
      { opacity: 1, filter: filter ? "blur(0px)" : "none" },
      { duration, delay: stagger(0.05) }
    );
  }, [inView, animate, filter, duration]);

  return (
    <div ref={containerRef} className={cn("w-full", className)}>
      <motion.div ref={scope} className="leading-relaxed">
        {tokens.map((token, idx) => {
          if (/^\s+$/.test(token)) {
            return <span key={idx}>{token}</span>;
          }
          return (
            <motion.span
              key={idx}
              className="token text-default-700 dark:text-default-600 opacity-0 inline-block"
              style={{ filter: filter ? "blur(8px)" : "none" }}
            >
              {token}
            </motion.span>
          );
        })}
      </motion.div>
    </div>
  );
};
