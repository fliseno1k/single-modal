import { useStore } from '@nanostores/react';
import { useSmCtx } from '../context';
import { Methods, Model } from '../core';
import { invariant, SmError } from '../utils';

export function useProtectedApi() {
	invariant(useSmCtx(), SmError.USE_PROTECTED_API_OUTSIDE_CONTEXT);

	const { push, replace, back } = Methods;
	const { canNavigateBack } = useStore(Model._subscriber);

	return {
		push,
		replace,
		back: canNavigateBack ? back : undefined,
	};
}
