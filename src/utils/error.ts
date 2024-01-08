import { isDev } from './globals';
import { createAndLogError } from './log';

export enum SmError {
	USE_PROTECTED_API_OUTSIDE_CONTEXT = 0,
	LOADING_MULTIPLE_COMPONENTS_SIMULTANEOUSLY = 1,
	PROVIDE_ALL_REQUIRED_OPTIONS = 2,
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
			'Loading multiple components simultaneously not supported', // 1
			"Provide all required options from 'SingleModalOptions' interface to initialize SingleModal instance", // 2
		];
		return `Code(${code}): ${ERRORS_MAP[code] ?? ''}`;
	} else {
		return `Code(${code})`;
	}
}
