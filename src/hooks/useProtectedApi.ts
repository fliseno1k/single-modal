import { useStore } from '@nanostores/react';
import { useContext } from 'react';
import { Methods, Model } from '../core';
import { SingleModalContext } from '../context';
import { invariant, SmError } from '../utils';

export function useProtectedApi() {
	const { push, replace, back } = Methods;

	const value = useContext(SingleModalContext);
	const { closable, canNavigateBack } = useStore(Model._subscriber);

	invariant(value, SmError.USE_PROTECTED_API_OUTSIDE_CONTEXT);

	return {
		closable,
		push,
		replace,
		back: canNavigateBack ? back : undefined,
	};
}
