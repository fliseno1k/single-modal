import { atom, action } from 'nanostores';
import { nameFactory } from '../utils/name-factory';

const name = nameFactory('modal-ctrl');

const model = () => {
	const $open = atom(false);

	const openEv = action($open, name('open'), ($store) => {
		$store.set(true);
	});

	return {
		$open,
		openEv,
	};
};

export const ModalController = model();
