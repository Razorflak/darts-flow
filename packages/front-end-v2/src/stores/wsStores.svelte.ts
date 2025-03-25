import { getApiBaseUrl } from "$lib/requester/utils";
import { createWebSocket } from "$lib/ws";
import type { WsMessage } from "@dartsScorer/shared-ws";
import { writable } from "svelte/store";

export const wsMessage = writable<WsMessage | null>(null);

let webSocket: ReturnType<typeof createWebSocket> | null = $state(null);

export const getWebSocket = () => webSocket;

export function initWebSocket() {
	const apiUrl = getApiBaseUrl();
	const url = `${apiUrl}/ws`;

	const onMessage = (event: MessageEvent) => {
		const data: WsMessage = JSON.parse(event.data);
		wsMessage.set(data); // Diffuse le message dans le store
	};

	webSocket = createWebSocket({ url: url, onMessage });
}

export function closeWebSocket() {
	if (webSocket) {
		webSocket.close();
		webSocket = null;
	}
}

export function sendMessage(message: WsMessage) {
	if (webSocket) {
		webSocket.send(message);
	} else {
		console.error("WebSocket non connecté, impossible d'envoyer le message.");
	}
}
