import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { CompositionConfig } from "../types";
import { IQTestProps, IQTestSchema, defaultProps } from "./IQTest.schema";
import { IntroScene } from "./scenes/IntroScene";
import { QuestionScene } from "./scenes/QuestionScene";
import { RevealScene } from "./scenes/RevealScene";
import { OutroScene } from "./scenes/OutroScene";

// ── Scene durations (in frames @ 30 fps) ──────────────────────────────────────
const INTRO_DURATION = 60;       // 2 s
const QUESTION_DURATION = 180;   // 6 s
const REVEAL_DURATION = 90;      // 3 s
const OUTRO_DURATION = 60;       // 2 s
export const TOTAL_DURATION = INTRO_DURATION + QUESTION_DURATION + REVEAL_DURATION + OUTRO_DURATION;

// ── Root component ─────────────────────────────────────────────────────────────
export const IQTest: React.FC<IQTestProps> = (props) => {
    return (
        <AbsoluteFill style={{ backgroundColor: props.backgroundColor }}>
            <Sequence durationInFrames={INTRO_DURATION}>
                <IntroScene {...props} />
            </Sequence>

            <Sequence from={INTRO_DURATION} durationInFrames={QUESTION_DURATION}>
                <QuestionScene {...props} />
            </Sequence>

            <Sequence from={INTRO_DURATION + QUESTION_DURATION} durationInFrames={REVEAL_DURATION}>
                <RevealScene {...props} />
            </Sequence>

            <Sequence from={INTRO_DURATION + QUESTION_DURATION + REVEAL_DURATION} durationInFrames={OUTRO_DURATION}>
                <OutroScene {...props} />
            </Sequence>
        </AbsoluteFill>
    );
};

// ── Auto-discovery config ──────────────────────────────────────────────────────
export const compositionConfig: CompositionConfig<IQTestProps> = {
    id: "IQTest-Full",
    folder: "IQ-Test",
    component: IQTest,
    schema: IQTestSchema,
    defaultProps,
    durationInFrames: TOTAL_DURATION,
    fps: 30,
    width: 1080,
    height: 1920,
    scenes: [
        { id: "IQTest-Intro", component: IntroScene, durationInFrames: INTRO_DURATION },
        { id: "IQTest-Question", component: QuestionScene, durationInFrames: QUESTION_DURATION },
        { id: "IQTest-Reveal", component: RevealScene, durationInFrames: REVEAL_DURATION },
        { id: "IQTest-Outro", component: OutroScene, durationInFrames: OUTRO_DURATION },
    ],
};
