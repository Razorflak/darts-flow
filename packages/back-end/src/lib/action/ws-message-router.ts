import type { WebSocket } from "ws"
import { addConnectedClientUpdateSuscriber } from "./update-connected-clients.js"
import { moveMatchFileToDeleteFolder } from "./files/move-file-match.js"
import {
	ADMIN_COMMANDS,
	SUB_COMMANDS,
	type WsMessage,
} from "@dartsScorer/shared-ws"
import { addMatchUpdateSuscriber } from "./update-score.js"
import { sendWsMessageById } from "./ws-store.js"

export const addWsMessageListerner = (ws: WebSocket, id: string) => {
	ws.on("message", (data) => {
		const wsMessage: WsMessage = JSON.parse(data as unknown as string)
		switch (wsMessage.command) {
			case SUB_COMMANDS.subMatchUpdate:
				addMatchUpdateSuscriber(id, wsMessage.data)
				break
			case SUB_COMMANDS.subConnectedClient:
				addConnectedClientUpdateSuscriber(id)
				break
			case ADMIN_COMMANDS.setNextMatch:
				sendWsMessageById(wsMessage.destinationId, wsMessage)
				break
			case ADMIN_COMMANDS.deleteMatch:
				moveMatchFileToDeleteFolder(wsMessage.data)
				break
		}
	})
}
