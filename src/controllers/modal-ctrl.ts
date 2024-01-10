import { atom, action } from 'nanostores';
import { genActionSubscriber } from '../utils/gen-action-subscriber';
import type { SingleModalView } from '..';

export const enum ModalControllerActions {
	OPEN = 'OPEN',
	CLOSE = 'CLOSE',
}

const $open = atom(false);

const open = action($open, ModalControllerActions.OPEN, ($store, view: SingleModalView['key']) => {
	$store.set(true);
});

const close = action($open, ModalControllerActions.CLOSE, ($store, options: { force?: boolean }) => {
	$store.set(false);
});

const actionsMap = {
	[ModalControllerActions.OPEN]: open,
	[ModalControllerActions.CLOSE]: close,
};

const on = genActionSubscriber($open, actionsMap);

export const ModalController = {
	$open,
	on,
	open,
	close,
};
