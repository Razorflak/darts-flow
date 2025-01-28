import { getAllLeg, getAllThrows } from "@dartsScorer/match-utils"
import type { Match } from "@dartsScorer/models"

export const getTeamAverage = (match: Match, teamId: string) => {
	const throws = getAllThrows(match)
	let nbrDarts = 0
	let totalScore = 0
	for (const throw_ of throws.filter((t) => t.teamId === teamId)) {
		nbrDarts += throw_.darts
		totalScore += throw_.score
	}
	return (totalScore / nbrDarts) * 3
}

export const getTeamBestLeg = (match: Match, teamId: string): number => {
	const legs = getAllLeg(match)
	const legsWon = legs.filter((l) => l.winningTeamId === teamId)
	if (legsWon.length === 0) {
		return 0
	}

	const dartsToWin = legsWon.map((leg) => {
		return leg.throws.reduce((accThrow, currentThrow) => {
			return accThrow + currentThrow.darts
		}, 0)
	})

	return Math.min(...dartsToWin)
}

export const getTeamBestFinish = (match: Match, teamId: string): number => {
	const legsWon = getAllLeg(match).filter((leg) => leg.winningTeamId === teamId)

	const bestFinish = legsWon.reduce((maxFinish, leg) => {
		const throwsW = leg.throws.filter((athrow) => athrow.teamId === teamId)
		if (throwsW.length > 0) {
			const lastThrowScore = throwsW[throwsW.length - 1].score
			return Math.max(maxFinish, lastThrowScore)
		}
		return maxFinish
	}, 0)

	return bestFinish
}

export const getTeamBestThrow = (match: Match, teamId: string): number => {
	const bestThrow = getAllLeg(match).reduce((maxThrow, leg) => {
		const teamThrows = leg.throws.filter((athrow) => athrow.teamId === teamId)
		if (teamThrows.length > 0) {
			const maxThrowInLeg = Math.max(
				...teamThrows.map((athrow) => athrow.score),
			)
			return Math.max(maxThrow, maxThrowInLeg) // Mettre à jour le meilleur score global
		}

		return maxThrow
	}, 0)

	return bestThrow
}

export const getScoreCountAboveOrEqualValue = (
	match: Match,
	teamId: string,
	minEqualValue: number,
	maxValue: number,
): number => {
	const validThrowsCount = getAllLeg(match).reduce((count, leg) => {
		const teamThrows = leg.throws.filter((athrow) => athrow.teamId === teamId)

		const validThrowsInLeg = teamThrows.filter(
			(athrow) => athrow.score >= minEqualValue && athrow.score < maxValue,
		)
		return count + validThrowsInLeg.length // Ajouter au compteur
	}, 0)
	return validThrowsCount
}
