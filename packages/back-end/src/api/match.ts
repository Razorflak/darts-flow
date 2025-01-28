import express, { Router } from "express"
import cors from "cors"
import type { Request, Response } from "express"
import type { Match } from "@dartsScorer/models"
import {
	existsSync,
	mkdirSync,
	readdirSync,
	readFileSync,
	writeFileSync,
} from "node:fs"
import { getMostRecentFile } from "../lib/file/file.js"
import {
	ACTIVE_FOLDER,
	matchUpdate,
	moveMatchFileToArchiveFolder,
} from "../lib/action/index.js"

const apiMatchRouter = Router()

apiMatchRouter.use(express.json())
apiMatchRouter.use(cors())

apiMatchRouter.post("/", (req: Request, res: Response) => {
	const match: Match = req.body
	try {
		mkdirSync(ACTIVE_FOLDER)
	} catch {}
	if (existsSync(`${ACTIVE_FOLDER}/${match.id}.json`)) {
		throw new Error("Match already exist")
	}
	writeFileSync(
		`${ACTIVE_FOLDER}/${match.id}.json`,
		JSON.stringify(match, null, 3),
	)
	matchUpdate(match)
	res.sendStatus(200)
})

apiMatchRouter.put("/:id", (req: Request, res: Response) => {
	const gameId = req.params.id
	const match: Match = req.body
	if (gameId !== match.id) {
		throw new Error("Match ids does not match")
	}
	try {
		mkdirSync(ACTIVE_FOLDER)
	} catch {}
	writeFileSync(
		`${ACTIVE_FOLDER}/${match.id}.json`,
		JSON.stringify(match, null, 3),
	)
	matchUpdate(match)
	if (match.isOver) {
		moveMatchFileToArchiveFolder(match.id)
	}
	res.sendStatus(200)
})

apiMatchRouter.get("/matches", (req: Request, res: Response) => {
	const matchFileList = readdirSync(ACTIVE_FOLDER)
	const games: Match[] = matchFileList.map((file) => {
		const matchString = readFileSync(`${ACTIVE_FOLDER}/${file}`).toString()
		return JSON.parse(matchString)
	})
	res.send(games)
})

apiMatchRouter.get("/:id?", (req: Request, res: Response) => {
	const gameId = req.params.id === "null" ? null : req.params.id
	const mostRecentFile = getMostRecentFile(ACTIVE_FOLDER)
	if (!mostRecentFile) {
		throw new Error("match folder is empty")
	}
	const matchString = gameId
		? readFileSync(`${ACTIVE_FOLDER}/${gameId}.json`).toString()
		: readFileSync(`${ACTIVE_FOLDER}/${mostRecentFile}`).toString()
	const match: Match = JSON.parse(matchString)
	res.send(match)
})

export default apiMatchRouter
