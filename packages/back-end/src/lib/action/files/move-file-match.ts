import { existsSync, mkdirSync, renameSync } from "node:fs"

export const ACTIVE_FOLDER = "./matches/active"
export const ARCHIVE_FOLDER = "./matches/archive"
export const DELETE_FOLDER = "./matches/deleted"

export const moveMatchFileToArchiveFolder = (matchId: string) => {
	if (!existsSync(ARCHIVE_FOLDER)) {
		mkdirSync(ARCHIVE_FOLDER)
	}
	renameSync(
		`${ACTIVE_FOLDER}/${matchId}.json`,
		`${ARCHIVE_FOLDER}/${matchId}.json`,
	)
}

export const moveMatchFileToDeleteFolder = (matchId: string) => {
	if (!existsSync(DELETE_FOLDER)) {
		mkdirSync(DELETE_FOLDER)
	}
	renameSync(
		`${ACTIVE_FOLDER}/${matchId}.json`,
		`${DELETE_FOLDER}/${matchId}.json`,
	)
}
