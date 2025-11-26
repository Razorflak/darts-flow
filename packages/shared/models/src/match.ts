import z from "zod";
import { setSchema } from "./set.js";
import { teamSchema } from "./team.js";

export const matchSchema = z.object({
  id: z.string(),
  setNeededToWin: z.number(),
  legNeededToWin: z.number(),
  competition: z.string(),
  sets: z.array(setSchema),
  competitionStage: z.string(),
  teams: z.array(teamSchema).length(2),
  isOver: z.boolean(),
  winningTeamId: z.string().optional(),
  isCountUp: z.boolean().optional(),
});

export type Match = z.infer<typeof matchSchema>;
