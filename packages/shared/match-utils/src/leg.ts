import type { Leg, Match } from "@dartsFlow/models"
import { getOppositeTeamById, getTeamById } from "./team.js"
import { getCurrentSet, handleSetOver, isSetOver } from "./set.js"
import { randomUuid } from "@dartsFlow/crypto"

export const getCurrentLeg = (match: Match): Leg => {
	const leg = match.sets.at(-1)?.legs.at(-1)
	if (!leg) {
		throw new Error("No current leg")
	}

	return leg
}

export const isLegOver = (match: Match): boolean => {
	const team1WonLeg = match.teams[0].currentScore === 0
	const team2WonLeg = match.teams[1].currentScore === 0
	return team1WonLeg || team2WonLeg
}

export const handleLegOver = (match: Match): Match => {
	const winningTeam = match.teams.find((team) => team.currentScore === 0)
	if (!winningTeam) {
		throw new Error("Winning team not found")
	}
	winningTeam.legCountWon++
	const currentLeg = getCurrentLeg(match)
	currentLeg.winningTeamId = winningTeam.id
	if (isSetOver(match)) {
		handleSetOver(match)
		return match
	}

	const previousLegStarter = getTeamById(match, currentLeg.startingTeamId)
	const newStarter = getOppositeTeamById(match, previousLegStarter.id)

	newStarter.isActive = true
	previousLegStarter.isActive = false

	for (const team of match.teams) {
		team.currentScore = 501
	}

	getCurrentSet(match).legs.push({
		id: randomUuid(),
		startingTeamId: newStarter.id,
		throws: [],
	})
	return match
}

export const getAllLeg = (match: Match): Leg[] => {
	return match.sets.flatMap((set) => set.legs)
}
