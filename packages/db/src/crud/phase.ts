import { prisma } from "src/prisma-client.js";
import type { Phase } from "../prisma/generated/zod/index.js";

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
	data: Omit<Phase, "id" | "tournamentId" | "createdAt">,
): Promise<Phase> => {
	return prisma.phase.create({
		data: {
			tournamentId,
			...data,
		},
	});
};

export const updatePhase = async (
	id: string,
	data: Omit<Phase, "id" | "tournamentId" | "createdAt">,
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
