import { z } from "zod";

export const IQTestSchema = z.object({
    /** The question to display */
    questionText: z.string().default("What comes next in the pattern: 2, 6, 12, 20, ?"),
    /** Answer options (up to 4) */
    options: z.array(z.string()).default(["28", "30", "32", "36"]),
    /** Index of the correct answer (0-based) */
    correctIndex: z.number().min(0).max(3).default(1),
    /** Countdown timer seconds */
    timerSeconds: z.number().min(1).default(5),
    /** Accent colour for branding */
    accentColor: z.string().default("#7c3aed"),
    /** Secondary accent for gradients */
    accentColorAlt: z.string().default("#06b6d4"),
    /** Background colour */
    backgroundColor: z.string().default("#0a0a1a"),
    /** Text colour */
    textColor: z.string().default("#ffffff"),
    /** Correct answer highlight colour */
    correctColor: z.string().default("#00e676"),
    /** Title shown in intro */
    introTitle: z.string().default("🧠 IQ TEST"),
    /** Subtitle shown in intro */
    introSubtitle: z.string().default("Can you solve this?"),
    /** CTA text for the outro */
    ctaText: z.string().default("Follow for more IQ tests!"),
});

export type IQTestProps = z.infer<typeof IQTestSchema>;

export const defaultProps: IQTestProps = {
    questionText: "What comes next in the pattern: 2, 6, 12, 20, ?",
    options: ["28", "30", "32", "36"],
    correctIndex: 1,
    timerSeconds: 5,
    accentColor: "#7c3aed",
    accentColorAlt: "#06b6d4",
    backgroundColor: "#0a0a1a",
    textColor: "#ffffff",
    correctColor: "#00e676",
    introTitle: "🧠 IQ TEST",
    introSubtitle: "Can you solve this?",
    ctaText: "Follow for more IQ tests!",
};
