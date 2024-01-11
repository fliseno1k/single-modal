import { useCallback } from 'react';
import { useStore } from '@nanostores/react';
import { ModalController } from '../controllers';
import { SingleModalOptions, SingleModalPublicAPI } from '../types';

export function usePublicApi<Views extends SingleModalOptions['views']>(): SingleModalPublicAPI<Views> {
	const isOpen = useStore(ModalController.$open);

	const open = useCallback<SingleModalPublicAPI<Views>['open']>((viewId) => {
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
