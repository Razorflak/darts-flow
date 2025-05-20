import { getApiBaseUrl } from "$lib/requester/utils";
import type { Event } from "@dartsFlow/db";
import type { PageServerLoad } from "../event/$types";

export const load: PageServerLoad = async () => {
	const rq = await fetch(`${getApiBaseUrl()}/events`);
	const events: Event[] = (await rq.json()) as Event[];
	return { events };
};
