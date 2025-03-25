import z from "zod";
import { getPlayerDisplayName, playerSchema } from "./player.js";

export const teamSchema = z.object({
	id: z.string(),
	players: z.array(playerSchema),
	initialScore: z.number(),
	currentScore: z.number(),
	legCountWon: z.number(),
	setCountWon: z.number(),
	isActive: z.boolean(),
});

export type Team = z.infer<typeof teamSchema>;

export const getTeamDisplayName = (team: Team, separator = " / ") =>
	team.players.map((p) => getPlayerDisplayName(p)).join(separator);
