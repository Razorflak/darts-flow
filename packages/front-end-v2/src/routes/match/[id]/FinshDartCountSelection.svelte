<script lang="ts">
	export let onFinishDartsCountSelected: (dartsCount: number) => void;
	export let onCancelFinishDartsSelection: () => void;
</script>

<div class="absolute bottom-0 z-50 w-full bg-white text-black">
	<div class="flex flex-col items-center">
		<span style="font-size: 4em">Nombre de fléchettes</span>

		{#each Array(3)
			.fill(0)
			.map((_, i) => i + 1) as digit}
			<button
				type="button"
				class="m-4 w-3/4 flex-1 rounded-md bg-blue-400 text-center text-2xl text-white"
				style="font-size: 7em"
				onpointerdown={() => onFinishDartsCountSelected(digit)}
			>
				{digit}
			</button>
		{/each}
		<button
			type="button"
			class="m-4 w-3/4 flex-1 rounded-md bg-red-500 text-center text-2xl text-white"
			style="font-size: 7em"
			onpointerdown={() => onCancelFinishDartsSelection()}
		>
			Annuler
		</button>
	</div>
</div>
