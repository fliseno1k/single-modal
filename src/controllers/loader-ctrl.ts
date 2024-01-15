import { atom, action } from 'nanostores';
import { SmError, invariant, resolveLoadable, genActionSubscriber } from '../utils';
import type { SingleModalView } from '../types';

const enum LoaderControllerActions {
	LOAD = 'LOAD',
}

type Status = 'idle' | 'loading';

const cache = new Map<SingleModalView['key'], ReturnType<SingleModalView['loader']>>();

const $status = atom<Status>('idle');

const load = action($status, LoaderControllerActions.LOAD, async ($store, view: SingleModalView) => {
	invariant($store.get() === 'idle', SmError.LOADING_MULTIPLE_COMPONENTS_SIMULTANEOUSLY);

	const cached = cache.get(view.key);
	if (cached !== undefined) {
		return cached;
	}

	try {
		const component = resolveLoadable(await view.loader());
		cache.set(view.key, component);
	} finally {
		$store.set('idle');
	}

	return true;
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
