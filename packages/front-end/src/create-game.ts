import { createMatch, createTeam } from "@dartsScorer/match-utils"
import type { Match, Team } from "@dartsScorer/models"
import { getApiBaseUrl, getFrontBaseUrl } from "./lib/requester/utils"
import { compatibilityUUID } from "./lib/utils/crypto"
import { getHtmlElementById, getInputValue } from "./lib/utils/html"

compatibilityUUID()

let admintIframe = true

async function onCreateGame() {
	const tournament = getInputValue<string>("inputCompetion")
	const playerCountByTeam = tournament.includes("Double") ? 2 : 1
	const letNeededToWin = getInputValue<number>("nbrManche")
	const setNeededToWin = getInputValue<number>("nbrSet")
	const tournamentStage = getInputValue<string>("inputStade")
	const competition = getInputValue<string>("inputCompetion")
	const is1001 = getInputValue<boolean>("init1001")
	const initialScore = is1001 ? 1001 : 501
	const teams: Team[] = []
	let isFirstTeam = true
	for (let t = 0; t < 2; t++) {
		const players: { name: string; firstName: string }[] = []
		for (let p = 0; p < playerCountByTeam; p++) {
			const idElemen = `player${p + 1}Team${t + 1}`
			const name = getInputValue<string>(`${idElemen}Nom`)
			const firstName = getInputValue<string>(`${idElemen}Prenom`)
			players.push({ name, firstName })
		}
		const team = createTeam(players, initialScore, isFirstTeam)
		teams.push(team)
		isFirstTeam = false
	}
	const match = createMatch(
		teams[0],
		teams[1],
		letNeededToWin,
		competition,
		tournamentStage,
		setNeededToWin,
	)
	const url = `${getApiBaseUrl()}/match`
	await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(match),
	})
	if (admintIframe) {
		window.parent.postMessage({ command: "matchCreated", match })
		return
	}
	window.location.href = `${getFrontBaseUrl()}/scorer-client.html?id=${match.id}`
}
//@ts-expect-error Obligé de faire ça pour que la fonction soit reconnu dans le html
window.onCreateGame = onCreateGame

function OnResetFields() {
	//Reset champs saisie infos Joueurs
	for (let t = 0; t < 2; t++) {
		for (let p = 0; p < 2; p++) {
			const idElemen = `player${p + 1}Team${t + 1}`
			;(getHtmlElementById(`${idElemen}Nom`) as HTMLInputElement).value = ""
			;(getHtmlElementById(`${idElemen}Prenom`) as HTMLInputElement).value = ""
		}
	}
}
//@ts-expect-error Obligé de faire ça pour que la fonction soit reconnu dans le html
window.OnResetFields = OnResetFields

function onTournoiChange() {
	const tournoi = getInputValue<string>("inputCompetion")
	const label1 = getHtmlElementById("labelEquipe1")
	const label2 = getHtmlElementById("labelEquipe2")
	const divSecondPlayer1 = getHtmlElementById("player2Team1")
	const divSecondPlayer2 = getHtmlElementById("player2Team2")

	const setDivVisible = (div: HTMLElement) => {
		div.style.visibility = ""
		div.style.height = ""
	}

	const setDivInvisible = (div: HTMLElement) => {
		div.style.visibility = "hidden"
		div.style.height = "0px"
	}
	if (tournoi.includes("Double")) {
		label1.innerHTML = "Equipe 1"
		label2.innerHTML = "Equipe 2"
		setDivVisible(divSecondPlayer1)
		setDivVisible(divSecondPlayer2)
	} else {
		label1.innerHTML = "Joueurs 1"
		label2.innerHTML = "Joueurs 2"
		setDivInvisible(divSecondPlayer1)
		setDivInvisible(divSecondPlayer2)
	}
}
//@ts-expect-error Obligé de faire ça pour que la fonction soit reconnu dans le html
window.onTournoiChange = onTournoiChange

async function loadAllActiveGame() {
	const url = `${getApiBaseUrl()}/match/matches?isActive=true`
	const matches = (await (await fetch(url)).json()) as Match[]
	function generateGameTableHTML(matches: Match[]): string {
		let htmlContent = `
    <table class="table table-striped table-responsive">
      <thead>
        <tr>
          <th>Joueurs</th>
          <th>Competition / Stade</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>`

		for (const match of matches) {
			const player1 = match.teams[0].displayName
			const player2 = match.teams[1].displayName

			htmlContent += `
      <tr>
        <td>${player1} / ${player2}</td>
        <td>${match.competitionStage} - ${match.competition}</td>
        <td><a href="scorer-client.html?id=${match.id}">Reprendre scorage</a></td>
      </tr>`
		}
		htmlContent += `
      </tbody>
    </table>`

		return htmlContent
	}
	const parentDiv = getHtmlElementById("divCurrentGames")
	if (!parentDiv) {
		throw new Error("Parent div missing")
	}

	parentDiv.innerHTML = generateGameTableHTML(matches)
}
//@ts-expect-error Obligé de faire ça pour que la fonction soit reconnu dans le html
window.loadAllActiveGame = loadAllActiveGame

function onPageLoad() {
	const searchParams = new URLSearchParams(window.location.search)
	admintIframe = searchParams.get("admint-iframe") === "true"
	onTournoiChange()
	if (!admintIframe) {
		loadAllActiveGame()
	}
}

//@ts-expect-error Obligé de faire ça pour que la fonction soit reconnu dans le html
window.onPageLoad = onPageLoad
