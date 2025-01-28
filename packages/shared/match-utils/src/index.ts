import type { Match } from "@dartsScorer/models"
import { getCurrentLeg, handleLegOver, isLegOver } from "./leg.js"
import { getActiveTeam, getInactiveTeam } from "./team.js"
import { changeActiveTeam } from "./match.js"

export const handlerScoreUpdate = (match: Match) => {
	if (isLegOver(match)) {
		handleLegOver(match)
	}
	return match
}

export const inputScore = (match: Match, score: number, darts = 3): Match => {
	const isScoreValid = (score: number) => score <= 180
	if (!isScoreValid(score)) {
		throw new Error("Invalid score")
	}
	const activeTeam = getActiveTeam(match)
	if (!activeTeam.currentScore) {
		throw new Error("No current score")
	}
	activeTeam.currentScore -= score
	getCurrentLeg(match).throws.push({ score, darts, teamId: activeTeam.id })
	if (isLegOver(match)) {
		return handleLegOver(match)
	}

	changeActiveTeam(match)
	return match
}

export const undoLastScore = (match: Match) => {
	const currentLeg = match.sets.at(-1)?.legs.at(-1)
	const lastThrow = currentLeg?.throws.pop()
	if (!lastThrow) {
		throw new Error("No throw in this leg")
	}
	const activeTeam = getInactiveTeam(match)
	activeTeam.currentScore += lastThrow?.score
	return changeActiveTeam(match)
}

export * from "./leg.js"
export * from "./set.js"
export * from "./team.js"
export * from "./match.js"
export * from "./throw.js"
