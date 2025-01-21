import type { WebSocket } from "ws"
import {
	addMatchUpdateSuscriber,
	COMMANDS,
	sendMessage,
	type WsMessage,
} from "./index.js"

export const addWsMessageListerner = (ws: WebSocket) => {
	ws.on("message", (data) => {
		const wsMessage: WsMessage = JSON.parse(data as unknown as string)
		switch (wsMessage.command) {
			case COMMANDS.subMatchUpdate:
				addMatchUpdateSuscriber(wsMessage.data, ws)
				sendMessage(ws, { id: wsMessage.id, command: "ok", data: "OK" })
				break
			case COMMANDS.ping:
				sendMessage(ws, { id: wsMessage.id, command: "pong", data: null })
				break
		}
	})
}
