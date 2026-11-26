import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface RewriteParagraphProps {
  text: string;
  active: boolean;
  completed?: boolean;
  onComplete?: () => void;
  caretClassName?: string;
  className?: string;
}

/**
 * Displays the full paragraph immediately at low opacity as a ghost guide,
 * then calmly sweeps crisp full-opacity text across it strictly when `active`
 * becomes true, notifying `onComplete` so sibling cards trigger one by one.
 */
const RewriteParagraph = ({
  text,
  active,
  completed = false,
  onComplete,
  caretClassName = "bg-[#2f8ecd]",
  className = "",
}: RewriteParagraphProps) => {
  const shouldReduceMotion = !!useReducedMotion();
  const [visibleCount, setVisibleCount] = useState<number>(() =>
    shouldReduceMotion || completed ? text.length : 0,
  );
  const [isWriting, setIsWriting] = useState<boolean>(false);
  const completedRef = useRef<boolean>(shouldReduceMotion || completed);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (shouldReduceMotion || completed) {
      completedRef.current = true;
      setVisibleCount(text.length);
      setIsWriting(false);
      return;
    }

    if (!active || completedRef.current) return;

    let cancelled = false;
    let rafId = 0;

    setIsWriting(true);
    const startTime = performance.now();
    // Calm, deliberate rewrite speed (~46 chars/sec -> ~2.4s per card)
    const charsPerMs = 0.046;

    const step = (now: number) => {
      if (cancelled) return;
      const elapsed = now - startTime;
      const nextCount = Math.min(text.length, Math.floor(elapsed * charsPerMs));
      setVisibleCount(nextCount);

      if (nextCount < text.length) {
        rafId = window.requestAnimationFrame(step);
      } else {
        completedRef.current = true;
        setIsWriting(false);
        onCompleteRef.current?.();
      }
    };

    rafId = window.requestAnimationFrame(step);

    return () => {
      cancelled = true;
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [active, completed, shouldReduceMotion, text]);

  const writtenText = text.slice(0, visibleCount);
  const remainingText = text.slice(visibleCount);

  return (
    <div aria-label={text} className={className}>
      <p>
        <span className="text-gray-600">{writtenText}</span>
        {isWriting && (
          <span
            aria-hidden="true"
            className={`inline-block w-[2px] h-[0.95em] align-middle rounded-full animate-pulse ${caretClassName}`}
          />
        )}
        {remainingText && (
          <span className="text-gray-400 opacity-35">{remainingText}</span>
        )}
      </p>
    </div>
  );
};

export default RewriteParagraph;
