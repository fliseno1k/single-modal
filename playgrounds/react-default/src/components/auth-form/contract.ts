export const AuthFormLoader = () =>
	new Promise((resolve) => setTimeout(() => resolve(import("./ui")), 500));
