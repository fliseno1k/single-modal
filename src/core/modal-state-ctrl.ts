import { atom, action, map } from 'nanostores';
import { genActionSubscriber } from '../utils/gen-action-subscriber';
import type { SingleModalOptions } from '..';

export const enum ModalControllerActions {
	OPEN = 'OPEN',
	CLOSE = 'CLOSE',
	STORE_ENTRY_OPTIONS = 'STORE_ENTRY_OPTIONS',
}

const $open = atom(false);
const $entryOptions = map<SingleModalOptions>({} as SingleModalOptions);

const open = action($open, ModalControllerActions.OPEN, ($store) => {
	$store.set(true);
	return true;
});

const close = action($open, ModalControllerActions.CLOSE, ($store) => {
	$store.set(false);
	return true;
});

const storeEntryOptions = action(
	$entryOptions,
	ModalControllerActions.STORE_ENTRY_OPTIONS,
	($store, options: SingleModalOptions) => {
		$store.set(options);
		return true;
	},
);

const actionsMap = {
	[ModalControllerActions.OPEN]: open,
	[ModalControllerActions.CLOSE]: close,
	[ModalControllerActions.STORE_ENTRY_OPTIONS]: storeEntryOptions,
};

const on = genActionSubscriber($open, actionsMap);

export const ModalController = {
	$open,
	$entryOptions,
	on,
	open,
	close,
	storeEntryOptions,
};
