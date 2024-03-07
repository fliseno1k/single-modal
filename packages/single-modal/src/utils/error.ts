import { isDev } from './globals';
import { createAndLogError } from './log';

export const enum SmError {
	USE_PROTECTED_API_OUTSIDE_CONTEXT = 0,
	LOADING_MULTIPLE_COMPONENTS_SIMULTANEOUSLY = 1,
	PROVIDE_ALL_REQUIRED_OPTIONS = 2,
	ALREADY_INSTANTIATED = 3,
}

export function smError(code: SmError): Error {
	return createAndLogError(codeToText(code));
}

function codeToText(code: number) {
	const prefix = `Code(${code})`;

	if (isDev) {
		const ERRORS_MAP = [
			"Invoking 'useProtectedApi' method outside of invocation context.", // 0
			'Loading multiple components simultaneously not supported', // 1
			"Provide all required options from 'SingleModalOptions' interface to initialize SingleModal instance", // 2
			"'SingleModal' already instantiated", // 3
		];
		return prefix + `: ${ERRORS_MAP[code] ?? ''}`;
	}

	return prefix;
}
