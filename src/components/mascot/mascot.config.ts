import { MascotConfig } from "./mascot.types";

/**
 * Centralized mascot configuration.
 * Override size, placement, scroll thresholds, timing, or palette here
 * (or pass partial `config` / CSS variables to `<ScrollMascot />`).
 */
export const DEFAULT_MASCOT_CONFIG: MascotConfig = {
  normalScrollThreshold: 220,
  fastScrollThreshold: 1150,
  surprisedVelocityThreshold: 2700,
  scrollStopDelayMs: 105,
  stoppingDurationMs: 650,
  surprisedDurationMs: 500,
  idleHappyDelayMs: 6500,
  happyDurationMs: 2200,
  idleSleepyDelayMs: 16500,
  blinkDurationMs: 150,
  blinkMinIntervalMs: 2800,
  blinkMaxIntervalMs: 5600,
  runCycleDurationSec: 0.48,
  fastRunCycleDurationSec: 0.34,
  bounceIntensity: 1,
  enableHoverReactions: true,
  enableIdleMoods: true,
  position: {
    // Bottom-left stage clear of FloatingContactIcons on bottom-right
    desktopSize: 120,
    tabletSize: 96,
    mobileSize: 64,
    desktopLeft: 24,
    desktopBottom: 22,
    mobileLeft: 10,
    mobileBottom: 2,
  },
  colors: {
    primary: "#3B82F6",
    secondary: "#2563EB",
    light: "#60A5FA",
    highlight: "#93C5FD",
    softAccent: "#EFF6FF",
    facialDark: "#0F172A",
    eyeWhite: "#FFFFFF",
  },
};
