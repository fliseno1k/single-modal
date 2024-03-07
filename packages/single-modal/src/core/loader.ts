import { map } from 'nanostores';
import { FunctionComponent } from 'react';
import type { ComponentLoader } from '../types';
import { SmError, invariant, resolveLoadable } from '../utils';

type Status = 'idle' | 'loading';

type State = {
	status: Status;
};

const cache = new WeakMap<ComponentLoader<unknown>, FunctionComponent<unknown>>();

const $state = map<State>({ status: 'idle' });

const load = async (
	loader: ComponentLoader<unknown>,
	onLoad?: (renderable: FunctionComponent<unknown>) => void,
	onError?: () => void,
) => {
	invariant($state.get().status === 'idle', SmError.LOADING_MULTIPLE_COMPONENTS_SIMULTANEOUSLY);

	const componentOrPromise = loader();
	if (!('then' in componentOrPromise)) {
		cache.set(loader, componentOrPromise);
		return;
	}

	$state.setKey('status', 'loading');

	try {
		const component = resolveLoadable(await componentOrPromise);
		cache.set(loader, component);
		onLoad?.(component);
	} catch {
		onError?.();
	}

	$state.setKey('status', 'idle');
};

function retrieve(loader: ComponentLoader<unknown>) {
	return cache.get(loader);
}

export const Loader = {
	load,
	retrieve,
	_subscriber: $state,
};
