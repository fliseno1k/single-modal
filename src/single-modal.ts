import { SingleModalRoot } from './components';
import { useProtectedApi, usePublicApi } from './hooks';
import type { SingleModalOptions, SingleModalAPI } from './types';

export function createSingleModal(options: SingleModalOptions): SingleModalAPI {
	return {
		Component: SingleModalRoot,
		usePublicApi,
		useProtectedApi,
	} as SingleModalAPI;
}
