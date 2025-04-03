import { page } from "$app/state";
import { getApiBaseUrl } from "$lib/requester/utils";
import { createWebSocket } from "$lib/ws";
import { randomUuid } from "@dartsScorer/crypto";
import { STATE_COMMANDS, type WsMessage } from "@dartsScorer/shared-ws";
import { writable } from "svelte/store";

export const wsMessage = writable<WsMessage | null>(null);
export const onWsConnect = writable<number>(0);

let webSocket: ReturnType<typeof createWebSocket> | null = $state(null);

export const getWebSocket = () => webSocket;

export function initWebSocket() {
	const apiUrl = getApiBaseUrl();
	const url = `${apiUrl}/ws`;

	const onMessage = (event: MessageEvent) => {
		const data: WsMessage = JSON.parse(event.data);
		wsMessage.set(data); // Diffuse le message dans le store
	};

	const onOpen = () => {
		onWsConnect.update((n) => n + 1);
		sendCurrentScreen();
	};

	webSocket = createWebSocket({ url: url, onMessage, onOpen });
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

export function sendCurrentScreen() {
	const message: WsMessage = {
		command: STATE_COMMANDS.screenUpdate,
		data: page.url.toString(),
		id: randomUuid()
	};
	sendMessage(message);
}
