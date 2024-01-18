import { useStore } from '@nanostores/react';
import { SingleModalOptions, SingleModalPublicAPI } from '../types';
import { LoaderController, ModalStateController, RouterController } from '../core';

const open: SingleModalPublicAPI<[]>['open'] = (viewKey: string) => {
	const view = ModalStateController.getView(viewKey);

	if (!view) return false;

	ModalStateController.open();
	RouterController.replace(view);
	LoaderController.load(
		view,
		() => {},
		() => {},
	);

	return true;
};

const close: SingleModalPublicAPI<[]>['close'] = (options) => {
	const { force } = options;

	if (force) {
		return true;
	}

	ModalStateController.close();
	RouterController.reset();

	return true;
};

export function usePublicApi<Views extends SingleModalOptions['views']>(): SingleModalPublicAPI<Views> {
	const isOpen = useStore(ModalStateController.$open);

	return {
		isOpen,
		open,
		close,
	};
}
