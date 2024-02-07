import { SingleModalRoot } from './components';
import { useProtectedApi, usePublicApi } from './hooks';
import { SmError, invariant } from './utils';
import { Methods, Model } from './core';
import type { SingleModalOptions, SingleModalAPI } from './types';

let INSTANTIATED = false;

export function createSingleModal<const Options extends SingleModalOptions>(options: Options): SingleModalAPI<Options> {
	const { views, modal } = options;
	const isAllRequiredOptionsProvided = views && modal;

	invariant(!INSTANTIATED, SmError.ALREADY_INSTANTIATED);
	invariant(isAllRequiredOptionsProvided, SmError.PROVIDE_ALL_REQUIRED_OPTIONS);

	INSTANTIATED = false;
	Model.storeOptions(options);

	return {
		Component: SingleModalRoot,
		usePublicApi: usePublicApi as SingleModalAPI<Options>['usePublicApi'],
		useProtectedApi: useProtectedApi as SingleModalAPI<Options>['useProtectedApi'],
		globalApi: {
			open: Methods.open,
			close: Methods.close,
		} as SingleModalAPI<Options>['globalApi'],
	};
}
