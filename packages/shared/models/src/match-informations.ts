import z from "zod";
import { matchSchema } from "./match.js";

export const matchStatus = {
	ACTIVE: "active",
	ARCHIVE: "archive",
	DELETED: "deleted",
};

export const matchInformationSchema = z.object({
	match: matchSchema,
	status: z.string(),
	fileInformations: z.object({
		updatedTime: z.string(),
		createdTime: z.string(),
		fileName: z.string(),
	}),
});

export type MatchInformation = z.infer<typeof matchInformationSchema>;
