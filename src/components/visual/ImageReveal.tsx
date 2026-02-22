import React from "react";
import {
    AbsoluteFill,
    Img,
    interpolate,
    spring,
    useCurrentFrame,
    useVideoConfig,
} from "remotion";
import { z, colorSchema } from "../../lib/schemas";

// ─── Schema ───────────────────────────────────────────────

export const ImageRevealSchema = z.object({
    src: z.string(),
    revealType: z.enum(["fade", "scale", "clip-left", "clip-right", "clip-up"]).default("scale"),
    width: z.number().min(50).max(1920).default(600),
    height: z.number().min(50).max(1080).default(400),
    borderRadius: z.number().min(0).max(100).default(12),
    borderColor: colorSchema.default("#ffffff"),
    borderWidth: z.number().min(0).max(20).default(0),
    backgroundColor: colorSchema.default("#0f0f0f"),
    shadow: z.boolean().default(true),
});

export type ImageRevealProps = z.infer<typeof ImageRevealSchema>;

// ─── Component ────────────────────────────────────────────

export const ImageReveal: React.FC<ImageRevealProps> = ({
    src,
    revealType,
    width,
    height,
    borderRadius,
    borderColor,
    borderWidth,
    backgroundColor,
    shadow,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const progress = spring({
        frame,
        fps,
        config: { damping: 200 },
        durationInFrames: Math.round(fps * 0.8),
    });

    const getRevealStyles = (): React.CSSProperties => {
        switch (revealType) {
            case "fade":
                return {
                    opacity: interpolate(progress, [0, 1], [0, 1]),
                };
            case "scale": {
                const scale = interpolate(progress, [0, 1], [0.6, 1]);
                const opacity = interpolate(progress, [0, 1], [0, 1]);
                return {
                    transform: `scale(${scale})`,
                    opacity,
                };
            }
            case "clip-left": {
                const clip = interpolate(progress, [0, 1], [100, 0]);
                return {
                    clipPath: `inset(0 ${clip}% 0 0)`,
                };
            }
            case "clip-right": {
                const clip = interpolate(progress, [0, 1], [100, 0]);
                return {
                    clipPath: `inset(0 0 0 ${clip}%)`,
                };
            }
            case "clip-up": {
                const clip = interpolate(progress, [0, 1], [100, 0]);
                return {
                    clipPath: `inset(${clip}% 0 0 0)`,
                };
            }
            default:
                return {};
        }
    };

    return (
        <AbsoluteFill
            style={{
                backgroundColor,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    width,
                    height,
                    borderRadius,
                    overflow: "hidden",
                    border: borderWidth > 0 ? `${borderWidth}px solid ${borderColor}` : "none",
                    boxShadow: shadow ? "0 25px 60px rgba(0,0,0,0.5)" : "none",
                    ...getRevealStyles(),
                }}
            >
                <Img
                    src={src}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />
            </div>
        </AbsoluteFill>
    );
};
