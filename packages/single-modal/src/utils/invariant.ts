import { SmError, smError } from './error';

export function invariant(condition: unknown, errorCode: SmError): asserts condition {
	if (condition) {
		return;
	}

	throw smError(errorCode);
}
