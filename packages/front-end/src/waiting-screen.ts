import type { Match } from "@dartsScorer/models"
import { getApiBaseUrl, getFrontBaseUrl } from "./lib/requester/utils"
import { compatibilityUUID } from "./lib/utils/crypto"
import { getHtmlElementById } from "./lib/utils/html"
import type { WsMessage } from "@dartsScorer/shared-ws"
import { createWebSocket } from "./lib/utils/ws"

compatibilityUUID()

const waitingSection = getHtmlElementById("waitingSection")
const nextMatchSection = getHtmlElementById("nextMatchSection")
const goButton = getHtmlElementById("goButton") as HTMLButtonElement
function showWaitingSection() {
	if (waitingSection && nextMatchSection) {
		waitingSection.classList.remove("hidden")
		nextMatchSection.classList.add("hidden")
	}
}

function showNextMatchSection() {
	if (waitingSection && nextMatchSection) {
		nextMatchSection.classList.remove("hidden")
		waitingSection.classList.add("hidden")
	}
}

function onSetMatch(match: Match) {
	showNextMatchSection()
	getHtmlElementById("player1").innerText = match.teams[0].displayName
	getHtmlElementById("player2").innerText = match.teams[1].displayName
	const matchURL = `${getFrontBaseUrl()}/scorer-client.html?id=${match.id}`
	goButton.disabled = false
	goButton.onclick = () => {
		window.location.href = matchURL
	}
}

function onPageLoad() {
	showWaitingSection()
	const apiUrl = getApiBaseUrl()
	const url = `${apiUrl}/ws?screen=waiting-screen`

	const onOpen = (event: Event) => {
		console.log("Socket opened", event)
	}
	const onMessage = (event: MessageEvent) => {
		const message: WsMessage = JSON.parse(event.data)
		if (message.command === "setNextMatch") {
			onSetMatch(message.data)
		}
	}

	const onError = (error: Event) => {
		console.error("Erreur WebSocket:", error)
	}

	const onClose = (event: CloseEvent) => {
		console.log("Connexion WebSocket fermée:", event.reason)
		// Réessayez si besoin
	}
	createWebSocket({ url: url, onOpen, onMessage, onError, onClose })
	console.log("open socket", url)
}
//@ts-expect-error Obligé de faire ça pour que la fonction soit reconnu dans le html
window.onPageLoad = onPageLoad
