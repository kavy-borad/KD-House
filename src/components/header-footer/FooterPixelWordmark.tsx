import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

// 5-row rounded-square pixel matrices for clean legibility
const GLYPHS: Record<string, number[][]> = {
  K: [
    [1, 0, 0, 1],
    [1, 0, 1, 0],
    [1, 1, 0, 0],
    [1, 0, 1, 0],
    [1, 0, 0, 1],
  ],
  A: [
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
  ],
  R: [
    [1, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 1, 1, 0],
    [1, 0, 1, 0],
    [1, 0, 0, 1],
  ],
  M: [
    [1, 0, 0, 0, 1],
    [1, 1, 0, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
  D: [
    [1, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 0],
  ],
  U: [
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [0, 1, 1, 0],
  ],
  E: [
    [1, 1, 1],
    [1, 0, 0],
    [1, 1, 0],
    [1, 0, 0],
    [1, 1, 1],
  ],
  I: [
    [1, 1, 1],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 1],
  ],
  T: [
    [1, 1, 1],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
  ],
  S: [
    [0, 1, 1, 1],
    [1, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 1],
    [1, 1, 1, 0],
  ],
  O: [
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [0, 1, 1, 0],
  ],
  L: [
    [1, 0, 0],
    [1, 0, 0],
    [1, 0, 0],
    [1, 0, 0],
    [1, 1, 1],
  ],
  N: [
    [1, 0, 0, 1],
    [1, 1, 0, 1],
    [1, 0, 1, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
  ],
};

interface TileRect {
  x: number;
  y: number;
  size: number;
  rx: number;
  tone: "primary" | "sub" | "spark";
}

const layoutWordRow = (
  text: string,
  tileSize: number,
  gap: number,
  letterGapCols: number,
  spaceCols: number,
  startY: number,
  totalWidth: number,
  tone: "primary" | "sub",
) => {
  const step = tileSize + gap;

  let totalCols = 0;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === " ") {
      totalCols += spaceCols;
      continue;
    }
    const matrix = GLYPHS[ch];
    if (!matrix) continue;
    totalCols += matrix[0].length;
    if (i < text.length - 1 && text[i + 1] !== " ") {
      totalCols += letterGapCols;
    }
  }

  const rowPixelW = totalCols * step - gap;
  let cursorX = (totalWidth - rowPixelW) / 2;
  const tiles: TileRect[] = [];

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === " ") {
      cursorX += spaceCols * step;
      continue;
    }
    const matrix = GLYPHS[ch];
    if (!matrix) continue;
    const cols = matrix[0].length;

    for (let r = 0; r < matrix.length; r++) {
      for (let c = 0; c < cols; c++) {
        if (!matrix[r][c]) continue;
        tiles.push({
          x: +(cursorX + c * step).toFixed(2),
          y: +(startY + r * step).toFixed(2),
          size: tileSize,
          rx: +(tileSize * 0.22).toFixed(2),
          tone,
        });
      }
    }

    cursorX +=
      (cols +
        (i < text.length - 1 && text[i + 1] !== " " ? letterGapCols : 0)) *
      step;
  }

  return tiles;
};

const SVG_WIDTH = 1200;
const SVG_HEIGHT = 248;

/**
 * Separated rounded-square pixel-tile footer wordmark for KARMADUDE IT SOLUTIONS:
 * retains the crisp modular block aesthetic with KarmaDude's Navy-to-Sky-Blue sweep,
 * clean full letterforms, and floating upper-corner rising accent pixels.
 */
