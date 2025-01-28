import z from "zod";
import { playerSchema } from "./player.js";

export const teamSchema = z.object({
	id: z.string(),
	players: z.array(playerSchema),
	displayName: z.string(),
	initialScore: z.number(),
	currentScore: z.number(),
	legCountWon: z.number(),
	setCountWon: z.number(),
	isActive: z.boolean(),
});

export type Team = z.infer<typeof teamSchema>;
