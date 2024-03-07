export const OneTimeCodeLoader = () =>
	new Promise((resolve) => setTimeout(() => resolve(import("./ui")), 500));
