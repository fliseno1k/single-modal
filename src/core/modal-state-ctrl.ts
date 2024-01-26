import { atom, action, map, computed } from 'nanostores';
import type { MapStore } from 'nanostores';
import type { SingleModalOptions, SingleModalView } from '..';
import { ComponentType } from 'react';

const enum ModalControllerActions {
	OPEN = 'OPEN',
	CLOSE = 'CLOSE',
	STORE_ENTRY_OPTIONS = 'STORE_ENTRY_OPTIONS',
	OUTPUT_VIEW = 'OUTPUT_VIEW',
	DISABLE_VIEW_CLOSING = 'DISABLE_VIEW_CLOSING',
	ENABLE_VIEW_CLOSING = 'ENABLE_VIEW_CLOSING',
	CLEAR_OUTPUT = 'CLEAR_OUTPUT',
}

const $open = atom(false);
const $closable = atom(true);
const $options = map<SingleModalOptions>({} as SingleModalOptions);
const $views = computed<Map<string, SingleModalView<unknown>>, MapStore<SingleModalOptions>>($options, (value) => {
	if (!value?.views.length) {
		return new Map();
	}

	return new Map(value.views.map((view) => [view.key, view]));
});
const $output = atom<ComponentType[]>([]);

const getView = (key: string) => $views.get().get(key);

const setClosable = (value: boolean) => $closable.set(value);

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

const clearOutput = action($output, ModalControllerActions.CLEAR_OUTPUT, ($store) => {
	$store.set([]);
	return true;
});

export const ModalStateController = {
	$open,
	$output,
	$closable,
	$options,
	getView,
	setClosable,
	open,
	close,
	outputView,
	clearOutput,
	storeOptions,
};
