/**
 * Component Registry
 *
 * This is the ONLY file you need to edit when adding a new reusable component.
 * Import its config and add it to the array below.
 *
 * Root.tsx reads this array and auto-renders all <Composition> entries —
 * no manual changes to Root.tsx are needed.
 *
 * @example
 * // 1. Create src/components/visual/MyWidget.tsx with exports
 * // 2. Import and add it here:
 * import { MyWidget, MyWidgetSchema } from "./visual/MyWidget";
 * // 3. Add to the array:
 * { id: "MyWidget", folder: "Visual", component: MyWidget, schema: MyWidgetSchema, defaultProps: { ... } }
 */

import { ComponentConfig } from "./types";
import { VIDEO_CONFIG } from "../config";

// ── Text ──────────────────────────────────────────────────────────────────────
import { AnimatedTitle, AnimatedTitleSchema } from "./text/AnimatedTitle";
import { AnimatedSubtitle, AnimatedSubtitleSchema } from "./text/AnimatedSubtitle";
import { TypewriterText, TypewriterTextSchema } from "./text/TypewriterText";
import { HighlightedText, HighlightedTextSchema } from "./text/HighlightedText";

// ── Visual ────────────────────────────────────────────────────────────────────
import { AnimatedBackground, AnimatedBackgroundSchema } from "./visual/AnimatedBackground";
import { ImageReveal, ImageRevealSchema } from "./visual/ImageReveal";

// ── Data ──────────────────────────────────────────────────────────────────────
import { AnimatedCounter, AnimatedCounterSchema } from "./data/AnimatedCounter";
import { ProgressBar, ProgressBarSchema } from "./data/ProgressBar";
import { AnimatedList, AnimatedListSchema } from "./data/AnimatedList";

// ── Transitions ───────────────────────────────────────────────────────────────
import { SceneTransitionDemo, SceneTransitionSchema } from "./transitions/SceneTransition";

export const componentRegistry: ComponentConfig[] = [
    // ── Text ──────────────────────────────────────────────────────────────────
    {
        id: "AnimatedTitle",
        folder: "Text",
        component: AnimatedTitle,
        schema: AnimatedTitleSchema,
        defaultProps: {
            text: "Build Videos with Code",
            fontSize: 72,
            color: "#ffffff",
            fontWeight: "700",
            alignment: "center",
            animation: "slide-up",
            backgroundColor: "#0f0f0f",
        },
    },
    {
        id: "AnimatedSubtitle",
        folder: "Text",
        component: AnimatedSubtitle,
        schema: AnimatedSubtitleSchema,
        defaultProps: {
            text: "Create stunning motion graphics programmatically with React components",
            fontSize: 32,
            color: "#cccccc",
            fontWeight: "400",
            alignment: "center",
            delayInFrames: 15,
            backgroundColor: "#0f0f0f",
        },
    },
    {
        id: "TypewriterText",
        folder: "Text",
        component: TypewriterText,
        schema: TypewriterTextSchema,
        durationInFrames: VIDEO_CONFIG.durationLong,
        defaultProps: {
            text: "From prompt to motion graphics. This is Remotion.",
            pauseAfter: "From prompt to motion graphics.",
            charFrames: 2,
            pauseSeconds: 1,
            fontSize: 48,
            color: "#e0e0e0",
            cursorColor: "#4fc3f7",
            backgroundColor: "#1a1a2e",
            showCursor: true,
        },
    },
    {
        id: "HighlightedText",
        folder: "Text",
        component: HighlightedText,
        schema: HighlightedTextSchema,
        defaultProps: {
            text: "Make your videos stand out with Remotion",
            highlightWord: "Remotion",
            fontSize: 64,
            color: "#ffffff",
            highlightColor: "#fbbf24",
            highlightStartFrame: 20,
            highlightDuration: 18,
            backgroundColor: "#0f0f0f",
        },
    },

    // ── Visual ────────────────────────────────────────────────────────────────
    {
        id: "AnimatedBackground",
        folder: "Visual",
        component: AnimatedBackground,
        schema: AnimatedBackgroundSchema,
        durationInFrames: VIDEO_CONFIG.durationMedium,
        defaultProps: {
            colorFrom: "#0f0c29",
            colorTo: "#302b63",
            colorAccent: "#24243e",
            angle: 135,
            animateGradient: true,
            animationSpeed: 1,
        },
    },
    {
        id: "ImageReveal",
        folder: "Visual",
        component: ImageReveal,
        schema: ImageRevealSchema,
        defaultProps: {
            src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
            revealType: "scale",
            width: 600,
            height: 400,
            borderRadius: 12,
            borderColor: "#ffffff",
            borderWidth: 0,
            backgroundColor: "#0f0f0f",
            shadow: true,
        },
    },

    // ── Data ──────────────────────────────────────────────────────────────────
    {
        id: "AnimatedCounter",
        folder: "Data",
        component: AnimatedCounter,
        schema: AnimatedCounterSchema,
        defaultProps: {
            from: 0,
            to: 10000,
            prefix: "$",
            suffix: "+",
            fontSize: 96,
            color: "#ffffff",
            labelText: "Revenue Generated",
            labelFontSize: 24,
            labelColor: "#888888",
            alignment: "center",
            backgroundColor: "#0f0f0f",
            decimals: 0,
        },
    },
    {
        id: "ProgressBar",
        folder: "Data",
        component: ProgressBar,
        schema: ProgressBarSchema,
        defaultProps: {
            progress: 75,
            barColor: "#6366f1",
            barColorEnd: "#a855f7",
            bgColor: "#1e1e2e",
            trackColor: "#2a2a3e",
            height: 16,
            width: 800,
            borderRadius: 50,
            showLabel: true,
            labelColor: "#ffffff",
            labelFontSize: 20,
            backgroundColor: "#0f0f0f",
        },
    },
    {
        id: "AnimatedList",
        folder: "Data",
        component: AnimatedList,
        schema: AnimatedListSchema,
        defaultProps: {
            items: [
                "Fully customizable via props",
                "Spring-powered animations",
                "Zod schemas for type safety",
                "Ready for programmatic rendering",
                "Built with React & Remotion",
            ],
            fontSize: 28,
            color: "#e0e0e0",
            bulletColor: "#6366f1",
            staggerDelay: 8,
            bulletStyle: "check",
            backgroundColor: "#0f0f0f",
        },
    },

    // ── Transitions ───────────────────────────────────────────────────────────
    {
        id: "SceneTransition",
        folder: "Transitions",
        component: SceneTransitionDemo,
        schema: SceneTransitionSchema,
        defaultProps: {
            type: "fade",
            direction: "from-left",
            durationInFrames: 15,
            timingType: "linear",
        },
    },
];
