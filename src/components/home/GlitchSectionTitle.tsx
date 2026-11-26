import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

const STEP_DURATION_MS = 120;
const STEP_COUNT = 4;
const CHAR_POOL = "0123456789ABCDEFGHJKLMNPQRSTUVWXYZ";

interface GlitchPose {
  active: boolean;
  mainX: number;
  skewDeg: number;
  topX: number;
  topClip: string;
  bottomX: number;
  bottomClip: string;
}

const GLITCH_POSES: Omit<GlitchPose, "active">[] = [
  {
    mainX: -2,
    skewDeg: -3,
    topX: 4,
    topClip: "inset(10% 0 56% 0)",
    bottomX: -4,
    bottomClip: "inset(58% 0 8% 0)",
  },
  {
    mainX: 2,
    skewDeg: 2.5,
    topX: -4,
    topClip: "inset(24% 0 42% 0)",
    bottomX: 3,
    bottomClip: "inset(62% 0 6% 0)",
  },
  {
    mainX: -1.5,
    skewDeg: -2,
    topX: 3.5,
    topClip: "inset(16% 0 50% 0)",
    bottomX: -3,
    bottomClip: "inset(54% 0 12% 0)",
  },
];

const REST_POSE: GlitchPose = {
  active: false,
  mainX: 0,
  skewDeg: 0,
  topX: 0,
  topClip: "inset(0 0 0 0)",
  bottomX: 0,
  bottomClip: "inset(0 0 0 0)",
};

const buildAlphanumTokens = (word: string): string[] => {
  const tokens: string[] = [];
  for (let step = 0; step < STEP_COUNT; step++) {
    let token = "";
    for (let i = 0; i < word.length; i++) {
      const code = word.charCodeAt(i);
      const isDigit = (step + i) % 2 === 0;
      if (isDigit) {
        token += String((code * (step + 3) + i * 7) % 10);
      } else {
        const idx = (code * (step + 5) + i * 11 + step * 13) % (CHAR_POOL.length - 10);
        token += CHAR_POOL[10 + idx];
      }
    }
    tokens.push(token);
  }
  return tokens;
};

interface GlitchWordProps {
  word: string;
  className?: string;
}

/**
 * Plays a one-time fixed-width alphanumeric glitch reveal on the given word
 * (~0.48s total) when scrolled into view, then settles permanently on `word`.
 */
export const GlitchWord = ({ word, className = "" }: GlitchWordProps) => {
  const shouldReduceMotion = !!useReducedMotion();
  const wordRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(wordRef, { once: true, amount: 0.45 });

  const tokens = useMemo(() => buildAlphanumTokens(word), [word]);
  const [displayWord, setDisplayWord] = useState<string>(word);
  const [pose, setPose] = useState<GlitchPose>(REST_POSE);

  const timersRef = useRef<number[]>([]);
  const isMountedRef = useRef<boolean>(true);
  const hasAutoPlayedRef = useRef<boolean>(false);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      clearTimers();
    };
  }, [clearTimers]);

  useEffect(() => {
    if (shouldReduceMotion) {
      clearTimers();
      setDisplayWord(word);
      setPose(REST_POSE);
      return;
    }

    if (isInView && !hasAutoPlayedRef.current) {
      hasAutoPlayedRef.current = true;
      clearTimers();

      tokens.forEach((token, idx) => {
        const t = window.setTimeout(() => {
          if (!isMountedRef.current) return;
          const nextPose = GLITCH_POSES[idx % GLITCH_POSES.length];
          setDisplayWord(token);
          setPose({ ...nextPose, active: true });
        }, idx * STEP_DURATION_MS);
        timersRef.current.push(t);
      });

      const finishTimer = window.setTimeout(() => {
        if (!isMountedRef.current) return;
        setDisplayWord(word);
        setPose(REST_POSE);
      }, tokens.length * STEP_DURATION_MS);

      timersRef.current.push(finishTimer);
    }
  }, [clearTimers, isInView, shouldReduceMotion, tokens, word]);

  return (
    <span
      ref={wordRef}
      aria-label={word}
      className={`relative inline-block align-baseline ${className}`}
    >
      <span aria-hidden="true" className="invisible">
        {word}
      </span>

      <span
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center whitespace-nowrap"
        style={
          pose.active
            ? {
                transform: `translateX(${pose.mainX}px) skewX(${pose.skewDeg}deg)`,
              }
            : undefined
        }
      >
        {displayWord}
      </span>

      {pose.active && (
        <>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center whitespace-nowrap text-cyan-500/80 mix-blend-multiply"
            style={{
              clipPath: pose.topClip,
              transform: `translateX(${pose.topX}px)`,
            }}
          >
            {displayWord}
          </span>

          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center whitespace-nowrap text-indigo-600/75 mix-blend-multiply"
            style={{
              clipPath: pose.bottomClip,
              transform: `translateX(${pose.bottomX}px)`,
            }}
          >
            {displayWord}
          </span>
        </>
      )}
    </span>
  );
};

interface GlitchSectionTitleProps {
  leadText?: string;
  accentText?: string;
  className?: string;
}

/**
 * Section heading wrapper where only the lead word plays a one-time
 * alphanumeric glitch reveal while the accent word stays static.
 */
const GlitchSectionTitle = ({
  leadText = "Our",
  accentText = "Services",
  className = "",
}: GlitchSectionTitleProps) => (
  <h2
    className={`text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight ${className}`}
  >
    <GlitchWord word={leadText} />{" "}
    <span className="text-[#2f8ecd]">{accentText}</span>
  </h2>
);

export default GlitchSectionTitle;
