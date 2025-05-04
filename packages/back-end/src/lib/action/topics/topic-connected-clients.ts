import { UPDATE_COMMANDS, type Client } from "@dartsFlow/shared-ws"
import { getWsStore, sendWsMessageById } from "../index.js"

type ConnectClientUpdateSuscriber = {
	clientId: string
}

let connectedClientSubscribers: ConnectClientUpdateSuscriber[] = []

export const clientListTopic = {
	subscribe: (clientId: string) => {
		const wss = getWsStore()
		connectedClientSubscribers.push({ clientId })
		sendWsMessageById(clientId, {
			id: crypto.randomUUID(),
			command: UPDATE_COMMANDS.connectedClientListUpdated,
			data: Array.from(wss.values()),
		})
	},

	unsubscribe: (clientId: string) => {
		connectedClientSubscribers = connectedClientSubscribers.filter(
			(sub) => sub.clientId !== clientId,
		)
	},

	update: (clients: Client[]) => {
		for (const sub of connectedClientSubscribers) {
			sendWsMessageById(sub.clientId, {
				id: crypto.randomUUID(),
				command: UPDATE_COMMANDS.connectedClientListUpdated,
				data: clients,
			})
		}
	},
}
