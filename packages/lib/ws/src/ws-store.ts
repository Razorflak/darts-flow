import type { WebSocket } from "ws"

const wsStore: { ws: WebSocket; ip: string }[] = []

export const addWsToStore = (ws: WebSocket, ip: string) => {
	wsStore.push({ ws, ip })
}
