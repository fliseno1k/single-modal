import { useStore } from '@nanostores/react';
import { SingleModalOptions, SingleModalPublicAPI } from '../types';
import { Mediator, ModalStateController } from '../core';

export function usePublicApi<Views extends SingleModalOptions['views']>(): SingleModalPublicAPI<Views> {
	const isOpen = useStore(ModalStateController.$open);

	return {
		isOpen,
		open: Mediator.open,
		close: Mediator.close,
	};
}
