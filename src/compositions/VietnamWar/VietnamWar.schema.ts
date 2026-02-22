import { z } from "zod";

export const VietnamWarSchema = z.object({
    /** Title card text shown in the Intro scene */
    title: z.string().default("The Vietnam War"),
    /** Subtitle / date range shown beneath the title */
    subtitle: z.string().default("1955 – 1975"),
    /** Accent colour used for timeline highlights */
    accentColor: z.string().default("#e63946"),
    /** Background colour */
    backgroundColor: z.string().default("#0d0d0d"),
    /** Text colour */
    textColor: z.string().default("#f1faee"),
    /** Whether to show a chapter label at the start of each scene */
    showChapterLabels: z.boolean().default(true),
});

export type VietnamWarProps = z.infer<typeof VietnamWarSchema>;

export const defaultProps: VietnamWarProps = {
    title: "The Vietnam War",
    subtitle: "1955 – 1975",
    accentColor: "#e63946",
    backgroundColor: "#0d0d0d",
    textColor: "#f1faee",
    showChapterLabels: true,
};
