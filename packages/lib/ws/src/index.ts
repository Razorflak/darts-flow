export const COMMANDS = {
	subMatchUpdate: "subMatchUpdate",
	matchUpdate: "matchUpdate",
} as const

type Match = unknown

type MatchUpdateData = {
	matchId: string
	data: Match
}

type SubMatchUpdateData = {
	matchId: string
}

type CommandDataMap = {
	[COMMANDS.subMatchUpdate]: SubMatchUpdateData
	[COMMANDS.matchUpdate]: MatchUpdateData
}

type WsMessage = {
	[K in keyof CommandDataMap]: {
		command: K
		data: CommandDataMap[K]
	}
}[keyof CommandDataMap]

export const sendMessage = (ws: WebSocket, message: WsMessage) => {
	ws.send(JSON.stringify(message))
}
