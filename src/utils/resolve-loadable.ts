import { ComponentType } from 'react';
import type { LoadedComponent } from '../types';

export function resolveLoadable(obj: LoadedComponent<unknown>): ComponentType<unknown> {
	return obj.default;
}
