import { action, map, computed } from 'nanostores';
import type { SingleModalView } from '../types';
import { genActionSubscriber } from '../utils/gen-action-subscriber';

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

const actionsMap = {
	[RouterControllerActions.PUSH]: push,
	[RouterControllerActions.RESET]: reset,
	[RouterControllerActions.REPLACE]: replace,
	[RouterControllerActions.BACK]: back,
};

const on = genActionSubscriber($state, actionsMap);

export const RouterController = {
	$state,
	$canGoBack,
	on,
	push,
	reset,
	replace,
	back,
};
