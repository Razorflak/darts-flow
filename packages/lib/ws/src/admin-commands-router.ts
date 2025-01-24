import {
	ADMIN_COMMANDS,
	sendWsMessageById,
	type WsAdminMessage,
} from "./index.js"

export const onAdminCommandReceived = (message: WsAdminMessage) => {
	if (message.command === ADMIN_COMMANDS.setNextMatch) {
		sendWsMessageById(message.destinationIp, message)
	}
}
