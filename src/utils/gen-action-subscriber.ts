import { onAction } from 'nanostores';
import type { WritableAtom } from 'nanostores';

export const genActionSubscriber =
	<Fns extends Record<string, (...args: any[]) => any>>(store: WritableAtom, actionsMap: Fns) =>
	<ActionName extends keyof Fns>(
		action: ActionName,
		cb: (...args: Parameters<(typeof actionsMap)[ActionName]>) => void,
	) =>
		onAction(store, ({ actionName, args, onEnd }) => {
			if (actionName !== action) {
				return;
			}

			onEnd(() => cb(...(args as Parameters<(typeof actionsMap)[ActionName]>)));
		});
