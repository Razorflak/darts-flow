<script lang="ts">
	import type { Match } from "@dartsFlow/models";
	import Player from "./Player.svelte";
	import FinshDartCountSelection from "./FinshDartCountSelection.svelte";
	import {
		getActiveTeam,
		getCurrentLeg,
		inputScore as matchInputScore,
		undoLastScore
	} from "@dartsFlow/match-utils";
	import { getApiBaseUrl } from "$lib/requester/utils";
	import { goto } from "$app/navigation";

	let { data }: { data: Match } = $props();
	let inputScore: string = $state("");
	let showDartsCountSelection = $state(false);

	let match: Match = $state(data);
	let shouldDisplayAllowChangeStarter = $derived(getCurrentLeg(match).throws.length === 0);
	let isMatchOver = $derived(match.isOver);
	$effect(() => {
		if (isMatchOver) {
			setTimeout(() => {
				goto("/waiting");
			}, 3000);
		}
	});

	const sendMatchData = (match: Match) => {
		const params = JSON.stringify(match, null, 3);
		return fetch(`${getApiBaseUrl()}/match/${match.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: params
		});
	};

	const onMatchUpdate = (match: Match) => {
		sendMatchData(match);
	};

	function addDigit(digit: number): void {
		if (Number(inputScore + digit.toString()) > 180) {
			return;
		}
		inputScore += digit.toString();
	}

	function clearInput(): void {
		inputScore = "";
		showDartsCountSelection = false;
	}

	function undo(): void {
		if (match) match = undoLastScore(match);
		clearInput();
		onMatchUpdate(match);
	}

	const canChangeTeamStarter = (match: Match) => {
		return getCurrentLeg(match).throws.length === 0;
	};

	const onClickPlayer = () => {
		if (!match || !canChangeTeamStarter(match)) {
			return;
		}
		match.teams.forEach((element) => {
			element.isActive = !element.isActive;
		});

		const leg = getCurrentLeg(match);
		leg.startingTeamId = getActiveTeam(match).id;
		onMatchUpdate(match);
	};

	const validateScore = () => {
		if (!match) return;
		const activeTeam = getActiveTeam(match);
		const currentInputScore = +inputScore;
		if (activeTeam.currentScore - currentInputScore < 0) {
			return;
		}
		if (activeTeam.currentScore - currentInputScore === 0) {
			showDartsCountSelection = true;
			return;
		}
		matchInputScore(match, currentInputScore, 3);
		clearInput();
		onMatchUpdate(match);
	};

	const onFinishDartsCountSelected = (dartsCount: number) => {
		if (!match) return;
		const currentInputScore = +inputScore;
		matchInputScore(match, currentInputScore, dartsCount);
		clearInput();
		onMatchUpdate(match);
	};

	let history1: HTMLDivElement | undefined = $state();
	let history2: HTMLDivElement | undefined = $state();
	function syncScroll(e: Event): void {
		if (!history1 || !history2) return;
		const target = e.target as HTMLDivElement;
		if (target === history1) {
			history2.scrollTop = history1.scrollTop;
		} else {
			history1.scrollTop = history2.scrollTop;
		}
	}
</script>

<div class="flex h-dvh flex-col overflow-hidden bg-gray-900 p-4 text-white">
	<!-- Informations du match -->
	<div class="pb-4 text-center">
		<h1 class="text-3xl font-bold">{match.competition}</h1>
		<p class="text-xl">{match.competitionStage} - {match.legNeededToWin} manches gagnantes</p>
	</div>

	<!-- Zone de Score -->
	<div class="flex flex-grow overflow-hidden">
		<Player
			team={match.teams[0]}
			{match}
			bind:bindHistory={history1}
			onScroll={syncScroll}
			{onClickPlayer}
		/>
		<Player
			team={match.teams[1]}
			{match}
			bind:bindHistory={history2}
			onScroll={syncScroll}
			centerDirection="start"
			{onClickPlayer}
		/>
	</div>
	{#if shouldDisplayAllowChangeStarter}
		<div class="flex w-full flex-row justify-center">
			<p>Cliquer sur un joueur pour changer qui commence</p>
		</div>
	{/if}
	<!-- Zone de saisie et boutons -->
	<div class="flex flex-col items-center justify-end">
		<div class="flex w-full items-center justify-center gap-2 p-4">
			<input
				type="text"
				class="flex-1 rounded-md bg-gray-800 p-4 text-center text-2xl"
				bind:value={inputScore}
				readonly
			/>
			<button
				class="flex h-full w-1/3 items-center justify-center rounded-md bg-red-500 p-2 text-3xl text-white"
				onpointerdown={undo}>↶</button
			>
		</div>
		<div class="flex w-full flex-wrap justify-center gap-2 text-3xl font-bold">
			{#each Array(9)
				.fill(0)
				.map((_, i) => i + 1) as digit}
				<button class="w-19/60 rounded-md bg-gray-700 p-4" onclick={() => addDigit(digit)}
					>{digit}</button
				>
			{/each}
		</div>
		<div class="mt-2 flex w-full justify-center gap-2 text-3xl font-bold">
			<button class="w-19/60 rounded-md bg-red-600 p-4" onclick={clearInput}>C</button>
			<button class="w-19/60 rounded-md bg-gray-700 p-4" onclick={() => addDigit(0)}>0</button>
			<button onpointerdown={validateScore} class="w-19/60 rounded-md bg-green-600 p-4">V</button>
		</div>
	</div>
	{#if showDartsCountSelection}
		<FinshDartCountSelection
			{onFinishDartsCountSelected}
			onCancelFinishDartsSelection={clearInput}
		/>
	{/if}
</div>
