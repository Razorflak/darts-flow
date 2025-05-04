<script lang="ts">
	import "../app.css";
	import { sendCurrentScreen } from "$stores/wsStores.svelte";
	let { children } = $props();

	$effect(() => {
		sendCurrentScreen();
	});
</script>

{@render children()}
