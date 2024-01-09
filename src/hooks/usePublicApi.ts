import { ModalController } from '../controllers';

export function usePublicApi() {
	return {
		open: ModalController.open,
		close: ModalController.close,
	};
}
