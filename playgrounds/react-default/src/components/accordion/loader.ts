import type { ComponentLoader } from "single-modal";
import type { AccordionProps } from "./ui";

export const AccordionLoader: ComponentLoader<AccordionProps> = () =>
	new Promise((resolve) =>
		setTimeout(() => resolve(import("./ui").then((c) => c.default)), 500),
	);
