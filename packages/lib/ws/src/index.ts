import type { Match } from "@dartsScorer/models"
import type { UUID } from "node:crypto"
import type { WebSocket } from "ws"
import type { Client } from "./ws-store.js"

export const SUB_COMMANDS = {
	subMatchUpdate: "subMatchUpdate",
	subConnectedClient: "subConnectedClient",
} as const

export const UPDATE_COMMANDS = {
	matchUpdate: "matchUpdate",
	connectedClientListUpdated: "connectedClientListUpdated",
} as const

export const ADMIN_COMMANDS = {
	setNextMatch: "setNextMatch",
} as const

export const COMMANDS = {
	ping: "ping",
	pong: "pong",
	setNextMatch: "setNextMatch",
	ok: "ok",
} as const

type CommandDataMap = {
	[SUB_COMMANDS.subMatchUpdate]: string | "all"
	[SUB_COMMANDS.subConnectedClient]: null
	[UPDATE_COMMANDS.connectedClientListUpdated]: Client[]
	[UPDATE_COMMANDS.matchUpdate]: Match
	[ADMIN_COMMANDS.setNextMatch]: Match
	[COMMANDS.ok]: "OK"
	[COMMANDS.ping]: null
	[COMMANDS.pong]: null
}

export type WsMessage = {
	[K in keyof CommandDataMap]: {
		type: "update" | "admin" | "sub"
		command: K
		id: UUID
		data: CommandDataMap[K]
	}
}[keyof CommandDataMap]
export type WsAdminMessage = {
	[K in keyof CommandDataMap]: {
		type: "update" | "admin" | "sub"
		command: K
		id: UUID
		data: CommandDataMap[K]
	}
}[keyof CommandDataMap] & { destinationIp: string }

export const sendMessage = (ws: WebSocket, message: WsMessage) => {
	ws.send(JSON.stringify(message))
}

export * from "./ws-store.js"
export * from "./update-score.js"
export * from "./ws-message-router.js"
