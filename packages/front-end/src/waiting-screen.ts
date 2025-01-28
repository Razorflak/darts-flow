import type { Match } from "@dartsScorer/models"
import { getApiBaseUrl, getFrontBaseUrl } from "./lib/requester/utils"
import { compatibilityUUID } from "./lib/utils/crypto"
import type { WsMessage } from "@dartsScorer/ws"
import { getHtmlElementById } from "./lib/utils/html"

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
	const socket = new WebSocket(url)
	console.log("open socket", url)
	socket.onopen = (event) => {
		console.log("Socket opened", event)
	}
	socket.onmessage = (event) => {
		console.log(event)
		const message: WsMessage = JSON.parse(event.data)
		if (message.command === "ping") {
			const response: WsMessage = {
				command: "pong",
				id: crypto.randomUUID(),
			}
			socket.send(JSON.stringify(response))
		}
		if (message.command === "setNextMatch") {
			onSetMatch(message.data)
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
