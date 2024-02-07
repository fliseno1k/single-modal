import type { SingleModalView } from '../../../../../src/types';

type AuthFormProps = {
	session: string;
};

export const AuthFormViewContract = {
	key: 'auth-form' as const,
	loader: () => new Promise((resolve) => setTimeout(() => resolve(import('./ui')), 500)),
	contract: (props) => void 0,
} satisfies SingleModalView<AuthFormProps>;
