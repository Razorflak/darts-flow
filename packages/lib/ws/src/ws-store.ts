import type { WebSocket } from "ws"
import { addWsMessageListerner } from "./ws-message-router.js"
import { sendMessage, type WsMessage } from "./index.js"
import { randomUUID } from "node:crypto"
import { setPingPongGame } from "./ping-pong.js"
import { connectedClientUpdate } from "./update-connected-clients.js"

export type Client = { ws: WebSocket; screen: string; ip: string; id: string }

const wsStore = new Map<string, Client>()

export const addWsToStore = (ws: WebSocket, ip: string, screen: string) => {
	const id = randomUUID()
	wsStore.set(id, { ws, screen, ip, id })
	addWsMessageListerner(ws, id)
	connectedClientUpdate(Array.from(wsStore.values()))
	setPingPongGame(ws, () => {
		ws.close()
		wsStore.delete(id)
		connectedClientUpdate(Array.from(wsStore.values()))
	})
}

export const sendWsMessageById = (id: string, wsMessage: WsMessage) => {
	const ws = wsStore.get(id)
	if (!ws) {
		console.error("WS not found")
		return
	}
	console.log("sendto", id, wsMessage)
	sendMessage(ws.ws, wsMessage)
}
