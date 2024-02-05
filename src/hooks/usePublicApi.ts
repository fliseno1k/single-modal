import { useStore } from '@nanostores/react';
import { Methods, Model } from '../core';

export function usePublicApi() {
	const { open, close } = Methods;
	const isOpen = useStore(Model._subscriber).open;

	return {
		isOpen,
		open,
		close,
	};
}
