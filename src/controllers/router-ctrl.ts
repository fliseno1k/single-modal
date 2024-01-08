import { action, map, computed } from 'nanostores';
import { nameFactory } from '../utils/name-factory';

import type { SingleModalView } from '..';

const name = nameFactory('modal-ctrl');

const model = () => {
	const defaultState = {
		view: null,
		history: [],
	};

	const $state = map<{ view: SingleModalView | null; history: SingleModalView[] }>(defaultState);
	const $canGoBack = computed($state, ({ history }) => history.length > 1);

	const pushEv = action($state, name('push'), ($store, view: SingleModalView) => {
		const history = $store.get().history;
		history.push(view);
		$store.set({ view, history });

		return true;
	});

	const resetEv = action($state, name('reset'), ($store) => {
		$store.set(defaultState);

		return true;
	});

	return {
		$state,
		$canGoBack,
		pushEv,
		resetEv,
	};
};

export const RouterController = model();
