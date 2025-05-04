import { getAllLeg, getAllThrows } from "@dartsFlow/match-utils";
import type { Match, Throw } from "@dartsFlow/models";

export const getTeamAverage = (match: Match, teamId: string): number => {
	const teamThrows = getAllThrows(match).filter((t) => t.teamId === teamId);
	const totalScore = teamThrows.reduce((sum, t) => sum + t.score, 0);
	return teamThrows.length ? totalScore / teamThrows.length : 0;
};

export const getTeamFirst9Average = (match: Match, teamId: string): number => {
	const legs = getAllLeg(match);
	const first3Throws: Throw[] = [];
	legs.forEach((leg) => {
		leg.throws.forEach((throw_, index) => {
			if (index <= 5 && throw_.teamId === teamId) {
				first3Throws.push(throw_);
			}
		});
	});
	const totalScore = first3Throws.reduce((acc, cur) => {
		return cur.score + acc;
	}, 0);

	return totalScore / first3Throws.length;
};

export const getTeamBestLeg = (match: Match, teamId: string): number => {
	const dartsToWin = getAllLeg(match)
		.filter((leg) => leg.winningTeamId === teamId)
		.map((leg) =>
			leg.throws.filter((t) => t.teamId === teamId).reduce((sum, t) => sum + t.darts, 0)
		);

	return dartsToWin.length ? Math.min(...dartsToWin) : Infinity;
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
