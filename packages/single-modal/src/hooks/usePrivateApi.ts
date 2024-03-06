import { useStore } from '@nanostores/react';
import { Model } from '../core';
import type { SingleModalPrivateAPI } from '../types';
import { SmError } from '../utils';
import { useInvariant } from './useInvariant';

export function usePrivateApi(): SingleModalPrivateAPI {
	useInvariant(SmError.USE_PROTECTED_API_OUTSIDE_CONTEXT);

	const { modal } = useStore(Model._statics);
	const { isOpen, output, loading, canNavigateBack } = useStore(Model._subscriber);

	return { isOpen, loading, canNavigateBack, view: output.slice(-1)?.[0], Inserted: modal };
}
