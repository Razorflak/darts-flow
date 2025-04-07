import { getAllLeg, getAllThrows } from "@dartsScorer/match-utils";
import type { Match } from "@dartsScorer/models";

export const getTeamAverage = (match: Match, teamId: string): number => {
	const teamThrows = getAllThrows(match).filter((t) => t.teamId === teamId);
	const totalScore = teamThrows.reduce((sum, t) => sum + t.score, 0);
	return teamThrows.length ? totalScore / teamThrows.length : 0;
};

export const getTeamBestLeg = (match: Match, teamId: string): number => {
	const dartsToWin = getAllLeg(match)
		.filter((leg) => leg.winningTeamId === teamId)
		.map((leg) =>
			leg.throws.filter((t) => t.teamId === teamId).reduce((sum, t) => sum + t.darts, 0)
		);

	return dartsToWin.length ? Math.min(...dartsToWin) : 0;
};

export const getTeamBestFinish = (match: Match, teamId: string): number => {
	return getAllLeg(match)
		.filter((leg) => leg.winningTeamId === teamId)
		.reduce((best, leg) => {
			const teamThrows = leg.throws.filter((t) => t.teamId === teamId);
			const lastScore = teamThrows.at(-1)?.score ?? 0;
			return Math.max(best, lastScore);
		}, 0);
};

export const getTeamBestThrow = (match: Match, teamId: string): number => {
	return getAllLeg(match).reduce((best, leg) => {
		const teamThrows = leg.throws.filter((t) => t.teamId === teamId);
		const maxInLeg = teamThrows.length ? Math.max(...teamThrows.map((t) => t.score)) : 0;
		return Math.max(best, maxInLeg);
	}, 0);
};

export const getScoreCountAboveOrEqualValue = (
	match: Match,
	teamId: string,
	minEqualValue: number,
	maxValue: number
): number => {
	return getAllLeg(match).reduce((count, leg) => {
		const valid = leg.throws.filter(
			(t) => t.teamId === teamId && t.score >= minEqualValue && t.score < maxValue
		);
		return count + valid.length;
	}, 0);
};

export * from "./stat-stream-bar";
