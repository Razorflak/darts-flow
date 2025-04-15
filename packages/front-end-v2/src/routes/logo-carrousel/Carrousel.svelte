<script lang="ts">
	let { row, reverse }: { row: string; reverse?: boolean } = $props();

	let images = $state(["tot"]);
	if (row === "row1") {
		const modules = import.meta.glob("/static/img/carousel/row1/*.{png,jpg,jpeg,webp}", {
			query: "?url",
			import: "default",
			eager: true
		});
		console.log("JTA", modules);
		images = Object.values(modules);
	} else if (row === "row2") {
		const modules = import.meta.glob("/static/img/carousel/row2/*.{png,jpg,jpeg,webp}", {
			query: "?url",
			import: "default",
			eager: true
		});
		images = Object.values(modules);
	}

	const speed = $derived(images.length * 8);
</script>

<div class="w-full overflow-hidden py-8">
	<div
		class="animate-scroll flex w-max whitespace-nowrap"
		style="animation-duration: {speed}s; animation-direction: {reverse ? 'normal' : 'reverse'}"
	>
		{#each images.concat(images) as image (image + "-" + Math.random())}
			<img src={image} alt="Sponsor" class="mx-12 h-32 shrink-0" />
		{/each}
	</div>
</div>

<style>
	@keyframes scroll {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-50%);
		}
	}

	.animate-scroll {
		animation-name: scroll;
		animation-timing-function: linear;
		animation-iteration-count: infinite;
	}
</style>
