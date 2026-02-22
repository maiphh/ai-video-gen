import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { z } from "zod";

export const AnswerRevealSchema = z.object({
    options: z.array(z.string()).default(["28", "30", "32", "36"]),
    correctIndex: z.number().min(0).max(3).default(1),
    optionFontSize: z.number().default(28),
    textColor: z.string().default("#ffffff"),
    correctColor: z.string().default("#00e676"),
    wrongColor: z.string().default("rgba(255,255,255,0.15)"),
    accentColor: z.string().default("#7c3aed"),
});

export type AnswerRevealProps = z.infer<typeof AnswerRevealSchema>;

const LABELS = ["A", "B", "C", "D"];

export const AnswerReveal: React.FC<AnswerRevealProps> = ({
    options,
    correctIndex,
    optionFontSize,
    textColor,
    correctColor,
    wrongColor,
    accentColor,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const revealSpring = spring({
        frame,
        fps,
        config: { damping: 12, stiffness: 100 },
    });

    // Correct answer glow pulse
    const glowIntensity = interpolate(
        Math.sin(frame * 0.15),
        [-1, 1],
        [8, 20]
    );

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: 18,
                width: "100%",
                maxWidth: 800,
                padding: "0 60px",
            }}
        >
            {options.map((option, i) => {
                const isCorrect = i === correctIndex;
                const itemScale = isCorrect
                    ? interpolate(revealSpring, [0, 1], [1, 1.05])
                    : 1;
                const itemOpacity = isCorrect ? 1 : interpolate(revealSpring, [0, 1], [1, 0.4]);
                const bgColor = isCorrect
                    ? `rgba(0, 230, 118, ${0.15 * revealSpring})`
                    : wrongColor;
                const borderColor = isCorrect ? correctColor : "rgba(255,255,255,0.05)";

                return (
                    <div
                        key={i}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 18,
                            padding: "18px 28px",
                            backgroundColor: bgColor,
                            border: `2px solid ${borderColor}`,
                            borderRadius: 16,
                            opacity: itemOpacity,
                            transform: `scale(${itemScale})`,
                            boxShadow: isCorrect
                                ? `0 0 ${glowIntensity}px ${correctColor}, inset 0 0 ${glowIntensity / 2}px rgba(0,230,118,0.1)`
                                : "none",
                        }}
                    >
                        {/* Label badge */}
                        <div
                            style={{
                                width: 44,
                                height: 44,
                                borderRadius: 12,
                                backgroundColor: isCorrect ? correctColor : accentColor,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                fontSize: 20,
                                fontWeight: 800,
                                color: isCorrect ? "#0d0d0d" : "#ffffff",
                                fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
                                flexShrink: 0,
                            }}
                        >
                            {isCorrect ? "✓" : LABELS[i]}
                        </div>
                        {/* Option text */}
                        <span
                            style={{
                                fontSize: optionFontSize,
                                fontWeight: isCorrect ? 800 : 600,
                                color: isCorrect ? correctColor : textColor,
                                fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
                            }}
                        >
                            {option}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};
