import { SingleModalRoot } from './components';
import type { SingleModalOptions, SingleModalAPI } from './types';

export function createSingleModal(options: SingleModalOptions): SingleModalAPI {
	return {
		Component: SingleModalRoot,
	} as SingleModalAPI;
}
