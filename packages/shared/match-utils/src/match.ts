import type { Leg, Lot, Match, Team } from "@dartsScorer/models"
import { getCurrentLeg } from "./leg.js"
import { getActiveTeam } from "./team.js"
import { randomUuid } from "@dartsScorer/crypto"

export const isMatchOver = (match: Match) => {
	const team1WonMatch = match.setNeededToWin === match.teams[0].setCountWon
	const team2WonMatch = match.setNeededToWin === match.teams[1].setCountWon
	return team2WonMatch || team1WonMatch
}

export const handleMatchOver = (match: Match) => {
	match.winningTeamId = match.teams.find((team) => team.currentScore === 0)?.id
	match.isOver = true
	return match
}

export const createMatch = (
	team1: Team,
	team2: Team,
	legNeededToWin: number,
	competition: string,
	competitionStage: string,
	setNeededToWin = 1,
): Match => {
	const leg: Leg = {
		id: randomUuid(),
		throws: [],
		startingTeamId: team1.id,
	}

	const set: Lot = {
		id: randomUuid(),
		startingTeamId: team1.id,
		legs: [leg],
	}

	const match: Match = {
		id: randomUuid(),
		isOver: false,
		competition,
		sets: [set],
		teams: [team1, team2],
		competitionStage,
		legNeededToWin,
		setNeededToWin,
	}
	return match
}

export const changeActiveTeam = (match: Match): Match => {
	for (const team of match.teams) {
		team.isActive = !team.isActive
	}
	const currentLeg = getCurrentLeg(match)
	if (currentLeg.throws.length === 0) {
		currentLeg.startingTeamId = getActiveTeam(match).id
	}

	return match
}

export const getMatchWinner = (match: Match): Team => {
	const team = match.teams.find((t) => t.setCountWon === match.setNeededToWin)
	if (!team) {
		throw new Error("match not over")
	}
	return team
}
