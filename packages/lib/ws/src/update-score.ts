import type { Match } from "@dartsScorer/models"
import { COMMANDS, sendMessage } from "./index.js"

type WebsocketMatchUpdateSuscriber = {
	matchId: string
	ws: WebSocket
}

const matchUpdateSuscribers: WebsocketMatchUpdateSuscriber[] = []

export const addMatchUpdateSuscriber = (matchId: string, ws: WebSocket) => {
	matchUpdateSuscribers.push({ matchId, ws })
}

export const matchUpdate = (matchId: string, match: Match) => {
	const subscribersToSend = matchUpdateSuscribers.filter(
		(ws) => ws.matchId === matchId,
	)
	for (const sub of subscribersToSend) {
		sendMessage(sub.ws, {
			command: COMMANDS.matchUpdate,
			data: { matchId: match.id, data: match },
		})
	}
}
