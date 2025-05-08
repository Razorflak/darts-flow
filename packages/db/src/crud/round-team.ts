import { prisma } from "../prisma-client.js";
import type { RoundTeam } from "../prisma/generated/zod/index.js";
import type { Prisma } from "@prisma/client";

export const getRoundTeams = async (): Promise<RoundTeam[]> => {
	return prisma.roundTeam.findMany();
};

export const getRoundTeamById = async (
	id: string,
): Promise<RoundTeam | null> => {
	return prisma.roundTeam.findUnique({
		where: { id },
		include: { round: true, team: true },
	});
};

export const createRoundTeam = async (
	roundId: string,
	teamId: string,
): Promise<RoundTeam> => {
	return prisma.roundTeam.create({
		data: {
			roundId,
			teamId,
		},
	});
};

export const updateRoundTeam = async (
	id: string,
	data: Prisma.RoundTeamUncheckedUpdateInput,
): Promise<RoundTeam> => {
	return prisma.roundTeam.update({
		where: { id },
		data,
	});
};

export const deleteRoundTeam = async (id: string): Promise<RoundTeam> => {
	return prisma.roundTeam.delete({
		where: { id },
	});
};

// Fonction pour trouver les RoundTeams pour un Round spécifique
export const getRoundTeamsByRoundId = async (
	roundId: string,
): Promise<RoundTeam[]> => {
	return prisma.roundTeam.findMany({
		where: { roundId },
		include: { team: true },
	});
};

// Fonction pour trouver les RoundTeams pour une Team spécifique dans un Round
export const getRoundTeamByRoundIdAndTeamId = async (
	roundId: string,
	teamId: string,
): Promise<RoundTeam | null> => {
	return prisma.roundTeam.findUnique({
		where: {
			roundId_teamId: {
				roundId,
				teamId,
			},
		},
	});
};
