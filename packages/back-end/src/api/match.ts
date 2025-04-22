import express, { Router } from "express"
import cors from "cors"
import type { Request, Response } from "express"
import type { Match } from "@dartsScorer/models"
import {
	matchListTopic,
	matchTopic,
	moveMatchFileToArchiveFolder,
} from "../lib/action/index.js"
import {
	createMatch,
	getActiveMatches,
	getAllMatchFileInformations,
	getMatch,
	getMostRecentActiveMatch,
	updateMatch,
} from "../lib/bd/match.js"

const apiMatchRouter = Router()

apiMatchRouter.use(express.json())
apiMatchRouter.use(cors())

apiMatchRouter.post("/", async (req: Request, _res: Response) => {
	const match: Match = req.body
	createMatch(match)
	const fileMatchInformations = await getAllMatchFileInformations()
	matchListTopic.update(fileMatchInformations)
})

apiMatchRouter.put("/:id", async (req: Request, res: Response) => {
	const gameId = req.params.id
	const match: Match = req.body
	updateMatch(match, gameId)
	matchTopic.update(match)
	if (match.isOver) {
		moveMatchFileToArchiveFolder(match.id)
		const fileMatchInformations = await getAllMatchFileInformations()
		matchListTopic.update(fileMatchInformations)
	}
	matchListTopic.update
	res.sendStatus(200)
})

apiMatchRouter.get("/matches", (_req: Request, res: Response) => {
	try {
		const matches = getActiveMatches()
		res.send(matches)
	} catch (e: unknown) {
		res.send(null)
	}
})

apiMatchRouter.get("/:id?", (req: Request, res: Response) => {
	const matchId = req.params.id === "null" ? null : req.params.id
	try {
		const match = matchId ? getMatch(matchId) : getMostRecentActiveMatch()
		res.send(match)
	} catch (error: unknown) {
		res.status(404).send()
	}
})

export default apiMatchRouter
