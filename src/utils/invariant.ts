const isProduction = import.meta.env.PROD;
const prefix: string = 'Invariant failed';

export function invariant(condition: unknown, message: string | (() => string)): asserts condition {
	if (condition) {
		return;
	}

	if (isProduction) {
		throw new Error(prefix);
	}

	const provided: string | undefined = typeof message === 'function' ? message() : message;
	const value: string = provided ? `${prefix}: ${provided}` : prefix;
	throw new Error(value);
}
