import type { Match } from "@dartsScorer/models"
import { getHtmlElementById } from "./lib/utils/html"
import { getApiBaseUrl } from "./lib/requester/utils"
import {
	getScoreCountAboveOrEqualValue,
	getTeamAverage,
	getTeamBestFinish,
	getTeamBestLeg,
	getTeamBestThrow,
} from "./lib/match-statistics/calcul"
import { getAllLeg } from "@dartsScorer/match-utils"
import { compatibilityUUID } from "./lib/utils/crypto"

compatibilityUUID()

type Stat = { value: number }

type StatBar = {
	name: string
	team1: Stat
	team2: Stat
	maxRef?: number
	reverseBest?: boolean
}

async function loadMatchData() {
	const params = new URLSearchParams(window.location.search)
	const matchId = params.get("id")

	const fetchedMatch: Match = await (
		await fetch(`${getApiBaseUrl()}/match-archive/${matchId || ""}`)
	).json()
	return fetchedMatch
}

function setHeaderInformations(match: Match) {
	getHtmlElementById("competition").innerHTML =
		`${match.competition} <br> ${match.competitionStage}`
	getHtmlElementById("teamName1").innerHTML = match.teams[0].displayName
	getHtmlElementById("teamName2").innerHTML = match.teams[1].displayName
}

function addHtmlStatLine(stat: StatBar, delay: number, index: number) {
	const colorT1Odd = "#007BFF"
	const colorT1Even = "#5DAEFF"

	const colorT2Odd = "#FF8C00"
	const colorT2Even = "#FFB84D"

	const maxRef = stat.maxRef
		? stat.maxRef
		: Math.max(stat.team1.value, stat.team2.value)
	const minRef = Math.min(
		...[stat.team1.value, stat.team2.value].filter((v) => v !== 0),
	)

	const percentT1 =
		stat.reverseBest && stat.team1.value !== 0
			? (minRef / stat.team1.value) * 100
			: (stat.team1.value / maxRef) * 100
	const percentT2 =
		stat.reverseBest && stat.team2.value !== 0
			? (minRef / stat.team2.value) * 100
			: (stat.team2.value / maxRef) * 100

	console.log(maxRef, stat.name, stat.team2.value, stat.team1.value)
	const id1 = crypto.randomUUID()
	const id2 = crypto.randomUUID()
	const html = `
  <div class="statContainer LeftContainer">
    <div class="stat bgContainerLeft" style="width: 100%;">
      <div 
        id=${id1}
        class="stat leftPlayer"
        style="width: 0; transition: width 1s ease ${delay.toString()}s; background-color:${stat.team1.value !== 0 ? (index % 2 === 1 ? colorT1Odd : colorT1Even) : ""}">
           <span class="statValue">${stat.team1.value}</span>
      </div>
    </div>
  </div>
  <div class="libelleStatContainer">
    <span class="libelleStat">
      ${stat.name}
    </spand>
  </div>
  <div class="statContainer rightContaineur">
    <div class="stat bgContainerRight" style="width: 100%;">
      <div 
        id=${id2}
        class="stat rightPlayer"
        style="width: 0; transition: width 1s ease ${delay.toString()}s; background-color:${stat.team2.value !== 0 ? (index % 2 === 1 ? colorT2Odd : colorT2Even) : ""}">
           <span class="statValue">${stat.team2.value}</span>
      </div>
    </div>
  </div>
`
	const htmlLine = document.createElement("div")
	htmlLine.classList.add("statLine")
	htmlLine.innerHTML = html
	getHtmlElementById("mainContainer").appendChild(htmlLine)
	setTimeout(() => {
		getHtmlElementById(id1).style.width =
			`${percentT1 < 15 ? "15" : percentT1.toString()}%`
		getHtmlElementById(id2).style.width =
			`${percentT2 < 15 ? "15" : percentT2.toString()}%`
	}, 100)
}

function addStatsToScreen(stats: StatBar[]) {
	let currentDelay = 1
	const delayBetweenLine = 0.2
	for (const [index, stat] of stats.entries()) {
		currentDelay += delayBetweenLine
		addHtmlStatLine(stat, currentDelay, index)
	}
}

