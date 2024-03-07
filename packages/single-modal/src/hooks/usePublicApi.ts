import { Methods, Model } from '../core';

function isOpen(): boolean {
	return Model._subscriber.get().isOpen;
}

export function usePublicApi() {
	const { open, close, schedule } = Methods;

	return {
		isAnyOpen: isOpen,
		open,
		close,
		schedule,
	};
}
