<script lang="ts">
	import { getApiBaseUrl } from "$lib/requester/utils";
	import { sendMessage } from "$stores/wsStores.svelte";
	import { randomUuid } from "@dartsScorer/crypto";
	import { getTeamDisplayName, type Match } from "@dartsScorer/models";
	import { ADMIN_COMMANDS, type Client, type WsMessage } from "@dartsScorer/shared-ws";
	import { onMount } from "svelte";
	let { client }: { client: Client | null } = $props();

	const url = `${getApiBaseUrl()}/match/matches`;
	let matches: Match[] = $state([]);

	onMount(async () => {
		getMatchesList();
	});

	async function getMatchesList() {
		matches = await fetch(url).then((response) => response.json() as Promise<Match[]>);
	}

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
		setTimeout(() => getMatchesList(), 200);
	}
</script>

<section class="mx-auto rounded-xl p-4 shadow-lg">
	<h2 class="mb-4 text-xl font-bold">Liste des match en attente</h2>
	{#if matches.length > 0}
		{#if !client}
			<p class="text-red-500">Aucun client sélectionné</p>
		{/if}
		<ul class="space-y-2">
			{#each matches as match}
				<li class="flex flex-row">
					<span class="w-1/2">
						{getTeamDisplayName(match.teams[0])} / {getTeamDisplayName(match.teams[1])}
					</span>
					<button
						class="flex cursor-pointer items-center justify-between rounded-lg bg-blue-200 p-3 shadow-sm disabled:opacity-50"
						onclick={() => setNextMatch(match)}
						disabled={!client}
					>
						Match suivant
					</button>
					<button
						class="mx-10 flex cursor-pointer items-center justify-between rounded-lg bg-red-500 p-3 shadow-sm disabled:opacity-50"
						onclick={() => deleteMatch(match)}
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
