import { MotionValue } from "framer-motion";
import { ScrollDirection } from "./mascot.types";

export interface MascotRigPose {
  bodyY: number;
  bodyRotate: number;
  bodyScaleX: number;
  bodyScaleY: number;
  hatY: number;
  hatRotate: number;
  shadowScaleX: number;
  shadowOpacity: number;
  leftHip: number;
  leftKnee: number;
  leftAnkle: number;
  rightHip: number;
  rightKnee: number;
  rightAnkle: number;
  leftShoulder: number;
  leftElbow: number;
  rightShoulder: number;
  rightElbow: number;
}

export interface MascotRigMotionValues {
  bodyY: MotionValue<number>;
  bodyRotate: MotionValue<number>;
  bodyScaleX: MotionValue<number>;
  bodyScaleY: MotionValue<number>;
  hatY: MotionValue<number>;
  hatRotate: MotionValue<number>;
  shadowScaleX: MotionValue<number>;
  shadowOpacity: MotionValue<number>;
  leftHip: MotionValue<number>;
  leftKnee: MotionValue<number>;
  leftAnkle: MotionValue<number>;
  rightHip: MotionValue<number>;
  rightKnee: MotionValue<number>;
  rightAnkle: MotionValue<number>;
  leftShoulder: MotionValue<number>;
  leftElbow: MotionValue<number>;
  rightShoulder: MotionValue<number>;
  rightElbow: MotionValue<number>;
}

interface PeriodicPoint {
  t: number;
  v: number;
}

/** Smooth cosine interpolation over a cyclic [0, 1) timeline. */
const sampleCyclicCurve = (phase: number, points: PeriodicPoint[]): number => {
  const p = ((phase % 1) + 1) % 1;
  const count = points.length;

  for (let i = 0; i < count; i++) {
    const cur = points[i];
    const next = points[(i + 1) % count];
    const endT = next.t <= cur.t ? next.t + 1 : next.t;
    const testP = p < cur.t ? p + 1 : p;

    if (testP >= cur.t && testP <= endT) {
      const span = Math.max(0.0001, endT - cur.t);
      const u = (testP - cur.t) / span;
      const eased = 0.5 - 0.5 * Math.cos(u * Math.PI);
      return cur.v + (next.v - cur.v) * eased;
    }
  }

  return points[0].v;
};

/**
 * Single-leg 4-phase running stride curves (normalized 0 -> 1):
 * - 0.00 Phase 1 Contact: leading leg lands forward, slight landing knee bend
 * - 0.16 Phase 2 Compression: leg accepts weight beneath hip, knee cushions
 * - 0.34 Takeoff: leg pushes aggressively behind body, toe plantarflexed
 * - 0.68 Phase 3 Passing / Recovery: heel folds tightly behind & drives knee forward
 * - 0.86 Phase 4 Airborne: leg extends forward cleanly before next Contact
 */
const LEG_HIP_CURVE: PeriodicPoint[] = [
  { t: 0.0, v: -48 },
  { t: 0.16, v: -10 },
  { t: 0.34, v: 46 },
  { t: 0.52, v: 48 },
  { t: 0.68, v: 6 },
  { t: 0.86, v: -52 },
];

const LEG_KNEE_CURVE: PeriodicPoint[] = [
  { t: 0.0, v: 14 },
  { t: 0.16, v: 36 },
  { t: 0.34, v: 14 },
  { t: 0.52, v: 48 },
  { t: 0.68, v: 86 },
  { t: 0.86, v: 26 },
];

const LEG_ANKLE_CURVE: PeriodicPoint[] = [
  { t: 0.0, v: -18 },
  { t: 0.16, v: 2 },
  { t: 0.34, v: 32 },
  { t: 0.52, v: 24 },
  { t: 0.68, v: 6 },
  { t: 0.86, v: -20 },
];

