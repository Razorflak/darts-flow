import { clientListTopic } from "./topic-connected-clients.js"
import { matchListTopic } from "./topic-match-list.js"
import { matchTopic } from "./topic-match.js"

export * from "./topic-match.js"
export * from "./topic-connected-clients.js"
export * from "./topic-match-list.js"

export const topics = [matchTopic, clientListTopic, matchListTopic]

export const removeClientFromAllTopics = (clientId: string) => {
	for (const topic of topics) {
		topic.unsubscribe(clientId)
	}
}
