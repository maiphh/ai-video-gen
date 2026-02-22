import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { z } from "zod";

export const CircularTimerSchema = z.object({
    totalSeconds: z.number().min(1).default(5),
    size: z.number().default(120),
    strokeWidth: z.number().default(8),
    trackColor: z.string().default("rgba(255,255,255,0.1)"),
    strokeColor: z.string().default("#00e5ff"),
    warningColor: z.string().default("#ff1744"),
    textColor: z.string().default("#ffffff"),
    warningThreshold: z.number().default(2),
    fontSize: z.number().default(48),
});

export type CircularTimerProps = z.infer<typeof CircularTimerSchema>;

export const CircularTimer: React.FC<CircularTimerProps> = ({
    totalSeconds,
    size,
    strokeWidth,
    trackColor,
    strokeColor,
    warningColor,
    textColor,
    warningThreshold,
    fontSize,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const totalFrames = totalSeconds * fps;
    const progress = interpolate(frame, [0, totalFrames], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const remainingSeconds = Math.max(0, Math.ceil(progress * totalSeconds));
    const isWarning = remainingSeconds <= warningThreshold && remainingSeconds > 0;
    const isFinished = remainingSeconds === 0;

    // Entrance spring
    const entrance = spring({ frame, fps, config: { damping: 15, stiffness: 120 } });

    // Pulse effect when in warning zone
    const pulseScale = isWarning
        ? 1 + 0.04 * Math.sin(frame * 0.5)
        : 1;

    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = circumference * (1 - progress);

    const currentColor = isFinished ? warningColor : isWarning ? warningColor : strokeColor;

    // Glow intensity
    const glowSize = isWarning ? 12 : 4;

    return (
        <div
            style={{
                width: size,
                height: size,
                position: "relative",
                transform: `scale(${entrance * pulseScale})`,
                opacity: entrance,
            }}
        >
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                style={{
                    transform: "rotate(-90deg)",
                    filter: `drop-shadow(0 0 ${glowSize}px ${currentColor})`,
                }}
            >
                {/* Track */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={trackColor}
                    strokeWidth={strokeWidth}
                />
                {/* Progress */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={currentColor}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                    strokeLinecap="round"
                />
            </svg>

            {/* Center text */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <span
                    style={{
                        fontSize,
                        fontWeight: 800,
                        color: isWarning ? warningColor : textColor,
                        fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
                        fontVariantNumeric: "tabular-nums",
                    }}
                >
                    {isFinished ? "⏱" : remainingSeconds}
                </span>
            </div>
        </div>
    );
};
