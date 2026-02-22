import React from "react";
import {
    AbsoluteFill,
    interpolate,
    useCurrentFrame,
    useVideoConfig,
} from "remotion";
import { z, colorSchema } from "../../lib/schemas";

// ─── Schema ───────────────────────────────────────────────

export const AnimatedBackgroundSchema = z.object({
    colorFrom: colorSchema.default("#0f0c29"),
    colorTo: colorSchema.default("#302b63"),
    colorAccent: colorSchema.default("#24243e"),
    angle: z.number().min(0).max(360).default(135),
    animateGradient: z.boolean().default(true),
    animationSpeed: z.number().min(0.1).max(5).default(1),
});

export type AnimatedBackgroundProps = z.infer<typeof AnimatedBackgroundSchema>;

// ─── Component ────────────────────────────────────────────

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
    colorFrom,
    colorTo,
    colorAccent,
    angle,
    animateGradient,
    animationSpeed,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    let currentAngle = angle;
    let midpointOffset = 50;

    if (animateGradient) {
        const cycleDuration = fps * 4 * (1 / animationSpeed);
        currentAngle = angle + interpolate(
            frame % cycleDuration,
            [0, cycleDuration],
            [0, 360]
        );
        midpointOffset = interpolate(
            frame,
            [0, fps * 2 * (1 / animationSpeed)],
            [30, 70],
            { extrapolateRight: "clamp" }
        );
    }

    return (
        <AbsoluteFill
            style={{
                background: `linear-gradient(${currentAngle}deg, ${colorFrom} 0%, ${colorAccent} ${midpointOffset}%, ${colorTo} 100%)`,
            }}
        />
    );
};
