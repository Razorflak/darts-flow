export const getApiBaseUrlFront = (): string => {
	return `http://${window?.location?.hostname}:3000/api`;
};

export const getApiBaseUrlSSR = (): string => {
	return "http://localhost:3000/api";
};
