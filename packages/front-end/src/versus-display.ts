import { getApiBaseUrl } from "./lib/requester/utils"
import { getHtmlElementById } from "./lib/utils/html"
import type { Match } from "@dartsScorer/models"

async function onPageLoad() {
	const game: Match = await (await fetch(`${getApiBaseUrl()}/match`)).json()

	getHtmlElementById("player1").innerHTML = game.teams[0].displayName
	getHtmlElementById("player2").innerHTML = game.teams[1].displayName
	setTimeout(() => {
		getHtmlElementById("player1").classList.add("player1Final")
		getHtmlElementById("player1").classList.remove("player1Init")

		getHtmlElementById("player2").classList.add("player2Final")
		getHtmlElementById("player2").classList.remove("player2Init")
	}, 1000)
}
//@ts-expect-error Obligé de faire ça pour que la fonction soit reconnu dans le html
window.onPageLoad = onPageLoad
