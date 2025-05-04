<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import { onWsConnect, sendMessage, wsMessage } from "$stores/wsStores.svelte";
	import { SUB_COMMANDS, UNSUB_COMMANDS, UPDATE_COMMANDS } from "@dartsFlow/shared-ws";
	import { getTeamDisplayName, type Match } from "@dartsFlow/models";
	import type { Unsubscriber } from "svelte/store";
	import { randomUuid } from "@dartsFlow/crypto";
	import { getCurrentLegThrowsByTeam } from "@dartsFlow/match-utils";

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

{#if match}
	<main class="font-roboto absolute bottom-0 w-85/100 border-b-white bg-purple-950 text-white">
		<!-- En-tête -->
		<div class="grid grid-cols-3 border-b border-gray-400 px-2 py-8 text-5xl">
			<span class="col-span-2 pl-8">{match.legNeededToWin} MANCHES GAGNANTES</span>
			<div class="grid grid-cols-2 text-center">
				<span>MANCHES</span>
				<span>POINTS</span>
			</div>
		</div>

		<!-- Contenu dynamique -->
		{#each match.teams as team, index}
			<div
				class="relative grid grid-cols-3 items-center px-8 py-4 text-8xl {index === 1
					? 'border-t border-red-600'
					: ''}"
				style="border-left: {team.isActive ? '24px solid #FFFFE0' : '4px solid transparent'};"
			>
				<div class="col-span-2 flex items-center">
					<span class="mr-2 h-12 w-12 rounded-full {team.isActive && 'bg-red-600'}"></span>
					<span style="white-space: pre-line" class="font-roboto leading-normal font-bold"
						>{getTeamDisplayName(team, "\n")}</span
					>
				</div>
				<div class="grid grid-cols-2 items-center text-center text-white">
					<span class="rounded-md px-2 py-1">{team.legCountWon}</span>
					<span class="rounded-md px-2 py-1 font-bold">{team.currentScore}</span>
				</div>
				<div
					class="{!team.isActive && getCurrentLegThrowsByTeam(match, team.id).length > 0
						? 'show-last-score'
						: ''} absolute right-0 -z-50 flex h-1/1 items-center bg-gray-400 p-4 text-center text-white shadow-lg"
				>
					{getCurrentLegThrowsByTeam(match, team.id).at(-1)?.score}
				</div>
			</div>
		{/each}

		<!-- Footer -->
		<div class="flex justify-between bg-black px-8 py-4 text-center text-6xl">
			<span>COUPE DE FRANCE</span>
			<span>{match.competition} - {match.competitionStage}</span>
		</div>
	</main>
{/if}

<style>
	.show-last-score {
		animation: translate 3s ease-in-out;
	}

	@keyframes translate {
		0% {
			transform: translate(0);
		}
		5% {
			transform: translate(100%);
		}
		95% {
			transform: translate(100%);
		}
		100% {
			transform: translate(0);
		}
	}
</style>
