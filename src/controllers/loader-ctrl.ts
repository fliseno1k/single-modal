import { atom, action } from 'nanostores';
import { SmError, invariant } from '../utils';
import { genActionSubscriber } from '../utils/gen-action-subscriber';
import type { SingleModalView } from '../types';

const enum LoaderControllerActions {
	LOAD = 'LOAD',
}

type Status = 'idle' | 'loading';

const cache = new Map<SingleModalView['key'], ReturnType<SingleModalView['loader']>>();

const $status = atom<Status>('idle');

const load = action($status, LoaderControllerActions.LOAD, ($store, view: SingleModalView) => {
	invariant($store.get() === 'idle', SmError.LOADING_MULTIPLE_COMPONENTS_SIMULTANEOUSLY);

	const cached = cache.get(view.key);

	if (cached !== undefined) {
		return cached;
	}

	$store.set('loading');

	const response = view.loader();
	response.finally(() => $store.set('idle'));
	cache.set(view.key, response);

	return response;
});

const actionsMap = {
	[LoaderControllerActions.LOAD]: load,
};

const on = genActionSubscriber($status, actionsMap);

export const LoaderController = {
	$status,
	on,
	load,
};
