import {
  MascotConfig,
  MascotExpression,
  MascotState,
  ScrollDirection,
  ScrollSpeedBand,
} from "./mascot.types";

export const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

export const classifyScrollSpeed = (
  velocityPxPerSec: number,
  config: MascotConfig,
): ScrollSpeedBand => {
  if (velocityPxPerSec < 25) return "idle";
  if (velocityPxPerSec < config.normalScrollThreshold) return "slow";
  if (velocityPxPerSec < config.fastScrollThreshold) return "normal";
  return "fast";
};

export const getNextBlinkDelay = (config: MascotConfig): number => {
  const span = Math.max(200, config.blinkMaxIntervalMs - config.blinkMinIntervalMs);
  return config.blinkMinIntervalMs + Math.random() * span;
};

/**
 * Computes subtle, tightly bounded SVG pupil offsets from pointer coordinates
 * relative to the mascot center so eye movement looks natural and never creepy.
 */
export const computePupilCursorOffset = (
  clientX: number,
  clientY: number,
  rect: DOMRect,
  maxRadiusX = 2.4,
  maxRadiusY = 1.9,
): { x: number; y: number } => {
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height * 0.45;
  const dx = clientX - centerX;
  const dy = clientY - centerY;
  const distance = Math.hypot(dx, dy);

  if (distance < 1) return { x: 0, y: 0 };

  const falloff = clamp(distance / 260, 0, 1);
  return {
    x: clamp((dx / distance) * maxRadiusX * falloff, -maxRadiusX, maxRadiusX),
    y: clamp((dy / distance) * maxRadiusY * falloff, -maxRadiusY, maxRadiusY),
  };
};

/**
 * Returns natural base pupil offset driven by scroll state & direction when cursor
 * isn't actively driving the gaze.
 */
export const getDirectionalPupilOffset = (
  state: MascotState,
  direction: ScrollDirection,
): { x: number; y: number } => {
  if (state === "sleepy") return { x: 0, y: 0.7 };
  if (state === "surprised") return { x: 0, y: -0.4 };
  if (state === "running" || state === "fastRunning") {
    if (direction === "up") return { x: 0.6, y: -1.6 };
    if (direction === "down") return { x: 0.8, y: 1.5 };
    return { x: 0.5, y: 0 };
  }
  return { x: 0, y: 0 };
};

/**
 * Resolves the active facial expression from the state machine plus transient
 * blink/hover/wink overrides without permitting overlapping expressions.
 */
export const resolveMascotExpression = ({
  state,
  isBlinking,
  isWinking,
  isHovered,
}: {
  state: MascotState;
  isBlinking: boolean;
  isWinking: boolean;
  isHovered: boolean;
}): MascotExpression => {
  if (isWinking) return "wink";
  if (state === "surprised") return "surprised";
  if (state === "stopping") return "relieved";
  if (isBlinking && state !== "sleepy") return "blink";
  if (state === "sleepy") return "sleepy";
  if (state === "running" || state === "fastRunning") return "focused";
  if (state === "happy" || isHovered) return "happy";
  return "relaxed";
};
