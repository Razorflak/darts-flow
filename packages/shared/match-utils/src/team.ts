import { randomUuid } from "@dartsScorer/crypto"
import type { Match, Player, Team } from "@dartsScorer/models"

export const getTeamById = (match: Match, id: string): Team => {
	const team = match.teams.find((team) => team.id === id)
	if (!team) {
		throw new Error("Team not found")
	}
	return team
}

export const getOppositeTeamById = (match: Match, id: string): Team => {
	const team = match.teams.find((team) => team.id !== id)
	if (!team) {
		throw new Error("Team not found")
	}
	return team
}

export const createTeam = (
	players: { name: string; firstName: string }[],
	initialScore: number,
	isActive: boolean,
): Team => {
	const _players: Player[] = players.map((player) => {
		return {
			id: randomUuid(),
			name: player.name,
			fistName: player.firstName,
		}
	})
	return {
		players: _players,
		isActive,
		id: randomUuid(),
		legCountWon: 0,
		setCountWon: 0,
		currentScore: initialScore,
		initialScore: initialScore,
	}
}

export const getActiveTeam = (match: Match): Team => {
	const activeTeam = match.teams.find((team) => team.isActive)
	if (!activeTeam) {
		throw new Error("No active team")
	}
	return activeTeam
}
export const getInactiveTeam = (match: Match): Team => {
	const activeTeam = match.teams.find((team) => !team.isActive)
	if (!activeTeam) {
		throw new Error("No active team")
	}
	return activeTeam
}
