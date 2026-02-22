import React from "react";
import {
    AbsoluteFill,
    interpolate,
    spring,
    useCurrentFrame,
    useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import {
    z,
    colorSchema,
    alignmentSchema,
    fontWeightSchema,
    entranceAnimationSchema,
} from "../../lib/schemas";

const { fontFamily } = loadFont("normal", {
    weights: ["300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
});

// ─── Schema ───────────────────────────────────────────────

export const AnimatedTitleSchema = z.object({
    text: z.string(),
    fontSize: z.number().min(12).max(200).default(72),
    color: colorSchema.default("#ffffff"),
    fontWeight: fontWeightSchema.default("700"),
    alignment: alignmentSchema.default("center"),
    animation: entranceAnimationSchema.default("slide-up"),
    backgroundColor: colorSchema.default("#0f0f0f"),
});

export type AnimatedTitleProps = z.infer<typeof AnimatedTitleSchema>;

// ─── Component ────────────────────────────────────────────

export const AnimatedTitle: React.FC<AnimatedTitleProps> = ({
    text,
    fontSize,
    color,
    fontWeight,
    alignment,
    animation,
    backgroundColor,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const progress = spring({
        frame,
        fps,
        config: { damping: 200 },
        durationInFrames: Math.round(fps * 0.8),
    });

    const getTransform = () => {
        switch (animation) {
            case "slide-up": {
                const y = interpolate(progress, [0, 1], [60, 0]);
                return `translateY(${y}px)`;
            }
            case "slide-down": {
                const y = interpolate(progress, [0, 1], [-60, 0]);
                return `translateY(${y}px)`;
            }
            case "slide-left": {
                const x = interpolate(progress, [0, 1], [80, 0]);
                return `translateX(${x}px)`;
            }
            case "slide-right": {
                const x = interpolate(progress, [0, 1], [-80, 0]);
                return `translateX(${x}px)`;
            }
            case "scale": {
                const s = interpolate(progress, [0, 1], [0.3, 1]);
                return `scale(${s})`;
            }
            case "fade":
            default:
                return "none";
        }
    };

    const opacity = interpolate(progress, [0, 1], [0, 1]);

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
            <h1
                style={{
                    fontSize,
                    fontWeight: Number(fontWeight),
                    color,
                    opacity,
                    transform: getTransform(),
                    textAlign: alignment,
                    margin: 0,
                    lineHeight: 1.2,
                }}
            >
                {text}
            </h1>
        </AbsoluteFill>
    );
};