/** World-space upper arm angle relative to straight down (- = forward, + = back). */
const ARM_WORLD_CURVE: PeriodicPoint[] = [
  { t: 0.0, v: -46 },
  { t: 0.25, v: -4 },
  { t: 0.5, v: 46 },
  { t: 0.75, v: 4 },
];

/** Two vertical bounce cycles per full 2-step stride (`b = (phase * 2) % 1`). */
const BODY_Y_CURVE: PeriodicPoint[] = [
  { t: 0.0, v: -1.5 },
  { t: 0.28, v: 4.5 },
  { t: 0.56, v: -3.2 },
  { t: 0.82, v: -9.8 },
];

const BODY_SCALE_Y_CURVE: PeriodicPoint[] = [
  { t: 0.0, v: 0.985 },
  { t: 0.28, v: 0.915 },
  { t: 0.56, v: 1.025 },
  { t: 0.82, v: 1.07 },
];

/** Natural resting upper arm tilt from straight down (-8, 7) and (+8, 7). */
const REST_ARM_OFFSET_DEG = 49;

/**
 * Computes the complete continuous 4-phase running pose for a given stride
 * phase `[0, 1)`, speed scalar `[0.4..1.25]`, scroll direction, and blend `[0..1]`.
 */
export function computeRunCyclePose(
  phase: number,
  speedScalar: number,
  direction: ScrollDirection,
  intensity: number,
  blend: number,
): MascotRigPose {
  const b = Math.max(0, Math.min(1, blend));
  if (b <= 0.0001) {
    return {
      bodyY: 0,
      bodyRotate: 0,
      bodyScaleX: 1,
      bodyScaleY: 1,
      hatY: 0,
      hatRotate: 0,
      shadowScaleX: 1,
      shadowOpacity: 0.14,
      leftHip: 0,
      leftKnee: 0,
      leftAnkle: 0,
      rightHip: 0,
      rightKnee: 0,
      rightAnkle: 0,
      leftShoulder: 0,
      leftElbow: 0,
      rightShoulder: 0,
      rightElbow: 0,
    };
  }

  const dirSign = direction === "up" ? -1 : 1;
  const strideAmp = (0.8 + 0.32 * speedScalar) * b;
  const oppPhase = (phase + 0.5) % 1;
  const halfPhase = (phase * 2) % 1;

  // Legs (180 degrees out of phase; mirrored cleanly when sprinting upward)
  const leftHip = sampleCyclicCurve(phase, LEG_HIP_CURVE) * strideAmp * dirSign;
  const leftKnee = sampleCyclicCurve(phase, LEG_KNEE_CURVE) * strideAmp * dirSign;
  const leftAnkle = sampleCyclicCurve(phase, LEG_ANKLE_CURVE) * strideAmp * dirSign;

  const rightHip = sampleCyclicCurve(oppPhase, LEG_HIP_CURVE) * strideAmp * dirSign;
  const rightKnee = sampleCyclicCurve(oppPhase, LEG_KNEE_CURVE) * strideAmp * dirSign;
  const rightAnkle = sampleCyclicCurve(oppPhase, LEG_ANKLE_CURVE) * strideAmp * dirSign;

  // Arms swing strictly opposite to same-side leg (`leftArm` uses `oppPhase`, `rightArm` uses `phase`)
  const armAmp = (0.82 + 0.28 * speedScalar) * b;
  const leftArmWorld = sampleCyclicCurve(oppPhase, ARM_WORLD_CURVE) * armAmp;
  const rightArmWorld = sampleCyclicCurve(phase, ARM_WORLD_CURVE) * armAmp;

  const leftShoulder = leftArmWorld * dirSign - REST_ARM_OFFSET_DEG * b;
  const rightShoulder = rightArmWorld * dirSign + REST_ARM_OFFSET_DEG * b;

  // Bent sprinter elbows (fold dynamically forward-and-up during front punch)
  const leftElbowMag = 46 + Math.max(0, -leftArmWorld) * 0.58;
  const rightElbowMag = 46 + Math.max(0, -rightArmWorld) * 0.58;
  const leftElbow = -dirSign * leftElbowMag * b;
  const rightElbow = -dirSign * rightElbowMag * b;

  // Coordinated body bounce, forward lean, squash/stretch, hat follow-through, shadow
  const bounceAmp = (0.75 + 0.32 * speedScalar) * intensity * b;
  const bodyY = sampleCyclicCurve(halfPhase, BODY_Y_CURVE) * bounceAmp;
  const rawScaleY = sampleCyclicCurve(halfPhase, BODY_SCALE_Y_CURVE);
  const bodyScaleY = 1 + (rawScaleY - 1) * bounceAmp;
  const bodyScaleX = 1 / Math.sqrt(bodyScaleY);
  const bodyRotate = dirSign * (8 + 4.5 * speedScalar) * b;

  const hatY = bodyY * 0.18 - 0.9 * b;
  const hatRotate =
    (Math.sin(phase * Math.PI * 4 - 0.5) * 3.5 + dirSign * 1.5) * b;

  const liftNorm = Math.max(-1, Math.min(1, -bodyY / 10));
  const shadowScaleX = 1 - liftNorm * 0.24 * b;
  const shadowOpacity = Math.max(
    0.06,
    Math.min(0.24, 0.14 - liftNorm * 0.06 * b),
  );

  return {
    bodyY,
    bodyRotate,
    bodyScaleX,
    bodyScaleY,
    hatY,
    hatRotate,
    shadowScaleX,
    shadowOpacity,
    leftHip,
    leftKnee,
    leftAnkle,
    rightHip,
    rightKnee,
    rightAnkle,
    leftShoulder,
    leftElbow,
    rightShoulder,
    rightElbow,
  };
}

