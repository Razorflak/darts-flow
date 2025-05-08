import type { Prisma, Phase } from "@prisma/client";
import { prisma } from "../prisma-client.js";

export const getPhases = async (): Promise<Phase[]> => {
	return prisma.phase.findMany();
};

export const getPhaseById = async (id: string): Promise<Phase | null> => {
	return prisma.phase.findUnique({
		where: { id },
		include: { rounds: true, previousPhase: true, nextPhase: true },
	});
};

export const createPhase = async (
	tournamentId: string,
	data: Prisma.PhaseUncheckedCreateInput,
): Promise<Phase> => {
	return prisma.phase.create({
		data: {
			...data,
			tournamentId,
		},
	});
};

export const updatePhase = async (
	id: string,
	data: Prisma.PhaseUncheckedUpdateInput,
): Promise<Phase> => {
	return prisma.phase.update({
		where: { id },
		data,
	});
};

export const deletePhase = async (id: string): Promise<Phase> => {
	return prisma.phase.delete({
		where: { id },
	});
};
