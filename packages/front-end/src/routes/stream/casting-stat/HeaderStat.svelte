<script lang="ts">
	let { value, name }: { value: number; name: string } = $props();

	const rounded = $derived(Math.round(value * 100) / 100);
	const checkedValue = $derived(isNaN(rounded) ? 0 : rounded);
</script>

<div class="flex w-full border-collapse flex-col border px-4">
	<span class="ph-2 text-center text-lg">{name}</span>
	<span class="p-2 text-center text-2xl font-bold">{checkedValue.toString()}</span>
</div>
