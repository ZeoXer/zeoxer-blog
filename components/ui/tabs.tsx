"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type Tab = {
  title: string;
  value: string;
  content?: React.ReactNode;
};

export const AnimatedTabs = ({
  tabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}: {
  tabs: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
}) => {
  const [active, setActive] = useState<string>(tabs[0]?.value);

  return (
    <div className="w-full">
      <div
        className={cn(
          "flex flex-row items-center justify-start [perspective:1000px] relative overflow-auto sm:overflow-visible no-visible-scrollbar max-w-full w-full",
          containerClassName
        )}
      >
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActive(tab.value)}
            className={cn(
              "relative px-4 py-2 rounded-full",
              tabClassName
            )}
            style={{ transformStyle: "preserve-3d" }}
          >
            {active === tab.value && (
              <motion.div
                layoutId="clickedbutton"
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                className={cn(
                  "absolute inset-0 bg-warning/20 dark:bg-warning/15 rounded-full",
                  activeTabClassName
                )}
              />
            )}
            <span
              className={cn(
                "relative block",
                active === tab.value
                  ? "text-warning font-semibold"
                  : "text-default-700 dark:text-default-500"
              )}
            >
              {tab.title}
            </span>
          </button>
        ))}
      </div>
      <div className={cn("mt-6", contentClassName)}>
        {tabs.find((t) => t.value === active)?.content}
      </div>
    </div>
  );
};
