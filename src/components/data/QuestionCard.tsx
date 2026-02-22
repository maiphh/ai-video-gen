import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { z } from "zod";

export const QuestionCardSchema = z.object({
    question: z.string().default("What comes next in the pattern: 2, 6, 12, 20, ?"),
    options: z.array(z.string()).default(["28", "30", "32", "36"]),
    questionFontSize: z.number().default(42),
    optionFontSize: z.number().default(28),
    textColor: z.string().default("#ffffff"),
    optionBgColor: z.string().default("rgba(255,255,255,0.08)"),
    optionBorderColor: z.string().default("rgba(255,255,255,0.15)"),
    accentColor: z.string().default("#7c3aed"),
    staggerDelay: z.number().default(6),
    questionDelayFrames: z.number().default(0),
});

export type QuestionCardProps = z.infer<typeof QuestionCardSchema>;

const LABELS = ["A", "B", "C", "D"];

export const QuestionCard: React.FC<QuestionCardProps> = ({
    question,
    options,
    questionFontSize,
    optionFontSize,
    textColor,
    optionBgColor,
    optionBorderColor,
    accentColor,
    staggerDelay,
    questionDelayFrames,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Question entrance
    const questionSpring = spring({
        frame: frame - questionDelayFrames,
        fps,
        config: { damping: 15, stiffness: 100 },
    });
    const questionY = interpolate(questionSpring, [0, 1], [30, 0]);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                padding: "0 60px",
            }}
        >
            {/* Question */}
            <div
                style={{
                    fontSize: questionFontSize,
                    fontWeight: 800,
                    color: textColor,
                    textAlign: "center",
                    lineHeight: 1.3,
                    opacity: questionSpring,
                    transform: `translateY(${questionY}px)`,
                    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
                    marginBottom: 50,
                    maxWidth: 900,
                    textShadow: "0 2px 20px rgba(0,0,0,0.5)",
                }}
            >
                {question}
            </div>

            {/* Options grid */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 18,
                    width: "100%",
                    maxWidth: 800,
                }}
            >
                {options.map((option, i) => {
                    const optionDelay = questionDelayFrames + 10 + i * staggerDelay;
                    const optionSpring = spring({
                        frame: frame - optionDelay,
                        fps,
                        config: { damping: 14, stiffness: 120 },
                    });
                    const optionX = interpolate(optionSpring, [0, 1], [80, 0]);

                    return (
                        <div
                            key={i}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 18,
                                padding: "18px 28px",
                                backgroundColor: optionBgColor,
                                border: `2px solid ${optionBorderColor}`,
                                borderRadius: 16,
                                opacity: optionSpring,
                                transform: `translateX(${optionX}px)`,
                                backdropFilter: "blur(12px)",
                            }}
                        >
                            {/* Label badge */}
                            <div
                                style={{
                                    width: 44,
                                    height: 44,
                                    borderRadius: 12,
                                    backgroundColor: accentColor,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    fontSize: 20,
                                    fontWeight: 800,
                                    color: "#ffffff",
                                    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
                                    flexShrink: 0,
                                }}
                            >
                                {LABELS[i]}
                            </div>
                            {/* Option text */}
                            <span
                                style={{
                                    fontSize: optionFontSize,
                                    fontWeight: 600,
                                    color: textColor,
                                    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
                                }}
                            >
                                {option}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
