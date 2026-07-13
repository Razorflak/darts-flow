<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import { onWsConnect, sendMessage, wsMessage } from "$stores/wsStores.svelte";
	import { SUB_COMMANDS, UNSUB_COMMANDS, UPDATE_COMMANDS } from "@dartsFlow/shared-ws";
	import { getTeamDisplayName, type Match } from "@dartsFlow/models";
	import type { Unsubscriber } from "svelte/store";
	import { randomUuid } from "@dartsFlow/crypto";
	import { isTeamStartedCurrentLeg, getCurrentLegThrowsByTeam } from "@dartsFlow/match-utils";

	let match: Match | null = $state(null);

	let unsubscribeWsMessage: Unsubscriber | null;
	let unsubscribeOnWsConnect: Unsubscriber | null;

	const subTopics = () => {
		sendMessage({ id: randomUuid(), command: SUB_COMMANDS.subMatchUpdate, data: "all" });
	};

	onMount(async () => {
		unsubscribeWsMessage = wsMessage.subscribe((message) => {
			if (!message) {
				return;
			}
			if (message?.command === UPDATE_COMMANDS.matchUpdate) {
				match = message.data;
			}
		});
		unsubscribeOnWsConnect = onWsConnect.subscribe((value) => {
			// it's the first event, doesn't mean the socket is connected
			if (value === 0) {
				return;
			}
			subTopics();
		});
		// subTopics();
	});

	onDestroy(async () => {
		sendMessage({ id: randomUuid(), command: UNSUB_COMMANDS.unsubMatchUpdate, data: null });
		unsubscribeWsMessage?.();
		unsubscribeOnWsConnect?.();
	});
</script>

<div class="broadcast-page">
	<main class="broadcast-frame" aria-label="Score du match">
		{#if match}
			<section class="score-panel lexend">
				<header class="score-header">
					<span>{match.legNeededToWin} MANCHES GAGNANTES</span>
					<div class="score-columns">
						{#if !match.isCountUp}<span>MANCHES</span>{/if}
						<span></span>
					</div>
				</header>

				{#each match.teams as team, index}
					<div
						class:second-team={index === 1}
						class="score-team"
						style="border-left-color: {team.isActive ? '#ffffe0' : 'transparent'};"
					>
						<div class="team-identity">
							<span
								class:started={isTeamStartedCurrentLeg(match, team.id)}
								class="starting-indicator"
							></span>
							<span class="team-name">{getTeamDisplayName(team, "\n")}</span>
						</div>
						<div class="team-scores">
							<span>{match.isCountUp ? "" : team.legCountWon}</span>
							<strong>{team.currentScore}</strong>
						</div>
						<div
							class:show-last-score={!team.isActive &&
								getCurrentLegThrowsByTeam(match, team.id).length > 0}
							class="last-score"
						>
							{getCurrentLegThrowsByTeam(match, team.id).at(-1)?.score}
						</div>
					</div>
				{/each}

				<footer class="score-footer">
					<img src="/img/footer_banner.png" alt="Winamax French Darts Festival" />
				</footer>
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

	.score-panel {
		position: absolute;
		left: 50%;
		bottom: 10%;
		width: 42%;
		color: white;
		background: #480048;
		box-shadow: 0 0 1.5cqw rgb(0 0 0 / 55%);
	}

	.score-header,
	.score-team {
		display: grid;
		grid-template-columns: 2fr 1fr;
		align-items: center;
	}

	.score-header {
		min-height: 3.8cqh;
		padding: 0.35cqw 0.65cqw;
		border-bottom: 0.08cqw solid rgb(255 255 255 / 45%);
		font-size: 0.88cqw;
	}

	.score-columns,
	.team-scores {
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-items: center;
		text-align: center;
	}

	.score-team {
		position: relative;
		min-height: 6.8cqh;
		padding: 0.42cqw 0.65cqw;
		border-left: 0.5cqw solid transparent;
		font-size: 2cqw;
		overflow: visible;
	}

	.score-team::before {
		position: absolute;
		inset: 0;
		z-index: 1;
		background: #480048;
		content: "";
	}

	.score-team.second-team {
		border-top: 0.08cqw solid #dc2626;
	}

	.team-identity {
		position: relative;
		z-index: 2;
		display: flex;
		align-items: center;
		min-width: 0;
	}

	.starting-indicator {
		width: 0.95cqw;
		min-width: 0.95cqw;
		aspect-ratio: 1;
		margin-right: 0.45cqw;
		border-radius: 50%;
	}

	.starting-indicator.started {
		background: #dc2626;
	}

	.team-name {
		font-size: 1.45cqw;
		line-height: 1.05;
		font-weight: 700;
		white-space: pre-line;
	}

	.team-scores {
		position: relative;
		z-index: 2;
	}

	.last-score {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 0;
		display: flex;
		width: 6.8cqh;
		align-items: center;
		justify-content: center;
		font-size: 2cqw;
		font-weight: 700;
		background: #9ca3af;
		box-shadow: 0 0 0.8cqw rgb(0 0 0 / 45%);
		opacity: 0;
		pointer-events: none;
	}

	.score-footer {
		display: flex;
		height: 4.7cqh;
		align-items: center;
		padding: 0.65cqh 0.8cqw;
		background: black;
	}

	.score-footer img {
		height: 100%;
		object-fit: contain;
	}

	.show-last-score {
		animation: translate 3s ease-in-out;
	}

	@keyframes translate {
		0% {
			transform: translate(0);
			opacity: 0;
		}
		10% {
			transform: translate(100%);
			opacity: 1;
		}
		90% {
			transform: translate(100%);
			opacity: 1;
		}
		100% {
			transform: translate(0);
			opacity: 0;
		}
	}

	@font-face {
		font-family: "Lexend";
		src: url("/fonts/Lexend-Medium.ttf") format("truetype");
		font-weight: normal;
		font-style: normal;
	}

	.lexend {
		font-family: "Lexend", sans-serif;
	}
</style>
