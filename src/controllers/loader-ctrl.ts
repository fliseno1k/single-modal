import { atom, action } from 'nanostores';
import { nameFactory } from '../utils/name-factory';
import { SmError, invariant } from '../utils';
import type { SingleModalView } from '../types';

type Status = 'idle' | 'loading';

const name = nameFactory('loader-ctrl');

const cache = new Map<SingleModalView['key'], ReturnType<SingleModalView['loader']>>();

const $status = atom<Status>('idle');

const load = action($status, name('load'), ($store, view: SingleModalView) => {
	invariant($store.get() === 'loading', SmError.LOADING_MULTIPLE_COMPONENTS_SIMULTANEOUSLY);

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
