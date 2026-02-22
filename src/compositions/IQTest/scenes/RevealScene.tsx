import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { IQTestProps } from "../IQTest.schema";
import { AnswerReveal } from "../../../components/data/AnswerReveal";

type SceneProps = Pick<IQTestProps, "backgroundColor" | "textColor" | "accentColor" | "accentColorAlt" | "questionText" | "options" | "correctIndex" | "correctColor">;

export const RevealScene: React.FC<SceneProps> = ({
    backgroundColor,
    textColor,
    accentColor,
    accentColorAlt,
    questionText,
    options,
    correctIndex,
    correctColor,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // "Answer" header entrance
    const headerSpring = spring({ frame, fps, config: { damping: 20, stiffness: 100 } });

    // CTA appears after reveal
    const ctaSpring = spring({ frame: frame - 40, fps, config: { damping: 15 } });
    const ctaY = interpolate(ctaSpring, [0, 1], [20, 0]);

    // Confetti-like particles (simple floating dots)
    const particles = Array.from({ length: 8 }, (_, i) => {
        const delay = 10 + i * 3;
        const particleSpring = spring({ frame: frame - delay, fps, config: { damping: 20 } });
        const x = interpolate(i, [0, 7], [-300, 300]);
        const startY = interpolate(i, [0, 7], [200, -200]);
        const y = interpolate(particleSpring, [0, 1], [startY, startY - 100]);
        const colors = [accentColor, accentColorAlt, correctColor, "#fbbf24"];
        return { x, y, opacity: particleSpring, color: colors[i % colors.length], size: 6 + (i % 3) * 4 };
    });

    return (
        <AbsoluteFill
            style={{
                background: `radial-gradient(ellipse at 50% 60%, #0d1f0d, ${backgroundColor})`,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: 30,
                fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
            }}
        >
            {/* Floating particles */}
            {particles.map((p, i) => (
                <div
                    key={i}
                    style={{
                        position: "absolute",
                        width: p.size,
                        height: p.size,
                        borderRadius: "50%",
                        backgroundColor: p.color,
                        opacity: p.opacity * 0.5,
                        transform: `translate(${p.x}px, ${p.y}px)`,
                        filter: `blur(1px)`,
                    }}
                />
            ))}

            {/* Header */}
            <div
                style={{
                    fontSize: 26,
                    fontWeight: 700,
                    color: correctColor,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    opacity: headerSpring,
                    marginBottom: 10,
                }}
            >
                ✨ The Answer Is...
            </div>

            {/* Question (smaller) */}
            <div
                style={{
                    fontSize: 28,
                    fontWeight: 600,
                    color: textColor,
                    textAlign: "center",
                    opacity: 0.7,
                    maxWidth: 800,
                    padding: "0 60px",
                    marginBottom: 10,
                }}
            >
                {questionText}
            </div>

            {/* Answer reveal */}
            <AnswerReveal
                options={options}
                correctIndex={correctIndex}
                optionFontSize={28}
                textColor={textColor}
                correctColor={correctColor}
                wrongColor="rgba(255,255,255,0.06)"
                accentColor={accentColor}
            />

            {/* Engagement CTA */}
            {frame >= 40 && (
                <div
                    style={{
                        fontSize: 22,
                        fontWeight: 700,
                        color: "#fbbf24",
                        opacity: ctaSpring,
                        transform: `translateY(${ctaY}px)`,
                        marginTop: 20,
                        textAlign: "center",
                        textShadow: "0 0 10px rgba(251,191,36,0.3)",
                    }}
                >
                    Did you get it right? 💬 Comment below!
                </div>
            )}
        </AbsoluteFill>
    );
};
