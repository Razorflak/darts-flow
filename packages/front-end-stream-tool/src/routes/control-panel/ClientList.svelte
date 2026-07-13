<script lang="ts">
	import { page } from "$app/state";
	import { getWebSocket, onWsConnect, wsMessage } from "$stores/wsStores.svelte";
	import { randomUuid } from "@dartsFlow/crypto";
	import { SUB_COMMANDS, UPDATE_COMMANDS, type Client } from "@dartsFlow/shared-ws";
	import { onDestroy, onMount } from "svelte";
	import type { Unsubscriber } from "svelte/store";

	let unsubscriberWsMessage: Unsubscriber | null = null;
	let unsubscriberWsOnConnect: Unsubscriber | null = null;
	let clients: Client[] = $state([]);
	let {
		selectedClient = $bindable<Client | null>(),
		excludeCurrentScreen = false,
		excludedPathPrefixes = []
	}: {
		selectedClient?: Client | null;
		excludeCurrentScreen?: boolean;
		excludedPathPrefixes?: string[];
	} = $props();

	const getScreenPath = (client: Client) => {
		try {
			return new URL(client.screen, page.url.origin).pathname;
		} catch {
			return client.screen;
		}
	};

	const isExcludedScreen = (client: Client) => {
		const screenPath = getScreenPath(client);

		return (
			(excludeCurrentScreen && screenPath === page.url.pathname) ||
			excludedPathPrefixes.some((prefix) => screenPath.startsWith(prefix))
		);
	};

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
			clients = message.data.filter((client) => !isExcludedScreen(client));
			if (selectedClient && !clients.some((client) => client.id === selectedClient?.id)) {
				selectedClient = null;
			} else if (!selectedClient && clients.length === 1) {
				selectedClient = clients[0];
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

<section class="p-4">
	<div class="mb-4 flex items-center justify-between gap-4">
		<div>
			<h2 class="text-xl font-bold">Écrans connectés</h2>
			<p class="mt-1 text-sm text-slate-400">Choisissez l’écran qui recevra le prochain match.</p>
		</div>
		<span class="rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300">
			{clients.length}
		</span>
	</div>
	{#if clients.length > 0}
		<ul class="space-y-3">
			{#each clients as client}
				<li>
					<button
						type="button"
						class="client-button grid w-full cursor-pointer gap-2 rounded-xl border border-slate-700 bg-slate-950/70 p-4 text-left transition hover:border-slate-500 hover:bg-slate-800 sm:grid-cols-[minmax(0,0.35fr)_minmax(0,1fr)]"
						class:selected={selectedClient?.id === client.id}
						onclick={() => selectClient(client)}
					>
						<span class="font-bold text-white">{client.ip}</span>
						<span class="truncate text-sm text-slate-300" title={client.screen}>
							{client.screen}
						</span>
						<span class="truncate font-mono text-xs text-slate-600 sm:col-span-2">
							{client.id}
						</span>
					</button>
				</li>
			{/each}
		</ul>
	{:else}
		<p
			class="rounded-xl border border-dashed border-slate-700 px-4 py-8 text-center text-slate-500"
		>
			Aucun écran connecté
		</p>
	{/if}
</section>

<style>
	.client-button.selected {
		border-color: #10b981;
		background: rgb(6 78 59 / 35%);
		box-shadow: 0 0 0 1px rgb(16 185 129 / 45%);
	}
</style>
