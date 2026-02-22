import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { IQTestProps } from "../IQTest.schema";
import { CircularTimer } from "../../../components/data/CircularTimer";
import { QuestionCard } from "../../../components/data/QuestionCard";

type SceneProps = Pick<IQTestProps, "backgroundColor" | "textColor" | "accentColor" | "accentColorAlt" | "questionText" | "options" | "timerSeconds">;

export const QuestionScene: React.FC<SceneProps> = ({
    backgroundColor,
    textColor,
    accentColor,
    accentColorAlt,
    questionText,
    options,
    timerSeconds,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // "Think fast!" label appears midway through timer
    const thinkFastDelay = Math.floor(timerSeconds * fps * 0.5);
    const thinkFastSpring = spring({
        frame: frame - thinkFastDelay,
        fps,
        config: { damping: 10, stiffness: 150 },
    });
    const thinkFastScale = interpolate(thinkFastSpring, [0, 1], [0.5, 1]);

    // Subtle background pulse
    const bgPulse = interpolate(Math.sin(frame * 0.05), [-1, 1], [0.98, 1.02]);

    return (
        <AbsoluteFill
            style={{
                background: `radial-gradient(ellipse at 50% 30%, #1a0a3e, ${backgroundColor})`,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: 40,
                fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
                transform: `scale(${bgPulse})`,
            }}
        >
            {/* Question number badge */}
            <div
                style={{
                    position: "absolute",
                    top: 80,
                    left: "50%",
                    transform: "translateX(-50%)",
                    fontSize: 18,
                    fontWeight: 700,
                    color: accentColorAlt,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    opacity: 0.8,
                }}
            >
                Question 1
            </div>

            {/* Timer */}
            <div style={{ marginTop: 40 }}>
                <CircularTimer
                    totalSeconds={timerSeconds}
                    size={140}
                    strokeWidth={8}
                    trackColor="rgba(255,255,255,0.06)"
                    strokeColor={accentColorAlt}
                    warningColor="#ff1744"
                    textColor={textColor}
                    warningThreshold={2}
                    fontSize={52}
                />
            </div>

            {/* Question + Options */}
            <QuestionCard
                question={questionText}
                options={options}
                questionFontSize={40}
                optionFontSize={28}
                textColor={textColor}
                optionBgColor="rgba(255,255,255,0.06)"
                optionBorderColor="rgba(255,255,255,0.12)"
                accentColor={accentColor}
                staggerDelay={6}
                questionDelayFrames={5}
            />

            {/* "Think fast!" label */}
            {frame >= thinkFastDelay && (
                <div
                    style={{
                        position: "absolute",
                        bottom: 100,
                        fontSize: 24,
                        fontWeight: 700,
                        color: "#ff9100",
                        opacity: thinkFastSpring,
                        transform: `scale(${thinkFastScale})`,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        textShadow: "0 0 12px rgba(255,145,0,0.4)",
                    }}
                >
                    ⚡ Think fast!
                </div>
            )}
        </AbsoluteFill>
    );
};
