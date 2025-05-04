import express, { Router } from "express"
import cors from "cors"
import type { Request, Response } from "express"
import type { Match } from "@dartsFlow/models"
import { readdirSync, readFileSync } from "node:fs"
import { getMostRecentFile } from "../lib/file/file.js"
import { ARCHIVE_FOLDER } from "../lib/action/index.js"

const apiMatchArchiveRouter = Router()

apiMatchArchiveRouter.use(express.json())
apiMatchArchiveRouter.use(cors())

apiMatchArchiveRouter.get("/matches", (req: Request, res: Response) => {
	try {
		const matchFileList = readdirSync(ARCHIVE_FOLDER)
		const games: Match[] = matchFileList.map((file) => {
			const matchString = readFileSync(`${ARCHIVE_FOLDER}/${file}`).toString()
			return JSON.parse(matchString)
		})
		res.send(games)
	} catch (e: unknown) {
		res.send([])
	}
})

apiMatchArchiveRouter.get("/:id?", (req: Request, res: Response) => {
	try {
		const gameId = req.params.id === "null" ? null : req.params.id
		const mostRecentFile = getMostRecentFile(ARCHIVE_FOLDER)
		if (!mostRecentFile) {
			throw new Error("match folder is empty")
		}
		const matchString = gameId
			? readFileSync(`${ARCHIVE_FOLDER}/${gameId}.json`).toString()
			: readFileSync(`${ARCHIVE_FOLDER}/${mostRecentFile}`).toString()
		const match: Match = JSON.parse(matchString)
		res.send(match)
	} catch (e: unknown) {
		res.send(null)
	}
})

export default apiMatchArchiveRouter
