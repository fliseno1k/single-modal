import { FunctionComponent } from 'react';
import { resolveLoadable } from '../utils';
import type { ComponentLoader, LoadedComponent } from '../types';

const cache = new WeakMap<ComponentLoader<unknown>, FunctionComponent<unknown>>();
const promises = new WeakMap<ComponentLoader<unknown>, Promise<LoadedComponent<unknown>>>();

async function load(
	loader: ComponentLoader<unknown>,
	onLoad?: (renderable: FunctionComponent<unknown>) => void,
	onError?: () => void,
) {
	const componentOrPromise = loader();
	if (!(componentOrPromise instanceof Promise)) {
		cache.set(loader, componentOrPromise);
		return;
	}

	if (promises.has(loader)) {
		promises.get(loader)?.then((_) => {
			onLoad?.(cache.get(loader) as FunctionComponent<unknown>);
		});
		return;
	}

	promises.set(loader, componentOrPromise);
	componentOrPromise.finally(() => {
		promises.get(loader);
	});

	try {
		const component = resolveLoadable(await componentOrPromise);
		cache.set(loader, component);
		onLoad?.(component);
	} catch {
		onError?.();
	}
}

function retrieve(loader: ComponentLoader<unknown>) {
	return cache.get(loader);
}

export const Loader = {
	load,
	retrieve,
};
