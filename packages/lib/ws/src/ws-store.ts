import type { WebSocket } from "ws"
import { addWsMessageListerner } from "./ws-message-router.js"
import { sendMessage, type WsMessage } from "./index.js"

const wsStore = new Map<string, WebSocket>()

export const addWsToStore = (ws: WebSocket, ip: string) => {
	wsStore.set(ip, ws)
	addWsMessageListerner(ws, ip)
}

export const sendWsMessageByIp = (ip: string, wsMessage: WsMessage) => {
	const ws = wsStore.get(ip)
	if (!ws) {
		throw new Error("WS not found")
	}
	console.log("sendto", ip, wsMessage)
	sendMessage(ws, wsMessage)
}
