import type { Match } from "@dartsScorer/models"
import { getApiBaseUrl } from "./lib/requester/utils"
import { getCurrentLeg, getLastThrowByTeam } from "@dartsScorer/match-utils"
import { compatibilityUUID } from "./lib/utils/crypto"
import type { WsMessage } from "@dartsScorer/ws"

compatibilityUUID()

const getHtmlElementById = (id: string) => {
	const htmlElement = document.getElementById(id)
	if (!htmlElement) {
		throw new Error("Html element not found")
	}
	return htmlElement
}

function onMatchUpdate(match: Match) {
	getHtmlElementById("stadeCompetition").innerHTML =
		`${match.competition.toUpperCase()} - ${match.competitionStage.toUpperCase()}`
	// getHtmlElementById("stadeCompetition").innerHTML = "DEFI NATIONAL";

	getHtmlElementById("nbrMancheGagnante").innerHTML =
		`${match.setNeededToWin} MANCHES GAGNANTES`

	getHtmlElementById("player1Name").innerHTML =
		match.teams[0].displayName.replace("/", "<br/>")
	getHtmlElementById("player2Name").innerHTML =
		match.teams[1].displayName.replace("/", "<br/>")
	if (match.setNeededToWin === 1) {
		getHtmlElementById("player1Set").classList.add("invisible")
		getHtmlElementById("player2Set").classList.add("invisible")
		getHtmlElementById("setNeeded").classList.add("invisible")
	}
	getHtmlElementById("player2Set").innerHTML =
		match.teams[1].setCountWon.toString()
	getHtmlElementById("player1Set").innerHTML =
		match.teams[0].setCountWon.toString()

	getHtmlElementById("player1Leg").innerHTML =
		match.teams[0].legCountWon.toString()
	getHtmlElementById("player2Leg").innerHTML =
		match.teams[1].legCountWon.toString()

	getHtmlElementById("player1Score").innerHTML =
		match.teams[0].currentScore.toString()
	getHtmlElementById("player2Score").innerHTML =
		match.teams[1].currentScore.toString()

	const currentLeg = getCurrentLeg(match)
	const lastThrow = currentLeg.throws.at(-1)
	if (!lastThrow) {
		throw new Error("no last throw")
	}
	const lastScore = lastThrow.score
	const teamIndexStartedLeg = match.teams.findIndex(
		(team) => team.id === currentLeg.startingTeamId,
	)
	let showPlayerScore = ""
	//Gestion de la flèche pour dire qui joue
	getHtmlElementById("f1").classList.remove("activ")
	getHtmlElementById("f2").classList.remove("activ")
	if (match.teams[0].isActive) {
		showPlayerScore = "player2"
		getLastThrowByTeam(match, match.teams[0])
		getHtmlElementById("f1").classList.add("activ")
	} else {
		showPlayerScore = "player1"
		getHtmlElementById("f2").classList.add("activ")
	}

	//GEstion last score
	if (lastScore !== 0) {
		const divPlayerScore = `${showPlayerScore}LastScore`
		getHtmlElementById(divPlayerScore).innerHTML = lastScore.toString()
		getHtmlElementById(divPlayerScore).classList.remove(
			"lastestScoreDisplayHide",
		)
		getHtmlElementById(divPlayerScore).classList.add("lastestScoreDisplayShow")
		setTimeout(() => {
			getHtmlElementById(divPlayerScore).classList.remove(
				"lastestScoreDisplayShow",
			)
			getHtmlElementById(divPlayerScore).classList.add(
				"lastestScoreDisplayHide",
			)
		}, 3000)
	}

	//Gestion du point pour dire qui a commencé la manche

	getHtmlElementById("r1").classList.remove("starterLeg")
	getHtmlElementById("r2").classList.remove("starterLeg")
	if (teamIndexStartedLeg === 0) {
		getHtmlElementById("r1").classList.add("starterLeg")
	} else {
		getHtmlElementById("r2").classList.add("starterLeg")
	}
}

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
