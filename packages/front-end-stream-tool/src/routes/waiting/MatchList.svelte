<script lang="ts">
	import { goto } from "$app/navigation";
	import { getWebSocket, onWsConnect, sendMessage, wsMessage } from "$stores/wsStores.svelte";
	import { randomUuid } from "@dartsFlow/crypto";
	import {
		getTeamDisplayName,
		matchStatus,
		type Match,
		type MatchInformation
	} from "@dartsFlow/models";
	import {
		ADMIN_COMMANDS,
		SUB_COMMANDS,
		UPDATE_COMMANDS,
		type Client,
		type WsMessage
	} from "@dartsFlow/shared-ws";
	import { onDestroy, onMount } from "svelte";
	import type { Unsubscriber } from "svelte/store";
	let { client }: { client: Client | null } = $props();

	let matchInformations: MatchInformation[] = $state([]);
	let unsubscriberWsMessage: Unsubscriber | null = null;
	let unsubscriberOnWsConnect: Unsubscriber | null = null;

	const subTopics = () => {
		getWebSocket()?.send({
			command: SUB_COMMANDS.subMatchListUpdate,
			id: randomUuid(),
			data: null
		});
	};

	onMount(() => {
		subTopics();

		unsubscriberWsMessage = wsMessage.subscribe((message) => {
			if (message?.command === UPDATE_COMMANDS.matchListUpdate) {
				matchInformations = message.data.filter((m) => m.status === matchStatus.ACTIVE);
			}
		});

		unsubscriberOnWsConnect = onWsConnect.subscribe(() => {
			subTopics();
		});
	});

	onDestroy(() => {
		unsubscriberWsMessage?.();
		unsubscriberOnWsConnect?.();
	});

	function goToScoring(match: Match) {
		goto(`/match/${match.id}`);
	}
</script>

<section class="mx-auto rounded-xl p-4 shadow-lg">
	<h2 class="mb-4 text-xl font-bold">Liste des match en attente</h2>
	{#if matchInformations.length > 0}
		<ul class="space-y-2">
			{#each matchInformations as matchInformation}
				<li class="flex flex-row">
					<span class="w-1/2">
						{getTeamDisplayName(matchInformation.match.teams[0])} / {getTeamDisplayName(
							matchInformation.match.teams[1]
						)}
					</span>
					<button
						class="mx-10 flex cursor-pointer items-center justify-between rounded-lg bg-blue-500 p-3 shadow-sm disabled:opacity-50"
						onclick={() => goToScoring(matchInformation.match)}
					>
						Scorage
					</button>
				</li>
			{/each}
		</ul>
	{:else}
		<p class="text-center text-gray-400">Aucun client connecté</p>
	{/if}
</section>
