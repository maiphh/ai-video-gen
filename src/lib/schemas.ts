import { z } from "zod";
import { zColor } from "@remotion/zod-types";

// ─── Shared sub-schemas ───────────────────────────────────

export const alignmentSchema = z.enum(["left", "center", "right"]);

export const fontWeightSchema = z.enum(["300", "400", "500", "600", "700", "800", "900"]);

export const entranceAnimationSchema = z.enum(["fade", "slide-up", "slide-down", "slide-left", "slide-right", "scale"]);

export const colorSchema = zColor();

// Re-export for convenience
export { z, zColor };