async function onPageLoad() {
	const match = await loadMatchData()
	const stats = getMatchStats(match)
	addStatsToScreen(stats)
	setHeaderInformations(match)
}
//@ts-expect-error Obligé de faire ça pour que la fonction soit reconnu dans le html
window.onPageLoad = onPageLoad

function getMatchStats(match: Match) {
	const team1Id = match.teams[0].id
	const team2Id = match.teams[1].id
	const stats: StatBar[] = []
	const avgStats: StatBar = {
		name: "Moyenne",
		team1: { value: +getTeamAverage(match, team1Id).toFixed(2) },
		team2: { value: +getTeamAverage(match, team2Id).toFixed(2) },
	}
	stats.push(avgStats)

	const allLeg = getAllLeg(match)

	const legsWonStats: StatBar = {
		name: "Manches",
		team1: { value: allLeg.filter((l) => l.winningTeamId === team1Id).length },
		team2: { value: allLeg.filter((l) => l.winningTeamId === team2Id).length },
	}
	stats.push(legsWonStats)

	const bestLegStats: StatBar = {
		name: "Meilleur manche",
		team1: { value: getTeamBestLeg(match, team1Id) },
		team2: { value: getTeamBestLeg(match, team2Id) },
		reverseBest: true,
	}
	stats.push(bestLegStats)

	const bestFinishStats: StatBar = {
		name: "Meilleur finish",
		team1: { value: getTeamBestFinish(match, team1Id) },
		team2: { value: getTeamBestFinish(match, team2Id) },
		maxRef: 170,
	}
	stats.push(bestFinishStats)

	const bestThrowStats: StatBar = {
		name: "Meilleur score",
		team1: { value: getTeamBestThrow(match, team1Id) },
		team2: { value: getTeamBestThrow(match, team2Id) },
		maxRef: 180,
	}
	stats.push(bestThrowStats)

	const t1_60 = getScoreCountAboveOrEqualValue(match, team1Id, 60, 100)
	const t2_60 = getScoreCountAboveOrEqualValue(match, team1Id, 60, 100)
	const t1_100 = getScoreCountAboveOrEqualValue(match, team1Id, 100, 140)
	const t2_100 = getScoreCountAboveOrEqualValue(match, team1Id, 100, 140)
	const t1_140 = getScoreCountAboveOrEqualValue(match, team1Id, 140, 180)
	const t2_140 = getScoreCountAboveOrEqualValue(match, team1Id, 140, 180)
	const t1_180 = getScoreCountAboveOrEqualValue(match, team1Id, 180, 181)
	const t2_180 = getScoreCountAboveOrEqualValue(match, team1Id, 180, 181)
	const refMaxThrow = Math.max(
		t1_60,
		t1_100,
		t1_140,
		t1_180,
		t2_60,
		t2_100,
		t2_140,
		t2_180,
	)

	console.log(refMaxThrow, "ref")

	const throwAbove60Stats: StatBar = {
		name: "60+",
		team1: { value: getScoreCountAboveOrEqualValue(match, team1Id, 60, 100) },
		team2: { value: getScoreCountAboveOrEqualValue(match, team2Id, 60, 100) },
		maxRef: refMaxThrow,
	}
	stats.push(throwAbove60Stats)

	const throwAbove100Stats: StatBar = {
		name: "100+",
		team1: { value: getScoreCountAboveOrEqualValue(match, team1Id, 100, 140) },
		team2: { value: getScoreCountAboveOrEqualValue(match, team2Id, 100, 140) },
		maxRef: refMaxThrow,
	}
	stats.push(throwAbove100Stats)

	const throwAbove140Stats: StatBar = {
		name: "140+",
		team1: { value: getScoreCountAboveOrEqualValue(match, team1Id, 140, 180) },
		team2: { value: getScoreCountAboveOrEqualValue(match, team2Id, 140, 180) },
		maxRef: refMaxThrow,
	}
	stats.push(throwAbove140Stats)

	const throwAbove180Stats: StatBar = {
		name: "180",
		team1: { value: getScoreCountAboveOrEqualValue(match, team1Id, 180, 181) },
		team2: { value: getScoreCountAboveOrEqualValue(match, team2Id, 180, 181) },
		maxRef: refMaxThrow,
	}
	stats.push(throwAbove180Stats)
	return stats
}
