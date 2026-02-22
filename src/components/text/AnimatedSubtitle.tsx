import React from "react";
import {
    AbsoluteFill,
    interpolate,
    spring,
    useCurrentFrame,
    useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { z, colorSchema, alignmentSchema, fontWeightSchema } from "../../lib/schemas";

const { fontFamily } = loadFont("normal", {
    weights: ["300", "400", "500", "600", "700"],
    subsets: ["latin"],
});

// ─── Schema ───────────────────────────────────────────────

export const AnimatedSubtitleSchema = z.object({
    text: z.string(),
    fontSize: z.number().min(10).max(120).default(32),
    color: colorSchema.default("#cccccc"),
    fontWeight: fontWeightSchema.default("400"),
    alignment: alignmentSchema.default("center"),
    delayInFrames: z.number().min(0).default(15),
    backgroundColor: colorSchema.default("#0f0f0f"),
});

export type AnimatedSubtitleProps = z.infer<typeof AnimatedSubtitleSchema>;

// ─── Component ────────────────────────────────────────────

export const AnimatedSubtitle: React.FC<AnimatedSubtitleProps> = ({
    text,
    fontSize,
    color,
    fontWeight,
    alignment,
    delayInFrames,
    backgroundColor,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const progress = spring({
        frame,
        fps,
        config: { damping: 200 },
        delay: delayInFrames,
        durationInFrames: Math.round(fps * 0.6),
    });

    const opacity = interpolate(progress, [0, 1], [0, 1]);
    const translateY = interpolate(progress, [0, 1], [30, 0]);

    return (
        <AbsoluteFill
            style={{
                backgroundColor,
                justifyContent: "center",
                alignItems: alignment === "center" ? "center" : alignment === "right" ? "flex-end" : "flex-start",
                padding: 60,
                paddingTop: 160,
                fontFamily,
            }}
        >
            <p
                style={{
                    fontSize,
                    fontWeight: Number(fontWeight),
                    color,
                    opacity,
                    transform: `translateY(${translateY}px)`,
                    textAlign: alignment,
                    margin: 0,
                    lineHeight: 1.5,
                    maxWidth: "80%",
                }}
            >
                {text}
            </p>
        </AbsoluteFill>
    );
};
