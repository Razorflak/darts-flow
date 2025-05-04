import type { WebSocket } from "ws"
import { addWsMessageListerner } from "./ws-message-router.js"
import { randomUUID } from "node:crypto"
import { setPingPongGame } from "./ping-pong.js"
import type { Client, WsMessage } from "@dartsFlow/shared-ws"
import { clientListTopic } from "./topics/topic-connected-clients.js"
import { removeClientFromAllTopics } from "./topics/index.js"

const wsStore = new Map<string, Client>()

export const addWsToStore = (ws: WebSocket, ip: string, screen: string) => {
	const clientId = randomUUID()
	wsStore.set(clientId, { ws, screen, ip, id: clientId })
	addWsMessageListerner(ws, clientId)
	setPingPongGame(ws, () => {
		ws.close()
		removeClientFromAllTopics(clientId)
		wsStore.delete(clientId)
		notifyUpdateClientList()
	})
	ws.on("close", () => {
		wsStore.delete(clientId)
		removeClientFromAllTopics(clientId)
		notifyUpdateClientList()
	})
	notifyUpdateClientList()
}

export const sendWsMessageById = (id: string, wsMessage: WsMessage) => {
	const ws = wsStore.get(id)
	if (!ws) {
		console.error("WS not found")
		return
	}
	sendMessage(ws.ws, wsMessage)
}

export const sendMessage = (ws: WebSocket, message: WsMessage) => {
	ws.send(JSON.stringify(message))
}

export const updateClientScreen = (clientId: string, screen: string) => {
	const ws = wsStore.get(clientId)
	if (!ws) {
		console.error(`no ws found for the id ${clientId}`)
		return
	}
	ws.screen = screen
	wsStore.set(clientId, ws)
	notifyUpdateClientList()
}

export const getWsStore = () => wsStore

const notifyUpdateClientList = () => {
	clientListTopic.update(Array.from(wsStore.values()))
}
