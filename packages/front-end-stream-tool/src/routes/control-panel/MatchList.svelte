<script lang="ts">
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

<section class="p-6">
	<div class="mb-5 flex items-center justify-between gap-4">
		<div>
			<h2 class="text-xl font-bold">Matchs en attente</h2>
			<p class="mt-1 text-sm text-slate-400">Envoyez un match vers l’écran sélectionné.</p>
		</div>
		<span class="rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300">
			{matchInformations.length}
		</span>
	</div>
	{#if matchInformations.length > 0}
		{#if !client}
			<p
				class="mb-4 rounded-lg border border-amber-800 bg-amber-950/60 px-4 py-3 text-sm text-amber-200"
			>
				Sélectionnez d’abord un écran de diffusion.
			</p>
		{/if}
		<ul class="space-y-3">
			{#each matchInformations as matchInformation}
				<li
					class="grid gap-4 rounded-xl border border-slate-800 bg-slate-950/60 p-4 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-center"
				>
					<strong class="min-w-0 text-slate-100">
						{getTeamDisplayName(matchInformation.match.teams[0])} / {getTeamDisplayName(
							matchInformation.match.teams[1]
						)}
					</strong>
					<div class="grid gap-2 sm:grid-cols-2">
						<button
							type="button"
							class="cursor-pointer rounded-lg bg-sky-700 px-4 py-2.5 font-bold text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-40"
							onclick={() => setNextMatch(matchInformation.match)}
							disabled={!client}
						>
							Diffuser
						</button>
						<button
							type="button"
							class="cursor-pointer rounded-lg border border-red-900 bg-red-950/60 px-4 py-2.5 font-bold text-red-200 transition hover:bg-red-900"
							onclick={() => deleteMatch(matchInformation.match)}
						>
							Supprimer
						</button>
					</div>
				</li>
			{/each}
		</ul>
	{:else}
		<p
			class="rounded-xl border border-dashed border-slate-700 px-4 py-8 text-center text-slate-500"
		>
			Aucun match en attente
		</p>
	{/if}
</section>
