import { useStore } from '@nanostores/react';
import { Model } from '../core';
import type { SingleModalPrivateAPI } from '../types';

export function usePrivateApi(): SingleModalPrivateAPI {
	const { modal } = useStore(Model._statics);
	const { isOpen, output, loading, canNavigateBack } = useStore(Model._subscriber);

	return { isOpen, loading, canNavigateBack, view: output.slice(-1)?.[0], Inserted: modal };
}
