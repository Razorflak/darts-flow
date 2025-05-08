import express, { type Request, type Response } from "express"
import {
	getEvents,
	getEventById,
	createEvent,
	updateEvent,
	deleteEvent,
	EventUncheckedCreateInputSchema,
} from "@dartsFlow/db"
import { z } from "zod"

const eventRouter = express.Router()

eventRouter.use(express.json())

eventRouter.get("/", async (_req: Request, res: Response) => {
	try {
		const events = await getEvents()
		res.json(events)
	} catch (error) {
		console.error("Erreur lors de la récupération des événements:", error)
		res.status(500).json({ error: "Impossible de récupérer les événements." })
	}
})

eventRouter.get("/:id", async (req: Request, res: Response) => {
	const { id } = req.params
	console.log("JTA id", id)
	try {
		const event = await getEventById(id)
		if (!event) {
			res.status(404).json({ error: `Événement avec l'ID ${id} non trouvé.` })
			return
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

eventRouter.post("/", async (req: Request, res: Response) => {
	try {
		console.log("JTA body", req.body)
		const parsedData = EventUncheckedCreateInputSchema.parse(req.body)
		const newEvent = await createEvent(parsedData)
		res.status(201).json(newEvent)
	} catch (error) {
		console.log("JTA", error.message, error instanceof z.ZodError)
		if (error instanceof z.ZodError) {
			res.status(400).json({ errors: error.errors })
			return
		}
		console.error("Erreur lors de la création de l'événement:", error)
		res.status(500).json({ error: "Impossible de créer l'événement." })
	}
})

eventRouter.put("/:id", async (req: Request, res: Response) => {
	const { id } = req.params
	const { name, startDate, endDate, location } = req.body
	try {
		const updatedEvent = await updateEvent(id, {
			name,
			startDate,
			endDate,
			location,
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

eventRouter.delete("/:id", async (req: Request, res: Response) => {
	const { id } = req.params
	try {
		const deletedEvent = await deleteEvent(id)
		res.status(204).send()
	} catch (error) {
		console.error(
			`Erreur lors de la suppression de l'événement avec l'ID ${id}:`,
			error,
		)
		res.status(500).json({ error: "Impossible de supprimer l'événement." })
	}
})

export default eventRouter
