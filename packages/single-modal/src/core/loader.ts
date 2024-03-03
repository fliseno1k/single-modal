import { map } from 'nanostores';
import { ComponentType } from 'react';
import type { SingleModalView } from '../types';
import { SmError, invariant, resolveLoadable } from '../utils';

type Status = 'idle' | 'loading';

type State = {
	status: Status;
};

const cache = new Map<SingleModalView<unknown>['key'], ComponentType<unknown>>();

const $state = map<State>({ status: 'idle' });

const load = async <View extends SingleModalView<unknown>>(
	view: View,
	onLoad?: (renderable: ComponentType<unknown>) => void,
	onError?: () => void,
) => {
	invariant($state.get().status === 'idle', SmError.LOADING_MULTIPLE_COMPONENTS_SIMULTANEOUSLY);
	$state.setKey('status', 'loading');

	try {
		const component = resolveLoadable(await view.loader());
		cache.set(view.key, component);
		onLoad?.(component);
	} catch {
		onError?.();
	}

	$state.setKey('status', 'idle');
	return true;
};

const retrieve = <View extends SingleModalView<unknown>>(view: View) => {
	return cache.get(view.key);
};

export const Loader = {
	load,
	retrieve,
	_subscriber: $state,
};
