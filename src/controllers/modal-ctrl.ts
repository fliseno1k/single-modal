import { atom, action } from 'nanostores';
import { nameFactory } from '../utils/name-factory';

const name = nameFactory('modal-ctrl');

const model = () => {
	const $open = atom(false);

	const open = action($open, name('open'), ($store) => {
		$store.set(true);
	});

	return {
		$open,
		open,
	};
};

export const ModalController = model();
