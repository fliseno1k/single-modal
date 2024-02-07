import type { SingleModalView } from '../../../../../src/types';

type OneTimeCodeProps = unknown;

export const OneTimeCodeContract = {
	key: 'one-time-code' as const,
	loader: () => import('./ui'),
	contract: (props) => void 0,
} satisfies SingleModalView<OneTimeCodeProps>;
