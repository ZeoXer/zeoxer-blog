"use client";

import { useTheme } from "next-themes";
import { SparklesCore } from "@/components/ui/sparkles";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { Spotlight } from "@/components/ui/spotlight";

interface MainBannerProps {
  title: string;
  description?: string;
}

export const MainBanner = ({ title, description }: MainBannerProps) => {
  const { theme, resolvedTheme } = useTheme();
  const isDark = theme === "dark" || resolvedTheme === "dark";

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden bg-white dark:bg-black transition-colors duration-500">
      {/* Spotlight from top-left */}
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill={isDark ? "white" : "#fb923c"}
      />

      {/* Sparkles particle field */}
      <div className="absolute inset-0 h-full w-full">
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1.2}
          particleDensity={120}
          particleColor={isDark ? "#fdba74" : "#7c2d12"}
        />
      </div>

      {/* Gradient mask for vignette */}
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] bg-white dark:bg-black"></div>

      <div className="z-10 relative text-center px-6 w-full lg:w-[80%] xl:w-[60%] max-w-4xl mx-auto">
        <div className="glass-panel p-8 md:p-12 rounded-2xl border border-slate-200/40 dark:border-slate-800/40 bg-white/40 dark:bg-black/40 backdrop-blur-md shadow-xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight pb-2 bg-gradient-to-r from-slate-800 via-orange-600 to-amber-600 dark:from-slate-100 dark:via-orange-400 dark:to-amber-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
            {title}
          </h1>

          <div className="h-px w-24 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto my-6"></div>

          {description && (
            <TypewriterEffect
              words={[{ text: description }]}
              className="text-base sm:text-lg md:text-lg lg:text-xl text-slate-600 dark:text-slate-300 font-light leading-relaxed font-mono"
              cursorClassName="bg-orange-500 h-4 md:h-5 lg:h-5"
            />
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient {
          animation: gradient 6s ease infinite;
        }
      `}</style>
    </div>
  );
};
