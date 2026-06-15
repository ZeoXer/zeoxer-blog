"use client";

import { useEffect, useState } from "react";
import { ArrowUpIcon } from "./icons";
import { MagneticButton } from "@/components/ui/magnetic-button";

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsVisible(scrollTop > 2000);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <MagneticButton
      onClick={scrollToTop}
      strength={0.5}
      className={`fixed bottom-8 right-10 z-10 h-14 w-14 rounded-full bg-warning text-white shadow-lg hover:shadow-warning/40 transition-opacity ${
        isVisible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-label="回到頂端"
    >
      <ArrowUpIcon className="w-6" />
    </MagneticButton>
  );
};
