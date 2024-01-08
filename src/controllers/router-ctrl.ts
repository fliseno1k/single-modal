import { action, map, computed } from 'nanostores';
import { nameFactory } from '../utils/name-factory';

import type { SingleModalView } from '..';

const name = nameFactory('modal-ctrl');

const defaultState = {
	view: null,
	history: [],
};

const $state = map<{ view: SingleModalView | null; history: SingleModalView[] }>(defaultState);
const $canGoBack = computed($state, ({ history }) => history.length > 1);

const push = action($state, name('push'), ($store, view: SingleModalView) => {
	const history = $store.get().history;
	history.push(view);
	$store.set({ view, history });

	return true;
});

const reset = action($state, name('reset'), ($store) => {
	$store.set(defaultState);

	return true;
});

export const RouterController = {
	$state,
	$canGoBack,
	push,
	reset,
};
