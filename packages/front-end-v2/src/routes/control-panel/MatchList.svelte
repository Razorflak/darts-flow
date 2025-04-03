<script lang="ts">
	import { getWebSocket, onWsConnect, sendMessage, wsMessage } from "$stores/wsStores.svelte";
	import { randomUuid } from "@dartsScorer/crypto";
	import {
		getTeamDisplayName,
		matchStatus,
		type Match,
		type MatchInformation
	} from "@dartsScorer/models";
	import {
		ADMIN_COMMANDS,
		SUB_COMMANDS,
		UPDATE_COMMANDS,
		type Client,
		type WsMessage
	} from "@dartsScorer/shared-ws";
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

	function setNextMatch(match: Match) {
		if (!client) throw new Error("no client selected");
		const wsMessage: WsMessage = {
			id: randomUuid(),
			command: ADMIN_COMMANDS.setNextMatch,
			data: match,
			destinationId: client?.id
		};
		sendMessage(wsMessage);
	}

	function deleteMatch(match: Match) {
		const wsMessage: WsMessage = {
			id: randomUuid(),
			command: ADMIN_COMMANDS.deleteMatch,
			data: match.id,
			destinationId: ""
		};
		sendMessage(wsMessage);
	}
</script>

<section class="mx-auto rounded-xl p-4 shadow-lg">
	<h2 class="mb-4 text-xl font-bold">Liste des match en attente</h2>
	{#if matchInformations.length > 0}
		{#if !client}
			<p class="text-red-500">Aucun client sélectionné</p>
		{/if}
		<ul class="space-y-2">
			{#each matchInformations as matchInformation}
				<li class="flex flex-row">
					<span class="w-1/2">
						{getTeamDisplayName(matchInformation.match.teams[0])} / {getTeamDisplayName(
							matchInformation.match.teams[1]
						)}
					</span>
					<button
						class="flex cursor-pointer items-center justify-between rounded-lg bg-blue-200 p-3 shadow-sm disabled:opacity-50"
						onclick={() => setNextMatch(matchInformation.match)}
						disabled={!client}
					>
						Match suivant
					</button>
					<button
						class="mx-10 flex cursor-pointer items-center justify-between rounded-lg bg-red-500 p-3 shadow-sm disabled:opacity-50"
						onclick={() => deleteMatch(matchInformation.match)}
					>
						Supprimer le match
					</button>
				</li>
			{/each}
		</ul>
	{:else}
		<p class="text-center text-gray-400">Aucun client connecté</p>
	{/if}
</section>
