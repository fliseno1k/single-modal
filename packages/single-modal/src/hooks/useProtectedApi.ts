import { Methods } from '../core';
import { useContextInvariant } from './useContextInvariant';

export function useProtectedApi() {
	useContextInvariant("Invoking 'useProtectedApi' method outside of invocation context.");

	const { push, back, replace } = Methods;

	return {
		push,
		back,
		replace,
	};
}
