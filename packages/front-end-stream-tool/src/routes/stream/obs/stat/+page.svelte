<script lang="ts">
	import { getStatBar, type StatBar } from "$lib/match-stat";
	import { getApiBaseUrl } from "$lib/requester/utils";
	import { getTeamDisplayName, type Match } from "@dartsFlow/models";
	import { onMount } from "svelte";

	// This define the interval between each lien deploy animation
	const timingOffSet = 100;

	let bars: StatBar[] | null = $state(null);
	let match: Match | null = $state(null);

	let init = $state(true);
	onMount(async () => {
		const fetchedMatch: Match = await (await fetch(`${getApiBaseUrl()}/match-archive/`)).json();
		match = fetchedMatch;
		bars = getStatBar(match);

		setTimeout(() => {
			init = false;
		}, 1000);
	});

	const colors = { t1Colors: ["#480048", "#8A008A"], t2Colors: ["#D80000", "#FF6666"] };
</script>

{#if bars && match}
	<main class=" lexend flex h-screen w-full flex-col px-50">
		<div class="row flex w-full justify-between py-8 text-4xl text-white">
			<span style="white-space: pre-line" class="textleft text-shadow w-full font-bold"
				>{getTeamDisplayName(match.teams[0], "\n")}</span
			>
			<div class="flex items-start justify-center overflow-visible align-middle">
				<img class="max-h-full min-w-[150%]" src="/img/footer_banner.png" alt="logoffd" />
			</div>
			<span style="white-space: pre-line" class="text-shadow w-full text-right font-bold"
				>{getTeamDisplayName(match.teams[1], "\n")}</span
			>
		</div>
		{#each bars as bar, index}
			<div
				class="relative flex h-20 w-full items-center justify-center pb-10 font-bold text-gray-800"
			>
				<!-- Player 1 -->
				<div class="flex h-full w-full justify-end">
					<div
						class="flex h-full items-center justify-start text-sm text-white"
						style="width: {init
							? '0'
							: bar.team1Percent};transition: width 1s ease var(--delay, {index *
							timingOffSet}ms);background-color: {colors.t1Colors[index % 2]}"
					>
						<span class="text-shadow px-4 text-2xl">
							{bar.team1StatValue}
						</span>
					</div>
				</div>

				<!-- Nom de la stat au centre -->
				<span
					class="z-10 mx-2 inline-flex h-full min-w-[220px] items-center justify-center bg-gray-700 text-center text-xl text-white"
					>{bar.name.toUpperCase()}</span
				>

				<!-- Player 2 -->
				<div class="h-full w-full">
					<div
						class="flex h-full items-center justify-end text-sm text-white"
						style="width: {init
							? '0'
							: bar.team2Percent};transition: width 1s ease var(--delay, {index *
							timingOffSet}ms);background-color: {colors.t2Colors[index % 2]}"
					>
						<span class="text-shadow px-4 text-2xl">
							{bar.team2StatValue}
						</span>
					</div>
				</div>
			</div>
		{/each}
	</main>
{/if}

<style>
	@font-face {
		font-family: "Lexend";
		src: url("/fonts/Lexend-Medium.ttf") format("truetype");
		font-weight: normal;
		font-style: normal;
	}
	.text-shadow {
		font-family: "Lexend", sans-serif;
		text-shadow:
			#000000 1px 1px,
			#000000 -1px 1px,
			#000000 -1px -1px,
			#000000 1px -1px;
	}

	.lexend {
		font-family: "Lexend", sans-serif;
	}
</style>
