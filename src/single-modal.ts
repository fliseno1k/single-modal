import { SingleModalRoot } from './components';
import { useProtectedApi, usePublicApi } from './hooks';
import { SmError, invariant } from './utils';
import type { SingleModalOptions, SingleModalAPI } from './types';

export function createSingleModal<const Options extends SingleModalOptions>(options: Options): SingleModalAPI<Options> {
	const { views, loader, modal } = options;
	const isAllRequiredOptionsProvided = views && loader && modal;
	invariant(isAllRequiredOptionsProvided, SmError.PROVIDE_ALL_REQUIRED_OPTIONS);

	return {
		Component: SingleModalRoot,
		usePublicApi,
		useProtectedApi,
	};
}
