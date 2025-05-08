import { prisma } from "../prisma-client.js";
import type { TeamTournament } from "../prisma/generated/zod/index.js";
import type { Prisma } from "@prisma/client";

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
	data: Prisma.TeamTournamentUncheckedCreateInput,
): Promise<TeamTournament> => {
	return prisma.teamTournament.create({
		data: {
			...data,
			tournamentId,
			teamId,
		},
	});
};

export const updateTeamTournament = async (
	id: string,
	data: Prisma.TeamTournamentUncheckedUpdateInput,
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
