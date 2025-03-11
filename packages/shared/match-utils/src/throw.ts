import type { Match, Team, Throw } from "@dartsScorer/models"
import { getCurrentLeg } from "./leg.js"

export const getLastThrowByTeam = (match: Match, team: Team) => {
	const currentLeg = getCurrentLeg(match)
	// @ts-ignore-error
	return currentLeg.throws.findLast((_throw) => _throw.teamId === team.id)
		?.score
}

export const getAllThrows = (match: Match): Throw[] => {
	return match.sets.flatMap((set) => set.legs.flatMap((leg) => leg.throws))
}

export const getCurrentLegThrowsByTeam = (match: Match, teamId: string) =>
	getCurrentLeg(match).throws.filter((t) => t.teamId === teamId)
