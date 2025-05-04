import { randomUuid } from "@dartsFlow/crypto";
import type { WsMessage } from "@dartsFlow/shared-ws";

type WebSocketOptions = {
	url: string;
	reconnectInterval?: number;
	maxReconnectAttempts?: number;
	onMessage?: (event: MessageEvent, send: (data: string) => void) => void;
	onOpen?: (event: Event, send: (data: string) => void) => void;
	onClose?: (event: CloseEvent) => void;
	onError?: (event: Event) => void;
};

export function createWebSocket({
	url,
	reconnectInterval = 5000,
	maxReconnectAttempts = Number.POSITIVE_INFINITY,
	onMessage,
	onOpen,
	onClose,
	onError
}: WebSocketOptions) {
	let ws: WebSocket | null = null;
	let reconnectAttempts = 0;
	let isClosing = false;

	const send = (data: string) => {
		if (ws && ws.readyState === WebSocket.OPEN) {
			ws.send(data);
		} else {
			console.warn("WebSocket is not open. Message not sent.");
		}
	};

	function connect() {
		if (reconnectAttempts >= maxReconnectAttempts) {
			console.log("Max reconnect attempts reached. Giving up.");
			return;
		}

		console.log(`Connecting to ${url}...`);
		ws = new WebSocket(url);
		isClosing = false;

		ws.onopen = (event) => {
			console.log("Connected to WebSocket");
			reconnectAttempts = 0;
			onOpen?.(event, send);
		};

		ws.onmessage = (event) => {
			const message: WsMessage = JSON.parse(event.data);
			if (message.command === "ping") {
				const response: WsMessage = {
					command: "pong",
					id: randomUuid()
				};
				send(JSON.stringify(response));
				return;
			}
			onMessage?.(event, send);
		};

		ws.onerror = (event) => {
			console.error("WebSocket error:", event);
			onError?.(event);
		};

		ws.onclose = (event) => {
			if (isClosing) return; // Empêche la reconnexion si l'on ferme volontairement
			console.log("WebSocket closed. Reconnecting...");
			onClose?.(event);
			reconnectAttempts++;
			setTimeout(connect, reconnectInterval);
		};
	}

	connect();

	return {
		send: (data: WsMessage) => {
			send(JSON.stringify(data));
		},
		close: () => {
			if (ws) {
				isClosing = true;
				ws.close();
			}
		}
	};
}
