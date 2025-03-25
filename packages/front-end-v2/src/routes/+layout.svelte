<script lang="ts">
	import "../app.css";
	import { page } from "$app/state";
	import { sendMessage } from "$stores/wsStores.svelte";
	import { STATE_COMMANDS } from "@dartsScorer/shared-ws";
	import { randomUuid } from "@dartsScorer/crypto";
	let { children } = $props();

	$effect(() => {
		sendMessage({
			command: STATE_COMMANDS.screenUpdate,
			data: page.url.toString(),
			id: randomUuid()
		});
	});
</script>

{@render children()}
