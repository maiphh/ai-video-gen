import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Sequence } from "remotion";
import { VietnamWarProps } from "../VietnamWar.schema";

type SceneProps = Pick<VietnamWarProps, "backgroundColor" | "textColor" | "accentColor" | "showChapterLabels">;

const EVENTS = [
    { year: "1955", label: "US Military Advisors Arrive in South Vietnam" },
    { year: "1964", label: "Gulf of Tonkin Incident — Congress authorizes war" },
    { year: "1968", label: "Tet Offensive — turning point in public opinion" },
    { year: "1973", label: "Paris Peace Accords — US combat troops withdraw" },
    { year: "1975", label: "Fall of Saigon — reunification of Vietnam" },
];

const STAGGER = 18; // frames between each event appearing

const TimelineEvent: React.FC<{
    year: string;
    label: string;
    startFrame: number;
    accentColor: string;
    textColor: string;
}> = ({ year, label, startFrame, accentColor, textColor }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const localFrame = Math.max(0, frame - startFrame);
    const opacity = spring({ frame: localFrame, fps, config: { damping: 18 } });
    const x = interpolate(localFrame, [0, 15], [-40, 0], { extrapolateRight: "clamp" });

    return (
        <div style={{ display: "flex", alignItems: "center", gap: 20, opacity, transform: `translateX(${x}px)` }}>
            {/* Dot */}
            <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: accentColor, flexShrink: 0 }} />
            <span style={{ color: accentColor, fontSize: 22, fontWeight: 700, minWidth: 52 }}>{year}</span>
            <span style={{ color: textColor, fontSize: 20, fontWeight: 400, lineHeight: 1.4 }}>{label}</span>
        </div>
    );
};

export const ChronologyScene: React.FC<SceneProps> = ({
    backgroundColor,
    textColor,
    accentColor,
    showChapterLabels,
}) => {
    const frame = useCurrentFrame();

    const headingOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

    return (
        <AbsoluteFill
            style={{
                backgroundColor,
                justifyContent: "center",
                alignItems: "flex-start",
                padding: "0 120px",
                flexDirection: "column",
                gap: 32,
                fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
            }}
        >
            {showChapterLabels && (
                <p style={{ color: accentColor, fontSize: 13, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", margin: 0, opacity: headingOpacity }}>
                    Chapter II — Key Events
                </p>
            )}

            <h2 style={{ color: textColor, fontSize: 44, fontWeight: 800, margin: 0, opacity: headingOpacity }}>
                A Decade of Conflict
            </h2>

            {/* Vertical line */}
            <div style={{ position: "relative", paddingLeft: 7 }}>
                <div style={{ position: "absolute", left: 6, top: 0, bottom: 0, width: 2, backgroundColor: accentColor, opacity: 0.3 }} />
                <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                    {EVENTS.map((event, i) => (
                        <TimelineEvent
                            key={event.year}
                            year={event.year}
                            label={event.label}
                            startFrame={i * STAGGER}
                            accentColor={accentColor}
                            textColor={textColor}
                        />
                    ))}
                </div>
            </div>
        </AbsoluteFill>
    );
};
