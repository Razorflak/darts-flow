import express, { type Request, type Response } from "express"
import {
	getTournaments,
	getTournamentById,
	createTournament,
	updateTournament,
	deleteTournament,
} from "@dartsFlow/db"
import {
	TournamentUncheckedCreateInputSchema,
	TournamentUncheckedUpdateInputSchema,
} from "@dartsFlow/db/src/prisma/generated/zod/index.js"

const tournamentRouter = express.Router()

tournamentRouter.use(express.json())

tournamentRouter.get("/", async (_req: Request, res: Response) => {
	try {
		const tournaments = await getTournaments()
		res.json(tournaments)
	} catch (error) {
		console.error("Erreur lors de la récupération des tournois:", error)
		res.status(500).json({ error: "Impossible de récupérer les tournois." })
	}
})

tournamentRouter.get("/:id", async (req: Request, res: Response) => {
	const { id } = req.params
	try {
		const tournament = await getTournamentById(id)
		if (!tournament) {
			res.status(404).json({ error: `Tournoi avec l'ID ${id} non trouvé.` })
			return
		}
		res.json(tournament)
	} catch (error) {
		console.error(
			`Erreur lors de la récupération du tournoi avec l'ID ${id}:`,
			error,
		)
		res.status(500).json({ error: "Impossible de récupérer le tournoi." })
	}
})

tournamentRouter.post(
	"/events/:eventId",
	async (req: Request, res: Response) => {
		const { eventId } = req.params
		try {
			const parsedData = TournamentUncheckedCreateInputSchema.parse(req.body)
			const newTournament = await createTournament(eventId, parsedData)
			res.status(201).json(newTournament)
		} catch (error) {
			console.error("Erreur lors de la création du tournoi:", error)
			res.status(500).json({ error: "Impossible de créer le tournoi." })
		}
	},
)

tournamentRouter.put("/:id", async (req: Request, res: Response) => {
	const { id } = req.params
	try {
		const parsedData = TournamentUncheckedUpdateInputSchema.parse(req.body)
		const updatedTournament = await updateTournament(id, parsedData)
		res.json(updatedTournament)
	} catch (error) {
		console.error(
			`Erreur lors de la mise à jour du tournoi avec l'ID ${id}:`,
			error,
		)
		res.status(500).json({ error: "Impossible de mettre à jour le tournoi." })
	}
})

tournamentRouter.delete("/:id", async (req: Request, res: Response) => {
	const { id } = req.params
	try {
		await deleteTournament(id)
		res.status(204).send()
	} catch (error) {
		console.error(
			`Erreur lors de la suppression du tournoi avec l'ID ${id}:`,
			error,
		)
		res.status(500).json({ error: "Impossible de supprimer le tournoi." })
	}
})

export default tournamentRouter
