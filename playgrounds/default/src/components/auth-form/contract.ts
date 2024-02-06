import type { SingleModalView } from '../../../../src/types';

type AuthFormProps = {
	session: string;
};

export const AuthFormViewContract = {
	key: 'auth-form' as const,
	// @ts-expect-error: idk
	loader: () => import('./index'),
	contract: (props) => void 0,
} satisfies SingleModalView<AuthFormProps>;
