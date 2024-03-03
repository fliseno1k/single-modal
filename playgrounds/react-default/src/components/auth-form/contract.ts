import { type SingleModalView } from "single-modal";

type AuthFormProps = {
	session: string;
};

export const AuthFormViewContract = {
	key: "auth-form" as const,
	loader: () =>
		new Promise((resolve) => setTimeout(() => resolve(import("./ui")), 500)),
	contract: (props) => {},
} satisfies SingleModalView<AuthFormProps>;
