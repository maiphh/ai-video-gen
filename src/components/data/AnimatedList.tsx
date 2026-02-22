import React from "react";
import {
    AbsoluteFill,
    interpolate,
    spring,
    useCurrentFrame,
    useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { z, colorSchema } from "../../lib/schemas";

const { fontFamily } = loadFont("normal", {
    weights: ["400", "500", "600"],
    subsets: ["latin"],
});

// ─── Schema ───────────────────────────────────────────────

export const AnimatedListSchema = z.object({
    items: z.array(z.string()).default(["Item 1", "Item 2", "Item 3"]),
    fontSize: z.number().min(12).max(80).default(28),
    color: colorSchema.default("#e0e0e0"),
    bulletColor: colorSchema.default("#6366f1"),
    staggerDelay: z.number().min(1).max(30).default(8),
    bulletStyle: z.enum(["disc", "check", "arrow", "number"]).default("check"),
    backgroundColor: colorSchema.default("#0f0f0f"),
});

export type AnimatedListProps = z.infer<typeof AnimatedListSchema>;

// ─── Bullet icon ──────────────────────────────────────────

const Bullet: React.FC<{
    style: "disc" | "check" | "arrow" | "number";
    color: string;
    index: number;
    fontSize: number;
}> = ({ style, color, index, fontSize }) => {
    const size = fontSize * 0.6;

    const common: React.CSSProperties = {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 16,
        flexShrink: 0,
    };

    switch (style) {
        case "disc":
            return (
                <span
                    style={{
                        ...common,
                        width: size * 0.4,
                        height: size * 0.4,
                        borderRadius: "50%",
                        backgroundColor: color,
                    }}
                />
            );
        case "check":
            return (
                <span style={{ ...common, color, fontSize: size, lineHeight: 1 }}>
                    ✓
                </span>
            );
        case "arrow":
            return (
                <span style={{ ...common, color, fontSize: size, lineHeight: 1 }}>
                    →
                </span>
            );
        case "number":
            return (
                <span
                    style={{
                        ...common,
                        color,
                        fontSize: size * 0.8,
                        fontWeight: 600,
                        minWidth: size,
                        textAlign: "center",
                    }}
                >
                    {index + 1}.
                </span>
            );
    }
};

// ─── Component ────────────────────────────────────────────

export const AnimatedList: React.FC<AnimatedListProps> = ({
    items,
    fontSize,
    color,
    bulletColor,
    staggerDelay,
    bulletStyle,
    backgroundColor,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    return (
        <AbsoluteFill
            style={{
                backgroundColor,
                justifyContent: "center",
                alignItems: "flex-start",
                padding: "60px 100px",
                fontFamily,
            }}
        >
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {items.map((item, i) => {
                    const itemProgress = spring({
                        frame,
                        fps,
                        config: { damping: 200 },
                        delay: i * staggerDelay,
                        durationInFrames: Math.round(fps * 0.5),
                    });

                    const opacity = interpolate(itemProgress, [0, 1], [0, 1]);
                    const translateX = interpolate(itemProgress, [0, 1], [40, 0]);

                    return (
                        <div
                            key={i}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                fontSize,
                                fontWeight: 500,
                                color,
                                opacity,
                                transform: `translateX(${translateX}px)`,
                            }}
                        >
                            <Bullet
                                style={bulletStyle}
                                color={bulletColor}
                                index={i}
                                fontSize={fontSize}
                            />
                            <span>{item}</span>
                        </div>
                    );
                })}
            </div>
        </AbsoluteFill>
    );
};
