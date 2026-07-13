<script lang="ts">
	import { sendMessage } from "$stores/wsStores.svelte";
	import {
		blankOverlayRoute,
		overlayRoutes,
		playerPresentationRoutes
	} from "$lib/overlayDisplayRoutes";
	import { randomUuid } from "@dartsFlow/crypto";
	import { ADMIN_COMMANDS, type Client, type WsMessage } from "@dartsFlow/shared-ws";
	import ClientList from "../../control-panel/ClientList.svelte";

	let selectedClient: Client | null = $state(null);

	function displayOverlay(path: string) {
		if (!selectedClient) return;

		const message: WsMessage = {
			id: randomUuid(),
			command: ADMIN_COMMANDS.navigateToPage,
			data: path,
			destinationId: selectedClient.id
		};

		sendMessage(message);
	}
</script>

<svelte:head>
	<title>Contrôle des overlays</title>
</svelte:head>

<main class="mx-auto min-h-screen max-w-6xl space-y-8 bg-slate-950 px-6 py-10 text-white">
	<header>
		<p class="text-sm font-semibold tracking-[0.24em] text-emerald-400 uppercase">Darts Flow</p>
		<h1 class="mt-2 text-3xl font-bold">Contrôle des overlays</h1>
		<p class="mt-2 text-slate-400">
			Sélectionnez un écran connecté, puis choisissez la page à afficher en direct.
		</p>
	</header>

	<section class="rounded-2xl border border-slate-800 bg-slate-900 p-2 shadow-xl">
		<ClientList bind:selectedClient excludeCurrentScreen excludedPathPrefixes={["/match/"]} />
	</section>

	{#if selectedClient}
		<p class="rounded-lg border border-emerald-800 bg-emerald-950/60 px-4 py-3 text-emerald-200">
			Écran sélectionné : <strong>{selectedClient.screen}</strong>
		</p>
	{:else}
		<p class="rounded-lg border border-amber-800 bg-amber-950/60 px-4 py-3 text-amber-200">
			Sélectionnez un client pour activer les commandes.
		</p>
	{/if}

	<section>
		<button
			type="button"
			class="w-full rounded-xl bg-lime-600 px-5 py-5 text-center text-xl font-black tracking-widest shadow-lg transition hover:bg-lime-500 disabled:cursor-not-allowed disabled:opacity-40"
			disabled={!selectedClient}
			onclick={() => displayOverlay(blankOverlayRoute.path)}
		>
			{blankOverlayRoute.label}
		</button>
	</section>

	<section>
		<h2 class="mb-4 text-xl font-bold">Présentation des joueurs</h2>
		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{#each playerPresentationRoutes as route}
				<button
					type="button"
					class="rounded-xl bg-emerald-600 px-5 py-5 text-left font-bold shadow-lg transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-40"
					disabled={!selectedClient}
					onclick={() => displayOverlay(route.path)}
				>
					{route.label}
				</button>
			{/each}
		</div>
	</section>

	<section>
		<h2 class="mb-4 text-xl font-bold">Pages de diffusion</h2>
		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each overlayRoutes as route}
				<button
					type="button"
					class="rounded-xl bg-sky-700 px-5 py-5 text-left font-bold shadow-lg transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-40"
					disabled={!selectedClient}
					onclick={() => displayOverlay(route.path)}
				>
					{route.label}
				</button>
			{/each}
		</div>
	</section>
</main>
