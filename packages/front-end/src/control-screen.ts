import { getApiBaseUrl } from "./lib/requester/utils"
import { getHtmlElementById } from "./lib/utils/html"
import type { Match } from "@dartsScorer/models"
import { compatibilityUUID } from "./lib/utils/crypto"
import type { Client, WsMessage } from "@dartsScorer/shared-ws"
import { createWebSocket } from "./lib/utils/ws"

compatibilityUUID()

const clientList = getHtmlElementById("clientList")
const selectedIdInput = getHtmlElementById("selectedIp") as HTMLInputElement

// Liste des clients connectés (Exemple de données, récupérées dynamiquement)
let clients: Client[] = []
let matches: Match[] = []
let socket: WebSocket

// Fonction pour mettre à jour la liste des clients
function updateClientList() {
	clientList.innerHTML = "" // Vide la liste actuelle
	for (const client of clients) {
		const li = document.createElement("li")
		li.className =
			"client-item cursor-pointer p-2 bg-gray-200 rounded-lg hover:bg-gray-300"
		li.innerHTML = `<span class="id font-bold">${client.id}</span> - <span class="ip font-bold">${client.ip}</span> - <span class="screen">${client.screen}</span>`
		li.onclick = () => {
			selectedIdInput.value = client.id
		}
		clientList.appendChild(li)
	}
}

window.addEventListener("message", () => {
	loadAllActiveGame()
})
function generateRow(match: Match) {
	const player1 = match.teams[0].displayName
	const player2 = match.teams[1].displayName

	return `
    <tr class="hover:bg-gray-100">
      <td class="border border-gray-300 px-4 py-2">${player1} / ${player2}</td>
      <td class="border border-gray-300 px-4 py-2">${match.competitionStage} - ${match.competition}</td>
      <td class="border border-gray-300 px-4 py-2">
        <button 
          class="btn-next-match bg-blue-500 text-white font-semibold py-1 px-3 rounded hover:bg-blue-700 transition duration-200"
          data-match-id="${match.id}"
        >
          Next Match
        </button>
      </td>
    </tr>`
}

function sendMatchToWaitingScreen(match: Match) {
	const clienId = selectedIdInput.value
	const wsMessage: WsMessage = {
		id: crypto.randomUUID(),
		command: "setNextMatch",
		destinationId: clienId,
		data: match,
	}
	console.log("message send", wsMessage)
	socket.send(JSON.stringify(wsMessage))
}

function attachButtonListeners(): void {
	const buttons =
		document.querySelectorAll<HTMLButtonElement>(".btn-next-match")
	for (const button of buttons) {
		button.addEventListener("click", (event) => {
			const target = event.target as HTMLButtonElement | null
			if (target) {
				const matchId = target.getAttribute("data-match-id")
				if (matchId) {
					const match = matches.find((m) => m.id === matchId)
					sendMatchToWaitingScreen(match as Match)
				}
			}
		})
	}
}
function generateTable(matches: Match[]) {
	const header = `
    <table class="min-w-full border-collapse border border-gray-300 bg-white shadow-lg">
      <thead class="bg-gray-200">
        <tr>
          <th class="border border-gray-300 px-4 py-2 text-left font-semibold">Joueurs</th>
          <th class="border border-gray-300 px-4 py-2 text-left font-semibold">Competition / Stade</th>
          <th class="border border-gray-300 px-4 py-2 text-left font-semibold">Action</th>
        </tr>
      </thead>
      <tbody>
  `

	const rows = matches.map(generateRow).join("") // Crée chaque ligne
	const footer = "</tbody></table>"

	return header + rows + footer // Assemble le tableau
}

// Exemple d'utilisation

async function loadAllActiveGame() {
	const url = `${getApiBaseUrl()}/match/matches?isActive=true`
	matches = (await (await fetch(url)).json()) as Match[]
	const parentDiv = getHtmlElementById("currentGames")
	if (!parentDiv) {
		throw new Error("Parent div missing")
	}

	parentDiv.innerHTML = generateTable(matches)
	attachButtonListeners()
}

function onPageLoad() {
	const apiUrl = getApiBaseUrl()
	const url = `${apiUrl}/ws?screen=score-display`

	const onOpen = (event: Event, send: (data: string) => void) => {
		console.log("Socket opened", event)
		const subMatchMessage: WsMessage = {
			command: "subConnectedClient",
			data: null,
			id: crypto.randomUUID(),
		}
		send(JSON.stringify(subMatchMessage))
	}
	const onMessage = (event: MessageEvent) => {
		console.log("message", event)
		const message: WsMessage = JSON.parse(event.data as string)
		if (message.command === "connectedClientListUpdated") {
			clients = message.data
			updateClientList()
		}
		if (message.command === "ping") {
			const response: WsMessage = {
				command: "pong",
				id: crypto.randomUUID(),
			}
			socket.send(JSON.stringify(response))
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
}

//@ts-expect-error Obligé de faire ça pour que la fonction soit reconnu dans le html
window.onPageLoad = onPageLoad

updateClientList()
loadAllActiveGame()
