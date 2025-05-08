import { prisma } from "../prisma-client.js";
import type { Tournament } from "../prisma/generated/zod/index.js";
import type { Prisma } from "@prisma/client";

export const getTournaments = async (): Promise<Tournament[]> => {
	return prisma.tournament.findMany();
};

export const getTournamentById = async (
	id: string,
): Promise<Tournament | null> => {
	return prisma.tournament.findUnique({
		where: { id },
		include: { phases: true, teams: true },
	});
};

export const createTournament = async (
	eventId: string,
	data: Prisma.TournamentUncheckedCreateInput,
): Promise<Tournament> => {
	return prisma.tournament.create({
		data: {
			...data,
			eventId,
		},
	});
};

export const updateTournament = async (
	id: string,
	data: Prisma.TournamentUncheckedUpdateInput,
): Promise<Tournament> => {
	return prisma.tournament.update({
		where: { id },
		data,
	});
};

export const deleteTournament = async (id: string): Promise<Tournament> => {
	return prisma.tournament.delete({
		where: { id },
	});
};
