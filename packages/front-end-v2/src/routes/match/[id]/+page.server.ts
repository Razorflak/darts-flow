import { getApiBaseUrl } from "$lib/requester/utils";
import type { Match } from "@dartsScorer/models";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
	const matchId = params.id; // L'ID est extrait de l'URL
	console.log("JTA", params, matchId);

	// Simuler un chargement de données
	const match: Match = await fetch(`${getApiBaseUrl()}/match/${matchId}`).then((res) => res.json());

	return match;
};
