import { useStore } from '@nanostores/react';
import { Model } from '../core';
import type { SingleModalPrivateAPI } from '../types';

export function usePrivateApi(): SingleModalPrivateAPI {
	const { modal } = useStore(Model.statics.$options);
	const { open, output, loading, canNavigateBack } = useStore(Model._subscriber);

	return { open, loading, canNavigateBack, views: output, Inserted: modal };
}
