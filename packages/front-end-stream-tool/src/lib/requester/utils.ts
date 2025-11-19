export const getApiBaseUrl = (): string => {
	const localIpUrl = `http://${window.location.hostname}:3000/api`;
	const apiBaseUrl = localIpUrl || "http://localhost:3000/api";
	return apiBaseUrl;
};
