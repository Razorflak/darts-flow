import express, { type Request, type Response } from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const router = express.Router()

router.get("/", async (req: Request, res: Response) => {
	try {
		const events = await prisma.event.findMany()
		res.json(events)
	} catch (error) {
		console.error("Erreur lors de la récupération des événements:", error)
		res.status(500).json({ error: "Impossible de récupérer les événements." })
	}
})

router.get("/:id", async (req: Request, res: Response) => {
	const { id } = req.params
	try {
		const event = await prisma.event.findUnique({
			where: { id },
			include: { tournaments: true },
		})
		if (!event) {
			return res
				.status(404)
				.json({ error: `Événement avec l'ID ${id} non trouvé.` })
		}
		res.json(event)
	} catch (error) {
		console.error(
			`Erreur lors de la récupération de l'événement avec l'ID ${id}:`,
			error,
		)
		res.status(500).json({ error: "Impossible de récupérer l'événement." })
	}
})

router.post("/", async (req: Request, res: Response) => {
	const { name, startDate, endDate, location } = req.body
	try {
		const newEvent = await prisma.event.create({
			data: {
				name,
				startDate: startDate ? new Date(startDate) : null,
				endDate: endDate ? new Date(endDate) : null,
				location,
			},
		})
		res.status(201).json(newEvent)
	} catch (error) {
		console.error("Erreur lors de la création de l'événement:", error)
		res.status(500).json({ error: "Impossible de créer l'événement." })
	}
})

router.put("/:id", async (req: Request, res: Response) => {
	const { id } = req.params
	const { name, startDate, endDate, location } = req.body
	try {
		const updatedEvent = await prisma.event.update({
			where: { id },
			data: {
				name,
				startDate: startDate ? new Date(startDate) : null,
				endDate: endDate ? new Date(endDate) : null,
				location,
			},
		})
		res.json(updatedEvent)
	} catch (error) {
		console.error(
			`Erreur lors de la mise à jour de l'événement avec l'ID ${id}:`,
			error,
		)
		res.status(500).json({ error: "Impossible de mettre à jour l'événement." })
	}
})

router.delete("/:id", async (req: Request, res: Response) => {
	const { id } = req.params
	try {
		await prisma.event.delete({
			where: { id },
		})
		res.status(204).send()
	} catch (error) {
		console.error(
			`Erreur lors de la suppression de l'événement avec l'ID ${id}:`,
			error,
		)
		res.status(500).json({ error: "Impossible de supprimer l'événement." })
	}
})

export default router
