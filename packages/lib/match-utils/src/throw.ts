import type { Match, Team } from "@dartsScorer/models"
import { getCurrentLeg } from "./leg.js"

export const getLastThrowByTeam = (match: Match, team: Team) => {
	const currentLeg = getCurrentLeg(match)
	return currentLeg.throws.findLast((_throw) => _throw.teamId === team.id)
		?.score
}