const FooterPixelWordmark = () => {
  const shouldReduceMotion = !!useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);

  const { row1Tiles, row2Tiles, sparkTiles } = useMemo(() => {
    const r1 = layoutWordRow(
      "KARMADUDE",
      19,
      5,
      1.35,
      3,
      24,
      SVG_WIDTH,
      "primary",
    );
    const r2 = layoutWordRow(
      "IT SOLUTIONS",
      10.5,
      3,
      1.25,
      2.6,
      162,
      SVG_WIDTH,
      "sub",
    );

    // Subtle rising sky-tint accent squares at outer top-left / top-right corners (distinct from bottom drops)
    const sparks: TileRect[] = [
      { x: 18, y: 2, size: 14, rx: 3.2, tone: "spark" },
      { x: 46, y: -4, size: 11, rx: 2.6, tone: "spark" },
      { x: 1138, y: -2, size: 12, rx: 2.8, tone: "spark" },
      { x: 1166, y: 6, size: 16, rx: 3.6, tone: "spark" },
      { x: 1142, y: 184, size: 13, rx: 3, tone: "spark" },
      { x: 44, y: 188, size: 13, rx: 3, tone: "spark" },
    ];

    return { row1Tiles: r1, row2Tiles: r2, sparkTiles: sparks };
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || shouldReduceMotion) return;

    const ctx = gsap.context(() => {
      const mainTiles = wrap.querySelectorAll("[data-kd-tile]");
      const subTiles = wrap.querySelectorAll("[data-kd-subtile]");
      const sparks = wrap.querySelectorAll("[data-kd-spark]");

      gsap.fromTo(
        mainTiles,
        { opacity: 0, scale: 0.55, y: 10, transformOrigin: "50% 50%" },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          stagger: { amount: 0.5, from: "start" },
          ease: "back.out(1.45)",
          scrollTrigger: {
            trigger: wrap,
            start: "top 92%",
            toggleActions: "play none none none",
            invalidateOnRefresh: true,
            refreshPriority: 0,
          },
        },
      );

      gsap.fromTo(
        subTiles,
        { opacity: 0, scale: 0.65, y: 6, transformOrigin: "50% 50%" },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.45,
          stagger: { amount: 0.35, from: "center" },
          ease: "power2.out",
          scrollTrigger: {
            trigger: wrap,
            start: "top 90%",
            toggleActions: "play none none none",
            invalidateOnRefresh: true,
            refreshPriority: 0,
          },
        },
      );

      gsap.fromTo(
        sparks,
        { opacity: 0, scale: 0.4 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: wrap,
            start: "top 90%",
            toggleActions: "play none none none",
            invalidateOnRefresh: true,
            refreshPriority: 0,
          },
        },
      );
    }, wrap);

    const rafId = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      window.cancelAnimationFrame(rafId);
      ctx.revert();
    };
  }, [shouldReduceMotion]);

  return (
    <div
      ref={wrapRef}
      className="relative z-10 max-w-[1400px] mx-auto px-6 pt-5 pb-8 select-none"
    >
      <svg
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
        role="img"
        aria-label="Karmadude IT Solutions"
        className="w-full h-auto overflow-visible"
      >
        <defs>
          {/* Full-wordmark sweep from KarmaDude Deep Navy through Royal Blue to Sky Cyan */}
          <linearGradient
            id="kdBrandBlockSweep"
            gradientUnits="userSpaceOnUse"
            x1="40"
            y1="24"
            x2="1160"
            y2="138"
          >
            <stop offset="0%" stopColor="#001F3F" />
            <stop offset="42%" stopColor="#1D4ED8" />
            <stop offset="76%" stopColor="#2f8ecd" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>

          <linearGradient
            id="kdSubBlockSweep"
            gradientUnits="userSpaceOnUse"
            x1="220"
            y1="162"
            x2="980"
            y2="228"
          >
            <stop offset="0%" stopColor="#334155" />
            <stop offset="50%" stopColor="#1E3A8A" />
            <stop offset="100%" stopColor="#2f8ecd" />
          </linearGradient>
        </defs>

        {/* Primary KARMADUDE rounded pixel blocks */}
        <g>
          {row1Tiles.map((tile, idx) => (
            <rect
              key={`r1-${idx}`}
              data-kd-tile
              x={tile.x}
              y={tile.y}
              width={tile.size}
              height={tile.size}
              rx={tile.rx}
              fill="url(#kdBrandBlockSweep)"
              className="transition-opacity duration-200 hover:opacity-75"
            />
          ))}
        </g>

        {/* Secondary IT SOLUTIONS rounded pixel blocks */}
        <g>
          {row2Tiles.map((tile, idx) => (
            <rect
              key={`r2-${idx}`}
              data-kd-subtile
              x={tile.x}
              y={tile.y}
              width={tile.size}
              height={tile.size}
              rx={tile.rx}
              fill="url(#kdSubBlockSweep)"
              fillOpacity={0.86}
              className="transition-opacity duration-200 hover:opacity-100"
            />
          ))}
        </g>

        {/* Subtle corner accent tiles */}
        <g>
          {sparkTiles.map((tile, idx) => (
            <rect
              key={`sp-${idx}`}
              data-kd-spark
              x={tile.x}
              y={tile.y}
              width={tile.size}
              height={tile.size}
              rx={tile.rx}
              fill={idx % 2 === 0 ? "#BAE6FD" : "#CBD5E1"}
              fillOpacity={0.7}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};

export default FooterPixelWordmark;
