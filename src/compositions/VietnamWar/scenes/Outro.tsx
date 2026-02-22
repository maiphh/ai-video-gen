import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { VietnamWarProps } from "../VietnamWar.schema";

type SceneProps = Pick<VietnamWarProps, "backgroundColor" | "textColor" | "accentColor">;

const STATS = [
    { value: "58,220", label: "US service members killed" },
    { value: "2M+", label: "Vietnamese civilian deaths" },
    { value: "19yrs", label: "Average age of US soldier" },
];

export const Outro: React.FC<SceneProps> = ({ backgroundColor, textColor, accentColor }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const quoteOpacity = spring({ frame, fps, config: { damping: 16 } });
    const quoteY = interpolate(frame, [0, 20], [30, 0], { extrapolateRight: "clamp" });

    return (
        <AbsoluteFill
            style={{
                backgroundColor,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 48,
                padding: "0 100px",
                fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
            }}
        >
            {/* Stats row */}
            <div style={{ display: "flex", gap: 64, justifyContent: "center" }}>
                {STATS.map((stat, i) => {
                    const statOpacity = spring({ frame: frame - i * 10, fps, config: { damping: 18 } });
                    return (
                        <div key={stat.label} style={{ textAlign: "center", opacity: statOpacity }}>
                            <p style={{ color: accentColor, fontSize: 48, fontWeight: 800, margin: 0 }}>{stat.value}</p>
                            <p style={{ color: textColor, fontSize: 16, fontWeight: 400, margin: "8px 0 0", opacity: 0.7 }}>{stat.label}</p>
                        </div>
                    );
                })}
            </div>

            {/* Divider */}
            <div style={{ width: 60, height: 2, backgroundColor: accentColor, opacity: 0.5 }} />

            {/* Closing quote */}
            <p
                style={{
                    color: textColor,
                    fontSize: 22,
                    fontStyle: "italic",
                    textAlign: "center",
                    maxWidth: 700,
                    lineHeight: 1.6,
                    opacity: quoteOpacity,
                    transform: `translateY(${quoteY}px)`,
                    margin: 0,
                }}
            >
                "The war that America failed to win, and Vietnam failed to forget."
            </p>
        </AbsoluteFill>
    );
};
