<script lang="ts">
	import { onWsConnect, sendMessage, wsMessage } from "$stores/wsStores.svelte";
	import { randomUuid } from "@dartsFlow/crypto";
	import { getTeamDisplayName, type Match } from "@dartsFlow/models";
	import { SUB_COMMANDS, UNSUB_COMMANDS, UPDATE_COMMANDS } from "@dartsFlow/shared-ws";
	import { onDestroy, onMount } from "svelte";
	import type { Unsubscriber } from "svelte/store";

	let match: Match | null = $state(null);

	let unsubscribeWsMessage: Unsubscriber | null;
	let unsubscribeOnWsConnect: Unsubscriber | null;

	const subTopics = () => {
		sendMessage({ id: randomUuid(), command: SUB_COMMANDS.subMatchUpdate, data: "all" });
	};

	onMount(async () => {
		unsubscribeWsMessage = wsMessage.subscribe((message) => {
			console.log("incoming message", message);
			if (message?.command === UPDATE_COMMANDS.matchUpdate) {
				match = message.data;
			}
		});
		unsubscribeOnWsConnect = onWsConnect.subscribe(() => {
			subTopics();
		});
		subTopics();
	});

	onDestroy(async () => {
		sendMessage({ id: randomUuid(), command: UNSUB_COMMANDS.unsubMatchUpdate, data: null });
		unsubscribeWsMessage?.();
		unsubscribeOnWsConnect?.();
	});
</script>

<div class="broadcast-page">
	<main class="broadcast-frame" aria-label="Présentation du match">
		{#if match}
			<section class="versus-panel lexend">
				<div class="versus-content">
					<div class="slide-in-left team team-left">
						{getTeamDisplayName(match.teams[0])}
					</div>

					<div class="versus-label">VS</div>

					<div class="slide-in-right team team-right">
						{getTeamDisplayName(match.teams[1])}
					</div>
				</div>
				<footer class="versus-footer">
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

	.versus-panel {
		position: absolute;
		left: 50%;
		bottom: 0;
		width: 80%;
		transform: translateX(-50%);
		color: white;
		box-shadow: 0 -0.35cqw 1.2cqw rgb(0 0 0 / 50%);
	}

	.versus-content {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
		align-items: center;
		min-height: 10.8cqh;
		overflow: hidden;
		padding: 0.8cqw 1.7cqw;
		border-top: 0.22cqw solid rgb(255 255 255 / 10%);
		background: #480048;
	}

	.team {
		overflow: hidden;
		font-size: 2.25cqw;
		font-weight: 700;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.team-left {
		text-align: right;
	}

	.team-right {
		text-align: left;
	}

	.versus-label {
		margin: 0 4.5cqw;
		font-size: 1.25cqw;
		font-weight: 600;
		opacity: 0.8;
	}

	.versus-footer {
		display: flex;
		height: 5.8cqh;
		align-items: center;
		justify-content: center;
		padding: 0.65cqh 0.8cqw;
		background: black;
	}

	.versus-footer img {
		height: 100%;
		object-fit: contain;
	}

	@keyframes slide-in-left {
		0% {
			transform: translateX(-100%);
			opacity: 0;
		}
		80% {
			transform: translateX(-100%);
			opacity: 0;
		}
		100% {
			transform: translateX(0);
			opacity: 1;
		}
	}

	@keyframes slide-in-right {
		0% {
			transform: translateX(100%);
			opacity: 0;
		}
		80% {
			transform: translateX(100%);
			opacity: 0;
		}
		100% {
			transform: translateX(0);
			opacity: 1;
		}
	}
	.slide-in-left {
		animation: slide-in-left 2s ease-out forwards;
	}

	.slide-in-right {
		animation: slide-in-right 2s ease-out forwards;
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
