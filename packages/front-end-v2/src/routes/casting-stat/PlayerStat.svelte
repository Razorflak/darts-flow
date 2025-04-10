<script lang="ts">
	import { getTeamDisplayName, type Match, type Team } from "@dartsScorer/models";
	import HeaderStat from "./HeaderStat.svelte";
	import {
		getScoreCountAboveOrEqualValue,
		getTeamAverage,
		getTeamFirst9Average
	} from "$lib/match-stat";

	let { team, match, reverse }: { team: Team; match: Match; reverse: boolean } = $props();

	const matchAverage = $derived(getTeamAverage(match, team.id));
	const matchFirst9Average = $derived(getTeamFirst9Average(match, team.id));
	const plus60Count = $derived(getScoreCountAboveOrEqualValue(match, team.id, 60, 100));
	const plus100Count = $derived(getScoreCountAboveOrEqualValue(match, team.id, 100, 140));
	const plus140Count = $derived(getScoreCountAboveOrEqualValue(match, team.id, 140, 170));
	const plus170Count = $derived(getScoreCountAboveOrEqualValue(match, team.id, 170, 180));
	const plus180Count = $derived(getScoreCountAboveOrEqualValue(match, team.id, 180, 181));
</script>

<div class="flex w-40/100 border-collapse flex-col p-2">
	<div class="flex w-full {reverse ? 'flex-row' : 'flex-row-reverse'} text-3xl">
		<div
			class="flex w-full items-center justify-center border p-4 text-center {team.isActive
				? 'bg-white text-black'
				: ''}"
		>
			{team.currentScore}
		</div>
		<div class="flex w-full items-center justify-center border p-4 text-center">
			Manches: {team.legCountWon}
		</div>
		<div
			style="white-space: pre-line"
			class="flex w-full items-center justify-center border p-4 text-center"
		>
			{getTeamDisplayName(team, "\n")}
		</div>
	</div>
	<div class="flex {reverse ? 'flex-row' : 'flex-row-reverse'}">
		<HeaderStat name="Moy." value={matchAverage} />
		<HeaderStat name="Moy. 9 darts" value={matchFirst9Average} />
	</div>
	<div class="flex {reverse ? 'flex-row' : 'flex-row-reverse'}">
		<HeaderStat name="Nbr. 60+" value={plus60Count} />
		<HeaderStat name="Nbr. 100+" value={plus100Count} />
		<HeaderStat name="Nbr. 140+" value={plus140Count} />
		<HeaderStat name="Nbr. 170+" value={plus170Count} />
		<HeaderStat name="Nbr. 180" value={plus180Count} />
	</div>
</div>
