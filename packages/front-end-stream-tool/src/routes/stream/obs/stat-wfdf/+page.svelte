<script lang="ts">
	import { getStatBar, type StatBar } from "$lib/match-stat";
	import { getApiBaseUrlFront } from "$lib/requester/utils";
	import { getTeamDisplayName, type Match } from "@dartsFlow/models";
	import { onMount } from "svelte";

	// This define the interval between each lien deploy animation
	const timingOffSet = 100;

	let bars: StatBar[] | null = $state(null);
	let match: Match | null = $state(null);

	let init = $state(true);
	onMount(async () => {
		const fetchedMatch: Match = await (
			await fetch(`${getApiBaseUrlFront()}/match-archive/`)
		).json();
		match = fetchedMatch;
		bars = getStatBar(match);

		setTimeout(() => {
			init = false;
		}, 1000);
	});

	const colors = { t1Colors: ["#480048", "#8A008A"], t2Colors: ["#D80000", "#FF6666"] };
</script>

<div class="broadcast-page">
	<main class="broadcast-frame" aria-label="Statistiques du match">
		{#if bars && match}
			<section class="stats-panel lexend">
				<div class="stats-header">
					<span style="white-space: pre-line" class="textleft text-shadow w-full font-bold"
						>{getTeamDisplayName(match.teams[0], "\n")}</span
					>
					<div class="stats-logo">
						<img src="/img/footer_banner.png" alt="Winamax French Darts Festival" />
					</div>
					<span style="white-space: pre-line" class="text-shadow w-full text-right font-bold"
						>{getTeamDisplayName(match.teams[1], "\n")}</span
					>
				</div>
				{#each bars as bar, index}
					<div class="stat-row">
						<!-- Player 1 -->
						<div class="stat-side stat-side-left">
							<div
								class="stat-bar stat-bar-left"
								style="width: {init
									? '0'
									: bar.team1Percent};transition: width 1s ease var(--delay, {index *
									timingOffSet}ms);background-color: {colors.t1Colors[index % 2]}"
							>
								<span class="text-shadow stat-value">
									{bar.team1StatValue}
								</span>
							</div>
						</div>

						<!-- Nom de la stat au centre -->
						<span class="stat-name">{bar.name.toUpperCase()}</span>

						<!-- Player 2 -->
						<div class="stat-side">
							<div
								class="stat-bar stat-bar-right"
								style="width: {init
									? '0'
									: bar.team2Percent};transition: width 1s ease var(--delay, {index *
									timingOffSet}ms);background-color: {colors.t2Colors[index % 2]}"
							>
								<span class="text-shadow stat-value">
									{bar.team2StatValue}
								</span>
							</div>
						</div>
					</div>
				{/each}
			</section>
		{/if}
	</main>
</div>

<style>
	:global(html),
	:global(body) {
		margin: 0;
		overflow: hidden;
		background: #ff0000;
	}

	:global(body) {
		min-width: 100vw;
		min-height: 100vh;
	}

	.broadcast-page {
		position: fixed;
		inset: 0;
		display: grid;
		place-items: center;
		background: #ff0000;
	}

	.broadcast-frame {
		position: relative;
		width: min(100vw, calc(100vh * 16 / 9));
		height: min(100vh, calc(100vw * 9 / 16));
		overflow: hidden;
		container-type: size;
		background: #00ff00;
	}

	.stats-panel {
		position: absolute;
		left: 50%;
		top: 50%;
		display: flex;
		width: 75%;
		max-height: 90%;
		transform: translate(-50%, -50%);
		flex-direction: column;
	}

	.stats-header {
		display: grid;
		grid-template-columns: 1fr 18% 1fr;
		align-items: center;
		min-height: 8cqh;
		padding: 0.8cqw 0;
		font-size: 1.8cqw;
		color: white;
	}

	.stats-logo {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 5.5cqh;
		overflow: visible;
	}

	.stats-logo img {
		width: 145%;
		max-width: none;
		height: 100%;
		object-fit: contain;
	}

	.stat-row {
		display: grid;
		grid-template-columns: minmax(0, 1fr) 11.5cqw minmax(0, 1fr);
		align-items: center;
		height: 5.8cqh;
		padding-bottom: 1.6cqh;
		font-weight: 700;
	}

	.stat-side {
		height: 100%;
	}

	.stat-side-left {
		display: flex;
		justify-content: flex-end;
	}

	.stat-bar {
		display: flex;
		height: 100%;
		align-items: center;
		color: white;
	}

	.stat-bar-left {
		justify-content: flex-start;
	}

	.stat-bar-right {
		justify-content: flex-end;
	}

	.stat-value {
		padding: 0 0.8cqw;
		font-size: 1.25cqw;
	}

	.stat-name {
		z-index: 1;
		display: inline-flex;
		height: 100%;
		align-items: center;
		justify-content: center;
		background: #374151;
		font-size: 1.05cqw;
		text-align: center;
		color: white;
	}

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
