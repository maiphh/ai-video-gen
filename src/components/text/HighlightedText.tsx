import React from "react";
import {
    AbsoluteFill,
    spring,
    useCurrentFrame,
    useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { z, colorSchema } from "../../lib/schemas";

const { fontFamily } = loadFont("normal", {
    weights: ["400", "700"],
    subsets: ["latin"],
});

// ─── Schema ───────────────────────────────────────────────

export const HighlightedTextSchema = z.object({
    text: z.string(),
    highlightWord: z.string(),
    fontSize: z.number().min(12).max(160).default(64),
    color: colorSchema.default("#ffffff"),
    highlightColor: colorSchema.default("#fbbf24"),
    highlightStartFrame: z.number().min(0).default(20),
    highlightDuration: z.number().min(5).max(60).default(18),
    backgroundColor: colorSchema.default("#0f0f0f"),
});

export type HighlightedTextProps = z.infer<typeof HighlightedTextSchema>;

// ─── Highlight span ───────────────────────────────────────

const Highlight: React.FC<{
    word: string;
    color: string;
    delay: number;
    durationInFrames: number;
}> = ({ word, color, delay, durationInFrames }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const progress = spring({
        fps,
        frame,
        config: { damping: 200 },
        delay,
        durationInFrames,
    });

    const scaleX = Math.max(0, Math.min(1, progress));

    return (
        <span style={{ position: "relative", display: "inline-block" }}>
            <span
                style={{
                    position: "absolute",
                    left: -4,
                    right: -4,
                    top: "50%",
                    height: "1.1em",
                    transform: `translateY(-50%) scaleX(${scaleX})`,
                    transformOrigin: "left center",
                    backgroundColor: color,
                    borderRadius: "0.15em",
                    zIndex: 0,
                }}
            />
            <span style={{ position: "relative", zIndex: 1 }}>{word}</span>
        </span>
    );
};

// ─── Component ────────────────────────────────────────────

export const HighlightedText: React.FC<HighlightedTextProps> = ({
    text,
    highlightWord,
    fontSize,
    color,
    highlightColor,
    highlightStartFrame,
    highlightDuration,
    backgroundColor,
}) => {
    const idx = text.indexOf(highlightWord);
    const hasHighlight = idx >= 0;

    const pre = hasHighlight ? text.slice(0, idx) : text;
    const post = hasHighlight ? text.slice(idx + highlightWord.length) : "";

    return (
        <AbsoluteFill
            style={{
                backgroundColor,
                justifyContent: "center",
                alignItems: "center",
                padding: 60,
                fontFamily,
            }}
        >
            <div
                style={{
                    fontSize,
                    fontWeight: 700,
                    color,
                    textAlign: "center",
                    lineHeight: 1.4,
                }}
            >
                {hasHighlight ? (
                    <>
                        <span>{pre}</span>
                        <Highlight
                            word={highlightWord}
                            color={highlightColor}
                            delay={highlightStartFrame}
                            durationInFrames={highlightDuration}
                        />
                        <span>{post}</span>
                    </>
                ) : (
                    <span>{text}</span>
                )}
            </div>
        </AbsoluteFill>
    );
};
