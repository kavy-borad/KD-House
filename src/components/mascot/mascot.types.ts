export type MascotState =
  | "idle"
  | "running"
  | "fastRunning"
  | "stopping"
  | "happy"
  | "sleepy"
  | "surprised";

export type ScrollDirection = "up" | "down" | "none";

export type ScrollSpeedBand = "idle" | "slow" | "normal" | "fast";

export type MascotExpression =
  | "relaxed"
  | "happy"
  | "focused"
  | "relieved"
  | "surprised"
  | "sleepy"
  | "wink"
  | "blink";

export interface MascotColorTheme {
  primary: string;
  secondary: string;
  light: string;
  highlight: string;
  softAccent: string;
  facialDark: string;
  eyeWhite: string;
}

export interface MascotPositionConfig {
  desktopSize: number;
  tabletSize: number;
  mobileSize: number;
  desktopLeft: number;
  desktopBottom: number;
  mobileLeft: number;
  mobileBottom: number;
}

export interface MascotConfig {
  /** Minimum smoothed px/s required to treat scroll as normal running */
  normalScrollThreshold: number;
  /** Minimum smoothed px/s required to trigger fastRunning */
  fastScrollThreshold: number;
  /** Instant velocity spike (px/s) that briefly triggers surprised state */
  surprisedVelocityThreshold: number;
  /** Delay (ms) after scroll stops before entering stopping state */
  scrollStopDelayMs: number;
  /** Duration (ms) of the stopping deceleration sequence before idle */
  stoppingDurationMs: number;
  /** Duration (ms) of brief surprised reaction before resuming */
  surprisedDurationMs: number;
  /** Delay (ms) in idle before a playful happy idle variation triggers */
  idleHappyDelayMs: number;
  /** Duration (ms) of the happy idle variation */
  happyDurationMs: number;
  /** Extended idle delay (ms) before drowsy sleepy variation triggers */
  idleSleepyDelayMs: number;
  /** Duration (ms) of a single natural eye blink */
  blinkDurationMs: number;
  /** Minimum delay (ms) between automatic blinks */
  blinkMinIntervalMs: number;
  /** Maximum delay (ms) between automatic blinks */
  blinkMaxIntervalMs: number;
  /** Full stride duration (s) in normal running */
  runCycleDurationSec: number;
  /** Full stride duration (s) in fastRunning */
  fastRunCycleDurationSec: number;
  /** Vertical bounce multiplier (1 = default) */
  bounceIntensity: number;
  /** Enable/disable hover, click, and cursor-tracking reactions */
  enableHoverReactions: boolean;
  /** Enable/disable idle mood changes (happy / sleepy) */
  enableIdleMoods: boolean;
  /** Default mascot sizing & responsive placement */
  position: MascotPositionConfig;
  /** Blue brand palette */
  colors: MascotColorTheme;
}

export interface ScrollBehaviorSnapshot {
  scrollY: number;
  prevScrollY: number;
  direction: ScrollDirection;
  velocity: number;
  speedBand: ScrollSpeedBand;
  isScrolling: boolean;
  timeSinceStopMs: number;
}

export interface LiveScrollTelemetry {
  velocity: number;
  direction: ScrollDirection;
  isScrolling: boolean;
  lastScrollTimestamp: number;
}
