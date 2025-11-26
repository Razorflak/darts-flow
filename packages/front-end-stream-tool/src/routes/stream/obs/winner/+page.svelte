<script lang="ts">
	import { getApiBaseUrlFront } from "$lib/requester/utils";
	import { getTeamDisplayName, type Match, type Team } from "@dartsFlow/models";

	import { getMatchWinner } from "@dartsFlow/match-utils";
	import { onMount } from "svelte";

	let match: Match | null = $state(null);
	let winnerTeam: Team | null = null;

	onMount(async () => {
		const fetchedMatch: Match = await (
			await fetch(`${getApiBaseUrlFront()}/match-archive/`)
		).json();
		match = fetchedMatch;
		winnerTeam = getMatchWinner(fetchedMatch);
	});
</script>

{#if match && winnerTeam}
	<div class="fixed bottom-0 w-full px-48 pb-16">
		<div
			class=" bottom-0 flex h-[15vh] w-full flex-col items-center justify-center overflow-hidden border-t-4 border-white/10 bg-[rgb(0,0,145)] px-8 text-white shadow-[0_-5px_20px_rgba(0,0,0,0.5)]"
		>
			<div class="pb-6">VAINQUEUR·ES</div>
			<div class="flex w-35/100 place-content-between text-4xl">
				<span>👑</span><span>{getTeamDisplayName(winnerTeam)}</span><span>👑</span>
			</div>
			<div class="pt-6 text-2xl">COUPE DE FRANCE 2025</div>
		</div>
	</div>
{/if}
