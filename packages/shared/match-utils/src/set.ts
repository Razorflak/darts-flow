import type { Lot, Match } from "@dartsScorer/models"
import { handleMatchOver, isMatchOver } from "./match.js"
import { getOppositeTeamById } from "./team.js"
import { randomUuid } from "@dartsScorer/crypto"

export const isSetOver = (match: Match) => {
	const team1WonSet = match.legNeededToWin === match.teams[0].legCountWon
	const team2WonSet = match.legNeededToWin === match.teams[1].legCountWon
	return team2WonSet || team1WonSet
}

export const handleSetOver = (match: Match) => {
	const currentSet = getCurrentSet(match)
	currentSet.winnerTeamId = match.teams.find(
		(team) => team.currentScore === 0,
	)?.id

	match.legNeededToWin === match.teams[0].legCountWon &&
		match.teams[0].setCountWon++
	match.legNeededToWin === match.teams[1].legCountWon &&
		match.teams[1].setCountWon++
	if (isMatchOver(match)) {
		return handleMatchOver(match)
	}
	const startingTeam = getOppositeTeamById(
		match,
		getCurrentSet(match).startingTeamId,
	).id
	const newLeg = {
		id: randomUuid(),
		startingTeamId: startingTeam,
		throws: [],
	}
	const newSet: Lot = {
		legs: [newLeg],
		id: randomUuid(),
		startingTeamId: startingTeam,
	}
	match.sets.push(newSet)
	return match
}

export const getCurrentSet = (match: Match): Lot => {
	const set = match.sets.at(-1)
	if (!set) {
		throw new Error("No current set")
	}

	return set
}
