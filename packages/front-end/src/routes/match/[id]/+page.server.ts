import { getApiBaseUrl } from "$lib/requester/utils";
import type { Match } from "@dartsFlow/models";
import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params }) => {
	const matchId = params.id; // L'ID est extrait de l'URL
	const match: Match = await fetch(`${getApiBaseUrl()}/match/${matchId}`).then((res) => {
		if (res.status !== 200) {
			throw redirect(301, "/waiting");
		}
		return res.json();
	});

	return match;
};
