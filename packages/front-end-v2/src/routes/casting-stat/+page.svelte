<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import { onWsConnect, sendMessage, wsMessage } from "$stores/wsStores.svelte";
	import { SUB_COMMANDS, UNSUB_COMMANDS, UPDATE_COMMANDS } from "@dartsScorer/shared-ws";
	import { type Leg, type Match } from "@dartsScorer/models";
	import type { Unsubscriber } from "svelte/store";
	import { randomUuid } from "@dartsScorer/crypto";
	import PlayerStat from "./PlayerStat.svelte";
	import LegStat from "./LegStat.svelte";

	let match: Match | null = $state(null);
	let reverseLegs: Leg[] | null = $state(null);

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
				reverseLegs = match.sets[0].legs.reverse();
				console.log(reverseLegs);
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
	<main class="font-roboto flex h-screen w-screen border-collapse flex-col bg-[#0F172A] text-white">
		<div class="flex flex-row justify-between">
			<PlayerStat team={match.teams[0]} {match} reverse={false} />
			<div class="flex h-full flex-col items-center justify-center">
				<span class="text-2xl">{match.competition}</span>
				<span class="text-2xl">{match.competitionStage}</span>
			</div>
			<PlayerStat team={match.teams[1]} {match} reverse={true} />
		</div>

		{#if reverseLegs}
			<div class="row mt-6 flex flex-row flex-wrap justify-center">
				{#each reverseLegs as leg, index}
					<LegStat {leg} {match} mancheNumber={reverseLegs.length - index} />
				{/each}
			</div>
		{/if}
	</main>
{/if}
