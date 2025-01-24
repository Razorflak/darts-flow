import type { Match } from "@dartsScorer/models"
import { getApiBaseUrl } from "./lib/requester/utils"
import { getCurrentLeg, getLastThrowByTeam } from "@dartsScorer/match-utils"
import { compatibilityUUID } from "./lib/utils/crypto"
import type { WsMessage } from "@dartsScorer/ws"

compatibilityUUID()

function onPageLoad() {
	const apiUrl = getApiBaseUrl()
	const url = `${apiUrl}/ws`
	const socket = new WebSocket(url)
	socket.onopen = (event) => {
		console.log("Socket opened", event)
		const subMatchMessage: WsMessage = {
			command: "subMatchUpdate",
			data: "all",
			id: crypto.randomUUID(),
		}
		socket.send(JSON.stringify(subMatchMessage))
	}
	socket.onmessage = (event) => {
		console.log(event)
		const message: WsMessage = JSON.parse(event.data)
		if (message.command === "matchUpdate") {
			onMatchUpdate(message.data)
		}
	}

	socket.onerror = (error) => {
		console.error("Erreur WebSocket:", error)
	}

	socket.onclose = (event) => {
		console.log("Connexion WebSocket fermée:", event.reason)
		// Réessayez si besoin
	}

	return socket
}
//@ts-expect-error Obligé de faire ça pour que la fonction soit reconnu dans le html
window.onPageLoad = onPageLoad
