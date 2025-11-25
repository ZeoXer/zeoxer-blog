"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@heroui/button";
import { ArrowUpIcon } from "./icons";

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsVisible(scrollTop > 2000);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Button
      onPress={scrollToTop}
      className={`fixed bottom-8 right-10 z-10 transition ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      size="lg"
      isIconOnly
      radius="full"
      color="warning"
    >
      <ArrowUpIcon className="w-6" />
    </Button>
  );
};
