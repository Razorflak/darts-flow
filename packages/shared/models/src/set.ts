import z from "zod";
import { legSchema } from "./leg.js";

export const setSchema = z.object({
	id: z.string(),
	winnerTeamId: z.string().optional(),
	legs: z.array(legSchema),
	startingTeamId: z.string(),
});

// Je ne peux pas mettre Set car c'est un mot protégé
export type Lot = z.infer<typeof setSchema>;
