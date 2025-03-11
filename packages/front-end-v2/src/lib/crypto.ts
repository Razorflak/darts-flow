export const compatibilityUUID = () => {
	if (window?.crypto && typeof self.crypto.randomUUID === "function") {
		return;
	}
	//@ts-expect-error c'est chiant mais ça passe
	window.crypto.randomUUID = () => {
		const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) =>
			c === "x" ? ((Math.random() * 16) | 0).toString(16) : ((Math.random() * 4) | 8).toString(16)
		);
		return uuid;
	};
};
