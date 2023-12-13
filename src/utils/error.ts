import { isDev } from './globals';
import { createAndLogError } from './log';

export enum SmError {
	USE_PROTECTED_API_OUTSIDE_CONTEXT = 0,
}

export function smError(code: SmError): Error {
	const text = codeToText(code);
	const err = createAndLogError(text);
	return err;
}

function codeToText(code: number) {
	if (isDev) {
		const ERRORS_MAP = [
			"Invoking 'useProtectedApi' method outside of invocation context.", // 0
		];
		return `Code(${code}): ${ERRORS_MAP[code] ?? ''}`;
	} else {
		return `Code(${code})`;
	}
}
