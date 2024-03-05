import { map } from 'nanostores';
import { ComponentType } from 'react';
import type { ComponentLoader } from '../types';
import { SmError, invariant, resolveLoadable } from '../utils';

type Status = 'idle' | 'loading';

type State = {
	status: Status;
};

const cache = new WeakMap<ComponentLoader<any>, ComponentType<any>>();

const $state = map<State>({ status: 'idle' });

const load = async (
	loader: ComponentLoader<unknown>,
	onLoad?: (renderable: ComponentType<unknown>) => void,
	onError?: () => void,
) => {
	invariant($state.get().status === 'idle', SmError.LOADING_MULTIPLE_COMPONENTS_SIMULTANEOUSLY);
	$state.setKey('status', 'loading');

	try {
		const component = resolveLoadable(await loader());
		cache.set(loader, component);
		onLoad?.(component);
	} catch {
		onError?.();
	}

	$state.setKey('status', 'idle');
	return true;
};

function retrieve(loader: ComponentLoader) {
	return cache.get(loader);
}

export const Loader = {
	load,
	retrieve,
	_subscriber: $state,
};
