import React from "react";
import {
    AbsoluteFill,
    interpolate,
    spring,
    useCurrentFrame,
    useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { z, colorSchema, alignmentSchema } from "../../lib/schemas";

const { fontFamily } = loadFont("normal", {
    weights: ["400", "700", "900"],
    subsets: ["latin"],
});

// ─── Schema ───────────────────────────────────────────────

export const AnimatedCounterSchema = z.object({
    from: z.number().default(0),
    to: z.number().default(100),
    prefix: z.string().default(""),
    suffix: z.string().default(""),
    fontSize: z.number().min(12).max(300).default(96),
    color: colorSchema.default("#ffffff"),
    labelText: z.string().default(""),
    labelFontSize: z.number().min(10).max(80).default(24),
    labelColor: colorSchema.default("#888888"),
    alignment: alignmentSchema.default("center"),
    backgroundColor: colorSchema.default("#0f0f0f"),
    decimals: z.number().min(0).max(4).default(0),
});

export type AnimatedCounterProps = z.infer<typeof AnimatedCounterSchema>;

// ─── Component ────────────────────────────────────────────

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
    from,
    to,
    prefix,
    suffix,
    fontSize,
    color,
    labelText,
    labelFontSize,
    labelColor,
    alignment,
    backgroundColor,
    decimals,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const progress = spring({
        frame,
        fps,
        config: { damping: 200 },
        durationInFrames: Math.round(fps * 1.5),
    });

    const currentValue = interpolate(progress, [0, 1], [from, to]);
    const displayValue = decimals > 0
        ? currentValue.toFixed(decimals)
        : Math.round(currentValue).toLocaleString();

    const scaleEntrance = spring({
        frame,
        fps,
        config: { damping: 15, stiffness: 150 },
        durationInFrames: Math.round(fps * 0.5),
    });

    return (
        <AbsoluteFill
            style={{
                backgroundColor,
                justifyContent: "center",
                alignItems: alignment === "center" ? "center" : alignment === "right" ? "flex-end" : "flex-start",
                padding: 60,
                fontFamily,
            }}
        >
            <div
                style={{
                    textAlign: alignment,
                    transform: `scale(${interpolate(scaleEntrance, [0, 1], [0.8, 1])})`,
                    opacity: interpolate(scaleEntrance, [0, 1], [0, 1]),
                }}
            >
                <div
                    style={{
                        fontSize,
                        fontWeight: 900,
                        color,
                        lineHeight: 1,
                        letterSpacing: "-0.02em",
                    }}
                >
                    {prefix}{displayValue}{suffix}
                </div>
                {labelText && (
                    <div
                        style={{
                            fontSize: labelFontSize,
                            fontWeight: 400,
                            color: labelColor,
                            marginTop: 12,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                        }}
                    >
                        {labelText}
                    </div>
                )}
            </div>
        </AbsoluteFill>
    );
};
