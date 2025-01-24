import type { Client, WsMessage } from "@dartsScorer/ws"
import { getApiBaseUrl } from "./lib/requester/utils"
import { getHtmlElementById } from "./lib/utils/html"
import { Match } from "@dartsScorer/models"

// Récupération des éléments
const clientList = getHtmlElementById("clientList")
const selectedIdInput = getHtmlElementById("selectedIp") as HTMLInputElement
const setMatchButton = getHtmlElementById("setMatchButton")
const matchIdInput = getHtmlElementById("matchId") as HTMLInputElement

// Liste des clients connectés (Exemple de données, récupérées dynamiquement)
let clients: Client[] = []

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

// Fonction pour envoyer un message via WebSocket
function sendMatchToWaitingScreen() {
	const ip = selectedIdInput.value
	const matchId = matchIdInput.value

	if (!ip || !matchId) {
		return
	}

	// Exemple de WebSocket (à remplacer par ton propre code)
	const ws = new WebSocket(`ws://${ip}:8080`)
	ws.onopen = () => {
		ws.send(JSON.stringify({ action: "setMatch", matchId }))
		alert(`Match ID "${matchId}" envoyé à ${ip}`)
		ws.close()
	}

	ws.onerror = () => {
		alert("Erreur : Impossible de se connecter au WebSocket.")
	}
}

// Événement pour le bouton "Envoyer"
setMatchButton.onclick = sendMatchToWaitingScreen

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
          class="btn-reprendre bg-blue-500 text-white font-semibold py-1 px-3 rounded hover:bg-blue-700 transition duration-200"
          data-match-id="${match.id}"
        >
          Reprendre scorage
        </button>
      </td>
    </tr>`
}

function attachButtonListeners(): void {
	const buttons = document.querySelectorAll<HTMLButtonElement>(".btn-reprendre")
	for (const button of buttons) {
		button.addEventListener("click", (event) => {
			const target = event.target as HTMLButtonElement | null
			if (target) {
				const matchId = target.getAttribute("data-match-id")
				if (matchId) {
					console.log(`ID du match : ${matchId}`)
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
	const matches = (await (await fetch(url)).json()) as Match[]
	function generateGameTableHTML(matches: Match[]): string {
		const htmlContent = generateTable(matches)
		return htmlContent
	}
	const parentDiv = getHtmlElementById("currentGames")
	if (!parentDiv) {
		throw new Error("Parent div missing")
	}

	parentDiv.innerHTML = generateGameTableHTML(matches)
	attachButtonListeners()
}

function onPageLoad() {
	const apiUrl = getApiBaseUrl()
	const url = `${apiUrl}/ws?screen=score-display`
	const socket = new WebSocket(url)
	socket.onopen = (event) => {
		console.log("Socket opened", event)
		const subMatchMessage: WsMessage = {
			command: "subConnectedClient",
			data: null,
			id: crypto.randomUUID(),
			type: "sub",
		}
		socket.send(JSON.stringify(subMatchMessage))
	}
	socket.onmessage = (event) => {
		console.log("message", event)
		const message: WsMessage = JSON.parse(event.data as string)
		if (message.command === "connectedClientListUpdated") {
			clients = message.data
			updateClientList()
		}
		if (message.command === "ping") {
			const response: WsMessage = {
				command: "pong",
				data: null,
				id: crypto.randomUUID(),
				type: "sub",
			}
			socket.send(JSON.stringify(response))
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

updateClientList()
loadAllActiveGame()
