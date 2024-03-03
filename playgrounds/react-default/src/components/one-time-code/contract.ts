import { type SingleModalView } from "single-modal";

type OneTimeCodeProps = unknown;

export const OneTimeCodeViewContract = {
	key: "one-time-code" as const,
	loader: () =>
		new Promise((resolve) => setTimeout(() => resolve(import("./ui")), 500)),
	contract: (props) => void 0,
} satisfies SingleModalView<OneTimeCodeProps>;
