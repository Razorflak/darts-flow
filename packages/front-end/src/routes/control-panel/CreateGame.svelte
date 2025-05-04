<script lang="ts">
	import { getApiBaseUrl } from "$lib/requester/utils";
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
	});

	function resetFeilds() {
		competition = null;
		stage = "";
		numSets = 1;
		numLegs = 1;
		init1001 = false;
		team1 = [{ firstName: "", name: "" }];
		team2 = [{ firstName: "", name: "" }];
	}

	async function onsubmit() {
		if (!competition) {
			throw new Error("Competition not selected");
		}
		const isDouble = competition?.isDouble;
		const t1 = createTeam(isDouble ? team1 : [team1[0]], init1001 ? 1001 : 501, true);
		const t2 = createTeam(isDouble ? team2 : [team2[0]], init1001 ? 1001 : 501, false);
		const match = createMatch(t1, t2, numLegs, competition.name, stage);

		const response = await fetch(`${getApiBaseUrl()}/match`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(match)
		});
		if (!response.ok) {
			const textError = await response.text();
			console.error("Erreur lors de la création du match", response.status, textError);
			return;
		}

		resetFeilds();
	}
</script>

<form {onsubmit} class="space-y-4 p-4">
	<label class="block">
		Compétition
		<select bind:value={competition} class="w-full rounded border p-2">
			{#each competitions as comp}
				<option value={comp}>{comp.name}</option>
			{/each}
		</select>
	</label>

	<label class="block">
		Stade de la compétition
		<select bind:value={stage} class="w-full rounded border p-2">
			{#each stages as s}
				<option> {s} </option>
			{/each}
		</select>
	</label>

	<label class="block">
		Nombre de sets gagnants
		<input type="number" bind:value={numSets} min="1" class="w-full rounded border p-2" disabled />
	</label>

	<label class="block">
		Nombre de manches gagnantes
		<input type="number" bind:value={numLegs} min="1" class="w-full rounded border p-2" />
	</label>

	<label class="block">
		<input type="checkbox" bind:checked={init1001} /> 1001 ?
	</label>

	<div>
		<h3 class="font-bold">Équipe 1</h3>
		{#each team1 as player}
			<div class="flex space-x-2">
				<input
					type="text"
					bind:value={player.firstName}
					placeholder="Prénom"
					class="rounded border p-2"
				/>
				<input type="text" bind:value={player.name} placeholder="Nom" class="rounded border p-2" />
			</div>
		{/each}
	</div>

	<div>
		<h3 class="font-bold">Équipe 2</h3>
		{#each team2 as player}
			<div class="flex space-x-2">
				<input
					type="text"
					bind:value={player.firstName}
					placeholder="Prénom"
					class="rounded border p-2"
				/>
				<input type="text" bind:value={player.name} placeholder="Nom" class="rounded border p-2" />
			</div>
		{/each}
	</div>

	<button type="submit" class="w-full rounded bg-green-500 p-2 text-white">Créer la partie</button>
	<button
		onclick={() => resetFeilds()}
		class="w-full rounded bg-red-500 p-2 text-white"
		type="button">Reset</button
	>
</form>
