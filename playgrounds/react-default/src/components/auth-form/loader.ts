import type { ComponentLoader } from "single-modal";
import type { AuthFormProps } from "./ui";

export const AuthFormLoader: ComponentLoader<AuthFormProps> = () =>
	new Promise((resolve) => setTimeout(() => resolve(import("./ui")), 500));
