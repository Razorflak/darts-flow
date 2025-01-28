import z from "zod";

export const throwSchema = z.object({
	score: z.number(),
	teamId: z.string(),
	darts: z.number(),
});

export type Throw = z.infer<typeof throwSchema>;
