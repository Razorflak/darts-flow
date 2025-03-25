<script lang="ts">
	import { getWebSocket, wsMessage } from "$stores/wsStores.svelte";
	import { randomUuid } from "@dartsScorer/crypto";
	import { SUB_COMMANDS, UPDATE_COMMANDS, type Client } from "@dartsScorer/shared-ws";
	import { onDestroy, onMount } from "svelte";
	import type { Unsubscriber } from "svelte/store";

	let unsubscriber: Unsubscriber | null;
	let clients: Client[] = $state([]);

	onMount(() => {
		getWebSocket()?.send({
			command: SUB_COMMANDS.subConnectedClient,
			id: randomUuid(),
			data: null
		});
		unsubscriber = wsMessage.subscribe((message) => {
			if (message?.command === UPDATE_COMMANDS.connectedClientListUpdated) {
				clients = message.data;
			}
		});
	});

	onDestroy(() => {
		if (unsubscriber) {
			unsubscriber();
		}
	});
</script>

<section class="mx-auto max-w-md rounded-xl bg-gray-900 p-4 text-white shadow-lg">
	<h2 class="mb-4 text-center text-xl font-bold">Clients connectés</h2>
	{#if clients.length > 0}
		<ul class="space-y-2">
			{#each clients as client}
				<li class="flex items-center justify-between rounded-lg bg-gray-800 p-3 shadow-sm">
					<span class="font-medium">{client.ip}</span>
					<span class="text-sm text-gray-400">{client.id}</span>
					<span class="text-sm text-gray-400">{client.screen}</span>
				</li>
			{/each}
		</ul>
	{:else}
		<p class="text-center text-gray-400">Aucun client connecté</p>
	{/if}
</section>
