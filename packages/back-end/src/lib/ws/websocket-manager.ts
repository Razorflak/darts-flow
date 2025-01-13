type WebsocketMatchUpdateSuscriber = {
	matchId: string
	ws: WebSocket
}

type WebsocketCommandControlSuscriber = {
	ip: string
	ws: WebSocket
}

type WebsocketMessage<T> = {
	command: string
	data: T
}

type Match = Record<string, string>

const matchUpdateSuscribers: WebsocketMatchUpdateSuscriber[] = []
let controlCommandSuscribers: WebsocketCommandControlSuscriber[] = []

export const addMatchUpdateSuscriber = (matchId: string, ws: WebSocket) => {
	matchUpdateSuscribers.push({ matchId, ws })
}

export const addControlCommandSuscriber = (ip: string, ws: WebSocket) => {
	controlCommandSuscribers = controlCommandSuscribers.filter(
		(socket) => socket.ip !== ip,
	)

	controlCommandSuscribers.push({ ip, ws })
}

export const sendMessage = (
	ws: WebSocket,
	message: WebsocketMessage<unknown>,
) => {
	ws.send(JSON.stringify(message))
}

export const matchUpdate = (matchId: string, match: Match) => {
	const subscribersToSend = matchUpdateSuscribers.filter(
		(ws) => ws.matchId === matchId,
	)
	for (const sub of subscribersToSend) {
		sendMessage(sub.ws, { command: "matchUpdated", data: match })
	}
}
