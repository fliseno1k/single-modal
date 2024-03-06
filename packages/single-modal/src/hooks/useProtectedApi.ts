import { useStore } from '@nanostores/react';
import { Methods, Model } from '../core';
import { SmError } from '../utils';
import { useInvariant } from './useInvariant';

export function useProtectedApi() {
	useInvariant(SmError.USE_PROTECTED_API_OUTSIDE_CONTEXT);

	const { push, replace, back } = Methods;
	const { canNavigateBack } = useStore(Model._subscriber);

	return {
		push,
		replace,
		back: canNavigateBack ? back : undefined,
	};
}
