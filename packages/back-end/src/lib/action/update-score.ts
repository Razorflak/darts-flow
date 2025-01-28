import type { Match } from "@dartsScorer/models"
import { sendWsMessageById } from "./index.js"
import { UPDATE_COMMANDS } from "@dartsScorer/shared-ws"

type WebsocketMatchUpdateSuscriber = {
	matchId: string
	id: string
}

const matchUpdateSuscribers: WebsocketMatchUpdateSuscriber[] = []

export const addMatchUpdateSuscriber = (id: string, matchId: string) => {
	matchUpdateSuscribers.push({ matchId, id })
}

export const matchUpdate = (match: Match) => {
	const subscribersToSend = matchUpdateSuscribers.filter(
		(ws) => ws.matchId === match.id || ws.matchId === "all",
	)
	for (const sub of subscribersToSend) {
		sendWsMessageById(sub.id, {
			id: crypto.randomUUID(),
			command: UPDATE_COMMANDS.matchUpdate,
			data: match,
			type: "update",
		})
	}
}
