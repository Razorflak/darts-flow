import type { Match } from "@dartsScorer/models"
import type { WebSocket } from "ws"
import { COMMANDS, sendMessage } from "./index.js"

type WebsocketMatchUpdateSuscriber = {
	matchId: string
	ws: WebSocket
}

const matchUpdateSuscribers: WebsocketMatchUpdateSuscriber[] = []

export const addMatchUpdateSuscriber = (matchId: string, ws: WebSocket) => {
	matchUpdateSuscribers.push({ matchId, ws })
}

export const matchUpdate = (match: Match) => {
	const subscribersToSend = matchUpdateSuscribers.filter(
		(ws) => ws.matchId === match.id || ws.matchId === "all",
	)
	for (const sub of subscribersToSend) {
		sendMessage(sub.ws, {
			id: crypto.randomUUID(),
			command: COMMANDS.matchUpdate,
			data: match,
		})
	}
}
