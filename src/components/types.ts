import { ZodTypeAny } from "zod";

/**
 * Configuration for a reusable component preview in Remotion Studio.
 *
 * Every component that should appear in the Studio sidebar must export
 * a `componentConfig` conforming to this type, then be registered in
 * `src/components/registry.ts`.
 *
 * Video dimensions (width, height, fps) are inherited from VIDEO_CONFIG —
 * only `durationInFrames` can be overridden per component.
 *
 * @example
 * export const componentConfig: ComponentConfig = {
 *   id: "MyWidget",
 *   folder: "Data",
 *   component: MyWidget,
 *   schema: MyWidgetSchema,
 *   defaultProps: { value: 42 },
 * };
 */
export type ComponentConfig<Props extends Record<string, unknown> = Record<string, unknown>> = {
    /** Unique ID shown in the Remotion Studio sidebar */
    id: string;
    /**
     * Studio folder name to group this component under inside "Components".
     * Must contain only letters, numbers, and hyphens (Remotion constraint).
     */
    folder: string;
    /** The React component to render */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: React.ComponentType<any>;
    /** Optional Zod schema for the props — enables the GUI editor in Studio */
    schema?: ZodTypeAny;
    /** Default prop values shown in Studio */
    defaultProps: Props;
    /**
     * Duration of the preview in frames.
     * Falls back to `VIDEO_CONFIG.durationShort` when omitted.
     */
    durationInFrames?: number;
};
