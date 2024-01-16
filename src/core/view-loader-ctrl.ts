import { atom, action } from 'nanostores';
import { SmError, invariant, resolveLoadable, genActionSubscriber } from '../utils';
import type { SingleModalView } from '../types';
import { ComponentType } from 'react';

const enum LoaderControllerActions {
	LOAD = 'LOAD',
}

type Status = 'idle' | 'loading';

const cache = new Map<SingleModalView['key'], ComponentType<unknown>>();

const $status = atom<Status>('idle');

const load = action($status, LoaderControllerActions.LOAD, async <View extends SingleModalView>($store, view: View) => {
	invariant($store.get() === 'idle', SmError.LOADING_MULTIPLE_COMPONENTS_SIMULTANEOUSLY);

	const cached = cache.get(view.key);
	if (cached !== undefined) {
		return true;
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
