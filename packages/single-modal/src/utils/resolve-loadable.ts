import { FunctionComponent } from 'react';
import type { LoadedComponent } from '../types';

export function resolveLoadable(obj: LoadedComponent<unknown>): FunctionComponent<unknown> {
	return obj.default;
}
