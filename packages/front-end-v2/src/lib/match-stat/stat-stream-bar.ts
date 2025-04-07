import {
	getScoreCountAboveOrEqualValue,
	getTeamAverage,
	getTeamBestFinish,
	getTeamBestLeg,
	getTeamBestThrow
} from "$lib/match-stat";
import { getAllLeg } from "@dartsScorer/match-utils";
import type { Match } from "@dartsScorer/models";

type StatInfo = {
	name: string;
	team1: { value: number };
	team2: { value: number };
	maxRef?: number;
	reverseBest?: boolean;
};

export type StatBar = {
	name: string;
	team1StatValue: number;
	team2StatValue: number;
	team1Percent: string;
	team2Percent: string;
};

export const getStatBar = (match: Match): StatBar[] => {
	const statStream = getMatchStreamStat(match);
	return statStream.map((stat) => {
		const bestRef = stat.maxRef
			? stat.maxRef
			: stat.reverseBest
				? Math.min(stat.team1.value, stat.team2.value)
				: Math.max(stat.team1.value, stat.team2.value);

		const percentT1 =
			stat.reverseBest && stat.team1.value !== 0
				? (bestRef / stat.team1.value) * 100
				: (stat.team1.value / bestRef) * 100;
		const percentT2 =
			stat.reverseBest && stat.team2.value !== 0
				? (bestRef / stat.team2.value) * 100
				: (stat.team2.value / bestRef) * 100;
		return {
			name: stat.name,
			team1StatValue: stat.team1.value,
			team2StatValue: stat.team2.value,
			team1Percent: `${percentT1}%`,
			team2Percent: `${percentT2}%`
		};
	});
};

const getMatchStreamStat = (match: Match): StatInfo[] => {
	const team1Id = match.teams[0].id;
	const team2Id = match.teams[1].id;
	const stats: StatInfo[] = [];
	const avgStats: StatInfo = {
		name: "Moyenne",
		team1: { value: +getTeamAverage(match, team1Id).toFixed(2) },
		team2: { value: +getTeamAverage(match, team2Id).toFixed(2) }
	};
	stats.push(avgStats);

	const allLeg = getAllLeg(match);

	const legsWonStats: StatInfo = {
		name: "Manches",
		team1: { value: allLeg.filter((l) => l.winningTeamId === team1Id).length },
		team2: { value: allLeg.filter((l) => l.winningTeamId === team2Id).length }
	};
	stats.push(legsWonStats);

	const bestLegStats: StatInfo = {
		name: "Meilleure manche",
		team1: { value: getTeamBestLeg(match, team1Id) },
		team2: { value: getTeamBestLeg(match, team2Id) },
		reverseBest: true
	};
	stats.push(bestLegStats);

	const bestFinishStats: StatInfo = {
		name: "Meilleur finish",
		team1: { value: getTeamBestFinish(match, team1Id) },
		team2: { value: getTeamBestFinish(match, team2Id) },
		maxRef: 170
	};
	stats.push(bestFinishStats);

	const bestThrowStats: StatInfo = {
		name: "Meilleur score",
		team1: { value: getTeamBestThrow(match, team1Id) },
		team2: { value: getTeamBestThrow(match, team2Id) },
		maxRef: 180
	};
	stats.push(bestThrowStats);

	const t1_60 = getScoreCountAboveOrEqualValue(match, team1Id, 60, 100);
	const t2_60 = getScoreCountAboveOrEqualValue(match, team2Id, 60, 100);
	const t1_100 = getScoreCountAboveOrEqualValue(match, team1Id, 100, 140);
	const t2_100 = getScoreCountAboveOrEqualValue(match, team2Id, 100, 140);
	const t1_140 = getScoreCountAboveOrEqualValue(match, team1Id, 140, 180);
	const t2_140 = getScoreCountAboveOrEqualValue(match, team2Id, 140, 180);
	const t1_180 = getScoreCountAboveOrEqualValue(match, team1Id, 180, 181);
	const t2_180 = getScoreCountAboveOrEqualValue(match, team2Id, 180, 181);
	const refMaxThrow = Math.max(t1_60, t1_100, t1_140, t1_180, t2_60, t2_100, t2_140, t2_180);

	const throwAbove60Stats: StatInfo = {
		name: "60+",
		team1: { value: getScoreCountAboveOrEqualValue(match, team1Id, 60, 100) },
		team2: { value: getScoreCountAboveOrEqualValue(match, team2Id, 60, 100) },
		maxRef: refMaxThrow
	};
	stats.push(throwAbove60Stats);

	const throwAbove100Stats: StatInfo = {
		name: "100+",
		team1: { value: getScoreCountAboveOrEqualValue(match, team1Id, 100, 140) },
		team2: { value: getScoreCountAboveOrEqualValue(match, team2Id, 100, 140) },
		maxRef: refMaxThrow
	};
	stats.push(throwAbove100Stats);

	const throwAbove140Stats: StatInfo = {
		name: "140+",
		team1: { value: getScoreCountAboveOrEqualValue(match, team1Id, 140, 180) },
		team2: { value: getScoreCountAboveOrEqualValue(match, team2Id, 140, 180) },
		maxRef: refMaxThrow
	};
	stats.push(throwAbove140Stats);

	const throwAbove180Stats: StatInfo = {
		name: "180",
		team1: { value: getScoreCountAboveOrEqualValue(match, team1Id, 180, 181) },
		team2: { value: getScoreCountAboveOrEqualValue(match, team2Id, 180, 181) },
		maxRef: refMaxThrow
	};
	stats.push(throwAbove180Stats);
	return stats;
};
