import React from "react";
import {
    AbsoluteFill,
    interpolate,
    spring,
    useCurrentFrame,
    useVideoConfig,
} from "remotion";
import { z, colorSchema } from "../../lib/schemas";

// ─── Schema ───────────────────────────────────────────────

export const ProgressBarSchema = z.object({
    progress: z.number().min(0).max(100).default(75),
    barColor: colorSchema.default("#6366f1"),
    barColorEnd: colorSchema.default("#a855f7"),
    bgColor: colorSchema.default("#1e1e2e"),
    trackColor: colorSchema.default("#2a2a3e"),
    height: z.number().min(4).max(60).default(16),
    width: z.number().min(100).max(1200).default(800),
    borderRadius: z.number().min(0).max(50).default(99),
    showLabel: z.boolean().default(true),
    labelColor: colorSchema.default("#ffffff"),
    labelFontSize: z.number().min(10).max(60).default(20),
    backgroundColor: colorSchema.default("#0f0f0f"),
});

export type ProgressBarProps = z.infer<typeof ProgressBarSchema>;

// ─── Component ────────────────────────────────────────────

export const ProgressBar: React.FC<ProgressBarProps> = ({
    progress: targetProgress,
    barColor,
    barColorEnd,
    bgColor,
    trackColor,
    height,
    width,
    borderRadius,
    showLabel,
    labelColor,
    labelFontSize,
    backgroundColor,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const animProgress = spring({
        frame,
        fps,
        config: { damping: 200 },
        durationInFrames: Math.round(fps * 1.2),
    });

    const currentProgress = interpolate(animProgress, [0, 1], [0, targetProgress]);
    const fillWidth = (currentProgress / 100) * width;

    const entranceOpacity = interpolate(
        spring({ frame, fps, config: { damping: 200 }, durationInFrames: Math.round(fps * 0.4) }),
        [0, 1],
        [0, 1]
    );

    return (
        <AbsoluteFill
            style={{
                backgroundColor,
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "system-ui, sans-serif",
            }}
        >
            <div style={{ opacity: entranceOpacity }}>
                {showLabel && (
                    <div
                        style={{
                            fontSize: labelFontSize,
                            color: labelColor,
                            fontWeight: 600,
                            marginBottom: 12,
                            textAlign: "right",
                            width,
                        }}
                    >
                        {Math.round(currentProgress)}%
                    </div>
                )}
                <div
                    style={{
                        width,
                        height,
                        backgroundColor: trackColor,
                        borderRadius,
                        overflow: "hidden",
                        boxShadow: "inset 0 2px 8px rgba(0,0,0,0.3)",
                    }}
                >
                    <div
                        style={{
                            width: fillWidth,
                            height: "100%",
                            background: `linear-gradient(90deg, ${barColor}, ${barColorEnd})`,
                            borderRadius,
                            boxShadow: `0 0 20px ${barColor}40`,
                        }}
                    />
                </div>
            </div>
        </AbsoluteFill>
    );
};
