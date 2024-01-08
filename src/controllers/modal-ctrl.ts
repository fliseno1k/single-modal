import { atom, action } from 'nanostores';
import { nameFactory } from '../utils/name-factory';

const name = nameFactory('modal-ctrl');

const $open = atom(false);

const open = action($open, name('open'), ($store) => {
	$store.set(true);
});

export const ModalController = {
	$open,
	open,
};
