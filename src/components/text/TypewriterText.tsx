import React from "react";
import {
    AbsoluteFill,
    interpolate,
    useCurrentFrame,
    useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/JetBrainsMono";
import { z, colorSchema } from "../../lib/schemas";

const { fontFamily } = loadFont("normal", {
    weights: ["400", "700"],
    subsets: ["latin"],
});

// ─── Schema ───────────────────────────────────────────────

export const TypewriterTextSchema = z.object({
    text: z.string(),
    pauseAfter: z.string().optional().default(""),
    charFrames: z.number().min(1).max(10).default(2),
    pauseSeconds: z.number().min(0).max(5).default(1),
    fontSize: z.number().min(12).max(120).default(48),
    color: colorSchema.default("#e0e0e0"),
    cursorColor: colorSchema.default("#4fc3f7"),
    backgroundColor: colorSchema.default("#1a1a2e"),
    showCursor: z.boolean().default(true),
});

export type TypewriterTextProps = z.infer<typeof TypewriterTextSchema>;

// ─── Helpers ──────────────────────────────────────────────

const getTypedText = ({
    frame,
    fullText,
    pauseAfter,
    charFrames,
    pauseFrames,
}: {
    frame: number;
    fullText: string;
    pauseAfter: string;
    charFrames: number;
    pauseFrames: number;
}): string => {
    const pauseIndex = pauseAfter ? fullText.indexOf(pauseAfter) : -1;
    const preLen =
        pauseIndex >= 0 ? pauseIndex + pauseAfter.length : fullText.length;

    if (frame < preLen * charFrames) {
        return fullText.slice(0, Math.floor(frame / charFrames));
    }
    if (frame < preLen * charFrames + pauseFrames) {
        return fullText.slice(0, preLen);
    }
    const postPhase = frame - preLen * charFrames - pauseFrames;
    const totalChars = Math.min(
        fullText.length,
        preLen + Math.floor(postPhase / charFrames)
    );
    return fullText.slice(0, totalChars);
};

const Cursor: React.FC<{
    frame: number;
    color: string;
}> = ({ frame, color }) => {
    const BLINK_FRAMES = 16;
    const opacity = interpolate(
        frame % BLINK_FRAMES,
        [0, BLINK_FRAMES / 2, BLINK_FRAMES],
        [1, 0, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );
    return <span style={{ opacity, color }}>█</span>;
};

// ─── Component ────────────────────────────────────────────

export const TypewriterText: React.FC<TypewriterTextProps> = ({
    text,
    pauseAfter,
    charFrames,
    pauseSeconds,
    fontSize,
    color,
    cursorColor,
    backgroundColor,
    showCursor,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const pauseFrames = Math.round(fps * pauseSeconds);

    const typedText = getTypedText({
        frame,
        fullText: text,
        pauseAfter: pauseAfter || "",
        charFrames,
        pauseFrames,
    });

    return (
        <AbsoluteFill
            style={{
                backgroundColor,
                justifyContent: "center",
                alignItems: "center",
                padding: 80,
                fontFamily,
            }}
        >
            <div
                style={{
                    fontSize,
                    fontWeight: 400,
                    color,
                    lineHeight: 1.6,
                    maxWidth: "90%",
                    whiteSpace: "pre-wrap",
                }}
            >
                <span>{typedText}</span>
                {showCursor && <Cursor frame={frame} color={cursorColor} />}
            </div>
        </AbsoluteFill>
    );
};
