export const getApiBaseUrl = (): string => {
	const apiBaseUrl =
		import.meta.env.VITE_API_URL || "http://localhost:3000/api";
	return apiBaseUrl;
};

export const getFrontBaseUrl = (): string => {
	const apiBaseUrl =
		import.meta.env.VITE_FRONT_URL || "http://172.25.171.152:5173";
	return apiBaseUrl;
};
