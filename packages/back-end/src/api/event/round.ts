import express, { type Request, type Response } from "express"
import {
	getRounds,
	getRoundById,
	createRound,
	updateRound,
	deleteRound,
} from "@dartsFlow/db"
import { z } from "zod"
import {
	RoundUncheckedCreateInputSchema,
	RoundUncheckedUpdateInputSchema,
} from "@dartsFlow/db/src/prisma/generated/zod/index.js"

const roundRouter = express.Router()

roundRouter.use(express.json())

roundRouter.get("/", async (_req: Request, res: Response) => {
	try {
		const rounds = await getRounds()
		res.json(rounds)
	} catch (error) {
		console.error("Erreur lors de la récupération des tours:", error)
		res.status(500).json({ error: "Impossible de récupérer les tours." })
	}
})

roundRouter.get("/:id", async (req: Request, res: Response) => {
	const { id } = req.params
	try {
		const round = await getRoundById(id)
		if (!round) {
			res.status(404).json({ error: `Tour avec l'ID ${id} non trouvé.` })
			return
		}
		res.json(round)
	} catch (error) {
		console.error(
			`Erreur lors de la récupération du tour avec l'ID ${id}:`,
			error,
		)
		res.status(500).json({ error: "Impossible de récupérer le tour." })
	}
})

roundRouter.post("/phases/:phaseId", async (req: Request, res: Response) => {
	const { phaseId } = req.params
	try {
		const parsedData = RoundUncheckedCreateInputSchema.parse(req.body)
		const newRound = await createRound(phaseId, parsedData)
		res.status(201).json(newRound)
	} catch (error: unknown) {
		if (error instanceof z.ZodError) {
			res.status(400).json({ errors: error.errors })
			return
		}
		console.error("Erreur lors de la création du tour:", error)
		res.status(500).json({ error: "Impossible de créer le tour." })
	}
})

roundRouter.put("/:id", async (req: Request, res: Response) => {
	const { id } = req.params
	try {
		const parsedData = RoundUncheckedUpdateInputSchema.parse(req.body)
		const updatedRound = await updateRound(id, parsedData)
		res.json(updatedRound)
	} catch (error: unknown) {
		if (error instanceof z.ZodError) {
			res.status(400).json({ errors: error.errors })
			return
		}
		console.error(
			`Erreur lors de la mise à jour du tour avec l'ID ${id}:`,
			error,
		)
		res.status(500).json({ error: "Impossible de mettre à jour le tour." })
	}
})

roundRouter.delete("/:id", async (req: Request, res: Response) => {
	const { id } = req.params
	try {
		await deleteRound(id)
		res.status(204).send()
	} catch (error) {
		console.error(
			`Erreur lors de la suppression du tour avec l'ID ${id}:`,
			error,
		)
		res.status(500).json({ error: "Impossible de supprimer le tour." })
	}
})

export default roundRouter
