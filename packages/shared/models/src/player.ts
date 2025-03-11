import z from "zod";

export const playerSchema = z.object({
	id: z.string(),
	name: z.string(),
	fistName: z.string(),
});

export type Player = z.infer<typeof playerSchema>;

export const getPlayerDisplayName = (player: Player) =>
	`${player.fistName} ${player.name.at(0) ? `${player.name.at(0)}.` : ""}`;
