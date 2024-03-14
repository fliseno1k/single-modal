import type { ComponentLoader } from "single-modal";
import type { OneTimeCodeProps } from "./ui";

export const OneTimeCodeLoader: ComponentLoader<OneTimeCodeProps> = () =>
	new Promise((resolve) =>
		setTimeout(() => resolve(import("./ui").then((c) => c.default)), 500),
	);
