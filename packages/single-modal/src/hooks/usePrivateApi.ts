import { useStore } from '@nanostores/react';
import { Model } from '../core';
import type { SingleModalPrivateAPI } from '../types';

export function usePrivateApi(): SingleModalPrivateAPI {
	const { renderer } = useStore(Model._statics);
	const { isOpen, output, loading } = useStore(Model._subscriber);

	return { isOpen, loading, view: output.slice(-1)?.[0], Inserted: renderer };
}
