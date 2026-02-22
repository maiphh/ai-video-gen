// ─── Remotion Video Config ────────────────────────────────────────────────────
// Central place to configure shared video properties.
// These values are used as defaults across all compositions in Root.tsx.

export const VIDEO_CONFIG = {
    // ── Canvas ──────────────────────────────────────────────────────────────────
    /** Output width in pixels */
    width: 1280,
    /** Output height in pixels */
    height: 720,

    // ── Playback ─────────────────────────────────────────────────────────────────
    /** Frames per second */
    fps: 30,

    // ── Default durations (in frames) ────────────────────────────────────────────
    durationShort: 90,    // 3 s  @ 30 fps
    durationMedium: 150,  // 5 s  @ 30 fps
    durationLong: 180,    // 6 s  @ 30 fps

    // ── Branding / Colors ────────────────────────────────────────────────────────
    /** Primary background colour used across compositions */
    colorBackground: "#0f0f0f",
    /** Accent / highlight colour */
    colorAccent: "#6366f1",
    /** Default text colour */
    colorText: "#ffffff",
    /** Muted / secondary text colour */
    colorTextMuted: "#cccccc",

    // ── Typography ───────────────────────────────────────────────────────────────
    fontSizeLarge: 72,
    fontSizeMedium: 48,
    fontSizeSmall: 32,
} as const;

export type VideoConfig = typeof VIDEO_CONFIG;
