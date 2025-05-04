<script lang="ts">
	import { getWebSocket, onWsConnect, wsMessage } from "$stores/wsStores.svelte";
	import { randomUuid } from "@dartsFlow/crypto";
	import { SUB_COMMANDS, UPDATE_COMMANDS, type Client } from "@dartsFlow/shared-ws";
	import { onDestroy, onMount } from "svelte";
	import type { Unsubscriber } from "svelte/store";

	let unsubscriberWsMessage: Unsubscriber | null = null;
	let unsubscriberWsOnConnect: Unsubscriber | null = null;
	let clients: Client[] = $state([]);
	let { selectedClient = $bindable<Client | null>() } = $props();

	const subTopics = () => {
		getWebSocket()?.send({
			command: SUB_COMMANDS.subConnectedClient,
			id: randomUuid(),
			data: null
		});
	};

	onMount(() => {
		subTopics();
	});
	unsubscriberWsMessage = wsMessage.subscribe((message) => {
		if (message?.command === UPDATE_COMMANDS.connectedClientListUpdated) {
			clients = message.data;
			if (message.data.length === 1) {
				selectedClient = message.data[0];
			}
		}
	});
	unsubscriberWsOnConnect = onWsConnect.subscribe(() => {
		subTopics();
	});

	onDestroy(() => {
		unsubscriberWsMessage();
		unsubscriberWsOnConnect();
	});

	const selectClient = (client: Client) => {
		selectedClient = client;
	};
</script>

<section class="mx-auto rounded-xl p-4">
	<h2 class="mb-4 text-xl font-bold">Clients connectés</h2>
	{#if clients.length > 0}
		<ul class="space-y-2">
			{#each clients as client}
				<button
					class="flex cursor-pointer items-center justify-between rounded-lg p-3 shadow-sm"
					class:selected={selectedClient?.id === client.id}
					onpointerdown={() => selectClient(client)}
				>
					<span class="font-medium">{client.ip}</span>
					<span class="ml-10 text-sm text-gray-400">{client.id}</span>
					<span class="text-sm text-gray-400">{client.screen}</span>
				</button>
			{/each}
		</ul>
	{:else}
		<p class="text-center text-gray-400">Aucun client connecté</p>
	{/if}
</section>

<style>
	.selected {
		border: 2px solid #4f46e5;
	}
</style>
