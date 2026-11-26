import { motion, MotionValue } from "framer-motion";
import { RefObject, useEffect, useRef } from "react";
import { MascotRigMotionValues } from "./mascot.animations";
import {
  MascotColorTheme,
  MascotExpression,
  MascotState,
  ScrollDirection,
} from "./mascot.types";

interface MascotCharacterProps {
  state: MascotState;
  direction: ScrollDirection;
  expression: MascotExpression;
  reducedMotion: boolean;
  isHovered: boolean;
  pupilX: MotionValue<number>;
  pupilY: MotionValue<number>;
  rig: MascotRigMotionValues;
  colors: MascotColorTheme;
}

/**
 * Binds one or more Framer MotionValues directly to an SVG element's native
 * `transform` (or `opacity`) attribute so joints rotate mathematically around
 * their exact SVG `(0, 0)` origin at 60fps with zero React re-renders.
 */
function useSvgAttributeBinding(
  ref: RefObject<SVGGElement | SVGEllipseElement | null>,
  sources: MotionValue<number>[],
  attribute: "transform" | "opacity",
  format: () => string,
) {
  const formatRef = useRef(format);
  formatRef.current = format;

  useEffect(() => {
    const sync = () => {
      if (ref.current) {
        ref.current.setAttribute(attribute, formatRef.current());
      }
    };
    sync();
    const unsubs = sources.map((mv) => mv.on("change", sync));
    return () => {
      unsubs.forEach((unsub) => unsub());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attribute, ref, ...sources]);
}

const getMouthPath = (expression: MascotExpression): string => {
  switch (expression) {
    case "happy":
    case "wink":
      return "M 51 64 Q 60 73 69 64 Z";
    case "focused":
      return "M 52.5 64 Q 60 72.5 67.5 64 Z";
    case "relieved":
      return "M 54 66 Q 57 63.5 60 66 Q 63 68.5 66 66";
    case "sleepy":
      return "M 55 66 Q 60 67.5 65 66";
    case "blink":
    case "relaxed":
    default:
      return "M 52 64.5 Q 60 70.5 68 64.5";
  }
};

/**
 * Pure vector blue mascot rendered as articulated SVG joint hierarchies
 * (hip -> knee -> ankle/foot and shoulder -> elbow -> hand) driven directly
 * through SVG user-space transforms for zero-lag 4-phase running motion.
 */
const MascotCharacter = ({
  state,
  direction,
  expression,
  reducedMotion,
  isHovered,
  pupilX,
  pupilY,
  rig,
  colors,
}: MascotCharacterProps) => {
  const shadowRef = useRef<SVGEllipseElement>(null);
  const bodyRef = useRef<SVGGElement>(null);
  const hatRef = useRef<SVGGElement>(null);

  const leftHipRef = useRef<SVGGElement>(null);
  const leftKneeRef = useRef<SVGGElement>(null);
  const leftAnkleRef = useRef<SVGGElement>(null);

  const rightHipRef = useRef<SVGGElement>(null);
  const rightKneeRef = useRef<SVGGElement>(null);
  const rightAnkleRef = useRef<SVGGElement>(null);

  const leftShoulderRef = useRef<SVGGElement>(null);
  const leftElbowRef = useRef<SVGGElement>(null);

  const rightShoulderRef = useRef<SVGGElement>(null);
  const rightElbowRef = useRef<SVGGElement>(null);

  // Ground shadow transform + opacity
  useSvgAttributeBinding(
    shadowRef,
    [rig.shadowScaleX],
    "transform",
    () =>
      `translate(60 122) scale(${rig.shadowScaleX.get().toFixed(3)} 1) translate(-60 -122)`,
  );
  useSvgAttributeBinding(shadowRef, [rig.shadowOpacity], "opacity", () =>
    rig.shadowOpacity.get().toFixed(3),
  );

  // Body group (pivot at torso center of mass 60, 84)
  useSvgAttributeBinding(
    bodyRef,
    [rig.bodyY, rig.bodyRotate, rig.bodyScaleX, rig.bodyScaleY],
    "transform",
    () =>
      `translate(60 ${(84 + rig.bodyY.get()).toFixed(2)}) rotate(${rig.bodyRotate.get().toFixed(2)}) scale(${rig.bodyScaleX.get().toFixed(3)} ${rig.bodyScaleY.get().toFixed(3)}) translate(-60 -84)`,
  );

  // Minimal cap (secondary lag pivot at brim 60, 30)
  useSvgAttributeBinding(hatRef, [rig.hatY, rig.hatRotate], "transform", () =>
    `translate(60 ${(30 + rig.hatY.get()).toFixed(2)}) rotate(${rig.hatRotate.get().toFixed(2)}) translate(-60 -30)`,
  );

  // Leg & arm SVG joint rotations around local (0, 0) joint origins
  useSvgAttributeBinding(leftHipRef, [rig.leftHip], "transform", () =>
    `rotate(${rig.leftHip.get().toFixed(2)})`,
  );
  useSvgAttributeBinding(leftKneeRef, [rig.leftKnee], "transform", () =>
    `rotate(${rig.leftKnee.get().toFixed(2)})`,
  );
  useSvgAttributeBinding(leftAnkleRef, [rig.leftAnkle], "transform", () =>
    `rotate(${rig.leftAnkle.get().toFixed(2)})`,
  );

  useSvgAttributeBinding(rightHipRef, [rig.rightHip], "transform", () =>
    `rotate(${rig.rightHip.get().toFixed(2)})`,
  );
  useSvgAttributeBinding(rightKneeRef, [rig.rightKnee], "transform", () =>
    `rotate(${rig.rightKnee.get().toFixed(2)})`,
  );
  useSvgAttributeBinding(rightAnkleRef, [rig.rightAnkle], "transform", () =>
    `rotate(${rig.rightAnkle.get().toFixed(2)})`,
  );

  useSvgAttributeBinding(leftShoulderRef, [rig.leftShoulder], "transform", () =>
    `rotate(${rig.leftShoulder.get().toFixed(2)})`,
  );
  useSvgAttributeBinding(leftElbowRef, [rig.leftElbow], "transform", () =>
    `rotate(${rig.leftElbow.get().toFixed(2)})`,
  );

  useSvgAttributeBinding(
    rightShoulderRef,
    [rig.rightShoulder],
    "transform",
    () => `rotate(${rig.rightShoulder.get().toFixed(2)})`,
  );
  useSvgAttributeBinding(rightElbowRef, [rig.rightElbow], "transform", () =>
    `rotate(${rig.rightElbow.get().toFixed(2)})`,
  );

  const isRunning = state === "running" || state === "fastRunning";
  const showSparkles =
    !reducedMotion && (state === "happy" || state === "surprised" || isHovered);

  // Subtle depth shading tint between far-side and near-side limbs during stride
  const strideDirection = direction === "up" ? "up" : "down";
  const backLimbColor = "#1D4ED8";
  const frontLimbColor = colors.secondary;
  const leftLimbStroke =
    isRunning && strideDirection === "down" ? backLimbColor : frontLimbColor;
  const rightLimbStroke =
    isRunning && strideDirection === "up" ? backLimbColor : frontLimbColor;

  const renderLeftArm = () => (
    <g transform="translate(29, 60)">
      <g ref={leftShoulderRef} data-joint="left-shoulder">
        <path
          d="M 0 0 L -8 7"
          stroke={leftLimbStroke}
          strokeWidth="5"
          strokeLinecap="round"
        />
        <g transform="translate(-8, 7)">
          <g ref={leftElbowRef} data-joint="left-elbow">
            <path
              d="M 0 0 L -6 5"
              stroke={leftLimbStroke}
              strokeWidth="4.8"
              strokeLinecap="round"
            />
            <circle cx="-7" cy="6" r="5" fill={colors.primary} stroke={leftLimbStroke} strokeWidth="1" />
            <circle
              cx="-8"
              cy="4.8"
              r="1.9"
              fill={colors.highlight}
              opacity="0.65"
            />
          </g>
        </g>
      </g>
    </g>
  );

  const renderRightArm = () => (
    <g transform="translate(91, 60)">
      <g ref={rightShoulderRef} data-joint="right-shoulder">
        <path
          d="M 0 0 L 8 7"
          stroke={rightLimbStroke}
          strokeWidth="5"
          strokeLinecap="round"
        />
        <g transform="translate(8, 7)">
          <g ref={rightElbowRef} data-joint="right-elbow">
            <path
              d="M 0 0 L 6 5"
              stroke={rightLimbStroke}
              strokeWidth="4.8"
              strokeLinecap="round"
            />
            <circle cx="7" cy="6" r="5" fill={colors.primary} stroke={rightLimbStroke} strokeWidth="1" />
            <circle
              cx="6"
              cy="4.8"
              r="1.9"
              fill={colors.highlight}
              opacity="0.65"
            />
          </g>
        </g>
      </g>
    </g>
  );

  const bringLeftArmToFront = isRunning && strideDirection === "up";
  const bringRightArmToFront = isRunning && strideDirection === "down";

  const leftEyeScaleY =
    expression === "blink"
      ? 0.1
      : expression === "sleepy"
        ? 0.38
        : expression === "surprised"
          ? 1.18
          : 1;

  const rightEyeScaleY =
    expression === "blink" || expression === "wink"
      ? 0.1
      : expression === "sleepy"
        ? 0.38
        : expression === "surprised"
          ? 1.18
          : 1;

  const eyeScaleX = expression === "surprised" ? 1.1 : 1;
  const shoeOffsetX =
    isRunning || state === "stopping"
      ? strideDirection === "up"
        ? -2.8
        : 2.8
      : 0;

  return (
    <svg
      viewBox="0 0 120 132"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="kd-scroll-mascot-svg"
      aria-hidden="true"
    >
      {/* Short blue ground track ("way") directly beneath mascot feet */}
      <defs>
        <linearGradient id="kdMascotWayRail" x1="-22" y1="125" x2="142" y2="125" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={colors.light} stopOpacity="0" />
          <stop offset="16%" stopColor={colors.light} stopOpacity="0.45" />
          <stop offset="84%" stopColor={colors.light} stopOpacity="0.45" />
          <stop offset="100%" stopColor={colors.light} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="kdMascotWayDots" x1="-20" y1="125" x2="140" y2="125" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={colors.primary} stopOpacity="0" />
          <stop offset="14%" stopColor={colors.primary} stopOpacity="0.85" />
          <stop offset="86%" stopColor={colors.primary} stopOpacity="0.85" />
          <stop offset="100%" stopColor={colors.primary} stopOpacity="0" />
        </linearGradient>
      </defs>

      <line
        x1="-22"
        y1="125"
        x2="142"
        y2="125"
        stroke="url(#kdMascotWayRail)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <line
        data-mascot-way="true"
        x1="-20"
        y1="125"
        x2="140"
        y2="125"
        stroke="url(#kdMascotWayDots)"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeDasharray="3.2 8.8"
      />

      {/* Dynamic ground shadow reacting continuously to airborne lift & compression */}
      <ellipse
        ref={shadowRef}
        cx="60"
        cy="121.5"
        rx="24"
        ry="3.8"
        fill={colors.facialDark}
        opacity="0.14"
      />

      {/* Playful ambient sparkles (visible on happy / surprised / hover) */}
      <motion.g
        initial={false}
        animate={{
          opacity: showSparkles ? 1 : 0,
          scale: showSparkles ? [0.85, 1.1, 0.95] : 0.6,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{ originX: "60px", originY: "44px" }}
      >
        <path
          d="M 18 33 L 20.2 38.2 L 25.5 40.5 L 20.2 42.8 L 18 48 L 15.8 42.8 L 10.5 40.5 L 15.8 38.2 Z"
          fill={colors.highlight}
        />
        <path
          d="M 102 29 L 103.8 33.2 L 108 35 L 103.8 36.8 L 102 41 L 100.2 36.8 L 96 35 L 100.2 33.2 Z"
          fill={colors.light}
        />
      </motion.g>

      {/* Running speed streaks trailing behind runner */}
      {isRunning && !reducedMotion && (
        <motion.g
          animate={{
            opacity:
              state === "fastRunning" ? [0.42, 0.94, 0.42] : [0.24, 0.68, 0.24],
            x: direction === "up" ? [0, 5, 0] : [0, -5, 0],
          }}
          transition={{
            duration: state === "fastRunning" ? 0.24 : 0.36,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <line
            x1={direction === "up" ? "96" : "8"}
            y1="44"
            x2={direction === "up" ? "111" : "22"}
            y2="44"
            stroke={colors.light}
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <line
            x1={direction === "up" ? "99" : "5"}
            y1="57"
            x2={direction === "up" ? "115" : "20"}
            y2="57"
            stroke={colors.highlight}
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          {state === "fastRunning" && (
            <line
              x1={direction === "up" ? "97" : "10"}
              y1="70"
              x2={direction === "up" ? "110" : "22"}
              y2="70"
              stroke={colors.primary}
              strokeWidth="2"
              strokeLinecap="round"
            />
          )}
        </motion.g>
      )}

      {/* Relieved breath droplet shown briefly when scroll stops */}
      {expression === "relieved" && !reducedMotion && (
        <motion.g
          initial={{ opacity: 0, y: 3, scale: 0.7 }}
          animate={{
            opacity: [0, 1, 0.85],
            y: [3, -2, -4],
            scale: [0.7, 1.05, 1],
          }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <path
            d="M 92 31 C 94.6 35 96 37.2 96 39 A 4 4 0 1 1 88 39 C 88 37.2 89.4 35 92 31 Z"
            fill={colors.highlight}
          />
        </motion.g>
      )}

      {/* Main articulated mascot group */}
      <g ref={bodyRef} data-joint="body">
        {/* Left Leg: Hip (49, 86) -> Thigh -> Knee (0, 14) -> Shin -> Ankle (0, 13) -> Shoe */}
        <g transform="translate(49, 86)">
          <g ref={leftHipRef} data-joint="left-hip">
            <path
              d="M 0 0 L 0 14"
              stroke={leftLimbStroke}
              strokeWidth="5.4"
              strokeLinecap="round"
            />
            <g transform="translate(0, 14)">
              <g ref={leftKneeRef} data-joint="left-knee">
                <path
                  d="M 0 0 L -0.5 13"
                  stroke={leftLimbStroke}
                  strokeWidth="5.2"
                  strokeLinecap="round"
                />
                <g transform="translate(-0.5, 13)">
                  <g ref={leftAnkleRef} data-joint="left-ankle">
                    <ellipse
                      cx={isRunning || state === "stopping" ? shoeOffsetX : -2.2}
                      cy="2.2"
                      rx="7.5"
                      ry="4.4"
                      fill={leftLimbStroke}
                    />
                    <ellipse
                      cx={
                        (isRunning || state === "stopping" ? shoeOffsetX : -2.2) -
                        0.6
                      }
                      cy="1.1"
                      rx="4.3"
                      ry="1.7"
                      fill={colors.light}
                      opacity="0.45"
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>

        {/* Right Leg: Hip (71, 86) -> Thigh -> Knee (0, 14) -> Shin -> Ankle (0, 13) -> Shoe */}
        <g transform="translate(71, 86)">
          <g ref={rightHipRef} data-joint="right-hip">
            <path
              d="M 0 0 L 0 14"
              stroke={rightLimbStroke}
              strokeWidth="5.4"
              strokeLinecap="round"
            />
            <g transform="translate(0, 14)">
              <g ref={rightKneeRef} data-joint="right-knee">
                <path
                  d="M 0 0 L 0.5 13"
                  stroke={rightLimbStroke}
                  strokeWidth="5.2"
                  strokeLinecap="round"
                />
                <g transform="translate(0.5, 13)">
                  <g ref={rightAnkleRef} data-joint="right-ankle">
                    <ellipse
                      cx={isRunning || state === "stopping" ? shoeOffsetX : 2.2}
                      cy="2.2"
                      rx="7.5"
                      ry="4.4"
                      fill={rightLimbStroke}
                    />
                    <ellipse
                      cx={
                        (isRunning || state === "stopping" ? shoeOffsetX : 2.2) -
                        0.6
                      }
                      cy="1.1"
                      rx="4.3"
                      ry="1.7"
                      fill={colors.light}
                      opacity="0.45"
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>

        {/* Far-side arms behind torso */}
        {!bringLeftArmToFront && renderLeftArm()}
        {!bringRightArmToFront && renderRightArm()}

        {/* Round Blue Body */}
        <circle cx="60" cy="60" r="32" fill={colors.primary} />

        {/* Subtle lower crescent depth shading */}
        <path
          d="M 31.5 73 A 32 32 0 0 0 88.5 73 A 33 27 0 0 1 31.5 73 Z"
          fill={colors.secondary}
          opacity="0.48"
        />

        {/* Subtle upper rim highlight (keeps contrast crisp on dark sections) */}
        <circle
          cx="60"
          cy="60"
          r="31.2"
          stroke={colors.highlight}
          strokeOpacity="0.55"
          strokeWidth="1.5"
        />

        {/* Soft rounded shine oval on forehead */}
        <ellipse
          cx="49"
          cy="38.5"
          rx="8"
          ry="4.2"
          transform="rotate(-14 49 38.5)"
          fill={colors.highlight}
          opacity="0.52"
        />

        {/* Soft pale-blue friendly cheek blushes */}
        <ellipse
          cx="39.5"
          cy="61.5"
          rx="4.6"
          ry="2.6"
          fill={colors.softAccent}
          opacity={expression === "happy" || isHovered ? 0.55 : 0.34}
        />
        <ellipse
          cx="80.5"
          cy="61.5"
          rx="4.6"
          ry="2.6"
          fill={colors.softAccent}
          opacity={expression === "happy" || isHovered ? 0.55 : 0.34}
        />

        {/* Eyes */}
        {expression === "relieved" ? (
          <>
            <path
              d="M 44 53 Q 50.5 45.5 57 53"
              stroke={colors.facialDark}
              strokeWidth="2.8"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 63 53 Q 69.5 45.5 76 53"
              stroke={colors.facialDark}
              strokeWidth="2.8"
              strokeLinecap="round"
              fill="none"
            />
          </>
        ) : (
          <>
            {expression === "focused" && (
              <>
                <line
                  x1="44.5"
                  y1="42"
                  x2="55.5"
                  y2="44.5"
                  stroke={colors.facialDark}
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                <line
                  x1="75.5"
                  y1="42"
                  x2="64.5"
                  y2="44.5"
                  stroke={colors.facialDark}
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </>
            )}

            {/* Left Eye + Pupil */}
            <motion.g
              animate={{ scaleY: leftEyeScaleY, scaleX: eyeScaleX }}
              transition={{ duration: 0.12, ease: "easeOut" }}
              style={{ originX: "50.5px", originY: "52px" }}
            >
              <ellipse
                cx="50.5"
                cy="52"
                rx="6.6"
                ry="7.8"
                fill={colors.eyeWhite}
                stroke={colors.secondary}
                strokeOpacity="0.22"
                strokeWidth="0.9"
              />
              <motion.g style={{ x: pupilX, y: pupilY }}>
                <circle cx="51" cy="52.4" r="3.9" fill={colors.facialDark} />
                <circle cx="49.5" cy="50.6" r="1.45" fill={colors.eyeWhite} />
                <circle
                  cx="52.5"
                  cy="54.2"
                  r="0.65"
                  fill={colors.eyeWhite}
                  opacity="0.85"
                />
              </motion.g>
            </motion.g>

            {/* Right Eye + Pupil */}
            <motion.g
              animate={{ scaleY: rightEyeScaleY, scaleX: eyeScaleX }}
              transition={{ duration: 0.12, ease: "easeOut" }}
              style={{ originX: "69.5px", originY: "52px" }}
            >
              <ellipse
                cx="69.5"
                cy="52"
                rx="6.6"
                ry="7.8"
                fill={colors.eyeWhite}
                stroke={colors.secondary}
                strokeOpacity="0.22"
                strokeWidth="0.9"
              />
              <motion.g style={{ x: pupilX, y: pupilY }}>
                <circle cx="69" cy="52.4" r="3.9" fill={colors.facialDark} />
                <circle cx="67.5" cy="50.6" r="1.45" fill={colors.eyeWhite} />
                <circle
                  cx="70.5"
                  cy="54.2"
                  r="0.65"
                  fill={colors.eyeWhite}
                  opacity="0.85"
                />
              </motion.g>
            </motion.g>
          </>
        )}

        {/* Expressive Mouth */}
        {expression === "surprised" ? (
          <motion.ellipse
            cx="60"
            cy="67"
            rx="3.9"
            ry="4.6"
            fill={colors.facialDark}
            initial={false}
            animate={{ scale: [0.85, 1.08, 1] }}
            transition={{ duration: 0.22 }}
            style={{ originX: "60px", originY: "67px" }}
          />
        ) : expression === "happy" ||
          expression === "wink" ||
          expression === "focused" ? (
          <path d={getMouthPath(expression)} fill={colors.facialDark} />
        ) : (
          <path
            d={getMouthPath(expression)}
            stroke={colors.facialDark}
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        )}

        {/* Optional Minimal Top Cap with Blue Accent Band */}
        <g ref={hatRef}>
          <rect
            x="47.5"
            y="11"
            width="25"
            height="17"
            rx="5"
            fill={colors.facialDark}
          />
          <rect
            x="47.5"
            y="22.5"
            width="25"
            height="3.8"
            rx="1.2"
            fill={colors.light}
          />
          <rect
            x="41.5"
            y="26.5"
            width="37"
            height="4.6"
            rx="2.3"
            fill={colors.facialDark}
          />
          <rect
            x="51"
            y="13.2"
            width="10"
            height="2.1"
            rx="1"
            fill={colors.highlight}
            opacity="0.35"
          />
        </g>

        {/* Near-side foreground arm rendered cleanly above body sphere during run */}
        {bringLeftArmToFront && renderLeftArm()}
        {bringRightArmToFront && renderRightArm()}
      </g>
    </svg>
  );
};

export default MascotCharacter;
