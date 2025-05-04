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

{#if match}
	<div class="fixed bottom-0 w-full px-48 pb-16">
		<div
			class=" bottom-0 flex h-[10vh] w-full items-center justify-center overflow-hidden border-t-4 border-white/10 bg-[rgb(0,0,145)] px-8 text-white shadow-[0_-5px_20px_rgba(0,0,0,0.5)]"
		>
			<div class="slide-in-left w-full text-right text-4xl font-bold whitespace-nowrap">
				🎯 {getTeamDisplayName(match.teams[0])}
			</div>

			<div class="m-40 text-2xl font-semibold opacity-80">VS</div>

			<div class="slide-in-right w-full text-4xl font-bold whitespace-nowrap">
				{getTeamDisplayName(match.teams[1])} 🎯
			</div>
		</div>
		<div class="flex flex-col bg-black text-2xl text-white">
			<div class="flex justify-center">{match.competition}</div>
			<div class="flex justify-center">{match.competitionStage}</div>
		</div>
	</div>
{/if}

<style>
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
</style>
