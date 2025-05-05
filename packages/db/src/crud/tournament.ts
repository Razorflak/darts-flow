import { prisma } from "src/prisma-client.js";
import type { Tournament } from "../prisma/generated/zod/index.js";

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
	data: Omit<Tournament, "id" | "eventId" | "createdAt" | "updatedAt">,
): Promise<Tournament> => {
	return prisma.tournament.create({
		data: {
			eventId,
			...data,
		},
	});
};

export const updateTournament = async (
	id: string,
	data: Omit<Tournament, "id" | "eventId" | "createdAt" | "updatedAt">,
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
