import { env } from "$env/dynamic/public";

export const getApiBaseUrl = (): string => {
	const apiBaseUrl = env.PUBLIC_API_BASE_URL || "http://localhost:3000/api";
	return apiBaseUrl;
};
