import type { WebSocket } from "ws"
import { moveMatchFileToDeleteFolder } from "./files/move-file-match.js"
import {
	ADMIN_COMMANDS,
	STATE_COMMANDS,
	SUB_COMMANDS,
	type WsMessage,
} from "@dartsFlow/shared-ws"
import { sendWsMessageById, updateClientScreen } from "./ws-store.js"
import { matchTopic } from "./topics/topic-match.js"
import { clientListTopic } from "./topics/topic-connected-clients.js"
import { matchListTopic } from "./topics/topic-match-list.js"
import { getAllMatchFileInformations } from "../bd/match.js"

export const addWsMessageListerner = (ws: WebSocket, clientId: string) => {
	ws.on("message", async (data) => {
		const wsMessage: WsMessage = JSON.parse(data as unknown as string)
		switch (wsMessage.command) {
			case SUB_COMMANDS.subMatchUpdate:
				matchTopic.subscribe(clientId, wsMessage.data)
				break
			case SUB_COMMANDS.subConnectedClient:
				clientListTopic.subscribe(clientId)
				break
			case SUB_COMMANDS.subMatchListUpdate:
				matchListTopic.subscribe(clientId)
				break
			case ADMIN_COMMANDS.setNextMatch:
				sendWsMessageById(wsMessage.destinationId, wsMessage)
				matchTopic.update(wsMessage.data)
				break
			case ADMIN_COMMANDS.deleteMatch: {
				moveMatchFileToDeleteFolder(wsMessage.data)
				const matchInfos = await getAllMatchFileInformations()
				matchListTopic.update(matchInfos)
				break
			}
			case ADMIN_COMMANDS.navigateToPage:
				sendWsMessageById(wsMessage.destinationId, wsMessage)
				break
			case STATE_COMMANDS.screenUpdate: {
				updateClientScreen(clientId, wsMessage.data)
				break
			}
		}
	})
}
