import type { Match } from "@dartsScorer/models"
import { getApiBaseUrl, getFrontBaseUrl } from "./lib/requester/utils"
import {
	changeActiveTeam,
	getActiveTeam,
	getCurrentLeg,
	getLastThrowByTeam,
	inputScore,
	undoLastScore,
} from "@dartsScorer/match-utils"
import { compatibilityUUID } from "./lib/utils/crypto"

compatibilityUUID()

let match: Match

const getHtmlElementById = (id: string) => {
	const htmlElement = document.getElementById(id)
	if (!htmlElement) {
		throw new Error("Html element not found")
	}
	return htmlElement
}

function onPageLoad() {
	const elem = document.getElementById("nbrDartsContaineur") as HTMLElement
	elem.style.visibility = ""
	elem.style.height = "0%"
	onClr()
	loadMatchData()
}
//@ts-expect-error Obligé de faire ça pour que la fonction soit reconnu dans le html
window.onPageLoad = onPageLoad

function matchDataToDOM(match: Match) {
	console.log(match)
	getHtmlElementById("p1Name").innerHTML = match.teams[0].displayName
	getHtmlElementById("p1Score").innerHTML =
		match.teams[0].currentScore.toString()
	getHtmlElementById("p1Set").innerHTML = match.teams[0].setCountWon.toString()
	getHtmlElementById("p1Manche").innerHTML =
		match.teams[0].legCountWon.toString()
	getHtmlElementById("p1LastThrow").innerHTML =
		getLastThrowByTeam(match, match.teams[0]) || "0"

	getHtmlElementById("p2Name").innerHTML = match.teams[1].displayName
	getHtmlElementById("p2Score").innerHTML =
		match.teams[1].currentScore.toString()
	getHtmlElementById("p2Set").innerHTML = match.teams[1].setCountWon.toString()
	getHtmlElementById("p2Manche").innerHTML =
		match.teams[1].legCountWon.toString()
	getHtmlElementById("p2LastThrow").innerHTML =
		getLastThrowByTeam(match, match.teams[1]) || "0"

	getHtmlElementById("p1Div").classList.remove("activPlayer")
	getHtmlElementById("p2Div").classList.remove("activPlayer")
	if (match.teams[0].isActive) {
		getHtmlElementById("p1Div").classList.add("activPlayer")
	} else {
		getHtmlElementById("p2Div").classList.add("activPlayer")
	}

	if (getCurrentLeg(match).throws.length === 0) {
		const startingTeamId = getCurrentLeg(match).startingTeamId
		if (startingTeamId === match.teams[0].id) {
			getHtmlElementById("btnStartP1").style.visibility = "hidden"
			getHtmlElementById("btnStartP2").style.visibility = ""
		} else {
			getHtmlElementById("btnStartP1").style.visibility = ""
			getHtmlElementById("btnStartP2").style.visibility = "hidden"
		}
	} else {
		getHtmlElementById("btnStartP1").style.visibility = "hidden"
		getHtmlElementById("btnStartP2").style.visibility = "hidden"
	}
}

async function loadMatchData() {
	const params = new URLSearchParams(window.location.search)
	const matchId = params.get("id")

	const fetchedMatch: Match = await (
		await fetch(`${getApiBaseUrl()}/match/${matchId}`)
	).json()
	matchDataToDOM(fetchedMatch)
	match = fetchedMatch
}

//@ts-expect-error Obligé de faire ça pour que la fonction soit reconnu dans le html
window.loadMatchData = loadMatchData

function onPlayerStart() {
	const _match = changeActiveTeam(match)
	matchDataToDOM(_match)
}
//@ts-expect-error Obligé de faire ça pour que la fonction soit reconnu dans le html
window.onPlayerStart = onPlayerStart

export function sendMatchData(match: Match) {
	const params = JSON.stringify(match, null, 3)
	fetch(`${getApiBaseUrl()}/match/${match.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: params,
	})
}

function onAddScore(inputNumber: string) {
	const currentScore = getHtmlElementById("currentScore").innerHTML
	const score = Number.parseInt(currentScore.trim())
	const newScore = Number.isNaN(score)
		? inputNumber
		: `${score.toString()}${inputNumber}`
	getHtmlElementById("btnValid").innerHTML = "V"
	getHtmlElementById("btnValid").style.fontSize = "7vh"
	if (Number.parseInt(newScore) <= 180) {
		getHtmlElementById("currentScore").innerHTML = newScore
	}
}
//@ts-expect-error Obligé de faire ça pour que la fonction soit reconnu dans le html
window.onAddScore = onAddScore

function onClr() {
	getHtmlElementById("currentScore").innerHTML = "&nbsp;"
	getHtmlElementById("btnValid").innerHTML = "No Score"
	getHtmlElementById("btnValid").style.fontSize = "4vh"
}
//@ts-expect-error Obligé de faire ça pour que la fonction soit reconnu dans le html
window.onClr = onClr

function onValider() {
	const rawInput = getHtmlElementById("currentScore").innerHTML

	const currentScore =
		rawInput === "&nbsp;"
			? 0
			: Number.parseInt(getHtmlElementById("currentScore").innerHTML)
	const nextScore = getActiveTeam(match).currentScore - currentScore
	if (nextScore === 0) {
		//L'équipe va gagner faut demander le nombre de fléchettes
		const elem = getHtmlElementById("nbrDartsContaineur")
		elem.style.visibility = ""
		elem.style.height = "60%"
		return
	}
	onClr()
	inputScore(match, currentScore)
	matchDataToDOM(match)
	sendMatchData(match)
}
//@ts-expect-error Obligé de faire ça pour que la fonction soit reconnu dans le html
window.onValider = onValider

function onValiderNbrDarts(nbrDarts: number) {
	const currentScore = Number.parseInt(
		getHtmlElementById("currentScore").innerHTML,
	)
	const elem = getHtmlElementById("nbrDartsContaineur")
	elem.style.visibility = ""
	elem.style.height = "0px"
	inputScore(match, currentScore, nbrDarts)
	onClr()
	matchDataToDOM(match)
	sendMatchData(match)
	if (match.isOver) {
		window.location.href = `${getFrontBaseUrl()}/waiting-screen.html`
	}
}
//@ts-expect-error Obligé de faire ça pour que la fonction soit reconnu dans le html
window.onValiderNbrDarts = onValiderNbrDarts

function onCancelNbrDarts() {
	const elem = getHtmlElementById("nbrDartsContaineur")
	elem.style.visibility = ""
	elem.style.height = "0px"
	onClr()
}
//@ts-expect-error Obligé de faire ça pour que la fonction soit reconnu dans le html
window.onCancelNbrDarts = onCancelNbrDarts

function onUndo() {
	match = undoLastScore(match)
	matchDataToDOM(match)
	sendMatchData(match)
}
//@ts-expect-error Obligé de faire ça pour que la fonction soit reconnu dans le html
window.onUndo = onUndo
