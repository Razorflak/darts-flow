import { prisma } from "src/prisma-client.js";
import type { Event } from "src/prisma/generated/zod/index.js";

export const getEvents = async (): Promise<Event[]> => {
	return prisma.event.findMany();
};

export const getEventById = async (id: string): Promise<Event | null> => {
	return prisma.event.findUnique({
		where: { id },
		include: { tournaments: true },
	});
};

export const createEvent = async (
	data: Omit<Event, "id" | "createdAt" | "updatedAt">,
): Promise<Event> => {
	return prisma.event.create({
		data,
	});
};

export const updateEvent = async (
	id: string,
	data: Omit<Event, "id" | "createdAt" | "updatedAt">,
): Promise<Event> => {
	return prisma.event.update({
		where: { id },
		data,
	});
};

export const deleteEvent = async (id: string): Promise<Event> => {
	return prisma.event.delete({
		where: { id },
	});
};
