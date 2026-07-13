<script lang="ts">
	import type { Client } from "@dartsFlow/shared-ws";
	import ClientList from "./ClientList.svelte";
	import CreateGame from "./CreateGame.svelte";
	import MatchList from "./MatchList.svelte";

	let selectedClient: Client | null = $state(null);
</script>

<svelte:head>
	<title>Panneau de contrôle — Darts Flow</title>
</svelte:head>

<div class="min-h-screen bg-slate-950 text-white">
	<main class="mx-auto max-w-7xl space-y-8 px-6 py-10">
		<header class="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
			<div>
				<p class="text-sm font-semibold tracking-[0.24em] text-emerald-400 uppercase">Darts Flow</p>
				<h1 class="mt-2 text-3xl font-bold">Panneau de contrôle</h1>
				<p class="mt-2 text-slate-400">Créez les matchs et pilotez leur diffusion en direct.</p>
			</div>

			<a
				href="/stream/control-overlay-display"
				class="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 font-bold shadow-lg transition hover:bg-emerald-500 focus:ring-2 focus:ring-emerald-300 focus:outline-none"
			>
				Contrôler les overlays
			</a>
		</header>

		<div class="grid items-start gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
			<section class="rounded-2xl border border-slate-800 bg-slate-900 shadow-xl">
				<CreateGame />
			</section>

			<div class="space-y-8">
				<section class="rounded-2xl border border-slate-800 bg-slate-900 p-2 shadow-xl">
					<ClientList bind:selectedClient excludeCurrentScreen />
				</section>

				<section class="rounded-2xl border border-slate-800 bg-slate-900 shadow-xl">
					<MatchList client={selectedClient} />
				</section>
			</div>
		</div>
	</main>
</div>
