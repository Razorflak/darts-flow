import z from "zod";
import { throwSchema } from "./throw.js";

export const legSchema = z.object({
	id: z.string(),
	startingTeamId: z.string(),
	winningTeamId: z.string().optional(),
	throws: z.array(throwSchema),
});

export type Leg = z.infer<typeof legSchema>;
