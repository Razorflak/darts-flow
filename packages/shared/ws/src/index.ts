import type { Match, MatchInformation } from "@dartsFlow/models"
import type { UUID } from "node:crypto"
import type { WebSocket } from "ws"

export const SUB_COMMANDS = {
	subMatchUpdate: "subMatchUpdate",
	subConnectedClient: "subConnectedClient",
	subMatchListUpdate: "subMatchListUpdate",
} as const

export const UNSUB_COMMANDS = {
	unsubMatchUpdate: "unsubMatchUpdate",
	unsubConnectedClient: "unsubConnectedClient",
	unsubMatchListUpdate: "subMatchListUpdate",
} as const

export const UPDATE_COMMANDS = {
	matchUpdate: "matchUpdate",
	matchListUpdate: "matchListUpdate",
	connectedClientListUpdated: "connectedClientListUpdated",
} as const

export const STATE_COMMANDS = {
	screenUpdate: "screenUpdate",
} as const

export const ADMIN_COMMANDS = {
	setNextMatch: "setNextMatch",
	deleteMatch: "deleteMatch",
	navigateToPage: "navigateToPage",
} as const

export const COMMANDS = {
	ping: "ping",
	pong: "pong",
	ok: "ok",
} as const

// Used to map the data property to a type
type CommandDataMap = {
	[SUB_COMMANDS.subMatchUpdate]: UUID | "all"
	[SUB_COMMANDS.subConnectedClient]: null
	[SUB_COMMANDS.subMatchListUpdate]: null
	[UNSUB_COMMANDS.unsubMatchUpdate]: null
	[UNSUB_COMMANDS.unsubConnectedClient]: null
	[UNSUB_COMMANDS.unsubMatchListUpdate]: null
	[UPDATE_COMMANDS.connectedClientListUpdated]: Client[]
	[UPDATE_COMMANDS.matchUpdate]: Match
	[UPDATE_COMMANDS.matchListUpdate]: MatchInformation[]
	[STATE_COMMANDS.screenUpdate]: string
	[ADMIN_COMMANDS.setNextMatch]: Match
	[ADMIN_COMMANDS.deleteMatch]: string
	[ADMIN_COMMANDS.navigateToPage]: string
	[COMMANDS.ok]: "OK"
	[COMMANDS.ping]: undefined
	[COMMANDS.pong]: undefined
}

type KEY_BASE_COMMAND =
	| keyof typeof SUB_COMMANDS
	| keyof typeof UNSUB_COMMANDS
	| keyof typeof UPDATE_COMMANDS
	| keyof typeof COMMANDS
	| keyof typeof STATE_COMMANDS

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
