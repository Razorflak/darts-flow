import express, { Router } from "express"
import cors from "cors"
import type { Request, Response } from "express"
import type { Match, Throw } from "@dartsScorer/models"
import {
	existsSync,
	mkdirSync,
	readdirSync,
	readFileSync,
	writeFileSync,
} from "node:fs"
import { getMostRecentFile } from "../lib/file/file.js"

const apiRouter = Router()

apiRouter.use(express.json())
apiRouter.use(cors())

apiRouter.get("/", (req: Request, res: Response) => {
	res.json({ message: "Bienvenue à la racine de l'API" })
})

apiRouter.post("/match", (req: Request, res: Response) => {
	const match: Match = req.body
	try {
		mkdirSync("./matches")
	} catch {}
	if (existsSync(`./matches/${match.id}.json`)) {
		throw new Error("Match already exist")
	}
	writeFileSync(`./matches/${match.id}.json`, JSON.stringify(match, null, 3))
	res.sendStatus(200)
})

apiRouter.patch("/match/:id", (req: Request, res: Response) => {
	const gameId = req.params.id
	const match: Match = req.body
	if (gameId !== match.id) {
		throw new Error("Match ids does not match")
	}
	try {
		mkdirSync("./matches")
	} catch {}
	writeFileSync(`./matches/${match.id}.json`, JSON.stringify(match, null, 3))
	res.sendStatus(200)
})

apiRouter.get("/match/:id?", (req: Request, res: Response) => {
	const gameId = req.params.id
	const mostRecentFile = getMostRecentFile("./matches")
	if (!mostRecentFile) {
		throw new Error("match folder is empty")
	}
	const matchString = gameId
		? readFileSync(`./matches/${gameId}.json`).toString()
		: readFileSync(`./matches/${mostRecentFile}`).toString()
	res.send(JSON.parse(matchString))
})

apiRouter.get("/matches", (req: Request, res: Response) => {
	const matchFileList = readdirSync("./matches")
	const games: Match[] = matchFileList.map((file) => {
		const matchString = readFileSync(`./matches/${file}`).toString()
		return JSON.parse(matchString)
	})
	res.send(games)
})

export default apiRouter
