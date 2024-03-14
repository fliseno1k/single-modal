import { createAndLogError } from './log';

export function invariant(check: unknown, message: string) {
	if (check) return;
	throw createAndLogError(message);
}
