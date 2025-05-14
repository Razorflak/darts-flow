import { prisma } from "../prisma-client.js";
type DelegateCrud<
	T extends {
		create: (args: any) => any;
		update: (args: any) => any;
		delete: (args: any) => any;
		findUnique: (args: any) => any;
		findMany: (args: any) => any;
	},
> = {
	findUnique: (
		id: string,
		include?: Parameters<T["findUnique"]>[0]["include"],
	) => ReturnType<T["findUnique"]>;
	findMany: (
		include?: Parameters<T["findMany"]>[0]["include"],
	) => ReturnType<T["findMany"]>;
	create: (
		id: string,
		item: Parameters<T["create"]>[0]["data"],
	) => ReturnType<T["create"]>;
	update: (
		id: string,
		item: Parameters<T["update"]>[0]["data"],
	) => ReturnType<T["update"]>;
	delete: (id: string) => ReturnType<T["delete"]>;
};

export const makeCrud = <
	T extends {
		create: (args: any) => any;
		update: (args: any) => any;
		delete: (args: any) => any;
		findUnique: (args: any) => any;
		findMany: () => any;
	},
>(
	delegate: T,
): DelegateCrud<T> => {
	return {
		findUnique: (id: string) => delegate.findUnique({ where: { id } }),

		findMany: () => delegate.findMany(),

		create: (id, item) =>
			delegate.create({
				data: {
					...item,
					id,
				},
			}),

		update: (id, data) =>
			delegate.update({
				where: { id },
				data,
			}),

		delete: (id) => delegate.delete({ where: { id } }),
	};
};
