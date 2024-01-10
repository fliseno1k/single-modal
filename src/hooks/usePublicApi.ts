import { useCallback } from 'react';
import { useStore } from '@nanostores/react';
import { ModalController } from '../controllers';

export function usePublicApi() {
	const isOpen = useStore(ModalController.$open);

	const open = useCallback((viewId: string): boolean => {
		/*
			const view = ContextController.getView(viewId);

			if (!view) {
				return false;
			}

			return ModalController.open(view);
		*/

		return true;
	}, []);

	return {
		isOpen,
		open,
		close: ModalController.close,
	};
}
