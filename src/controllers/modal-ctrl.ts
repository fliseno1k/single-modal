import { atom, action } from 'nanostores';
import type { SingleModalView } from '..';

const enum ModalControllerActions {
	OPEN,
	CLOSE,
}

const $open = atom(false);

const open = action($open, ModalControllerActions.OPEN.toString(), ($store, view: SingleModalView['key']) => {
	$store.set(true);
});

const close = action($open, ModalControllerActions.CLOSE.toString(), ($store, options: { force?: boolean }) => {
	$store.set(false);
});

export const ModalController = {
	$open,
	open,
	close,
};
