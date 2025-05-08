import express, { type Request, type Response } from "express"
import {
	getTeamTournaments,
	getTeamTournamentById,
	createTeamTournament,
	updateTeamTournament,
	deleteTeamTournament,
} from "@dartsFlow/db"
import { z } from "zod"
import {
	TeamTournamentUncheckedCreateInputSchema,
	TeamTournamentUncheckedUpdateInputSchema,
} from "@dartsFlow/db/src/prisma/generated/zod/index.js"

const teamTournamentRouter = express.Router()

teamTournamentRouter.use(express.json())

teamTournamentRouter.get("/", async (_req: Request, res: Response) => {
	try {
		const teamTournaments = await getTeamTournaments()
		res.json(teamTournaments)
	} catch (error) {
		console.error(
			"Erreur lors de la récupération des associations équipe-tournoi:",
			error,
		)
		res.status(500).json({
			error: "Impossible de récupérer les associations équipe-tournoi.",
		})
	}
})

teamTournamentRouter.get("/:id", async (req: Request, res: Response) => {
	const { id } = req.params
	try {
		const teamTournament = await getTeamTournamentById(id)
		if (!teamTournament) {
			res.status(404).json({
				error: `Association équipe-tournoi avec l'ID ${id} non trouvée.`,
			})
			return
		}
		res.json(teamTournament)
	} catch (error) {
		console.error(
			`Erreur lors de la récupération de l'association équipe-tournoi avec l'ID ${id}:`,
			error,
		)
		res
			.status(500)
			.json({ error: "Impossible de récupérer l'association équipe-tournoi." })
	}
})

teamTournamentRouter.post(
	"/tournaments/:tournamentId",
	async (req: Request, res: Response) => {
		const { tournamentId } = req.params
		try {
			const parsedData = TeamTournamentUncheckedCreateInputSchema.parse(
				req.body,
			)
			const newTeamTournament = await createTeamTournament(
				tournamentId,
				parsedData.teamId,
				parsedData,
			)
			res.status(201).json(newTeamTournament)
		} catch (error: unknown) {
			if (error instanceof z.ZodError) {
				res.status(400).json({ errors: error.errors })
				return
			}
			console.error("Erreur lors de l'ajout de l'équipe au tournoi:", error)
			res
				.status(500)
				.json({ error: "Impossible d'ajouter l'équipe au tournoi." })
		}
	},
)

teamTournamentRouter.put("/:id", async (req: Request, res: Response) => {
	const { id } = req.params
	try {
		const parsedData = TeamTournamentUncheckedUpdateInputSchema.parse(req.body)
		const updatedTeamTournament = await updateTeamTournament(id, parsedData)
		res.json(updatedTeamTournament)
	} catch (error: unknown) {
		if (error instanceof z.ZodError) {
			res.status(400).json({ errors: error.errors })
			return
		}
		console.error(
			`Erreur lors de la mise à jour de l'association équipe-tournoi avec l'ID ${id}:`,
			error,
		)
		res.status(500).json({
			error: "Impossible de mettre à jour l'association équipe-tournoi.",
		})
	}
})

teamTournamentRouter.delete("/:id", async (req: Request, res: Response) => {
	const { id } = req.params
	try {
		await deleteTeamTournament(id)
		res.status(204).send()
	} catch (error) {
		console.error(
			`Erreur lors de la suppression de l'association équipe-tournoi avec l'ID ${id}:`,
			error,
		)
		res
			.status(500)
			.json({ error: "Impossible de supprimer l'association équipe-tournoi." })
	}
})

export default teamTournamentRouter
