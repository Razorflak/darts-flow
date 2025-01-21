import type { Match } from "@dartsScorer/models"
import type { UUID } from "node:crypto"
import type { WebSocket } from "ws"
export const COMMANDS = {
	subMatchUpdate: "subMatchUpdate",
	ping: "ping",
	pong: "pong",
	matchUpdate: "matchUpdate",
	ok: "ok",
} as const

type CommandDataMap = {
	[COMMANDS.subMatchUpdate]: string | "all"
	[COMMANDS.matchUpdate]: Match
	[COMMANDS.ok]: "OK"
	[COMMANDS.ping]: null
	[COMMANDS.pong]: null
}

export type WsMessage = {
	[K in keyof CommandDataMap]: {
		command: K
		id: UUID
		data: CommandDataMap[K]
	}
}[keyof CommandDataMap]

export const sendMessage = (ws: WebSocket, message: WsMessage) => {
	ws.send(JSON.stringify(message))
}

export * from "./ws-store.js"
export * from "./update-score.js"
export * from "./ws-message-router.js"
