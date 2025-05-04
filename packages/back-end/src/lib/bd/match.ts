import { matchStatus, type Match } from "@dartsFlow/models"
import {
	existsSync,
	mkdirSync,
	readdirSync,
	readFileSync,
	stat,
	writeFileSync,
} from "node:fs"

import { readdir as readdirAsync, stat as statAsync } from "node:fs/promises"
import {
	ACTIVE_FOLDER,
	ARCHIVE_FOLDER,
	DELETE_FOLDER,
} from "../action/index.js"
import { getMostRecentFile } from "../file/file.js"
import { join } from "node:path"

export const createMatch = (match: Match) => {
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
}

export const updateMatch = (match: Match, inputMatchId: string) => {
	if (inputMatchId !== match.id) {
		throw new Error("Match ids does not match")
	}
	try {
		mkdirSync(ACTIVE_FOLDER)
	} catch {}
	writeFileSync(
		`${ACTIVE_FOLDER}/${match.id}.json`,
		JSON.stringify(match, null, 3),
	)
}

export const getActiveMatches = () => {
	const matchFileList = readdirSync(ACTIVE_FOLDER)
	const matches: Match[] = matchFileList.map((file) => {
		const matchString = readFileSync(`${ACTIVE_FOLDER}/${file}`).toString()
		return JSON.parse(matchString)
	})
	return matches
}

export const getMatch = (matchId: string) => {
	const mostRecentFile = getMostRecentFile(ACTIVE_FOLDER)
	if (!mostRecentFile) {
		throw new Error("match folder is empty")
	}
	const matchString = readFileSync(
		`${ACTIVE_FOLDER}/${matchId}.json`,
	).toString()
	const match: Match = JSON.parse(matchString)
	return match
}

export const getMostRecentActiveMatch = () => {
	const mostRecentFile = getMostRecentFile(ACTIVE_FOLDER)
	if (!mostRecentFile) {
		throw new Error("match folder is empty")
	}
}

export const getAllMatchFileInformations = async () => {
	const mapFolderStatus: Record<string, string> = {
		[ACTIVE_FOLDER]: matchStatus.ACTIVE,
		[ARCHIVE_FOLDER]: matchStatus.ARCHIVE,
		[DELETE_FOLDER]: matchStatus.DELETED,
	}
	const directories = [ACTIVE_FOLDER, ARCHIVE_FOLDER]
	const promises = directories.map(async (directory) => {
		const files = await readdirAsync(directory)
		const fileInfos = await Promise.all(
			files.map(async (file) => {
				const filePath = join(directory, file)
				const stats = await statAsync(filePath)
				const data = readFileSync(filePath, "utf-8")

				return {
					match: JSON.parse(data) as Match,
					status: mapFolderStatus[directory],
					fileInformation: {
						updatedTime: stats.mtime.toISOString(),
						createdTime: stats.birthtime.toISOString(),
						fileName: file,
					},
				}
			}),
		)
		return fileInfos
	})
	const result = await Promise.all(promises)
	return result.flat()
}
