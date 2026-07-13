<script lang="ts">
	import { getApiBaseUrlFront } from "$lib/requester/utils";
	import { createMatch, createTeam } from "@dartsFlow/match-utils";

	type Competition = { name: string; isDouble: boolean };
	const competitions: Competition[] = [
		{ name: "Simple Masculins", isDouble: false },
		{ name: "Simple Paradarts", isDouble: false },
		{ name: "Simple Féminines", isDouble: false },
		{ name: "Simple Juniors", isDouble: false },
		{ name: "Simple Vétérans", isDouble: false },
		{ name: "Doubles ", isDouble: true },
		{ name: "Doubles Féminins", isDouble: true }
	];
	const stages = [
		"Phase de poule",
		"256e de finale",
		"128e de finale",
		"64e de finale",
		"32e de finale",
		"16e de finale",
		"8e de finale",
		"1/4 de finale",
		"1/2 de finale",
		"Finale"
	];

	let competition: Competition | null = $state(null);
	let stage = $state("");
	let numSets = $state(1);
	let numLegs = $state(1);
	let init1001 = $state(false);
	let isCountUp = $state(false);
	let isSubmitting = $state(false);
	let feedback: { type: "success" | "error"; message: string } | null = $state(null);

	let team1 = $state([{ firstName: "", name: "" }]);
	let team2 = $state([{ firstName: "", name: "" }]);
	$effect(() => {
		[team1, team2].forEach((t) => {
			if (t.length === 1 && competition?.isDouble) {
				t.push({ firstName: "", name: "" });
			}

			if (t.length === 2 && !competition?.isDouble) {
				t.pop();
			}
		});

		if (isCountUp) {
			init1001 = false;
		}
	});

	function resetFeilds() {
		competition = null;
		stage = "";
		numSets = 1;
		numLegs = 1;
		init1001 = false;
		isCountUp = false;
		team1 = [{ firstName: "", name: "" }];
		team2 = [{ firstName: "", name: "" }];
	}

	async function onsubmit(event: SubmitEvent) {
		event.preventDefault();
		feedback = null;

		if (!competition) {
			feedback = { type: "error", message: "Sélectionnez une compétition." };
			return;
		}

		isSubmitting = true;

		try {
			const isDouble = competition.isDouble;
			const initialScore = isCountUp ? 0 : init1001 ? 1001 : 501;
			const t1 = createTeam(isDouble ? team1 : [team1[0]], initialScore, true);
			const t2 = createTeam(isDouble ? team2 : [team2[0]], initialScore, false);
			const match = createMatch(t1, t2, numLegs, competition.name, stage, undefined, isCountUp);

			const response = await fetch(`${getApiBaseUrlFront()}/match`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(match)
			});

			if (!response.ok) {
				throw new Error(await response.text());
			}

			resetFeilds();
			feedback = { type: "success", message: "Le match a été créé." };
		} catch (error) {
			console.error("Erreur lors de la création du match", error);
			feedback = { type: "error", message: "Impossible de créer le match." };
		} finally {
			isSubmitting = false;
		}
	}
</script>

<form {onsubmit} class="space-y-6 p-6">
	<header>
		<h2 class="text-xl font-bold">Créer un match</h2>
		<p class="mt-1 text-sm text-slate-400">Renseignez les joueurs et le format de la partie.</p>
	</header>

	<div class="grid gap-4 sm:grid-cols-2">
		<label class="space-y-2 text-sm font-medium text-slate-300">
			Compétition
			<select
				bind:value={competition}
				class="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 focus:outline-none"
			>
				<option value={null} disabled>Sélectionner…</option>
				{#each competitions as comp}
					<option value={comp}>{comp.name}</option>
				{/each}
			</select>
		</label>

		<label class="space-y-2 text-sm font-medium text-slate-300">
			Phase
			<select
				bind:value={stage}
				class="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 focus:outline-none"
				required
			>
				<option value="" disabled>Sélectionner…</option>
				{#each stages as s}
					<option value={s}>{s}</option>
				{/each}
			</select>
		</label>

		<label class="space-y-2 text-sm font-medium text-slate-300">
			Sets gagnants
			<input
				type="number"
				bind:value={numSets}
				min="1"
				class="w-full rounded-lg border border-slate-800 bg-slate-800 px-3 py-2.5 text-slate-500"
				disabled
			/>
		</label>

		<label class="space-y-2 text-sm font-medium text-slate-300">
			Manches gagnantes
			<input
				type="number"
				bind:value={numLegs}
				min="1"
				class="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 focus:outline-none"
				required
			/>
		</label>
	</div>

	<div class="flex flex-wrap gap-3">
		<label
			class="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm"
		>
			<input type="checkbox" bind:checked={isCountUp} class="size-4 accent-emerald-500" />
			Mode CountUp
		</label>

		<label
			class="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm has-disabled:cursor-not-allowed has-disabled:opacity-40"
		>
			<input
				type="checkbox"
				bind:checked={init1001}
				disabled={isCountUp}
				class="size-4 accent-emerald-500"
			/>
			Départ à 1001
		</label>
	</div>

	<div class="grid gap-4 sm:grid-cols-2">
		<section class="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
			<h3 class="mb-3 font-bold text-emerald-400">Équipe 1</h3>
			{#each team1 as player}
				<div class="grid gap-2">
					<input
						type="text"
						bind:value={player.firstName}
						placeholder="Prénom"
						class="min-w-0 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-white placeholder:text-slate-600 focus:border-emerald-500 focus:outline-none"
						required
					/>
					<input
						type="text"
						bind:value={player.name}
						placeholder="Nom"
						class="min-w-0 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-white placeholder:text-slate-600 focus:border-emerald-500 focus:outline-none"
						required
					/>
				</div>
			{/each}
		</section>

		<section class="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
			<h3 class="mb-3 font-bold text-sky-400">Équipe 2</h3>
			{#each team2 as player}
				<div class="grid gap-2">
					<input
						type="text"
						bind:value={player.firstName}
						placeholder="Prénom"
						class="min-w-0 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-white placeholder:text-slate-600 focus:border-emerald-500 focus:outline-none"
						required
					/>
					<input
						type="text"
						bind:value={player.name}
						placeholder="Nom"
						class="min-w-0 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-white placeholder:text-slate-600 focus:border-emerald-500 focus:outline-none"
						required
					/>
				</div>
			{/each}
		</section>
	</div>

	{#if feedback}
		<p
			class="rounded-lg border px-4 py-3 text-sm {feedback.type === 'success'
				? 'border-emerald-800 bg-emerald-950/60 text-emerald-200'
				: 'border-red-800 bg-red-950/60 text-red-200'}"
			role="status"
		>
			{feedback.message}
		</p>
	{/if}

	<div class="grid gap-3 sm:grid-cols-2">
		<button
			type="submit"
			class="rounded-lg bg-emerald-600 px-4 py-3 font-bold text-white transition hover:bg-emerald-500 disabled:cursor-wait disabled:opacity-50"
			disabled={isSubmitting}
		>
			{isSubmitting ? "Création…" : "Créer le match"}
		</button>
		<button
			onclick={() => {
				resetFeilds();
				feedback = null;
			}}
			class="rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 font-bold text-slate-200 transition hover:bg-slate-700"
			type="button">Réinitialiser</button
		>
	</div>
</form>
