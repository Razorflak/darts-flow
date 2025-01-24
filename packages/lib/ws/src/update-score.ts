import type { Match } from "@dartsScorer/models"
import { COMMANDS, sendWsMessageByIp } from "./index.js"

type WebsocketMatchUpdateSuscriber = {
	matchId: string
	ip: string
}

const matchUpdateSuscribers: WebsocketMatchUpdateSuscriber[] = []

export const addMatchUpdateSuscriber = (ip: string, matchId: string) => {
	matchUpdateSuscribers.push({ matchId, ip })
}

export const matchUpdate = (match: Match) => {
	const subscribersToSend = matchUpdateSuscribers.filter(
		(ws) => ws.matchId === match.id || ws.matchId === "all",
	)
	for (const sub of subscribersToSend) {
		sendWsMessageByIp(sub.ip, {
			id: crypto.randomUUID(),
			command: COMMANDS.matchUpdate,
			data: match,
		})
	}
}
