import type { WebSocket } from "ws"
import {
	addMatchUpdateSuscriber,
	COMMANDS,
	sendMessage,
	type WsMessage,
} from "./index.js"

export const addWsMessageListerner = (ws: WebSocket, ip: string) => {
	console.log("addlistener", ip)
	ws.on("message", (data) => {
		const wsMessage: WsMessage = JSON.parse(data as unknown as string)
		switch (wsMessage.command) {
			case COMMANDS.subMatchUpdate:
				addMatchUpdateSuscriber(ip, wsMessage.data)
				sendMessage(ws, { id: wsMessage.id, command: "ok", data: "OK" })
				break
			case COMMANDS.ping:
				sendMessage(ws, { id: wsMessage.id, command: "pong", data: null })
				break
		}
	})
}
