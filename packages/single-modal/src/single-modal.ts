import { Methods, Model } from './core';
import { SingleModalRoot } from './components';
import { SmError, invariant } from './utils';
import { useProtectedApi, usePublicApi } from './hooks';
import type { SingleModalOptions, SingleModalAPI } from './types';

let INSTANTIATED = false;

export function createSingleModal(options: SingleModalOptions): SingleModalAPI {
	const { modal } = options;
	const isAllRequiredOptionsProvided = modal;

	invariant(!INSTANTIATED, SmError.ALREADY_INSTANTIATED);
	invariant(isAllRequiredOptionsProvided, SmError.PROVIDE_ALL_REQUIRED_OPTIONS);

	INSTANTIATED = false;
	Model.storeOptions(options);

	return {
		Component: SingleModalRoot,
		globalApi: {
			open: Methods.open,
			close: Methods.close,
		} as SingleModalAPI['globalApi'],
		usePublicApi: usePublicApi as SingleModalAPI['usePublicApi'],
		useProtectedApi: useProtectedApi as SingleModalAPI['useProtectedApi'],
	};
}
