import { action, map, computed } from 'nanostores';
import type { SingleModalView } from '../types';

const enum RouterControllerActions {
	PUSH = 'PUSH',
	RESET = 'RESET',
	REPLACE = 'REPLACE',
	BACK = 'BACK',
}

const defaultState = {
	view: null,
	history: [],
};

const $state = map<{ view: SingleModalView | null; history: SingleModalView[] }>(defaultState);
const $canGoBack = computed($state, ({ history }) => history.length > 1);

const push = action($state, RouterControllerActions.PUSH, ($store, view: SingleModalView) => {
	const history = $store.get().history;
	history.push(view);
	$store.set({ view, history });

	return true;
});

const replace = action($state, RouterControllerActions.REPLACE, ($store, view: SingleModalView) => {
	$store.set({
		view,
		history: [view],
	});
});

const reset = action($state, RouterControllerActions.RESET, ($store) => {
	$store.set(defaultState);

	return true;
});

const back = action($state, RouterControllerActions.BACK, ($store) => {
	const history = $store.get().history;
	const target = history.pop();

	if (!target) return false;

	$store.set({
		view: target,
		history,
	});

	return true;
});

export const RouterController = {
	$state,
	$canGoBack,
	push,
	reset,
	replace,
	back,
};
