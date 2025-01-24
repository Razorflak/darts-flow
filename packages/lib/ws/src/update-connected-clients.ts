import { sendWsMessageById, UPDATE_COMMANDS, type Client } from "./index.js"

type ConnectClientUpdateSuscriber = {
	id: string
}

const connectedClientSubscribers: ConnectClientUpdateSuscriber[] = []

export const addConnectedClientUpdateSuscriber = (id: string) => {
	connectedClientSubscribers.push({ id })
}

export const connectedClientUpdate = (clients: Client[]) => {
	for (const sub of connectedClientSubscribers) {
		sendWsMessageById(sub.id, {
			id: crypto.randomUUID(),
			command: UPDATE_COMMANDS.connectedClientListUpdated,
			data: clients.filter((client) => client.id !== sub.id),
			type: "update",
		})
	}
}
