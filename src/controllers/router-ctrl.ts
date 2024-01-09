import { action, map, computed } from 'nanostores';
import type { SingleModalView } from '../types';

const enum RouterControllerActions {
	PUSH,
	RESET,
}

const defaultState = {
	view: null,
	history: [],
};

const $state = map<{ view: SingleModalView | null; history: SingleModalView[] }>(defaultState);
const $canGoBack = computed($state, ({ history }) => history.length > 1);

const push = action($state, RouterControllerActions.PUSH.toString(), ($store, view: SingleModalView) => {
	const history = $store.get().history;
	history.push(view);
	$store.set({ view, history });

	return true;
});

const reset = action($state, RouterControllerActions.RESET.toString(), ($store) => {
	$store.set(defaultState);

	return true;
});

export const RouterController = {
	$state,
	$canGoBack,
	push,
	reset,
};
