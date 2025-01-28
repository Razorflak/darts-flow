import type { Match } from "@dartsScorer/models"
import type { UUID } from "node:crypto"

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
	deleteMatch: "deleteMatch",
} as const

export const COMMANDS = {
	ping: "ping",
	pong: "pong",
	ok: "ok",
} as const

// Used to map the data property to a type
type CommandDataMap = {
	[SUB_COMMANDS.subMatchUpdate]: string | "all"
	[SUB_COMMANDS.subConnectedClient]: null
	[UPDATE_COMMANDS.connectedClientListUpdated]: Client[]
	[UPDATE_COMMANDS.matchUpdate]: Match
	[ADMIN_COMMANDS.setNextMatch]: Match
	[ADMIN_COMMANDS.deleteMatch]: string
	[COMMANDS.ok]: "OK"
	[COMMANDS.ping]: undefined
	[COMMANDS.pong]: undefined
}

type KEY_BASE_COMMAND =
	| keyof typeof SUB_COMMANDS
	| keyof typeof UPDATE_COMMANDS
	| keyof typeof COMMANDS

type WsBaseMessage = {
	[K in KEY_BASE_COMMAND]: {
		command: K
		id: UUID
		// biome-ignore lint/complexity/noBannedTypes: <explanation>
	} & (CommandDataMap[K] extends undefined ? {} : { data: CommandDataMap[K] })
}[KEY_BASE_COMMAND]

type WsAdminMessage = {
	[K in keyof typeof ADMIN_COMMANDS]: {
		command: K
		id: UUID
		data: CommandDataMap[K]
		destinationId: string
	}
}[keyof typeof ADMIN_COMMANDS]

export type WsMessage = WsBaseMessage | WsAdminMessage

export type Client = { ws: WebSocket; screen: string; ip: string; id: string }
