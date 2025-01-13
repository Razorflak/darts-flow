export const commands = {
	GO_TO_SCORING_SCREEN: "GO_TO_SCORING_SCREEN",
}

export type GoToScoringScreenCommand = {
	matchId: string
}

type WebsocketCommandControlSuscriber = {
	ip: string
	ws: WebSocket
}

let controlCommandSuscribers: WebsocketCommandControlSuscriber[] = []

export const addControlCommandSuscriber = (ip: string, ws: WebSocket) => {
	// On veut éviter les doublons, un socket par ip
	controlCommandSuscribers = controlCommandSuscribers.filter(
		(socket) => socket.ip !== ip,
	)

	controlCommandSuscribers.push({ ip, ws })
}

export const controlCommand = (matchId: string, match: Match) => {
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
