import { ComponentType } from 'react';
import type { LoadedComponent } from '../types';

export function resolveLoadable(obj: LoadedComponent<unknown>): ComponentType<unknown> {
	if ('__esModule' in obj) {
		return obj.default;
	}

	return obj;
}
