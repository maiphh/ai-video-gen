import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { CompositionConfig } from "../types";
import { VietnamWarProps, VietnamWarSchema, defaultProps } from "./VietnamWar.schema";
import { VIDEO_CONFIG } from "../../config";
import { Intro } from "./scenes/Intro";
import { ChronologyScene } from "./scenes/ChronologyScene";
import { Outro } from "./scenes/Outro";

// ── Scene durations (in frames) ───────────────────────────────────────────────
const INTRO_DURATION = 90;        // 3 s
const CHRONOLOGY_DURATION = 150;  // 5 s
const OUTRO_DURATION = 120;       // 4 s
export const TOTAL_DURATION = INTRO_DURATION + CHRONOLOGY_DURATION + OUTRO_DURATION;

// ── Root component ─────────────────────────────────────────────────────────────
export const VietnamWar: React.FC<VietnamWarProps> = (props) => {
    return (
        <AbsoluteFill style={{ backgroundColor: props.backgroundColor }}>
            <Sequence durationInFrames={INTRO_DURATION}>
                <Intro {...props} />
            </Sequence>

            <Sequence from={INTRO_DURATION} durationInFrames={CHRONOLOGY_DURATION}>
                <ChronologyScene {...props} />
            </Sequence>

            <Sequence from={INTRO_DURATION + CHRONOLOGY_DURATION} durationInFrames={OUTRO_DURATION}>
                <Outro {...props} />
            </Sequence>
        </AbsoluteFill>
    );
};

// ── Auto-discovery config ──────────────────────────────────────────────────────
// Root.tsx reads this via the registry — no manual registration needed.
export const compositionConfig: CompositionConfig<VietnamWarProps> = {
    id: "VietnamWar-Full",
    folder: "Vietnam-War",
    component: VietnamWar,
    schema: VietnamWarSchema,
    defaultProps,
    durationInFrames: TOTAL_DURATION,
    fps: VIDEO_CONFIG.fps,
    width: VIDEO_CONFIG.width,
    height: VIDEO_CONFIG.height,
    scenes: [
        { id: "VietnamWar-Intro", component: Intro, durationInFrames: INTRO_DURATION },
        { id: "VietnamWar-Chronology", component: ChronologyScene, durationInFrames: CHRONOLOGY_DURATION },
        { id: "VietnamWar-Outro", component: Outro, durationInFrames: OUTRO_DURATION },
    ],
};

