import type { Match } from "@dartsFlow/models"
import { ACTIVE_FOLDER, sendWsMessageById } from "../index.js"
import { UPDATE_COMMANDS, type WsMessage } from "@dartsFlow/shared-ws"
import { getMostRecentFile } from "../../file/file.js"
import { readFileSync } from "node:fs"

type WebsocketMatchUpdateSuscriber = {
	matchId: string
	clientId: string
}

let matchUpdateSuscribers: WebsocketMatchUpdateSuscriber[] = []

export const matchTopic = {
	subscribe: (wsId: string, matchId: string) => {
		matchUpdateSuscribers.push({ matchId, clientId: wsId })

		// When a new client subscribe to match update, we send him back the info from the mathc
		const mostRecentFile = getMostRecentFile(ACTIVE_FOLDER)
		if (!mostRecentFile) {
			return null
		}
		try {
			const matchString =
				matchId !== "all"
					? readFileSync(`${ACTIVE_FOLDER}/${matchId}.json`).toString()
					: readFileSync(`${ACTIVE_FOLDER}/${mostRecentFile}`).toString()
			const match: Match = JSON.parse(matchString)
			const message: WsMessage = {
				id: crypto.randomUUID(),
				command: UPDATE_COMMANDS.matchUpdate,
				data: match,
			}
			sendWsMessageById(wsId, message)
		} catch (e: unknown) {
			return null
		}
	},

	unsubscribe: (clientId: string) => {
		matchUpdateSuscribers = matchUpdateSuscribers.filter(
			(sub) => sub.clientId !== clientId,
		)
	},

	update: (match: Match) => {
		const subscribersToSend = matchUpdateSuscribers.filter(
			(ws) => ws.matchId === match.id || ws.matchId === "all",
		)
		for (const sub of subscribersToSend) {
			const message: WsMessage = {
				id: crypto.randomUUID(),
				command: UPDATE_COMMANDS.matchUpdate,
				data: match,
			}
			sendWsMessageById(sub.clientId, message)
		}
	},
}
