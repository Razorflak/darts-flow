import { prisma } from "src/prisma-client.js";
import type { TeamTournament } from "../prisma/generated/zod/index.js";

export const getTeamTournaments = async (): Promise<TeamTournament[]> => {
	return prisma.teamTournament.findMany();
};

export const getTeamTournamentById = async (
	id: string,
): Promise<TeamTournament | null> => {
	return prisma.teamTournament.findUnique({
		where: { id },
		include: { tournament: true, team: true },
	});
};

export const createTeamTournament = async (
	tournamentId: string,
	teamId: string,
	data: Omit<
		TeamTournament,
		"id" | "tournamentId" | "teamId" | "createdAt" | "updatedAt"
	>,
): Promise<TeamTournament> => {
	return prisma.teamTournament.create({
		data: {
			tournamentId,
			teamId,
			...data,
		},
	});
};

export const updateTeamTournament = async (
	id: string,
	data: Omit<
		TeamTournament,
		"id" | "tournamentId" | "teamId" | "createdAt" | "updatedAt"
	>,
): Promise<TeamTournament> => {
	return prisma.teamTournament.update({
		where: { id },
		data,
	});
};

export const deleteTeamTournament = async (
	id: string,
): Promise<TeamTournament> => {
	return prisma.teamTournament.delete({
		where: { id },
	});
};
