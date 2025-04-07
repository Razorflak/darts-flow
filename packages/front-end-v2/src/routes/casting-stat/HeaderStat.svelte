<script lang="ts">
	let { value, name }: { value: number; name: string } = $props();

	const rounded = Math.round(value * 100) / 100;
	const checkedValue = isNaN(rounded) ? 0 : rounded;
	console.log(rounded, checkedValue, checkedValue.toString());
</script>

<div class="flex w-full border-collapse flex-col border px-4">
	<span class="ph-2 text-center text-lg">{name}</span>
	<span class="p-2 text-center text-2xl font-bold">{checkedValue.toString()}</span>
</div>
