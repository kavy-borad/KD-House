import { useEffect, useRef } from "react";

/**
 * Isolated GPU-friendly Canvas background rendering a clean light architectural
 * blueprint grid with crisp `+` intersection crosshairs, subtle traveling ambient
 * light wave, gentle fine-pointer parallax, intersection/visibility pausing, and
 * full prefers-reduced-motion fallback.
 */
const HeroArchitectureBg = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const finePointerQuery = window.matchMedia("(pointer: fine)");

    let width = 0;
    let height = 0;
    let dpr = 1;
    let rafId = 0;
    let isRunning = false;
    let isVisible = true;
    let lastTimestamp = 0;
    let simTime = 0;

    // Smoothed mouse parallax state (kept outside React state to avoid re-renders)
    let targetMouseX = 0;
    let targetMouseY = 0;
    let smoothMouseX = 0;
    let smoothMouseY = 0;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      const isMobile = width < 768;
      dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawFrame = (time: number) => {
      if (width === 0 || height === 0) return;

      const isMobile = width < 768;
      ctx.clearRect(0, 0, width, height);

      // 6 big architectural columns on desktop (3 on mobile)
      const colCount = isMobile ? 3 : 6;
      const colWidth = width / colCount;
      const rowHeight = isMobile ? colWidth : Math.max(colWidth, height / 3);
      const crossHalf = isMobile ? 5 : 6.5;

      const cols = colCount + 2;
      const rows = Math.ceil(height / rowHeight) + 2;
      const baseOriginX = 0;
      const baseOriginY = isMobile ? (height % rowHeight) * 0.5 : 0;
      const offsetX = baseOriginX + smoothMouseX * 8;
      const offsetY = baseOriginY + smoothMouseY * 6;

      // Subtle traveling light wave coordinates (diagonal drift)
      const wavePos = ((time * 0.14) % 2.2) - 0.6;

      // 1. Soft atmospheric ambient wash (subtle pale blue-indigo corners)
      const topLeftGlow = ctx.createRadialGradient(
        width * 0.12 + smoothMouseX * 10,
        height * 0.18 + smoothMouseY * 8,
        0,
        width * 0.12,
        height * 0.18,
        Math.max(width, height) * 0.55,
      );
      topLeftGlow.addColorStop(0, "rgba(219, 234, 254, 0.42)");
      topLeftGlow.addColorStop(0.55, "rgba(239, 246, 255, 0.16)");
      topLeftGlow.addColorStop(1, "rgba(248, 250, 252, 0)");
      ctx.fillStyle = topLeftGlow;
      ctx.fillRect(0, 0, width, height);

      const bottomRightGlow = ctx.createRadialGradient(
        width * 0.86 - smoothMouseX * 12,
        height * 0.78 - smoothMouseY * 10,
        0,
        width * 0.86,
        height * 0.78,
        Math.max(width, height) * 0.52,
      );
      bottomRightGlow.addColorStop(0, "rgba(224, 231, 255, 0.52)");
      bottomRightGlow.addColorStop(0.5, "rgba(219, 234, 254, 0.22)");
      bottomRightGlow.addColorStop(1, "rgba(248, 250, 252, 0)");
      ctx.fillStyle = bottomRightGlow;
      ctx.fillRect(0, 0, width, height);

      // 2. Crisp 1px architectural grid lines
      ctx.save();
      ctx.strokeStyle = "rgba(148, 163, 184, 0.14)";
      ctx.lineWidth = 1;
      ctx.beginPath();

      for (let c = -1; c <= cols; c++) {
        const x = Math.round(offsetX + c * colWidth) + 0.5;
        if (x < -colWidth || x > width + colWidth) continue;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }

      for (let r = -1; r <= rows; r++) {
        const y = Math.round(offsetY + r * rowHeight) + 0.5;
        if (y < -rowHeight || y > height + rowHeight) continue;
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // 3. Crisp `+` crosshairs at grid intersections with gentle light wave
      ctx.lineCap = "round";
      ctx.lineWidth = 1.35;

      for (let c = -1; c <= cols; c++) {
        const x = Math.round(offsetX + c * colWidth) + 0.5;
        if (x < 6 || x > width - 6) continue;

        for (let r = -1; r <= rows; r++) {
          const y = Math.round(offsetY + r * rowHeight) + 0.5;
          if (y < 6 || y > height - 6) continue;

          // Subtle diagonal illumination pulse across intersections
          const diagNorm = x / width * 0.65 + y / height * 0.35;
          const dist = Math.abs(diagNorm - wavePos);
          const highlight = Math.max(0, 1 - dist / 0.28);

          const rCol = Math.round(148 - highlight * 89);
          const gCol = Math.round(163 - highlight * 33);
          const bCol = Math.round(184 + highlight * 62);
          const alpha = 0.42 + highlight * 0.30;

          ctx.strokeStyle = `rgba(${rCol}, ${gCol}, ${bCol}, ${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(x - crossHalf, y);
          ctx.lineTo(x + crossHalf, y);
          ctx.moveTo(x, y - crossHalf);
          ctx.lineTo(x, y + crossHalf);
          ctx.stroke();
        }
      }

      ctx.restore();
    };

    const tick = (timestamp: number) => {
      if (!isRunning) return;

      if (lastTimestamp === 0) lastTimestamp = timestamp;
      const dt = Math.min(48, timestamp - lastTimestamp);
      lastTimestamp = timestamp;
      simTime += dt * 0.00055;

      smoothMouseX += (targetMouseX - smoothMouseX) * 0.045;
      smoothMouseY += (targetMouseY - smoothMouseY) * 0.045;

      drawFrame(simTime);
      rafId = window.requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (reducedMotionQuery.matches || !isVisible || document.hidden) {
        drawFrame(simTime);
        return;
      }
      if (!isRunning) {
        isRunning = true;
        lastTimestamp = 0;
        rafId = window.requestAnimationFrame(tick);
      }
    };

    const stopLoop = () => {
      isRunning = false;
      if (rafId) {
        window.cancelAnimationFrame(rafId);
        rafId = 0;
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (reducedMotionQuery.matches || !finePointerQuery.matches) return;
      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      targetMouseX = Math.max(-1, Math.min(1, normX));
      targetMouseY = Math.max(-1, Math.min(1, normY));
    };

    const handlePointerLeave = () => {
      targetMouseX = 0;
      targetMouseY = 0;
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopLoop();
      } else {
        startLoop();
      }
    };

    const handleReducedMotionChange = () => {
      if (reducedMotionQuery.matches) {
        stopLoop();
        targetMouseX = 0;
        targetMouseY = 0;
        smoothMouseX = 0;
        smoothMouseY = 0;
        drawFrame(0.35);
      } else {
        startLoop();
      }
    };

    resize();
    drawFrame(0.35);

    const resizeObserver = new ResizeObserver(() => {
      resize();
      drawFrame(simTime || 0.35);
    });
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
        if (isVisible) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0.02 },
    );
    intersectionObserver.observe(container);

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    container.addEventListener("pointerleave", handlePointerLeave);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    reducedMotionQuery.addEventListener("change", handleReducedMotionChange);

    startLoop();

    return () => {
      stopLoop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      reducedMotionQuery.removeEventListener(
        "change",
        handleReducedMotionChange,
      );
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#f8fafc]"
    >
      {/* Static light fallback gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 85% 80%, rgba(219, 234, 254, 0.45), rgba(248, 250, 252, 0.9) 70%)",
        }}
      />

      {/* Architectural Grid & Animated Crosshairs */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />

      {/* Soft fade into the white section below */}
      <div
        className="absolute inset-x-0 bottom-0 h-20 md:h-28 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.95) 100%)",
        }}
      />
    </div>
  );
};

export default HeroArchitectureBg;

