import type { Match } from "@dartsScorer/models";

const testMatch: Match = {
	id: "match-001",
	setNeededToWin: 1,
	legNeededToWin: 6,
	competition: "Championnat Régional",
	competitionStage: "Demi-finale",
	isOver: false,
	teams: [
		{
			id: "team-1",
			initialScore: 501,
			currentScore: 501,
			isActive: true,
			legCountWon: 0,
			setCountWon: 0,
			players: [{ id: "p1", name: "Tanguy", fistName: "Julien" }]
		},
		{
			id: "team-2",
			players: [{ id: "p2", name: "Perret", fistName: "Christelle" }],
			initialScore: 501,
			currentScore: 501,
			isActive: false,
			legCountWon: 0,
			setCountWon: 0
		}
	],
	sets: [
		{
			id: "set-001",
			startingTeamId: "team-1",
			legs: [
				{
					id: "leg-001",
					startingTeamId: "team-1",
					throws: []
				}
			]
		}
	],
	winningTeamId: undefined // Le match n'est pas encore terminé
};

export default testMatch;
