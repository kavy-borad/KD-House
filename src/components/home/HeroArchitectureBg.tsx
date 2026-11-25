import { useEffect, useRef } from "react";

/**
 * Static light architectural blueprint grid background with crisp `+` intersection
 * crosshairs and soft corner ambient gradients. Redraws only on container resize.
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

    const drawGrid = () => {
      const rect = container.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));
      const isMobile = width < 768;
      const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      // 6 big architectural columns on desktop (3 on mobile)
      const colCount = isMobile ? 3 : 6;
      const colWidth = width / colCount;
      const rowHeight = isMobile ? colWidth : Math.max(colWidth, height / 3);
      const crossHalf = isMobile ? 5 : 6.5;

      const cols = colCount + 1;
      const rows = Math.ceil(height / rowHeight) + 1;
      const offsetX = 0;
      const offsetY = isMobile ? (height % rowHeight) * 0.5 : 0;

      // 1. Clean white left side; subtle low-opacity gradient on the right half only
      const rightHalfWash = ctx.createLinearGradient(width * 0.48, 0, width, height * 0.85);
      rightHalfWash.addColorStop(0, "rgba(255, 255, 255, 0)");
      rightHalfWash.addColorStop(0.45, "rgba(219, 234, 254, 0.20)");
      rightHalfWash.addColorStop(0.8, "rgba(199, 210, 254, 0.24)");
      rightHalfWash.addColorStop(1, "rgba(221, 214, 254, 0.26)");
      ctx.fillStyle = rightHalfWash;
      ctx.fillRect(0, 0, width, height);

      const rightFocusGlow = ctx.createRadialGradient(
        width * 0.86,
        height * 0.46,
        0,
        width * 0.86,
        height * 0.46,
        Math.max(width, height) * 0.42,
      );
      rightFocusGlow.addColorStop(0, "rgba(99, 102, 241, 0.08)");
      rightFocusGlow.addColorStop(0.45, "rgba(56, 189, 248, 0.05)");
      rightFocusGlow.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = rightFocusGlow;
      ctx.fillRect(width * 0.45, 0, width * 0.55, height);

      // 2. Crisp 1px static architectural grid lines
      ctx.save();
      ctx.strokeStyle = "rgba(148, 163, 184, 0.14)";
      ctx.lineWidth = 1;
      ctx.beginPath();

      for (let c = 0; c <= cols; c++) {
        const x = Math.round(offsetX + c * colWidth) + 0.5;
        if (x < 0 || x > width) continue;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }

      for (let r = 0; r <= rows; r++) {
        const y = Math.round(offsetY + r * rowHeight) + 0.5;
        if (y < 0 || y > height) continue;
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // 3. Static `+` crosshairs at inner grid intersections
      ctx.lineCap = "round";
      ctx.lineWidth = 1.35;
      ctx.strokeStyle = "rgba(148, 163, 184, 0.48)";
      ctx.beginPath();

      for (let c = 0; c <= cols; c++) {
        const x = Math.round(offsetX + c * colWidth) + 0.5;
        if (x < 6 || x > width - 6) continue;

        for (let r = 0; r <= rows; r++) {
          const y = Math.round(offsetY + r * rowHeight) + 0.5;
          if (y < 6 || y > height - 6) continue;

          ctx.moveTo(x - crossHalf, y);
          ctx.lineTo(x + crossHalf, y);
          ctx.moveTo(x, y - crossHalf);
          ctx.lineTo(x, y + crossHalf);
        }
      }
      ctx.stroke();
      ctx.restore();
    };

    drawGrid();

    const resizeObserver = new ResizeObserver(drawGrid);
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-white"
    >
      {/* Static fallback: clean white left side, soft gradient on right half */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, #ffffff 50%, rgba(219, 234, 254, 0.20) 78%, rgba(224, 231, 255, 0.26) 100%)",
        }}
      />

      {/* Static Architectural Grid & Crosshairs */}
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
