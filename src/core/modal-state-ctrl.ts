import { atom, action, map, computed } from 'nanostores';
import { genActionSubscriber } from '../utils/gen-action-subscriber';
import type { SingleModalOptions, SingleModalView } from '..';
import { ComponentType } from 'react';

export const enum ModalControllerActions {
	OPEN = 'OPEN',
	CLOSE = 'CLOSE',
	STORE_ENTRY_OPTIONS = 'STORE_ENTRY_OPTIONS',
	PUSH_RENDERABLE = 'PUSH_RENDERABLE',
}

const $open = atom(false);
const $entryOptions = map<SingleModalOptions>({} as SingleModalOptions);
const $mappedViews = computed<Map<SingleModalView<unknown>['key'], SingleModalView<unknown>>, typeof $entryOptions>(
	$entryOptions,
	(value) => {
		if (value?.views) {
			return new Map();
		}

		return new Map(value.views.map((view) => [view.key, view]));
	},
);
const $renderable = atom<ComponentType[]>([]);

const getView = <K extends SingleModalView<unknown>['key']>(key: K) => $mappedViews.get().get(key);

const getRenderable = () => [...$renderable.get()];

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

const pushRenderable = action($renderable, ModalControllerActions.PUSH_RENDERABLE, ($store, component) => {
	const current = $store.get();
	current.push(component);
	$store.set(current);
});

const actionsMap = {
	[ModalControllerActions.OPEN]: open,
	[ModalControllerActions.CLOSE]: close,
	[ModalControllerActions.STORE_ENTRY_OPTIONS]: storeEntryOptions,
};

const on = genActionSubscriber($open, actionsMap);

export const ModalStateController = {
	$open,
	$entryOptions,
	$mappedViews,
	on,
	getView,
	getRenderable,
	open,
	close,
	storeEntryOptions,
	pushRenderable,
};
