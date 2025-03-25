<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import { wsMessage } from "$stores/wsStores.svelte";
	import { ADMIN_COMMANDS } from "@dartsScorer/shared-ws";
	import { getTeamDisplayName } from "@dartsScorer/models";
	import { goto } from "$app/navigation";
	import type { Unsubscriber } from "svelte/store";

	let waiting = $state(true);
	let player1 = $state("XXXXXXXXX");
	let player2 = $state("XXXXXXXXX");
	let goDisabled = $state(true);
	let matchId: string | null = $state(null);

	let unsubscribe: Unsubscriber | null;

	onMount(() => {
		unsubscribe = wsMessage.subscribe((message) => {
			if (message?.command === ADMIN_COMMANDS.setNextMatch) {
				const match = message.data;
				player1 = getTeamDisplayName(match.teams[0]);
				player2 = getTeamDisplayName(match.teams[1]);
				waiting = false;
				goDisabled = false;
				matchId = match.id;
			}
		});
	});

	onDestroy(() => {
		if (unsubscribe) {
			unsubscribe();
		}
	});

	function goToMatch() {
		const matchURL = `/scorer-client.html?id=${matchId}`;
		goto(matchURL);
	}
</script>

<main class="flex min-h-screen items-center justify-center bg-gray-100">
	{#if waiting}
		<section class="space-y-4 text-center">
			<div class="text-lg font-medium text-gray-700">En attente du prochain match</div>
			<div class="spinner"></div>
		</section>
	{:else}
		<section class="text-center">
			<div class="text-lg font-medium text-gray-700">
				Prochain match : <span class="font-bold">{player1}</span> /
				<span class="font-bold">{player2}</span>
			</div>
			<button
				class="rounded-lg bg-blue-500 px-4 py-2 text-lg font-bold text-white hover:bg-blue-600"
				onclick={() => goToMatch()}
				disabled={goDisabled}
			>
				GO!
			</button>
		</section>
	{/if}
</main>

<style>
	.spinner {
		border: 4px solid rgba(0, 0, 0, 0.1);
		border-left-color: #3498db;
		border-radius: 50%;
		width: 40px;
		height: 40px;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
