import { atom, action } from 'nanostores';
import { SmError, invariant } from '../utils';
import type { SingleModalView } from '../types';

const enum LoaderControllerActions {
	LOAD,
}

type Status = 'idle' | 'loading';

const cache = new Map<SingleModalView['key'], ReturnType<SingleModalView['loader']>>();

const $status = atom<Status>('idle');

const load = action($status, LoaderControllerActions.LOAD.toString(), ($store, view: SingleModalView) => {
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

export const LoaderController = {
	$status,
	load,
};
