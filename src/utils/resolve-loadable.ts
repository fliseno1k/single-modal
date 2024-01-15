import type { LoadedComponent } from '../types';

export function resolveLoadable(obj: LoadedComponent<unknown>) {
	const extended = obj as LoadedComponent<unknown> & { __esModule?: boolean };

	if (extended.__esModule && 'default' in extended) {
		return extended.default;
	} else {
		return extended;
	}
}
