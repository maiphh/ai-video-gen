import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { IQTestProps } from "../IQTest.schema";

type SceneProps = Pick<IQTestProps, "backgroundColor" | "textColor" | "accentColor" | "accentColorAlt" | "introTitle" | "introSubtitle">;

export const IntroScene: React.FC<SceneProps> = ({
    backgroundColor,
    textColor,
    accentColor,
    accentColorAlt,
    introTitle,
    introSubtitle,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Title entrance — bouncy spring
    const titleSpring = spring({ frame, fps, config: { damping: 10, stiffness: 120 } });
    const titleScale = interpolate(titleSpring, [0, 1], [0.3, 1]);
    const titleOpacity = titleSpring;

    // Subtitle entrance — delayed smooth
    const subtitleSpring = spring({ frame: frame - 15, fps, config: { damping: 20 } });
    const subtitleY = interpolate(subtitleSpring, [0, 1], [30, 0]);

    // Pulsing glow on the title
    const glowSize = interpolate(Math.sin(frame * 0.12), [-1, 1], [10, 30]);

    // Animated gradient background rotation
    const bgAngle = interpolate(frame, [0, 90], [135, 180], { extrapolateRight: "clamp" });

    // Decorative ring animation
    const ringScale = spring({ frame: frame - 5, fps, config: { damping: 15, stiffness: 80 } });
    const ringRotation = interpolate(frame, [0, 120], [0, 360]);

    return (
        <AbsoluteFill
            style={{
                background: `linear-gradient(${bgAngle}deg, ${backgroundColor} 0%, #1a0a3e 50%, ${backgroundColor} 100%)`,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: 24,
                fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
            }}
        >
            {/* Decorative ring */}
            <div
                style={{
                    position: "absolute",
                    width: 320,
                    height: 320,
                    borderRadius: "50%",
                    border: `3px solid ${accentColor}`,
                    opacity: 0.15 * ringScale,
                    transform: `scale(${ringScale}) rotate(${ringRotation}deg)`,
                }}
            />
            <div
                style={{
                    position: "absolute",
                    width: 420,
                    height: 420,
                    borderRadius: "50%",
                    border: `2px solid ${accentColorAlt}`,
                    opacity: 0.08 * ringScale,
                    transform: `scale(${ringScale * 0.9}) rotate(-${ringRotation * 0.5}deg)`,
                }}
            />

            {/* Title */}
            <h1
                style={{
                    fontSize: 96,
                    fontWeight: 900,
                    color: textColor,
                    margin: 0,
                    textAlign: "center",
                    opacity: titleOpacity,
                    transform: `scale(${titleScale})`,
                    textShadow: `0 0 ${glowSize}px ${accentColor}, 0 0 ${glowSize * 2}px rgba(124,58,237,0.3)`,
                    letterSpacing: "0.05em",
                }}
            >
                {introTitle}
            </h1>

            {/* Accent line */}
            <div
                style={{
                    width: interpolate(subtitleSpring, [0, 1], [0, 200]),
                    height: 4,
                    borderRadius: 2,
                    background: `linear-gradient(90deg, ${accentColor}, ${accentColorAlt})`,
                }}
            />

            {/* Subtitle */}
            <p
                style={{
                    fontSize: 36,
                    fontWeight: 500,
                    color: accentColorAlt,
                    margin: 0,
                    opacity: subtitleSpring,
                    transform: `translateY(${subtitleY}px)`,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                }}
            >
                {introSubtitle}
            </p>
        </AbsoluteFill>
    );
};
