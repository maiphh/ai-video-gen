import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { VietnamWarProps } from "../VietnamWar.schema";

type SceneProps = Pick<VietnamWarProps, "backgroundColor" | "textColor" | "accentColor" | "title" | "subtitle" | "showChapterLabels">;

export const Intro: React.FC<SceneProps> = ({
    backgroundColor,
    textColor,
    accentColor,
    title,
    subtitle,
    showChapterLabels,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const titleOpacity = spring({ frame, fps, config: { damping: 20 } });
    const titleY = interpolate(frame, [0, 20], [40, 0], { extrapolateRight: "clamp" });

    const subtitleOpacity = spring({ frame: frame - 12, fps, config: { damping: 20 } });
    const subtitleY = interpolate(frame, [12, 30], [20, 0], { extrapolateRight: "clamp" });

    const lineScale = interpolate(frame, [20, 40], [0, 1], { extrapolateRight: "clamp" });

    return (
        <AbsoluteFill
            style={{
                backgroundColor,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: 16,
                fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
            }}
        >
            {showChapterLabels && (
                <p
                    style={{
                        color: accentColor,
                        fontSize: 14,
                        fontWeight: 700,
                        letterSpacing: "0.25em",
                        textTransform: "uppercase",
                        opacity: subtitleOpacity,
                        marginBottom: 0,
                    }}
                >
                    Chapter I
                </p>
            )}

            {/* Accent line */}
            <div
                style={{
                    width: 80,
                    height: 3,
                    backgroundColor: accentColor,
                    transform: `scaleX(${lineScale})`,
                    transformOrigin: "center",
                    borderRadius: 2,
                }}
            />

            <h1
                style={{
                    color: textColor,
                    fontSize: 80,
                    fontWeight: 800,
                    margin: 0,
                    textAlign: "center",
                    opacity: titleOpacity,
                    transform: `translateY(${titleY}px)`,
                    letterSpacing: "-0.02em",
                }}
            >
                {title}
            </h1>

            <p
                style={{
                    color: accentColor,
                    fontSize: 28,
                    fontWeight: 400,
                    margin: 0,
                    opacity: subtitleOpacity,
                    transform: `translateY(${subtitleY}px)`,
                    letterSpacing: "0.1em",
                }}
            >
                {subtitle}
            </p>
        </AbsoluteFill>
    );
};
