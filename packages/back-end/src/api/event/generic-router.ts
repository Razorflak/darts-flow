import { makeCrud, prisma } from "@dartsFlow/db"
import express, { type Request, type Response } from "express"
import { z, type ZodSchema } from "zod"

// biome-ignore lint/suspicious/noExplicitAny: to avoid to rewrite the exeption again and again...
type Any = any

type PrismaModel = {
	findUnique: (...args: Any) => Any
	findMany: (...args: Any) => Any
	create: (...args: Any) => Any
	update: (...args: Any) => Any
	delete: (...args: Any) => Any
}

export const createDynamicRouter = (
	model: PrismaModel,
	modelName: string,
	controlSchemas: { updateSchema: ZodSchema; createSchema: ZodSchema },
) => {
	const router = express.Router()
	router.use(express.json())

	const crudMethods = makeCrud(model)

	router.get("/", async (_req: Request, res: Response) => {
		try {
			const events = await crudMethods.findMany()
			res.json(events)
		} catch (error) {
			console.error(`Erreur lors de la récupération des ${modelName}:`, error)
			res.status(500).json({ error: "Impossible de récupérer les événements." })
		}
	})

	router.get("/:id", async (req: Request, res: Response) => {
		const { id } = req.params
		try {
			const event = await crudMethods.findUnique(id)
			if (!event) {
				res
					.status(404)
					.json({ error: `${modelName} avec l'ID ${id} non trouvé.` })
				return
			}
			res.json(event)
		} catch (error) {
			console.error(
				`Erreur lors de la récupération de ${modelName} avec l'ID ${id}:`,
				error,
			)
			res.status(500).json({ error: `Impossible de récupérer ${modelName}.` })
		}
	})

	router.post("/", async (req: Request, res: Response) => {
		try {
			const parsedData = controlSchemas.createSchema.parse(req.body)
			const newEvent = await crudMethods.create(parsedData.id, parsedData)
			res.status(201).json(newEvent)
		} catch (error) {
			if (error instanceof z.ZodError) {
				res.status(400).json({ errors: error.errors })
				return
			}
			console.error(`Erreur lors de la création de ${modelName}:`, error)
			res.status(500).json({ error: `Impossible de créer ${modelName}` })
		}
	})

	router.put("/:id", async (req: Request, res: Response) => {
		const { id } = req.params
		const parsedData = controlSchemas.updateSchema.parse(req.body)
		try {
			const updatedEvent = await crudMethods.update(id, parsedData)
			res.json(updatedEvent)
		} catch (error) {
			console.error(
				`Erreur lors de la mise à jour de ${modelName} avec l'ID ${id}:`,
				error,
			)
			res
				.status(500)
				.json({ error: `Impossible de mettre à jour ${modelName}` })
		}
	})

	router.delete("/:id", async (req: Request, res: Response) => {
		const { id } = req.params
		try {
			await crudMethods.delete(id)
			res.status(204).send()
		} catch (error) {
			console.error(
				`Erreur lors de la suppression de ${modelName} avec l'ID ${id}:`,
				error,
			)
			res.status(500).json({ error: `Impossible de supprimer ${modelName}` })
		}
	})
	return router
}
