import express, { type Request, type Response } from "express"
import {
	getRoundTeams,
	getRoundTeamById,
	createRoundTeam,
	updateRoundTeam,
	deleteRoundTeam,
} from "@dartsFlow/db"
import { z } from "zod"

const roundTeamRouter = express.Router()

roundTeamRouter.use(express.json())

const createRoundTeamSchema = z.object({
	teamId: z.string(),
})

const updateRoundTeamSchema = z.object({
	teamId: z.string().optional(),
	roundId: z.string().optional(),
})

roundTeamRouter.get("/", async (_req: Request, res: Response) => {
	try {
		const roundTeams = await getRoundTeams()
		res.json(roundTeams)
	} catch (error) {
		console.error(
			"Erreur lors de la récupération des associations équipe-tour:",
			error,
		)
		res
			.status(500)
			.json({ error: "Impossible de récupérer les associations équipe-tour." })
	}
})

roundTeamRouter.get("/:id", async (req: Request, res: Response) => {
	const { id } = req.params
	try {
		const roundTeam = await getRoundTeamById(id)
		if (!roundTeam) {
			res
				.status(404)
				.json({ error: `Association équipe-tour avec l'ID ${id} non trouvée.` })
			return
		}
		res.json(roundTeam)
	} catch (error) {
		console.error(
			`Erreur lors de la récupération de l'association équipe-tour avec l'ID ${id}:`,
			error,
		)
		res
			.status(500)
			.json({ error: "Impossible de récupérer l'association équipe-tour." })
	}
})

roundTeamRouter.post(
	"/rounds/:roundId/teams",
	async (req: Request, res: Response) => {
		const { roundId } = req.params
		try {
			const parsedData = createRoundTeamSchema.parse(req.body)
			const newRoundTeam = await createRoundTeam(roundId, parsedData.teamId)
			res.status(201).json(newRoundTeam)
		} catch (error: unknown) {
			if (error instanceof z.ZodError) {
				res.status(400).json({ errors: error.errors })
				return
			}
			console.error("Erreur lors de l'ajout de l'équipe au tour:", error)
			res.status(500).json({ error: "Impossible d'ajouter l'équipe au tour." })
		}
	},
)

roundTeamRouter.put("/:id", async (req: Request, res: Response) => {
	const { id } = req.params
	try {
		const parsedData = updateRoundTeamSchema.parse(req.body)
		const updatedRoundTeam = await updateRoundTeam(id, parsedData)
		res.json(updatedRoundTeam)
	} catch (error: unknown) {
		if (error instanceof z.ZodError) {
			res.status(400).json({ errors: error.errors })
			return
		}
		console.error(
			`Erreur lors de la mise à jour de l'association équipe-tour avec l'ID ${id}:`,
			error,
		)
		res
			.status(500)
			.json({ error: "Impossible de mettre à jour l'association équipe-tour." })
	}
})

roundTeamRouter.delete("/:id", async (req: Request, res: Response) => {
	const { id } = req.params
	try {
		await deleteRoundTeam(id)
		res.status(204).send()
	} catch (error) {
		console.error(
			`Erreur lors de la suppression de l'association équipe-tour avec l'ID ${id}:`,
			error,
		)
		res
			.status(500)
			.json({ error: "Impossible de supprimer l'association équipe-tour." })
	}
})

export default roundTeamRouter
