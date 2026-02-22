import React from "react";
import { z } from "../../lib/schemas";
import {
    TransitionSeries,
    linearTiming,
    springTiming,
} from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";

// ─── Schema ───────────────────────────────────────────────

export const SceneTransitionSchema = z.object({
    type: z.enum(["fade", "slide", "wipe"]).default("fade"),
    direction: z.enum(["from-left", "from-right", "from-top", "from-bottom"]).default("from-left"),
    durationInFrames: z.number().min(5).max(60).default(15),
    timingType: z.enum(["linear", "spring"]).default("linear"),
});

export type SceneTransitionProps = z.infer<typeof SceneTransitionSchema>;

// ─── Utility function ─────────────────────────────────────

/**
 * Returns the transition presentation and timing for use in a TransitionSeries.
 * This component is a config helper, not a visual component itself.
 */
export const getTransitionConfig = ({
    type,
    direction,
    durationInFrames,
    timingType,
}: SceneTransitionProps) => {
    const timing =
        timingType === "spring"
            ? springTiming({ config: { damping: 200 }, durationInFrames })
            : linearTiming({ durationInFrames });

    const getPresentation = () => {
        switch (type) {
            case "slide":
                return slide({ direction });
            case "wipe":
                return wipe({ direction });
            case "fade":
            default:
                return fade();
        }
    };

    return {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        presentation: getPresentation() as any,
        timing,
    };
};

// ─── Demo Component ───────────────────────────────────────

/**
 * A demo component that shows two colored panels with a transition between them.
 * Use this to preview transition types, or use `getTransitionConfig()` 
 * in your own compositions.
 */
export const SceneTransitionDemo: React.FC<SceneTransitionProps> = (props) => {
    const { presentation, timing } = getTransitionConfig(props);

    return (
        <TransitionSeries>
            <TransitionSeries.Sequence durationInFrames={45}>
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "#fff",
                        fontSize: 48,
                        fontWeight: 700,
                        fontFamily: "system-ui, sans-serif",
                    }}
                >
                    Scene A
                </div>
            </TransitionSeries.Sequence>
            <TransitionSeries.Transition
                presentation={presentation}
                timing={timing}
            />
            <TransitionSeries.Sequence durationInFrames={45}>
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "#fff",
                        fontSize: 48,
                        fontWeight: 700,
                        fontFamily: "system-ui, sans-serif",
                    }}
                >
                    Scene B
                </div>
            </TransitionSeries.Sequence>
        </TransitionSeries>
    );
};
