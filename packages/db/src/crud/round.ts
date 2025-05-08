import { prisma } from "../prisma-client.js";
import type { Round } from "../prisma/generated/zod/index.js";
import type { Prisma } from "@prisma/client";

export const getRounds = async (): Promise<Round[]> => {
	return prisma.round.findMany();
};

export const getRoundById = async (id: string): Promise<Round | null> => {
	return prisma.round.findUnique({
		where: { id },
		include: { matches: true, roundTeam: true },
	});
};

export const createRound = async (
	phaseId: string,
	data: Prisma.RoundUncheckedCreateInput,
): Promise<Round> => {
	return prisma.round.create({
		data: {
			...data,
			phaseId,
		},
	});
};

export const updateRound = async (
	id: string,
	data: Prisma.RoundUncheckedUpdateInput,
): Promise<Round> => {
	return prisma.round.update({
		where: { id },
		data,
	});
};

export const deleteRound = async (id: string): Promise<Round> => {
	return prisma.round.delete({
		where: { id },
	});
};
