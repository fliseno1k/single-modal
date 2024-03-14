import { useStore } from '@nanostores/react';
import { Methods, Model } from '../core';
import { useContextInvariant } from './useContextInvariant';

export function useProtectedApi() {
	useContextInvariant("Invoking 'useProtectedApi' method outside of invocation context.");

	const { push, replace, back } = Methods;
	const { canNavigateBack } = useStore(Model._subscriber);

	return {
		push,
		replace,
		back: canNavigateBack ? back : undefined,
	};
}
