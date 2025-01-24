import type { WebSocket } from "ws"
import {
	addMatchUpdateSuscriber,
	sendMessage,
	SUB_COMMANDS,
	type WsMessage,
} from "./index.js"
import { addConnectedClientUpdateSuscriber } from "./update-connected-clients.js"

export const addWsMessageListerner = (ws: WebSocket, id: string) => {
	ws.on("message", (data) => {
		const wsMessage: WsMessage = JSON.parse(data as unknown as string)
		switch (wsMessage.command) {
			case SUB_COMMANDS.subMatchUpdate:
				addMatchUpdateSuscriber(id, wsMessage.data)
				sendMessage(ws, {
					id: wsMessage.id,
					command: "ok",
					data: "OK",
					type: "update",
				})
				break
			case SUB_COMMANDS.subConnectedClient:
				addConnectedClientUpdateSuscriber(id)
				sendMessage(ws, {
					id: wsMessage.id,
					command: "ok",
					data: "OK",
					type: "update",
				})
				break
		}
	})
}
