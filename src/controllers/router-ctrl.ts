import { atom, action, map } from 'nanostores';
import { nameFactory } from '../utils/name-factory';

import type { SingleModalView } from '..';

const name = nameFactory('modal-ctrl');

const model = () => {
	const defaultState = {
		view: null,
		history: [],
	};

	const $state = map<{ view: SingleModalView | null; history: SingleModalView[] }>(defaultState);
	const $canGoBack = atom(false);

	const pushEv = action($state, name('push'), ($store, view: SingleModalView) => {
		const history = $store.get().history;
		history.push(view);
		$store.set({ view, history });

		_updateBackValue(history.length);

		return true;
	});

	const resetEv = action($state, name('reset'), ($store) => {
		$store.set(defaultState);

		_updateBackValue(history.length);

		return true;
	});

	const _updateBackValue = action($canGoBack, name('update-back-value'), ($store, historyLength: number) => {
		$store.set(historyLength > 1);
	});

	return {
		$state,
		$canGoBack,
		pushEv,
		resetEv,
	};
};

export const RouterController = model();
