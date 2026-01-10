"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

interface MainBannerProps {
  title: string;
  description?: string;
}

const themes = {
  dark: {
    particleColor: "rgba(253, 186, 116, 0.7)",
    lineColor: "rgba(249, 115, 22, 0.2)",
    mouseLineColor: "rgba(255, 237, 213, 0.5)",
  },
  light: {
    particleColor: "rgba(124, 45, 18, 0.5)",
    lineColor: "rgba(234, 88, 12, 0.15)",
    mouseLineColor: "rgba(67, 20, 7, 0.4)",
  },
};

const config = {
  defaultSpeed: 0.3,
  variantSpeed: 0.5,
  linkRadius: 140,
  mouseRadius: 180,
};

export const MainBanner = ({ title, description }: MainBannerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const typewriterRef = useRef<HTMLSpanElement>(null);

  const { theme, resolvedTheme } = useTheme();
  const currentThemeMode =
    theme === "dark" || resolvedTheme === "dark" ? "dark" : "light";

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let animationFrameId: number;
    let mouse = { x: -1000, y: -1000 };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * config.defaultSpeed;
        this.vy = (Math.random() - 0.5) * config.defaultSpeed;
        this.size = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // 邊界檢查
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // 滑鼠互動
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < config.mouseRadius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (config.mouseRadius - distance) / config.mouseRadius;
          const directionX = forceDirectionX * force * 0.5;
          const directionY = forceDirectionY * force * 0.5;

          this.x += directionX;
          this.y += directionY;
        }
      }

      draw(themeConfig: typeof themes.dark) {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = themeConfig.particleColor;
        ctx.fill();
      }
    }

    const initCanvas = () => {
      width = container.clientWidth;
      height = container.clientHeight;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      let particleAmount = Math.floor((width * height) / 9000);
      if (particleAmount > 100) particleAmount = 100;

      particles = [];
      for (let i = 0; i < particleAmount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      const themeConfig = themes[currentThemeMode];

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(themeConfig);

        for (let j = i; j < particles.length; j++) {
          let dx = particles[i].x - particles[j].x;
          let dy = particles[i].y - particles[j].y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < config.linkRadius) {
            ctx.beginPath();
            let opacity = 1 - distance / config.linkRadius;
            const colorBase = themeConfig.lineColor.substring(
              0,
              themeConfig.lineColor.lastIndexOf(",")
            );
            ctx.strokeStyle = `${colorBase}, ${opacity * 0.4})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }

        let dxMouse = particles[i].x - mouse.x;
        let dyMouse = particles[i].y - mouse.y;
        let distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < config.linkRadius) {
          ctx.beginPath();
          let opacity = 1 - distMouse / config.linkRadius;
          const mouseColorBase = themeConfig.mouseLineColor.substring(
            0,
            themeConfig.mouseLineColor.lastIndexOf(",")
          );
          ctx.strokeStyle = `${mouseColorBase}, ${opacity * 0.5})`;
          ctx.lineWidth = 1;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      initCanvas();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.touches[0].clientX - rect.left;
        mouse.y = e.touches[0].clientY - rect.top;
      }
    };

    const handleMouseOut = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", handleResize);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("touchmove", handleTouchMove);
    container.addEventListener("mouseleave", handleMouseOut);

    initCanvas();
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("mouseleave", handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentThemeMode]);

  useEffect(() => {
    const textToType = description as string;
    const span = typewriterRef.current;
    if (!span) return;

    let typeIndex = 0;
    let typeSpeed = 100;
    let timeoutId: NodeJS.Timeout;

    span.textContent = "";

    const typeWriter = () => {
      if (typeIndex < textToType.length) {
        span.textContent += textToType.charAt(typeIndex);
        typeIndex++;
        let randomSpeed = typeSpeed + (Math.random() * 50 - 25);
        timeoutId = setTimeout(typeWriter, randomSpeed);
      }
    };

    timeoutId = setTimeout(typeWriter, 500);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[500px] flex items-center justify-center overflow-hidden bg-white dark:bg-black transition-colors duration-500"
    >
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
      />

      <div className="z-10 relative text-center px-6 w-[60%] max-w-4xl mx-auto">
        <div className="glass-panel p-8 md:p-12 rounded-2xl animate-fade-in-up border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-black/60 backdrop-blur-md shadow-xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight pb-2 bg-gradient-to-r from-slate-800 via-orange-600 to-amber-600 dark:from-slate-100 dark:via-orange-400 dark:to-amber-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
            {title}
          </h1>

          <div className="h-px w-24 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto my-6"></div>

          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 font-light leading-relaxed min-h-[3rem]">
            <span
              ref={typewriterRef}
              className="font-mono text-slate-800 dark:text-slate-200 after:content-['|'] after:animate-pulse after:text-orange-500"
            ></span>
          </p>
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