/** Applies a solved pose directly to MotionValues without triggering React renders. */
export function applyRigPose(
  rig: MascotRigMotionValues,
  pose: MascotRigPose,
): void {
  rig.bodyY.set(pose.bodyY);
  rig.bodyRotate.set(pose.bodyRotate);
  rig.bodyScaleX.set(pose.bodyScaleX);
  rig.bodyScaleY.set(pose.bodyScaleY);
  rig.hatY.set(pose.hatY);
  rig.hatRotate.set(pose.hatRotate);
  rig.shadowScaleX.set(pose.shadowScaleX);
  rig.shadowOpacity.set(pose.shadowOpacity);
  rig.leftHip.set(pose.leftHip);
  rig.leftKnee.set(pose.leftKnee);
  rig.leftAnkle.set(pose.leftAnkle);
  rig.rightHip.set(pose.rightHip);
  rig.rightKnee.set(pose.rightKnee);
  rig.rightAnkle.set(pose.rightAnkle);
  rig.leftShoulder.set(pose.leftShoulder);
  rig.leftElbow.set(pose.leftElbow);
  rig.rightShoulder.set(pose.rightShoulder);
  rig.rightElbow.set(pose.rightElbow);
}

/** Maps smoothed scroll velocity (px/s) cleanly into run cycles per second (~1.67..2.94 Hz). */
export function velocityToCyclesPerSec(
  velocity: number,
  runCycleDurationSec: number,
  fastRunCycleDurationSec: number,
  fastThreshold: number,
): { cyclesPerSec: number; speedScalar: number } {
  const minHz = 1 / Math.max(0.35, runCycleDurationSec * 1.25);
  const maxHz = 1 / Math.max(0.28, fastRunCycleDurationSec);
  const clampedNorm = Math.max(
    0,
    Math.min(1, velocity / Math.max(400, fastThreshold * 1.35)),
  );
  const cyclesPerSec = minHz + (maxHz - minHz) * clampedNorm;
  const speedScalar = 0.42 + 0.82 * clampedNorm;
  return { cyclesPerSec, speedScalar };
}
