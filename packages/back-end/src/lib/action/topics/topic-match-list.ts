import { UPDATE_COMMANDS } from "@dartsScorer/shared-ws"
import { sendWsMessageById } from "../index.js"
import type { Match } from "@dartsScorer/models"
import { getAllMatchFileInformations } from "../../bd/match.js"

type MatchListUpdateSuscriber = {
	clientId: string
}

let matchListSubscribers: MatchListUpdateSuscriber[] = []

export const matchListTopic = {
	subscribe: async (wsId: string) => {
		matchListSubscribers.push({ clientId: wsId })
		const all = await getAllMatchFileInformations()
		sendWsMessageById(wsId, {
			id: crypto.randomUUID(),
			command: UPDATE_COMMANDS.matchListUpdate,
			data: all,
		})
	},

	unsubscribe: (clientId: string) => {
		matchListSubscribers = matchListSubscribers.filter(
			(sub) => sub.clientId !== clientId,
		)
	},
	update: (matchInformations: { match: Match; fileInformation: unknown }[]) => {
		for (const sub of matchListSubscribers) {
			sendWsMessageById(sub.clientId, {
				id: crypto.randomUUID(),
				command: UPDATE_COMMANDS.matchListUpdate,
				data: matchInformations,
			})
		}
	},
}
