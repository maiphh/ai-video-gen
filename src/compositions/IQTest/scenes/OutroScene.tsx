import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { IQTestProps } from "../IQTest.schema";

type SceneProps = Pick<IQTestProps, "backgroundColor" | "textColor" | "accentColor" | "accentColorAlt" | "ctaText">;

export const OutroScene: React.FC<SceneProps> = ({
    backgroundColor,
    textColor,
    accentColor,
    accentColorAlt,
    ctaText,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // CTA text entrance
    const ctaSpring = spring({ frame, fps, config: { damping: 12, stiffness: 80 } });
    const ctaScale = interpolate(ctaSpring, [0, 1], [0.6, 1]);

    // Follow button
    const buttonSpring = spring({ frame: frame - 15, fps, config: { damping: 14, stiffness: 100 } });
    const buttonY = interpolate(buttonSpring, [0, 1], [40, 0]);

    // Pulsing follow button
    const buttonPulse = interpolate(Math.sin(frame * 0.1), [-1, 1], [1, 1.06]);

    // Background gradient rotation
    const bgAngle = interpolate(frame, [0, 60], [180, 225], { extrapolateRight: "clamp" });

    return (
        <AbsoluteFill
            style={{
                background: `linear-gradient(${bgAngle}deg, ${backgroundColor} 0%, #1a0a3e 40%, #0d1f2d 100%)`,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: 36,
                fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
            }}
        >
            {/* Logo / emoji */}
            <div
                style={{
                    fontSize: 80,
                    opacity: ctaSpring,
                    transform: `scale(${ctaScale})`,
                }}
            >
                🧠
            </div>

            {/* CTA Text */}
            <h2
                style={{
                    fontSize: 44,
                    fontWeight: 800,
                    color: textColor,
                    margin: 0,
                    textAlign: "center",
                    opacity: ctaSpring,
                    transform: `scale(${ctaScale})`,
                    maxWidth: 700,
                    lineHeight: 1.3,
                    textShadow: `0 0 20px ${accentColor}40`,
                }}
            >
                {ctaText}
            </h2>

            {/* Animated follow button */}
            <div
                style={{
                    padding: "18px 60px",
                    borderRadius: 50,
                    background: `linear-gradient(135deg, ${accentColor}, ${accentColorAlt})`,
                    opacity: buttonSpring,
                    transform: `translateY(${buttonY}px) scale(${buttonPulse})`,
                    boxShadow: `0 4px 30px ${accentColor}60, 0 0 60px ${accentColor}20`,
                }}
            >
                <span
                    style={{
                        fontSize: 24,
                        fontWeight: 800,
                        color: "#ffffff",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                    }}
                >
                    ❤️ Follow
                </span>
            </div>

            {/* Additional engagement hooks */}
            <div
                style={{
                    display: "flex",
                    gap: 40,
                    opacity: buttonSpring * 0.6,
                    marginTop: 10,
                }}
            >
                {["💬 Comment", "↗️ Share", "🔖 Save"].map((action, i) => {
                    const actionSpring = spring({
                        frame: frame - 25 - i * 5,
                        fps,
                        config: { damping: 18 },
                    });
                    return (
                        <span
                            key={i}
                            style={{
                                fontSize: 18,
                                fontWeight: 600,
                                color: "rgba(255,255,255,0.6)",
                                opacity: actionSpring,
                            }}
                        >
                            {action}
                        </span>
                    );
                })}
            </div>
        </AbsoluteFill>
    );
};
