import type { WebSocket } from "ws"
import { sendMessage } from "./index.js"
import { randomUUID } from "node:crypto"
import type { WsMessage } from "@dartsScorer/shared-ws"

const BASE_INTERVAL = 2000
export const setPingPongGame = (ws: WebSocket, onGameOver: () => void) => {
	const timeOutCloseWs = setTimeout(() => {
		onGameOver()
	}, BASE_INTERVAL + 1000)

	const sendPingInTwoSeconds = () => {
		setTimeout(() => {
			sendMessage(ws, {
				command: "ping",
				id: randomUUID(),
			})
		}, BASE_INTERVAL)
	}

	sendPingInTwoSeconds()
	ws.on("message", (data) => {
		const wsMessage: WsMessage = JSON.parse(data as unknown as string)
		if (wsMessage.command === "pong") {
			timeOutCloseWs.refresh()
			sendPingInTwoSeconds()
		}
	})
}
