import { SingleModalRoot } from './components';
import { useProtectedApi, usePublicApi } from './hooks';
import type { SingleModalOptions, SingleModalAPI } from './types';
import { SmError, invariant } from './utils';

export function createSingleModal(options: SingleModalOptions): SingleModalAPI {
	const { views, loader, modal, renderer } = options;
	const isAllRequiredOptionsProvided = views && loader && modal && renderer;
	invariant(isAllRequiredOptionsProvided, SmError.PROVIDE_ALL_REQUIRED_OPTIONS);

	return {
		Component: SingleModalRoot,
		usePublicApi,
		useProtectedApi,
	} as SingleModalAPI;
}
