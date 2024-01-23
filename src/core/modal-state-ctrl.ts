import { atom, action, map, computed } from 'nanostores';
import type { MapStore } from 'nanostores';
import { genActionSubscriber } from '../utils/gen-action-subscriber';
import type { SingleModalOptions, SingleModalView } from '..';
import { ComponentType } from 'react';

export const enum ModalControllerActions {
	OPEN = 'OPEN',
	CLOSE = 'CLOSE',
	STORE_ENTRY_OPTIONS = 'STORE_ENTRY_OPTIONS',
	OUTPUT_VIEW = 'OUTPUT_VIEW',
	DISABLE_VIEW_CLOSING = 'DISABLE_VIEW_CLOSING',
	ENABLE_VIEW_CLOSING = 'ENABLE_VIEW_CLOSING',
}

const $open = atom(false);
const $closable = atom(false);
const $options = map<SingleModalOptions>({} as SingleModalOptions);
const $views = computed<Map<string, SingleModalView<unknown>>, MapStore<SingleModalOptions>>($options, (value) => {
	if (value?.views) {
		return new Map();
	}

	return new Map(value.views.map((view) => [view.key, view]));
});
const $output = atom<ComponentType[]>([]);

const getView = (key: string) => $views.get().get(key);

const open = action($open, ModalControllerActions.OPEN, ($store) => {
	$store.set(true);
	return true;
});

const close = action($open, ModalControllerActions.CLOSE, ($store) => {
	$store.set(false);
	return true;
});

const storeOptions = action(
	$options,
	ModalControllerActions.STORE_ENTRY_OPTIONS,
	($store, options: SingleModalOptions) => {
		$store.set(options);
		return true;
	},
);

const outputView = action($output, ModalControllerActions.OUTPUT_VIEW, ($store, component) => {
	const current = $store.get();
	current.push(component);
	$store.set(current);
});

const actionsMap = {
	[ModalControllerActions.OPEN]: open,
	[ModalControllerActions.CLOSE]: close,
	[ModalControllerActions.STORE_ENTRY_OPTIONS]: storeOptions,
};

const on = genActionSubscriber($open, actionsMap);

export const ModalStateController = {
	$open,
	$output,
	$closable,
	on,
	getView,
	open,
	close,
	outputView,
	storeOptions,
};
