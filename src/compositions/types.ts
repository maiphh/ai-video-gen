import { ZodTypeAny } from "zod";

/**
 * A single previewable scene within a composition.
 * Each scene appears as its own composition in the Remotion Studio sidebar,
 * nested under the parent composition's folder.
 */
export type SceneConfig = {
    /** Scene ID — will be shown in the sidebar (e.g. "VietnamWar-Intro") */
    id: string;
    /** The scene React component */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: React.ComponentType<any>;
    /** Duration of this scene in frames */
    durationInFrames: number;
    /** Optional Zod schema (inherits parent schema if omitted) */
    schema?: ZodTypeAny;
    /** Default props for the scene preview (inherits parent defaults if omitted) */
    defaultProps?: Record<string, unknown>;
};

/**
 * Every composition folder must export a `compositionConfig` object
 * conforming to this type from its `index.tsx`.
 *
 * Root.tsx reads the registry and auto-renders all entries —
 * no manual editing of Root.tsx needed.
 *
 * @example
 * export const compositionConfig: CompositionConfig = {
 *   id: "MyVideo-Full",
 *   folder: "My-Video",
 *   component: MyVideo,
 *   schema: MyVideoSchema,
 *   defaultProps: { ... },
 *   durationInFrames: 300,
 *   fps: 30,
 *   width: 1280,
 *   height: 720,
 *   scenes: [
 *     { id: "MyVideo-Intro", component: Intro, durationInFrames: 90 },
 *   ],
 * };
 */
export type CompositionConfig<Props extends Record<string, unknown> = Record<string, unknown>> = {
    /** Unique ID shown in the Remotion Studio sidebar and used as the render target */
    id: string;
    /**
     * Remotion `<Folder>` name to nest this composition under inside "Compositions".
     * Must contain only letters, numbers, and hyphens (Remotion constraint).
     */
    folder: string;
    /** The React component to render */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: React.ComponentType<any>;
    /** Optional Zod schema for the props — enables the GUI editor in Studio */
    schema?: ZodTypeAny;
    /** Default prop values shown in Studio and used as render defaults */
    defaultProps: Props;
    /** Total length of the composition in frames */
    durationInFrames: number;
    /** Frames per second */
    fps: number;
    /** Canvas width in pixels */
    width: number;
    /** Canvas height in pixels */
    height: number;
    /** Optional array of individual scenes — each gets its own sidebar entry for preview */
    scenes?: SceneConfig[];
};

