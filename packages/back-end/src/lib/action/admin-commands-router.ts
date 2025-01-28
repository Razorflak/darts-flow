import { ADMIN_COMMANDS, type WsMessage } from "@dartsScorer/shared-ws"
import { sendWsMessageById } from "./index.js"

export const onAdminCommandReceived = (message: WsMessage) => {
	if (message.command === ADMIN_COMMANDS.setNextMatch) {
		sendWsMessageById(message.destinationId, message)
	}
}
