<script lang="ts">
	import { goto } from "$app/navigation";
	import "../app.css";
	import { isAllowedOverlayRoute } from "$lib/overlayDisplayRoutes";
	import { sendCurrentScreen, wsMessage } from "$stores/wsStores.svelte";
	import { ADMIN_COMMANDS } from "@dartsFlow/shared-ws";
	import { onDestroy } from "svelte";

	let { children } = $props();
	const unsubscribeWsMessage = wsMessage.subscribe((message) => {
		if (message?.command === ADMIN_COMMANDS.navigateToPage && isAllowedOverlayRoute(message.data)) {
			if (typeof window === "undefined") return;

			const navigationEvent = new CustomEvent("overlay:navigate", {
				detail: { path: message.data },
				cancelable: true
			});

			if (window.dispatchEvent(navigationEvent)) {
				void goto(message.data);
			}
		}
	});

	$effect(() => {
		sendCurrentScreen();
	});

	onDestroy(unsubscribeWsMessage);
</script>

{@render children()}
