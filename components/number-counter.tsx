"use client";

import { useEffect, useRef } from "react";
import {
  useInView,
  useMotionValue,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";

type NumberCounterProps = {
  endNumber: number;
  duration?: number;
};

const NumberCounter: React.FC<NumberCounterProps> = ({
  endNumber,
  duration = 1.2,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    duration: duration * 1000,
    bounce: 0,
  });

  useEffect(() => {
    if (inView) {
      motionValue.set(endNumber);
    }
  }, [inView, endNumber, motionValue]);

  useMotionValueEvent(spring, "change", (latest) => {
    if (ref.current) {
      ref.current.textContent = Math.round(latest).toLocaleString("en-US");
    }
  });

  return <span ref={ref}>0</span>;
};

export default NumberCounter;
