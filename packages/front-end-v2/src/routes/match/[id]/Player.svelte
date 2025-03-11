<script lang="ts">
	import { getCurrentLegThrowsByTeam } from "@dartsScorer/match-utils";
	import { getPlayerDisplayName, type Match, type Team } from "@dartsScorer/models";

	export let team: Team;
	export let match: Match;
	export let bindHistory;
	export let onScroll;
	export let onClickPlayer;
	export let centerDirection: "end" | "start" = "end";
</script>

<div
	class="flex flex-1 flex-col items-center overflow-hidden border-r border-gray-700 p-4"
	class:!bg-gray-800={team.isActive}
	on:pointerdown={() => onClickPlayer(team)}
>
	<p
		class="flex w-full justify-{centerDirection} px-4 leading-none font-bold"
		style="font-size: clamp(2rem, 7vw, 10vh);"
	>
		{team.legCountWon}
	</p>
	<h2 class="font-bold" style="font-size: clamp(2rem, 5vw, 5rem);">
		{team.players.map((p) => getPlayerDisplayName(p)).join("/")}
	</h2>
	<span class="leading-none font-extrabold" style="font-size: clamp(3rem, 15vw, 20vh);">
		{team.currentScore}
	</span>
	<hr class="my-2 w-3/4 border-gray-500" />
	<div
		class="flex w-full flex-grow flex-col space-y-1 overflow-y-auto px-4"
		on:scroll={onScroll}
		bind:this={bindHistory}
	>
		{#each getCurrentLegThrowsByTeam(match, team.id) as score}
			<p class="text-center text-3xl">{score.score}</p>
		{/each}
	</div>
</div>
