import express, { type Request, type Response } from "express"
import {
	getPhases,
	getPhaseById,
	createPhase,
	updatePhase,
	deletePhase,
} from "@dartsFlow/db"
import { z } from "zod"
import {
	PhaseUncheckedCreateInputSchema,
	PhaseUncheckedUpdateInputSchema,
} from "@dartsFlow/db/src/prisma/generated/zod/index.js"

const phaseRouter = express.Router()

phaseRouter.use(express.json())

phaseRouter.get("/", async (_req: Request, res: Response) => {
	try {
		const phases = await getPhases()
		res.json(phases)
	} catch (error) {
		console.error("Erreur lors de la récupération des phases:", error)
		res.status(500).json({ error: "Impossible de récupérer les phases." })
	}
})

phaseRouter.get("/:id", async (req: Request, res: Response) => {
	const { id } = req.params
	try {
		const phase = await getPhaseById(id)
		if (!phase) {
			res.status(404).json({ error: `Phase avec l'ID ${id} non trouvée.` })
			return
		}
		res.json(phase)
	} catch (error) {
		console.error(
			`Erreur lors de la récupération de la phase avec l'ID ${id}:`,
			error,
		)
		res.status(500).json({ error: "Impossible de récupérer la phase." })
	}
})

phaseRouter.post(
	"/tournaments/:tournamentId",
	async (req: Request, res: Response) => {
		const { tournamentId } = req.params
		try {
			const parsedData = PhaseUncheckedCreateInputSchema.parse(req.body)
			const newPhase = await createPhase(tournamentId, parsedData)
			res.status(201).json(newPhase)
		} catch (error: unknown) {
			if (error instanceof z.ZodError) {
				res.status(400).json({ errors: error.errors })
				return
			}
			console.error("Erreur lors de la création de la phase:", error)
			res.status(500).json({ error: "Impossible de créer la phase." })
		}
	},
)

phaseRouter.put("/:id", async (req: Request, res: Response) => {
	const { id } = req.params
	try {
		const parsedData = PhaseUncheckedUpdateInputSchema.parse(req.body)
		const updatedPhase = await updatePhase(id, parsedData)
		res.json(updatedPhase)
	} catch (error: unknown) {
		if (error instanceof z.ZodError) {
			res.status(400).json({ errors: error.errors })
			return
		}
		console.error(
			`Erreur lors de la mise à jour de la phase avec l'ID ${id}:`,
			error,
		)
		res.status(500).json({ error: "Impossible de mettre à jour la phase." })
	}
})

phaseRouter.delete("/:id", async (req: Request, res: Response) => {
	const { id } = req.params
	try {
		await deletePhase(id)
		res.status(204).send()
	} catch (error) {
		console.error(
			`Erreur lors de la suppression de la phase avec l'ID ${id}:`,
			error,
		)
		res.status(500).json({ error: "Impossible de supprimer la phase." })
	}
})

export default phaseRouter
